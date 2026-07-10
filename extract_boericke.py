import fitz
import json
import re
import sqlite3
import os

pdf_path = r"D:\Antigravity\Similapunktur\Kontent\Essential Boericke.pdf"
db_path = r"out\similapunktur.db"

def extract_materia_medica():
    print(f"Opening PDF: {pdf_path}")
    doc = fitz.open(pdf_path)
    
    remedies = {}
    current_remedy = None
    current_abbr = None
    current_section = None
    overview_text = []
    
    # Simple regex to split title and abbreviation: e.g. "Abrotanum (Abrot.)"
    title_pattern = re.compile(r"^([^(]+)\s*\(([^)]+)\)\s*$")
    
    print("Parsing pages...")
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        blocks = page.get_text("dict")["blocks"]
        
        # Sort blocks by vertical position to ensure reading order
        blocks.sort(key=lambda b: b.get("bbox", [0, 0, 0, 0])[1])
        
        for b in blocks:
            if "lines" not in b:
                continue
            for l in b["lines"]:
                for s in l["spans"]:
                    text = s["text"].strip()
                    if not text:
                        continue
                    
                    size = s["size"]
                    font = s["font"]
                    
                    # Check for remedy title (size > 10.0)
                    if size > 10.0 and "(" in text and ")" in text:
                        # Save previous remedy if exists
                        if current_remedy and (overview_text or remedies[current_remedy]["sections"]):
                            # Clean up overview
                            remedies[current_remedy]["overview"] = " ".join(overview_text).strip()
                            overview_text = []
                        
                        match = title_pattern.match(text)
                        if match:
                            name = match.group(1).strip()
                            abbr = match.group(2).strip()
                            # Standardize abbreviation with trailing dot
                            if not abbr.endswith('.'):
                                abbr += '.'
                            
                            current_remedy = name
                            current_abbr = abbr
                            current_section = None
                            
                            remedies[current_remedy] = {
                                "abbreviation": current_abbr,
                                "name": current_remedy,
                                "overview": "",
                                "sections": {}
                            }
                        else:
                            # If title pattern doesn't match perfectly, treat it as general title
                            current_remedy = text
                            current_abbr = text.split('(')[-1].replace(')', '').strip()
                            if not current_abbr.endswith('.'):
                                current_abbr += '.'
                            current_section = None
                            
                            remedies[current_remedy] = {
                                "abbreviation": current_abbr,
                                "name": current_remedy,
                                "overview": "",
                                "sections": {}
                            }
                    
                    elif current_remedy:
                        # Check for section header (font name ends with F4/bold and ends with colon)
                        is_header = False
                        if font.endswith("F4") and text.endswith(":"):
                            is_header = True
                        elif text in ["Gemüt:", "Kopf:", "Augen:", "Ohren:", "Nase:", "Gesicht:", "Mund:", 
                                     "Innerer Hals:", "Magen:", "Abdomen:", "Stuhl:", "Urin:", "Männlich:", 
                                     "Weiblich:", "Atemwege:", "Herz:", "Rücken:", "Extremitäten:", "Schlaf:", 
                                     "Fieber:", "Haut:", "Modalitäten:", "Beziehungen:"]:
                            is_header = True
                            
                        if is_header:
                            current_section = text.replace(":", "").strip()
                            remedies[current_remedy]["sections"][current_section] = []
                        else:
                            if current_section:
                                remedies[current_remedy]["sections"][current_section].append(text)
                            else:
                                overview_text.append(text)
                                
    # Save the last remedy
    if current_remedy:
        remedies[current_remedy]["overview"] = " ".join(overview_text).strip()
        
    # Clean up sections text by joining lists into strings
    cleaned_remedies = {}
    for name, data in remedies.items():
        abbr = data["abbreviation"]
        # Join section lists
        sections_joined = {}
        for sec, contents in data["sections"].items():
            sections_joined[sec] = " ".join(contents).strip()
            
        cleaned_remedies[abbr] = {
            "abbreviation": abbr,
            "name": name,
            "overview": data["overview"],
            "sections": sections_joined
        }
        
    print(f"Extracted {len(cleaned_remedies)} remedy profiles.")
    
    # Save JSON files
    os.makedirs("out", exist_ok=True)
    os.makedirs("frontend/public", exist_ok=True)
    os.makedirs("frontend/dist", exist_ok=True)
    
    for dest in ["out/boericke_materia_medica.json", "frontend/public/boericke_materia_medica.json", "frontend/dist/boericke_materia_medica.json"]:
        print(f"Writing: {dest}")
        with open(dest, "w", encoding="utf-8") as f:
            json.dump(cleaned_remedies, f, ensure_ascii=False, indent=2)
            
    # Write to SQLite database
    print(f"Writing to SQLite: {db_path}")
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    cur.execute('''
        CREATE TABLE IF NOT EXISTS remedy_descriptions (
            remedy_abbr VARCHAR PRIMARY KEY,
            remedy_name VARCHAR,
            overview TEXT,
            sections_json TEXT
        )
    ''')
    
    # Insert or replace remedy profiles
    for abbr, data in cleaned_remedies.items():
        cur.execute('''
            INSERT OR REPLACE INTO remedy_descriptions (remedy_abbr, remedy_name, overview, sections_json)
            VALUES (?, ?, ?, ?)
        ''', (abbr, data["name"], data["overview"], json.dumps(data["sections"], ensure_ascii=False)))
        
    conn.commit()
    conn.close()
    print("Done!")

if __name__ == "__main__":
    extract_materia_medica()
