import os
import re
import json
import sqlite3
import urllib.request
import urllib.parse
import time
import sys

DB_PATH = "out/similapunktur.db"
OUTPUT_JSON_OUT = "out/synonyms.json"
OUTPUT_JSON_PUBLIC = "frontend/public/synonyms.json"

# Pre-seeded dictionary of common German medical and general symptom synonyms
# This minimizes API calls and ensures high-quality mappings for core terms.
PRE_SEEDED_SYNONYMS = {
    "kopfschmerz": ["kopfschmerzen", "kopfweh", "schädelweh", "cephalaea", "cephalgie", "migräne", "brummschädel"],
    "kopfschmerzen": ["kopfschmerz", "kopfweh", "schädelweh", "cephalaea", "cephalgie", "migräne", "brummschädel"],
    "kopfweh": ["kopfschmerz", "kopfschmerzen", "schädelweh", "cephalaea", "cephalgie", "migräne", "brummschädel"],
    "migräne": ["kopfschmerz", "kopfschmerzen", "kopfweh", "cephalgie"],
    
    "schlaflosigkeit": ["schlafstörung", "schlafstörungen", "insomnie", "einschlafstörung", "einschlafstörungen", "durchschlafstörung", "durchschlafstörungen", "hyposomnie", "schlaflos"],
    "schlafstörung": ["schlaflosigkeit", "schlafstörungen", "insomnie", "hyposomnie", "schlaflos"],
    "schlafstörungen": ["schlaflosigkeit", "schlafstörung", "insomnie", "hyposomnie", "schlaflos"],
    "insomnie": ["schlaflosigkeit", "schlafstörung", "schlafstörungen"],
    
    "angst": ["ängste", "angstzustand", "angstzustände", "furcht", "panik", "phobie", "prüfungsangst", "lampenfieber", "beklemmung", "zukunftsangst", "zukunftsängste"],
    "ängste": ["angst", "angstzustand", "angstzustände", "furcht", "panik", "prüfungsangst"],
    "angstzustände": ["angst", "ängste", "angstzustand", "furcht", "panik", "beklemmung"],
    "furcht": ["angst", "ängste", "panik"],
    "panik": ["angst", "furcht", "panikattacke"],
    
    "depression": ["depressionen", "depressiv", "schwermut", "traurigkeit", "melancholie", "niedergeschlagenheit", "antriebslosigkeit", "antriebsschwäche", "traurig"],
    "depressionen": ["depression", "depressiv", "schwermut", "traurigkeit", "melancholie", "niedergeschlagenheit"],
    "depressiv": ["depression", "schwermut", "traurigkeit", "melancholie"],
    "antriebslosigkeit": ["antriebsschwäche", "depression", "schwäche", "abgeschlagenheit"],
    
    "durchfall": ["diarrhoe", "diarrhö", "enteritis", "darmkatarrh", "flüssiger stuhl"],
    "diarrhoe": ["durchfall", "diarrhö", "enteritis", "darmkatarrh"],
    "diarrhö": ["durchfall", "diarrhoe", "enteritis"],
    
    "verstopfung": ["obstipation", "darmträgheit", "stuhlgangschwierigkeiten"],
    "obstipation": ["verstopfung", "darmträgheit"],
    
    "erbrechen": ["übelkeit", "nausea", "brechreiz", "emesis", "unwohlsein", "brechen"],
    "übelkeit": ["erbrechen", "nausea", "brechreiz", "unwohlsein"],
    "nausea": ["erbrechen", "übelkeit", "brechreiz"],
    
    "husten": ["bronchitis", "hustenreiz", "reizhusten", "tussis", "hustenanfall"],
    "bronchitis": ["husten", "hustenreiz", "bronchialkatarrh"],
    
    "schnupfen": ["rhinitis", "nasenlaufen", "verstopfte nase", "koryza"],
    "rhinitis": ["schnupfen", "nasenlaufen", "verstopfte nase"],
    
    "fieber": ["pyrexie", "erhöhte temperatur", "febril", "fiebrig"],
    
    "müdigkeit": ["schwäche", "erschöpfung", "fatigue", "abgeschlagenheit", "kraftlosigkeit", "ermüdung", "schlapp"],
    "schwäche": ["müdigkeit", "erschöpfung", "fatigue", "abgeschlagenheit", "kraftlosigkeit", "asthenie"],
    "erschöpfung": ["müdigkeit", "schwäche", "fatigue", "abgeschlagenheit", "kraftlosigkeit"],
    
    "schwindel": ["vertigo", "schwindelgefühl", "taumel", "benommenheit"],
    "vertigo": ["schwindel", "schwindelgefühl"],
    
    "bluthochdruck": ["hypertonie", "hoher blutdruck", "hypertonus"],
    "hypertonie": ["bluthochdruck", "hoher blutdruck", "hypertonus"],
    "hoher blutdruck": ["bluthochdruck", "hypertonie"],
    
    "niedriger blutdruck": ["hypotonie", "hypotonus"],
    "hypotonie": ["niedriger blutdruck", "hypotonus"],
    
    "rheuma": ["arthritis", "arthrose", "gelenkschmerzen", "gelenkschmerz", "gicht", "gelenkentzündung"],
    "arthritis": ["rheuma", "arthrose", "gelenkschmerzen", "gelenkentzündung"],
    "arthrose": ["rheuma", "arthritis", "gelenkschmerzen"],
    
    "zahnschmerzen": ["zahnschmerz", "dentalgie", "zahnweh"],
    "zahnschmerz": ["zahnschmerzen", "dentalgie", "zahnweh"],
    
    "ohrenschmerzen": ["ohrenschmerz", "otitis", "ohrenentzündung", "ohrenweh"],
    "ohrenschmerz": ["ohrenschmerzen", "otitis", "ohrenentzündung"],
    
    "halsschmerzen": ["halsschmerz", "rachenentzündung", "mandelentzündung", "tonsillitis", "schluckbeschwerden", "halsweh", "pharyngitis"],
    "halsschmerz": ["halsschmerzen", "rachenentzündung", "mandelentzündung", "tonsillitis", "schluckbeschwerden"],
    
    "herzklopfen": ["palpitationen", "herzrasen", "arrhythmie", "tachykardie", "herzrhythmusstörungen", "herzrhythmusstörung"],
    "herzrasen": ["herzklopfen", "palpitationen", "arrhythmie", "tachykardie"],
    
    "krämpfe": ["spasmen", "krampf", "spasmus", "konvulsionen", "bauchkrämpfe", "muskelkrämpfe", "krampfartig"],
    "spasmen": ["krämpfe", "krampf", "spasmus", "konvulsionen"],
    
    "blähungen": ["meteorismus", "flatulenz", "bauchwind", "trommelbauch"],
    "sodbrennen": ["reflux", "saures aufstoßen"],
    "heiserkeit": ["dysphonie", "stimmlosigkeit"],
    
    "juckreiz": ["pruritus", "jucken", "juckende haut"],
    "jucken": ["juckreiz", "pruritus", "juckende haut"],
    
    "ekzem": ["dermatitis", "ausschlag", "hautausschlag", "flechten"],
    "ausschlag": ["ekzem", "dermatitis", "hautausschlag"],
    
    "asthma": ["atemnot", "dyspnoe", "kurzatmigkeit", "schweratmigkeit", "atembeklemmung", "luftnot"],
    "atemnot": ["asthma", "dyspnoe", "kurzatmigkeit", "schweratmigkeit", "atembeklemmung", "luftnot"],
    
    "wechseljahre": ["klimakterium", "hitzewallungen", "abänderung"],
    "klimakterium": ["wechseljahre", "hitzewallungen"],
    
    "menstruationsbeschwerden": ["regelschmerzen", "dysmenorrhoe", "dysmenorrhö", "regelbeschwerden", "menstruationsstörungen", "regelstörungen", "mensesbeschwerden"],
    "regelschmerzen": ["menstruationsbeschwerden", "dysmenorrhoe", "dysmenorrhö", "regelbeschwerden"],
    
    "lähmung": ["lähmungen", "parese", "paresen", "paralyse", "teillähmung", "teillähmungen"],
    "lähmungen": ["lähmung", "parese", "paresen", "paralyse", "teillähmung", "teillähmungen"],
    "parese": ["lähmung", "lähmungen", "paresen", "paralyse", "teillähmung"],
    "paresen": ["lähmung", "lähmungen", "parese", "paralyse", "teillähmungen"],
    
    "hexenschuss": ["lumbago", "lumbalgie", "rückenschmerzen", "rückenweh", "kreuzschmerzen", "kreuzweh"],
    "lumbago": ["hexenschuss", "lumbalgie", "rückenschmerzen", "rückenweh", "kreuzschmerzen"],
    
    "allergie": ["allergien", "überempfindlichkeit", "überempfindlichkeitsreaktion"],
    "allergien": ["allergie", "überempfindlichkeit"],
    
    "unruhe": ["nervosität", "rastlosigkeit", "hibbeligkeit", "aufgeregtheit"],
    "nervosität": ["unruhe", "rastlosigkeit"],
    
    "appetitlosigkeit": ["anorexie", "kein appetit"],
    "kälte": ["frösteln", "frieren", "kältegefühl", "frost"],
    
    "schwellung": ["ödem", "ödeme", "wasseransammlung", "geschwulst"],
    "ödem": ["schwellung", "ödeme", "wasseransammlung"],
    "ödeme": ["schwellung", "ödem", "wasseransammlung"],
    
    "blasenentzündung": ["cystitis", "zystitis", "harnwegsinfekt"],
    "bindehautentzündung": ["konjunktivitis", "augenrötung"],
    "apoplexie": ["schlaganfall", "hirnschlag", "apoplektischer insult"],
    "schlaganfall": ["apoplexie", "hirnschlag", "apoplektischer insult"]
}

# Stopwords and structural terms that shouldn't be queried or mapped
EXCLUDED_WORDS = {
    "akute", "akuten", "akuter", "alle", "allen", "aller", "allgemein", "allgemeine", "allgemeines",
    "bereich", "bereichen", "leitbahn", "leitbahnen", "meisterpunkt", "hauptpunkt", "wirkung", "wirkungen",
    "sämtliche", "sämtlichen", "alarmpunkt", "verbindung", "therapiepunkt", "lokalpunkt", "spezifischer",
    "wichtiger", "maximalpunkt", "vanmann", "nach", "auf", "unter", "über", "hinter", "vor", "neben",
    "durch", "gegen", "ohne", "mit", "vom", "beim", "zur", "zum", "der", "die", "das", "ein", "eine",
    "und", "oder", "bei", "für", "wie", "als", "ist", "sind", "chronische", "chronischen", "chronischer",
    "starke", "starken", "starker", "besonders", "insbesondere", "oft", "schon", "sehr", "diagnose",
    "therapie", "wirkt", "reguliert", "beseitigt", "lindert", "fördert", "beruhigt", "regt", "tonisiert"
}

def clean_word(word: str) -> str:
    # Remove punctuation
    word = re.sub(r'[^\w\s-]', '', word)
    return word.strip().lower()

def get_synonyms_from_api(word: str) -> list:
    """Fetch synonyms from OpenThesaurus API."""
    encoded = urllib.parse.quote(word)
    url = f"https://www.openthesaurus.de/synonyme/search?q={encoded}&format=application/json"
    req = urllib.request.Request(url, headers={'User-Agent': 'SimilapunkturApp/1.0 (contact: info@naturheilpraxis-maier.de)'})
    
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            synonyms = set()
            if 'synsets' in data:
                for synset in data['synsets']:
                    for term_obj in synset['terms']:
                        term = term_obj['term']
                        cleaned = clean_word(term)
                        # Avoid multi-word terms unless they are common phrases, keep it simple
                        if cleaned and cleaned != word.lower() and len(cleaned) > 2:
                            synonyms.add(cleaned)
            return list(synonyms)
    except Exception as e:
        sys.stderr.write(f"Error fetching synonyms for '{word}': {e}\n")
        return []

def extract_nouns_from_db():
    """Extract capitalized words that appear multiple times in the DB."""
    if not os.path.exists(DB_PATH):
        raise FileNotFoundError(f"Database not found at {DB_PATH}")
        
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT beschreibung FROM wirkungen")
    w = [r[0] for r in cursor.fetchall() if r[0]]
    cursor.execute("SELECT DISTINCT beschreibung FROM indikationen")
    i = [r[0] for r in cursor.fetchall() if r[0]]
    conn.close()
    
    all_desc = list(set(w + i))
    
    word_counts = {}
    for desc in all_desc:
        # Match words keeping case
        w_list = re.findall(r'[a-zA-ZäöüÄÖÜßéèàáíóúñ]+', desc)
        for word in w_list:
            if word[0].isupper() and len(word) > 2:
                word_counts[word] = word_counts.get(word, 0) + 1
                
    # Filter words appearing >= 3 times, and not in excluded list
    target_words = []
    for word, count in word_counts.items():
        lower = word.lower()
        if count >= 3 and lower not in EXCLUDED_WORDS:
            target_words.append((word, count))
            
    # Sort by count descending
    target_words.sort(key=lambda x: x[1], reverse=True)
    return target_words

def build_synonyms_map():
    print("Extracting nouns from database...")
    db_nouns = extract_nouns_from_db()
    print(f"Found {len(db_nouns)} candidate nouns appearing >= 3 times in the database.")
    
    # Initialize synonym map with our high-quality pre-seeded dict
    synonyms_map = {}
    for k, v in PRE_SEEDED_SYNONYMS.items():
        synonyms_map[k] = list(set(v))
        
    # We will limit API queries to avoid excessively long runs.
    # Query the top 120 nouns from the database that are not already pre-seeded.
    words_to_query = []
    for word, count in db_nouns:
        lower_word = word.lower()
        if lower_word not in synonyms_map and lower_word not in EXCLUDED_WORDS:
            words_to_query.append(word)
            
    print(f"Selected {len(words_to_query)} words to query from OpenThesaurus API...")
    
    # We only query the top 60 words to keep it very fast and within rate limits (~1.1 minutes)
    words_to_query = words_to_query[:60]
    
    for idx, word in enumerate(words_to_query):
        print(f"[{idx+1}/{len(words_to_query)}] Querying synonyms for '{word}'...")
        api_syns = get_synonyms_from_api(word)
        if api_syns:
            lower_word = word.lower()
            synonyms_map[lower_word] = api_syns
            print(f"  Found synonyms: {api_syns}")
        # Sleep to strictly respect rate limit of 60 req/min
        time.sleep(1.2)
        
    # Make the synonym relations bidirectional and symmetrical
    print("Making synonym relationships symmetrical...")
    expanded_map = {}
    for word, syn_list in synonyms_map.items():
        all_words = set([word] + syn_list)
        for w in all_words:
            if w not in expanded_map:
                expanded_map[w] = set()
            expanded_map[w].update(all_words - {w})
            
    # Convert sets back to sorted lists
    final_map = {k: sorted(list(v)) for k, v in expanded_map.items()}
    
    # Ensure directories exist
    os.makedirs(os.path.dirname(OUTPUT_JSON_OUT), exist_ok=True)
    os.makedirs(os.path.dirname(OUTPUT_JSON_PUBLIC), exist_ok=True)
    
    # Write to file
    with open(OUTPUT_JSON_OUT, "w", encoding="utf-8") as f:
        json.dump(final_map, f, ensure_ascii=False, indent=2)
    print(f"Saved synonym map to {OUTPUT_JSON_OUT} ({len(final_map)} entries)")
    
    with open(OUTPUT_JSON_PUBLIC, "w", encoding="utf-8") as f:
        json.dump(final_map, f, ensure_ascii=False, indent=2)
    print(f"Saved synonym map to {OUTPUT_JSON_PUBLIC}")

if __name__ == "__main__":
    build_synonyms_map()
