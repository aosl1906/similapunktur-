// Repertorisation Matrix Table Component for Similapunktur
import { SelectedSymptom, PointData, BoerickeRepertoryDataset } from '../core/types';

export interface MatrixTableOptions {
  container: HTMLElement;
  selectedSymptoms: SelectedSymptom[];
  allPointsData: PointData[];
  staticTtbData?: any;
  staticBoerickeRepData?: BoerickeRepertoryDataset | null;
  rubricsRemediesMap?: Map<string, Map<string, number>>;
  activeModalities?: Set<string>;
  remedyContraindications?: Map<string, Set<string>>;
  useExponentialScoring?: boolean;
  onRemedyClick?: (remedyName: string) => void;
}

/**
 * Renders the visual homeopathic repertorisation matrix table with sticky headers,
 * symptom columns, modality boosts, polarity warnings, and column highlights.
 */
export function renderMatrixTable({
  container,
  selectedSymptoms,
  allPointsData,
  staticTtbData = null,
  staticBoerickeRepData = null,
  rubricsRemediesMap = new Map(),
  activeModalities = new Set(),
  remedyContraindications = new Map(),
  useExponentialScoring = true,
  onRemedyClick
}: MatrixTableOptions): void {
  if (selectedSymptoms.length === 0) {
    container.innerHTML = "<p class='dimmed' style='padding: 24px;'>Keine Symptome im Fall vorhanden.</p>";
    return;
  }

  const boerickeRubricsMap = new Map<string, Array<{ name: string; grade: number }>>();
  if (staticBoerickeRepData?.rubrics) {
    staticBoerickeRepData.rubrics.forEach(r => {
      boerickeRubricsMap.set(r.full_path.toLowerCase().trim(), r.remedies);
    });
  }

  const remedyScoresMap = new Map<
    string,
    { matches: Set<string>; score: number; grades: Record<string, number> }
  >();

  selectedSymptoms.forEach(s => {
    const isTtb = s.text.startsWith("[TTB] ");
    const isBoericke = s.text.startsWith("[Boericke] ");
    const cleanSym = isTtb
      ? s.text.substring(6).toLowerCase().trim()
      : isBoericke
        ? s.text.substring(11).toLowerCase().trim()
        : s.text.toLowerCase().trim();

    if (isBoericke) {
      const remedies = boerickeRubricsMap.get(cleanSym);
      if (remedies) {
        remedies.forEach(rem => {
          const cleanRemName = rem.name.replace(/\.$/, "");
          if (!remedyScoresMap.has(cleanRemName)) {
            remedyScoresMap.set(cleanRemName, { matches: new Set(), score: 0, grades: {} });
          }
          const entry = remedyScoresMap.get(cleanRemName)!;
          if (!entry.matches.has(s.id)) {
            entry.matches.add(s.id);
            const gradeWeight = useExponentialScoring ? (rem.grade * rem.grade) : rem.grade;
            entry.score += gradeWeight * s.weight;
          }
          entry.grades[s.id] = Math.max(entry.grades[s.id] || 0, rem.grade);
        });
      }
    } else if (isTtb) {
      if (staticTtbData) {
        const rubricKeys = Object.keys(staticTtbData);
        const matchKey = rubricKeys.find(k => k.toLowerCase().trim() === cleanSym);
        if (matchKey) {
          const remedies = staticTtbData[matchKey];
          remedies.forEach((rem: { name: string; grade: number }) => {
            const cleanRemName = rem.name.replace(/\.$/, "");
            if (!remedyScoresMap.has(cleanRemName)) {
              remedyScoresMap.set(cleanRemName, { matches: new Set(), score: 0, grades: {} });
            }
            const entry = remedyScoresMap.get(cleanRemName)!;
            if (!entry.matches.has(s.id)) {
              entry.matches.add(s.id);
              const gradeWeight = useExponentialScoring ? (rem.grade * rem.grade) : rem.grade;
              entry.score += gradeWeight * s.weight;
            }
            entry.grades[s.id] = Math.max(entry.grades[s.id] || 0, rem.grade);
          });
        }
      }
    } else {
      allPointsData.forEach(p => {
        if (p.general_analysis_rubrics) {
          p.general_analysis_rubrics.forEach((rub: any) => {
            if (rub.rubric_name.toLowerCase().includes(cleanSym)) {
              rub.remedies.forEach((rem: any) => {
                if (!remedyScoresMap.has(rem.name)) {
                  remedyScoresMap.set(rem.name, { matches: new Set(), score: 0, grades: {} });
                }
                const entry = remedyScoresMap.get(rem.name)!;
                if (!entry.matches.has(s.id)) {
                  entry.matches.add(s.id);
                  const gradeWeight = useExponentialScoring ? (rem.grade * rem.grade) : rem.grade;
                  entry.score += gradeWeight * s.weight;
                }
                entry.grades[s.id] = Math.max(entry.grades[s.id] || 0, rem.grade);
              });
            }
          });
        }

        const directMatch =
          (p.effects && p.effects.some((e: string) => e.toLowerCase().includes(cleanSym))) ||
          (p.indications && p.indications.some((i: string) => i.toLowerCase().includes(cleanSym)));
        if (directMatch && p.assigned_homeopathics) {
          p.assigned_homeopathics.forEach((remName: string) => {
            if (!remedyScoresMap.has(remName)) {
              remedyScoresMap.set(remName, { matches: new Set(), score: 0, grades: {} });
            }
            const entry = remedyScoresMap.get(remName)!;
            if (!entry.matches.has(s.id)) {
              entry.matches.add(s.id);
              const weiheWeight = useExponentialScoring ? 9 : 3;
              entry.score += weiheWeight * s.weight;
            }
            entry.grades[s.id] = Math.max(entry.grades[s.id] || 0, 3);
          });
        }
      });
    }
  });

  const sortedRemedies: Array<{
    name: string;
    matchesCount: number;
    score: number;
    grades: Record<string, number>;
    modalityGrades: Record<string, number>;
  }> = [];

  remedyScoresMap.forEach((val, name) => {
    let modalityScore = 0;
    const modalityGrades: Record<string, number> = {};

    activeModalities.forEach(modRubric => {
      const remMap = rubricsRemediesMap.get(modRubric);
      if (remMap) {
        const grade = remMap.get(name);
        if (grade) {
          const modWeight = useExponentialScoring ? (grade * grade) * 2 : grade * 2;
          modalityScore += modWeight;
          modalityGrades[modRubric] = grade;
        }
      }
    });

    sortedRemedies.push({
      name,
      matchesCount: val.matches.size,
      score: val.score + modalityScore,
      grades: val.grades,
      modalityGrades
    });
  });

  sortedRemedies.sort((a, b) => {
    if (b.matchesCount !== a.matchesCount) return b.matchesCount - a.matchesCount;
    return b.score - a.score;
  });

  // Show top 30 remedies
  const remediesToDisplay = sortedRemedies.slice(0, 30);

  let html = `<table class="matrix-table">`;

  // Header
  html += `<thead><tr><th class="remedy-col-header">Heilmittel</th>`;

  // Symptom columns
  selectedSymptoms.forEach(s => {
    const isTtb = s.text.startsWith("[TTB] ");
    const isBoericke = s.text.startsWith("[Boericke] ");
    const cleanText = isTtb
      ? s.text.substring(6)
      : isBoericke
        ? s.text.substring(11)
        : s.text;
    const headerClass = isTtb ? "symptom-header ttb-symptom-header" : "symptom-header";
    html += `<th class="${headerClass}" data-symptom-id="${s.id}"><span>${cleanText} <small class="dimmed" style="font-weight: normal;">(x${s.weight})</small></span></th>`;
  });

  // Modality columns headers
  activeModalities.forEach(modRubric => {
    let cleanHeaderName = modRubric
      .replace(", Agg.", "")
      .replace("Teils, wie Kopf, Hände, usw. in kaltem Wasser, usw. Agg.", "Kaltes Wasser")
      .replace("Wasser feuchte Räume, usw. Agg.", "Feuchtigkeit")
      .replace("Überhitzung, usw. Agg.", "Überhitzung")
      .trim();
    if (cleanHeaderName.length > 20) {
      cleanHeaderName = cleanHeaderName.substring(0, 18) + "...";
    }
    html += `<th class="symptom-header modality-header" title="${modRubric}"><span>⚡ ${cleanHeaderName}</span></th>`;
  });

  // Totals headers
  html += `<th class="total-header">Treffer</th>`;
  html += `<th class="total-header">Score</th>`;
  html += `</tr></thead>`;

  // Body (one row per remedy)
  html += `<tbody>`;
  remediesToDisplay.forEach(rem => {
    html += `<tr data-remedy="${rem.name}">`;

    const isContraindicated = remedyContraindications.has(rem.name);
    const remCellClass = isContraindicated ? "remedy-cell contraindicated" : "remedy-cell";
    let warningBadgeHtml = "";
    if (isContraindicated) {
      const warnings = Array.from(remedyContraindications.get(rem.name)!).join(", ");
      warningBadgeHtml = `<span class="contraindicated-badge" title="Polaritäts-Widerspruch: ${warnings}">⚠️</span>`;
    }
    html += `<td class="${remCellClass}">${rem.name}${warningBadgeHtml}</td>`;

    // Symptom cells
    selectedSymptoms.forEach(s => {
      const grade = rem.grades[s.id] || 0;
      let badgeHtml = "";
      if (grade === 3) {
        badgeHtml = `<span class="matrix-badge grade-3" title="${rem.name}: Grad 3 für '${s.text}'"></span>`;
      } else if (grade === 2) {
        badgeHtml = `<span class="matrix-badge grade-2" title="${rem.name}: Grad 2 für '${s.text}'"></span>`;
      } else if (grade === 1) {
        badgeHtml = `<span class="matrix-badge grade-1" title="${rem.name}: Grad 1 für '${s.text}'"></span>`;
      }
      html += `<td class="matrix-cell" data-symptom-id="${s.id}"><div class="matrix-badge-wrapper">${badgeHtml}</div></td>`;
    });

    // Modality cells
    activeModalities.forEach(modRubric => {
      const grade = rem.modalityGrades[modRubric] || 0;
      let badgeHtml = "";
      if (grade === 3) {
        badgeHtml = `<span class="matrix-badge grade-3" title="${rem.name}: Grad 3 für '${modRubric}'"></span>`;
      } else if (grade === 2) {
        badgeHtml = `<span class="matrix-badge grade-2" title="${rem.name}: Grad 2 für '${modRubric}'"></span>`;
      } else if (grade === 1) {
        badgeHtml = `<span class="matrix-badge grade-1" title="${rem.name}: Grad 1 für '${modRubric}'"></span>`;
      }
      const cellClass = grade ? "matrix-cell modality-cell-active" : "matrix-cell";
      html += `<td class="${cellClass}"><div class="matrix-badge-wrapper">${badgeHtml}</div></td>`;
    });

    // Totals cells
    html += `<td class="total-cell">${rem.matchesCount}</td>`;
    html += `<td class="total-cell font-bold">${rem.score}</td>`;
    html += `</tr>`;
  });
  html += `</tbody></table>`;

  container.innerHTML = html;

  // Add interactive column highlights & remedy cell clicks
  const table = container.querySelector(".matrix-table") as HTMLTableElement;
  if (table) {
    const cells = table.querySelectorAll("[data-symptom-id]");
    cells.forEach(cell => {
      const cellEl = cell as HTMLElement;
      const symId = cellEl.dataset.symptomId;
      if (symId) {
        cellEl.addEventListener("mouseenter", () => {
          table.querySelectorAll(`[data-symptom-id="${symId}"]`).forEach(el => {
            el.classList.add("col-highlight");
          });
        });
        cellEl.addEventListener("mouseleave", () => {
          table.querySelectorAll(`[data-symptom-id="${symId}"]`).forEach(el => {
            el.classList.remove("col-highlight");
          });
        });
      }
    });

    // Wire up clicking on remedy cell to open remedy details
    table.querySelectorAll(".remedy-cell").forEach(cell => {
      const cellEl = cell as HTMLElement;
      // Extract text content excluding warning emoji
      const remedyName = (cellEl.childNodes[0]?.textContent || cellEl.textContent || "").trim();
      if (remedyName && onRemedyClick) {
        cellEl.addEventListener("click", () => {
          onRemedyClick(remedyName);
        });
      }
    });
  }
}
