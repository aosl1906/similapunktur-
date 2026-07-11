# Similapunktur - Implementierungs-Roadmap

Diese Roadmap basiert auf dem System-Audit des KI Deep Research Agenten. Sie dient als strukturierter Leitfaden, um die klinische Sicherheit, die Ergonomie und die Skalierbarkeit der Anwendung Schritt für Schritt zu verbessern. 

Jeder Schritt ist so dokumentiert, dass er entweder implementiert oder bei Bedarf übersprungen werden kann.

---

## Status-Legende
* `- [ ] Offen` : Noch nicht begonnen.
* `- [/] In Arbeit` : Aktuell in der Umsetzung.
* `- [x] Erledigt` : Vollständig implementiert und getestet.
* `- [-] Übersprungen` : Bewusst ausgelassen oder für dieses Release zurückgestellt.

---

## 🚀 Phase 1: Klinische Sicherheit & Algorithmus (Sofortmaßnahmen)

### [ ] 1. Exponentielles Scoring & Coverage-Bonus
* **Ziel:** Vermeidung der "Polychrest-Falle". Kleine, hochspezifische Mittel in hohen Rubrik-Graden dürfen nicht von großen Mitteln (Polychresten) mit vielen Grad-1-Einträgen überstimmt werden.
* **Priorität:** Hoch
* **Details:**
  * Umbau der mathematischen Score-Berechnung in [main.ts](file:///d:/Antigravity/Similapunktur/frontend/src/main.ts) (`runRepertorisation()` und `renderMatrixTable()`).
  * Wertigkeiten nicht-linear gewichten: $\text{Grad}^2$ (Grad 3 wird zu 9, Grad 2 zu 4, Grad 1 bleibt 1).
  * Einführung eines **Coverage-Bonus**: Wenn ein Mittel $k$ von $N$ Symptomen abdeckt, erhält es einen Multiplikator (z. B. $+20\%$ Score bei $100\%$ Abdeckung).
* **Status:** `[ ] Offen`

---

### [ ] 2. Mathematische Polaritätsanalyse & Penalty-System
* **Ziel:** Verhinderung von homöopathischen Erstverschlimmerungen durch einen automatischen Penalty für Mittel mit Polaritätswidersprüchen.
* **Priorität:** Hoch
* **Details:**
  * Erweiterung der `POLAR_CATEGORIES` in [main.ts](file:///d:/Antigravity/Similapunktur/frontend/src/main.ts) um weitere TTB-Rubriken nach Heiner Frei.
  * In `updatePolarityContraindications()` den Polaritätsindex exakt berechnen: 
    $$\text{Index} = \sum \text{Grade der gewählten Polarität} - \sum \text{Grade der Gegenpolarität des Mittels}$$
  * Ist der Index negativ, wird das Mittel mit einem Malus belegt (z. B. Score-Halbierung) und in der Matrix rot markiert oder ausgegraut.
* **Status:** `[ ] Offen`

---

### [ ] 3. MDR-Konformität (Clinical Decision Support System Disclaimer)
* **Ziel:** Rechtliche Absicherung gegen Einstufung als Medizinprodukt der Klasse IIa nach der EU-Medizinprodukteverordnung (MDR).
* **Priorität:** Hoch
* **Details:**
  * Einbindung eines permanent sichtbaren Haftungsausschlusses (Disclaimers) im Footer und beim Starten der App in [index.html](file:///d:/Antigravity/Similapunktur/frontend/index.html).
  * Textvorlage: *"Diese Software dient ausschließlich als Entscheidungsunterstützung für ausgebildete Therapeuten (Clinical Decision Support System). Die therapeutische Letztentscheidung liegt beim Behandler (Human-in-the-loop)."*
  * Sicherstellen, dass das System immer eine Liste von Optionen (Differenzialdiagnosen) statt einer einzigen "Verschreibung" ausgibt.
* **Status:** `[ ] Offen`

---

## 🏗️ Phase 2: Architektur, DSGVO & Persistenz (Mittelfristig)

### [ ] 4. Local-First Desktop-Kapselung mit Tauri
* **Ziel:** Schutz hochsensibler Patientendaten (Art. 9 DSGVO) durch Ausführung als rein lokale Applikation ohne Cloud-Overhead.
* **Priorität:** Mittel
* **Details:**
  * Initialisierung eines **Tauri**-Projekts (`npx tauri init`) im Frontend-Verzeichnis.
  * Das Python-Backend (`server.py`) wird langfristig durch ein natives Rust-Backend in Tauri oder ein lokales Node-Backend ersetzt, um Performance und Sicherheit zu erhöhen.
  * Die Benutzeroberfläche bleibt als HTML/TS-Applikation erhalten.
* **Status:** `[ ] Offen`

---

### [ ] 5. Verschlüsselte lokale Patientendatenbank (SQLCipher)
* **Ziel:** Erfassung von Patientenhistorien, Sitzungsverläufen und gesetzten Injektionen ohne Sicherheitsrisiken.
* **Priorität:** Mittel
* **Details:**
  * Erweiterung des Datenbankschemas um Tabellen für `patienten`, `behandlungen` und `behandlungs_punkte`.
  * Integration von **SQLCipher** zur hardwaregebundenen AES-256-Verschlüsselung der lokalen SQLite-Datenbank.
  * Implementierung von Backup- und Export-Funktionen (verschlüsselter Datei-Export).
* **Status:** `[ ] Offen`

---

### [ ] 6. Kollaborativer Editor & Proposal-Modus
* **Ziel:** Vermeidung von Datenkorruption und Race Conditions, wenn mehrere Therapeuten Punkte auf den Diagrammen verschieben.
* **Priorität:** Niedrig
* **Details:**
  * Der WYSIWYG-Editor schreibt Koordinatenänderungen nicht mehr direkt in die Master-Datenbank `punkte`.
  * Erstellung einer Tabelle `punkt_vorschlaege` (Proposals) in [server.py](file:///d:/Antigravity/Similapunktur/server.py).
  * Vorschläge werden gesammelt und können vom Administrator gesichtet, freigegeben und über ein Update-File in das offizielle Release gemergt werden.
* **Status:** `[ ] Offen`

---

## 🖱️ Phase 3: Semantik & Praxis-Ergonomie (Langfristig)

### [ ] 7. Hands-free Fokus-Modus (Zen-Mode)
* **Ziel:** Optimierung der UI für sterile Arbeitsbedingungen direkt am Patientenbett.
* **Priorität:** Mittel
* **Details:**
  * Entwicklung einer Vollbild-Ansicht ("Zen-Modus") in [style.css](file:///d:/Antigravity/Similapunktur/frontend/src/style.css) und [main.ts](file:///d:/Antigravity/Similapunktur/frontend/src/main.ts).
  * Ausblenden aller Seitenleisten. Nur das Diagramm des aktiven Punktes, das Injektionsmittel, die Nadelungstiefe/-winkel und rote Warnhinweise werden riesig dargestellt.
  * Gestensteuerung (Swipe für Nächster/Vorheriger Punkt) oder Unterstützung für Bluetooth-Fußschalter zur Navigation.
* **Status:** `[ ] Offen`

---

### [ ] 8. PZN-Barcode-Scanner zur Ampullen-Verifikation
* **Ziel:** Ausschluss von Verwechslungen bei der Injektion von Ampullen (z. B. Wala/Heel).
* **Priorität:** Mittel
* **Details:**
  * Nutzung der HTML5 Media Device API zum Zugriff auf die Kamera des Tablets.
  * Einbindung einer leichtgewichtigen Barcode-Scanner-Bibliothek (z. B. `html5-qrcode`).
  * Abgleich der gescannten Pharmazentralnummer (PZN) mit dem im aktuellen Fall ermittelten homöopathischen Mittel. Warnmeldung bei Diskrepanz.
* **Status:** `[ ] Offen`

---

### [ ] 9. Lokale Vektorsuche (transformers.js) als Synonym-Ersatz
* **Ziel:** Beseitigung von False-Positives und semantischen Ungenauigkeiten durch OpenThesaurus.
* **Priorität:** Niedrig
* **Details:**
  * Verwerfen der OpenThesaurus-API-Anfragen in [server.py](file:///d:/Antigravity/Similapunktur/server.py).
  * Einbindung von `transformers.js` im Frontend, um semantische Embeddings für Symptome direkt im Client zu berechnen.
  * Suche vergleicht den Kosinus-Ähnlichkeitswert der Symptomeingabe mit den hinterlegten Rubriken und Indikationen der Akupunkturpunkte.
* **Status:** `[ ] Offen`

---

### [ ] 10. Boericke Clinical Pearls & Evidenz-Verknüpfung
* **Ziel:** Schnelle klinische Erfassbarkeit der Arzneimittelbilder und Einbindung moderner Evidenz.
* **Priorität:** Niedrig
* **Details:**
  * Strukturierung der Boericke-Daten (`boericke_materia_medica.json`), um "Clinical Pearls" (Keynotes, Leitsymptome, Kontraindikationen) als prägnante Stichpunkte ganz oben anzuzeigen.
  * Anbindung von PubMed-Referenzen oder MeSH-Term-Verknüpfungen für evidenzbasierte Nachweise in den Detail-Panels der Arzneimittel.
* **Status:** `[ ] Offen`

---

### [ ] 11. TCM-Homöopathie Entkopplung (Dual-Axis Scoring & Off-Label-Synthese)
* **Ziel:** Flexibilität, wenn das optimale homöopathische Mittel auf einen energetisch unpassenden Akupunkturpunkt verweist.
* **Priorität:** Niedrig
* **Details:**
  * Implementierung von zwei separaten Scores: $Score_{Homöopathie}$ und $Score_{TCM}$.
  * Wenn die historische Weihe-Kopplung energetisch unpassend ist, schlägt die Engine systemische Meisterpunkte oder Ausweichpunkte mit ähnlicher Organaffinität vor (z. B. anstelle des starren Weihe-Punktes ein Hauptpunkt auf dem Gallenblasen-Meridian bei Leber-Symptomatik).
* **Status:** `[ ] Offen`
