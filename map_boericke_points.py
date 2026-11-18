"""
map_boericke_points.py
Option A: Strict Indication & Effect mapping (similapunktur.json + synonyms.json)
with polarity/negation protection and whole-word boundary matching.
Excludes assigned_homeopathics (remedy intersection).
"""

import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent
BOERICKE_PATH = ROOT / "frontend" / "public" / "boericke_repertory.json"
OUT_BOERICKE_PATH = ROOT / "out" / "boericke_repertory.json"
POINTS_PATH = ROOT / "frontend" / "public" / "similapunktur.json"
SYNONYMS_PATH = ROOT / "frontend" / "public" / "synonyms.json"

STOPWORDS = {
    "und", "oder", "bei", "mit", "durch", "nach", "vor", "von", "zu", "zum", "zur",
    "im", "in", "am", "an", "auf", "aus", "der", "die", "das", "des", "den", "dem",
    "ein", "eine", "einer", "eines", "als", "wie", "auch", "sowie", "besonders",
    "allgemeine", "allgemein", "funktionelle", "chronische", "akute", "starke",
    "schmerzen", "schmerz", "beschwerden", "störungen", "störung", "zustand",
    "zustände", "gefühl", "neigung", "folge", "folgen", "üble", "agg", "amel",
    "während", "unter", "über", "bis", "hin", "sehr", "viel", "wenig", "ohne",
    "nicht", "gegen", "zwischen", "innerhalb", "äußerlich", "innerlich",
    "große", "großer", "großes", "großen", "kleine", "kleiner", "kleines", "kleinen",
    "selten", "häufig", "viele", "vieles", "mehr", "weniger", "stark", "leicht",
    "reguliert", "stärkt", "beseitigt", "löst", "lindert", "fördert", "beruhigt",
    "tonisiert", "klärt", "bewegt", "öffnet", "senkt", "hebt", "leitet"
}

NEGATION_WORDS = {
    "ohne", "kein", "keine", "keinen", "keinem", "mangel", "mangelnd", "mangelnde",
    "fehlend", "fehlende", "vermindert", "verminderte", "unterdrückt", "unfähig",
    "abneigung", "widerwillen", "verlust"
}

MAX_POINTS_PER_RUBRIC = 6


def normalize(text: str, keep_parens_content: bool = True) -> str:
    t = text.lower().strip()
    if not keep_parens_content:
        t = re.sub(r"\(.*?\)", " ", t)
    t = re.sub(r"[^a-zäöüß0-9\s-]", " ", t)
    return re.sub(r"\s+", " ", t).strip()


def tokenize(text: str) -> list[str]:
    norm = normalize(text, keep_parens_content=True)
    return [w for w in re.split(r"[\s-]+", norm) if len(w) >= 4 and w not in STOPWORDS]


def has_negation_polarity(text: str) -> bool:
    norm = normalize(text, keep_parens_content=True)
    words = set(re.split(r"[\s-]+", norm))
    if words & NEGATION_WORDS:
        return True
    if any(w.endswith(("los", "losigkeit")) for w in words):
        return True
    return False


def contains_whole_phrase(haystack: str, needle: str) -> bool:
    if not haystack or not needle or needle not in haystack:
        return False
    pattern = r"(?<![a-zäöüß0-9])" + re.escape(needle) + r"(?![a-zäöüß0-9])"
    return re.search(pattern, haystack) is not None


def main() -> None:
    with BOERICKE_PATH.open(encoding="utf-8") as f:
        boericke = json.load(f)
    with POINTS_PATH.open(encoding="utf-8") as f:
        points = json.load(f)
    with SYNONYMS_PATH.open(encoding="utf-8") as f:
        synonyms = json.load(f)

    # Build reverse synonym lookup
    syn_groups: dict[str, set[str]] = {}
    for k, vals in synonyms.items():
        group = {k.lower()} | {v.lower() for v in vals}
        for term in group:
            if len(term) >= 4 and term not in STOPWORDS:
                syn_groups.setdefault(term, set()).update(group)

    # 1. Index Boericke rubrics
    rubrics = boericke["rubrics"]
    rubric_data = []
    for idx, r in enumerate(rubrics):
        leaf = r.get("rubric", "")
        parent = r.get("parent_rubric", "")
        norm_leaf = normalize(leaf, keep_parens_content=False)
        norm_leaf_full = normalize(leaf, keep_parens_content=True)
        leaf_tokens = set(tokenize(leaf))
        parent_tokens = set(tokenize(parent))
        all_tokens = leaf_tokens | parent_tokens
        rubric_data.append({
            "idx": idx,
            "norm_leaf": norm_leaf,
            "norm_leaf_full": norm_leaf_full,
            "leaf_tokens": leaf_tokens,
            "all_tokens": all_tokens,
            "neg_polarity": has_negation_polarity(f"{parent} {leaf}"),
        })

    # 2. Map point indications & effects -> Boericke rubrics (strict, no remedy intersection)
    # rubric_idx -> point_id -> {"ind_score": int, "eff_score": int, "reason": str, "best_score": int}
    matches_per_rubric: dict[int, dict[str, dict]] = defaultdict(dict)

    for p in points:
        pid = p["point_id"]
        sources: list[tuple[str, str]] = []
        for ind in p.get("indications", []):
            sources.append(("Indikation", ind))
        for eff in p.get("effects", []):
            sources.append(("Wirkung", eff))

        for kind, raw_text in sources:
            subphrases = [s.strip() for s in re.split(r"[,;:.]", raw_text) if len(s.strip()) >= 4]
            for phrase in subphrases:
                norm_phrase = normalize(phrase, keep_parens_content=False)
                if len(norm_phrase) < 4:
                    continue
                p_tokens = tokenize(phrase)
                if not p_tokens:
                    continue
                p_neg = has_negation_polarity(phrase)

                candidates: list[tuple[int, int, bool]] = []  # (r_idx, score, is_exact_leaf)
                for rd in rubric_data:
                    # Polarity / negation guard: never match positive term to negated rubric or vice versa
                    if p_neg != rd["neg_polarity"]:
                        continue

                    score = 0
                    is_exact_leaf = False

                    if rd["norm_leaf"] == norm_phrase or rd["norm_leaf_full"] == norm_phrase:
                        score = 20
                        is_exact_leaf = True
                    elif contains_whole_phrase(rd["norm_leaf"], norm_phrase) or contains_whole_phrase(rd["norm_leaf_full"], norm_phrase):
                        score = 15
                        is_exact_leaf = True
                    elif len(rd["norm_leaf"]) >= 5 and contains_whole_phrase(norm_phrase, rd["norm_leaf"]):
                        score = 13
                        is_exact_leaf = True
                    else:
                        leaf_hits = 0
                        all_hits = 0
                        for t in p_tokens:
                            syns = syn_groups.get(t, ())
                            in_leaf = t in rd["leaf_tokens"] or any(s in rd["leaf_tokens"] for s in syns)
                            in_all = in_leaf or t in rd["all_tokens"] or any(s in rd["all_tokens"] for s in syns)
                            if in_leaf:
                                leaf_hits += 1
                            if in_all:
                                all_hits += 1

                        if leaf_hits == 0:
                            continue

                        if leaf_hits == len(p_tokens) and len(p_tokens) >= 1:
                            score = 10 + leaf_hits
                        elif all_hits == len(p_tokens) and leaf_hits >= 1:
                            score = 7 + leaf_hits * 2
                        elif leaf_hits >= 2:
                            score = 6 + leaf_hits
                        elif all_hits >= 2 and leaf_hits >= 1:
                            score = 4 + all_hits + leaf_hits

                    if score >= 6:
                        candidates.append((rd["idx"], score, is_exact_leaf))

                if candidates:
                    candidates.sort(key=lambda x: (-int(x[2]), -x[1]))
                    kept = [c for c in candidates if c[2]]
                    non_exact = [c for c in candidates if not c[2]][:6]
                    for r_idx, sc, _ in kept + non_exact:
                        entry = matches_per_rubric[r_idx].get(pid)
                        if entry is None:
                            entry = {"ind_score": 0, "eff_score": 0, "best_score": 0, "reason": ""}
                            matches_per_rubric[r_idx][pid] = entry
                        if kind == "Indikation" and sc > entry["ind_score"]:
                            entry["ind_score"] = sc
                        elif kind == "Wirkung" and sc > entry["eff_score"]:
                            entry["eff_score"] = sc
                        if sc > entry["best_score"]:
                            entry["best_score"] = sc
                            entry["reason"] = f"{kind}: {phrase}"

    # 3. Write top 6 points per rubric
    rubrics_with_points = 0
    for idx, r in enumerate(rubrics):
        pt_map = matches_per_rubric.get(idx)
        if not pt_map:
            r.pop("points", None)
            continue

        merged: list[dict] = []
        for pid, info in pt_map.items():
            has_ind = info["ind_score"] > 0
            has_eff = info["eff_score"] > 0
            if has_ind and has_eff:
                source = "both"
                total = info["ind_score"] + info["eff_score"]
            elif has_ind:
                source = "indication"
                total = info["ind_score"]
            else:
                source = "effect"
                total = info["eff_score"]
            merged.append({
                "id": pid,
                "score": total,
                "source": source,
                "reason": info["reason"],
            })

        merged.sort(key=lambda x: (-x["score"], x["id"]))
        r["points"] = merged[:MAX_POINTS_PER_RUBRIC]
        rubrics_with_points += 1

    with BOERICKE_PATH.open("w", encoding="utf-8") as f:
        json.dump(boericke, f, ensure_ascii=False, separators=(",", ":"))

    if OUT_BOERICKE_PATH.parent.exists():
        with OUT_BOERICKE_PATH.open("w", encoding="utf-8") as f:
            json.dump(boericke, f, ensure_ascii=False, separators=(",", ":"))

    total_r = len(rubrics)
    print(f"Mapped {rubrics_with_points}/{total_r} rubrics ({rubrics_with_points/total_r*100:.1f}%) [Option A: indications + effects only]")


if __name__ == "__main__":
    main()
