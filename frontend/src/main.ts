import { BodyViewer3D, Point3DEntry } from './components/BodyViewer3D';
import { renderMatrixTable as renderMatrixTableUI } from './ui/MatrixTable';
import { renderDevReviewTables as renderDevReviewTablesUI, filterDevReviewTable as filterDevReviewTableUI } from './ui/DevReviewTable';
import { BoerickeBookView } from './ui/BoerickeBookView';
import { CurationWorkbench } from './ui/CurationWorkbench';
import { SelectedSymptom, PointData, BoerickeRepertoryDataset } from './core/types';
import {
  filterAndRankSuggestions,
  classifySymptomStatic,
  getClientSynonyms as getClientSynonymsCore
} from './core/search';
import {
  buildUniqueRemediesList,
  getRemedyDetails,
  calculateRepertorisation
} from './core/repertory';

// State Management
let currentMeridian: string | null = null;
let currentPointId: string | null = null;
let activePoints: any[] = [];
let matchedPointIds: Set<string> = new Set();
let currentSearchQuery = "";
let isEditorActive = false;
let suggestionsList: string[] = [];
let activeSuggestionIndex = -1;
let allPointsData: PointData[] = [];
let boerickeBookView: BoerickeBookView | null = null;
let curationWorkbench: CurationWorkbench | null = null;
let isStaticMode = false;
let synonymsData: Record<string, string[]> = {};
let bodyViewer3D: BodyViewer3D | null = null;

let selectedSymptoms: SelectedSymptom[] = [];
let recommendedPointsSet = new Set<string>();
let lastViewedPointId: string | null = null;
let activeModalities = new Set<string>();
const rubricsRemediesMap = new Map<string, Map<string, number>>();
let allRemediesList: string[] = [];
let activeRemedyName: string | null = null;

const remedyContraindications = new Map<string, Set<string>>();

let staticBoerickeData: any = null;
let staticTtbData: any = null;
let staticBoerickeRepData: BoerickeRepertoryDataset | null = null;

// Active search sources (Boericke Repertorium exclusively enabled by default)
const activeSearchSources: { boericke: boolean; ttb: boolean; points: boolean } = {
  boericke: true,
  ttb: false,
  points: false
};
let boerickeSuggestions: string[] = [];
let ttbSuggestions: string[] = [];
let pointsSuggestions: string[] = [];

// Constants
const MERIDIANS = [
  { id: "herz", name: "Herz-Leitbahn", short: "Herz (HT)" },
  { id: "lunge", name: "Lungen-Leitbahn", short: "Lunge (LU)" },
  { id: "blase", name: "Blasen-Leitbahn", short: "Blase (BL)" },
  { id: "dickdarm", name: "Dickdarm-Leitbahn", short: "Dickdarm (LI)" },
  { id: "magen", name: "Magen-Leitbahn", short: "Magen (ST)" },
  { id: "duenndarm", name: "Dünndarm-Leitbahn", short: "Dünndarm (SI)" },
  { id: "niere", name: "Nieren-Leitbahn", short: "Niere (KI)" },
  { id: "perikard", name: "Perikard-Leitbahn", short: "Perikard (PC)" },
  { id: "dreifacherwaermer", name: "Dreifacherwärmer-Leitbahn", short: "3-Erwärmer (TE)" },
  { id: "gallenblase", name: "Gallenblasen-Leitbahn", short: "Gallenblase (GB)" },
  { id: "leber", name: "Leber-Leitbahn", short: "Leber (LR)" },
  { id: "milz_pankreas", name: "Milz-Pankreas-Leitbahn", short: "Milz (SP)" },
  { id: "konzeptionsgefaess", name: "Konzeptionsgefäß", short: "Konzeption (CV)" },
  { id: "lenkergefaess", name: "Lenkergefäß", short: "Lenker (GV)" },
  { id: "extrapunkte", name: "Extrapunkte", short: "Extrapunkte" }
];

// DOM Elements
const meridianListEl = document.getElementById("meridian-list") as HTMLUListElement;
const visualizerPlaceholderEl = document.getElementById("visualizer-placeholder") as HTMLDivElement;
const visualizerActiveEl = document.getElementById("visualizer-active") as HTMLDivElement;
const meridianImageEl = document.getElementById("meridian-image") as HTMLImageElement;
const svgOverlayEl = document.getElementById("svg-overlay") as HTMLDivElement;
const themeToggleEl = document.getElementById("theme-toggle") as HTMLButtonElement;
const sunIconEl = themeToggleEl.querySelector(".sun-icon") as SVGElement;
const moonIconEl = themeToggleEl.querySelector(".moon-icon") as SVGElement;

// Search DOM
const searchInputEl = document.getElementById("search-input") as HTMLInputElement;
const clearSearchBtnEl = document.getElementById("clear-search-btn") as HTMLButtonElement;
const searchResultsSectionEl = document.getElementById("search-results-section") as HTMLDivElement;
const resultsCountEl = document.getElementById("results-count") as HTMLSpanElement;
const searchQueryDisplayEl = document.getElementById("search-query-display") as HTMLSpanElement;
const searchResultsListEl = document.getElementById("search-results-list") as HTMLUListElement;

// Meridian Points DOM
const meridianPointsSectionEl = document.getElementById("meridian-points-section") as HTMLDivElement;
const meridianPointsListEl = document.getElementById("meridian-points-list") as HTMLUListElement;

// Detail DOM
const detailPlaceholderEl = document.getElementById("detail-placeholder") as HTMLDivElement;
const detailPanelEl = document.getElementById("detail-panel") as HTMLDivElement;
const warningBannerEl = document.getElementById("warning-banner") as HTMLDivElement;
const warningTextEl = document.getElementById("warning-text") as HTMLSpanElement;
const pointIdTitleEl = document.getElementById("point-id-title") as HTMLHeadingElement;
const pointMeridianBadgeEl = document.getElementById("point-meridian") as HTMLSpanElement;
const pointNameDeEl = document.getElementById("point-name-de") as HTMLHeadingElement;
const pointTranslationEl = document.getElementById("point-translation") as HTMLParagraphElement;
const pointLocalisationEl = document.getElementById("point-localisation") as HTMLParagraphElement;
const effectsListEl = document.getElementById("effects-list") as HTMLUListElement;
const indicationsListEl = document.getElementById("indications-list") as HTMLUListElement;
const remediesBadgesEl = document.getElementById("remedies-badges") as HTMLDivElement;
const rubricsListEl = document.getElementById("rubrics-list") as HTMLDivElement;

// Custom Tooltip Element
let tooltipEl: HTMLDivElement | null = null;

// Initialize App
async function loadSynonyms() {
  try {
    const res = await fetch("synonyms.json");
    if (res.ok) {
      synonymsData = await res.json();
      console.log(`Loaded ${Object.keys(synonymsData).length} synonym groups.`);
    }
  } catch (err) {
    console.warn("Failed to load synonyms.json, falling back.", err);
  }
}

function buildRemediesList() {
  allRemediesList = buildUniqueRemediesList(allPointsData);
  renderRemediesSidebarList();
}

function renderRemediesSidebarList(filterQuery = "") {
  const listEl = document.getElementById("remedy-sidebar-list") as HTMLUListElement;
  if (!listEl) return;
  listEl.innerHTML = "";
  
  const query = filterQuery.toLowerCase().trim().replace(/\.$/, "");
  
  allRemediesList.forEach(remName => {
    const cleanRemName = remName.toLowerCase().replace(/\.$/, "");
    if (query && !cleanRemName.includes(query)) {
      return;
    }
    
    const details = getRemedyDetailsClientSide(remName);
    const totalPointsCount = details.direct_points.length + details.rubrics.length;
    
    const li = document.createElement("li");
    li.className = "remedy-li-item";
    if (activeRemedyName === remName) {
      li.classList.add("active");
    }
    
    li.innerHTML = `
      <span class="remedy-li-name">${remName}</span>
      <span class="remedy-li-count">${totalPointsCount} P.</span>
    `;
    
    li.addEventListener("click", () => {
      activeRemedyName = remName;
      listEl.querySelectorAll(".remedy-li-item").forEach(item => item.classList.remove("active"));
      li.classList.add("active");
      
      showRemedyDetails(remName);
    });
    
    listEl.appendChild(li);
  });
  
  if (listEl.children.length === 0) {
    listEl.innerHTML = `<li class="dimmed" style="padding: 10px 14px; text-align: center;">Keine passenden Heilmittel gefunden.</li>`;
  }
}

async function init3DViewer() {
  const containerEl = document.getElementById("viewer-3d-container");
  if (!containerEl) return;

  bodyViewer3D = new BodyViewer3D(containerEl, {
    onPointClick: (pointId: string, _pt3D: Point3DEntry) => {
      selectPoint(pointId, false);
    },
    onPointCalibrate: (pointId, coords) => {
      const msg = pointId
        ? `3D-Koordinate für ${pointId} gesetzt: [${coords.join(", ")}]`
        : `3D-Oberflächenkoordinate: [${coords.join(", ")}] (Konsole prüfen)`;
      showToastNotification(msg);
    },
  });
  (window as any).bodyViewer3D = bodyViewer3D;
  renderMeridianFilterBar();

  try {
    await Promise.all([
      bodyViewer3D.loadModel("models/human_body.glb"),
      bodyViewer3D.loadPointsData("data/points_3d.json"),
    ]);

    // Merge supplementary pilot meridian points (HE_2, HE_4, HE_6, HE_8, LU_3, LU_4, LU_6, LU_8)
    // into allPointsData so all HT 1-9 and LU 1-11 points have full clinical profiles
    const existingIds = new Set(allPointsData.map((p) => p.point_id));
    bodyViewer3D.getAllPoints().forEach((pt3d) => {
      if (!existingIds.has(pt3d.id) && pt3d.supplementary_details) {
        const sup = pt3d.supplementary_details;
        allPointsData.push({
          point_id: pt3d.id,
          name_german: sup.name_german,
          name_chinese: sup.name_chinese,
          name_translation: sup.name_translation,
          meridian: sup.meridian,
          localisation_text: sup.localisation_text,
          effects: sup.effects,
          indications: sup.indications,
          assigned_homeopathics: sup.assigned_homeopathics,
          general_analysis_rubrics: [],
          precautions_or_contraindications: null,
          visuals: {
            image_filename: sup.image_filename,
            relative_coordinates: { x_percent: 50, y_percent: 50 },
          },
        });
      }
    });

    // Check URL parameter ?edit=true for automatic Point Calibration Mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("edit") === "true") {
      setEditorMode(true);
    }
  } catch (err) {
    console.error("Failed to initialize 3D Body Viewer:", err);
  }
}

function renderMeridianFilterBar() {
  const chipsContainer = document.getElementById("meridian-filter-chips");
  if (!chipsContainer || !bodyViewer3D) return;
  chipsContainer.innerHTML = "";

  const visibleSet = new Set(bodyViewer3D.getVisibleMeridians());

  MERIDIANS.forEach((m) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "meridian-filter-chip";
    btn.dataset.meridianId = m.id;
    if (visibleSet.has(m.id)) {
      btn.classList.add("active");
    }
    btn.textContent = m.short;
    btn.title = `${m.name} im 3D-Modell ein-/ausblenden`;

    btn.addEventListener("click", () => {
      if (!bodyViewer3D) return;
      const isNowVisible = bodyViewer3D.toggleMeridian(m.id);
      btn.classList.toggle("active", isNowVisible);
      updatePresetFilterButtonsState();
    });

    chipsContainer.appendChild(btn);
  });
}

function updatePresetFilterButtonsState() {
  if (!bodyViewer3D) return;
  const visible = new Set(bodyViewer3D.getVisibleMeridians());
  const isPilotOnly = visible.size === 2 && visible.has("herz") && visible.has("lunge");
  const isAll = visible.size === MERIDIANS.length;

  document.querySelectorAll(".meridian-filter-chip.preset-chip").forEach((el) => {
    const btn = el as HTMLButtonElement;
    if (btn.dataset.filterPreset === "pilot") {
      btn.classList.toggle("active", isPilotOnly);
    } else if (btn.dataset.filterPreset === "all") {
      btn.classList.toggle("active", isAll);
    }
  });

  document.querySelectorAll("#meridian-filter-chips .meridian-filter-chip").forEach((el) => {
    const btn = el as HTMLButtonElement;
    const mid = btn.dataset.meridianId || "";
    btn.classList.toggle("active", visible.has(mid));
  });
}

function setEditorMode(active: boolean) {
  isEditorActive = active;
  const editorToggleEl = document.getElementById("editor-toggle");
  const editorBannerEl = document.getElementById("editor-banner");

  if (editorToggleEl) editorToggleEl.classList.toggle("active", isEditorActive);
  if (editorBannerEl) editorBannerEl.style.display = isEditorActive ? "block" : "none";
  if (svgOverlayEl) svgOverlayEl.classList.toggle("editor-active-cursor", isEditorActive);
  if (bodyViewer3D) bodyViewer3D.setCalibrationMode(isEditorActive);

  showToastNotification(
    isEditorActive
      ? "🎯 3D/2D Kalibrierungs-Editor aktiviert!"
      : "Kalibrierungs-Editor deaktiviert."
  );
}

async function init() {
  renderMeridianList();
  await loadSynonyms();
  
  // Try to load static JSON database
  try {
    const res = await fetch("similapunktur.json");
    if (res.ok) {
      allPointsData = await res.json();
      console.log(`Loaded ${allPointsData.length} points from static JSON.`);
      
      // Build rubricsRemediesMap for O(1) lookups
      allPointsData.forEach(p => {
        if (p.general_analysis_rubrics) {
          p.general_analysis_rubrics.forEach((rub: any) => {
            let remMap = rubricsRemediesMap.get(rub.rubric_name);
            if (!remMap) {
              remMap = new Map<string, number>();
              rubricsRemediesMap.set(rub.rubric_name, remMap);
            }
            if (rub.remedies) {
              rub.remedies.forEach((rem: any) => {
                const existing = remMap!.get(rem.name) || 0;
                if (rem.grade > existing) {
                  remMap!.set(rem.name, rem.grade);
                }
              });
            }
          });
        }
      });
      
      if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
        isStaticMode = true;
      }
      buildRemediesList();
    }
  } catch (err) {
    console.warn("Failed to load static similapunktur.json, falling back to API.", err);
  }

  await init3DViewer();
  setupEventListeners();
  await loadSuggestions();
  
  // Auto-select first meridian
  const firstMeridianLi = meridianListEl.querySelector("li");
  if (firstMeridianLi) {
    const name = firstMeridianLi.dataset.name || "";
    selectMeridian(name, firstMeridianLi);
  }
}

// 1. Render Meridian List
function renderMeridianList() {
  meridianListEl.innerHTML = "";
  MERIDIANS.forEach((m) => {
    const li = document.createElement("li");
    li.dataset.id = m.id;
    li.dataset.name = m.name;
    li.innerHTML = `
      <div class="point-title-row">
        <span>${m.name}</span>
      </div>
    `;
    li.addEventListener("click", () => selectMeridian(m.name, li));
    meridianListEl.appendChild(li);
  });
}

function mapLocalPointsByMeridian(name: string) {
  return sortPointsBySequence(
    allPointsData
      .filter(p => p.meridian === name)
      .map(p => ({
        id: p.point_id,
        name_de: p.name_german,
        translation: p.name_translation,
        meridian: p.meridian,
        warning: p.precautions_or_contraindications,
        visuals: p.visuals
      }))
  );
}

// 2. Select Meridian
async function selectMeridian(name: string, element: HTMLLIElement) {
  // Clear active classes
  meridianListEl.querySelectorAll("li").forEach(li => li.classList.remove("active"));
  element.classList.add("active");
  
  currentMeridian = name;

  // Ensure selected meridian is also visible in the 3D viewer
  const meridianEntry = MERIDIANS.find(m => m.name === name);
  if (meridianEntry && bodyViewer3D) {
    bodyViewer3D.toggleMeridian(meridianEntry.id, true);
    updatePresetFilterButtonsState();
  }
  
  try {
    if (isStaticMode && allPointsData.length > 0) {
      activePoints = mapLocalPointsByMeridian(name);
    } else {
      try {
        const res = await fetch(`/api/points-by-meridian?name=${encodeURIComponent(name)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        // Merge any supplementary 3D pilot points for this meridian
        const apiIds = new Set(data.points.map((p: any) => p.id));
        const extraPts = mapLocalPointsByMeridian(name).filter(p => !apiIds.has(p.id));
        activePoints = sortPointsBySequence([...data.points, ...extraPts]);
      } catch {
        isStaticMode = true;
        activePoints = mapLocalPointsByMeridian(name);
      }
    }
    
    // Set active visualizer
    if (activePoints.length > 0) {
      const imgFilename = activePoints[0].visuals.image_filename;
      meridianImageEl.src = `assets/${imgFilename}`;
      
      visualizerPlaceholderEl.style.display = "none";
      visualizerActiveEl.style.display = "inline-block";
      
      // Render overlay circles
      drawHotspots();
      
      // Render points list in sidebar
      renderMeridianPointsList();
    }
  } catch (err) {
    console.error("Error loading meridian points:", err);
  }
}

// 3. Draw Hotspots & Meridian Connections
function sortPointsBySequence(points: any[]): any[] {
  return [...points].sort((a, b) => {
    const reg = /^([A-Z]+)_(\d+)(.*)$/;
    const matchA = a.id.match(reg);
    const matchB = b.id.match(reg);
    
    if (matchA && matchB) {
      if (matchA[1] !== matchB[1]) {
        return matchA[1].localeCompare(matchB[1]);
      }
      const numA = parseInt(matchA[2], 10);
      const numB = parseInt(matchB[2], 10);
      if (numA !== numB) {
        return numA - numB;
      }
      return matchA[3].localeCompare(matchB[3]);
    }
    return a.id.localeCompare(b.id);
  });
}

function drawHotspots() {
  if (bodyViewer3D) {
    bodyViewer3D.setHighlightedPoints(matchedPointIds, recommendedPointsSet);
  }
  if (!svgOverlayEl) return;
  svgOverlayEl.innerHTML = "";
  
  // Render Layer 2: SVG Connections (between positioned points)
  const svgEl = document.getElementById("meridian-connections-svg") as unknown as SVGSVGElement | null;
  if (svgEl) {
    svgEl.innerHTML = "";
    if (activePoints.length >= 2) {
      const sortedPoints = sortPointsBySequence(activePoints);
      
      // Filter out unpositioned points (exactly 50.0, 50.0)
      const positionedPoints = sortedPoints.filter(pt => {
        const coords = pt.visuals.relative_coordinates;
        return !(coords.x_percent === 50 && coords.y_percent === 50);
      });
      
      for (let i = 0; i < positionedPoints.length - 1; i++) {
        const ptA = positionedPoints[i];
        const ptB = positionedPoints[i + 1];
        
        const x1 = ptA.visuals.relative_coordinates.x_percent;
        const y1 = ptA.visuals.relative_coordinates.y_percent;
        const x2 = ptB.visuals.relative_coordinates.x_percent;
        const y2 = ptB.visuals.relative_coordinates.y_percent;
        
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", `${x1}`);
        line.setAttribute("y1", `${y1}`);
        line.setAttribute("x2", `${x2}`);
        line.setAttribute("y2", `${y2}`);
        line.setAttribute("class", "meridian-line");
        svgEl.appendChild(line);
      }
    }
  }
  
  const isSearchActive = matchedPointIds.size > 0;
  
  activePoints.forEach((p) => {
    const cx = p.visuals.relative_coordinates.x_percent;
    const cy = p.visuals.relative_coordinates.y_percent;
    
    const g = document.createElement("div");
    g.className = "hotspot-group";
    g.dataset.id = p.id;
    g.style.left = `${cx}%`;
    g.style.top = `${cy}%`;
    
    const isRepertorisationActive = recommendedPointsSet.size > 0;
    
    // Highlight matched state or recommended state
    if (isRepertorisationActive) {
      if (recommendedPointsSet.has(p.id)) {
        g.classList.add("recommended");
      } else {
        g.classList.add("dimmed");
      }
    } else if (isSearchActive) {
      if (matchedPointIds.has(p.id)) {
        g.classList.add("matched");
      } else {
        g.classList.add("dimmed");
      }
    }
    
    if (p.id === currentPointId) {
      g.classList.add("active");
    }
    
    // Outer pulsing ring
    const outer = document.createElement("div");
    outer.className = "hotspot-outer";
    
    // Inner solid point
    const inner = document.createElement("div");
    inner.className = "hotspot-inner";
    
    g.appendChild(outer);
    g.appendChild(inner);
    
    // Tooltip and Click events
    g.addEventListener("mouseenter", (e) => showTooltip(p.name_de, p.translation, e));
    g.addEventListener("mousemove", (e) => updateTooltipPosition(e));
    g.addEventListener("mouseleave", () => hideTooltip());
    g.addEventListener("click", () => selectPoint(p.id, true));
    
    svgOverlayEl.appendChild(g);
  });
}

async function selectPoint(pointId: string, focus3DCamera = true) {
  currentPointId = pointId;
  lastViewedPointId = pointId;
  
  // Switch meridian if the selected point is on a different meridian
  if (allPointsData && allPointsData.length > 0) {
    const ptData = allPointsData.find(p => p.point_id === pointId);
    if (ptData && ptData.meridian) {
      const activeMeridianLi = meridianListEl.querySelector("li.active") as HTMLLIElement;
      const currentMeridianName = activeMeridianLi ? activeMeridianLi.dataset.name : "";
      
      if (ptData.meridian !== currentMeridianName) {
        const targetLi = meridianListEl.querySelector(`li[data-name="${ptData.meridian}"]`) as HTMLLIElement;
        if (targetLi) {
          await selectMeridian(ptData.meridian, targetLi);
        }
      }
    }
  }

  // Sync 3D Body Viewer selection
  if (bodyViewer3D) {
    bodyViewer3D.selectPoint(pointId, focus3DCamera);
    updatePresetFilterButtonsState();
  }
  
  // Highlight in SVG
  svgOverlayEl.querySelectorAll(".hotspot-group").forEach((g) => {
    const el = g as HTMLDivElement;
    if (el.dataset.id === pointId) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
  
  // Highlight in Lists
  document.querySelectorAll(".selector-list li").forEach((li) => {
    const el = li as HTMLLIElement;
    if (el.dataset.id === pointId) {
      el.classList.add("active");
    } else {
      if (el.parentElement?.id !== "meridian-list") {
        el.classList.remove("active");
      }
    }
  });

  try {
    const localPt = allPointsData.find(p => p.point_id === pointId);
    if (isStaticMode && localPt) {
      renderPointDetails(localPt);
    } else {
      try {
        const res = await fetch(`/api/point-details?id=${pointId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        renderPointDetails(data);
      } catch {
        if (localPt) {
          renderPointDetails(localPt);
        }
      }
    }
  } catch (err) {
    console.error("Error loading point details:", err);
  }
}

function openOriginalDrawingModal(pointData: any) {
  const modal = document.getElementById("original-drawing-modal");
  const titleEl = document.getElementById("original-drawing-title");
  const subtitleEl = document.getElementById("original-drawing-subtitle");
  const imgEl = document.getElementById("original-drawing-img") as HTMLImageElement | null;
  const markerEl = document.getElementById("original-drawing-marker");
  const captionEl = document.getElementById("original-drawing-caption");

  if (!modal || !imgEl) return;

  const imgFilename =
    pointData?.visuals?.image_filename ||
    bodyViewer3D?.getPointData(pointData?.point_id || "")?.image_filename ||
    "meridian_herz.png";

  imgEl.src = `assets/${imgFilename}`;
  if (titleEl) {
    titleEl.textContent = `Originalzeichnung – ${pointData.meridian || "Leitbahn"} (${getPointSynonym(pointData.point_id)})`;
  }
  if (subtitleEl) {
    subtitleEl.textContent = `${pointData.name_german}${pointData.name_translation ? " – „" + pointData.name_translation + "“" : ""} | Datei: out/assets/${imgFilename}`;
  }

  if (markerEl) {
    const coords = pointData?.visuals?.relative_coordinates;
    if (coords && !(coords.x_percent === 50 && coords.y_percent === 50)) {
      markerEl.style.left = `${coords.x_percent}%`;
      markerEl.style.top = `${coords.y_percent}%`;
      markerEl.style.display = "block";
    } else {
      markerEl.style.display = "none";
    }
  }

  if (captionEl) {
    const remStr =
      pointData.assigned_homeopathics && pointData.assigned_homeopathics.length > 0
        ? pointData.assigned_homeopathics.join(", ")
        : "Siehe Rubriken";
    captionEl.innerHTML = `
      <strong>Lokalisation (${pointData.name_german}):</strong> ${pointData.localisation_text || "—"}<br>
      <strong>Zugeordnete Similapunktur-Mittel:</strong> ${remStr}
    `;
  }

  modal.style.display = "flex";
}

// 5. Render Point Details
let currentRenderedPointData: any = null;

function renderPointDetails(data: any) {
  currentRenderedPointData = data;
  // Show detail panel
  detailPlaceholderEl.style.display = "none";
  detailPanelEl.style.display = "flex";
  
  // Reset remedy view toggle
  const locSections = detailPanelEl.querySelectorAll(".detail-section");
  const tabsSection = detailPanelEl.querySelector(".detail-tabs") as HTMLElement;
  locSections.forEach(sec => (sec as HTMLElement).style.display = "block");
  if (tabsSection) tabsSection.style.display = "block";
  const remedyView = document.getElementById("remedy-details-view");
  if (remedyView) remedyView.style.display = "none";
  
  // Warning banner
  const warning = data.precautions_or_contraindications;
  if (warning) {
    warningTextEl.textContent = warning;
    warningBannerEl.style.display = "flex";
  } else {
    warningBannerEl.style.display = "none";
  }
  
  // Basic info
  pointIdTitleEl.textContent = getPointSynonym(data.point_id);
  pointMeridianBadgeEl.textContent = data.meridian;
  pointNameDeEl.textContent = data.name_german;
  pointTranslationEl.textContent = data.name_translation || "Ohne Übersetzung";
  pointLocalisationEl.textContent = data.localisation_text;

  // Populate Similapunktur Interactive Flip-Box
  const flipBoxEl = document.getElementById("point-flip-box");
  if (flipBoxEl) {
    flipBoxEl.classList.remove("flipped");
  }
  const flipFrontTitle = document.getElementById("flip-front-title");
  if (flipFrontTitle) {
    const zh = data.name_chinese ? ` (${data.name_chinese})` : "";
    flipFrontTitle.textContent = `${data.name_german}${zh}`;
  }
  const flipRemediesSummary = document.getElementById("flip-remedies-summary");
  if (flipRemediesSummary) {
    if (data.assigned_homeopathics && data.assigned_homeopathics.length > 0) {
      flipRemediesSummary.textContent = data.assigned_homeopathics.slice(0, 5).join(", ");
    } else if (data.general_analysis_rubrics && data.general_analysis_rubrics.length > 0) {
      const topRems = (data.general_analysis_rubrics[0].remedies || [])
        .slice(0, 4)
        .map((r: any) => r.name);
      flipRemediesSummary.textContent = topRems.length > 0 ? topRems.join(", ") : "Über Rubriken";
    } else {
      flipRemediesSummary.textContent = "Keine Direktzuordnung";
    }
  }
  const flipPolaritySummary = document.getElementById("flip-polarity-summary");
  if (flipPolaritySummary) {
    const isYinMeridian = ["Herz-Leitbahn", "Lungen-Leitbahn", "Perikard-Leitbahn", "Nieren-Leitbahn", "Leber-Leitbahn", "Milz-Pankreas-Leitbahn", "Konzeptionsgefäß"].includes(data.meridian);
    const polLabel = isYinMeridian ? "Yin-Leitbahn (Innen/Tiefe)" : "Yang-Leitbahn (Außen/Dynamik)";
    flipPolaritySummary.textContent = polLabel;
  }
  const flipCoords3D = document.getElementById("flip-coords-3d");
  if (flipCoords3D) {
    const pt3d = bodyViewer3D?.getPointData(data.point_id);
    flipCoords3D.textContent = pt3d
      ? `[${pt3d.position.map((n) => n.toFixed(3)).join(", ")}]`
      : "—";
  }
  const flipMeridianRef = document.getElementById("flip-meridian-ref");
  if (flipMeridianRef) {
    const imgFile = data.visuals?.image_filename || bodyViewer3D?.getPointData(data.point_id)?.image_filename || "meridian_herz.png";
    flipMeridianRef.textContent = imgFile;
  }
  
  // Tab 1: Wirkungen
  effectsListEl.innerHTML = "";
  if (data.effects && data.effects.length > 0) {
    data.effects.forEach((eff: string) => {
      const li = document.createElement("li");
      li.textContent = eff;
      
      const addTrigger = document.createElement("span");
      addTrigger.className = "add-symptom-trigger";
      addTrigger.innerHTML = "+";
      addTrigger.title = "Symptom zum Fall hinzufügen";
      addTrigger.addEventListener("click", () => addSymptom(eff));
      li.appendChild(addTrigger);
      
      effectsListEl.appendChild(li);
    });
  } else {
    effectsListEl.innerHTML = "<li>Keine Wirkungen hinterlegt.</li>";
  }
  
  // Tab 2: Indikationen
  indicationsListEl.innerHTML = "";
  if (data.indications && data.indications.length > 0) {
    data.indications.forEach((ind: string) => {
      const li = document.createElement("li");
      li.textContent = ind;
      
      const addTrigger = document.createElement("span");
      addTrigger.className = "add-symptom-trigger";
      addTrigger.innerHTML = "+";
      addTrigger.title = "Indikation zum Fall hinzufügen";
      addTrigger.addEventListener("click", () => addSymptom(ind));
      li.appendChild(addTrigger);
      
      indicationsListEl.appendChild(li);
    });
  } else {
    indicationsListEl.innerHTML = "<li>Keine Indikationen hinterlegt.</li>";
  }
  
  // Tab 3: Remedies
  remediesBadgesEl.innerHTML = "<p style='font-size: 12.5px; margin-bottom: 10px; color: var(--color-text-muted); font-style: italic;'>Heilmittel zur Massage an diesem Punkt:</p>";
  if (data.assigned_homeopathics && data.assigned_homeopathics.length > 0) {
    data.assigned_homeopathics.forEach((rem: string) => {
      const span = document.createElement("span");
      span.className = "badge-remedy clickable";
      span.textContent = rem;
      span.title = "Klicken für Heilmittel-Details";
      span.addEventListener("click", () => showRemedyDetails(rem));
      remediesBadgesEl.appendChild(span);
    });
  } else {
    remediesBadgesEl.innerHTML = "<p>Keine spezifischen Homöopathika zugeordnet.</p>";
  }
  
  // Tab 4: Rubrics
  rubricsListEl.innerHTML = "";
  if (data.general_analysis_rubrics && data.general_analysis_rubrics.length > 0) {
    data.general_analysis_rubrics.forEach((rub: any, idx: number) => {
      const item = document.createElement("div");
      item.className = "accordion-item";
      
      // Header
      const header = document.createElement("div");
      header.className = "accordion-header";
      
      const titleSpan = document.createElement("span");
      titleSpan.textContent = rub.rubric_name;
      header.appendChild(titleSpan);
      
      const addTrigger = document.createElement("span");
      addTrigger.className = "add-symptom-trigger";
      addTrigger.innerHTML = "+";
      addTrigger.title = "Rubrik zum Fall hinzufügen";
      addTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        addSymptom(rub.rubric_name);
      });
      header.appendChild(addTrigger);
      
      // Body
      const body = document.createElement("div");
      body.className = "accordion-body";
      
      const pillsContainer = document.createElement("div");
      pillsContainer.className = "remedies-list-pills";
      
      rub.remedies.forEach((r: { name: string, grade: number }) => {
        const pill = document.createElement("span");
        pill.className = `pill-subremedy grade-${r.grade} clickable`;
        pill.textContent = r.name;
        pill.title = "Klicken für Heilmittel-Details";
        pill.addEventListener("click", () => showRemedyDetails(r.name));
        
        // Highlight if matches search query (case-insensitive and ignoring dot)
        const nameClean = r.name.toLowerCase().replace('.', '');
        const qClean = currentSearchQuery ? currentSearchQuery.toLowerCase().replace('.', '') : "";
        if (qClean && (nameClean === qClean || nameClean.startsWith(qClean))) {
          pill.classList.add("bold");
        }
        
        pillsContainer.appendChild(pill);
      });
      
      body.appendChild(pillsContainer);
      item.appendChild(header);
      item.appendChild(body);
      
      // Toggle
      header.addEventListener("click", () => {
        item.classList.toggle("active");
      });
      
      // Open first one by default
      if (idx === 0) {
        item.classList.add("active");
      }
      
      rubricsListEl.appendChild(item);
    });
  } else {
    rubricsListEl.innerHTML = "<p>Keine Rubriken der Allgemein-Analyse hinterlegt.</p>";
  }
}

function getClientSynonyms(query: string): string[] {
  return getClientSynonymsCore(query, synonymsData);
}

// 6. Search Symptoms & Remedies (classifySymptomStatic is imported from ./core/search)
async function handleSearch(query: string) {
  currentSearchQuery = query.trim();
  
  if (!currentSearchQuery) {
    clearSearch();
    return;
  }
  
  clearSearchBtnEl.style.display = "block";
  
  try {
    let grouped_matches: { [cat: string]: any[] } = {};
    let remMatches: any[] = [];
    
    if ((isStaticMode || activeSearchSources.boericke || activeSearchSources.ttb) && (allPointsData.length > 0 || staticBoerickeRepData || staticTtbData)) {
      const qLower = currentSearchQuery.toLowerCase();
      const querySyns = getClientSynonyms(qLower);
      const symptomMap = new Map<string, { text: string; is_ttb: boolean; points: any[] }>();
      
      if (activeSearchSources.points) {
        allPointsData.forEach((p) => {
          // Check effects
          p.effects?.forEach((eff: string) => {
            const match = eff.toLowerCase().includes(qLower) || querySyns.some(syn => eff.toLowerCase().includes(syn));
            if (match) {
              if (!symptomMap.has(eff)) {
                symptomMap.set(eff, { text: eff, is_ttb: false, points: [] });
              }
              symptomMap.get(eff)!.points.push({ id: p.point_id, name_de: p.name_german, meridian: p.meridian, type: "wirkung" });
            }
          });
          
          // Check indications
          p.indications?.forEach((ind: string) => {
            const match = ind.toLowerCase().includes(qLower) || querySyns.some(syn => ind.toLowerCase().includes(syn));
            if (match) {
              if (!symptomMap.has(ind)) {
                symptomMap.set(ind, { text: ind, is_ttb: false, points: [] });
              }
              symptomMap.get(ind)!.points.push({ id: p.point_id, name_de: p.name_german, meridian: p.meridian, type: "indikation" });
            }
          });
          
          // Check general analysis rubrics
          if (p.general_analysis_rubrics) {
            p.general_analysis_rubrics.forEach((rub: any) => {
              const match = rub.rubric_name.toLowerCase().includes(qLower) || querySyns.some(syn => rub.rubric_name.toLowerCase().includes(syn));
              if (match) {
                if (!symptomMap.has(rub.rubric_name)) {
                  symptomMap.set(rub.rubric_name, { text: rub.rubric_name, is_ttb: false, points: [] });
                }
                symptomMap.get(rub.rubric_name)!.points.push({ id: p.point_id, name_de: p.name_german, meridian: p.meridian, type: "rubrik" });
              }
            });
          }
          
          // Remedy search
          const remedyMatch = p.assigned_homeopathics?.find((h: string) => h.toLowerCase().replace('.', '').includes(qLower.replace('.', '')));
          if (remedyMatch) {
            remMatches.push({
              id: p.point_id,
              name_de: p.name_german,
              meridian: p.meridian,
              sources: [remedyMatch]
            });
          }
        });
      }

      // Check Boericke Repertory rubrics (multi-word AND support)
      if (activeSearchSources.boericke) {
        await ensureBoerickeRepertoryLoaded();
        if (staticBoerickeRepData?.rubrics) {
          const cleanQ = qLower.startsWith("[boericke] ") ? qLower.substring(11) : qLower;
          const qTokens = cleanQ.split(/\s+/).filter(t => t.length >= 2);
          staticBoerickeRepData.rubrics.forEach(r => {
            const fp = r.full_path.toLowerCase();
            const matched = qTokens.length > 1
              ? qTokens.every(tok => fp.includes(tok))
              : fp.includes(cleanQ);
            if (matched) {
              const key = `[Boericke] ${r.full_path}`;
              symptomMap.set(key, { text: key, is_ttb: false, points: [] });
            }
          });
        }
      }
      
      // Check TTB rubrics
      if (activeSearchSources.ttb) {
        await ensureTtbDataLoaded();
        if (staticTtbData) {
          const cleanQ = qLower.startsWith("[ttb] ") ? qLower.substring(6) : qLower;
          Object.keys(staticTtbData).forEach(rubricName => {
            if (rubricName.toLowerCase().includes(cleanQ)) {
              symptomMap.set(`[TTB] ${rubricName}`, { text: `[TTB] ${rubricName}`, is_ttb: true, points: [] });
            }
          });
        }
      }
      
      // Group by category
      symptomMap.forEach((val, text) => {
        const category = classifySymptomStatic(text);
        if (!grouped_matches[category]) {
          grouped_matches[category] = [];
        }
        grouped_matches[category].push({
          text: val.text,
          score: 1.0,
          is_ttb: val.is_ttb,
          points: val.points
        });
      });
    } else {
      // 1. Fetch symptom matches (Semantic grouped matches)
      const symRes = await fetch(`/api/search-symptoms?q=${encodeURIComponent(currentSearchQuery)}`);
      const symData = await symRes.json();
      grouped_matches = symData.grouped_matches || {};
      
      // 2. Fetch remedy matches
      const remRes = await fetch(`/api/points-by-remedy?name=${encodeURIComponent(currentSearchQuery)}`);
      const remData = await remRes.json();
      remMatches = remData.points || [];
    }
    
    // Clear lists
    searchResultsListEl.innerHTML = "";
    const allSearchPointIds = new Set<string>();
    
    // Grouped matches rendering
    const categories = Object.keys(grouped_matches);
    categories.sort();
    
    categories.forEach((category) => {
      const items = grouped_matches[category];
      if (!items || items.length === 0) return;
      
      // Accumulate point IDs
      items.forEach((item: any) => {
        if (item.points) {
          item.points.forEach((pt: any) => allSearchPointIds.add(pt.id));
        }
      });
      
      const details = document.createElement("details");
      details.className = "category-details";
      details.open = true;
      
      const summary = document.createElement("summary");
      summary.className = "category-summary";
      summary.innerHTML = `
        <span class="category-title">${category}</span>
        <span class="category-badge">${items.length}</span>
      `;
      details.appendChild(summary);
      
      const ul = document.createElement("ul");
      ul.className = "category-symptom-list";
      
      items.forEach((item: any) => {
        const li = document.createElement("li");
        li.className = "symptom-search-item";
        
        let pointBadgesHtml = "";
        if (item.points && item.points.length > 0) {
          pointBadgesHtml = `
            <div class="symptom-points-row">
              ${item.points.map((pt: any) => `<span class="symptom-point-badge clickable" data-id="${pt.id}">${pt.name_de}</span>`).join("")}
            </div>
          `;
        }
        
        const isTtb = item.is_ttb;
        const displayName = isTtb ? item.text.replace("[TTB] ", "") : item.text;
        const scorePct = (item.score && item.score < 1.0) ? ` <span class="symptom-score">${Math.round(item.score * 100)}%</span>` : "";
        
        li.innerHTML = `
          <div class="symptom-title-row">
            <span class="symptom-text-label">
              ${isTtb ? '<span class="ttb-badge" title="Bönninghausen TTB Rubrik">TTB</span> ' : ''}
              ${displayName}${scorePct}
            </span>
            <button class="add-symptom-btn" title="Zum Fall hinzufügen">+</button>
          </div>
          ${pointBadgesHtml}
        `;
        
        // Hover highlights symptom's points
        li.addEventListener("mouseenter", () => {
          matchedPointIds.clear();
          if (item.points) {
            item.points.forEach((pt: any) => matchedPointIds.add(pt.id));
          }
          drawHotspots();
        });
        
        li.addEventListener("mouseleave", () => {
          // Restore all matched points
          matchedPointIds.clear();
          allSearchPointIds.forEach(id => matchedPointIds.add(id));
          drawHotspots();
        });
        
        // Add button listener
        const addBtn = li.querySelector(".add-symptom-btn");
        if (addBtn) {
          addBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            addSymptom(item.text);
          });
        }
        
        // Point badges listeners
        li.querySelectorAll(".symptom-point-badge").forEach((badge: any) => {
          badge.addEventListener("click", (e: Event) => {
            e.stopPropagation();
            const pid = badge.dataset.id;
            if (pid) selectPoint(pid);
          });
        });
        
        ul.appendChild(li);
      });
      
      details.appendChild(ul);
      searchResultsListEl.appendChild(details);
    });
    
    // Remedy matches rendering
    if (remMatches && remMatches.length > 0) {
      remMatches.forEach((pt: any) => allSearchPointIds.add(pt.id));
      
      const details = document.createElement("details");
      details.className = "category-details";
      details.open = true;
      
      const summary = document.createElement("summary");
      summary.className = "category-summary remedy-summary";
      summary.innerHTML = `
        <span class="category-title">Zugeordnete Akupunkturpunkte</span>
        <span class="category-badge remedy-badge">${remMatches.length}</span>
      `;
      details.appendChild(summary);
      
      const ul = document.createElement("ul");
      ul.className = "category-symptom-list";
      
      remMatches.forEach((pt: any) => {
        const li = document.createElement("li");
        li.className = "remedy-search-item clickable";
        li.dataset.id = pt.id;
        if (pt.id === currentPointId) {
          li.classList.add("active");
        }
        
        const sourceStr = pt.sources ? pt.sources.join(", ") : "Heilmittel";
        
        li.innerHTML = `
          <div class="point-title-row">
            <span>${pt.name_de}</span>
            <span class="point-id-badge">${getPointSynonym(pt.id)}</span>
          </div>
          <div class="point-sub">Zugeordnetes Heilmittel: ${sourceStr}</div>
        `;
        
        li.addEventListener("click", () => selectPoint(pt.id));
        ul.appendChild(li);
      });
      
      details.appendChild(ul);
      searchResultsListEl.appendChild(details);
    }
    
    // Set global highlights
    matchedPointIds.clear();
    allSearchPointIds.forEach(id => matchedPointIds.add(id));
    drawHotspots();
    
    // Update count display
    resultsCountEl.textContent = allSearchPointIds.size.toString();
    searchQueryDisplayEl.textContent = `"${currentSearchQuery}"`;
    
    // Open Search Tab in sidebar
    const tabSearchBtn = document.getElementById("tab-search-btn");
    if (tabSearchBtn) tabSearchBtn.style.display = "inline-flex";
    setActiveSidebarTab('search');
    
  } catch (err) {
    console.error("Search failed:", err);
  }
}

// 7. Clear Search
function clearSearch() {
  currentSearchQuery = "";
  searchInputEl.value = "";
  clearSearchBtnEl.style.display = "none";
  searchResultsSectionEl.style.display = "none";
  if (currentMeridian && meridianPointsSectionEl) {
    meridianPointsSectionEl.style.display = "block";
  }
  matchedPointIds.clear();
  drawHotspots();
  
  // Hide search tab button and go back to navigation
  const tabSearchBtn = document.getElementById("tab-search-btn");
  if (tabSearchBtn) tabSearchBtn.style.display = "none";
  setActiveSidebarTab('navigation');
}

// 8. Custom Tooltip
function showTooltip(name: string, translation: string | null, event: MouseEvent) {
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.className = "hotspot-tooltip";
    document.body.appendChild(tooltipEl);
  }
  
  const transText = translation ? ` (${translation})` : "";
  tooltipEl.textContent = `${name}${transText}`;
  tooltipEl.style.display = "block";
  
  updateTooltipPosition(event);
}

function updateTooltipPosition(event: MouseEvent) {
  if (!tooltipEl) return;
  tooltipEl.style.left = `${event.pageX + 12}px`;
  tooltipEl.style.top = `${event.pageY + 12}px`;
}

function hideTooltip() {
  if (tooltipEl) {
    tooltipEl.style.display = "none";
  }
}

// 9. Setup Event Listeners
function setupEventListeners() {
  // Theme Toggle
  themeToggleEl.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    
    if (nextTheme === "dark") {
      sunIconEl.style.display = "none";
      moonIconEl.style.display = "block";
    } else {
      sunIconEl.style.display = "block";
      moonIconEl.style.display = "none";
    }
    if (bodyViewer3D) {
      bodyViewer3D.setTheme(nextTheme);
    }
  });

  // 3D / Split / 2D View Mode Switcher
  const viewModeButtons = document.querySelectorAll(".view-mode-btn");
  const visualizerStageEl = document.getElementById("visualizer-stage");
  const viewer3dControlsEl = document.getElementById("viewer-3d-controls");
  const meridianFilterBarEl = document.getElementById("meridian-filter-bar");

  viewModeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = (btn as HTMLElement).dataset.viewMode || "3d";
      viewModeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      if (visualizerStageEl) {
        visualizerStageEl.classList.remove("mode-book", "mode-3d", "mode-split", "mode-2d");
        visualizerStageEl.classList.add(`mode-${mode}`);
      }
      const show3DControls = mode === "3d" || mode === "split";
      if (viewer3dControlsEl) {
        viewer3dControlsEl.style.display = show3DControls ? "flex" : "none";
      }
      if (meridianFilterBarEl) {
        meridianFilterBarEl.style.display = show3DControls ? "flex" : "none";
      }
      if (show3DControls) {
        setTimeout(() => {
          bodyViewer3D?.handleResize();
        }, 60);
      }
    });
  });

  // 3D Camera Presets & Skin X-Ray Transparency
  document.querySelectorAll(".cam-preset-btn[data-cam-preset]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const preset = (btn as HTMLElement).dataset.camPreset as
        | "full"
        | "pilot_arm"
        | "head_chest"
        | "back"
        | undefined;
      if (preset && bodyViewer3D) {
        bodyViewer3D.focusCameraPreset(preset);
      }
    });
  });

  // 3D Display Mode Switcher (3D-Muskeln & Skelett / 3D-Skelett / Klinische Haut / Röntgen)
  const anatomyModeBtn = document.getElementById("v3d-mode-anatomy-btn");
  const skeletonModeBtn = document.getElementById("v3d-mode-skeleton-btn");
  const clinicalModeBtn = document.getElementById("v3d-mode-clinical-btn");
  const xrayToggleBtn = document.getElementById("xray-toggle-btn");

  const updateViewerModeButtons = (mode: "anatomy" | "skeleton" | "clinical" | "xray") => {
    anatomyModeBtn?.classList.toggle("active", mode === "anatomy");
    skeletonModeBtn?.classList.toggle("active", mode === "skeleton");
    clinicalModeBtn?.classList.toggle("active", mode === "clinical");
    xrayToggleBtn?.classList.toggle("active", mode === "xray");
  };

  if (anatomyModeBtn) {
    anatomyModeBtn.addEventListener("click", () => {
      if (!bodyViewer3D) return;
      bodyViewer3D.setDisplayMode("anatomy");
      updateViewerModeButtons("anatomy");
    });
  }

  if (skeletonModeBtn) {
    skeletonModeBtn.addEventListener("click", () => {
      if (!bodyViewer3D) return;
      bodyViewer3D.setDisplayMode("skeleton");
      updateViewerModeButtons("skeleton");
    });
  }

  if (clinicalModeBtn) {
    clinicalModeBtn.addEventListener("click", () => {
      if (!bodyViewer3D) return;
      bodyViewer3D.setDisplayMode("clinical");
      updateViewerModeButtons("clinical");
    });
  }

  if (xrayToggleBtn) {
    xrayToggleBtn.addEventListener("click", () => {
      if (!bodyViewer3D) return;
      const currentMode = bodyViewer3D.getDisplayMode();
      const nextMode = currentMode === "xray" ? "anatomy" : "xray";
      bodyViewer3D.setDisplayMode(nextMode);
      updateViewerModeButtons(nextMode);
    });
  }

  const bilateralBtn = document.getElementById("v3d-bilateral-btn");
  if (bilateralBtn) {
    bilateralBtn.addEventListener("click", () => {
      if (!bodyViewer3D) return;
      const isNowBilateral = bodyViewer3D.toggleBilateral();
      bilateralBtn.classList.toggle("active", isNowBilateral);
      showToastNotification(
        isNowBilateral
          ? "Bilaterale Spiegelung (beide Körperseiten) aktiviert"
          : "Unilaterale Leitbahn-Darstellung aktiviert"
      );
    });
  }

  // Meridian Filter Presets ("Pilot (Herz & Lunge)" and "Alle 14")
  document.querySelectorAll(".meridian-filter-chip.preset-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!bodyViewer3D) return;
      const preset = (btn as HTMLElement).dataset.filterPreset;
      if (preset === "pilot") {
        bodyViewer3D.setVisibleMeridians(["herz", "lunge"]);
        bodyViewer3D.focusCameraPreset("pilot_arm");
      } else if (preset === "all") {
        bodyViewer3D.setVisibleMeridians(MERIDIANS.map((m) => m.id));
        bodyViewer3D.focusCameraPreset("full");
      }
      updatePresetFilterButtonsState();
    });
  });

  // Interactive Similapunktur Flip-Box
  const pointFlipBox = document.getElementById("point-flip-box");
  if (pointFlipBox) {
    pointFlipBox.addEventListener("click", () => {
      pointFlipBox.classList.toggle("flipped");
    });
    pointFlipBox.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        pointFlipBox.classList.toggle("flipped");
      }
    });
  }

  // Originalzeichnung Modal Button & Close
  const showOriginalDrawingBtn = document.getElementById("show-original-drawing-btn");
  const closeOriginalDrawingBtn = document.getElementById("close-original-drawing-btn");
  const originalDrawingModal = document.getElementById("original-drawing-modal");

  if (showOriginalDrawingBtn) {
    showOriginalDrawingBtn.addEventListener("click", () => {
      if (currentRenderedPointData) {
        openOriginalDrawingModal(currentRenderedPointData);
      }
    });
  }
  if (closeOriginalDrawingBtn && originalDrawingModal) {
    closeOriginalDrawingBtn.addEventListener("click", () => {
      originalDrawingModal.style.display = "none";
    });
    originalDrawingModal.addEventListener("click", (e) => {
      if (e.target === originalDrawingModal) {
        originalDrawingModal.style.display = "none";
      }
    });
  }
  
  // Search Input debounced + Autocomplete
  let searchTimeout: number;
  searchInputEl.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    const val = searchInputEl.value;
    showSuggestions(val);
    searchTimeout = setTimeout(() => {
      handleSearch(val);
    }, 250) as unknown as number;
  });
  
  // Clear search button
  clearSearchBtnEl.addEventListener("click", () => {
    clearSearch();
    const dropdown = document.getElementById("search-suggestions");
    if (dropdown) dropdown.style.display = "none";
  });
  
  // Details tabs navigation
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active from all buttons
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      // Hide all panes
      const tabTarget = btn.getAttribute("data-tab");
      const panes = document.querySelectorAll(".tab-pane");
      panes.forEach((pane) => {
        if (pane.id === tabTarget) {
          pane.classList.add("active");
        } else {
          pane.classList.remove("active");
        }
      });
    });
  });

  // Autocomplete suggestions: focus and keyboard events
  searchInputEl.addEventListener("focus", () => {
    showSuggestions(searchInputEl.value);
  });

  searchInputEl.addEventListener("keydown", (e) => {
    const dropdown = document.getElementById("search-suggestions");
    if (!dropdown || dropdown.style.display === "none") return;
    
    const items = dropdown.querySelectorAll(".suggestion-item");
    if (items.length === 0) return;
    
    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeSuggestionIndex = (activeSuggestionIndex + 1) % items.length;
      updateSuggestionSelection(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeSuggestionIndex = (activeSuggestionIndex - 1 + items.length) % items.length;
      updateSuggestionSelection(items);
    } else if (e.key === "Enter") {
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < items.length) {
        e.preventDefault();
        const selectedItem = items[activeSuggestionIndex] as HTMLDivElement;
        const text = selectedItem.textContent || "";
        selectSuggestion(text);
      }
    } else if (e.key === "Escape") {
      dropdown.style.display = "none";
    }
  });

  document.addEventListener("click", (e) => {
    const dropdown = document.getElementById("search-suggestions");
    if (dropdown && !searchInputEl.contains(e.target as Node) && !dropdown.contains(e.target as Node)) {
      dropdown.style.display = "none";
    }
  });

  // Source Filter Toggles (Boericke Rep., TTB, Similapunkte)
  const sourceButtons = document.querySelectorAll<HTMLButtonElement>("#search-sources-bar .source-filter-chip");
  sourceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const src = btn.dataset.source as "boericke" | "ttb" | "points" | undefined;
      if (!src) return;
      const nextState = !activeSearchSources[src];
      const activeCount = Object.values(activeSearchSources).filter(Boolean).length;
      if (!nextState && activeCount <= 1) {
        showToastNotification("Mindestens eine Suchquelle muss aktiv bleiben.");
        return;
      }
      activeSearchSources[src] = nextState;
      btn.classList.toggle("active", nextState);
      rebuildActiveSuggestionsList();
      if (searchInputEl.value.trim().length >= 2) {
        showSuggestions(searchInputEl.value);
      }
      if (currentSearchQuery) {
        handleSearch(currentSearchQuery);
      }
    });
  });

  // Repertorisation Matrix Close/Open Event Listeners
  const closeMatrixBtn = document.getElementById("close-matrix-btn");
  const matrixModal = document.getElementById("matrix-modal");
  if (closeMatrixBtn && matrixModal) {
    closeMatrixBtn.addEventListener("click", () => {
      matrixModal.style.display = "none";
    });
  }
  
  const openMatrixBtn = document.getElementById("open-matrix-btn");
  if (openMatrixBtn && matrixModal) {
    openMatrixBtn.addEventListener("click", () => {
      matrixModal.style.display = "flex";
      renderMatrixTable();
    });
  }

  // Sidebar Tab Clicks
  const tabNavBtn = document.getElementById("tab-nav-btn");
  const tabRemediesBtn = document.getElementById("tab-remedies-btn");
  const tabSearchBtn = document.getElementById("tab-search-btn");
  const tabRepBtn = document.getElementById("tab-rep-btn");
  
  if (tabNavBtn) {
    tabNavBtn.addEventListener("click", () => setActiveSidebarTab('navigation'));
  }
  if (tabRemediesBtn) {
    tabRemediesBtn.addEventListener("click", () => setActiveSidebarTab('remedies-list'));
  }
  if (tabSearchBtn) {
    tabSearchBtn.addEventListener("click", () => setActiveSidebarTab('search'));
  }
  if (tabRepBtn) {
    tabRepBtn.addEventListener("click", () => setActiveSidebarTab('repertorisation'));
  }

  // Remedy Tab filter input
  const remedyTabSearchInput = document.getElementById("remedy-tab-search-input") as HTMLInputElement | null;
  if (remedyTabSearchInput) {
    remedyTabSearchInput.addEventListener("input", (e) => {
      const val = (e.target as HTMLInputElement).value;
      renderRemediesSidebarList(val);
    });
  }

  // Version History Modal Listeners
  const versionBadge = document.getElementById("version-badge");
  const versionModal = document.getElementById("version-modal");
  const closeVersionBtn = document.getElementById("close-version-btn");
  if (versionBadge && versionModal && closeVersionBtn) {
    versionBadge.addEventListener("click", () => {
      versionModal.style.display = "flex";
    });
    closeVersionBtn.addEventListener("click", () => {
      versionModal.style.display = "none";
    });
  }

  // Feedback Modal Listeners
  const feedbackToggle = document.getElementById("feedback-toggle");
  const feedbackModal = document.getElementById("feedback-modal");
  const closeFeedbackBtn = document.getElementById("close-feedback-btn");
  if (feedbackToggle && feedbackModal && closeFeedbackBtn) {
    feedbackToggle.addEventListener("click", () => {
      feedbackModal.style.display = "flex";
      const subjectInput = document.getElementById("feedback-subject") as HTMLInputElement;
      if (subjectInput) {
        if (lastViewedPointId) {
          subjectInput.value = `Feedback zu Akupunkturpunkt ${getPointSynonym(lastViewedPointId)}`;
        } else {
          subjectInput.value = "";
        }
      }
    });
    closeFeedbackBtn.addEventListener("click", () => {
      feedbackModal.style.display = "none";
    });
  }

  const feedbackGithubBtn = document.getElementById("feedback-github-btn");
  const feedbackEmailBtn = document.getElementById("feedback-email-btn");
  const feedbackForm = document.getElementById("feedback-form") as HTMLFormElement;

  if (feedbackGithubBtn && feedbackForm) {
    feedbackGithubBtn.addEventListener("click", () => {
      if (!feedbackForm.reportValidity()) return;
      const cat = (document.getElementById("feedback-category") as HTMLSelectElement).value;
      const sub = (document.getElementById("feedback-subject") as HTMLInputElement).value;
      const body = (document.getElementById("feedback-body") as HTMLTextAreaElement).value;
      
      const title = `[${cat}] ${sub}`;
      const markdownBody = `### Kategorie\n${cat}\n\n### Beschreibung\n${body}\n\n---\n*Feedback gesendet aus Similapunktur Leitfaden App*`;
      const githubUrl = `https://github.com/aosl1906/similapunktur-/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(markdownBody)}`;
      window.open(githubUrl, "_blank");
      feedbackModal!.style.display = "none";
      feedbackForm.reset();
    });
  }

  if (feedbackEmailBtn && feedbackForm) {
    feedbackEmailBtn.addEventListener("click", () => {
      if (!feedbackForm.reportValidity()) return;
      const cat = (document.getElementById("feedback-category") as HTMLSelectElement).value;
      const sub = (document.getElementById("feedback-subject") as HTMLInputElement).value;
      const body = (document.getElementById("feedback-body") as HTMLTextAreaElement).value;
      
      const email = "aosl1@gmx.de";
      const subject = `[Similapunktur Feedback] [${cat}] ${sub}`;
      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
      feedbackModal!.style.display = "none";
      feedbackForm.reset();
    });
  }

  // Developer Data Review Modal Listeners
  const devReviewToggle = document.getElementById("dev-review-toggle");
  const devReviewModal = document.getElementById("dev-review-modal");
  const closeDevReviewBtn = document.getElementById("close-dev-review-btn");
  
  if (devReviewToggle && devReviewModal && closeDevReviewBtn) {
    devReviewToggle.addEventListener("click", async () => {
      devReviewModal.style.display = "flex";
      await ensureTtbDataLoaded();
      await ensureBoerickeDataLoaded();
      renderDevReviewTables();
    });
    closeDevReviewBtn.addEventListener("click", () => {
      devReviewModal.style.display = "none";
    });
  }

  // Temporary HITL Curation Workbench Listeners
  const curationToggleBtn = document.getElementById("curation-workbench-toggle");
  const curationModalEl = document.getElementById("curation-workbench-modal");
  if (curationToggleBtn && curationModalEl) {
    curationToggleBtn.addEventListener("click", async () => {
      if (!curationWorkbench) {
        curationWorkbench = new CurationWorkbench({
          modalEl: curationModalEl,
          getAllPoints: () => allPointsData,
          getBoerickeData: () => staticBoerickeRepData,
          ensureBoerickeLoaded: ensureBoerickeRepertoryLoaded,
          onDataUpdated: () => {
            boerickeBookView?.refresh();
            runRepertorisation();
            if (currentPointId) {
              selectPoint(currentPointId);
            }
          },
        });
      }
      await curationWorkbench.open();
    });
  }

  const devTabButtons = document.querySelectorAll(".dev-tab-btn");
  devTabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      devTabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const tabTarget = btn.getAttribute("data-dev-tab");
      document.querySelectorAll(".dev-tab-pane").forEach((pane: any) => {
        if (pane.id === tabTarget) {
          pane.style.display = "block";
        } else {
          pane.style.display = "none";
        }
      });
      
      const devSearch = document.getElementById("dev-review-search") as HTMLInputElement;
      if (devSearch) devSearch.value = "";
      filterDevReviewTable();
    });
  });

  const devReviewSearch = document.getElementById("dev-review-search");
  if (devReviewSearch) {
    devReviewSearch.addEventListener("input", () => {
      filterDevReviewTable();
    });
  }

  // Editor Toggle and Visualizer click
  const editorToggleEl = document.getElementById("editor-toggle") as HTMLButtonElement;

  if (editorToggleEl) {
    editorToggleEl.addEventListener("click", () => {
      setEditorMode(!isEditorActive);
    });
  }

  svgOverlayEl.addEventListener("click", (e) => {
    if (!isEditorActive || !currentPointId) return;
    
    const target = e.target as HTMLElement;
    if (target.classList.contains("hotspot-inner") || target.classList.contains("hotspot-outer")) {
      return;
    }
    
    const rect = svgOverlayEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const x_percent = parseFloat(((x / rect.width) * 100).toFixed(2));
    const y_percent = parseFloat(((y / rect.height) * 100).toFixed(2));
    
    updatePointCoordinate(currentPointId, x_percent, y_percent);
  });

  // Modality Toggles Click Event Listeners
  const modalityChips = document.querySelectorAll(".modality-chip");
  modalityChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const rubric = chip.getAttribute("data-rubric");
      if (rubric) {
        if (activeModalities.has(rubric)) {
          activeModalities.delete(rubric);
          chip.classList.remove("active");
        } else {
          activeModalities.add(rubric);
          chip.classList.add("active");
        }
        runRepertorisation();
      }
    });
  });
}

function updateSuggestionSelection(items: NodeListOf<Element>) {
  items.forEach((item, idx) => {
    if (idx === activeSuggestionIndex) {
      item.classList.add("selected");
      item.scrollIntoView({ block: "nearest" });
    } else {
      item.classList.remove("selected");
    }
  });
}

// --- helper functions for editor and autocomplete ---

function rebuildActiveSuggestionsList() {
  const combined: string[] = [];
  if (activeSearchSources.boericke) combined.push(...boerickeSuggestions);
  if (activeSearchSources.ttb) combined.push(...ttbSuggestions);
  if (activeSearchSources.points) combined.push(...pointsSuggestions);
  suggestionsList = combined;
}

async function loadSuggestions() {
  // Load Boericke Repertorium suggestions
  await ensureBoerickeRepertoryLoaded();
  if (staticBoerickeRepData?.rubrics) {
    const uniqueBoericke = new Set<string>();
    staticBoerickeRepData.rubrics.forEach(r => {
      if (r.full_path) {
        uniqueBoericke.add(`[Boericke] ${r.full_path}`);
      }
    });
    boerickeSuggestions = Array.from(uniqueBoericke);
  }

  if (allPointsData.length > 0) {
    const uniquePoints = new Set<string>();
    allPointsData.forEach(p => {
      if (p.effects) {
        p.effects.forEach((e: string) => { if (e && e.length < 120) uniquePoints.add(e.trim()); });
      }
      if (p.indications) {
        p.indications.forEach((i: string) => { if (i && i.length < 120) uniquePoints.add(i.trim()); });
      }
      if (p.general_analysis_rubrics) {
        p.general_analysis_rubrics.forEach((r: any) => { if (r.rubric_name && r.rubric_name.length < 120) uniquePoints.add(r.rubric_name.trim()); });
      }
    });
    pointsSuggestions = Array.from(uniquePoints);
    
    // Merge TTB Bönninghausen rubrics for static mode autocomplete
    await ensureTtbDataLoaded();
    if (staticTtbData) {
      const uniqueTtb = new Set<string>();
      Object.keys(staticTtbData).forEach(rubricName => {
        if (rubricName && rubricName.length < 120) {
          uniqueTtb.add(`[TTB] ${rubricName.trim()}`);
        }
      });
      ttbSuggestions = Array.from(uniqueTtb);
    }
    
    rebuildActiveSuggestionsList();
    console.log(`Suggestions ready: Boericke=${boerickeSuggestions.length}, TTB=${ttbSuggestions.length}, Punkte=${pointsSuggestions.length}`);
    return;
  }
  
  try {
    const res = await fetch('/api/symptom-suggestions');
    const data = await res.json();
    pointsSuggestions = data.suggestions || [];
    rebuildActiveSuggestionsList();
  } catch (err) {
    console.error("Failed to load suggestions:", err);
  }
}

function highlightQueryTokens(text: string, query: string): string {
  const tokens = query
    .trim()
    .split(/\s+/)
    .filter(t => t.length >= 2)
    .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (tokens.length === 0) return text;
  const re = new RegExp(`(${tokens.join("|")})`, "gi");
  return text.replace(re, "<strong>$1</strong>");
}

function createSuggestionRow(
  fullText: string,
  displayLabel: string,
  query: string,
  dropdown: HTMLElement,
  isChild = false
): HTMLDivElement {
  const div = document.createElement("div");
  div.className = isChild ? "suggestion-item suggestion-child-item" : "suggestion-item";
  div.dataset.fullText = fullText;

  const isBoericke = fullText.startsWith("[Boericke] ");
  const isTtb = fullText.startsWith("[TTB] ");

  const textSpan = document.createElement("span");
  textSpan.className = "suggestion-text";
  textSpan.innerHTML = highlightQueryTokens(displayLabel, query);
  textSpan.style.flexGrow = "1";
  textSpan.style.cursor = "pointer";
  textSpan.addEventListener("click", (e) => {
    e.stopPropagation();
    selectSuggestion(fullText);
  });
  div.appendChild(textSpan);

  if (!isChild) {
    if (isBoericke) {
      const badge = document.createElement("span");
      badge.className = "boericke-badge-indicator";
      badge.textContent = "Boericke";
      div.appendChild(badge);
    } else if (isTtb) {
      const badge = document.createElement("span");
      badge.className = "ttb-badge-indicator";
      badge.textContent = "TTB";
      div.appendChild(badge);
    }
  }

  const addBtn = document.createElement("button");
  addBtn.className = "suggestion-add-btn";
  addBtn.textContent = "+";
  addBtn.title = "Symptom hinzufügen";
  addBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    addSymptom(fullText);
    dropdown.style.display = "none";
    clearSearch();
  });
  div.appendChild(addBtn);

  return div;
}

function showSuggestions(query: string) {
  const dropdown = document.getElementById("search-suggestions");
  if (!dropdown) return;

  if (!query || query.trim().length < 2) {
    dropdown.style.display = "none";
    return;
  }

  const trimmed = query.trim();
  // Fetch enough scored results to group sub-rubrics cleanly under their parent rubrics
  const scored = filterAndRankSuggestions(suggestionsList, trimmed, synonymsData, 150);

  if (scored.length === 0) {
    dropdown.style.display = "none";
    return;
  }

  // Group Boericke hierarchical paths by parent ("Kapitel > Oberrubrik")
  interface SuggestionGroup {
    key: string;
    displayParent: string;
    isBoericke: boolean;
    directMatchText: string | null;
    children: Array<{ fullText: string; childLabel: string; score: number }>;
    bestScore: number;
  }

  const groupsMap = new Map<string, SuggestionGroup>();

  scored.forEach(item => {
    const text = item.text;
    if (text.startsWith("[Boericke] ")) {
      const clean = text.substring(11);
      const parts = clean.split(" > ");
      if (parts.length >= 3) {
        const parentDisplay = `${parts[0]} > ${parts[1]}`;
        const childLabel = parts.slice(2).join(" > ");
        const groupKey = `[Boericke] ${parentDisplay}`;
        if (!groupsMap.has(groupKey)) {
          groupsMap.set(groupKey, {
            key: groupKey,
            displayParent: parentDisplay,
            isBoericke: true,
            directMatchText: null,
            children: [],
            bestScore: item.score
          });
        }
        const grp = groupsMap.get(groupKey)!;
        grp.children.push({ fullText: text, childLabel, score: item.score });
        grp.bestScore = Math.max(grp.bestScore, item.score);
      } else {
        // 2-level Boericke rubric: "Kapitel > Rubrik"
        if (!groupsMap.has(text)) {
          groupsMap.set(text, {
            key: text,
            displayParent: clean,
            isBoericke: true,
            directMatchText: text,
            children: [],
            bestScore: item.score
          });
        } else {
          const grp = groupsMap.get(text)!;
          grp.directMatchText = text;
          grp.bestScore = Math.max(grp.bestScore, item.score);
        }
      }
    } else {
      const displayLabel = text.startsWith("[TTB] ") ? text.substring(6) : text;
      groupsMap.set(text, {
        key: text,
        displayParent: displayLabel,
        isBoericke: false,
        directMatchText: text,
        children: [],
        bestScore: item.score
      });
    }
  });

  const sortedGroups = Array.from(groupsMap.values())
    .sort((a, b) => b.bestScore - a.bestScore)
    .slice(0, 15);

  dropdown.innerHTML = "";
  activeSuggestionIndex = -1;

  sortedGroups.forEach((grp, idx) => {
    if (grp.children.length === 0 && grp.directMatchText) {
      const row = createSuggestionRow(grp.directMatchText, grp.displayParent, trimmed, dropdown, false);
      row.dataset.index = idx.toString();
      dropdown.appendChild(row);
      return;
    }

    // Collapsible parent group
    const groupWrap = document.createElement("div");
    groupWrap.className = "suggestion-group";

    const header = document.createElement("div");
    header.className = "suggestion-item suggestion-group-header";
    header.dataset.index = idx.toString();
    if (grp.directMatchText) {
      header.dataset.fullText = grp.directMatchText;
    }

    const toggleIcon = document.createElement("span");
    toggleIcon.className = "suggestion-toggle-icon";
    toggleIcon.textContent = "▸";
    header.appendChild(toggleIcon);

    const labelSpan = document.createElement("span");
    labelSpan.className = "suggestion-text";
    labelSpan.innerHTML = highlightQueryTokens(grp.displayParent, trimmed);
    labelSpan.style.flexGrow = "1";
    header.appendChild(labelSpan);

    const countBadge = document.createElement("span");
    countBadge.className = "suggestion-count-badge";
    countBadge.textContent = `${grp.children.length}`;
    countBadge.title = `${grp.children.length} Unterrubriken`;
    header.appendChild(countBadge);

    if (grp.isBoericke) {
      const badge = document.createElement("span");
      badge.className = "boericke-badge-indicator";
      badge.textContent = "Boericke";
      header.appendChild(badge);
    }

    if (grp.directMatchText) {
      const addBtn = document.createElement("button");
      addBtn.className = "suggestion-add-btn";
      addBtn.textContent = "+";
      addBtn.title = "Übergeordnete Rubrik hinzufügen";
      addBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        addSymptom(grp.directMatchText!);
        dropdown.style.display = "none";
        clearSearch();
      });
      header.appendChild(addBtn);
    }

    const childrenBox = document.createElement("div");
    childrenBox.className = "suggestion-children";
    childrenBox.style.display = "none";

    grp.children.forEach(ch => {
      const childRow = createSuggestionRow(ch.fullText, ch.childLabel, trimmed, dropdown, true);
      childrenBox.appendChild(childRow);
    });

    header.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = childrenBox.style.display !== "none";
      childrenBox.style.display = isOpen ? "none" : "block";
      toggleIcon.textContent = isOpen ? "▸" : "▾";
      header.classList.toggle("expanded", !isOpen);
    });

    groupWrap.appendChild(header);
    groupWrap.appendChild(childrenBox);
    dropdown.appendChild(groupWrap);
  });

  dropdown.style.display = "block";
}

function selectSuggestion(text: string) {
  searchInputEl.value = text;
  clearSearchBtnEl.style.display = "block";
  const dropdown = document.getElementById("search-suggestions");
  if (dropdown) {
    dropdown.style.display = "none";
  }
  handleSearch(text);
}

async function updatePointCoordinate(pointId: string, x_percent: number, y_percent: number) {
  try {
    const response = await fetch('/api/update-point-coordinate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        point_id: pointId,
        x_percent: x_percent,
        y_percent: y_percent
      })
    });
    
    const result = await response.json();
    if (result.success) {
      const pt = activePoints.find(p => p.id === pointId);
      if (pt) {
        pt.visuals.relative_coordinates.x_percent = x_percent;
        pt.visuals.relative_coordinates.y_percent = y_percent;
      }
      const ptAll = allPointsData.find(p => p.point_id === pointId);
      if (ptAll?.visuals?.relative_coordinates) {
        ptAll.visuals.relative_coordinates.x_percent = x_percent;
        ptAll.visuals.relative_coordinates.y_percent = y_percent;
      }
      drawHotspots();
      showToastNotification(`Punkt ${pointId} neu platziert!`);
    } else {
      alert("Fehler beim Speichern der Koordinaten: " + result.error);
    }
  } catch (err) {
    console.error("Failed to save coordinate:", err);
    alert("Netzwerkfehler beim Speichern der Koordinaten.");
  }
}

function getPointSynonym(id: string): string {
  const parts = id.split('_');
  const prefix = parts[0];
  const num = parts[1] || '';
  const isMann = id.includes('_MANN');
  const suffix = isMann ? ' (Felix Mann)' : '';
  
  const map: Record<string, string> = {
    'HE': `HE ${num} (HT ${num}/H ${num})`,
    'SI': `SI ${num} (Dü ${num})`,
    'BL': `BL ${num} (B ${num})`,
    'KI': `KI ${num} (K ${num})`,
    'PC': `PC ${num} (KS ${num})`,
    'TE': `TE ${num} (SJ ${num}/3E ${num})`,
    'GB': `GB ${num} (G ${num})`,
    'LR': `LR ${num} (LV ${num}/Le ${num})`,
    'LU': `LU ${num} (L ${num})`,
    'LI': `LI ${num} (Di ${num})`,
    'ST': `ST ${num} (M ${num})`,
    'SP': `SP ${num} (MP ${num})`,
    'CV': `CV ${num} (KG ${num}/Ren ${num})`,
    'GV': `GV ${num} (LG ${num}/Du ${num})`,
    'EX': `EX ${num}`
  };
  
  return (map[prefix] || id.replace('_', ' ')) + suffix;
}

function renderMeridianPointsList() {
  if (!meridianPointsListEl || !meridianPointsSectionEl) return;
  
  meridianPointsListEl.innerHTML = "";
  
  activePoints.forEach((p) => {
    const li = document.createElement("li");
    li.dataset.id = p.id;
    if (p.id === currentPointId) {
      li.classList.add("active");
    }
    
    li.innerHTML = `
      <div class="point-title-row">
        <span>${p.name_de}</span>
        <span class="point-id-badge">${getPointSynonym(p.id)}</span>
      </div>
    `;
    
    li.addEventListener("click", () => {
      selectPoint(p.id);
    });
    
    meridianPointsListEl.appendChild(li);
  });
  
  meridianPointsSectionEl.style.display = "block";
}

function showToastNotification(message: string) {
  let toast = document.getElementById("editor-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "editor-toast";
    toast.className = "editor-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  
  setTimeout(() => {
    toast?.classList.remove("show");
  }, 3000);
}

// --- Repertorisation & Symptom Combination Functions ---

function addSymptom(text: string) {
  text = text.trim();
  if (!text) return;
  
  // Check if already exists (case-insensitive)
  if (selectedSymptoms.some(s => s.text.toLowerCase() === text.toLowerCase())) {
    showToastNotification("Symptom bereits im Fall vorhanden!");
    return;
  }
  
  const id = "sym_" + Math.random().toString(36).substr(2, 9);
  selectedSymptoms.push({ id, text, weight: 1 });
  
  updateSymptomBasketUI();
  runRepertorisation();
  showToastNotification(`Symptom "${text}" hinzugefügt.`);
}

function removeSymptom(id: string) {
  const sym = selectedSymptoms.find(s => s.id === id);
  const name = sym ? sym.text : "";
  selectedSymptoms = selectedSymptoms.filter(s => s.id !== id);
  
  updateSymptomBasketUI();
  runRepertorisation();
  if (name) {
    showToastNotification(`Symptom "${name}" entfernt.`);
  }
}

function updateSymptomWeight(id: string, weight: number) {
  const sym = selectedSymptoms.find(s => s.id === id);
  if (sym) {
    sym.weight = weight;
    runRepertorisation();
    showToastNotification(`Gewichtung für "${sym.text}" geändert auf x${weight}.`);
  }
}

const REFINEMENT_MAP: { [key: string]: string[] } = {
  "kopfschmerzen": ["Stirnkopfschmerz", "Schläfenkopfschmerzen", "Hinterkopfschmerz", "Halbseitenkopfschmerz, Migräne"],
  "kopfschmerz": ["Stirnkopfschmerz", "Schläfenkopfschmerzen", "Hinterkopfschmerz", "Halbseitenkopfschmerz, Migräne"],
  "kopf": ["Kopfschmerzen", "Völle, Schwere im Kopf", "Kälte der Glieder, mit heißem Kopf", "Blutandrang zum Kopf mit heftigem Kopfschmerz"],
  "herzbeschwerden": ["Schmerzen in der Herzgegend", "Angina pectoris", "Herzklopfen", "Brustschmerz"],
  "schlafstörungen": ["Schlaflosigkeit", "Einschlafstörungen", "Unruhiger Schlaf", "Alpträume"],
  "magenbeschwerden": ["Sodbrennen", "Magenschmerz", "Übelkeit, Erbrechen", "Völlegefühl im Magen"]
};

function updateSymptomBasketUI() {
  const placeholder = document.getElementById("symptom-basket-placeholder");
  const list = document.getElementById("selected-symptoms-list");
  const resultsPreview = document.getElementById("repertorisation-results");
  
  if (!placeholder || !list || !resultsPreview) return;

  boerickeBookView?.refreshSelectionState();

  // Update badge count
  const badge = document.getElementById("basket-badge");
  if (badge) {
    if (selectedSymptoms.length > 0) {
      badge.textContent = selectedSymptoms.length.toString();
      badge.style.display = "inline-flex";
      
      // Trigger pulse animation
      badge.classList.remove("pulse-animation");
      void badge.offsetWidth; // Trigger reflow
      badge.classList.add("pulse-animation");
    } else {
      badge.style.display = "none";
    }
  }
  
  if (selectedSymptoms.length === 0) {
    placeholder.style.display = "block";
    list.style.display = "none";
    resultsPreview.style.display = "none";
    
    // Clear refinement container
    const refinementContainer = document.getElementById("symptom-refinement-container");
    if (refinementContainer) refinementContainer.innerHTML = "";
    
    activeModalities.clear();
    
    list.innerHTML = "";
    return;
  }
  
  placeholder.style.display = "none";
  list.style.display = "flex";
  resultsPreview.style.display = "block";
  
  list.innerHTML = "";
  selectedSymptoms.forEach(s => {
    const li = document.createElement("li");
    li.className = "symptom-chip";
    
    // Body for breadcrumb + text
    const chipBody = document.createElement("div");
    chipBody.className = "symptom-chip-body";
    
    // Get category
    const category = classifySymptomStatic(s.text);
    const breadcrumb = document.createElement("span");
    breadcrumb.className = "symptom-breadcrumb";
    breadcrumb.textContent = `${category} >`;
    chipBody.appendChild(breadcrumb);
    
    const textSpan = document.createElement("span");
    textSpan.className = "symptom-chip-text";
    
    const isTtb = s.text.startsWith("[TTB] ");
    const isBoericke = s.text.startsWith("[Boericke] ");
    const cleanText = isTtb
      ? s.text.replace("[TTB] ", "")
      : isBoericke
        ? s.text.replace("[Boericke] ", "")
        : s.text;
    textSpan.innerHTML = isBoericke
      ? `<span class="basket-boericke-badge" title="Boericke Repertorium">Boericke</span> ${cleanText}`
      : isTtb
        ? `<span class="basket-ttb-badge" title="Bönninghausen TTB Rubrik">TTB</span> ${cleanText}`
        : cleanText;
    textSpan.title = cleanText;
    chipBody.appendChild(textSpan);
    
    li.appendChild(chipBody);
    
    const controlsDiv = document.createElement("div");
    controlsDiv.className = "symptom-chip-controls";
    
    const weightSelect = document.createElement("select");
    weightSelect.className = "symptom-weight-select";
    weightSelect.title = "Gewichtung des Symptoms";
    for (let w = 1; w <= 3; w++) {
      const opt = document.createElement("option");
      opt.value = w.toString();
      opt.textContent = `x${w}`;
      if (s.weight === w) opt.selected = true;
      weightSelect.appendChild(opt);
    }
    weightSelect.addEventListener("change", () => {
      updateSymptomWeight(s.id, parseInt(weightSelect.value));
    });
    controlsDiv.appendChild(weightSelect);
    
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "symptom-delete-btn";
    deleteBtn.innerHTML = "&times;";
    deleteBtn.title = "Symptom entfernen";
    deleteBtn.addEventListener("click", () => removeSymptom(s.id));
    controlsDiv.appendChild(deleteBtn);
    
    li.appendChild(controlsDiv);
    list.appendChild(li);
  });

  // Render refinement suggestions if any
  let refinementContainer = document.getElementById("symptom-refinement-container");
  if (!refinementContainer) {
    refinementContainer = document.createElement("div");
    refinementContainer.id = "symptom-refinement-container";
    list.parentNode?.insertBefore(refinementContainer, list.nextSibling);
  }
  refinementContainer.innerHTML = "";
  
  // Find matching general symptoms
  let matchedGeneralText = "";
  let suggestionsToOffer: string[] = [];
  
  for (const s of selectedSymptoms) {
    const cleanText = s.text.replace("[TTB] ", "").toLowerCase().trim();
    if (REFINEMENT_MAP[cleanText]) {
      const allSugs = REFINEMENT_MAP[cleanText];
      // Filter out suggestions that are already in selectedSymptoms
      const activeTextList = selectedSymptoms.map(x => x.text.replace("[TTB] ", "").toLowerCase().trim());
      const filteredSugs = allSugs.filter(sug => !activeTextList.includes(sug.toLowerCase().trim()));
      
      if (filteredSugs.length > 0) {
        matchedGeneralText = s.text;
        suggestionsToOffer = filteredSugs;
        break; // Only offer suggestions for the first matched general symptom
      }
    }
  }
  
  if (suggestionsToOffer.length > 0) {
    const refinementDiv = document.createElement("div");
    refinementDiv.className = "refinement-box warning-box";
    refinementDiv.style.marginTop = "12px";
    refinementDiv.style.padding = "10px";
    refinementDiv.style.borderRadius = "6px";
    refinementDiv.style.backgroundColor = "#fff9db";
    refinementDiv.style.border = "1px solid #ffe3e3";
    refinementDiv.innerHTML = `
      <div class="refinement-header" style="font-size: 11.5px; font-weight: 700; color: #b25e00; margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
        <span>💡</span> <span>Symptom-Verfeinerung</span>
      </div>
      <div style="font-size: 11px; color: var(--color-text-dark); margin-bottom: 8px; line-height: 1.4;">
        Sie haben "${matchedGeneralText}" ausgewählt. Möchten Sie dieses für eine präzisere Analyse verfeinern?
      </div>
      <div class="refinement-chips" style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${suggestionsToOffer.map(sug => `<button class="refinement-suggestion-btn small-btn" data-text="${sug}" style="padding: 3px 6px; font-size: 10.5px; border-radius: 4px; border: 1px solid var(--color-primary-teal); background-color: #ffffff; color: var(--color-primary-teal); cursor: pointer; transition: all 0.2s; font-weight: 600;">+ ${sug}</button>`).join('')}
      </div>
    `;
    
    // Add event listeners to refinement buttons
    refinementDiv.querySelectorAll(".refinement-suggestion-btn").forEach((btn: any) => {
      btn.addEventListener("click", () => {
        const text = btn.dataset.text;
        if (text) addSymptom(text);
      });
      // Add hover effect via JS since it's injected
      btn.addEventListener("mouseenter", () => {
        btn.style.backgroundColor = "var(--color-primary-teal)";
        btn.style.color = "#ffffff";
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.backgroundColor = "#ffffff";
        btn.style.color = "var(--color-primary-teal)";
      });
    });
    
    refinementContainer.appendChild(refinementDiv);
  }
}

function runRepertorisation() {
  if (selectedSymptoms.length === 0) {
    recommendedPointsSet.clear();
    drawHotspots();
    return;
  }

  const result = calculateRepertorisation({
    selectedSymptoms,
    allPointsData,
    staticTtbData,
    staticBoerickeRepData,
    rubricsRemediesMap,
    activeModalities,
    synonymsData
  });

  // Synchronize remedy contraindications
  remedyContraindications.clear();
  result.contraindications.forEach((val, key) => remedyContraindications.set(key, val));

  // Render recommended remedies list
  const remediesList = document.getElementById("rec-remedies-list");
  if (remediesList) {
    remediesList.innerHTML = "";
    const topRemedies = result.remedyScores.slice(0, 15);
    topRemedies.forEach(rem => {
      const isContraindicated = remedyContraindications.has(rem.name);
      const li = document.createElement("li");
      
      const badge = document.createElement("span");
      badge.className = isContraindicated ? "remedy-score-badge clickable contraindicated" : "remedy-score-badge clickable";
      
      let text = `${rem.name} (${rem.score})`;
      if (isContraindicated) {
        text += " ⚠️";
        const warnings = Array.from(remedyContraindications.get(rem.name)!).join(", ");
        badge.title = `Polaritäts-Widerspruch: ${warnings}. Klicken für Details.`;
      } else {
        badge.title = "Klicken für Heilmittel-Details";
      }
      badge.textContent = text;
      badge.addEventListener("click", () => {
        showRemedyDetails(rem.name);
      });
      
      li.appendChild(badge);
      remediesList.appendChild(li);
    });
    if (result.remedyScores.length === 0) {
      remediesList.innerHTML = "<li class='dimmed' style='padding: 8px 0;'>Keine passenden Heilmittel gefunden.</li>";
    }
  }

  // Update recommended points (fall back to top remedy's assigned Weihe/acupuncture points if empty)
  recommendedPointsSet = result.recommendedPointIds;
  if (recommendedPointsSet.size === 0 && result.remedyScores.length > 0 && allPointsData.length > 0) {
    const topRemedyDetails = getRemedyDetails(result.remedyScores[0].name, allPointsData);
    recommendedPointsSet = new Set(topRemedyDetails.direct_points);
  }
  drawHotspots(); // Re-draw hotspots to trigger recommended pulsing
  if (bodyViewer3D) {
    bodyViewer3D.setHighlightedPoints(matchedPointIds, recommendedPointsSet);
  }

  // Render recommended points list
  const pointsList = document.getElementById("rec-points-list");
  if (pointsList) {
    pointsList.innerHTML = "";
    const topPoints = result.pointScores.slice(0, 5);
    topPoints.forEach(item => {
      const li = document.createElement("li");
      li.className = "recommendation-item";
      li.dataset.id = item.p.point_id;
      
      const titleSpan = document.createElement("span");
      titleSpan.className = "recommendation-title";
      titleSpan.textContent = `${getPointSynonym(item.p.point_id)} - ${item.p.name_german}`;
      titleSpan.style.cursor = "pointer";
      titleSpan.addEventListener("click", () => {
        selectPoint(item.p.point_id);
      });
      li.appendChild(titleSpan);
      
      const badge = document.createElement("span");
      badge.className = "match-badge";
      badge.textContent = `${item.matchedCount}/${selectedSymptoms.length}`;
      li.appendChild(badge);
      
      pointsList.appendChild(li);
    });
    if (result.pointScores.length === 0) {
      pointsList.innerHTML = "<li class='dimmed' style='padding: 8px;'>Keine passenden Punkte gefunden.</li>";
    }
  }
}

function renderMatrixTable() {
  const container = document.getElementById("matrix-table-container");
  if (!container) return;
  renderMatrixTableUI({
    container,
    selectedSymptoms,
    allPointsData,
    staticTtbData,
    staticBoerickeRepData,
    rubricsRemediesMap,
    activeModalities,
    remedyContraindications,
    onRemedyClick: (remedyName: string) => {
      const matrixModal = document.getElementById("matrix-modal");
      if (matrixModal) matrixModal.style.display = "none";
      showRemedyDetails(remedyName);
    }
  });
}

function setActiveSidebarTab(tabName: 'navigation' | 'remedies-list' | 'search' | 'repertorisation') {
  const tabNavBtn = document.getElementById("tab-nav-btn");
  const tabRemediesBtn = document.getElementById("tab-remedies-btn");
  const tabSearchBtn = document.getElementById("tab-search-btn");
  const tabRepBtn = document.getElementById("tab-rep-btn");
  
  const contentNav = document.getElementById("tab-content-navigation");
  const contentRemedies = document.getElementById("tab-content-remedies-list");
  const contentSearch = document.getElementById("tab-content-search");
  const contentRep = document.getElementById("tab-content-repertorisation");
  
  if (tabNavBtn) tabNavBtn.classList.toggle("active", tabName === 'navigation');
  if (tabRemediesBtn) tabRemediesBtn.classList.toggle("active", tabName === 'remedies-list');
  if (tabSearchBtn) tabSearchBtn.classList.toggle("active", tabName === 'search');
  if (tabRepBtn) tabRepBtn.classList.toggle("active", tabName === 'repertorisation');
  
  if (contentNav) contentNav.classList.toggle("active", tabName === 'navigation');
  if (contentRemedies) contentRemedies.classList.toggle("active", tabName === 'remedies-list');
  if (contentSearch) contentSearch.classList.toggle("active", tabName === 'search');
  if (contentRep) contentRep.classList.toggle("active", tabName === 'repertorisation');
}

function getRemedyDetailsClientSide(remedyName: string) {
  return getRemedyDetails(remedyName, allPointsData);
}

async function ensureBoerickeDataLoaded() {
  if (staticBoerickeData) return;
  try {
    const res = await fetch("boericke_materia_medica.json");
    if (res.ok) {
      staticBoerickeData = await res.json();
      console.log("Loaded Boericke Materia Medica static database.");
    }
  } catch (err) {
    console.error("Failed to load static Boericke Materia Medica:", err);
  }
}

async function ensureTtbDataLoaded() {
  if (staticTtbData) return;
  try {
    const res = await fetch("ttb_repertory.json");
    if (res.ok) {
      staticTtbData = await res.json();
      console.log("Loaded TTB Bönninghausen Repertory static database.");
    }
  } catch (err) {
    console.error("Failed to load static TTB Bönninghausen Repertory:", err);
  }
}

async function ensureBoerickeRepertoryLoaded() {
  if (!staticBoerickeRepData) {
    try {
      const res = await fetch("boericke_repertory.json");
      if (res.ok) {
        staticBoerickeRepData = await res.json();
        console.log(`Loaded Boericke Repertory (${staticBoerickeRepData?.rubrics?.length || 0} rubrics).`);
      }
    } catch (err) {
      console.error("Failed to load static Boericke Repertory:", err);
    }
  }
  if (staticBoerickeRepData && !boerickeBookView) {
    boerickeBookView = new BoerickeBookView({
      dataset: staticBoerickeRepData,
      getSelectedSymptoms: () => selectedSymptoms,
      onAddSymptom: (fullSymptomText: string) => {
        addSymptom(fullSymptomText);
      },
      onHighlightPoints: (pointIds: string[]) => {
        highlightRemedyPointsIn3D(pointIds, true);
        if (pointIds.length === 1) {
          selectPoint(pointIds[0]);
        }
      },
    });
  }
}

function renderDevReviewTables() {
  renderDevReviewTablesUI({
    allPointsData,
    staticBoerickeData,
    staticTtbData,
    getPointSynonym
  });
}

function filterDevReviewTable() {
  filterDevReviewTableUI();
}

function highlightRemedyPointsIn3D(pointIds: string[], switchTo3D = false) {
  recommendedPointsSet = new Set(pointIds);
  drawHotspots();

  if (bodyViewer3D) {
    if (pointIds.length > 0) {
      const neededMeridians = new Set<string>();
      pointIds.forEach((pid) => {
        const pt = allPointsData.find((p) => p.point_id === pid);
        if (pt?.meridian) {
          neededMeridians.add(pt.meridian.toLowerCase());
        }
      });
      if (neededMeridians.size > 0) {
        bodyViewer3D.setVisibleMeridians(Array.from(neededMeridians));
        document.querySelectorAll(".meridian-filter-chip[data-meridian-id]").forEach((chip) => {
          const mid = (chip as HTMLElement).dataset.meridianId?.toLowerCase() || "";
          chip.classList.toggle("active", neededMeridians.has(mid));
        });
      }
    }
    bodyViewer3D.setHighlightedPoints(matchedPointIds, recommendedPointsSet);
  }

  if (switchTo3D) {
    const btn3d = document.querySelector<HTMLButtonElement>('.view-mode-btn[data-view-mode="3d"]');
    btn3d?.click();
    const skeletonBtn = document.getElementById("v3d-mode-skeleton-btn") as HTMLButtonElement | null;
    skeletonBtn?.click();
    setTimeout(() => {
      bodyViewer3D?.focusCameraPreset("full");
    }, 100);
  }
}

async function showRemedyDetails(remedyName: string) {
  // Show detail panel and hide placeholder
  detailPlaceholderEl.style.display = "none";
  detailPanelEl.style.display = "flex";
  
  // Hide warning banner
  warningBannerEl.style.display = "none";
  
  // Update header titles
  pointIdTitleEl.textContent = remedyName;
  pointMeridianBadgeEl.textContent = "Homöopathikum";
  pointNameDeEl.textContent = "Heilmittel-Profil";
  pointTranslationEl.textContent = "Resonanz-Massagepunkte";
  
  // Hide point-specific sections
  const locSections = detailPanelEl.querySelectorAll(".detail-section");
  const tabsSection = detailPanelEl.querySelector(".detail-tabs") as HTMLElement;
  locSections.forEach(sec => (sec as HTMLElement).style.display = "none");
  if (tabsSection) tabsSection.style.display = "none";
  
  // Create or retrieve remedy details view container
  let remedyView = document.getElementById("remedy-details-view");
  if (!remedyView) {
    remedyView = document.createElement("div");
    remedyView.id = "remedy-details-view";
    remedyView.style.padding = "16px 0";
    detailPanelEl.appendChild(remedyView);
  }
  remedyView.style.display = "block";
  
  // Load data (either from API or client-side static lookup)
  let data: any = null;
  try {
    if (isStaticMode && allPointsData.length > 0) {
      data = getRemedyDetailsClientSide(remedyName);
    } else {
      const res = await fetch(`/api/remedy-details?name=${encodeURIComponent(remedyName)}`);
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      data = await res.json();
    }
  } catch (err) {
    console.warn("Failed to load remedy details from API, falling back client-side.", err);
    data = getRemedyDetailsClientSide(remedyName);
  }

  // Ensure client-side assigned_homeopathics lookup is used if API returned empty direct_points (e.g. trailing dot mismatch)
  if (data && (!Array.isArray(data.direct_points) || data.direct_points.length === 0) && allPointsData.length > 0) {
    data.direct_points = getRemedyDetailsClientSide(remedyName).direct_points;
  }
  
  // Lazy-load description in static/fallback modes
  if (data && !data.description) {
    await ensureBoerickeDataLoaded();
    if (staticBoerickeData) {
      const cleanRemName = remedyName.toLowerCase().replace(/\.$/, "").trim();
      const matchKey = Object.keys(staticBoerickeData).find(key => {
        const cleanKey = key.toLowerCase().replace(/\.$/, "").trim();
        return cleanKey === cleanRemName;
      });
      if (matchKey) {
        data.description = staticBoerickeData[matchKey];
      }
    }
  }
  
  if (!data) {
    remedyView.innerHTML = "<p class='dimmed'>Fehler beim Laden des Heilmittel-Profils.</p>";
    return;
  }
  
  // Resolve direct points cleanly (handles both string[] from client helper and object[] from API)
  const directPointsResolved: Array<{ point_id: string; point_name: string; meridian: string }> = (
    Array.isArray(data.direct_points) ? data.direct_points : []
  )
    .map((dp: any) => {
      const pid = typeof dp === "string" ? dp : dp?.point_id;
      if (!pid) return null;
      const ptObj = allPointsData.find((p) => p.point_id === pid);
      return {
        point_id: pid,
        point_name: (typeof dp === "object" && dp?.point_name) || ptObj?.name_german || pid,
        meridian: ptObj?.meridian || "",
      };
    })
    .filter((x: any): x is { point_id: string; point_name: string; meridian: string } => x !== null);

  // Immediately mark these points in 3D skeleton & 2D canvas
  highlightRemedyPointsIn3D(
    directPointsResolved.map((d) => d.point_id),
    false
  );

  // Render details
  let html = "";
  
  // Back button
  if (lastViewedPointId) {
    const synonym = getPointSynonym(lastViewedPointId);
    html += `<button id="remedy-back-btn" class="back-btn">← Zurück zu ${synonym}</button>`;
  } else {
    html += `<button id="remedy-back-btn" class="back-btn">← Zurück</button>`;
  }

  // Direct Points Section right at the top of the right panel
  html += `<div class="detail-section" style="margin-top: 12px; margin-bottom: 16px;">`;
  html += `<div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; margin-bottom: 6px;">`;
  html += `<h3 style="margin: 0;">Zugeordnete Leitbahn-Punkte (${directPointsResolved.length})</h3>`;
  if (directPointsResolved.length > 0) {
    html += `<button type="button" id="remedy-show-3d-btn" class="cam-preset-btn" style="font-size: 12px; padding: 4px 10px;" title="Alle zugeordneten Punkte auf dem 3D-Skelett anzeigen">🦴 Im 3D-Skelett zeigen</button>`;
  }
  html += `</div>`;
  html += `<p class="dimmed" style="font-size: 12px; margin-bottom: 10px; font-style: italic;">Punkte auf den Leitbahnen, denen dieses Mittel in der Datenbank zugeordnet ist:</p>`;

  if (directPointsResolved.length > 0) {
    directPointsResolved.forEach((dp) => {
      const syn = getPointSynonym(dp.point_id);
      html += `
        <div class="remedy-point-item clickable" data-point-id="${dp.point_id}" title="Klicken, um Punkt ${syn} im Detail anzuzeigen">
          <div class="point-badge">${syn}</div>
          <div class="point-info">
            <div class="point-name">${dp.point_name}</div>
            ${dp.meridian ? `<div class="dimmed" style="font-size: 11px;">Leitbahn: ${dp.meridian}</div>` : ""}
          </div>
          <span class="grade-badge grade-3">Punkt</span>
        </div>
      `;
    });
  } else {
    html += `<p class="dimmed" style="padding: 8px 0;">Keine direkten Punktzuordnungen in der Datenbank gefunden.</p>`;
  }
  html += `</div>`;
  
  // Render Materia Medica Description if available
  if (data.description) {
    const desc = data.description;
    html += `<div class="remedy-full-name">${desc.name}</div>`;
    if (desc.overview) {
      html += `
        <div class="remedy-overview-box">
          <strong>Klinisches Portrait:</strong> ${desc.overview}
        </div>
      `;
    }
    
    // Add Remedy Massage Application Tip
    html += `
      <div style="background-color: #f0f7f6; border-left: 4px solid var(--color-primary-teal); padding: 12px; border-radius: 4px; margin: 16px 0; font-size: 13px; line-height: 1.5; color: var(--color-text-dark); font-family: 'Lato', sans-serif;">
        <strong>Massage-Anleitung:</strong> Tragen Sie dieses Heilmittel tropfenweise auf die unten aufgeführten Akupunkturpunkte auf und massieren Sie es mit sanftem, kreisendem Druck ein (ca. 1-2 Minuten pro Punkt).
      </div>
    `;
    
    // Render anatomical sections inside accordion
    const sectionKeys = Object.keys(desc.sections);
    if (sectionKeys.length > 0) {
      html += `<div class="materia-medica-section-title">Arzneimittelbild (Boericke)</div>`;
      html += `<div class="materia-medica-accordion">`;
      sectionKeys.forEach((secName) => {
        const secText = desc.sections[secName];
        if (secText) {
          html += `
            <div class="accordion-item">
              <button class="accordion-header">
                <span>${secName}</span>
                <span class="arrow">▼</span>
              </button>
              <div class="accordion-content">
                ${secText}
              </div>
            </div>
          `;
        }
      });
      html += `</div>`;
    }
  }
  
  // Group rubrics by point_id (only when API provides point-scoped rubrics)
  const groupedRubrics: { [pointId: string]: { point_name: string; rubric_entries: { rubric_name: string; grade: number }[] } } = {};
  (data.rubrics || []).forEach((r: any) => {
    if (!r.point_id) return;
    if (!groupedRubrics[r.point_id]) {
      groupedRubrics[r.point_id] = {
        point_name: r.point_name || r.point_id,
        rubric_entries: []
      };
    }
    groupedRubrics[r.point_id].rubric_entries.push({
      rubric_name: r.rubric_name || r.rubric,
      grade: r.grade
    });
  });
  
  const uniquePointsCount = Object.keys(groupedRubrics).length;
  if (uniquePointsCount > 0) {
    html += `<div class="detail-section" style="margin-top: 0;">`;
    html += `<h3>Zugehörige Massagepunkte (Symptomatisch) (${uniquePointsCount})</h3>`;
    html += `<p class="dimmed" style="font-size: 12px; margin-bottom: 12px; font-style: italic;">Punkte, auf die dieses Mittel bei entsprechender Symptom-Abdeckung einmassiert wird:</p>`;
    Object.keys(groupedRubrics).forEach((pointId) => {
      const g = groupedRubrics[pointId];
      const syn = getPointSynonym(pointId);
      
      let rubricsHtml = "";
      g.rubric_entries.forEach((entry) => {
        rubricsHtml += `
          <div class="remedy-point-rubric" style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-top: 4px; padding: 2px 0; border-top: 1px dashed var(--color-border); color: var(--color-text-dark);">
            <span class="rubric-name" style="color: var(--color-text-dark);">${entry.rubric_name}</span>
            <span class="grade-badge grade-${entry.grade}" style="margin-left: 8px; flex-shrink: 0;">Grad ${entry.grade}</span>
          </div>
        `;
      });
      
      html += `
        <div class="remedy-point-item clickable" data-point-id="${pointId}" title="Klicken, um zu Punkt ${syn} zu springen" style="display: block; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; margin-bottom: 6px;">
            <div class="point-badge" style="margin-right: 12px;">${syn}</div>
            <div class="point-name" style="font-weight: bold; color: var(--color-text-dark);">${g.point_name}</div>
          </div>
          <div class="point-rubrics-container" style="padding-left: 8px;">
            ${rubricsHtml}
          </div>
        </div>
      `;
    });
    html += `</div>`;
  }
  
  remedyView.innerHTML = html;
  
  // Attach Event Listeners
  const show3dBtn = document.getElementById("remedy-show-3d-btn");
  if (show3dBtn) {
    show3dBtn.addEventListener("click", () => {
      highlightRemedyPointsIn3D(
        directPointsResolved.map((d) => d.point_id),
        true
      );
    });
  }
  const backBtn = document.getElementById("remedy-back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      // Restore point details view
      remedyView!.style.display = "none";
      locSections.forEach(sec => (sec as HTMLElement).style.display = "block");
      if (tabsSection) tabsSection.style.display = "block";
      
      if (lastViewedPointId) {
        selectPoint(lastViewedPointId);
      } else {
        detailPlaceholderEl.style.display = "flex";
        detailPanelEl.style.display = "none";
      }
    });
  }
  
  // Point clicks
  remedyView.querySelectorAll(".remedy-point-item.clickable").forEach(item => {
    item.addEventListener("click", () => {
      const ptId = (item as HTMLElement).dataset.pointId;
      if (ptId) {
        // Switch meridian if necessary
        let ptMeridian = "";
        const pt = allPointsData.find(p => p.point_id === ptId);
        if (pt) ptMeridian = pt.meridian;
        
        if (ptMeridian) {
          const li = meridianListEl.querySelector(`li[data-name="${ptMeridian}"]`) as HTMLLIElement;
          if (li) {
            selectMeridian(ptMeridian, li);
          }
        }
        
        // Restore point view
        remedyView!.style.display = "none";
        locSections.forEach(sec => (sec as HTMLElement).style.display = "block");
        if (tabsSection) tabsSection.style.display = "block";
        
        selectPoint(ptId);
      }
    });
  });

  // Accordion clicks
  remedyView.querySelectorAll(".materia-medica-accordion .accordion-header").forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      if (item) {
        item.classList.toggle("active");
      }
    });
  });
}

// Start
init();
