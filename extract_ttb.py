import fitz
import json
import re
import sqlite3
import os

pdf_path = r"D:\Antigravity\Similapunktur\Kontent\TTB Polaritäten.pdf"
db_path = r"out\similapunktur.db"

def extract_ttb_repertory():
    print(f"Opening TTB PDF: {pdf_path}")
    doc = fitz.open(pdf_path)
    
    rubrics = {}
    current_rubric_name = []
    current_remedies = []
    
    font_grades = {
        "CIDFont+F1": 1,
        "CIDFont+F2": 2,
        "CIDFont+F6": 3
    }
    
    def is_remedy_token(token):
        if re.match(r"^[A-Z][a-zA-Z0-9\-]*\.\*?$", token):
            if re.match(r"^\d+\.$", token):
                return False
            return True
        if re.match(r"^[A-Z][a-zA-Z0-9\-]*\*?$", token):
            clean_token = token.replace("*", "")
            if len(clean_token) <= 5:
                return True
        return False

    print("Parsing pages...")
    # Start at page 5 (index 4) - after intro
    for page_num in range(4, len(doc)):
        page = doc.load_page(page_num)
        blocks = page.get_text("dict")["blocks"]
        
        raw_spans = []
        for b in blocks:
            if "lines" not in b: continue
            for l in b["lines"]:
                for s in l["spans"]:
                    text = s["text"].strip()
                    if text:
                        raw_spans.append({
                            "text": text,
                            "font": s["font"],
                            "size": s["size"],
                            "x0": s["bbox"][0],
                            "y0": s["bbox"][1]
                        })
                        
        if not raw_spans:
            continue
            
        # Sort spans by approximate line (y0 with tolerance 3) and then x0
        lines = []
        for span in raw_spans:
            placed = False
            for line in lines:
                if abs(span["y0"] - line[0]["y0"]) < 3.0:
                    line.append(span)
                    placed = True
                    break
            if not placed:
                lines.append([span])
                
        for line in lines:
            line.sort(key=lambda s: s["x0"])
        lines.sort(key=lambda line: line[0]["y0"])
        
        sorted_spans = []
        for line in lines:
            sorted_spans.extend(line)
            
        # Pre-merge split words
        spans = []
        idx = 0
        while idx < len(sorted_spans):
            curr = sorted_spans[idx]
            if idx < len(sorted_spans) - 1:
                nxt = sorted_spans[idx + 1]
                if curr["text"].endswith("-") and re.match(r'^[a-z]+\.?$', nxt["text"]):
                    curr["text"] = curr["text"] + nxt["text"]
                    idx += 2
                    spans.append(curr)
                    continue
            spans.append(curr)
            idx += 1
            
        # Group into rubrics and remedies
        for span in spans:
            text = span["text"]
            font = span["font"]
            size = span["size"]
            
            # Check for rubric name end
            if size < 7.0 and (text.endswith(":") or (":" in text and not re.search(r'\.[A-Z]', text))):
                if current_remedies:
                    # Save completed rubric
                    name = " ".join(current_rubric_name).strip()
                    # Clean double spaces or trailing colons
                    name = re.sub(r'\s+', ' ', name)
                    if name:
                        rubrics[name] = current_remedies
                    current_rubric_name = []
                    current_remedies = []
                    
                current_rubric_name.append(text)
            else:
                # Check for remedy tokens
                words = text.split()
                is_remedy_list = any(is_remedy_token(w) for w in words)
                
                if is_remedy_list:
                    grade = font_grades.get(font, 1)
                    for w in words:
                        if is_remedy_token(w):
                            if re.match(r'^\d+\.?$', w):
                                current_rubric_name.append(w)
                                continue
                            guernsey = w.endswith("*")
                            current_remedy_abbr = w.replace("*", "")
                            # Standardize abbreviation with trailing dot
                            if not current_remedy_abbr.endswith('.'):
                                current_remedy_abbr += '.'
                                
                            current_remedies.append({
                                "name": current_remedy_abbr,
                                "grade": grade,
                                "guernsey": guernsey
                            })
                        else:
                            current_rubric_name.append(w)
                else:
                    current_rubric_name.append(text)

    # Save last rubric
    if current_rubric_name and current_remedies:
        name = " ".join(current_rubric_name).strip()
        name = re.sub(r'\s+', ' ', name)
        if name:
            rubrics[name] = current_remedies
            
    print(f"Extracted {len(rubrics)} TTB rubrics.")
    
    # Write JSON files
    os.makedirs("out", exist_ok=True)
    os.makedirs("frontend/public", exist_ok=True)
    os.makedirs("frontend/dist", exist_ok=True)
    
    for dest in ["out/ttb_repertory.json", "frontend/public/ttb_repertory.json", "frontend/dist/ttb_repertory.json"]:
        print(f"Writing: {dest}")
        with open(dest, "w", encoding="utf-8") as f:
            json.dump(rubrics, f, ensure_ascii=False, indent=2)
            
    # Write to SQLite
    print(f"Writing to SQLite: {db_path}")
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    cur.execute('''
        CREATE TABLE IF NOT EXISTS ttb_rubrics (
            rubric_name VARCHAR PRIMARY KEY,
            remedies_json TEXT
        )
    ''')
    
    for name, rem_list in rubrics.items():
        cur.execute('''
            INSERT OR REPLACE INTO ttb_rubrics (rubric_name, remedies_json)
            VALUES (?, ?)
        ''', (name, json.dumps(rem_list, ensure_ascii=False)))
        
    conn.commit()
    conn.close()
    print("Done!")

if __name__ == "__main__":
    extract_ttb_repertory()
