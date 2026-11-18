"""
build_curation_audit.py
Generates frontend/public/curation_audit.json for the temporary
Human-in-the-Loop (HITL) CurationWorkbench tool.
Compares Maier-Similapunkte.txt against frontend/public/similapunktur.json
and audits frontend/public/boericke_repertory.json for parsing anomalies.
"""

from datetime import datetime, timezone
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
RAW_POINTS_TXT = ROOT / "Maier-Similapunkte.txt"
SIMILAPUNKTUR_JSON = ROOT / "frontend" / "public" / "similapunktur.json"
BOERICKE_JSON = ROOT / "frontend" / "public" / "boericke_repertory.json"
OUTPUT_AUDIT_JSON = ROOT / "frontend" / "public" / "curation_audit.json"


def parse_raw_point_blocks(txt: str) -> list[dict]:
    lines = txt.splitlines()
    heading_indices: list[tuple[int, int, str]] = []
    current_page = 0

    for i, line in enumerate(lines):
        stripped = line.strip()
        page_match = re.match(r"^---\s*PAGE\s+(\d+)\s*---$", stripped)
        if page_match:
            current_page = int(page_match.group(1))
            continue

        # Look ahead for 'Lokalisation:' skipping blank lines or page markers
        j = i + 1
        while j < len(lines) and (
            not lines[j].strip() or re.match(r"^---\s*PAGE\s+\d+\s*---$", lines[j].strip())
        ):
            j += 1
        if j < len(lines) and lines[j].strip().startswith("Lokalisation:") and stripped:
            heading_indices.append((i, current_page, stripped))

    blocks: list[dict] = []
    for idx, (start_line, page, heading) in enumerate(heading_indices):
        end_line = heading_indices[idx + 1][0] if idx + 1 < len(heading_indices) else len(lines)
        raw_lines = lines[start_line:end_line]
        # Clean trailing page markers and stop if a new meridian section starts
        cleaned_lines: list[str] = []
        for ln in raw_lines:
            s_ln = ln.strip()
            if re.match(r"^---\s*PAGE\s+\d+\s*---$", s_ln):
                continue
            if cleaned_lines and re.match(r"^[A-ZÄÖÜ][a-zäöüß-]+(?:-[A-ZÄÖÜa-zäöüß]+)*(?:Leitbahn|gefäß)$", s_ln):
                break
            cleaned_lines.append(ln)
        raw_text = "\n".join(cleaned_lines).strip()
        # Extract base name before parentheses: e.g. "Herz 1 (Höchste Quelle)" -> "Herz 1"
        base_name = re.sub(r"\s*\([^)]*\)\s*$", "", heading).strip()
        blocks.append({
            "page": page,
            "heading": heading,
            "base_name": base_name,
            "raw_text": raw_text,
        })
    return blocks


def extract_raw_assigned_remedies(raw_text: str) -> list[str]:
    m = re.search(
        r"Zugewiesene[ns]?\s+Hom[öo]opathik[a]?:\s*(.*?)(?:\n\s*(?:Rubriken\s+(?:in|der)\s+General\s+Analysis|General\s+Analysis|Vorsicht|Cave|Kontraindikation)|\Z)",
        raw_text,
        flags=re.DOTALL | re.IGNORECASE,
    )
    if not m:
        return []
    chunk = re.sub(r"\s+", " ", m.group(1)).strip()
    # Clean line-break hyphens like "Nat- m." -> "Nat-m."
    chunk = re.sub(r"-\s+", "-", chunk)
    tokens = [t.strip(" ,;") for t in chunk.split() if t.strip(" ,;")]
    return tokens


def has_unbalanced_parens(text: str) -> bool:
    return text.count("(") != text.count(")")


def has_hyphen_artifact(text: str) -> bool:
    return bool(re.search(r"[A-Za-zÄÖÜäöüß]-\s+[a-zäöüß]", text))


def audit_points(points: list[dict], blocks: list[dict]) -> dict[str, dict]:
    by_base_name: dict[str, dict] = {}
    for b in blocks:
        by_base_name[b["base_name"].lower()] = b

    points_audit: dict[str, dict] = {}
    for p in points:
        pid = p["point_id"]
        name_de = (p.get("name_german") or "").strip()
        block = by_base_name.get(name_de.lower())
        issues: list[str] = []
        status = "ok"

        if not block:
            issues.append("Kein exakter Rohtext-Block in Maier-Similapunkte.txt über name_german gefunden.")
            status = "warning"

        loc = (p.get("localisation_text") or "").strip()
        effects = p.get("effects") or []
        indications = p.get("indications") or []
        assigned = p.get("assigned_homeopathics") or []
        rubrics = p.get("general_analysis_rubrics") or []

        if not loc:
            issues.append("Fehlendes Feld: localisation_text")
            status = "error"
        if not effects:
            issues.append("Fehlendes/leeres Feld: effects (Wirkungen)")
            if status != "error":
                status = "warning"
        if not indications:
            issues.append("Fehlendes/leeres Feld: indications (Indikationen)")
            if status != "error":
                status = "warning"
        if not assigned:
            issues.append("Keine direkt zugewiesenen Homöopathika (assigned_homeopathics)")
            if status != "error":
                status = "warning"
        if not rubrics:
            issues.append("Keine Rubriken in General Analysis")
            if status != "error":
                status = "warning"

        # Check text artifacts
        text_fields = [loc] + [str(x) for x in effects] + [str(x) for x in indications]
        for tf in text_fields:
            if has_unbalanced_parens(tf):
                issues.append(f"Unbalancierte Klammer in Text: „{tf[:70]}…“" if len(tf) > 70 else f"Unbalancierte Klammer: „{tf}“")
                if status == "ok":
                    status = "warning"
            if has_hyphen_artifact(tf):
                issues.append(f"Mögliches Silbentrennungs-Artefakt: „{tf[:70]}…“" if len(tf) > 70 else f"Silbentrennungs-Artefakt: „{tf}“")
                if status == "ok":
                    status = "warning"

        # Compare assigned_homeopathics with raw block if present
        if block:
            raw_assigned = extract_raw_assigned_remedies(block["raw_text"])
            raw_norm = {r.rstrip(".").lower() for r in raw_assigned if r.lower() not in {"keine", "—", "-"}}
            json_norm = {str(r).rstrip(".").lower() for r in assigned}
            if raw_norm and raw_norm != json_norm:
                missing_in_json = sorted(raw_norm - json_norm)
                extra_in_json = sorted(json_norm - raw_norm)
                if missing_in_json or extra_in_json:
                    parts = []
                    if missing_in_json:
                        parts.append(f"fehlt im JSON: {', '.join(missing_in_json)}")
                    if extra_in_json:
                        parts.append(f"nur im JSON: {', '.join(extra_in_json)}")
                    issues.append("Abweichung bei Zugewiesenen Homöopathika (" + "; ".join(parts) + ")")
                    status = "error" if missing_in_json else ("warning" if status == "ok" else status)

        points_audit[pid] = {
            "page": block["page"] if block else None,
            "raw_text": block["raw_text"] if block else "",
            "status": status,
            "issues": issues,
        }

    return points_audit


def audit_boericke(rubrics: list[dict]) -> dict[str, list[str]]:
    boericke_issues: dict[str, list[str]] = {}
    for r in rubrics:
        fp = r.get("full_path", "")
        leaf = r.get("rubric", "")
        parent = r.get("parent_rubric", "")
        rems = r.get("remedies", [])
        issues: list[str] = []

        if has_unbalanced_parens(leaf):
            issues.append(f"Unbalancierte Klammer in Rubrik: „{leaf}“")
        if parent and has_unbalanced_parens(parent):
            issues.append(f"Unbalancierte Klammer in Oberrubrik: „{parent}“")
        if not rems:
            issues.append("Leere Mittel-Liste")
        else:
            weird = [
                rem.get("name", "")
                for rem in rems
                if not rem.get("name") or len(rem.get("name", "")) > 24 or re.search(r"[\d,;()]", rem.get("name", ""))
            ]
            if weird:
                issues.append(f"Ungewöhnliche Mittel-Einträge: {', '.join(weird[:5])}")

        if issues:
            boericke_issues[fp] = issues

    return boericke_issues


def main() -> None:
    raw_txt = RAW_POINTS_TXT.read_text(encoding="utf-8")
    blocks = parse_raw_point_blocks(raw_txt)

    with SIMILAPUNKTUR_JSON.open(encoding="utf-8") as f:
        points = json.load(f)

    with BOERICKE_JSON.open(encoding="utf-8") as f:
        boericke = json.load(f)

    points_audit = audit_points(points, blocks)
    boericke_issues = audit_boericke(boericke.get("rubrics", []))

    status_counts = {"ok": 0, "warning": 0, "error": 0}
    for item in points_audit.values():
        status_counts[item["status"]] = status_counts.get(item["status"], 0) + 1

    audit_payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "summary": {
            "total_points": len(points),
            "parsed_raw_blocks": len(blocks),
            "points_status": status_counts,
            "total_boericke_rubrics": len(boericke.get("rubrics", [])),
            "boericke_issue_count": len(boericke_issues),
        },
        "points_audit": points_audit,
        "boericke_issues": boericke_issues,
    }

    with OUTPUT_AUDIT_JSON.open("w", encoding="utf-8") as f:
        json.dump(audit_payload, f, ensure_ascii=False, separators=(",", ":"))

    print(f"Generated {OUTPUT_AUDIT_JSON.name}:")
    print(f"  Points: {len(points)} | Raw blocks: {len(blocks)} | Status: {status_counts}")
    print(f"  Boericke rubrics with issues: {len(boericke_issues)} / {len(boericke.get('rubrics', []))}")


if __name__ == "__main__":
    main()
