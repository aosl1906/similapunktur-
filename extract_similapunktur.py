import os
import re
import json
import sqlite3
import cv2
import numpy as np

def load_valid_remedies():
    whitelist = {}
    # Check both potential paths
    paths = ['boericke_materia_medica.json', 'out/boericke_materia_medica.json']
    for path in paths:
        if os.path.exists(path):
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    boericke = json.load(f)
                    for k in boericke.keys():
                        standard_name = k if k.endswith('.') else k + '.'
                        whitelist[standard_name.lower().rstrip('.')] = standard_name
                break
            except Exception as e:
                import sys
                print(f"Warning: Failed to load {path}: {e}", file=sys.stderr)

    # Additional verified remedy abbreviations from Maier-Similapunkte.txt
    additional = {
        'absin': 'Absin.',
        'aml-n': 'Aml-n.',
        'ant-ars': 'Ant-ars.',
        'ant-i': 'Ant-i.',
        'ant-s-aur': 'Ant-s-aur.',
        'apom': 'Apom.',
        'arg': 'Arg.',
        'arist-cl': 'Arist-cl.', 
        'arund': 'Arund.',
        'atrop': 'Atrop.',
        'aven': 'Aven.',
        'cholest': 'Cholest.',
        'crag': 'Crag.',
        'crot-c': 'Crot-c.',
        'cupr-ac': 'Cupr-ac.',
        'cyt-l': 'Cyt-l.', 
        'dol': 'Dol.',
        'echi': 'Echi.',
        'eupi': 'Eupi.',
        'ferr-ar': 'Ferr-ar.',
        'ferr-met': 'Ferr-met.',
        'form-ac': 'Form-ac.',
        'guai': 'Guai.',
        'harp': 'Harp.', 
        'jug-r': 'Jug-r.',
        'juni-c': 'Juni-c.',
        'lith-c': 'Lith-c.',
        'lol': 'Lol.',
        'luffa': 'Luffa.',
        'lycps': 'Lycps.',
        'magn-gr': 'Magn-gr.',
        'melil': 'Melil.',
        'merc-cy': 'Merc-cy.',
        'merc-bi': 'Merc-bi.',
        'mom-b': 'Mom-b.',
        'okoub': 'Okoub.',
        'passif': 'Passif.',
        'pix': 'Pix.',
        'plb-act': 'Plb-act.',
        'plb-i': 'Plb-i.', 
        'prun-s': 'Prun-s.',
        'quas': 'Quas.',
        'quass': 'Quass.',
        'selen': 'Selen.',
        'spirae': 'Spirae.',
        'stront-c': 'Stront-c.',
        'stroph': 'Stroph.',
        'sul-i': 'Sul-i.', 
        'sulf': 'Sulf.',
        'thlaspi': 'Thlaspi.',
        'tril': 'Tril.',
        'zinc-i': 'Zinc-i.'
    }
    for k, v in additional.items():
        whitelist[k] = v
    return whitelist

VALID_REMEDIES_WHITELIST = load_valid_remedies()

CUSTOM_MAPPINGS = {}
if os.path.exists('remedy_mappings.json'):
    try:
        with open('remedy_mappings.json', 'r', encoding='utf-8') as f:
            mapping_data = json.load(f)
            mappings = mapping_data.get('mappings', {})
            # Store lowercase key mapping to the target value
            for k, v in mappings.items():
                CUSTOM_MAPPINGS[k.lower()] = v
        print(f"Loaded {len(CUSTOM_MAPPINGS)} custom remedy mappings.")
    except Exception as e:
        print(f"Warning: Failed to load remedy_mappings.json: {e}")

def normalize_remedy(tok):
    tok = tok.strip('(),; ')
    if not tok:
        return None
    tok_clean = tok.strip('.')
    if not tok_clean:
        return None
    # Skip side indicators and other common non-remedy words in the remedy lists
    if tok_clean.lower() in ['r', 'l', 'usw', 'etc', 'und', 'oder', 'nach', 'v', 'agg', 'amel']:
        return None
    # Standardize remedy name characters (allow letters, hyphens, and slashes if present)
    if not re.match(r'^[A-Za-z\-/]+$', tok_clean):
        return None
        
    # Check custom mappings first (case-insensitive)
    tok_standard_key = (tok_clean + '.').lower()
    if tok_standard_key in CUSTOM_MAPPINGS:
        mapped_val = CUSTOM_MAPPINGS[tok_standard_key]
        if mapped_val is not None:
            return mapped_val
        # If mapped to null, check whitelist first
        tok_lower = tok_clean.lower()
        if tok_lower in VALID_REMEDIES_WHITELIST:
            return VALID_REMEDIES_WHITELIST[tok_lower]
        return to_camel_case(tok_clean)
        
    tok_lower = tok_clean.lower()
    
    # Check against whitelist
    if tok_lower not in VALID_REMEDIES_WHITELIST:
        return None
        
    return VALID_REMEDIES_WHITELIST[tok_lower]

def to_camel_case(name: str) -> str:
    name_clean = name.strip('.')
    if not name_clean:
        return ""
    parts = name_clean.split('-')
    capitalized_parts = [p.capitalize() for p in parts]
    return '-'.join(capitalized_parts) + '.'

def get_remedy_grade(tok_clean: str) -> int:
    if tok_clean.isupper() and len(tok_clean) > 1:
        return 3
    return 1

def get_point_id(full_heading):
    h_clean = full_heading.strip()
    if 'Shishencong' in h_clean:
        return 'EX_1'
    if 'Zervikalzone' in h_clean:
        return 'BL_C_MANN'
    
    m = re.match(r'^([A-Za-z\u00c4\u00d6\u00dc\u00e4\u00f6\u00fc\u00df\-]+)\s+(\d+(?:-\d+)?)', h_clean)
    if m:
        meridian_part = m.group(1)
        num_part = m.group(2).replace('-', '_')
        
        prefix_map = {
            'Herz': 'HE',
            'D\u00fcnndarm': 'SI',
            'Blase': 'BL',
            'Niere': 'KI',
            'Perikard': 'PC',
            'Dreifacherw\u00e4rmer': 'TE',
            'Gallenblase': 'GB',
            'Leber': 'LR',
            'Lunge': 'LU',
            'Dickdarm': 'LI',
            'Magen': 'ST',
            'Milz-Pankreas': 'SP',
            'Konzeptionsgef\u00e4\u00df': 'CV',
            'Lenkergef\u00e4\u00df': 'GV'
        }
        prefix = prefix_map.get(meridian_part, 'EX')
        
        if 'nach Felix Mann' in h_clean or 'Zone nach Felix Mann' in h_clean:
            return f"{prefix}_{num_part}_MANN"
        
        return f"{prefix}_{num_part}"
    
    return 'EX_UNKNOWN'

def is_rubric_name(name):
    if len(name) < 4:
        return False
    if name.endswith('.') and len(name.split()) <= 2:
        return False
    
    clean_name = re.sub(r'\(.*?\)', '', name).strip()
    if not clean_name:
        return False
    
    words = clean_name.split()
    non_remedy_words = 0
    for w in words:
        w_strip = w.strip('.,;:')
        if not w_strip:
            continue
        if len(w_strip) >= 4 or w_strip.lower() in ['und', 'oder', 'der', 'die', 'das', 'von', 'aus', 'mit', 'usw', 'etc', 'bei', 'in', 'f\u00fcr']:
            non_remedy_words += 1
            
    return non_remedy_words >= 1

def smart_join_lines(lines_list):
    joined = []
    for line in lines_list:
        line = line.strip()
        if not line:
            continue
        if not joined:
            joined.append(line)
        else:
            first_char = line[0]
            is_continuation = False
            if first_char.islower() or first_char in [')', ']', '}', '.', ';', ':', ',', '-', '/', '\u201c', '\u201d', '\"']:
                is_continuation = True
            
            prev_line = joined[-1]
            if prev_line.endswith('-'):
                joined[-1] = prev_line[:-1] + line
            elif is_continuation or not prev_line[-1] in ['.', '!', '?']:
                joined[-1] = prev_line + ' ' + line
            else:
                joined.append(line)
    return joined

def parse_point_block(block_lines):
    # Determine the point name and translation
    first_line = block_lines[0]
    if '(' in first_line:
        idx_p = first_line.find('(')
        name_german = first_line[:idx_p].strip(' :')
        name_translation = first_line[idx_p:].strip('() :')
    else:
        name_german = first_line.strip(' :')
        name_translation = None
        
    point_id = get_point_id(first_line)
    
    # Determine meridian
    meridian = 'Extrapunkte'
    if name_german.startswith('Herz'): meridian = 'Herz-Leitbahn'
    elif name_german.startswith('D\u00fcnndarm'): meridian = 'D\u00fcnndarm-Leitbahn'
    elif name_german.startswith('Blase') or name_german.startswith('Zervikalzone'): meridian = 'Blasen-Leitbahn'
    elif name_german.startswith('Niere'): meridian = 'Nieren-Leitbahn'
    elif name_german.startswith('Perikard'): meridian = 'Perikard-Leitbahn'
    elif name_german.startswith('Dreifacherw\u00e4rmer'): meridian = 'Dreifacherw\u00e4rmer-Leitbahn'
    elif name_german.startswith('Gallenblase'): meridian = 'Gallenblasen-Leitbahn'
    elif name_german.startswith('Leber'): meridian = 'Leber-Leitbahn'
    elif name_german.startswith('Lunge'): meridian = 'Lungen-Leitbahn'
    elif name_german.startswith('Dickdarm'): meridian = 'Dickdarm-Leitbahn'
    elif name_german.startswith('Magen'): meridian = 'Magen-Leitbahn'
    elif name_german.startswith('Milz-Pankreas'): meridian = 'Milz-Pankreas-Leitbahn'
    elif name_german.startswith('Konzeptionsgef\u00e4\u00df'): meridian = 'Konzeptionsgef\u00e4\u00df'
    elif name_german.startswith('Lenkergef\u00e4\u00df'): meridian = 'Lenkergef\u00e4\u00df'
    
    # Locate section markers
    tags = [
        ('Lokalisation:', 'localisation'),
        ('Lokalisation', 'localisation'),
        ('Besonderheit:', 'besonderheit'),
        ('Besonderheit', 'besonderheit'),
        ('Wirkung:', 'wirkung'),
        ('Wirkung', 'wirkung'),
        ('Indikationen:', 'indikationen'),
        ('Indikationen', 'indikationen'),
        ('Zugewiesene Hom\u00f6opathika:', 'homoeopathika'),
        ('Zugewiesene Hom\u00f6opathika', 'homoeopathika'),
        ('Rubriken in General Analysis:', 'rubriken'),
        ('Rubriken in General Analysis', 'rubriken'),
        ('Rubriken in der General Analysis:', 'rubriken'),
        ('Rubriken in der General Analysis', 'rubriken'),
        ('Rubriken aus Phatak Repertory:', 'rubriken'),
        ('Rubriken aus Phatak Repertory', 'rubriken'),
        ('Rubriken aus Synoptic Key:', 'rubriken'),
        ('Rubriken aus Synoptic Key', 'rubriken'),
        ('Rubriken:', 'rubriken'),
        ('Rubriken', 'rubriken')
    ]
    
    tag_positions = []
    has_homoeopathika = False
    has_rubriken = False
    
    for line_idx, line in enumerate(block_lines):
        # Filter Word comments
        if 'Kommentiert [' in line:
            continue
            
        found_tag = False
        for tag_str, tag_key in tags:
            if line.startswith(tag_str):
                tag_positions.append((line_idx, tag_str, tag_key))
                if tag_key == 'homoeopathika':
                    has_homoeopathika = True
                if tag_key == 'rubriken':
                    has_rubriken = True
                found_tag = True
                break
                
        # Virtual tag detection for missing General Analysis header
        if not found_tag and has_homoeopathika and not has_rubriken:
            if ':' in line:
                potential_name = line.split(':', 1)[0].strip()
                if is_rubric_name(potential_name):
                    tag_positions.append((line_idx, "", 'rubriken'))
                    has_rubriken = True
                    
    tag_positions.sort()
    
    sections = {}
    for i, (line_idx, tag_str, tag_key) in enumerate(tag_positions):
        start_content = line_idx
        end_content = tag_positions[i+1][0] if i+1 < len(tag_positions) else len(block_lines)
        
        content_lines = block_lines[start_content:end_content]
        # Remove the tag itself from the first line
        content_lines[0] = content_lines[0][len(tag_str):].strip().lstrip(':').strip()
        # Clean lines
        content_lines = [l.strip() for l in content_lines if l.strip() and 'Kommentiert [' not in l]
        
        if tag_key in sections:
            sections[tag_key].extend(content_lines)
        else:
            sections[tag_key] = content_lines
            
    # Process fields
    localisation_text = ' '.join(sections.get('localisation', []))
    localisation_text = re.sub(r'\s+', ' ', localisation_text).strip()
    
    # Add Besonderheit to effect/localisation or keep separate
    besonderheit_text = ' '.join(sections.get('besonderheit', []))
    if besonderheit_text:
        sections.setdefault('wirkung', []).insert(0, f"Besonderheit: {besonderheit_text}")
        
    effects = smart_join_lines(sections.get('wirkung', []))
    
    # Process indications: join and split by dot
    raw_ind_text = ' '.join(sections.get('indikationen', []))
    raw_ind_text = re.sub(r'\s+', ' ', raw_ind_text).strip()
    indications_raw = re.split(r'\.\s*', raw_ind_text)
    indications = []
    for ind in indications_raw:
        ind_clean = ind.strip()
        if ind_clean and ind_clean not in ['?', '.']:
            indications.append(ind_clean)
            
    # Homeopathics: extract all tokens
    raw_hom_text = ' '.join(sections.get('homoeopathika', []))
    hom_tokens = raw_hom_text.split()
    assigned_homeopathics = []
    seen_hom = set()
    for tok in hom_tokens:
        norm = normalize_remedy(tok)
        if norm and norm not in seen_hom:
            assigned_homeopathics.append(norm)
            seen_hom.add(norm)
            
    warning = None
    for line in block_lines:
        if 'cave:' in line.lower() or '(cave:' in line.lower():
            warning = line.strip()
            break
            
    # Rubrics
    rubrics = []
    rubric_lines = sections.get('rubriken', [])
    
    # Pre-process rubric_lines to merge wrapped lines (where colon appears on next line, or parentheses are unbalanced)
    merged_rubric_lines = []
    i = 0
    while i < len(rubric_lines):
        line = rubric_lines[i].strip()
        if not line:
            i += 1
            continue
            
        while (i + 1 < len(rubric_lines) and 
               ':' not in line and 
               ':' in rubric_lines[i+1]):
            next_line = rubric_lines[i+1].strip()
            next_parts = next_line.split(':', 1)
            potential_combined = line + " " + next_parts[0]
            if is_rubric_name(potential_combined) or line.count('(') > line.count(')'):
                line = line + " " + next_line
                i += 1
            else:
                break
        merged_rubric_lines.append(line)
        i += 1
        
    def deduplicate_rubric_remedies(rems):
        deduped = {}
        for r in rems:
            name = r['name']
            grade = r['grade']
            if name not in deduped or grade > deduped[name]:
                deduped[name] = grade
        return [{"name": name, "grade": grade} for name, grade in deduped.items()]

    current_rubric_name = None
    current_remedies = []
    
    for line in merged_rubric_lines:
        if 'Kommentiert [' in line:
            continue
        if ':' in line:
            parts = line.split(':', 1)
            potential_name = parts[0].strip()
            remedies_text = parts[1].strip()
            
            if is_rubric_name(potential_name):
                if current_rubric_name:
                    rubrics.append({
                        "rubric_name": current_rubric_name,
                        "remedies": deduplicate_rubric_remedies(current_remedies)
                    })
                current_rubric_name = potential_name
                current_remedies = []
                line_remedies = remedies_text
            else:
                line_remedies = line
        else:
            line_remedies = line
            
        tokens = line_remedies.split()
        for tok in tokens:
            tok_stripped = tok.strip('(),; ')
            tok_clean = tok_stripped.strip('.')
            if not tok_clean:
                continue
            norm = normalize_remedy(tok)
            if norm:
                grade = get_remedy_grade(tok_clean)
                current_remedies.append({
                    "name": norm,
                    "grade": grade
                })
                
    if current_rubric_name:
        rubrics.append({
            "rubric_name": current_rubric_name,
            "remedies": deduplicate_rubric_remedies(current_remedies)
        })
        
    return {
        "point_id": point_id,
        "name_german": name_german,
        "name_translation": name_translation,
        "meridian": meridian,
        "localisation_text": localisation_text,
        "effects": effects,
        "indications": indications,
        "assigned_homeopathics": assigned_homeopathics,
        "general_analysis_rubrics": rubrics,
        "precautions_or_contraindications": warning
    }

def main():
    print("Reading Maier-Similapunkte.txt...")
    text = open('Maier-Similapunkte.txt', encoding='utf-8').read()
    lines = [l.strip() for l in text.split('\n') if not l.strip().startswith('--- PAGE')]
    
    heading_indices = []
    for idx, line in enumerate(lines):
        if line.startswith('Lokalisation:'):
            j = idx - 1
            while j >= 0 and not lines[j]:
                j -= 1
            if j >= 0:
                heading_indices.append(j)
                
    heading_indices = sorted(list(set(heading_indices)))
    print(f"Detected {len(heading_indices)} point blocks in text.")
    
    points_data = []
    for i, idx in enumerate(heading_indices):
        next_idx = heading_indices[i+1] if i+1 < len(heading_indices) else len(lines)
        block_lines = lines[idx:next_idx]
        parsed = parse_point_block(block_lines)
        points_data.append(parsed)
        
    print(f"Successfully parsed {len(points_data)} points.")
    
    detected_coords = {}
    if os.path.exists('detected_coords_cropped.json'):
        detected_coords = json.loads(open('detected_coords_cropped.json').read())
        print("Loaded cropped coordinates from detected_coords_cropped.json.")
        
    meridian_images = {
        'HE': 'meridian_herz.png',
        'SI': 'meridian_duenndarm.png',
        'BL': 'meridian_blase.png',
        'KI': 'meridian_niere.png',
        'PC': 'meridian_perikard.png',
        'TE': 'meridian_dreifacherwaermer.png',
        'GB': 'meridian_gallenblase.png',
        'LR': 'meridian_leber.png',
        'LU': 'meridian_lunge.png',
        'LI': 'meridian_dickdarm.png',
        'ST': 'meridian_magen.png',
        'SP': 'meridian_milz_pankreas.png',
        'CV': 'meridian_konzeptionsgefaess.png',
        'GV': 'meridian_lenkergefaess.png',
        'EX': 'meridian_lenkergefaess.png'
    }
    
    points_by_meridian = {}
    for p in points_data:
        prefix = p['point_id'].split('_')[0]
        points_by_meridian.setdefault(prefix, []).append(p)
        
    for prefix, pts in points_by_meridian.items():
        def get_sort_key(p):
            m = re.search(r'_(\d+)', p['point_id'])
            if m:
                return (int(m.group(1)), 0)
            return (999, p['point_id'])
            
        pts.sort(key=get_sort_key)
        
        meridian_name_map = {
            'HE': 'herz', 'SI': 'duenndarm', 'BL': 'blase', 'KI': 'niere',
            'PC': 'perikard', 'TE': 'dreifacherwaermer', 'GB': 'gallenblase',
            'LR': 'leber', 'LU': 'lunge', 'LI': 'dickdarm', 'ST': 'magen',
            'SP': 'milz_pankreas', 'CV': 'konzeptionsgefaess', 'GV': 'lenkergefaess',
            'EX': 'lenkergefaess'
        }
        m_name = meridian_name_map.get(prefix, 'lenkergefaess')
        candidates = detected_coords.get(m_name, [])
        
        num_pts = len(pts)
        num_cand = len(candidates)
        
        print(f"Meridian {prefix} ({m_name}): {num_pts} points, {num_cand} red hotspot candidates.")
        
        for idx, p in enumerate(pts):
            img_file = meridian_images.get(prefix, 'meridian_lenkergefaess.png')
            p['visuals'] = {
                "image_filename": img_file,
                "relative_coordinates": {
                    "x_percent": 0.0,
                    "y_percent": 0.0
                }
            }
            
            if num_cand > 0:
                cand_idx = int(idx * num_cand / num_pts)
                cand = candidates[cand_idx]
                p['visuals']['relative_coordinates']['x_percent'] = cand['x']
                p['visuals']['relative_coordinates']['y_percent'] = cand['y']
            else:
                p['visuals']['relative_coordinates']['x_percent'] = 50.0
                p['visuals']['relative_coordinates']['y_percent'] = 50.0
                
    os.makedirs('out', exist_ok=True)
    json_path = 'out/similapunktur.json'
    open(json_path, 'w', encoding='utf-8').write(json.dumps(points_data, indent=2, ensure_ascii=False))
    print(f"Saved synthesized JSON to {json_path}")
    
    # Keep frontend public static folder updated
    os.makedirs('frontend/public', exist_ok=True)
    public_json_path = 'frontend/public/similapunktur.json'
    open(public_json_path, 'w', encoding='utf-8').write(json.dumps(points_data, indent=2, ensure_ascii=False))
    print(f"Saved synchronized JSON to {public_json_path}")
    
    db_path = 'out/similapunktur.db'
    if os.path.exists(db_path):
        os.remove(db_path)
        
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    cur.execute('''
    CREATE TABLE punkte (
        id VARCHAR PRIMARY KEY,
        name_de VARCHAR,
        translation VARCHAR,
        meridian VARCHAR,
        localisation TEXT,
        warning TEXT,
        img_file VARCHAR,
        coord_x FLOAT,
        coord_y FLOAT
    )
    ''')
    
    cur.execute('''
    CREATE TABLE wirkungen (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        punkt_id VARCHAR,
        beschreibung TEXT,
        FOREIGN KEY(punkt_id) REFERENCES punkte(id)
    )
    ''')
    
    cur.execute('''
    CREATE TABLE indikationen (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        punkt_id VARCHAR,
        beschreibung TEXT,
        FOREIGN KEY(punkt_id) REFERENCES punkte(id)
    )
    ''')
    
    cur.execute('''
    CREATE TABLE homoeopathika (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        punkt_id VARCHAR,
        mittel_abkuerzung VARCHAR,
        FOREIGN KEY(punkt_id) REFERENCES punkte(id)
    )
    ''')
    
    cur.execute('''
    CREATE TABLE general_analysis_rubriken (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        punkt_id VARCHAR,
        rubrik_name VARCHAR,
        mittel_liste TEXT,
        FOREIGN KEY(punkt_id) REFERENCES punkte(id)
    )
    ''')
    
    cur.execute('''
    CREATE TABLE rubrik_heilmittel (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rubrik_id INTEGER,
        remedy_name VARCHAR,
        grade INTEGER,
        FOREIGN KEY(rubrik_id) REFERENCES general_analysis_rubriken(id)
    )
    ''')
    
    for p in points_data:
        cur.execute('''
        INSERT INTO punkte (id, name_de, translation, meridian, localisation, warning, img_file, coord_x, coord_y)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            p['point_id'],
            p['name_german'],
            p['name_translation'],
            p['meridian'],
            p['localisation_text'],
            p['precautions_or_contraindications'],
            p['visuals']['image_filename'],
            p['visuals']['relative_coordinates']['x_percent'],
            p['visuals']['relative_coordinates']['y_percent']
        ))
        
        for eff in p['effects']:
            cur.execute('INSERT INTO wirkungen (punkt_id, beschreibung) VALUES (?, ?)', (p['point_id'], eff))
            
        for ind in p['indications']:
            cur.execute('INSERT INTO indikationen (punkt_id, beschreibung) VALUES (?, ?)', (p['point_id'], ind))
            
        for hom in p['assigned_homeopathics']:
            cur.execute('INSERT INTO homoeopathika (punkt_id, mittel_abkuerzung) VALUES (?, ?)', (p['point_id'], hom))
            
        for rub in p['general_analysis_rubrics']:
            raw_remedy_strings = []
            for r in rub['remedies']:
                if r['grade'] == 3:
                    raw_remedy_strings.append(r['name'].upper())
                else:
                    raw_remedy_strings.append(r['name'])
            mittel_str = ', '.join(raw_remedy_strings)
            
            cur.execute('''
            INSERT INTO general_analysis_rubriken (punkt_id, rubrik_name, mittel_liste)
            VALUES (?, ?, ?)
            ''', (p['point_id'], rub['rubric_name'], mittel_str))
            
            rubrik_id = cur.lastrowid
            
            for r in rub['remedies']:
                cur.execute('''
                INSERT INTO rubrik_heilmittel (rubrik_id, remedy_name, grade)
                VALUES (?, ?, ?)
                ''', (rubrik_id, r['name'], r['grade']))
            
    conn.commit()
    conn.close()
    print(f"Saved SQLite database to {db_path}")

if __name__ == '__main__':
    main()
