import sqlite3
import json
import os
import sys
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

DB_PATH = r"out\similapunktur.db"
MODEL_NAME = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"

# 8 categories with their clinical and anatomical anchor terms
CATEGORIES = {
    "Kopf & Nervensystem": [
        "Kopf", "Gehirn", "Nerven", "Hinterkopf", "Stirn", "Schläfe", "Migräne", "Kopfschmerz", "Schwindel", "Krämpfe", "Zuckungen", "Neuralgie"
    ],
    "Gemüt & Psyche": [
        "Gemüt", "Geist", "Schlaf", "Träume", "Angst", "Traurigkeit", "Unruhe", "Hysterie", "Reizbarkeit", "Depression", "Stimmung", "Apathie", "Gleichgültigkeit"
    ],
    "Herz & Kreislauf": [
        "Herz", "Puls", "Blutlauf", "Adern", "Gefäße", "Blutdruck", "Brustschmerz", "Angina pectoris", "Herzklopfen", "Tachykardie"
    ],
    "Magen & Verdauung": [
        "Magen", "Darm", "Verdauung", "Appetit", "Übelkeit", "Erbrechen", "Leber", "Galle", "Abdomen", "Stuhl", "Kolik", "Essen", "Trinken", "Sodbrennen", "Flatulenz"
    ],
    "Atmung & Hals": [
        "Lunge", "Atmung", "Husten", "Kehlkopf", "Nase", "Nebenhöhlen", "Hals", "Heiserkeit", "Luftröhre", "Atemnot", "Bronchitis", "Schnupfen"
    ],
    "Urogenitaltrakt": [
        "Urin", "Blase", "Niere", "Menses", "Menstruation", "Eierstöcke", "Uterus", "Hoden", "Urinieren", "Harndrang", "Gebärmutter", "Schwangerschaft"
    ],
    "Haut & Äußeres": [
        "Haut", "Jucken", "Ausschlag", "Schwitzen", "Schwellung", "Geschwür", "Frostbeulen", "Haarausfall", "Ekzem", "Abszess", "Achselschweiß"
    ],
    "Bewegungsapparat & Allgemeines": [
        "Glieder", "Muskeln", "Knochen", "Gelenke", "Rücken", "Nacken", "Schulter", "Rheuma", "Kälte", "Wärme", "Fieber", "Schmerz", "Erschöpfung", "Schwäche", "Steifheit", "Zerschlagenheit", "Lähmung"
    ]
}

def generate_embeddings():
    if not os.path.exists(DB_PATH):
        print(f"Error: Database file not found at {DB_PATH}", file=sys.stderr)
        sys.exit(1)
        
    print("Loading SQLite database...")
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    # 1. Collect all unique symptom texts
    symptoms = set()
    
    # Check if tables exist first
    cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [t[0] for t in cur.fetchall()]
    
    if 'wirkungen' in tables:
        cur.execute("SELECT DISTINCT beschreibung FROM wirkungen;")
        symptoms.update(r[0] for r in cur.fetchall() if r[0])
        
    if 'indikationen' in tables:
        cur.execute("SELECT DISTINCT beschreibung FROM indikationen;")
        symptoms.update(r[0] for r in cur.fetchall() if r[0])
        
    if 'ttb_rubrics' in tables:
        cur.execute("SELECT DISTINCT rubric_name FROM ttb_rubrics;")
        symptoms.update(r[0] for r in cur.fetchall() if r[0])
        
    if 'general_analysis_rubriken' in tables:
        cur.execute("SELECT DISTINCT rubrik_name FROM general_analysis_rubriken;")
        symptoms.update(r[0] for r in cur.fetchall() if r[0])
        
    # Clean symptoms: remove empty or very long texts (keep < 200 chars for embeddings speed)
    symptom_list = sorted([s.strip() for s in symptoms if s and len(s.strip()) < 200])
    print(f"Found {len(symptom_list)} unique symptom texts to encode.")
    
    if not symptom_list:
        print("No symptoms found in database. Exiting.")
        conn.close()
        return

    # 2. Load model
    print(f"Loading sentence transformer model: {MODEL_NAME}...")
    model = SentenceTransformer(MODEL_NAME)
    
    # 3. Create category centroids
    print("Calculating category anchor centroids...")
    category_centroids = {}
    for cat_name, anchors in CATEGORIES.items():
        anchor_embs = model.encode(anchors)
        # Average anchor embeddings to create a centroid vector
        category_centroids[cat_name] = np.mean(anchor_embs, axis=0)
        
    # 4. Encode all symptoms in batches
    print("Encoding symptoms...")
    symptom_embeddings = model.encode(symptom_list, show_progress_bar=True)
    
    # 5. Classify each symptom and prepare insert data
    print("Classifying symptoms into categories...")
    insert_data = []
    
    for idx, (symptom, emb) in enumerate(zip(symptom_list, symptom_embeddings)):
        # Calculate similarity with each category centroid
        best_cat = "Bewegungsapparat & Allgemeines"
        best_sim = -1.0
        
        for cat_name, centroid in category_centroids.items():
            sim = cosine_similarity([emb], [centroid])[0][0]
            if sim > best_sim:
                best_sim = sim
                best_cat = cat_name
                
        # If similarity is extremely low to all, fallback to general
        if best_sim < 0.25:
            best_cat = "Bewegungsapparat & Allgemeines"
            
        emb_json = json.dumps(emb.tolist())
        insert_data.append((symptom, best_cat, emb_json))
        
    # 6. Save to SQLite database
    print("Writing embeddings to SQLite...")
    cur.execute('''
        CREATE TABLE IF NOT EXISTS symptom_embeddings (
            symptom_text TEXT PRIMARY KEY,
            category VARCHAR(50),
            embedding_json TEXT
        );
    ''')
    
    # Delete old records
    cur.execute("DELETE FROM symptom_embeddings;")
    
    cur.executemany('''
        INSERT INTO symptom_embeddings (symptom_text, category, embedding_json)
        VALUES (?, ?, ?);
    ''', insert_data)
    
    conn.commit()
    conn.close()
    print(f"Successfully generated and wrote {len(insert_data)} embeddings to symptom_embeddings table.")

if __name__ == '__main__':
    generate_embeddings()
