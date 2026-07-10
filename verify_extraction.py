import json
import sqlite3
import os
import sys

def run_verification():
    print("=== STARTING VERIFICATION GATE ===")
    
    json_path = 'out/similapunktur.json'
    db_path = 'out/similapunktur.db'
    
    if not os.path.exists(json_path):
        print(f"ERROR: JSON file not found at {json_path}")
        sys.exit(1)
        
    if not os.path.exists(db_path):
        print(f"ERROR: SQLite DB not found at {db_path}")
        sys.exit(1)
        
    # 1. Load JSON data
    with open(json_path, encoding='utf-8') as f:
        json_data = json.load(f)
        
    print(f"Loaded JSON data. Total points in JSON: {len(json_data)}")
    
    # 2. Check point count (should be 145)
    if len(json_data) != 145:
        print(f"ERROR: Expected 145 points, but got {len(json_data)} in JSON.")
        sys.exit(1)
    else:
        print("PASS: Point count in JSON is exactly 145.")
        
    # 3. Connect to database
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    # Check table row counts
    cur.execute("SELECT COUNT(*) FROM punkte")
    db_punkte_count = cur.fetchone()[0]
    print(f"Total points in SQLite 'punkte' table: {db_punkte_count}")
    if db_punkte_count != 145:
        print(f"ERROR: Expected 145 points in SQLite, but got {db_punkte_count}.")
        sys.exit(1)
    else:
        print("PASS: Point count in SQLite is exactly 145.")
        
    # 4. Verify Ground Truth Entry: Herz 3 (HE_3)
    cur.execute("SELECT * FROM punkte WHERE id = 'HE_3'")
    he3_row = cur.fetchone()
    if not he3_row:
        print("ERROR: Point HE_3 (Herz 3) not found in database.")
        sys.exit(1)
    
    he3_id, he3_name_de, he3_trans, he3_meridian, he3_local, he3_warn, he3_img, he3_cx, he3_cy = he3_row
    
    # Check German name and translation
    if he3_name_de != 'Herz 3' or he3_trans != 'Niedriges Meer':
        print(f"ERROR: HE_3 name/translation mismatch: name_de={he3_name_de}, translation={he3_trans}")
        sys.exit(1)
    else:
        print("PASS: HE_3 name and translation are correct.")
        
    # Check assigned homeopathics for HE_3
    cur.execute("SELECT mittel_abkuerzung FROM homoeopathika WHERE punkt_id = 'HE_3'")
    he3_hom = [r[0] for r in cur.fetchall()]
    expected_he3_hom = ["Anac.", "Aur.", "Bell.", "Calc-s.", "Cocc.", "Echi.", "Gels.", "Hell.", "Hyos.", "Hyper.", "Kali-p.", "Kalm.", "Stront-c."]
    
    # Compare sets
    if set(he3_hom) != set(expected_he3_hom):
        print(f"ERROR: HE_3 homeopathics mismatch.\nExpected: {expected_he3_hom}\nGot: {he3_hom}")
        sys.exit(1)
    else:
        print("PASS: HE_3 assigned homeopathics match Ground Truth exactly.")
        
    # 5. Verify Safety Critical Warnings (Pregnancy / Contraindications)
    expected_warnings = {
        'BL_31': 'Cave: Nicht bei Schwangeren behandeln!',
        'BL_60': 'Cave: Nicht bei Schwangeren (Abortgefahr)!',
        'KI_6': 'Cave: Nicht bei Schwangeren behandeln!',
        'LR_3': '(Cave: RR kann plötzlich sinken!).',
        'LI_4': 'Cave: Nicht bei Schwangeren behandeln!'
    }
    
    for pid, expected_warn in expected_warnings.items():
        cur.execute("SELECT warning FROM punkte WHERE id = ?", (pid,))
        db_warn = cur.fetchone()[0]
        
        json_pt = next((p for p in json_data if p['point_id'] == pid), None)
        if not json_pt:
            print(f"ERROR: Point {pid} not found in JSON data.")
            sys.exit(1)
            
        json_warn = json_pt['precautions_or_contraindications']
        
        if db_warn != expected_warn:
            print(f"ERROR: Safety warning mismatch in SQLite for {pid}.\nExpected: '{expected_warn}'\nGot: '{db_warn}'")
            sys.exit(1)
            
        if json_warn != expected_warn:
            print(f"ERROR: Safety warning mismatch in JSON for {pid}.\nExpected: '{expected_warn}'\nGot: '{json_warn}'")
            sys.exit(1)
            
        print(f"PASS: Safety warning for {pid} verified successfully in JSON & SQLite.")
        
    # 6. Verify cross-table referential integrity (JSON vs SQLite arrays)
    cur.execute("SELECT COUNT(*) FROM wirkungen")
    db_wir_count = cur.fetchone()[0]
    json_wir_count = sum(len(p['effects']) for p in json_data)
    print(f"Wirkungen row count: SQLite={db_wir_count}, JSON={json_wir_count}")
    if db_wir_count != json_wir_count:
        print("ERROR: Wirkungen count mismatch.")
        sys.exit(1)
        
    cur.execute("SELECT COUNT(*) FROM indikationen")
    db_ind_count = cur.fetchone()[0]
    json_ind_count = sum(len(p['indications']) for p in json_data)
    print(f"Indikationen row count: SQLite={db_ind_count}, JSON={json_ind_count}")
    if db_ind_count != json_ind_count:
        print("ERROR: Indikationen count mismatch.")
        sys.exit(1)
        
    cur.execute("SELECT COUNT(*) FROM homoeopathika")
    db_hom_count = cur.fetchone()[0]
    json_hom_count = sum(len(p['assigned_homeopathics']) for p in json_data)
    print(f"Homoeopathika row count: SQLite={db_hom_count}, JSON={json_hom_count}")
    if db_hom_count != json_hom_count:
        print("ERROR: Homoeopathika count mismatch.")
        sys.exit(1)
        
    cur.execute("SELECT COUNT(*) FROM general_analysis_rubriken")
    db_rub_count = cur.fetchone()[0]
    json_rub_count = sum(len(p['general_analysis_rubrics']) for p in json_data)
    print(f"General Analysis Rubriken count: SQLite={db_rub_count}, JSON={json_rub_count}")
    if db_rub_count != json_rub_count:
        print("ERROR: Rubriken count mismatch.")
        sys.exit(1)
        
    print("PASS: Cross-table referential counts match between JSON and SQLite perfectly.")
    
    # 7. Check coordinates are normalized (0.0 to 100.0)
    cur.execute("SELECT id, coord_x, coord_y FROM punkte")
    for pid, cx, cy in cur.fetchall():
        if not (0.0 <= cx <= 100.0) or not (0.0 <= cy <= 100.0):
            print(f"ERROR: Coordinate out of bounds for {pid}: x={cx}, y={cy}")
            sys.exit(1)
            
    print("PASS: All point coordinates are successfully normalized to relative percentage space [0, 100].")
    
    conn.close()
    print("=== ALL QUALITY GATE VERIFICATIONS PASSED SUCCESSFULLY! ===")

if __name__ == '__main__':
    run_verification()
