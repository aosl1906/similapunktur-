# Similapunktur — Projektstatus

> **Zweck:** Schneller Einstieg nach einer Pause. Nur diese Datei lesen!  
> **Aktualisiert:** 2026-11-18 | Branch: `main`

---

## 🧭 Systemübersicht & Wissensanker
- Vollständige Architektur- und Datenübersicht: [Similapunktur_System_Overview.md](file:///C:/Users/aosl1/.gemini/antigravity/brain/f6248f21-ab94-4444-afcc-4f1debe17019/Similapunktur_System_Overview.md)

---

## ✅ Abgeschlossen
- **Temporäres HITL-Kurationswerkzeug (`CurationWorkbench`) erstellt ([build_curation_audit.py](file:///d:/Antigravity/Similapunktur/build_curation_audit.py), [CurationWorkbench.ts](file:///d:/Antigravity/Similapunktur/frontend/src/ui/CurationWorkbench.ts), [vite.config.ts](file:///d:/Antigravity/Similapunktur/frontend/vite.config.ts), [index.html](file:///d:/Antigravity/Similapunktur/frontend/index.html), [main.ts](file:///d:/Antigravity/Similapunktur/frontend/src/main.ts), [style.css](file:///d:/Antigravity/Similapunktur/frontend/src/style.css)):**
  - `build_curation_audit.py` vergleicht [Maier-Similapunkte.txt](file:///d:/Antigravity/Similapunktur/Maier-Similapunkte.txt) mit [similapunktur.json](file:///d:/Antigravity/Similapunktur/frontend/public/similapunktur.json) (`145` Punkte / `145` Rohtextblöcke: `60` OK, `45` Warnungen, `40` Fehler) und scannt [boericke_repertory.json](file:///d:/Antigravity/Similapunktur/frontend/public/boericke_repertory.json) (`242 / 7.141` Rubriken mit Parsing-Hinweisen) nach [curation_audit.json](file:///d:/Antigravity/Similapunktur/frontend/public/curation_audit.json).
  - Eigenständiges, über den Header-Button **„🛡️ Quellen-Prüfung (HITL)“** aufrufbares Split-Screen-Tool (später rückstandsfrei entfernbar): Prüft Similapunkte (Rohtext vs. editierbares JSON) sowie Boericke-Rubriken & manuelle Punkt-Kuration (`source: "manual"`), speichert lokal (`localStorage`), schreibt im Vite-Dev-Server über `POST /api/curation/save` direkt in `curation_overrides.json` / `similapunktur.json` / `boericke_repertory.json` und bietet einen JSON-Export.
- **Boericke-Punktzuordnung auf Option A umgestellt (`indications` + `effects` mit Negationsschutz) ([map_boericke_points.py](file:///d:/Antigravity/Similapunktur/map_boericke_points.py), [types.ts](file:///d:/Antigravity/Similapunktur/frontend/src/core/types.ts), [repertory.ts](file:///d:/Antigravity/Similapunktur/frontend/src/core/repertory.ts), [BoerickeBookView.ts](file:///d:/Antigravity/Similapunktur/frontend/src/ui/BoerickeBookView.ts), [main.ts](file:///d:/Antigravity/Similapunktur/frontend/src/main.ts), [style.css](file:///d:/Antigravity/Similapunktur/frontend/src/style.css)):**
  - `assigned_homeopathics` (Mittel-Schnittmenge) entfernt; [map_boericke_points.py](file:///d:/Antigravity/Similapunktur/map_boericke_points.py) mappt ausschließlich über `indications` und `effects` aus [similapunktur.json](file:///d:/Antigravity/Similapunktur/frontend/public/similapunktur.json) + [synonyms.json](file:///d:/Antigravity/Similapunktur/frontend/public/synonyms.json) (`2.127 / 7.141` Rubriken = `29,8 %`, Top 6 Punkte pro Rubrik).
  - Polaritäts-/Negationsschutz verhindert Fehlzuordnungen (z. B. `Durst` vs. `Durstlosigkeit`), Wortgrenzen-Prüfung (`contains_whole_phrase`) und erweiterte Adjektiv-Stoppwörter vermeiden unspezifische Teilwort-Treffer.
  - `BoerickeBookView` zeigt den konkreten Treffergrund (`reason`, z. B. `Indikation: Herzklopfen`) im Tooltip und springt per Klick über `highlightRemedyPointsIn3D` + `selectPoint` ins 3D-Skelett.
  - `calculateRepertorisation` berechnet `pointScores` und `recommendedPointIds` weiterhin direkt aus den gemappten Punkten gewählter `[Boericke] `-Rubriken (18/18 Vitest-Tests & `tsc && vite build` grün).
- **Mittel-zu-Punkt-Zuordnung rechts & im 3D-Skelett ([main.ts](file:///d:/Antigravity/Similapunktur/frontend/src/main.ts)):**
  - Bug in `showRemedyDetails` behoben (`string[]` vs. `{ point_id, point_name }` bei `direct_points` aus `getRemedyDetailsClientSide`).
  - Zugeordnete Leitbahn-Punkte erscheinen beim Klick auf ein Mittel ganz oben im rechten Panel (`Zugeordnete Leitbahn-Punkte (X)`) inkl. Button **„🦴 Im 3D-Skelett zeigen“**, der alle zugehörigen Meridiane einblendet, die Punkte im 3D-Skelett markiert und in die Skelett-Ansicht wechselt.
  - Bei reinen Boericke-Repertorisationen werden die direkten Leitbahn-Punkte des Top-1-Mittels automatisch in `recommendedPointsSet` für das 3D-Skelett vorgemerkt.
- **Einflussfaktoren & Modalitäten links entfernt ([index.html](file:///d:/Antigravity/Similapunktur/frontend/index.html), [main.ts](file:///d:/Antigravity/Similapunktur/frontend/src/main.ts)):** `#modalities-section` aus der linken Fall-Analyse-Sidebar entfernt, da die zugrundeliegende Datenquelle noch nicht nutzbar eingepflegt ist.
- **Interaktive Boericke-Buchansicht im Center-Panel ([BoerickeBookView.ts](file:///d:/Antigravity/Similapunktur/frontend/src/ui/BoerickeBookView.ts), [index.html](file:///d:/Antigravity/Similapunktur/frontend/index.html), [main.ts](file:///d:/Antigravity/Similapunktur/frontend/src/main.ts), [style.css](file:///d:/Antigravity/Similapunktur/frontend/src/style.css)):**
  - Neuer Ansichtsmodus **`📖 Boericke Buch`** (`mode-book`) als Standardansicht im Center-Panel; 3D-Skelett/Atlas bleibt über den Umschalter jederzeit erreichbar.
  - Linkes Kapitel-Register mit allen 35 Boericke-Kapiteln in Originalreihenfolge inkl. Rubrik-Zähler; rechts hierarchischer Repertoriums-Buchsatz mit Grad-1 (normal) / Grad-2 (*kursiv*), Live-Kapitelfilter und direkter `+`-Übernahme in die Fallanalyse.
- **Gruppiertes, aufklappbares Dropdown & Mehrwort-Levenshtein-Suche ([search.ts](file:///d:/Antigravity/Similapunktur/frontend/src/core/search.ts), [main.ts](file:///d:/Antigravity/Similapunktur/frontend/src/main.ts), [style.css](file:///d:/Antigravity/Similapunktur/frontend/src/style.css)):**
  - Mehrwort-UND-Suche (`scoreSuggestion`) mit wortweiser Synonym-Expansion & Levenshtein-Tippfehler-Toleranz.
  - Boericke-Treffer werden im Dropdown nach übergeordneten Rubriken (`Kapitel > Oberrubrik`) gruppiert und lassen sich per Klick aufklappen (`▸`/`▾`) sowie direkt per `+` in die Fall-Analyse übernehmen.
  - Enter-Suche (`handleSearch`) läuft bei aktiven Boericke-/TTB-Quellen auch auf `localhost` direkt gegen die aktiven JSON-Datenbanken.
- **Exklusive Boericke-Suche & Quellen-Umschalter ([index.html](file:///d:/Antigravity/Similapunktur/frontend/index.html), [main.ts](file:///d:/Antigravity/Similapunktur/frontend/src/main.ts), [repertory.ts](file:///d:/Antigravity/Similapunktur/frontend/src/core/repertory.ts), [MatrixTable.ts](file:///d:/Antigravity/Similapunktur/frontend/src/ui/MatrixTable.ts)):**
  - Suchquellen-Filterleiste (`#search-sources-bar`) unterhalb der Suchleiste integriert: `Boericke Rep.` (standardmäßig exklusiv aktiv), `TTB` und `Similapunkte` einzeln ein-/ausschaltbar.
  - `[Boericke] `-Rubriken aus [boericke_repertory.json](file:///d:/Antigravity/Similapunktur/frontend/public/boericke_repertory.json) vollständig in Autocomplete, Fall-Analyse-Warenkorb, `calculateRepertorisation` und `MatrixTable` eingebunden; Unit-Test in [repertory.test.ts](file:///d:/Antigravity/Similapunktur/frontend/src/core/__tests__/repertory.test.ts) ergänzt.
- **Extraktion `Essential Boericke Repertorium.rtf` ([extract_boericke_repertory.py](file:///d:/Antigravity/Similapunktur/extract_boericke_repertory.py)):**
  - Neues RTF-Extraktionsskript erstellt, das ausschließlich `Essential Boericke Repertorium.rtf` parst (35 Kapitel, 7.141 Rubriken mit Mitteln, 60.663 Rubrik-Mittel-Zuordnungen, 368 eindeutige Mittel, Grad 1 normal / Grad 2 kursiv).
  - Exportiert nach [out/boericke_repertory.json](file:///d:/Antigravity/Similapunktur/out/boericke_repertory.json), [frontend/public/boericke_repertory.json](file:///d:/Antigravity/Similapunktur/frontend/public/boericke_repertory.json) sowie in die neuen SQLite-Tabellen `boericke_rep_rubrics` und `boericke_rep_remedies` in [out/similapunktur.db](file:///d:/Antigravity/Similapunktur/out/similapunktur.db).
- **Klinisches Scoring, Polaritäts-Penalty & MDR-Disclaimer ([frontend/src/core/repertory.ts](file:///d:/Antigravity/Similapunktur/frontend/src/core/repertory.ts)):**
  - **Exponentielles Scoring ($\text{Grad}^2$):** Verhinderung der Polychresten-Falle. Spezifische Leitsymptome in Grad 3 ($\text{Score} = 9$) und Grad 4 ($\text{Score} = 16$) heben sich mathematisch klar gegen unspezifische Grad-1-Randsymptome ab.
  - **Coverage-Bonus (Bönninghausen-Totalitäts-Prinzip):** Mittel, die die Gesamtheit der Patientensymptome abdecken ($k > 1$), erhalten bis zu $+25\%$ Totalitäts-Bonus.
  - **Heiner-Frei-Polaritäts-Penalty:** Bei Vorliegen von Polaritätswidersprüchen wird das betroffene Mittel mit einem Malus belegt ($50\%$ Score-Abzug) und optisch mit ⚠️ markiert, um Erstverschlimmerungen zu verhindern.
  - **MDR-Disclaimer:** Fester Clinical Decision Support System (CDSS) Haftungshinweis in [index.html](file:///d:/Antigravity/Similapunktur/frontend/index.html) gemäß EU-MDR-Richtlinien.
- **Bilaterale Spiegelung im 3D-Viewer ([BodyViewer3D.ts](file:///d:/Antigravity/Similapunktur/frontend/src/components/BodyViewer3D.ts)):**
  - Zuschaltbarer Modus **„🔄 Beidseitig“** in der 3D-Toolbar ([index.html](file:///d:/Antigravity/Similapunktur/frontend/index.html), [main.ts](file:///d:/Antigravity/Similapunktur/frontend/src/main.ts)).
  - Für alle 12 paarigen Organ-Leitbahnen (HT, LU, LI, ST, SP, SI, BL, KI, PC, TE, GB, LR) werden automatisch spiegelsymmetrische Punkte ($X \to -X, N_X \to -N_X$) sowie 3D-Meridian-Tubes auf der gegenüberliegenden Körperseite generiert. Mittellinien-Gefäße (CV & GV) bleiben unpaarig.
  - Volle Interaktivität: Klicks und Hover-Raycasting funktionieren nahtlos auf beiden Körperhälften inklusive sanfter Kamera-Fokussierung (`flyToPoint`).
- **UI-Modularisierung von [main.ts](file:///d:/Antigravity/Similapunktur/frontend/src/main.ts) (Phase 3):**
  - [MatrixTable.ts](file:///d:/Antigravity/Similapunktur/frontend/src/ui/MatrixTable.ts): Vollständige Auslagerung der Repertorisierungs-Matrix-Tabelle mit Sticky-Headern, Modalitäten-Spalten und Spalten-Hover.
  - [DevReviewTable.ts](file:///d:/Antigravity/Similapunktur/frontend/src/ui/DevReviewTable.ts): Vollständige Auslagerung der Entwickler- und Datenqualitäts-Inspektionstabellen.
  - `main.ts` wurde um über **750 Zeilen** entlastet (von 3.315 auf 2.563 Zeilen).
- **Automatisierte Test-Suite (Vitest):**
  - 15 Unit-Tests in [repertory.test.ts](file:///d:/Antigravity/Similapunktur/frontend/src/core/__tests__/repertory.test.ts), [polarity.test.ts](file:///d:/Antigravity/Similapunktur/frontend/src/core/__tests__/polarity.test.ts) und [search.test.ts](file:///d:/Antigravity/Similapunktur/frontend/src/core/__tests__/search.test.ts) sichern alle Kernalgorithmen ab (alle 15 Tests grün in < 500 ms).
- **Bereinigtes Wurzelverzeichnis (Root-Hygiene):**
  - Über 80 Einweg-Skripte und Textur-Dumps nach `archive/baking_experiments/` verschoben und in `.gitignore` ignoriert.
- **Selbstkonfigurierendes Workspace-Profil & Tokenfreies Dashboard ([.gemini/workspace_profile.json](file:///d:/Antigravity/Similapunktur/.gemini/workspace_profile.json)):**
  - Initiales Manifest deterministisch generiert (Tier 1: 5 aktive Skills, Tier 2: 3 Standby-Skills, 11 Fremddomänen geblockt).
  - System-Prompt-Ersparnis: **73,7 % (~9.100 Tokens pro Turn)**.
  - Tokenfreies, interaktives HTML-Dashboard bereitgestellt unter [.gemini/profile_dashboard.html](file:///d:/Antigravity/Similapunktur/.gemini/profile_dashboard.html).

---

## 🔜 Nächster Schritt
**Fachliche Feinprüfung & UI-Feinschliff**  
Startpunkt: `frontend/src/components/BodyViewer3D.ts` & `frontend/public/data/points_3d.json`
```
1. Visuelle Prüfung der Leitbahnen im 3D-Viewer im neuen "🔄 Beidseitig"-Modus.
2. Optional: Fein-Kalibrierung einzelner Punkte über den integrierten Editor (?edit=true).
3. Optional: Aufteilung von style.css in modulare CSS-Komponenten (tokens.css, matrix.css, viewer3d.css).
```

---

## ⚠️ Offene Punkte
- [ ] Fein-Kalibrierung einzelner Punkte durch Fachexperten mittels `?edit=true`
- [ ] Validierung der Remedy-Matching-Regeln abschließen
- [ ] Aufteilung von `style.css` in modulare CSS-Komponenten

---

## 🛠️ Schnellstart
```powershell
# 1. Bequem über das Menü starten:
start.bat

# Oder manuell:
# Python-Backend (Port 8000)
python server.py

# Frontend Dev-Server (Port 3000)
cd frontend
npm run dev

# Tests ausführen
cd frontend
npm test
```
