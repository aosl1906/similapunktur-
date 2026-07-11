// State Management
let currentMeridian: string | null = null;
let currentPointId: string | null = null;
let activePoints: any[] = [];
let matchedPointIds: Set<string> = new Set();
let currentSearchQuery = "";
let isEditorActive = false;
let suggestionsList: string[] = [];
let activeSuggestionIndex = -1;
let allPointsData: any[] = [];
let isStaticMode = false;
let synonymsData: Record<string, string[]> = {};

interface SelectedSymptom {
  id: string;
  text: string;
  weight: number;
}
let selectedSymptoms: SelectedSymptom[] = [];
let recommendedPointsSet = new Set<string>();
let activeSidebarTab: 'navigation' | 'search' | 'repertorisation' = 'navigation';
let lastViewedPointId: string | null = null;
let activeModalities = new Set<string>();
const rubricsRemediesMap = new Map<string, Map<string, number>>();

interface PolarMatch {
  key1: string;
  key2: string;
  name1: string;
  name2: string;
}

const POLAR_CATEGORIES: PolarMatch[] = [
  {
    key1: "kälte überhaupt, agg",
    key2: "wärme überhaupt, von",
    name1: "Kälte-Agg.",
    name2: "Wärme-Agg."
  },
  {
    key1: "kälte überhaupt, agg",
    key2: "kälte) eines",
    name1: "Kälte-Agg.",
    name2: "Kälte-Lind."
  },
  {
    key1: "wärme überhaupt, von",
    key2: "äußere wärme",
    name1: "Wärme-Agg.",
    name2: "Wärme-Lind."
  },
  {
    key1: "bewegung , agg",
    key2: "ruhe",
    name1: "Bewegungs-Agg.",
    name2: "Ruhe-Agg."
  },
  {
    key1: "trockenes wetter, agg",
    key2: "feuchtes wetter, agg",
    name1: "Trockene Luft-Agg.",
    name2: "Feuchte Luft-Agg."
  }
];

const remedyContraindications = new Map<string, Set<string>>();

let staticBoerickeData: any = null;
let staticTtbData: any = null;

// Constants
const MERIDIANS = [
  { id: "herz", name: "Herz-Leitbahn" },
  { id: "duenndarm", name: "Dünndarm-Leitbahn" },
  { id: "blase", name: "Blasen-Leitbahn" },
  { id: "niere", name: "Nieren-Leitbahn" },
  { id: "perikard", name: "Perikard-Leitbahn" },
  { id: "dreifacherwaermer", name: "Dreifacherwärmer-Leitbahn" },
  { id: "gallenblase", name: "Gallenblasen-Leitbahn" },
  { id: "leber", name: "Leber-Leitbahn" },
  { id: "lunge", name: "Lungen-Leitbahn" },
  { id: "dickdarm", name: "Dickdarm-Leitbahn" },
  { id: "magen", name: "Magen-Leitbahn" },
  { id: "milz_pankreas", name: "Milz-Pankreas-Leitbahn" },
  { id: "konzeptionsgefaess", name: "Konzeptionsgefäß" },
  { id: "lenkergefaess", name: "Lenkergefäß" },
  { id: "extrapunkte", name: "Extrapunkte" }
];

// DOM Elements
const meridianListEl = document.getElementById("meridian-list") as HTMLUListElement;
const canvasWrapperEl = document.getElementById("canvas-wrapper") as HTMLDivElement;
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
        const editorToggleBtn = document.getElementById("toggle-editor-btn");
        if (editorToggleBtn) {
          editorToggleBtn.style.display = "none";
        }
      }
    }
  } catch (err) {
    console.warn("Failed to load static similapunktur.json, falling back to API.", err);
  }

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

// 2. Select Meridian
async function selectMeridian(name: string, element: HTMLLIElement) {
  // Clear active classes
  meridianListEl.querySelectorAll("li").forEach(li => li.classList.remove("active"));
  element.classList.add("active");
  
  currentMeridian = name;
  
  try {
    if (isStaticMode && allPointsData.length > 0) {
      activePoints = allPointsData
        .filter(p => p.meridian === name)
        .map(p => ({
          id: p.point_id,
          name_de: p.name_german,
          translation: p.name_translation,
          meridian: p.meridian,
          warning: p.precautions_or_contraindications,
          visuals: p.visuals
        }));
    } else {
      const res = await fetch(`/api/points-by-meridian?name=${encodeURIComponent(name)}`);
      const data = await res.json();
      
      if (data.error) {
        console.error(data.error);
        return;
      }
      activePoints = data.points;
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

// 3. Draw Hotspots
function drawHotspots() {
  if (!svgOverlayEl) return;
  svgOverlayEl.innerHTML = "";
  
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
    g.addEventListener("click", () => selectPoint(p.id));
    
    svgOverlayEl.appendChild(g);
  });
}

// 4. Select Point & Load Details
async function selectPoint(pointId: string) {
  currentPointId = pointId;
  lastViewedPointId = pointId;
  
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
    if (isStaticMode && allPointsData.length > 0) {
      const pt = allPointsData.find(p => p.point_id === pointId);
      if (pt) {
        renderPointDetails(pt);
      }
    } else {
      const res = await fetch(`/api/point-details?id=${pointId}`);
      const data = await res.json();
      
      if (data.error) {
        console.error(data.error);
        return;
      }
      
      renderPointDetails(data);
    }
  } catch (err) {
    console.error("Error loading point details:", err);
  }
}

// 5. Render Point Details
function renderPointDetails(data: any) {
  // Show detail panel
  detailPlaceholderEl.style.display = "none";
  detailPanelEl.style.display = "flex";
  
  // Reset remedy view toggle
  const locSection = detailPanelEl.querySelector(".detail-section") as HTMLElement;
  const tabsSection = detailPanelEl.querySelector(".detail-tabs") as HTMLElement;
  if (locSection) locSection.style.display = "block";
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
  remediesBadgesEl.innerHTML = "";
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
  const clean = query.trim().toLowerCase();
  const words = clean.match(/[a-zA-ZäöüÄÖÜßéèàáíóúñ]+/g) || [];
  const syns = new Set<string>();
  words.forEach(w => {
    if (synonymsData[w]) {
      synonymsData[w].forEach(s => syns.add(s));
    }
  });
  return Array.from(syns);
}

// 6. Search Symptoms & Remedies
function classifySymptomStatic(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("kopf") || t.includes("gehirn") || t.includes("nerv") || t.includes("schwindel") || t.includes("migrän") || t.includes("krampf")) return "Kopf & Nervensystem";
  if (t.includes("gemüt") || t.includes("geist") || t.includes("schlaf") || t.includes("traum") || t.includes("angst") || t.includes("traurig") || t.includes("unruh") || t.includes("hyster") || t.includes("reizbar")) return "Gemüt & Psyche";
  if (t.includes("herz") || t.includes("puls") || t.includes("blut") || t.includes("ader") || t.includes("gefäß") || t.includes("angina")) return "Herz & Kreislauf";
  if (t.includes("magen") || t.includes("darm") || t.includes("verdau") || t.includes("appetit") || t.includes("übel") || t.includes("erbr") || t.includes("leber") || t.includes("galle") || t.includes("abdomen") || t.includes("stuhl")) return "Magen & Verdauung";
  if (t.includes("lung") || t.includes("atmung") || t.includes("hust") || t.includes("kehlkopf") || t.includes("nase") || t.includes("hals") || t.includes("heiser") || t.includes("atemnot") || t.includes("schnupf")) return "Atmung & Hals";
  if (t.includes("urin") || t.includes("blas") || t.includes("nier") || t.includes("mens") || t.includes("uter") || t.includes("gebärmutter") || t.includes("schwanger")) return "Urogenitaltrakt";
  if (t.includes("haut") || t.includes("juck") || t.includes("ausschlag") || t.includes("schwitz") || t.includes("schwell") || t.includes("geschwür") || t.includes("ekzem")) return "Haut & Äußeres";
  return "Bewegungsapparat & Allgemeines";
}

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
    
    if (isStaticMode && allPointsData.length > 0) {
      const qLower = currentSearchQuery.toLowerCase();
      const querySyns = getClientSynonyms(qLower);
      const symptomMap = new Map<string, { text: string; is_ttb: boolean; points: any[] }>();
      
      allPointsData.forEach((p) => {
        // Check effects
        p.effects.forEach((eff: string) => {
          const match = eff.toLowerCase().includes(qLower) || querySyns.some(syn => eff.toLowerCase().includes(syn));
          if (match) {
            if (!symptomMap.has(eff)) {
              symptomMap.set(eff, { text: eff, is_ttb: false, points: [] });
            }
            symptomMap.get(eff)!.points.push({ id: p.point_id, name_de: p.name_german, meridian: p.meridian, type: "wirkung" });
          }
        });
        
        // Check indications
        p.indications.forEach((ind: string) => {
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
        const remedyMatch = p.assigned_homeopathics.find((h: string) => h.toLowerCase().replace('.', '').includes(qLower.replace('.', '')));
        if (remedyMatch) {
          remMatches.push({
            id: p.point_id,
            name_de: p.name_german,
            meridian: p.meridian,
            sources: [remedyMatch]
          });
        }
      });
      
      // Check TTB rubrics
      await ensureTtbDataLoaded();
      if (staticTtbData) {
        Object.keys(staticTtbData).forEach(rubricName => {
          if (rubricName.toLowerCase().includes(qLower)) {
            symptomMap.set(`[TTB] ${rubricName}`, { text: `[TTB] ${rubricName}`, is_ttb: true, points: [] });
          }
        });
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
  });
  
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
  const tabSearchBtn = document.getElementById("tab-search-btn");
  const tabRepBtn = document.getElementById("tab-rep-btn");
  
  if (tabNavBtn) {
    tabNavBtn.addEventListener("click", () => setActiveSidebarTab('navigation'));
  }
  if (tabSearchBtn) {
    tabSearchBtn.addEventListener("click", () => setActiveSidebarTab('search'));
  }
  if (tabRepBtn) {
    tabRepBtn.addEventListener("click", () => setActiveSidebarTab('repertorisation'));
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
  const editorBannerEl = document.getElementById("editor-banner") as HTMLDivElement;

  if (editorToggleEl) {
    editorToggleEl.addEventListener("click", () => {
      isEditorActive = !isEditorActive;
      if (isEditorActive) {
        editorToggleEl.classList.add("active");
        if (editorBannerEl) editorBannerEl.style.display = "block";
        svgOverlayEl.classList.add("editor-active-cursor");
        showToastNotification("Editor-Modus aktiviert!");
      } else {
        editorToggleEl.classList.remove("active");
        if (editorBannerEl) editorBannerEl.style.display = "none";
        svgOverlayEl.classList.remove("editor-active-cursor");
        showToastNotification("Editor-Modus deaktiviert.");
      }
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

async function loadSuggestions() {
  if (allPointsData.length > 0) {
    const unique = new Set<string>();
    allPointsData.forEach(p => {
      if (p.effects) {
        p.effects.forEach((e: string) => { if (e && e.length < 120) unique.add(e.trim()); });
      }
      if (p.indications) {
        p.indications.forEach((i: string) => { if (i && i.length < 120) unique.add(i.trim()); });
      }
      if (p.general_analysis_rubrics) {
        p.general_analysis_rubrics.forEach((r: any) => { if (r.rubric_name && r.rubric_name.length < 120) unique.add(r.rubric_name.trim()); });
      }
    });
    
    // Merge TTB Bönninghausen rubrics for static mode autocomplete
    await ensureTtbDataLoaded();
    if (staticTtbData) {
      Object.keys(staticTtbData).forEach(rubricName => {
        if (rubricName && rubricName.length < 120) {
          unique.add(`[TTB] ${rubricName.trim()}`);
        }
      });
    }
    
    suggestionsList = Array.from(unique);
    console.log(`Generated ${suggestionsList.length} unique suggestions from loaded JSON (including TTB).`);
    return;
  }
  
  try {
    const res = await fetch('/api/symptom-suggestions');
    const data = await res.json();
    suggestionsList = data.suggestions || [];
  } catch (err) {
    console.error("Failed to load suggestions:", err);
  }
}

function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,    // deletion
          dp[i][j - 1] + 1,    // insertion
          dp[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }
  return dp[m][n];
}

function scoreSingleSuggestion(suggestion: string, query: string): number {
  const s = suggestion.toLowerCase();
  const q = query.toLowerCase();
  
  if (s === q) return 100;
  if (s.startsWith(q)) return 90;
  
  const idx = s.indexOf(q);
  if (idx !== -1) {
    if (idx > 0 && (s[idx - 1] === ' ' || s[idx - 1] === '-')) {
      return 85;
    }
    return 70;
  }
  
  const words = s.split(/[\s,.-]+/);
  let bestWordScore = 0;
  
  for (const word of words) {
    if (word.length < 3) continue;
    
    if (word.startsWith(q)) {
      bestWordScore = Math.max(bestWordScore, 80);
      continue;
    }
    
    const qLen = q.length;
    if (qLen >= 3) {
      const maxDistance = qLen <= 4 ? 1 : 2;
      let minWordDist = 999;
      
      for (let len = Math.max(3, qLen - 1); len <= Math.min(word.length, qLen + 1); len++) {
        const prefix = word.substring(0, len);
        const dist = levenshteinDistance(q, prefix);
        if (dist < minWordDist) {
          minWordDist = dist;
        }
      }
      
      if (minWordDist <= maxDistance) {
        const score = 60 - minWordDist * 15;
        bestWordScore = Math.max(bestWordScore, score);
      }
    }
  }
  
  return bestWordScore;
}

function scoreSuggestion(suggestion: string, query: string): number {
  const s = suggestion.toLowerCase();
  const q = query.toLowerCase();
  
  const querySyns = getClientSynonyms(q);
  const terms = [q, ...querySyns];
  
  let bestScore = 0;
  for (const term of terms) {
    const score = scoreSingleSuggestion(s, term);
    // Slight penalty to synonym matches so exact term matches rank first
    const finalScore = term === q ? score : score * 0.92;
    if (finalScore > bestScore) {
      bestScore = finalScore;
    }
  }
  
  return bestScore;
}

function showSuggestions(query: string) {
  const dropdown = document.getElementById("search-suggestions");
  if (!dropdown) return;
  
  if (!query || query.trim().length < 2) {
    dropdown.style.display = "none";
    return;
  }
  
  const trimmed = query.trim();
  const scored = suggestionsList
    .map(s => ({ text: s, score: scoreSuggestion(s, trimmed) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
    
  if (scored.length === 0) {
    dropdown.style.display = "none";
    return;
  }
  
  dropdown.innerHTML = "";
  activeSuggestionIndex = -1;
  
  scored.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.dataset.index = idx.toString();
    
    const text = item.text;
    const lowerQuery = trimmed.toLowerCase();
    
    let isTtb = false;
    let displayHtml = "";
    
    if (text.startsWith("[TTB] ")) {
      isTtb = true;
      const cleanText = text.substring(6);
      const lowerClean = cleanText.toLowerCase();
      const matchIdx = lowerClean.indexOf(lowerQuery);
      if (matchIdx !== -1) {
        const before = cleanText.substring(0, matchIdx);
        const match = cleanText.substring(matchIdx, matchIdx + trimmed.length);
        const after = cleanText.substring(matchIdx + trimmed.length);
        displayHtml = `${before}<strong>${match}</strong>${after}`;
      } else {
        displayHtml = cleanText;
      }
    } else {
      const lowerText = text.toLowerCase();
      const matchIdx = lowerText.indexOf(lowerQuery);
      if (matchIdx !== -1) {
        const before = text.substring(0, matchIdx);
        const match = text.substring(matchIdx, matchIdx + trimmed.length);
        const after = text.substring(matchIdx + trimmed.length);
        displayHtml = `${before}<strong>${match}</strong>${after}`;
      } else {
        displayHtml = text;
      }
    }
    
    const textSpan = document.createElement("span");
    textSpan.className = "suggestion-text";
    textSpan.innerHTML = displayHtml;
    textSpan.style.flexGrow = "1";
    textSpan.style.cursor = "pointer";
    textSpan.addEventListener("click", (e) => {
      e.stopPropagation();
      selectSuggestion(text);
    });
    div.appendChild(textSpan);
    
    if (isTtb) {
      const badge = document.createElement("span");
      badge.className = "ttb-badge-indicator";
      badge.textContent = "TTB";
      div.appendChild(badge);
    }
    
    const addBtn = document.createElement("button");
    addBtn.className = "suggestion-add-btn";
    addBtn.textContent = "+";
    addBtn.title = "Symptom hinzufügen";
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      addSymptom(text);
      dropdown.style.display = "none";
      clearSearch();
    });
    div.appendChild(addBtn);
    
    dropdown.appendChild(div);
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
      if (ptAll) {
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
  const modalitiesSection = document.getElementById("modalities-section");
  
  if (!placeholder || !list || !resultsPreview) return;
  
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
    if (modalitiesSection) modalitiesSection.style.display = "none";
    
    // Clear refinement container
    const refinementContainer = document.getElementById("symptom-refinement-container");
    if (refinementContainer) refinementContainer.innerHTML = "";
    
    // Clear modalities on empty basket
    activeModalities.clear();
    document.querySelectorAll(".modality-chip").forEach(chip => chip.classList.remove("active"));
    
    list.innerHTML = "";
    return;
  }
  
  placeholder.style.display = "none";
  list.style.display = "flex";
  resultsPreview.style.display = "block";
  if (modalitiesSection) modalitiesSection.style.display = "block";
  
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
    const cleanText = isTtb ? s.text.replace("[TTB] ", "") : s.text;
    textSpan.innerHTML = isTtb 
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

function doesPointMatchSymptom(p: any, symText: string): boolean {
  const cleanSym = symText.toLowerCase().trim();
  
  // 1. Direct match in effects
  if (p.effects && p.effects.some((e: string) => e.toLowerCase().includes(cleanSym))) return true;
  
  // 2. Direct match in indications
  if (p.indications && p.indications.some((i: string) => i.toLowerCase().includes(cleanSym))) return true;
  
  // 3. Direct match in rubrics
  if (p.general_analysis_rubrics && p.general_analysis_rubrics.some((r: any) => r.rubric_name.toLowerCase().includes(cleanSym))) return true;
  
  // 4. Synonym match
  const cleanQuery = cleanSym.replace('.', '');
  for (const key in synonymsData) {
    const group = synonymsData[key];
    const inGroup = group.some(term => term.toLowerCase().replace('.', '').includes(cleanQuery)) || key.toLowerCase().replace('.', '').includes(cleanQuery);
    if (inGroup) {
      for (const term of [key, ...group]) {
        const cleanTerm = term.toLowerCase();
        if (p.effects && p.effects.some((e: string) => e.toLowerCase().includes(cleanTerm))) return true;
        if (p.indications && p.indications.some((i: string) => i.toLowerCase().includes(cleanTerm))) return true;
        if (p.general_analysis_rubrics && p.general_analysis_rubrics.some((r: any) => r.rubric_name.toLowerCase().includes(cleanTerm))) return true;
      }
    }
  }
  
  return false;
}

function runRepertorisation() {
  if (selectedSymptoms.length === 0) {
    recommendedPointsSet.clear();
    drawHotspots();
    return;
  }
  
  // Calculate point matches
  const pointScores: Array<{ p: any, matchedCount: number, score: number }> = [];
  
  allPointsData.forEach(p => {
    let matchedCount = 0;
    let score = 0;
    
    selectedSymptoms.forEach(s => {
      if (doesPointMatchSymptom(p, s.text)) {
        matchedCount++;
        score += s.weight;
      }
    });
    
    if (matchedCount > 0) {
      pointScores.push({ p, matchedCount, score });
    }
  });
  
  // Sort points: matches desc, score desc
  pointScores.sort((a, b) => {
    if (b.matchedCount !== a.matchedCount) return b.matchedCount - a.matchedCount;
    return b.score - a.score;
  });
  
  recommendedPointsSet = new Set(pointScores.map(item => item.p.point_id));
  drawHotspots(); // Re-draw hotspots to trigger recommended pulsing
  
  // Render recommended points list
  const pointsList = document.getElementById("rec-points-list");
  if (pointsList) {
    pointsList.innerHTML = "";
    const topPoints = pointScores.slice(0, 5);
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
    if (pointScores.length === 0) {
      pointsList.innerHTML = "<li class='dimmed' style='padding: 8px;'>Keine passenden Punkte gefunden.</li>";
    }
  }
  
  // Calculate remedy matches
  const remedyScoresMap = new Map<string, { matches: Set<string>, score: number }>();
  
  selectedSymptoms.forEach(s => {
    const isTtb = s.text.startsWith("[TTB] ");
    const cleanSym = isTtb ? s.text.substring(6).toLowerCase().trim() : s.text.toLowerCase().trim();
    
    if (isTtb) {
      if (staticTtbData) {
        const rubricKeys = Object.keys(staticTtbData);
        const matchKey = rubricKeys.find(k => k.toLowerCase().trim() === cleanSym);
        if (matchKey) {
          const remedies = staticTtbData[matchKey];
          remedies.forEach((rem: { name: string, grade: number }) => {
            const cleanRemName = rem.name.replace(/\.$/, "");
            if (!remedyScoresMap.has(cleanRemName)) {
              remedyScoresMap.set(cleanRemName, { matches: new Set(), score: 0 });
            }
            const entry = remedyScoresMap.get(cleanRemName)!;
            if (!entry.matches.has(s.id)) {
              entry.matches.add(s.id);
              entry.score += rem.grade * s.weight;
            }
          });
        }
      }
    } else {
      allPointsData.forEach(p => {
        if (p.general_analysis_rubrics) {
          p.general_analysis_rubrics.forEach((rub: any) => {
            if (rub.rubric_name.toLowerCase().includes(cleanSym)) {
              rub.remedies.forEach((rem: { name: string, grade: number }) => {
                if (!remedyScoresMap.has(rem.name)) {
                  remedyScoresMap.set(rem.name, { matches: new Set(), score: 0 });
                }
                const entry = remedyScoresMap.get(rem.name)!;
                if (!entry.matches.has(s.id)) {
                  entry.matches.add(s.id);
                  entry.score += rem.grade * s.weight;
                }
              });
            }
          });
        }
        
        const directMatch = (p.effects && p.effects.some((e: string) => e.toLowerCase().includes(cleanSym))) ||
                            (p.indications && p.indications.some((i: string) => i.toLowerCase().includes(cleanSym)));
        if (directMatch && p.assigned_homeopathics) {
          p.assigned_homeopathics.forEach((remName: string) => {
            if (!remedyScoresMap.has(remName)) {
              remedyScoresMap.set(remName, { matches: new Set(), score: 0 });
            }
            const entry = remedyScoresMap.get(remName)!;
            if (!entry.matches.has(s.id)) {
              entry.matches.add(s.id);
              entry.score += 3 * s.weight;
            }
          });
        }
      });
    }
  });
  
  // Apply homeopathic modality boosts
  remedyScoresMap.forEach((entry, remName) => {
    activeModalities.forEach(modRubric => {
      const remMap = rubricsRemediesMap.get(modRubric);
      if (remMap) {
        const grade = remMap.get(remName);
        if (grade) {
          // Boost score by grade * 2
          entry.score += grade * 2;
        }
      }
    });
  });
  
  const remedyScores: Array<{ name: string, matchesCount: number, score: number }> = [];
  remedyScoresMap.forEach((val, name) => {
    remedyScores.push({
      name,
      matchesCount: val.matches.size,
      score: val.score
    });
  });
  
  remedyScores.sort((a, b) => {
    if (b.matchesCount !== a.matchesCount) return b.matchesCount - a.matchesCount;
    return b.score - a.score;
  });
  
  // Calculate polarity contraindications
  const activeRemediesList = remedyScores.map(r => r.name);
  updatePolarityContraindications(activeRemediesList);
  
  // Render recommended remedies list
  const remediesList = document.getElementById("rec-remedies-list");
  if (remediesList) {
    remediesList.innerHTML = "";
    const topRemedies = remedyScores.slice(0, 15);
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
    if (remedyScores.length === 0) {
      remediesList.innerHTML = "<li class='dimmed' style='padding: 8px 0;'>Keine passenden Heilmittel gefunden.</li>";
    }
  }
}

function renderMatrixTable() {
  const container = document.getElementById("matrix-table-container");
  if (!container) return;
  
  if (selectedSymptoms.length === 0) {
    container.innerHTML = "<p class='dimmed' style='padding: 24px;'>Keine Symptome im Fall vorhanden.</p>";
    return;
  }
  
  const remedyScoresMap = new Map<string, { matches: Set<string>, score: number, grades: Record<string, number> }>();
  
  selectedSymptoms.forEach(s => {
    const isTtb = s.text.startsWith("[TTB] ");
    const cleanSym = isTtb ? s.text.substring(6).toLowerCase().trim() : s.text.toLowerCase().trim();
    
    if (isTtb) {
      if (staticTtbData) {
        const rubricKeys = Object.keys(staticTtbData);
        const matchKey = rubricKeys.find(k => k.toLowerCase().trim() === cleanSym);
        if (matchKey) {
          const remedies = staticTtbData[matchKey];
          remedies.forEach((rem: { name: string, grade: number }) => {
            const cleanRemName = rem.name.replace(/\.$/, "");
            if (!remedyScoresMap.has(cleanRemName)) {
              remedyScoresMap.set(cleanRemName, { matches: new Set(), score: 0, grades: {} });
            }
            const entry = remedyScoresMap.get(cleanRemName)!;
            if (!entry.matches.has(s.id)) {
              entry.matches.add(s.id);
              entry.score += rem.grade * s.weight;
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
              rub.remedies.forEach((rem: { name: string, grade: number }) => {
                if (!remedyScoresMap.has(rem.name)) {
                  remedyScoresMap.set(rem.name, { matches: new Set(), score: 0, grades: {} });
                }
                const entry = remedyScoresMap.get(rem.name)!;
                if (!entry.matches.has(s.id)) {
                  entry.matches.add(s.id);
                  entry.score += rem.grade * s.weight;
                }
                entry.grades[s.id] = Math.max(entry.grades[s.id] || 0, rem.grade);
              });
            }
          });
        }
        
        const directMatch = (p.effects && p.effects.some((e: string) => e.toLowerCase().includes(cleanSym))) ||
                            (p.indications && p.indications.some((i: string) => i.toLowerCase().includes(cleanSym)));
        if (directMatch && p.assigned_homeopathics) {
          p.assigned_homeopathics.forEach((remName: string) => {
            if (!remedyScoresMap.has(remName)) {
              remedyScoresMap.set(remName, { matches: new Set(), score: 0, grades: {} });
            }
            const entry = remedyScoresMap.get(remName)!;
            if (!entry.matches.has(s.id)) {
              entry.matches.add(s.id);
              entry.score += 3 * s.weight;
            }
            entry.grades[s.id] = Math.max(entry.grades[s.id] || 0, 3);
          });
        }
      });
    }
  });
  
  const sortedRemedies: Array<{ name: string, matchesCount: number, score: number, grades: Record<string, number>, modalityGrades: Record<string, number> }> = [];
  remedyScoresMap.forEach((val, name) => {
    // Modality boost calculation
    let modalityScore = 0;
    const modalityGrades: Record<string, number> = {};
    
    activeModalities.forEach(modRubric => {
      const remMap = rubricsRemediesMap.get(modRubric);
      if (remMap) {
        const grade = remMap.get(name);
        if (grade) {
          modalityScore += grade * 2;
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
  html += `<thead>`;
  html += `<tr>`;
  html += `<th class="remedy-col-header">Heilmittel</th>`;
  
  // Symptom columns
  selectedSymptoms.forEach(s => {
    const isTtb = s.text.startsWith("[TTB] ");
    const cleanText = isTtb ? s.text.substring(6) : s.text;
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
  html += `</tr>`;
  html += `</thead>`;
  
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
  html += `</tbody>`;
  html += `</table>`;
  
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
      const remedyName = cellEl.textContent;
      if (remedyName) {
        cellEl.addEventListener("click", () => {
          const matrixModal = document.getElementById("matrix-modal");
          if (matrixModal) matrixModal.style.display = "none";
          showRemedyDetails(remedyName);
        });
      }
    });
  }
}

function setActiveSidebarTab(tabName: 'navigation' | 'search' | 'repertorisation') {
  activeSidebarTab = tabName;
  
  const tabNavBtn = document.getElementById("tab-nav-btn");
  const tabSearchBtn = document.getElementById("tab-search-btn");
  const tabRepBtn = document.getElementById("tab-rep-btn");
  
  const contentNav = document.getElementById("tab-content-navigation");
  const contentSearch = document.getElementById("tab-content-search");
  const contentRep = document.getElementById("tab-content-repertorisation");
  
  if (tabNavBtn) tabNavBtn.classList.toggle("active", tabName === 'navigation');
  if (tabSearchBtn) tabSearchBtn.classList.toggle("active", tabName === 'search');
  if (tabRepBtn) tabRepBtn.classList.toggle("active", tabName === 'repertorisation');
  
  if (contentNav) contentNav.classList.toggle("active", tabName === 'navigation');
  if (contentSearch) contentSearch.classList.toggle("active", tabName === 'search');
  if (contentRep) contentRep.classList.toggle("active", tabName === 'repertorisation');
}

function getRemedyDetailsClientSide(remedyName: string) {
  const cleanName = remedyName.toLowerCase().replace(/\.$/, "").trim();
  const rubrics: any[] = [];
  const direct_points: any[] = [];
  
  allPointsData.forEach(p => {
    // Check general_analysis_rubrics
    if (p.general_analysis_rubrics) {
      p.general_analysis_rubrics.forEach((rub: any) => {
        if (rub.remedies) {
          rub.remedies.forEach((rem: any) => {
            const cleanRem = rem.name.toLowerCase().replace(/\.$/, "").trim();
            if (cleanRem === cleanName) {
              rubrics.push({
                point_id: p.point_id,
                point_name: p.name_german,
                rubric_name: rub.rubric_name,
                grade: rem.grade
              });
            }
          });
        }
      });
    }
    
    // Check assigned_homeopathics (direct mapping)
    if (p.assigned_homeopathics) {
      p.assigned_homeopathics.forEach((rem: string) => {
        const cleanRem = rem.toLowerCase().replace(/\.$/, "").trim();
        if (cleanRem === cleanName) {
          direct_points.push({
            point_id: p.point_id,
            point_name: p.name_german
          });
        }
      });
    }
  });
  
  // Sort rubrics by grade descending
  rubrics.sort((a, b) => b.grade - a.grade);
  
  return { remedy: remedyName, rubrics, direct_points };
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

function findTtbGrade(remedyName: string, keyword: string): number {
  if (!staticTtbData) return 0;
  const cleanRem = remedyName.toLowerCase().replace(/\.$/, "").trim();
  
  for (const rubricName of Object.keys(staticTtbData)) {
    if (rubricName.toLowerCase().includes(keyword.toLowerCase())) {
      const remedies = staticTtbData[rubricName];
      const found = remedies.find((r: any) => r.name.toLowerCase().replace(/\.$/, "").trim() === cleanRem);
      if (found) return found.grade;
    }
  }
  return 0;
}

function updatePolarityContraindications(activeRemedies: string[]) {
  remedyContraindications.clear();
  if (!staticTtbData) return;
  
  const ttbSymptoms = selectedSymptoms.filter(s => s.text.startsWith("[TTB] "));
  if (ttbSymptoms.length === 0) return;
  
  activeRemedies.forEach(remName => {
    const cleanRem = remName.toLowerCase().replace(/\.$/, "").trim();
    ttbSymptoms.forEach(s => {
      const cleanSym = s.text.substring(6).toLowerCase().trim();
      
      POLAR_CATEGORIES.forEach(pair => {
        let isMatch = false;
        let oppositeKeyword = "";
        let selectedCategoryName = "";
        let oppositeCategoryName = "";
        
        if (cleanSym.includes(pair.key1.toLowerCase())) {
          isMatch = true;
          oppositeKeyword = pair.key2;
          selectedCategoryName = pair.name1;
          oppositeCategoryName = pair.name2;
        } else if (cleanSym.includes(pair.key2.toLowerCase())) {
          isMatch = true;
          oppositeKeyword = pair.key1;
          selectedCategoryName = pair.name2;
          oppositeCategoryName = pair.name1;
        }
        
        if (isMatch) {
          let selectedGrade = 0;
          const rubricKeys = Object.keys(staticTtbData);
          const matchKey = rubricKeys.find(k => k.toLowerCase().trim() === cleanSym);
          if (matchKey) {
            const remedies = staticTtbData[matchKey];
            const found = remedies.find((r: any) => r.name.toLowerCase().replace(/\.$/, "").trim() === cleanRem);
            if (found) selectedGrade = found.grade;
          }
          
          let oppositeGrade = 0;
          for (const key of rubricKeys) {
            if (key.toLowerCase().includes(oppositeKeyword.toLowerCase())) {
              const remedies = staticTtbData[key];
              const found = remedies.find((r: any) => r.name.toLowerCase().replace(/\.$/, "").trim() === cleanRem);
              if (found) {
                if (found.grade > oppositeGrade) {
                  oppositeGrade = found.grade;
                }
              }
            }
          }
          
          if (oppositeGrade > selectedGrade) {
            if (!remedyContraindications.has(remName)) {
              remedyContraindications.set(remName, new Set());
            }
            remedyContraindications.get(remName)!.add(
              `${oppositeCategoryName} (Grad ${oppositeGrade}) vs. ${selectedCategoryName} (Grad ${selectedGrade})`
            );
          }
        }
      });
    });
  });
}

function renderDevReviewTables() {
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
      
      tr.innerHTML = `
        <td style="padding: 10px 14px; font-weight: 700; color: var(--color-primary-teal);">${getPointSynonym(p.point_id)}</td>
        <td style="padding: 10px 14px;">${p.meridian}</td>
        <td style="padding: 10px 14px; font-weight: 700;">${p.name_german}</td>
        <td style="padding: 10px 14px; font-style: italic;">${p.name_chinese}</td>
        <td style="padding: 10px 14px; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${cleanEffects}">${cleanEffects}</td>
        <td style="padding: 10px 14px; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${cleanIndications}">${cleanIndications}</td>
        <td style="padding: 10px 14px;">${rubricsCount} Rubriken / ${remediesCount} Heilmittel</td>
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

function filterDevReviewTable() {
  const query = (document.getElementById("dev-review-search") as HTMLInputElement).value.toLowerCase().trim();
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
  pointTranslationEl.textContent = "Similapunktur Resonanzanalyse";
  
  // Hide point-specific sections
  const locSection = detailPanelEl.querySelector(".detail-section") as HTMLElement;
  const tabsSection = detailPanelEl.querySelector(".detail-tabs") as HTMLElement;
  if (locSection) locSection.style.display = "none";
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
      data = await res.json();
    }
  } catch (err) {
    console.warn("Failed to load remedy details from API, falling back client-side.", err);
    data = getRemedyDetailsClientSide(remedyName);
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
  
  // Render details
  let html = "";
  
  // Back button
  if (lastViewedPointId) {
    const synonym = getPointSynonym(lastViewedPointId);
    html += `<button id="remedy-back-btn" class="back-btn">← Zurück zu ${synonym}</button>`;
  } else {
    html += `<button id="remedy-back-btn" class="back-btn">← Zurück</button>`;
  }
  
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
  
  html += `<div class="detail-section" style="margin-top: 0;">`;
  html += `<h3>Indizierte Akupunkturpunkte (${data.rubrics.length})</h3>`;
  html += `<p class="dimmed" style="font-size: 12px; margin-bottom: 12px; font-style: italic;">Punkte, deren Symptom-Rubriken dieses Mittel abdecken:</p>`;
  
  if (data.rubrics.length > 0) {
    data.rubrics.forEach((r: any) => {
      const syn = getPointSynonym(r.point_id);
      html += `
        <div class="remedy-point-item clickable" data-point-id="${r.point_id}" title="Klicken, um zu Punkt ${syn} zu springen">
          <div class="point-badge">${syn}</div>
          <div class="point-info">
            <div class="point-name">${r.point_name}</div>
            <div class="rubric-name">${r.rubric_name}</div>
          </div>
          <span class="grade-badge grade-${r.grade}">Grad ${r.grade}</span>
        </div>
      `;
    });
  } else {
    html += `<p class="dimmed" style="padding: 8px 0;">Keine symptomatischen Punktverbindungen gefunden.</p>`;
  }
  html += `</div>`;
  
  html += `<div class="detail-section" style="margin-top: 20px;">`;
  html += `<h3>Direkt zugeordnete Punkte (${data.direct_points.length})</h3>`;
  html += `<p class="dimmed" style="font-size: 12px; margin-bottom: 12px; font-style: italic;">Punkte, bei denen dieses Mittel als Haupt-Homöopathikum eingetragen ist:</p>`;
  
  if (data.direct_points.length > 0) {
    data.direct_points.forEach((dp: any) => {
      const syn = getPointSynonym(dp.point_id);
      html += `
        <div class="remedy-point-item clickable" data-point-id="${dp.point_id}" title="Klicken, um zu Punkt ${syn} zu springen">
          <div class="point-badge">${syn}</div>
          <div class="point-info">
            <div class="point-name">${dp.point_name}</div>
          </div>
          <span class="grade-badge grade-3">Direkt</span>
        </div>
      `;
    });
  } else {
    html += `<p class="dimmed" style="padding: 8px 0;">Keine direkten Punktzuordnungen gefunden.</p>`;
  }
  html += `</div>`;
  
  remedyView.innerHTML = html;
  
  // Attach Event Listeners
  const backBtn = document.getElementById("remedy-back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      // Restore point details view
      remedyView!.style.display = "none";
      if (locSection) locSection.style.display = "block";
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
        if (locSection) locSection.style.display = "block";
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
