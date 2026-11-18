import type {
  BoerickePointMatch,
  BoerickeRepertoryDataset,
  BoerickeRepertoryRubric,
  PointData,
  PointGeneralAnalysisRubric,
} from "../core/types";

interface PointAuditEntry {
  page: number | null;
  raw_text: string;
  status: "ok" | "warning" | "error";
  issues: string[];
}

interface CurationAuditData {
  generated_at?: string;
  summary?: {
    total_points?: number;
    parsed_raw_blocks?: number;
    points_status?: Record<string, number>;
    total_boericke_rubrics?: number;
    boericke_issue_count?: number;
  };
  points_audit: Record<string, PointAuditEntry>;
  boericke_issues: Record<string, string[]>;
}

interface CurationOverridesState {
  verifiedPoints: Record<string, boolean>;
  flaggedPoints: Record<string, boolean>;
  verifiedBoericke: Record<string, boolean>;
  flaggedBoericke: Record<string, boolean>;
}

export interface CurationWorkbenchOptions {
  modalEl: HTMLElement;
  getAllPoints: () => PointData[];
  getBoerickeData: () => BoerickeRepertoryDataset | null;
  ensureBoerickeLoaded: () => Promise<void>;
  onDataUpdated: () => void;
}

const STORAGE_KEY = "similapunktur_hitl_curation_v1";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatRawTextWithLabels(rawText: string): string {
  const escaped = escapeHtml(rawText);
  return escaped.replace(
    /^(Lokalisation:|Wirkung:|Indikationen:|Zugewiesene[ns]? Hom[öo]opathik[a]?:|Rubriken (?:in|der) General Analysis:|Vorsicht:|Kontraindikation:)/gm,
    '<strong class="curation-raw-label">$1</strong>'
  );
}

export class CurationWorkbench {
  private modalEl: HTMLElement;
  private getAllPoints: () => PointData[];
  private getBoerickeData: () => BoerickeRepertoryDataset | null;
  private ensureBoerickeLoaded: () => Promise<void>;
  private onDataUpdated: () => void;

  private auditData: CurationAuditData | null = null;
  private state: CurationOverridesState = {
    verifiedPoints: {},
    flaggedPoints: {},
    verifiedBoericke: {},
    flaggedBoericke: {},
  };

  private activeTab: "points" | "boericke" = "points";
  private pointFilter: "all" | "issues" | "unverified" | "verified" = "issues";
  private pointSearch: string = "";
  private selectedPointId: string = "";

  private boerickeFilter: "all" | "issues" | "with_points" | "without_points" | "verified" = "issues";
  private boerickeChapterFilter: string = "";
  private boerickeSearch: string = "";
  private selectedBoerickePath: string = "";
  private boerickeRenderLimit: number = 150;

  private showRawRubricsEditor: boolean = false;
  private statusToastTimer: number | null = null;

  constructor(options: CurationWorkbenchOptions) {
    this.modalEl = options.modalEl;
    this.getAllPoints = options.getAllPoints;
    this.getBoerickeData = options.getBoerickeData;
    this.ensureBoerickeLoaded = options.ensureBoerickeLoaded;
    this.onDataUpdated = options.onDataUpdated;

    this.loadLocalState();
  }

  private loadLocalState(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.state = {
          verifiedPoints: parsed.verifiedPoints || {},
          flaggedPoints: parsed.flaggedPoints || {},
          verifiedBoericke: parsed.verifiedBoericke || {},
          flaggedBoericke: parsed.flaggedBoericke || {},
        };
      }
    } catch {
      // ignore invalid storage
    }
  }

  private saveLocalState(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // ignore quota errors
    }
  }

  private async loadAuditAndOverrides(): Promise<void> {
    if (!this.auditData) {
      try {
        const res = await fetch("curation_audit.json");
        if (res.ok) {
          this.auditData = await res.json();
        }
      } catch (err) {
        console.warn("Could not load curation_audit.json:", err);
      }
    }
    try {
      const res = await fetch("/api/curation/overrides");
      if (res.ok) {
        const serverState = await res.json();
        if (serverState && typeof serverState === "object") {
          this.state = {
            verifiedPoints: { ...this.state.verifiedPoints, ...(serverState.verifiedPoints || {}) },
            flaggedPoints: { ...this.state.flaggedPoints, ...(serverState.flaggedPoints || {}) },
            verifiedBoericke: { ...this.state.verifiedBoericke, ...(serverState.verifiedBoericke || {}) },
            flaggedBoericke: { ...this.state.flaggedBoericke, ...(serverState.flaggedBoericke || {}) },
          };
          this.saveLocalState();
        }
      }
    } catch {
      // Static build without dev middleware: localStorage only
    }
  }

  private async persistToServer(payload: {
    updatedPoint?: PointData;
    updatedBoerickeRubric?: {
      original_full_path: string;
      full_path: string;
      rubric: BoerickeRepertoryRubric;
    };
  } = {}): Promise<boolean> {
    this.saveLocalState();
    try {
      const res = await fetch("/api/curation/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          overrides: this.state,
          ...payload,
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  public async open(): Promise<void> {
    this.modalEl.style.display = "flex";
    this.modalEl.innerHTML = `<div class="modal-content curation-modal-content"><div class="curation-loading">Lade Quellen-Audit & Datenbasis...</div></div>`;
    await Promise.all([this.loadAuditAndOverrides(), this.ensureBoerickeLoaded()]);

    const points = this.getAllPoints();
    if (!this.selectedPointId && points.length > 0) {
      const firstFiltered = this.getFilteredPoints()[0];
      this.selectedPointId = (firstFiltered || points[0]).point_id;
    }

    const boericke = this.getBoerickeData();
    if (!this.selectedBoerickePath && boericke?.rubrics?.length) {
      const firstBoericke = this.getFilteredBoerickeRubrics()[0];
      this.selectedBoerickePath = (firstBoericke || boericke.rubrics[0]).full_path;
    }

    this.render();
  }

  public close(): void {
    this.modalEl.style.display = "none";
  }

  private showStatusToast(msg: string, isWarning = false): void {
    const el = this.modalEl.querySelector<HTMLElement>("#curation-status-toast");
    if (!el) return;
    el.textContent = msg;
    el.className = `curation-toast visible ${isWarning ? "is-warning" : "is-success"}`;
    if (this.statusToastTimer !== null) {
      window.clearTimeout(this.statusToastTimer);
    }
    this.statusToastTimer = window.setTimeout(() => {
      el.classList.remove("visible");
    }, 3200);
  }

  private getPointAudit(pointId: string): PointAuditEntry | undefined {
    return this.auditData?.points_audit?.[pointId];
  }

  private getFilteredPoints(): PointData[] {
    const q = this.pointSearch.trim().toLowerCase();
    return this.getAllPoints().filter((p) => {
      const audit = this.getPointAudit(p.point_id);
      const isVerified = Boolean(this.state.verifiedPoints[p.point_id]);
      const hasIssue = audit ? audit.status !== "ok" : false;

      if (this.pointFilter === "issues" && !hasIssue) return false;
      if (this.pointFilter === "unverified" && isVerified) return false;
      if (this.pointFilter === "verified" && !isVerified) return false;

      if (q) {
        const hay = `${p.point_id} ${p.name_german} ${p.name_translation || ""} ${p.meridian} ${(p.indications || []).join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private getFilteredBoerickeRubrics(): BoerickeRepertoryRubric[] {
    const data = this.getBoerickeData();
    if (!data?.rubrics) return [];
    const q = this.boerickeSearch.trim().toLowerCase();
    const issuesMap = this.auditData?.boericke_issues || {};

    return data.rubrics.filter((r) => {
      if (this.boerickeChapterFilter && r.chapter !== this.boerickeChapterFilter) return false;

      const hasIssues = Boolean(issuesMap[r.full_path]?.length);
      const hasPoints = Boolean(r.points && r.points.length > 0);
      const isVerified = Boolean(this.state.verifiedBoericke[r.full_path]);

      if (this.boerickeFilter === "issues" && !hasIssues) return false;
      if (this.boerickeFilter === "with_points" && !hasPoints) return false;
      if (this.boerickeFilter === "without_points" && hasPoints) return false;
      if (this.boerickeFilter === "verified" && !isVerified) return false;

      if (q) {
        const hay = `${r.full_path} ${r.remedies.map((x) => x.name).join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private render(): void {
    const allPoints = this.getAllPoints();
    const totalPoints = allPoints.length;
    const verifiedPtsCount = allPoints.filter((p) => this.state.verifiedPoints[p.point_id]).length;

    const boericke = this.getBoerickeData();
    const totalBoericke = boericke?.rubrics?.length || 0;
    const verifiedBoerickeCount = Object.values(this.state.verifiedBoericke).filter(Boolean).length;

    this.modalEl.innerHTML = `
      <div class="modal-content curation-modal-content">
        <header class="modal-header curation-header">
          <div class="curation-title-wrap">
            <h2>🛡️ Quellen-Prüfung & Kuration (HITL)</h2>
            <span class="curation-progress-pill" id="curation-progress-pill">
              Similapunkte: <strong>${verifiedPtsCount}/${totalPoints}</strong> geprüft &nbsp;|&nbsp;
              Boericke: <strong>${verifiedBoerickeCount}/${totalBoericke}</strong> geprüft
            </span>
          </div>
          <div class="curation-tabs">
            <button type="button" class="curation-tab-btn ${this.activeTab === "points" ? "active" : ""}" data-tab="points">
              🪡 Similapunkte (Quelle vs. JSON)
            </button>
            <button type="button" class="curation-tab-btn ${this.activeTab === "boericke" ? "active" : ""}" data-tab="boericke">
              📖 Boericke Repertorium & Punkt-Mapping
            </button>
          </div>
          <div class="curation-header-actions">
            <button type="button" id="curation-export-btn" class="curation-btn-secondary" title="Aktualisierte JSON-Dateien herunterladen">
              ⬇️ Bereinigte JSONs exportieren
            </button>
            <button type="button" id="curation-close-btn" class="modal-close-btn" title="Schließen">&times;</button>
          </div>
        </header>

        <div id="curation-status-toast" class="curation-toast"></div>

        <div class="curation-body">
          ${this.activeTab === "points" ? this.renderPointsTabHtml() : this.renderBoerickeTabHtml()}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  private renderPointsTabHtml(): string {
    const filtered = this.getFilteredPoints();
    const allPoints = this.getAllPoints();
    const currentPoint =
      allPoints.find((p) => p.point_id === this.selectedPointId) || filtered[0] || allPoints[0] || null;
    if (currentPoint && currentPoint.point_id !== this.selectedPointId) {
      this.selectedPointId = currentPoint.point_id;
    }

    const listHtml =
      filtered.length === 0
        ? `<div class="curation-empty-list">Keine Punkte für diesen Filter.</div>`
        : filtered
            .map((p) => {
              const audit = this.getPointAudit(p.point_id);
              const dot =
                audit?.status === "error" ? "🔴" : audit?.status === "warning" ? "🟡" : "🟢";
              const verified = this.state.verifiedPoints[p.point_id] ? "✅" : "";
              const flagged = this.state.flaggedPoints[p.point_id] && !verified ? "🚩" : "";
              const activeCls = currentPoint?.point_id === p.point_id ? " active" : "";
              return `
                <button type="button" class="curation-list-item${activeCls}" data-point-id="${escapeHtml(p.point_id)}">
                  <span class="curation-status-dot">${dot}</span>
                  <span class="curation-item-main">
                    <strong>${escapeHtml(p.point_id)}</strong> · ${escapeHtml(p.name_german)}
                    <small>${escapeHtml(p.meridian || "")}</small>
                  </span>
                  <span class="curation-item-mark">${verified || flagged}</span>
                </button>
              `;
            })
            .join("");

    let splitHtml = `<div class="curation-empty-pane">Kein Punkt ausgewählt.</div>`;
    if (currentPoint) {
      const audit = this.getPointAudit(currentPoint.point_id);
      const issuesHtml =
        audit && audit.issues.length > 0
          ? `<div class="curation-issues-box is-${audit.status}">
               <strong>Automatisch erkannte Hinweise (${audit.issues.length}):</strong>
               <ul>${audit.issues.map((iss) => `<li>${escapeHtml(iss)}</li>`).join("")}</ul>
             </div>`
          : `<div class="curation-issues-box is-ok">🟢 Keine automatischen Struktur-Abweichungen erkannt.</div>`;

      const rawTextHtml = audit?.raw_text
        ? `<pre class="curation-raw-text">${formatRawTextWithLabels(audit.raw_text)}</pre>`
        : `<div class="curation-empty-raw">Kein direkter Rohtext-Block in Maier-Similapunkte.txt gefunden.</div>`;

      const rubricsPreview = (currentPoint.general_analysis_rubrics || [])
        .map((r) => {
          const remList = (r.remedies || []).map((x) => `${x.name}${x.grade >= 2 ? ` (G${x.grade})` : ""}`).join(", ");
          return `<li><strong>${escapeHtml(r.rubric_name)}:</strong> ${escapeHtml(remList || "—")}</li>`;
        })
        .join("");

      const rubricsJsonStr = JSON.stringify(currentPoint.general_analysis_rubrics || [], null, 2);

      splitHtml = `
        <div class="curation-split">
          <section class="curation-pane curation-source-pane">
            <div class="curation-pane-header">
              <h3>📄 Originalquelle (Maier-Similapunkte.txt)</h3>
              ${audit?.page !== null && audit?.page !== undefined ? `<span class="curation-page-badge">Seite ${audit.page}</span>` : ""}
            </div>
            ${issuesHtml}
            <div class="curation-raw-scroll">${rawTextHtml}</div>
          </section>

          <section class="curation-pane curation-edit-pane">
            <div class="curation-pane-header">
              <h3>✏️ Programm-JSON (${escapeHtml(currentPoint.point_id)})</h3>
              ${
                this.state.verifiedPoints[currentPoint.point_id]
                  ? `<span class="curation-verified-badge">✅ 100% geprüft</span>`
                  : this.state.flaggedPoints[currentPoint.point_id]
                    ? `<span class="curation-flagged-badge">🚩 Zurückgestellt</span>`
                    : `<span class="curation-pending-badge">⏳ Ungeprüft</span>`
              }
            </div>

            <div class="curation-form-scroll">
              <div class="curation-form-row-2">
                <label class="curation-field">
                  <span>Deutscher Name</span>
                  <input type="text" id="cur-pt-name-de" value="${escapeHtml(currentPoint.name_german || "")}" />
                </label>
                <label class="curation-field">
                  <span>Übersetzung / Chinesischer Name</span>
                  <input type="text" id="cur-pt-trans" value="${escapeHtml(currentPoint.name_translation || "")}" />
                </label>
              </div>

              <label class="curation-field">
                <span>Lokalisation</span>
                <textarea id="cur-pt-loc" rows="2">${escapeHtml(currentPoint.localisation_text || "")}</textarea>
              </label>

              <label class="curation-field">
                <span>Wirkungen (1 Eintrag pro Zeile)</span>
                <textarea id="cur-pt-effects" rows="3">${escapeHtml((currentPoint.effects || []).join("\n"))}</textarea>
              </label>

              <label class="curation-field">
                <span>Indikationen (1 Eintrag pro Zeile)</span>
                <textarea id="cur-pt-indications" rows="5">${escapeHtml((currentPoint.indications || []).join("\n"))}</textarea>
              </label>

              <label class="curation-field">
                <span>Zugewiesene Homöopathika (Komma-separiert)</span>
                <input type="text" id="cur-pt-remedies" value="${escapeHtml((currentPoint.assigned_homeopathics || []).join(", "))}" />
              </label>

              <label class="curation-field">
                <span>Vorsichtsmaßnahmen / Kontraindikationen</span>
                <input type="text" id="cur-pt-precautions" value="${escapeHtml(currentPoint.precautions_or_contraindications || "")}" />
              </label>

              <div class="curation-field">
                <div class="curation-rubrics-head">
                  <span>General Analysis Rubriken (${(currentPoint.general_analysis_rubrics || []).length})</span>
                  <button type="button" id="cur-toggle-rubrics-json" class="curation-link-btn">
                    ${this.showRawRubricsEditor ? "Vorschau anzeigen" : "Als JSON bearbeiten"}
                  </button>
                </div>
                ${
                  this.showRawRubricsEditor
                    ? `<textarea id="cur-pt-rubrics-json" rows="7" class="curation-mono-textarea">${escapeHtml(rubricsJsonStr)}</textarea>`
                    : `<ul class="curation-rubrics-preview">${rubricsPreview || "<li><em>Keine Rubriken</em></li>"}</ul>`
                }
              </div>
            </div>

            <div class="curation-actions-bar">
              <button type="button" id="cur-pt-verify-next" class="curation-btn-primary">
                ✅ Speichern, als 100% geprüft markieren & Weiter
              </button>
              <button type="button" id="cur-pt-save-only" class="curation-btn-secondary">
                💾 Nur Änderungen speichern
              </button>
              <button type="button" id="cur-pt-flag" class="curation-btn-flag">
                🚩 Zurückstellen
              </button>
            </div>
          </section>
        </div>
      `;
    }

    return `
      <div class="curation-layout">
        <aside class="curation-sidebar">
          <input type="text" id="cur-pt-search" class="curation-search" placeholder="Punkt suchen (ID, Name, Indikation)..." value="${escapeHtml(this.pointSearch)}" />
          <div class="curation-filter-pills">
            <button type="button" class="curation-filter-pill ${this.pointFilter === "all" ? "active" : ""}" data-pt-filter="all">Alle (${allPoints.length})</button>
            <button type="button" class="curation-filter-pill ${this.pointFilter === "issues" ? "active" : ""}" data-pt-filter="issues">🔴/🟡 Auffällig</button>
            <button type="button" class="curation-filter-pill ${this.pointFilter === "unverified" ? "active" : ""}" data-pt-filter="unverified">⏳ Ungeprüft</button>
            <button type="button" class="curation-filter-pill ${this.pointFilter === "verified" ? "active" : ""}" data-pt-filter="verified">✅ Geprüft</button>
          </div>
          <div class="curation-list-meta">${filtered.length} Treffer</div>
          <div class="curation-list-scroll">${listHtml}</div>
        </aside>
        <main class="curation-main">${splitHtml}</main>
      </div>
    `;
  }

  private renderBoerickeTabHtml(): string {
    const boericke = this.getBoerickeData();
    const filtered = this.getFilteredBoerickeRubrics();
    const visibleItems = filtered.slice(0, this.boerickeRenderLimit);
    const issuesMap = this.auditData?.boericke_issues || {};

    const currentRubric =
      boericke?.rubrics?.find((r) => r.full_path === this.selectedBoerickePath) ||
      visibleItems[0] ||
      null;
    if (currentRubric && currentRubric.full_path !== this.selectedBoerickePath) {
      this.selectedBoerickePath = currentRubric.full_path;
    }

    const chapters = boericke?.chapters || [];
    const chapterOpts = [
      `<option value="">Alle Kapitel (${chapters.length})</option>`,
      ...chapters.map(
        (c) =>
          `<option value="${escapeHtml(c.name)}"${c.name === this.boerickeChapterFilter ? " selected" : ""}>${escapeHtml(c.num)}. ${escapeHtml(c.name)}</option>`
      ),
    ].join("");

    const listHtml =
      visibleItems.length === 0
        ? `<div class="curation-empty-list">Keine Rubriken für diesen Filter.</div>`
        : visibleItems
            .map((r) => {
              const hasIssue = Boolean(issuesMap[r.full_path]?.length);
              const ptsCount = r.points?.length || 0;
              const verified = this.state.verifiedBoericke[r.full_path] ? "✅" : "";
              const flagged = this.state.flaggedBoericke[r.full_path] && !verified ? "🚩" : "";
              const activeCls = currentRubric?.full_path === r.full_path ? " active" : "";
              return `
                <button type="button" class="curation-list-item${activeCls}" data-boericke-path="${escapeHtml(r.full_path)}">
                  <span class="curation-status-dot">${hasIssue ? "🟡" : ptsCount > 0 ? "🎯" : "⭕"}</span>
                  <span class="curation-item-main">
                    <strong>${escapeHtml(r.rubric)}</strong>
                    <small>${escapeHtml(r.chapter)}${r.parent_rubric ? ` > ${escapeHtml(r.parent_rubric)}` : ""} · ${r.remedies.length} Mittel · ${ptsCount} Pkt</small>
                  </span>
                  <span class="curation-item-mark">${verified || flagged}</span>
                </button>
              `;
            })
            .join("") +
          (filtered.length > visibleItems.length
            ? `<button type="button" id="cur-boericke-load-more" class="curation-load-more-btn">Weitere laden (${visibleItems.length} von ${filtered.length})</button>`
            : "");

    let splitHtml = `<div class="curation-empty-pane">Keine Boericke-Rubrik ausgewählt.</div>`;
    if (currentRubric) {
      const issues = issuesMap[currentRubric.full_path] || [];
      const issuesHtml =
        issues.length > 0
          ? `<div class="curation-issues-box is-warning">
               <strong>Parsing-Hinweise (${issues.length}):</strong>
               <ul>${issues.map((iss) => `<li>${escapeHtml(iss)}</li>`).join("")}</ul>
             </div>`
          : `<div class="curation-issues-box is-ok">🟢 Keine Parsing-Auffälligkeiten in dieser Rubrik.</div>`;

      const remediesPreview = currentRubric.remedies
        .map((rem) =>
          rem.grade >= 2
            ? `<span class="boericke-remedy grade-2">${escapeHtml(rem.name)}</span>`
            : `<span class="boericke-remedy grade-1">${escapeHtml(rem.name)}</span>`
        )
        .join(", ");

      const remediesEditText = currentRubric.remedies
        .map((rem) => (rem.grade >= 2 ? `${rem.name}:${rem.grade}` : rem.name))
        .join(", ");

      const mappedPts = currentRubric.points || [];
      const mappedPtsHtml =
        mappedPts.length > 0
          ? mappedPts
              .map(
                (pt) => `
                  <span class="curation-mapped-pt-chip">
                    <strong>${escapeHtml(pt.id.replace(/_/g, " "))}</strong>
                    <small>${escapeHtml(pt.reason || pt.source)} (${pt.score})</small>
                    <button type="button" class="curation-remove-pt-btn" data-remove-pt-id="${escapeHtml(pt.id)}" title="Punkt entfernen">&times;</button>
                  </span>
                `
              )
              .join("")
          : `<span class="curation-empty-pts">Keine Punkte zugeordnet.</span>`;

      const pointDatalistOpts = this.getAllPoints()
        .map((p) => `<option value="${escapeHtml(p.point_id)}">${escapeHtml(p.point_id)} — ${escapeHtml(p.name_german)}</option>`)
        .join("");

      splitHtml = `
        <div class="curation-split">
          <section class="curation-pane curation-source-pane">
            <div class="curation-pane-header">
              <h3>📖 Boericke-Eintrag (Quelle)</h3>
              <span class="curation-page-badge">Kap. ${escapeHtml(currentRubric.chapter_num)}</span>
            </div>
            ${issuesHtml}
            <div class="curation-boericke-path">${escapeHtml(currentRubric.full_path)}</div>
            <div class="curation-boericke-preview">
              <div class="curation-boericke-preview-title">${escapeHtml(currentRubric.rubric)}</div>
              <div class="curation-boericke-preview-rems">${remediesPreview}</div>
            </div>
          </section>

          <section class="curation-pane curation-edit-pane">
            <div class="curation-pane-header">
              <h3>✏️ Rubrik & Punkt-Kuration</h3>
              ${
                this.state.verifiedBoericke[currentRubric.full_path]
                  ? `<span class="curation-verified-badge">✅ Geprüft</span>`
                  : this.state.flaggedBoericke[currentRubric.full_path]
                    ? `<span class="curation-flagged-badge">🚩 Zurückgestellt</span>`
                    : `<span class="curation-pending-badge">⏳ Ungeprüft</span>`
              }
            </div>

            <div class="curation-form-scroll">
              <label class="curation-field">
                <span>Oberrubrik (parent_rubric)</span>
                <input type="text" id="cur-br-parent" value="${escapeHtml(currentRubric.parent_rubric || "")}" />
              </label>

              <label class="curation-field">
                <span>Rubrik (rubric)</span>
                <input type="text" id="cur-br-rubric" value="${escapeHtml(currentRubric.rubric || "")}" />
              </label>

              <label class="curation-field">
                <span>Mittel (Komma-separiert; Grad 2 mit :2 kennzeichnen, z. B. Acon.:2, Bell.)</span>
                <textarea id="cur-br-remedies" rows="4">${escapeHtml(remediesEditText)}</textarea>
              </label>

              <div class="curation-field">
                <span>Zugeordnete Akupunkturpunkte (${mappedPts.length})</span>
                <div class="curation-mapped-pts-wrap" id="cur-br-points-list">${mappedPtsHtml}</div>
                <div class="curation-add-pt-row">
                  <input type="text" id="cur-br-add-pt-input" list="curation-points-datalist" placeholder="Punkt-ID eingeben (z. B. ST_36, SP_6)..." />
                  <datalist id="curation-points-datalist">${pointDatalistOpts}</datalist>
                  <button type="button" id="cur-br-add-pt-btn" class="curation-btn-secondary">+ Punkt hinzufügen</button>
                </div>
              </div>
            </div>

            <div class="curation-actions-bar">
              <button type="button" id="cur-br-verify-next" class="curation-btn-primary">
                ✅ Rubrik bestätigen & Weiter
              </button>
              <button type="button" id="cur-br-save-only" class="curation-btn-secondary">
                💾 Nur Änderungen speichern
              </button>
              <button type="button" id="cur-br-flag" class="curation-btn-flag">
                🚩 Zurückstellen
              </button>
            </div>
          </section>
        </div>
      `;
    }

    return `
      <div class="curation-layout">
        <aside class="curation-sidebar">
          <select id="cur-br-chapter" class="curation-select">${chapterOpts}</select>
          <input type="text" id="cur-br-search" class="curation-search" placeholder="Rubrik oder Mittel suchen..." value="${escapeHtml(this.boerickeSearch)}" />
          <div class="curation-filter-pills">
            <button type="button" class="curation-filter-pill ${this.boerickeFilter === "all" ? "active" : ""}" data-br-filter="all">Alle</button>
            <button type="button" class="curation-filter-pill ${this.boerickeFilter === "issues" ? "active" : ""}" data-br-filter="issues">🟡 Parsing</button>
            <button type="button" class="curation-filter-pill ${this.boerickeFilter === "with_points" ? "active" : ""}" data-br-filter="with_points">🎯 Mit Pkt</button>
            <button type="button" class="curation-filter-pill ${this.boerickeFilter === "without_points" ? "active" : ""}" data-br-filter="without_points">⭕ Ohne Pkt</button>
            <button type="button" class="curation-filter-pill ${this.boerickeFilter === "verified" ? "active" : ""}" data-br-filter="verified">✅ Geprüft</button>
          </div>
          <div class="curation-list-meta">${filtered.length} Treffer</div>
          <div class="curation-list-scroll">${listHtml}</div>
        </aside>
        <main class="curation-main">${splitHtml}</main>
      </div>
    `;
  }

  private bindEvents(): void {
    this.modalEl.querySelector("#curation-close-btn")?.addEventListener("click", () => this.close());
    this.modalEl.querySelector("#curation-export-btn")?.addEventListener("click", () => this.exportCleanJsons());

    this.modalEl.querySelectorAll<HTMLButtonElement>(".curation-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab as "points" | "boericke" | undefined;
        if (tab && tab !== this.activeTab) {
          this.activeTab = tab;
          this.render();
        }
      });
    });

    if (this.activeTab === "points") {
      this.bindPointsEvents();
    } else {
      this.bindBoerickeEvents();
    }
  }

  private bindPointsEvents(): void {
    const searchEl = this.modalEl.querySelector<HTMLInputElement>("#cur-pt-search");
    searchEl?.addEventListener("input", () => {
      this.pointSearch = searchEl.value;
      const cursor = searchEl.selectionStart;
      this.render();
      const nextSearch = this.modalEl.querySelector<HTMLInputElement>("#cur-pt-search");
      if (nextSearch) {
        nextSearch.focus();
        if (cursor !== null) nextSearch.setSelectionRange(cursor, cursor);
      }
    });

    this.modalEl.querySelectorAll<HTMLButtonElement>("[data-pt-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.pointFilter = btn.dataset.ptFilter as typeof this.pointFilter;
        const first = this.getFilteredPoints()[0];
        if (first) this.selectedPointId = first.point_id;
        this.render();
      });
    });

    this.modalEl.querySelectorAll<HTMLButtonElement>("[data-point-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.selectedPointId = btn.dataset.pointId || "";
        this.showRawRubricsEditor = false;
        this.render();
      });
    });

    this.modalEl.querySelector("#cur-toggle-rubrics-json")?.addEventListener("click", () => {
      this.showRawRubricsEditor = !this.showRawRubricsEditor;
      this.render();
    });

    this.modalEl.querySelector("#cur-pt-save-only")?.addEventListener("click", () => this.saveCurrentPoint(false));
    this.modalEl.querySelector("#cur-pt-verify-next")?.addEventListener("click", () => this.saveCurrentPoint(true));
    this.modalEl.querySelector("#cur-pt-flag")?.addEventListener("click", () => {
      if (!this.selectedPointId) return;
      this.state.flaggedPoints[this.selectedPointId] = true;
      delete this.state.verifiedPoints[this.selectedPointId];
      void this.persistToServer();
      this.advanceToNextPoint();
      this.render();
      this.showStatusToast("Punkt zurückgestellt (Flag gesetzt).", true);
    });
  }

  private async saveCurrentPoint(verifyAndAdvance: boolean): Promise<void> {
    const point = this.getAllPoints().find((p) => p.point_id === this.selectedPointId);
    if (!point) return;

    const nameDe = this.modalEl.querySelector<HTMLInputElement>("#cur-pt-name-de")?.value.trim() || "";
    const trans = this.modalEl.querySelector<HTMLInputElement>("#cur-pt-trans")?.value.trim() || "";
    const loc = this.modalEl.querySelector<HTMLTextAreaElement>("#cur-pt-loc")?.value.trim() || "";
    const effectsRaw = this.modalEl.querySelector<HTMLTextAreaElement>("#cur-pt-effects")?.value || "";
    const indicationsRaw = this.modalEl.querySelector<HTMLTextAreaElement>("#cur-pt-indications")?.value || "";
    const remediesRaw = this.modalEl.querySelector<HTMLInputElement>("#cur-pt-remedies")?.value || "";
    const precautions = this.modalEl.querySelector<HTMLInputElement>("#cur-pt-precautions")?.value.trim() || "";

    let updatedRubrics: PointGeneralAnalysisRubric[] | undefined;
    const rubricsTextarea = this.modalEl.querySelector<HTMLTextAreaElement>("#cur-pt-rubrics-json");
    if (rubricsTextarea) {
      try {
        const parsed = JSON.parse(rubricsTextarea.value);
        if (!Array.isArray(parsed)) throw new Error("Muss ein JSON-Array sein.");
        updatedRubrics = parsed;
      } catch (err: any) {
        this.showStatusToast(`Ungültiges Rubriken-JSON: ${err?.message || "Syntaxfehler"}`, true);
        return;
      }
    }

    point.name_german = nameDe;
    point.name_translation = trans || undefined;
    point.localisation_text = loc;
    point.effects = effectsRaw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    point.indications = indicationsRaw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    point.assigned_homeopathics = remediesRaw.split(",").map((s) => s.trim()).filter(Boolean);
    point.precautions_or_contraindications = precautions || null;
    if (updatedRubrics !== undefined) {
      point.general_analysis_rubrics = updatedRubrics;
    }

    if (verifyAndAdvance) {
      this.state.verifiedPoints[point.point_id] = true;
      delete this.state.flaggedPoints[point.point_id];
      this.advanceToNextPoint();
    }

    const savedRemote = await this.persistToServer({ updatedPoint: point });
    this.onDataUpdated();
    this.render();
    this.showStatusToast(
      savedRemote
        ? `${point.point_id} direkt in similapunktur.json gespeichert.`
        : `${point.point_id} lokal gespeichert (zum Schreiben auf Platte 'bereinigte JSONs exportieren' nutzen).`,
      !savedRemote
    );
  }

  private advanceToNextPoint(): void {
    const filtered = this.getFilteredPoints();
    const curIdx = filtered.findIndex((p) => p.point_id === this.selectedPointId);
    const nextUnverified =
      filtered.slice(curIdx + 1).find((p) => !this.state.verifiedPoints[p.point_id]) ||
      filtered.find((p) => !this.state.verifiedPoints[p.point_id] && p.point_id !== this.selectedPointId) ||
      filtered[curIdx + 1];
    if (nextUnverified) {
      this.selectedPointId = nextUnverified.point_id;
      this.showRawRubricsEditor = false;
    }
  }

  private bindBoerickeEvents(): void {
    const chapterEl = this.modalEl.querySelector<HTMLSelectElement>("#cur-br-chapter");
    chapterEl?.addEventListener("change", () => {
      this.boerickeChapterFilter = chapterEl.value;
      this.boerickeRenderLimit = 150;
      const first = this.getFilteredBoerickeRubrics()[0];
      if (first) this.selectedBoerickePath = first.full_path;
      this.render();
    });

    const searchEl = this.modalEl.querySelector<HTMLInputElement>("#cur-br-search");
    searchEl?.addEventListener("input", () => {
      this.boerickeSearch = searchEl.value;
      this.boerickeRenderLimit = 150;
      const cursor = searchEl.selectionStart;
      this.render();
      const nextSearch = this.modalEl.querySelector<HTMLInputElement>("#cur-br-search");
      if (nextSearch) {
        nextSearch.focus();
        if (cursor !== null) nextSearch.setSelectionRange(cursor, cursor);
      }
    });

    this.modalEl.querySelectorAll<HTMLButtonElement>("[data-br-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.boerickeFilter = btn.dataset.brFilter as typeof this.boerickeFilter;
        this.boerickeRenderLimit = 150;
        const first = this.getFilteredBoerickeRubrics()[0];
        if (first) this.selectedBoerickePath = first.full_path;
        this.render();
      });
    });

    this.modalEl.querySelectorAll<HTMLButtonElement>("[data-boericke-path]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.selectedBoerickePath = btn.dataset.boerickePath || "";
        this.render();
      });
    });

    this.modalEl.querySelector("#cur-boericke-load-more")?.addEventListener("click", () => {
      this.boerickeRenderLimit += 150;
      this.render();
    });

    this.modalEl.querySelectorAll<HTMLButtonElement>("[data-remove-pt-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pid = btn.dataset.removePtId;
        const rubric = this.getBoerickeData()?.rubrics?.find((r) => r.full_path === this.selectedBoerickePath);
        if (!rubric || !pid) return;
        rubric.points = (rubric.points || []).filter((pt) => pt.id !== pid);
        void this.saveCurrentBoerickeRubric(false);
      });
    });

    this.modalEl.querySelector("#cur-br-add-pt-btn")?.addEventListener("click", () => {
      const input = this.modalEl.querySelector<HTMLInputElement>("#cur-br-add-pt-input");
      const rawVal = input?.value.trim().toUpperCase() || "";
      if (!rawVal) return;
      const rubric = this.getBoerickeData()?.rubrics?.find((r) => r.full_path === this.selectedBoerickePath);
      if (!rubric) return;
      const pts: BoerickePointMatch[] = rubric.points ? [...rubric.points] : [];
      if (!pts.some((pt) => pt.id === rawVal)) {
        pts.unshift({
          id: rawVal,
          score: 25,
          source: "manual",
          reason: "Manuell kuratiert (HITL)",
        });
        rubric.points = pts;
        void this.saveCurrentBoerickeRubric(false);
      }
    });

    this.modalEl.querySelector("#cur-br-save-only")?.addEventListener("click", () => this.saveCurrentBoerickeRubric(false));
    this.modalEl.querySelector("#cur-br-verify-next")?.addEventListener("click", () => this.saveCurrentBoerickeRubric(true));
    this.modalEl.querySelector("#cur-br-flag")?.addEventListener("click", () => {
      if (!this.selectedBoerickePath) return;
      this.state.flaggedBoericke[this.selectedBoerickePath] = true;
      delete this.state.verifiedBoericke[this.selectedBoerickePath];
      void this.persistToServer();
      this.advanceToNextBoericke();
      this.render();
      this.showStatusToast("Rubrik zurückgestellt (Flag gesetzt).", true);
    });
  }

  private async saveCurrentBoerickeRubric(verifyAndAdvance: boolean): Promise<void> {
    const rubricObj = this.getBoerickeData()?.rubrics?.find((r) => r.full_path === this.selectedBoerickePath);
    if (!rubricObj) return;

    const originalFullPath = rubricObj.full_path;
    const parentVal = this.modalEl.querySelector<HTMLInputElement>("#cur-br-parent")?.value.trim() || "";
    const rubricVal = this.modalEl.querySelector<HTMLInputElement>("#cur-br-rubric")?.value.trim() || "";
    const remediesRaw = this.modalEl.querySelector<HTMLTextAreaElement>("#cur-br-remedies")?.value || "";

    const parsedRemedies = remediesRaw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [namePart, gradePart] = item.split(":");
        const grade = gradePart ? Math.max(1, parseInt(gradePart.trim(), 10) || 1) : 1;
        return { name: namePart.trim(), grade };
      });

    rubricObj.parent_rubric = parentVal;
    rubricObj.rubric = rubricVal || rubricObj.rubric;
    rubricObj.full_path = parentVal
      ? `${rubricObj.chapter} > ${parentVal} > ${rubricObj.rubric}`
      : `${rubricObj.chapter} > ${rubricObj.rubric}`;
    if (parsedRemedies.length > 0) {
      rubricObj.remedies = parsedRemedies;
    }

    this.selectedBoerickePath = rubricObj.full_path;

    if (verifyAndAdvance) {
      this.state.verifiedBoericke[rubricObj.full_path] = true;
      delete this.state.flaggedBoericke[rubricObj.full_path];
      this.advanceToNextBoericke();
    }

    const savedRemote = await this.persistToServer({
      updatedBoerickeRubric: {
        original_full_path: originalFullPath,
        full_path: rubricObj.full_path,
        rubric: rubricObj,
      },
    });
    this.onDataUpdated();
    this.render();
    this.showStatusToast(
      savedRemote
        ? "Boericke-Rubrik direkt in boericke_repertory.json gespeichert."
        : "Boericke-Rubrik lokal gespeichert (Export-Button für Dateidownload nutzen).",
      !savedRemote
    );
  }

  private advanceToNextBoericke(): void {
    const filtered = this.getFilteredBoerickeRubrics();
    const curIdx = filtered.findIndex((r) => r.full_path === this.selectedBoerickePath);
    const nextUnverified =
      filtered.slice(curIdx + 1).find((r) => !this.state.verifiedBoericke[r.full_path]) ||
      filtered.find((r) => !this.state.verifiedBoericke[r.full_path] && r.full_path !== this.selectedBoerickePath) ||
      filtered[curIdx + 1];
    if (nextUnverified) {
      this.selectedBoerickePath = nextUnverified.full_path;
    }
  }

  private downloadJsonFile(filename: string, data: unknown): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  private async exportCleanJsons(): Promise<void> {
    await this.persistToServer();
    this.downloadJsonFile("similapunktur.json", this.getAllPoints());
    const boericke = this.getBoerickeData();
    if (boericke) {
      window.setTimeout(() => this.downloadJsonFile("boericke_repertory.json", boericke), 250);
    }
    window.setTimeout(() => this.downloadJsonFile("curation_overrides.json", this.state), 500);
    this.showStatusToast("Bereinigte JSON-Dateien exportiert.");
  }
}
