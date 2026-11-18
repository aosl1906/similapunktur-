import type { BoerickeRepertoryDataset, BoerickeRepertoryRubric, SelectedSymptom } from "../core/types";

export interface BoerickeBookViewOptions {
  dataset: BoerickeRepertoryDataset;
  getSelectedSymptoms: () => SelectedSymptom[];
  onAddSymptom: (fullSymptomText: string) => void;
  onHighlightPoints?: (pointIds: string[]) => void;
}

interface BookTreeNode {
  label: string;
  fullPath: string;
  depth: number;
  rubric: BoerickeRepertoryRubric | null;
  children: Map<string, BookTreeNode>;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Interactive book-style reader for the Essential Boericke Repertory.
 * Renders the 35 chapters in original order on the left and a hierarchically
 * indented, typographically authentic repertory page on the right.
 */
export class BoerickeBookView {
  private dataset: BoerickeRepertoryDataset;
  private getSelectedSymptoms: () => SelectedSymptom[];
  private onAddSymptom: (fullSymptomText: string) => void;
  private onHighlightPoints?: (pointIds: string[]) => void;

  private chaptersContainer: HTMLElement | null;
  private tocCountEl: HTMLElement | null;
  private pageTitleEl: HTMLElement | null;
  private pageCountEl: HTMLElement | null;
  private pageContentEl: HTMLElement | null;
  private filterInputEl: HTMLInputElement | null;

  private rubricsByChapter = new Map<string, BoerickeRepertoryRubric[]>();
  private activeChapter: string = "";
  private filterQuery: string = "";

  constructor(options: BoerickeBookViewOptions) {
    this.dataset = options.dataset;
    this.getSelectedSymptoms = options.getSelectedSymptoms;
    this.onAddSymptom = options.onAddSymptom;
    this.onHighlightPoints = options.onHighlightPoints;

    this.chaptersContainer = document.getElementById("boericke-book-chapters");
    this.tocCountEl = document.getElementById("boericke-toc-count");
    this.pageTitleEl = document.getElementById("boericke-page-chapter-title");
    this.pageCountEl = document.getElementById("boericke-page-rubric-count");
    this.pageContentEl = document.getElementById("boericke-book-content");
    this.filterInputEl = document.getElementById("boericke-book-filter") as HTMLInputElement | null;

    for (const rubric of this.dataset.rubrics) {
      const ch = rubric.chapter || rubric.full_path.split(" > ")[0] || "Sonstiges";
      if (!this.rubricsByChapter.has(ch)) {
        this.rubricsByChapter.set(ch, []);
      }
      this.rubricsByChapter.get(ch)!.push(rubric);
    }

    const chapters = this.getOrderedChapters();
    this.activeChapter = chapters[0] || "";

    this.bindEvents();
    this.renderChapters();
    this.renderActiveChapter();
  }

  private getOrderedChapters(): string[] {
    if (Array.isArray(this.dataset.chapters) && this.dataset.chapters.length > 0) {
      return this.dataset.chapters
        .map((c) => c.name)
        .filter((ch) => (this.rubricsByChapter.get(ch)?.length || 0) > 0);
    }
    return Array.from(this.rubricsByChapter.keys());
  }

  private bindEvents(): void {
    if (this.filterInputEl) {
      this.filterInputEl.addEventListener("input", () => {
        this.filterQuery = this.filterInputEl?.value.trim().toLowerCase() || "";
        this.renderActiveChapter();
      });
    }
  }

  public openChapter(chapterName: string): void {
    if (!this.rubricsByChapter.has(chapterName)) return;
    this.activeChapter = chapterName;
    this.filterQuery = "";
    if (this.filterInputEl) {
      this.filterInputEl.value = "";
    }
    this.renderChapters();
    this.renderActiveChapter();
    if (this.pageContentEl) {
      this.pageContentEl.scrollTop = 0;
    }
  }

  public refresh(): void {
    this.renderChapters();
    this.renderActiveChapter();
  }

  public refreshSelectionState(): void {
    if (!this.pageContentEl) return;
    const selectedSet = new Set(this.getSelectedSymptoms().map((s) => s.text));
    const entries = this.pageContentEl.querySelectorAll<HTMLElement>(".boericke-rubric-entry[data-full-text]");
    entries.forEach((entry) => {
      const fullText = entry.dataset.fullText || "";
      const isSelected = selectedSet.has(fullText);
      entry.classList.toggle("is-selected", isSelected);
      const btn = entry.querySelector<HTMLButtonElement>(".boericke-rubric-add-btn");
      if (btn) {
        btn.textContent = isSelected ? "✓" : "+";
        btn.title = isSelected ? "Bereits im Warenkorb" : "Zur Fallanalyse hinzufügen";
      }
    });
  }

  private renderChapters(): void {
    if (!this.chaptersContainer) return;
    const chapters = this.getOrderedChapters();
    if (this.tocCountEl) {
      this.tocCountEl.textContent = `${chapters.length}`;
    }

    this.chaptersContainer.innerHTML = "";
    chapters.forEach((chapter, idx) => {
      const count = this.rubricsByChapter.get(chapter)?.length || 0;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "boericke-toc-item" + (chapter === this.activeChapter ? " active" : "");
      btn.innerHTML = `
        <span class="boericke-toc-num">${idx + 1}.</span>
        <span class="boericke-toc-name">${escapeHtml(chapter)}</span>
        <span class="boericke-toc-badge">${count}</span>
      `;
      btn.addEventListener("click", () => {
        this.openChapter(chapter);
      });
      this.chaptersContainer!.appendChild(btn);
    });
  }

  private buildChapterTree(rubrics: BoerickeRepertoryRubric[]): BookTreeNode {
    const root: BookTreeNode = {
      label: this.activeChapter,
      fullPath: this.activeChapter,
      depth: -1,
      rubric: null,
      children: new Map(),
    };

    for (const rubric of rubrics) {
      const parts = rubric.full_path.split(" > ");
      const segments = parts.length > 1 ? parts.slice(1) : [rubric.rubric || rubric.full_path];
      let cursor = root;
      let runningPath = this.activeChapter;

      segments.forEach((seg: string, idx: number) => {
        runningPath = `${runningPath} > ${seg}`;
        if (!cursor.children.has(seg)) {
          cursor.children.set(seg, {
            label: seg,
            fullPath: runningPath,
            depth: idx,
            rubric: null,
            children: new Map(),
          });
        }
        cursor = cursor.children.get(seg)!;
        if (idx === segments.length - 1) {
          cursor.rubric = rubric;
        }
      });
    }

    return root;
  }

  private nodeMatchesFilter(node: BookTreeNode, tokens: string[]): boolean {
    if (tokens.length === 0) return true;
    const selfHaystack = `${node.fullPath} ${
      node.rubric ? node.rubric.remedies.map((r) => r.name).join(" ") : ""
    }`.toLowerCase();

    if (tokens.every((t) => selfHaystack.includes(t))) {
      return true;
    }
    for (const child of node.children.values()) {
      if (this.nodeMatchesFilter(child, tokens)) {
        return true;
      }
    }
    return false;
  }

  private renderActiveChapter(): void {
    if (!this.pageContentEl) return;
    const rubrics = this.rubricsByChapter.get(this.activeChapter) || [];

    if (this.pageTitleEl) {
      this.pageTitleEl.textContent = this.activeChapter;
    }

    const tokens = this.filterQuery
      .split(/\s+/)
      .map((t) => t.trim())
      .filter(Boolean);

    const tree = this.buildChapterTree(rubrics);
    const selectedSet = new Set(this.getSelectedSymptoms().map((s) => s.text));

    const frag = document.createDocumentFragment();
    let visibleCount = 0;

    const renderNode = (node: BookTreeNode) => {
      if (tokens.length > 0 && !this.nodeMatchesFilter(node, tokens)) {
        return;
      }

      const depthClass = `depth-${Math.min(node.depth, 3)}`;
      if (node.rubric) {
        visibleCount++;
        const fullText = `[Boericke] ${node.rubric.full_path}`;
        const isSelected = selectedSet.has(fullText);

        const entry = document.createElement("div");
        entry.className = `boericke-rubric-entry ${depthClass}${isSelected ? " is-selected" : ""}`;
        entry.dataset.fullText = fullText;

        const remediesHtml = node.rubric.remedies
          .map((rem) => {
            const cls = rem.grade >= 2 ? "boericke-remedy grade-2" : "boericke-remedy grade-1";
            return `<span class="${cls}">${escapeHtml(rem.name)}</span>`;
          })
          .join(", ");

        const mappedPoints = node.rubric.points || [];
        const pointsHtml =
          mappedPoints.length > 0
            ? `<div class="boericke-rubric-points">
                ${mappedPoints
                  .map((pt) => {
                    const isBoth = pt.source === "both";
                    const sourceTitle = pt.reason
                      ? pt.reason
                      : pt.source === "both"
                        ? "Indikation & Wirkung"
                        : pt.source === "effect"
                          ? "Wirkung"
                          : "Indikation";
                    const label = pt.id.replace(/_/g, " ");
                    return `<button type="button" class="boericke-point-badge${
                      isBoth ? " is-confirmed" : ""
                    }" data-point-id="${escapeHtml(pt.id)}" title="${escapeHtml(
                      sourceTitle
                    )} • Klick: Im 3D-Skelett zeigen">${
                      isBoth ? "★ " : ""
                    }${escapeHtml(label)}</button>`;
                  })
                  .join("")}
                <button type="button" class="boericke-points-3d-btn" title="Alle zugeordneten Punkte im 3D-Skelett zeigen">🦴 3D</button>
              </div>`
            : "";

        entry.innerHTML = `
          <div class="boericke-rubric-head">
            <span class="boericke-rubric-label">${escapeHtml(node.label)}</span>
            <button type="button" class="boericke-rubric-add-btn" title="${
              isSelected ? "Bereits im Warenkorb" : "Zur Fallanalyse hinzufügen"
            }">${isSelected ? "✓" : "+"}</button>
          </div>
          <div class="boericke-rubric-remedies">${remediesHtml}</div>
          ${pointsHtml}
        `;

        const addBtn = entry.querySelector<HTMLButtonElement>(".boericke-rubric-add-btn");
        addBtn?.addEventListener("click", (e) => {
          e.stopPropagation();
          this.onAddSymptom(fullText);
          this.refreshSelectionState();
        });

        if (mappedPoints.length > 0 && this.onHighlightPoints) {
          entry.querySelectorAll<HTMLButtonElement>(".boericke-point-badge").forEach((badge) => {
            badge.addEventListener("click", (e) => {
              e.stopPropagation();
              const pid = badge.dataset.pointId;
              if (pid) {
                this.onHighlightPoints!([pid]);
              }
            });
          });
          const all3dBtn = entry.querySelector<HTMLButtonElement>(".boericke-points-3d-btn");
          all3dBtn?.addEventListener("click", (e) => {
            e.stopPropagation();
            this.onHighlightPoints!(mappedPoints.map((pt) => pt.id));
          });
        }

        entry.addEventListener("click", () => {
          this.onAddSymptom(fullText);
          this.refreshSelectionState();
        });

        frag.appendChild(entry);
      } else if (node.depth >= 0) {
        const heading = document.createElement("div");
        heading.className = `boericke-rubric-group-heading ${depthClass}`;
        heading.textContent = node.label;
        frag.appendChild(heading);
      }

      for (const child of node.children.values()) {
        renderNode(child);
      }
    };

    for (const topNode of tree.children.values()) {
      renderNode(topNode);
    }

    if (this.pageCountEl) {
      this.pageCountEl.textContent =
        tokens.length > 0
          ? `${visibleCount} von ${rubrics.length} Rubriken`
          : `${rubrics.length} Rubriken`;
    }

    this.pageContentEl.innerHTML = "";
    if (visibleCount === 0) {
      const empty = document.createElement("div");
      empty.className = "boericke-book-empty";
      empty.textContent = `Keine Rubriken für „${this.filterQuery}“ im Kapitel „${this.activeChapter}“ gefunden.`;
      this.pageContentEl.appendChild(empty);
    } else {
      this.pageContentEl.appendChild(frag);
    }
  }
}
