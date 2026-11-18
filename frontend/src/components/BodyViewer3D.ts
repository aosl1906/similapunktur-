import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface Point3DEntry {
  id: string;
  aliases?: string[];
  name_de: string;
  name_chinese?: string;
  translation?: string;
  meridian: string;
  meridian_id: string;
  position: [number, number, number];
  normal?: [number, number, number];
  is_pilot?: boolean;
  in_similapunktur_db?: boolean;
  image_filename?: string;
  localisation_text?: string;
  supplementary_details?: {
    name_german: string;
    name_chinese: string;
    name_translation: string;
    meridian: string;
    image_filename: string;
    localisation_text: string;
    effects: string[];
    indications: string[];
    assigned_homeopathics: string[];
  };
}

export interface Points3DDataset {
  version: string;
  model: string;
  coordinate_system: string;
  pilot_meridians: string[];
  points: Point3DEntry[];
}

export type BodyDisplayMode = 'anatomy' | 'skeleton' | 'clinical' | 'xray';

export interface BodyViewer3DCallbacks {
  onPointClick?: (pointId: string, point: Point3DEntry) => void;
  onPointCalibrate?: (
    pointId: string | null,
    coords: [number, number, number],
    normal: [number, number, number]
  ) => void;
}

// Design System Colors
const COLOR_BG_WARM = 0xfdfbf7;
const COLOR_BG_DARK = 0x141a18;
const COLOR_SAGE_GREEN = 0x4a6b5d;
const COLOR_TERRACOTTA = 0xc86d51;
const COLOR_DEEP_NAVY = 0x1f2d3d;
const COLOR_PRIMARY_TEAL = 0x278575;
const COLOR_MATCH_AMBER = 0xd9822b;

export class BodyViewer3D {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;

  private bodyMeshGroup: THREE.Group | null = null;
  private bodyMeshes: THREE.Mesh[] = [];
  private skinMeshes: THREE.Mesh[] = [];
  private muscleMeshes: THREE.Mesh[] = [];
  private tendonMeshes: THREE.Mesh[] = [];
  private skeletonMeshes: THREE.Mesh[] = [];
  private skinMaterial: THREE.MeshPhysicalMaterial;
  private muscleMaterial: THREE.MeshPhysicalMaterial;
  private tendonMaterial: THREE.MeshPhysicalMaterial;
  private skeletonMaterial: THREE.MeshPhysicalMaterial;
  private displayMode: BodyDisplayMode = 'anatomy';
  private anatomyBlend = 1.0;
  private isXrayMode = false;

  private pointsGroup: THREE.Group;
  private linesGroup: THREE.Group;
  private pointMeshesMap: Map<string, THREE.Mesh> = new Map();
  private pointDataMap: Map<string, Point3DEntry> = new Map();
  private aliasToIdMap: Map<string, string> = new Map();

  private visibleMeridians: Set<string> = new Set(['herz', 'lunge']);
  private selectedPointId: string | null = null;
  private hoveredPointId: string | null = null;
  private highlightedPointIds: Set<string> = new Set();
  private recommendedPointIds: Set<string> = new Set();

  private isBilateralMode = false;
  private mirroredPointMeshesMap: Map<string, THREE.Mesh> = new Map();
  private isCalibrationMode = false;
  private lastCalibrationMarker: THREE.Mesh | null = null;

  private tooltipEl: HTMLDivElement;
  private loadingOverlayEl: HTMLDivElement;
  private calibrationReadoutEl: HTMLDivElement;

  private callbacks: BodyViewer3DCallbacks;
  private animationFrameId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;

  // Camera tween state
  private cameraTween: {
    active: boolean;
    startTime: number;
    duration: number;
    startPos: THREE.Vector3;
    endPos: THREE.Vector3;
    startTarget: THREE.Vector3;
    endTarget: THREE.Vector3;
  } | null = null;

  // Shared geometries & materials for points
  private sphereGeo: THREE.SphereGeometry;
  private haloRingMesh: THREE.Mesh;

  constructor(container: HTMLElement, callbacks: BodyViewer3DCallbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;

    // 1. Scene setup
    this.scene = new THREE.Scene();
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    this.scene.background = new THREE.Color(isDark ? COLOR_BG_DARK : COLOR_BG_WARM);

    // 2. Camera setup
    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 320);
    this.camera = new THREE.PerspectiveCamera(38, width / height, 0.01, 50);
    this.camera.position.set(0.18, 0.22, 2.35);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.container.appendChild(this.renderer.domElement);

    // 4. OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.065;
    this.controls.minDistance = 0.22;
    this.controls.maxDistance = 3.8;
    this.controls.maxPolarAngle = Math.PI * 0.92;
    this.controls.target.set(0.05, 0.12, 0);
    this.controls.update();

    // 5. Lighting for anatomical plastic depth
    this.setupLights();
    this.setupGroundPedestal();

    // 6. Groups & Materials
    this.pointsGroup = new THREE.Group();
    this.pointsGroup.name = 'AcupointsGroup';
    this.pointsGroup.renderOrder = 5;
    this.linesGroup = new THREE.Group();
    this.linesGroup.name = 'MeridianSplinesGroup';
    this.linesGroup.renderOrder = 4;
    this.scene.add(this.linesGroup);
    this.scene.add(this.pointsGroup);

    this.skinMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(isDark ? 0x3b4d47 : 0xebe4da),
      roughness: 0.48,
      metalness: 0.02,
      clearcoat: 0.12,
      clearcoatRoughness: 0.38,
      transparent: true,
      opacity: 0.18,
      side: THREE.FrontSide,
      depthWrite: false,
    });

    this.muscleMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xa84236),
      roughness: 0.50,
      metalness: 0.02,
      clearcoat: 0.14,
      clearcoatRoughness: 0.34,
      transparent: false,
      opacity: 1.0,
      side: THREE.DoubleSide,
      depthWrite: true,
    });

    this.tendonMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xe6dfd3),
      roughness: 0.28,
      metalness: 0.03,
      clearcoat: 0.25,
      clearcoatRoughness: 0.22,
      transparent: false,
      opacity: 1.0,
      side: THREE.DoubleSide,
      depthWrite: true,
    });

    this.skeletonMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xefe8d5),
      roughness: 0.42,
      metalness: 0.02,
      clearcoat: 0.08,
      clearcoatRoughness: 0.40,
      transparent: false,
      opacity: 1.0,
      side: THREE.DoubleSide,
      depthWrite: true,
    });

    this.sphereGeo = new THREE.SphereGeometry(0.0072, 20, 20);

    // Selection halo ring
    const ringGeo = new THREE.RingGeometry(0.010, 0.0145, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: COLOR_TERRACOTTA,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      depthTest: false,
    });
    this.haloRingMesh = new THREE.Mesh(ringGeo, ringMat);
    this.haloRingMesh.visible = false;
    this.haloRingMesh.renderOrder = 999;
    this.scene.add(this.haloRingMesh);

    // 7. Raycaster & DOM overlays
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);

    this.tooltipEl = this.createTooltipElement();
    this.loadingOverlayEl = this.createLoadingOverlay();
    this.calibrationReadoutEl = this.createCalibrationReadout();

    this.bindEvents();
    this.startAnimationLoop();
  }

  private setupLights(): void {
    const hemiLight = new THREE.HemisphereLight(0xfffcf5, 0xc9d6d0, 1.15);
    hemiLight.position.set(0, 2.5, 0);
    this.scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffaf0, 1.35);
    keyLight.position.set(1.8, 2.2, 2.6);
    this.scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbece8, 0.75);
    fillLight.position.set(-2.0, 1.0, 1.5);
    this.scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf5e6df, 0.65);
    rimLight.position.set(0.2, 1.6, -2.5);
    this.scene.add(rimLight);
  }

  private setupGroundPedestal(): void {
    const discGeo = new THREE.CircleGeometry(0.42, 48);
    discGeo.rotateX(-Math.PI / 2);
    const discMat = new THREE.MeshBasicMaterial({
      color: COLOR_SAGE_GREEN,
      transparent: true,
      opacity: 0.08,
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.position.y = -0.903;
    this.scene.add(disc);

    const ringGeo = new THREE.RingGeometry(0.415, 0.425, 64);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: COLOR_DEEP_NAVY,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = -0.902;
    this.scene.add(ring);
  }

  private createTooltipElement(): HTMLDivElement {
    const el = document.createElement('div');
    el.className = 'viewer3d-tooltip';
    el.style.display = 'none';
    this.container.appendChild(el);
    return el;
  }

  private createLoadingOverlay(): HTMLDivElement {
    const el = document.createElement('div');
    el.className = 'viewer3d-loading-overlay';
    el.innerHTML = `
      <div class="viewer3d-spinner"></div>
      <div class="viewer3d-loading-text">Lade anatomisches 3D-Körpermodell…</div>
    `;
    this.container.appendChild(el);
    return el;
  }

  private createCalibrationReadout(): HTMLDivElement {
    const el = document.createElement('div');
    el.className = 'viewer3d-calibration-bar';
    el.style.display = 'none';
    el.innerHTML = `
      <div class="cal-info">
        <span class="cal-badge">🎯 3D-Kalibrierung aktiv</span>
        <span class="cal-coords" id="cal-coords-display">Klicken Sie auf die Körperoberfläche…</span>
      </div>
      <div class="cal-actions">
        <button type="button" class="cal-btn" id="cal-copy-btn" title="Aktuelle [x, y, z]-Koordinate kopieren">📋 Kopieren</button>
        <button type="button" class="cal-btn cal-btn-primary" id="cal-export-btn" title="Vollständige points_3d.json herunterladen">💾 JSON Export</button>
      </div>
    `;
    this.container.appendChild(el);

    const copyBtn = el.querySelector('#cal-copy-btn') as HTMLButtonElement | null;
    const exportBtn = el.querySelector('#cal-export-btn') as HTMLButtonElement | null;

    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const coordsText = el.dataset.lastCoords || '';
        if (coordsText) {
          navigator.clipboard?.writeText(coordsText);
          copyBtn.textContent = '✓ Kopiert!';
          setTimeout(() => {
            copyBtn.textContent = '📋 Kopieren';
          }, 1500);
        }
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.exportPoints3DJson();
      });
    }

    return el;
  }

  public async loadModel(modelUrl = 'models/human_body.glb'): Promise<void> {
    this.loadingOverlayEl.style.display = 'flex';
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
      loader.load(
        modelUrl,
        (gltf) => {
          if (this.bodyMeshGroup) {
            this.scene.remove(this.bodyMeshGroup);
          }
          this.bodyMeshes = [];
          this.skinMeshes = [];
          this.muscleMeshes = [];
          this.tendonMeshes = [];
          this.skeletonMeshes = [];
          this.bodyMeshGroup = gltf.scene;

          this.bodyMeshGroup.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              if (!mesh.geometry.attributes.normal) {
                mesh.geometry.computeVertexNormals();
              }
              mesh.castShadow = false;
              mesh.receiveShadow = false;
              this.bodyMeshes.push(mesh);

              const name = (mesh.name || child.parent?.name || '').toLowerCase();
              if (name.includes('muscle')) {
                mesh.material = this.muscleMaterial;
                this.muscleMeshes.push(mesh);
              } else if (name.includes('tendon')) {
                mesh.material = this.tendonMaterial;
                this.tendonMeshes.push(mesh);
              } else if (name.includes('skeleton')) {
                mesh.material = this.skeletonMaterial;
                this.skeletonMeshes.push(mesh);
              } else {
                mesh.material = this.skinMaterial;
                this.skinMeshes.push(mesh);
              }
            }
          });

          this.applyDisplayMode();
          this.scene.add(this.bodyMeshGroup);
          this.loadingOverlayEl.style.display = 'none';
          this.handleResize();
          resolve();
        },
        (progress) => {
          if (progress.total > 0) {
            const pct = Math.round((progress.loaded / progress.total) * 100);
            const textEl = this.loadingOverlayEl.querySelector('.viewer3d-loading-text');
            if (textEl) {
              textEl.textContent = `Lade anatomisches 3D-Körpermodell… (${pct}%)`;
            }
          }
        },
        (error) => {
          console.error('Error loading 3D human body model:', error);
          const textEl = this.loadingOverlayEl.querySelector('.viewer3d-loading-text');
          if (textEl) {
            textEl.textContent = 'Fehler beim Laden des 3D-Modells.';
          }
          reject(error);
        }
      );
    });
  }

  public async loadPointsData(dataUrl = 'data/points_3d.json'): Promise<Point3DEntry[]> {
    const res = await fetch(dataUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${dataUrl}: ${res.status}`);
    }
    const dataset: Points3DDataset = await res.json();

    // Merge any locally calibrated coordinates from localStorage (BodyParts3D 4.0 v2 schema)
    const savedOverridesRaw = localStorage.getItem('similapunktur_points_3d_overrides_bp3d_v2');
    let overrides: Record<string, [number, number, number]> = {};
    if (savedOverridesRaw) {
      try {
        overrides = JSON.parse(savedOverridesRaw);
      } catch {
        overrides = {};
      }
    }

    this.pointDataMap.clear();
    this.aliasToIdMap.clear();

    dataset.points.forEach((pt) => {
      if (overrides[pt.id]) {
        pt.position = overrides[pt.id];
      }
      this.pointDataMap.set(pt.id, pt);
      this.aliasToIdMap.set(pt.id.toUpperCase(), pt.id);
      if (pt.aliases) {
        pt.aliases.forEach((al) => {
          this.aliasToIdMap.set(al.toUpperCase().replace(/\s+/g, '_'), pt.id);
          this.aliasToIdMap.set(al.toUpperCase(), pt.id);
        });
      }
    });

    this.rebuildPointsAndSplines();
    return Array.from(this.pointDataMap.values());
  }

  public resolvePointId(idOrAlias: string): string | null {
    if (this.pointDataMap.has(idOrAlias)) return idOrAlias;
    const upper = idOrAlias.toUpperCase().trim();
    return this.aliasToIdMap.get(upper) || this.aliasToIdMap.get(upper.replace(/\s+/g, '_')) || null;
  }

  public getPointData(idOrAlias: string): Point3DEntry | undefined {
    const resolved = this.resolvePointId(idOrAlias);
    return resolved ? this.pointDataMap.get(resolved) : undefined;
  }

  public getAllPoints(): Point3DEntry[] {
    return Array.from(this.pointDataMap.values());
  }

  public setVisibleMeridians(meridianIds: string[]): void {
    this.visibleMeridians = new Set(meridianIds);
    this.rebuildPointsAndSplines();
  }

  public toggleMeridian(meridianId: string, visible?: boolean): boolean {
    const nextState = visible !== undefined ? visible : !this.visibleMeridians.has(meridianId);
    if (nextState) {
      this.visibleMeridians.add(meridianId);
    } else {
      this.visibleMeridians.delete(meridianId);
    }
    this.rebuildPointsAndSplines();
    return nextState;
  }

  public getVisibleMeridians(): string[] {
    return Array.from(this.visibleMeridians);
  }

  public getActiveMaterial(): THREE.MeshPhysicalMaterial {
    if (this.displayMode === 'skeleton') return this.skeletonMaterial;
    if (this.displayMode === 'clinical') return this.skinMaterial;
    return this.muscleMaterial;
  }

  public setDisplayMode(mode: BodyDisplayMode): void {
    this.displayMode = mode;
    this.applyDisplayMode();
  }

  public getDisplayMode(): BodyDisplayMode {
    return this.displayMode;
  }

  public setAnatomyBlend(blend: number): void {
    this.anatomyBlend = Math.max(0, Math.min(1, blend));
    if (this.displayMode === 'clinical') return;
    this.muscleMaterial.opacity = 0.25 + 0.75 * this.anatomyBlend;
    this.muscleMaterial.transparent = this.anatomyBlend < 0.99;
    this.muscleMaterial.needsUpdate = true;
  }

  private applyDisplayMode(): void {
    this.isXrayMode = this.displayMode === 'xray';

    if (this.displayMode === 'anatomy') {
      // Full 3D Musculature + Tendons + Skeleton with subtle translucent ghost-skin contour
      this.skeletonMaterial.transparent = false;
      this.skeletonMaterial.opacity = 1.0;
      this.skeletonMaterial.depthWrite = true;
      this.skeletonMaterial.needsUpdate = true;

      this.muscleMaterial.transparent = false;
      this.muscleMaterial.opacity = 1.0;
      this.muscleMaterial.depthWrite = true;
      this.muscleMaterial.needsUpdate = true;

      this.tendonMaterial.transparent = false;
      this.tendonMaterial.opacity = 1.0;
      this.tendonMaterial.depthWrite = true;
      this.tendonMaterial.needsUpdate = true;

      this.skinMaterial.transparent = true;
      this.skinMaterial.opacity = 0.18;
      this.skinMaterial.depthWrite = false;
      this.skinMaterial.needsUpdate = true;

      this.skeletonMeshes.forEach((m) => { m.visible = true; m.renderOrder = 0; });
      this.muscleMeshes.forEach((m) => { m.visible = true; m.renderOrder = 0; });
      this.tendonMeshes.forEach((m) => { m.visible = true; m.renderOrder = 0; });
      this.skinMeshes.forEach((m) => { m.visible = true; m.renderOrder = 2; });
    } else if (this.displayMode === 'skeleton') {
      // Pure 3D Osteological Skeleton + translucent ghost-skin contour for palpation landmarks
      this.skeletonMaterial.transparent = false;
      this.skeletonMaterial.opacity = 1.0;
      this.skeletonMaterial.depthWrite = true;
      this.skeletonMaterial.needsUpdate = true;

      this.skinMaterial.transparent = true;
      this.skinMaterial.opacity = 0.24;
      this.skinMaterial.depthWrite = false;
      this.skinMaterial.needsUpdate = true;

      this.skeletonMeshes.forEach((m) => { m.visible = true; m.renderOrder = 0; });
      this.muscleMeshes.forEach((m) => { m.visible = false; });
      this.tendonMeshes.forEach((m) => { m.visible = false; });
      this.skinMeshes.forEach((m) => { m.visible = true; m.renderOrder = 2; });
    } else if (this.displayMode === 'clinical') {
      // Clinical neutral porcelain skin mannequin
      this.skinMaterial.transparent = true;
      this.skinMaterial.opacity = 0.96;
      this.skinMaterial.depthWrite = true;
      this.skinMaterial.needsUpdate = true;

      this.skeletonMeshes.forEach((m) => { m.visible = false; });
      this.muscleMeshes.forEach((m) => { m.visible = false; });
      this.tendonMeshes.forEach((m) => { m.visible = false; });
      this.skinMeshes.forEach((m) => { m.visible = true; m.renderOrder = 0; });
    } else if (this.displayMode === 'xray') {
      // Multi-layer X-Ray: high-contrast skeleton core + translucent muscles + translucent skin
      this.skeletonMaterial.transparent = true;
      this.skeletonMaterial.opacity = 0.88;
      this.skeletonMaterial.depthWrite = true;
      this.skeletonMaterial.needsUpdate = true;

      this.muscleMaterial.transparent = true;
      this.muscleMaterial.opacity = 0.34;
      this.muscleMaterial.depthWrite = false;
      this.muscleMaterial.needsUpdate = true;

      this.tendonMaterial.transparent = true;
      this.tendonMaterial.opacity = 0.38;
      this.tendonMaterial.depthWrite = false;
      this.tendonMaterial.needsUpdate = true;

      this.skinMaterial.transparent = true;
      this.skinMaterial.opacity = 0.22;
      this.skinMaterial.depthWrite = false;
      this.skinMaterial.needsUpdate = true;

      this.skeletonMeshes.forEach((m) => { m.visible = true; m.renderOrder = 0; });
      this.muscleMeshes.forEach((m) => { m.visible = true; m.renderOrder = 1; });
      this.tendonMeshes.forEach((m) => { m.visible = true; m.renderOrder = 1; });
      this.skinMeshes.forEach((m) => { m.visible = true; m.renderOrder = 2; });
    }
  }

  public setBilateralMode(enabled: boolean): void {
    if (this.isBilateralMode === enabled) return;
    this.isBilateralMode = enabled;
    this.rebuildPointsAndSplines();
  }

  public isBilateral(): boolean {
    return this.isBilateralMode;
  }

  public toggleBilateral(): boolean {
    this.setBilateralMode(!this.isBilateralMode);
    return this.isBilateralMode;
  }

  private isBilateralMeridian(meridianId: string): boolean {
    // Ren Mai (CV) and Du Mai (GV) are midline vessels and not bilateral
    return meridianId !== 'konzeptionsgefaess' && meridianId !== 'lenkergefaess';
  }

  public setXrayTransparency(enabled?: boolean): boolean {
    const nextXray = enabled !== undefined ? enabled : this.displayMode !== 'xray';
    if (nextXray) {
      this.setDisplayMode('xray');
    } else {
      this.setDisplayMode('anatomy');
    }
    return nextXray;
  }

  public isXray(): boolean {
    return this.isXrayMode;
  }

  public setTheme(theme: 'light' | 'dark'): void {
    const isDark = theme === 'dark';
    this.scene.background = new THREE.Color(isDark ? COLOR_BG_DARK : COLOR_BG_WARM);
    this.skinMaterial.color.setHex(isDark ? 0x3b4d47 : 0xebe4da);
    this.skinMaterial.needsUpdate = true;
    if (this.displayMode === 'clinical') {
      this.applyDisplayMode();
    }
  }

  public setCalibrationMode(enabled: boolean): void {
    this.isCalibrationMode = enabled;
    this.calibrationReadoutEl.style.display = enabled ? 'flex' : 'none';
    this.renderer.domElement.style.cursor = enabled ? 'crosshair' : 'grab';
    if (!enabled && this.lastCalibrationMarker) {
      this.scene.remove(this.lastCalibrationMarker);
      this.lastCalibrationMarker = null;
    }
  }

  public isCalibrationActive(): boolean {
    return this.isCalibrationMode;
  }

  public setHighlightedPoints(matchedIds: Set<string>, recommendedIds: Set<string>): void {
    this.highlightedPointIds = new Set(matchedIds);
    this.recommendedPointIds = new Set(recommendedIds);
    this.updatePointVisualStates();
  }

  public selectPoint(pointId: string | null, animateCamera = true): void {
    const resolved = pointId ? this.resolvePointId(pointId) : null;
    this.selectedPointId = resolved;

    if (resolved) {
      const pt = this.pointDataMap.get(resolved);
      if (pt && !this.visibleMeridians.has(pt.meridian_id)) {
        this.visibleMeridians.add(pt.meridian_id);
        this.rebuildPointsAndSplines();
      }
      if (pt && animateCamera) {
        this.flyToPoint(pt);
      }
    } else {
      this.haloRingMesh.visible = false;
    }

    this.updatePointVisualStates();
  }

  public focusCameraPreset(preset: 'full' | 'pilot_arm' | 'head_chest' | 'back'): void {
    const startPos = this.camera.position.clone();
    const startTarget = this.controls.target.clone();
    let endPos = new THREE.Vector3(0.0, 0.08, 2.45);
    let endTarget = new THREE.Vector3(0.0, 0.0, 0.0);

    if (preset === 'pilot_arm') {
      endPos = new THREE.Vector3(0.28, 0.16, 0.85);
      endTarget = new THREE.Vector3(0.21, 0.18, 0.01);
    } else if (preset === 'head_chest') {
      endPos = new THREE.Vector3(0.0, 0.56, 0.92);
      endTarget = new THREE.Vector3(0.0, 0.52, 0.02);
    } else if (preset === 'back') {
      endPos = new THREE.Vector3(0.0, 0.15, -2.15);
      endTarget = new THREE.Vector3(0.0, 0.12, 0.0);
    }

    this.cameraTween = {
      active: true,
      startTime: performance.now(),
      duration: 650,
      startPos,
      endPos,
      startTarget,
      endTarget,
    };
  }

  public flyToPoint(pt: Point3DEntry): void {
    const targetVec = new THREE.Vector3(pt.position[0], pt.position[1], pt.position[2]);
    const normalVec = pt.normal
      ? new THREE.Vector3(pt.normal[0], pt.normal[1], pt.normal[2]).normalize()
      : new THREE.Vector3(0, 0, 1);

    // Ensure camera looks from a comfortable front/side angle without going under floor
    const viewDir = normalVec.clone();
    viewDir.y = Math.max(-0.15, Math.min(0.45, viewDir.y));
    if (Math.abs(viewDir.z) < 0.35 && Math.abs(viewDir.x) > 0.5) {
      // For medial/lateral arm points (like HE_4..HE_9), angle camera slightly from front-medial
      viewDir.z += 0.65;
    }
    viewDir.normalize();

    const distance = 0.58;
    const endPos = targetVec.clone().addScaledVector(viewDir, distance);

    this.cameraTween = {
      active: true,
      startTime: performance.now(),
      duration: 680,
      startPos: this.camera.position.clone(),
      endPos,
      startTarget: this.controls.target.clone(),
      endTarget: targetVec,
    };
  }

  private sortMeridianPointsForSpline(points: Point3DEntry[]): Point3DEntry[] {
    // Filter out duplicate Felix Mann zone markers from the main spline so curve stays clean
    const filtered = points.filter((p) => !p.id.endsWith('_MANN'));
    return filtered.sort((a, b) => {
      const numA = parseInt(a.id.split('_')[1] || '0', 10);
      const numB = parseInt(b.id.split('_')[1] || '0', 10);
      return numA - numB;
    });
  }

  private rebuildPointsAndSplines(): void {
    // Clear existing point meshes
    while (this.pointsGroup.children.length > 0) {
      const child = this.pointsGroup.children[0] as THREE.Mesh;
      if (child.material) {
        (child.material as THREE.Material).dispose();
      }
      this.pointsGroup.remove(child);
    }
    this.pointMeshesMap.clear();
    this.mirroredPointMeshesMap.clear();

    // Clear existing spline meshes
    while (this.linesGroup.children.length > 0) {
      const child = this.linesGroup.children[0] as THREE.Mesh | THREE.Line;
      if (child.geometry) child.geometry.dispose();
      if (child.material) (child.material as THREE.Material).dispose();
      this.linesGroup.remove(child);
    }

    const byMeridian = new Map<string, Point3DEntry[]>();

    this.pointDataMap.forEach((pt) => {
      if (!this.visibleMeridians.has(pt.meridian_id)) return;

      // Create interactive sphere for point
      const mat = new THREE.MeshStandardMaterial({
        color: COLOR_SAGE_GREEN,
        emissive: COLOR_PRIMARY_TEAL,
        emissiveIntensity: 0.28,
        roughness: 0.25,
        metalness: 0.1,
      });

      const mesh = new THREE.Mesh(this.sphereGeo, mat);
      mesh.position.set(pt.position[0], pt.position[1], pt.position[2]);
      mesh.userData = { pointId: pt.id };
      this.pointsGroup.add(mesh);
      this.pointMeshesMap.set(pt.id, mesh);

      if (this.isBilateralMode && this.isBilateralMeridian(pt.meridian_id)) {
        const mirroredMat = mat.clone();
        const mirroredMesh = new THREE.Mesh(this.sphereGeo, mirroredMat);
        mirroredMesh.position.set(-pt.position[0], pt.position[1], pt.position[2]);
        mirroredMesh.userData = { pointId: pt.id, isMirrored: true };
        this.pointsGroup.add(mirroredMesh);
        this.mirroredPointMeshesMap.set(pt.id, mirroredMesh);
      }

      if (!byMeridian.has(pt.meridian_id)) {
        byMeridian.set(pt.meridian_id, []);
      }
      byMeridian.get(pt.meridian_id)!.push(pt);
    });

    // Build smooth 3D CatmullRom splines for each visible meridian
    byMeridian.forEach((pts, meridianId) => {
      const ordered = this.sortMeridianPointsForSpline(pts);
      if (ordered.length < 2) return;

      const controlPoints = ordered.map((p) => {
        const v = new THREE.Vector3(p.position[0], p.position[1], p.position[2]);
        if (p.normal) {
          v.addScaledVector(new THREE.Vector3(p.normal[0], p.normal[1], p.normal[2]), 0.0012);
        }
        return v;
      });

      const curve = new THREE.CatmullRomCurve3(controlPoints, false, 'centripetal', 0.35);
      const divisions = Math.max(ordered.length * 16, 48);
      const curvePoints = curve.getPoints(divisions);

      const isPilotHeart = meridianId === 'herz';
      const lineColor = isPilotHeart ? COLOR_TERRACOTTA : COLOR_SAGE_GREEN;

      // Smooth 3D tube + crisp center line
      const tubeGeo = new THREE.TubeGeometry(curve, divisions, 0.0018, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: lineColor,
        emissive: lineColor,
        emissiveIntensity: 0.22,
        roughness: 0.35,
        transparent: true,
        opacity: 0.88,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      this.linesGroup.add(tubeMesh);

      const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: lineColor,
        transparent: true,
        opacity: 0.95,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      this.linesGroup.add(line);

      if (this.isBilateralMode && this.isBilateralMeridian(meridianId)) {
        const mirroredControlPoints = ordered.map((p) => {
          const v = new THREE.Vector3(-p.position[0], p.position[1], p.position[2]);
          if (p.normal) {
            v.addScaledVector(new THREE.Vector3(-p.normal[0], p.normal[1], p.normal[2]), 0.0012);
          }
          return v;
        });

        const mirroredCurve = new THREE.CatmullRomCurve3(mirroredControlPoints, false, 'centripetal', 0.35);
        const mirroredCurvePoints = mirroredCurve.getPoints(divisions);

        const mirroredTubeGeo = new THREE.TubeGeometry(mirroredCurve, divisions, 0.0018, 8, false);
        const mirroredTubeMat = tubeMat.clone();
        const mirroredTubeMesh = new THREE.Mesh(mirroredTubeGeo, mirroredTubeMat);
        this.linesGroup.add(mirroredTubeMesh);

        const mirroredLineGeo = new THREE.BufferGeometry().setFromPoints(mirroredCurvePoints);
        const mirroredLineMat = lineMat.clone();
        const mirroredLineMesh = new THREE.Line(mirroredLineGeo, mirroredLineMat);
        this.linesGroup.add(mirroredLineMesh);
      }
    });

    this.updatePointVisualStates();
  }

  private updatePointVisualStates(): void {
    const hasSearchOrRep =
      this.highlightedPointIds.size > 0 || this.recommendedPointIds.size > 0;

    this.pointMeshesMap.forEach((mesh, pid) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      const isSelected = pid === this.selectedPointId;
      const isHovered = pid === this.hoveredPointId;
      const isRecommended = this.recommendedPointIds.has(pid);
      const isMatched = this.highlightedPointIds.has(pid);

      if (isSelected || isHovered) {
        mat.color.setHex(COLOR_TERRACOTTA);
        mat.emissive.setHex(COLOR_TERRACOTTA);
        mat.emissiveIntensity = isSelected ? 0.65 : 0.5;
        mat.opacity = 1.0;
        mat.transparent = false;
        const scale = isSelected ? 1.55 : 1.38;
        mesh.scale.set(scale, scale, scale);
      } else if (isRecommended || isMatched) {
        mat.color.setHex(COLOR_MATCH_AMBER);
        mat.emissive.setHex(COLOR_MATCH_AMBER);
        mat.emissiveIntensity = 0.55;
        mat.opacity = 1.0;
        mat.transparent = false;
        mesh.scale.set(1.35, 1.35, 1.35);
      } else {
        mat.color.setHex(COLOR_SAGE_GREEN);
        mat.emissive.setHex(COLOR_PRIMARY_TEAL);
        mat.emissiveIntensity = 0.25;
        if (hasSearchOrRep) {
          mat.transparent = true;
          mat.opacity = 0.42;
        } else {
          mat.transparent = false;
          mat.opacity = 1.0;
        }
        mesh.scale.set(1.0, 1.0, 1.0);
      }
      mat.needsUpdate = true;
    });

    this.mirroredPointMeshesMap.forEach((mesh, pid) => {
      const primaryMesh = this.pointMeshesMap.get(pid);
      if (primaryMesh) {
        const primaryMat = primaryMesh.material as THREE.MeshStandardMaterial;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.color.copy(primaryMat.color);
        mat.emissive.copy(primaryMat.emissive);
        mat.emissiveIntensity = primaryMat.emissiveIntensity;
        mat.opacity = primaryMat.opacity;
        mat.transparent = primaryMat.transparent;
        mesh.scale.copy(primaryMesh.scale);
        mat.needsUpdate = true;
      }
    });

    // Position halo ring around selected or hovered point
    const activeId = this.selectedPointId || this.hoveredPointId;
    if (activeId && this.pointMeshesMap.has(activeId)) {
      const targetMesh = this.pointMeshesMap.get(activeId)!;
      this.haloRingMesh.position.copy(targetMesh.position);
      this.haloRingMesh.lookAt(this.camera.position);
      this.haloRingMesh.visible = true;
    } else {
      this.haloRingMesh.visible = false;
    }
  }

  private bindEvents(): void {
    const dom = this.renderer.domElement;

    let pointerDownPos = { x: 0, y: 0 };

    dom.addEventListener('pointerdown', (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    });

    dom.addEventListener('pointermove', (e: PointerEvent) => {
      const rect = dom.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.handleHoverRaycast(e.clientX - rect.left, e.clientY - rect.top);
    });

    dom.addEventListener('pointerleave', () => {
      this.hoveredPointId = null;
      this.tooltipEl.style.display = 'none';
      this.updatePointVisualStates();
    });

    dom.addEventListener('pointerup', (e: PointerEvent) => {
      const dx = e.clientX - pointerDownPos.x;
      const dy = e.clientY - pointerDownPos.y;
      if (Math.hypot(dx, dy) > 5) {
        // User was dragging OrbitControls, not clicking
        return;
      }

      const rect = dom.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.handleClickRaycast();
    });

    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    this.resizeObserver.observe(this.container);
    window.addEventListener('resize', () => this.handleResize());
  }

  private handleHoverRaycast(localX: number, localY: number): void {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const pointMeshes = [...Array.from(this.pointMeshesMap.values()), ...Array.from(this.mirroredPointMeshesMap.values())];
    const intersects = this.raycaster.intersectObjects(pointMeshes, false);

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object as THREE.Mesh;
      const pointId = hitMesh.userData.pointId as string;
      const pt = this.pointDataMap.get(pointId);

      if (pt) {
        if (this.hoveredPointId !== pointId) {
          this.hoveredPointId = pointId;
          this.updatePointVisualStates();
        }
        this.renderer.domElement.style.cursor = 'pointer';
        const transStr = pt.translation ? ` – ${pt.translation}` : '';
        const synCode = pt.id.replace('_', ' ');
        this.tooltipEl.innerHTML = `
          <div class="v3d-tt-header">
            <span class="v3d-tt-code">${synCode}</span>
            <span class="v3d-tt-meridian">${pt.meridian}</span>
          </div>
          <div class="v3d-tt-title">${pt.name_de}${transStr}</div>
        `;
        this.tooltipEl.style.display = 'block';
        this.tooltipEl.style.left = `${Math.min(localX + 14, this.container.clientWidth - 230)}px`;
        this.tooltipEl.style.top = `${Math.max(localY - 12, 10)}px`;
        return;
      }
    }

    if (this.hoveredPointId !== null) {
      this.hoveredPointId = null;
      this.updatePointVisualStates();
    }
    this.tooltipEl.style.display = 'none';
    this.renderer.domElement.style.cursor = this.isCalibrationMode ? 'crosshair' : 'grab';
  }

  private handleClickRaycast(): void {
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // 1. Check if an acupuncture point sphere was clicked
    const pointMeshes = [...Array.from(this.pointMeshesMap.values()), ...Array.from(this.mirroredPointMeshesMap.values())];
    const pointHits = this.raycaster.intersectObjects(pointMeshes, false);

    if (pointHits.length > 0 && !this.isCalibrationMode) {
      const hitMesh = pointHits[0].object as THREE.Mesh;
      const pointId = hitMesh.userData.pointId as string;
      const pt = this.pointDataMap.get(pointId);
      if (pt) {
        if (hitMesh.userData.isMirrored) {
          const mirroredPt: Point3DEntry = {
            ...pt,
            position: [-pt.position[0], pt.position[1], pt.position[2]],
            normal: pt.normal ? [-pt.normal[0], pt.normal[1], pt.normal[2]] : undefined
          };
          this.selectedPointId = pointId;
          this.updatePointVisualStates();
          this.flyToPoint(mirroredPt);
          if (this.callbacks.onPointClick) {
            this.callbacks.onPointClick(pointId, mirroredPt);
          }
        } else {
          this.selectPoint(pointId, true);
          if (this.callbacks.onPointClick) {
            this.callbacks.onPointClick(pointId, pt);
          }
        }
        return;
      }
    }

    // 2. If Calibration Mode (Point Editor) is active, raycast against the outer 3D skin surface mesh!
    const targetSurfaceMeshes = this.skinMeshes.length > 0 ? this.skinMeshes : this.bodyMeshes;
    if (this.isCalibrationMode && targetSurfaceMeshes.length > 0) {
      const bodyHits = this.raycaster.intersectObjects(targetSurfaceMeshes, true);
      if (bodyHits.length > 0) {
        const hit = bodyHits[0];
        const normal = hit.face
          ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld).normalize()
          : new THREE.Vector3(0, 0, 1);

        // Offset slightly along surface normal so sphere sits cleanly on skin
        const surfacePos = hit.point.clone().addScaledVector(normal, 0.0022);
        const coords: [number, number, number] = [
          Number(surfacePos.x.toFixed(4)),
          Number(surfacePos.y.toFixed(4)),
          Number(surfacePos.z.toFixed(4)),
        ];
        const normArr: [number, number, number] = [
          Number(normal.x.toFixed(4)),
          Number(normal.y.toFixed(4)),
          Number(normal.z.toFixed(4)),
        ];

        const targetId = this.selectedPointId || 'UNASSIGNED_POINT';
        console.log(
          `🎯 [Similapunktur 3D-Editor] Punkt: ${targetId} | Position [x, y, z]:`,
          coords,
          '| Normal:',
          normArr,
          `\nJSON: "${targetId}": { "position": [${coords.join(', ')}], "normal": [${normArr.join(', ')}] }`
        );

        const coordsDisplay = this.calibrationReadoutEl.querySelector('#cal-coords-display');
        const jsonSnippet = `[${coords[0]}, ${coords[1]}, ${coords[2]}]`;
        this.calibrationReadoutEl.dataset.lastCoords = jsonSnippet;
        if (coordsDisplay) {
          coordsDisplay.textContent = `${this.selectedPointId ? this.selectedPointId + ' → ' : ''}${jsonSnippet}`;
        }

        // If a point is currently selected, immediately update its 3D coordinate & persist
        if (this.selectedPointId && this.pointDataMap.has(this.selectedPointId)) {
          const pt = this.pointDataMap.get(this.selectedPointId)!;
          pt.position = coords;
          pt.normal = normArr;
          this.saveCalibrationOverride(this.selectedPointId, coords);
          this.rebuildPointsAndSplines();
        } else {
          // Place temporary terracotta calibration marker on surface
          if (!this.lastCalibrationMarker) {
            const markerMat = new THREE.MeshStandardMaterial({
              color: COLOR_TERRACOTTA,
              emissive: COLOR_TERRACOTTA,
              emissiveIntensity: 0.6,
            });
            this.lastCalibrationMarker = new THREE.Mesh(this.sphereGeo, markerMat);
            this.lastCalibrationMarker.scale.set(1.4, 1.4, 1.4);
            this.scene.add(this.lastCalibrationMarker);
          }
          this.lastCalibrationMarker.position.set(coords[0], coords[1], coords[2]);
        }

        if (this.callbacks.onPointCalibrate) {
          this.callbacks.onPointCalibrate(this.selectedPointId, coords, normArr);
        }
      }
    }
  }

  private saveCalibrationOverride(pointId: string, coords: [number, number, number]): void {
    const raw = localStorage.getItem('similapunktur_points_3d_overrides_bp3d_v2');
    let overrides: Record<string, [number, number, number]> = {};
    if (raw) {
      try {
        overrides = JSON.parse(raw);
      } catch {
        overrides = {};
      }
    }
    overrides[pointId] = coords;
    localStorage.setItem('similapunktur_points_3d_overrides_bp3d_v2', JSON.stringify(overrides));

    // Also attempt backend persistence if server.py is running
    fetch('/api/update-point-3d-coordinate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ point_id: pointId, position: coords }),
    }).catch(() => {
      // Static/dev mode fallback already saved in localStorage
    });
  }

  public exportPoints3DJson(): void {
    const dataset: Points3DDataset = {
      version: '1.0.0',
      model: 'models/human_body.glb',
      coordinate_system:
        'Three.js Right-Handed (+X anatomical left / viewer right, +Y up, +Z anterior / front)',
      pilot_meridians: ['Herz-Leitbahn', 'Lungen-Leitbahn'],
      points: Array.from(this.pointDataMap.values()),
    };
    const blob = new Blob([JSON.stringify(dataset, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'points_3d.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  public handleResize(): void {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width <= 0 || height <= 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private startAnimationLoop(): void {
    const animate = (now: number) => {
      this.animationFrameId = requestAnimationFrame(animate);

      if (this.cameraTween && this.cameraTween.active) {
        const elapsed = now - this.cameraTween.startTime;
        const t = Math.min(1, elapsed / this.cameraTween.duration);
        // Cubic ease-out
        const ease = 1 - Math.pow(1 - t, 3);

        this.camera.position.lerpVectors(this.cameraTween.startPos, this.cameraTween.endPos, ease);
        this.controls.target.lerpVectors(
          this.cameraTween.startTarget,
          this.cameraTween.endTarget,
          ease
        );

        if (t >= 1) {
          this.cameraTween.active = false;
        }
      }

      if (this.haloRingMesh.visible) {
        this.haloRingMesh.lookAt(this.camera.position);
        const pulse = 1.0 + 0.14 * Math.sin(now * 0.005);
        this.haloRingMesh.scale.set(pulse, pulse, 1);
      }

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  public dispose(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.renderer.dispose();
  }
}
