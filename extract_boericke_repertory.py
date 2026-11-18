"""
Extracts the repertory from 'Essential Boericke Repertorium.rtf' into:
- out/boericke_repertory.json
- frontend/public/boericke_repertory.json
- SQLite tables 'boericke_rep_rubrics' and 'boericke_rep_remedies' in out/similapunktur.db
"""

import json
import os
import re
import sqlite3
from collections import Counter

RTF_PATH = "Essential Boericke Repertorium.rtf"
DB_PATH = os.path.join("out", "similapunktur.db")
JSON_DESTS = [
    os.path.join("out", "boericke_repertory.json"),
    os.path.join("frontend", "public", "boericke_repertory.json"),
]

# Known chapter heading pattern: e.g. "1. Gemüt", "22.1 Obere Extremitäten"
CHAPTER_RE = re.compile(r"^(\d+(?:\s*\.\s*\d+)?)\s*\.\s*(.+)$")
# Remedy token pattern: e.g. "Agar.", "Aur-m.", "Carb-an.", "Paris1", "Absin.2"
REMEDY_TOKEN_RE = re.compile(r"^([A-ZÄÖÜ][a-zäöüß]+(?:-[a-zäöüß0-9]+)*\.?)(\d*)$")


def decode_rtf_escapes(text: str) -> str:
    """Decodes cp1252 hex escapes (\\'hh) and basic unicode escapes (\\uN?)."""
    text = re.sub(
        r"\\'([0-9a-fA-F]{2})",
        lambda m: bytes.fromhex(m.group(1)).decode("cp1252", errors="replace"),
        text,
    )
    text = re.sub(
        r"\\u(-?\d+)\??",
        lambda m: chr(int(m.group(1)) & 0xFFFF),
        text,
    )
    return text


def strip_destination_groups(rtf_text: str) -> str:
    """Removes RTF destination groups like {\\*\\...} and header tables."""
    out = []
    i = 0
    n = len(rtf_text)
    while i < n:
        if rtf_text[i] == "{" and i + 2 < n and rtf_text[i + 1 : i + 3] == r"\*":
            depth = 1
            i += 2
            while i < n and depth > 0:
                if rtf_text[i] == "{":
                    depth += 1
                elif rtf_text[i] == "}":
                    depth -= 1
                i += 1
        else:
            out.append(rtf_text[i])
            i += 1
    return "".join(out)


def parse_paragraphs(rtf_path: str):
    """Yields parsed paragraphs with formatting spans and indentation."""
    with open(rtf_path, "r", encoding="cp1252", errors="ignore") as f:
        raw = f.read()

    start_idx = raw.find("Repertorium zu Boerickes")
    if start_idx == -1:
        start_idx = raw.find(r"\pard")
    body = raw[max(0, start_idx - 300) :]
    body = strip_destination_groups(body)
    body = decode_rtf_escapes(body)

    raw_pars = re.split(r"\\par(?![a-zA-Z])", body)

    current_li = 0
    for rp in raw_pars:
        if r"\pard" in rp:
            current_li = 0
        li_matches = re.findall(r"\\li(\d+)", rp)
        if li_matches:
            current_li = int(li_matches[-1])

        tokens = re.findall(r"\{|\}|\\[a-zA-Z]+-?\d* ?|[^\\{}]+", rp)
        stack = [{"b": False, "i": False, "cf": 0, "fs": 20}]
        spans = []

        for tok in tokens:
            if tok == "{":
                stack.append(stack[-1].copy())
            elif tok == "}":
                if len(stack) > 1:
                    stack.pop()
            elif tok.startswith("\\"):
                cw = tok.strip()
                if cw == r"\b":
                    stack[-1]["b"] = True
                elif cw == r"\b0":
                    stack[-1]["b"] = False
                elif cw == r"\i":
                    stack[-1]["i"] = True
                elif cw == r"\i0":
                    stack[-1]["i"] = False
                elif cw.startswith(r"\cf"):
                    try:
                        stack[-1]["cf"] = int(cw[3:])
                    except ValueError:
                        pass
                elif cw.startswith(r"\fs"):
                    try:
                        stack[-1]["fs"] = int(cw[3:])
                    except ValueError:
                        pass
                elif cw == r"\plain":
                    stack[-1] = {"b": False, "i": False, "cf": 0, "fs": 20}
                elif cw == r"\tab":
                    spans.append((" ", stack[-1]["b"], stack[-1]["i"], stack[-1]["cf"], stack[-1]["fs"]))
            else:
                t = tok.replace("\r", "").replace("\n", "")
                if t:
                    spans.append((t, stack[-1]["b"], stack[-1]["i"], stack[-1]["cf"], stack[-1]["fs"]))

        full_text = "".join(s[0] for s in spans)
        full_text = re.sub(r"\s+", " ", full_text).strip()
        if full_text:
            yield {"li": current_li, "text": full_text, "spans": spans}


def extract_remedies_from_spans(after_colon_spans):
    """
    Reconstructs remedy tokens from spans after ':' while preserving italic state.
    Each remedy gets grade=2 if any letter in its name is italic, else grade=1.
    """
    # Build character-level (char, is_italic) list
    chars = []
    for text, _b, is_i, _cf, _fs in after_colon_spans:
        for ch in text:
            chars.append((ch, is_i))

    remedies_dict = {}
    i = 0
    n = len(chars)
    while i < n:
        # Skip whitespace and punctuation separators
        while i < n and chars[i][0] in " \t,;":
            i += 1
        if i >= n:
            break
        start = i
        has_italic = False
        token_chars = []
        while i < n and chars[i][0] not in " \t,;":
            token_chars.append(chars[i][0])
            if chars[i][1] and chars[i][0].isalpha():
                has_italic = True
            i += 1
        raw_tok = "".join(token_chars).strip()
        if not raw_tok:
            continue

        # Handle cases where a remedy is followed by a trailing digit without space (e.g. Absin.2 or Paris1)
        m = REMEDY_TOKEN_RE.match(raw_tok)
        if m:
            rem_name = m.group(1)
            if not rem_name.endswith("."):
                rem_name += "."
            grade = 2 if has_italic else 1
            # Keep highest grade if duplicate in same rubric
            if rem_name not in remedies_dict or grade > remedies_dict[rem_name]:
                remedies_dict[rem_name] = grade

    return [{"name": k, "grade": v} for k, v in remedies_dict.items()]


def split_spans_at_colon(spans):
    """Splits spans into (before_colon_text, after_colon_spans)."""
    before = []
    after = []
    found = False
    for text, b, is_i, cf, fs in spans:
        if not found:
            if ":" in text:
                pre, post = text.split(":", 1)
                before.append(pre)
                if post:
                    after.append((post, b, is_i, cf, fs))
                found = True
            else:
                before.append(text)
        else:
            after.append((text, b, is_i, cf, fs))
    return "".join(before).strip(), after


def run_extraction():
    print(f"Parsing {RTF_PATH}...")
    chapters = []
    rubrics = []

    current_chapter_num = ""
    current_chapter_name = ""
    current_parent_rubric = ""
    in_repertory = False

    for par in parse_paragraphs(RTF_PATH):
        txt = par["text"]
        li = par["li"]

        # Detect chapter heading
        if ":" not in txt and len(txt) < 80:
            m_chap = CHAPTER_RE.match(txt)
            if m_chap:
                num_str = re.sub(r"\s+", "", m_chap.group(1))
                chap_name = re.sub(r"\s+", " ", m_chap.group(2)).strip()
                # Fix occasional single-letter split artifacts like "O hren" -> "Ohren" if any
                current_chapter_num = num_str
                current_chapter_name = chap_name
                current_parent_rubric = ""
                in_repertory = True
                chapters.append({"num": num_str, "name": chap_name})
                continue

        if not in_repertory:
            continue

        # Skip cross-reference-only lines without remedies if they don't act as parent headers
        if ":" not in txt:
            # Parent rubric header (e.g. "Begreifen", "Delirium")
            if li <= 227 and len(txt) < 120 and not txt.startswith("("):
                current_parent_rubric = txt.rstrip(".")
            continue

        # Rubric with remedies (contains ':')
        rubric_label, after_spans = split_spans_at_colon(par["spans"])
        rubric_label = re.sub(r"\s+", " ", rubric_label).strip()
        if not rubric_label:
            continue

        remedies = extract_remedies_from_spans(after_spans)
        if not remedies:
            # Could be a header with colon or cross-reference; track as parent if top-level
            if li <= 227 and len(rubric_label) < 120:
                current_parent_rubric = rubric_label
            continue

        is_subrubric = li > 227
        if not is_subrubric:
            # Top-level rubric: resets or sets parent context
            first_word_bold = any(s[1] for s in par["spans"][:2] if s[0].strip())
            if first_word_bold:
                current_parent_rubric = rubric_label.split(",")[0].strip()
                parent_for_entry = ""
            else:
                parent_for_entry = current_parent_rubric
        else:
            parent_for_entry = current_parent_rubric

        if parent_for_entry and parent_for_entry.lower() != rubric_label.lower():
            full_path = f"{current_chapter_name} > {parent_for_entry} > {rubric_label}"
        else:
            full_path = f"{current_chapter_name} > {rubric_label}"

        rubrics.append({
            "chapter_num": current_chapter_num,
            "chapter": current_chapter_name,
            "parent_rubric": parent_for_entry,
            "rubric": rubric_label,
            "full_path": full_path,
            "remedies": remedies,
        })

    # Compute stats
    total_remedy_entries = sum(len(r["remedies"]) for r in rubrics)
    grade_counts = Counter(rem["grade"] for r in rubrics for rem in r["remedies"])
    unique_remedies = sorted({rem["name"] for r in rubrics for rem in r["remedies"]})

    print(f"Chapters found: {len(chapters)}")
    print(f"Rubrics with remedies: {len(rubrics)}")
    print(f"Total rubric-remedy entries: {total_remedy_entries}")
    print(f"Unique remedies: {len(unique_remedies)}")
    print(f"Grade distribution: {dict(grade_counts)}")

    # Save JSON
    payload = {
        "source": RTF_PATH,
        "chapters": chapters,
        "rubrics": rubrics,
    }
    for dest in JSON_DESTS:
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, "w", encoding="utf-8") as f:
            json.dump(payload, f, ensure_ascii=False, indent=2)
        print(f"Wrote {dest}")

    # Save SQLite
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("DROP TABLE IF EXISTS boericke_rep_remedies")
    cur.execute("DROP TABLE IF EXISTS boericke_rep_rubrics")
    cur.execute("""
        CREATE TABLE boericke_rep_rubrics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            chapter_num VARCHAR,
            chapter_name VARCHAR,
            parent_rubric VARCHAR,
            rubric_name VARCHAR,
            full_path TEXT
        )
    """)
    cur.execute("""
        CREATE TABLE boericke_rep_remedies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            rubric_id INTEGER,
            remedy_name VARCHAR,
            grade INTEGER,
            FOREIGN KEY(rubric_id) REFERENCES boericke_rep_rubrics(id)
        )
    """)
    cur.execute("CREATE INDEX idx_boericke_rep_remedy ON boericke_rep_remedies(remedy_name)")
    cur.execute("CREATE INDEX idx_boericke_rep_rubric_name ON boericke_rep_rubrics(rubric_name)")

    for r in rubrics:
        cur.execute(
            """
            INSERT INTO boericke_rep_rubrics (chapter_num, chapter_name, parent_rubric, rubric_name, full_path)
            VALUES (?, ?, ?, ?, ?)
            """,
            (r["chapter_num"], r["chapter"], r["parent_rubric"], r["rubric"], r["full_path"]),
        )
        rid = cur.lastrowid
        cur.executemany(
            "INSERT INTO boericke_rep_remedies (rubric_id, remedy_name, grade) VALUES (?, ?, ?)",
            [(rid, rem["name"], rem["grade"]) for rem in r["remedies"]],
        )

    conn.commit()
    conn.close()
    print(f"Updated SQLite database: {DB_PATH}")


if __name__ == "__main__":
    run_extraction()
