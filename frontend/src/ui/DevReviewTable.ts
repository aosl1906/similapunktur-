// Developer Review Tables Component (Points, Remedies, Boericke, TTB inspector)
import { PointData } from '../core/types';

export interface DevReviewOptions {
  allPointsData: PointData[];
  staticBoerickeData?: any;
  staticTtbData?: any;
  getPointSynonym: (pointId: string) => string;
}

export function renderDevReviewTables({
  allPointsData,
  staticBoerickeData,
  staticTtbData,
  getPointSynonym
}: DevReviewOptions): void {
  const pointsBody = document.getElementById("dev-points-tbody");
  if (pointsBody) {
    pointsBody.innerHTML = "";
    allPointsData.forEach(p => {
      const tr = document.createElement("tr");
      tr.style.borderBottom = "1px solid var(--color-border)";

      const cleanEffects = p.effects ? p.effects.join(", ") : "";
      const cleanIndications = p.indications ? p.indications.join(", ") : "";

      const rubricsCount = p.general_analysis_rubrics ? p.general_analysis_rubrics.length : 0;
      const remediesCount = p.assigned_homeopathics ? p.assigned_homeopathics.length : 0;

      let rubricsHtml = "";
      if (p.general_analysis_rubrics && p.general_analysis_rubrics.length > 0) {
        rubricsHtml = p.general_analysis_rubrics.map((rub: any) => {
          const remStr = rub.remedies ? rub.remedies.map((r: any) => `${r.name} (Grad ${r.grade})`).join(", ") : "Keine Heilmittel";
          return `
            <div style="margin-bottom: 6px; padding-left: 8px; border-left: 2px solid rgba(39, 133, 117, 0.3);">
              <span style="color: var(--color-secondary-teal); font-weight: 700;">${rub.rubric_name}:</span>
              <span style="color: var(--color-text-dark);">${remStr}</span>
            </div>
          `;
        }).join("");
      } else {
        rubricsHtml = `<div style="font-style: italic; color: var(--color-text-muted);">Keine Allgemein-Analyse-Rubriken</div>`;
      }

      const directRemediesStr = p.assigned_homeopathics && p.assigned_homeopathics.length > 0
        ? p.assigned_homeopathics.join(", ")
        : "<i>Keine direkten Heilmittel zugeordnet</i>";

      tr.innerHTML = `
        <td style="padding: 10px 14px; font-weight: 700; color: var(--color-primary-teal);">${getPointSynonym(p.point_id)}</td>
        <td style="padding: 10px 14px;">${p.meridian}</td>
        <td style="padding: 10px 14px; font-weight: 700;">${p.name_german}</td>
        <td style="padding: 10px 14px; font-style: italic;">${p.name_chinese || ""}</td>
        <td style="padding: 10px 14px; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${cleanEffects}">${cleanEffects}</td>
        <td style="padding: 10px 14px; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${cleanIndications}">${cleanIndications}</td>
        <td style="padding: 10px 14px;">
          <details class="dev-rubrics-details" style="outline: none;">
            <summary style="cursor: pointer; color: var(--color-primary-teal); font-weight: 700; font-size: 13px; user-select: none; display: flex; align-items: center; gap: 4px;">
              <span>📊 ${rubricsCount} Rubriken / ${remediesCount} Direkt-Mittel</span>
            </summary>
            <div class="dev-rubrics-content" style="margin-top: 8px; font-size: 12px; line-height: 1.5; padding: 10px; background-color: var(--color-bg-light-gray); border-radius: 6px; border-left: 3px solid var(--color-primary-teal); max-width: 450px; white-space: normal;">
              <div style="margin-bottom: 8px;">
                <strong style="color: var(--color-deep-navy); display: block; font-size: 11px; text-transform: uppercase; margin-bottom: 2px;">Direkte Zuordnung (Phase 1):</strong>
                <span style="color: var(--color-text-dark);">${directRemediesStr}</span>
              </div>
              <div>
                <strong style="color: var(--color-deep-navy); display: block; font-size: 11px; text-transform: uppercase; margin-bottom: 4px;">Rubriken-Hierarchie (Phase 4):</strong>
                ${rubricsHtml}
              </div>
            </div>
          </details>
        </td>
      `;
      pointsBody.appendChild(tr);
    });
  }

  const remediesBody = document.getElementById("dev-remedies-tbody");
  if (remediesBody) {
    remediesBody.innerHTML = "";
    const uniqueRemedies = new Set<string>();
    allPointsData.forEach(p => {
      if (p.assigned_homeopathics) p.assigned_homeopathics.forEach((rem: string) => uniqueRemedies.add(rem.trim()));
      if (p.general_analysis_rubrics) {
        p.general_analysis_rubrics.forEach((rub: any) => {
          if (rub.remedies) rub.remedies.forEach((rem: any) => uniqueRemedies.add(rem.name.replace(/\.$/, "").trim()));
        });
      }
    });

    const sortedRemedies = Array.from(uniqueRemedies).sort();
    sortedRemedies.forEach(remName => {
      const tr = document.createElement("tr");
      tr.style.borderBottom = "1px solid var(--color-border)";

      let botanical = "";
      let hasDescription = "❌ Kein Text vorhanden";

      if (staticBoerickeData && staticBoerickeData[remName]) {
        const profile = staticBoerickeData[remName];
        botanical = profile.full_name || "";
        hasDescription = profile.overview ? `✔️ Text vorhanden (${profile.overview.substring(0, 80)}...)` : "❌ Kein Text";
      } else {
        hasDescription = "❌ Text noch nicht geladen (oder fehlt)";
      }

      tr.innerHTML = `
        <td style="padding: 10px 14px; font-weight: 700; color: var(--color-secondary-teal);">${remName}</td>
        <td style="padding: 10px 14px; font-style: italic;">${botanical}</td>
        <td style="padding: 10px 14px; color: var(--color-text-muted);">${hasDescription}</td>
      `;
      remediesBody.appendChild(tr);
    });
  }

  const ttbBody = document.getElementById("dev-ttb-tbody");
  if (ttbBody) {
    ttbBody.innerHTML = "";
    if (staticTtbData) {
      Object.keys(staticTtbData).sort().forEach(rubricName => {
        const tr = document.createElement("tr");
        tr.style.borderBottom = "1px solid var(--color-border)";

        const remedies = staticTtbData[rubricName];
        const count = remedies.length;
        const remediesListStr = remedies.map((r: any) => `${r.name} (Grad ${r.grade}${r.guernsey ? '*' : ''})`).join(", ");

        tr.innerHTML = `
          <td style="padding: 10px 14px; font-weight: 700; color: var(--color-text-dark);">${rubricName}</td>
          <td style="padding: 10px 14px; font-weight: 700; color: var(--color-primary-teal);">${count} Heilmittel</td>
          <td style="padding: 10px 14px; max-width: 600px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--color-text-muted);" title="${remediesListStr}">${remediesListStr}</td>
        `;
        ttbBody.appendChild(tr);
      });
    } else {
      ttbBody.innerHTML = `<tr><td colspan="3" style="padding: 20px; text-align: center; color: var(--color-text-muted);">Bönninghausen Repertorium nicht geladen.</td></tr>`;
    }
  }
}

export function filterDevReviewTable(): void {
  const inputEl = document.getElementById("dev-review-search") as HTMLInputElement | null;
  if (!inputEl) return;
  const query = inputEl.value.toLowerCase().trim();
  const activeTabBtn = document.querySelector(".dev-tab-btn.active");
  if (!activeTabBtn) return;

  const tabTarget = activeTabBtn.getAttribute("data-dev-tab");
  let tbody: HTMLElement | null = null;

  if (tabTarget === "points-review") {
    tbody = document.getElementById("dev-points-tbody");
  } else if (tabTarget === "remedies-review") {
    tbody = document.getElementById("dev-remedies-tbody");
  } else if (tabTarget === "ttb-review") {
    tbody = document.getElementById("dev-ttb-tbody");
  }

  if (!tbody) return;

  const rows = tbody.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    let match = false;
    const cells = row.getElementsByTagName("td");
    for (let j = 0; j < cells.length; j++) {
      const cellText = cells[j].textContent || cells[j].innerText;
      if (cellText.toLowerCase().includes(query)) {
        match = true;
        break;
      }
    }
    row.style.display = match ? "" : "none";
  }
}
