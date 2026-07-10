import os
import sys
import json
import sqlite3
import re
from typing import List, Dict, Any, Optional
from mcp.server.fastmcp import FastMCP

# Configuration
DB_PATH = os.environ.get("SIMILAPUNKTUR_DB_PATH", "out/similapunktur.db")

# Initialize FastMCP Server
mcp = FastMCP("Similapunktur Server")

def get_db_connection():
    """Establish a safe SQLite connection."""
    if not os.path.exists(DB_PATH):
        sys.stderr.write(f"Database file not found at: {DB_PATH}\n")
        raise FileNotFoundError(f"Database file not found at: {DB_PATH}")
    
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@mcp.tool()
def get_point_details(point_id: str) -> str:
    """
    Retrieve all clinical details for a specific Similapoint by its ID.
    
    Args:
        point_id: The unique ID of the point (e.g. 'HE_3', 'BL_60', 'KI_6').
    """
    sys.stderr.write(f"Calling get_point_details with point_id={point_id}\n")
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # 1. Fetch metadata
        cur.execute("SELECT * FROM punkte WHERE id = ?", (point_id,))
        row = cur.fetchone()
        if not row:
            return json.dumps({"error": f"Point with ID '{point_id}' not found."}, indent=2)
            
        point_data = {
            "point_id": row["id"],
            "name_german": row["name_de"],
            "name_translation": row["translation"],
            "meridian": row["meridian"],
            "localisation_text": row["localisation"],
            "precautions_or_contraindications": row["warning"],
            "visuals": {
                "image_filename": row["img_file"],
                "relative_coordinates": {
                    "x_percent": row["coord_x"],
                    "y_percent": row["coord_y"]
                }
            }
        }
        
        # 2. Fetch associated wirkungen
        cur.execute("SELECT beschreibung FROM wirkungen WHERE punkt_id = ?", (point_id,))
        point_data["wirkungen"] = [r["beschreibung"] for r in cur.fetchall()]
        
        # 3. Fetch associated indikationen
        cur.execute("SELECT beschreibung FROM indikationen WHERE punkt_id = ?", (point_id,))
        point_data["indikationen"] = [r["beschreibung"] for r in cur.fetchall()]
        
        # 4. Fetch associated homoeopathika
        cur.execute("SELECT mittel_abkuerzung FROM homoeopathika WHERE punkt_id = ?", (point_id,))
        point_data["assigned_homeopathics"] = [r["mittel_abkuerzung"] for r in cur.fetchall()]
        
        # 5. Fetch associated general analysis rubriken
        cur.execute("SELECT id, rubrik_name FROM general_analysis_rubriken WHERE punkt_id = ?", (point_id,))
        point_data["general_analysis_rubrics"] = []
        for r in cur.fetchall():
            rubrik_id = r["id"]
            cur.execute("SELECT remedy_name, grade FROM rubrik_heilmittel WHERE rubrik_id = ?", (rubrik_id,))
            remedies = [{"name": rm["remedy_name"], "grade": rm["grade"]} for rm in cur.fetchall()]
            point_data["general_analysis_rubrics"].append({
                "rubric_name": r["rubrik_name"],
                "remedies": remedies
            })
            
        conn.close()
        
        # Format output
        warning = point_data.get("precautions_or_contraindications")
        banner = ""
        if warning:
            banner = f"*** WARNING: {warning} ***\n\n"
            
        return banner + json.dumps(point_data, indent=2, ensure_ascii=False)
        
    except Exception as e:
        sys.stderr.write(f"Error in get_point_details: {str(e)}\n")
        return json.dumps({"error": str(e)}, indent=2)

@mcp.tool()
def search_points_by_symptom(query: str) -> str:
    """
    Search case-insensitively across indications and effects to find matching points.
    
    Args:
        query: The symptom or effect to search for (e.g. 'Schlaflosigkeit', 'Prüfungsangst', 'Depression').
    """
    sys.stderr.write(f"Calling search_points_by_symptom with query='{query}'\n")
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        search_query = f"%{query}%"
        
        # Find matches in wirkungen
        cur.execute('''
            SELECT DISTINCT p.id, p.name_de, p.meridian, 'wirkung' as match_type, w.beschreibung as match_text
            FROM punkte p
            JOIN wirkungen w ON p.id = w.punkt_id
            WHERE w.beschreibung LIKE ?
        ''', (search_query,))
        wirkungen_matches = [dict(r) for r in cur.fetchall()]
        
        # Find matches in indikationen
        cur.execute('''
            SELECT DISTINCT p.id, p.name_de, p.meridian, 'indikation' as match_type, i.beschreibung as match_text
            FROM punkte p
            JOIN indikationen i ON p.id = i.punkt_id
            WHERE i.beschreibung LIKE ?
        ''', (search_query,))
        indikationen_matches = [dict(r) for r in cur.fetchall()]
        
        conn.close()
        
        all_matches = wirkungen_matches + indikationen_matches
        # Remove exact duplicates if any
        seen = set()
        unique_matches = []
        for m in all_matches:
            key = (m['id'], m['match_type'], m['match_text'])
            if key not in seen:
                seen.add(key)
                unique_matches.append(m)
                
        return json.dumps({"query": query, "matches_found": len(unique_matches), "matches": unique_matches}, indent=2, ensure_ascii=False)
        
    except Exception as e:
        sys.stderr.write(f"Error in search_points_by_symptom: {str(e)}\n")
        return json.dumps({"error": str(e)}, indent=2)

@mcp.tool()
def get_points_by_remedy(remedy_name: str) -> str:
    """
    Retrieve all points associated with a specific homeopathic remedy.
    
    Args:
        remedy_name: The abbreviation of the homeopathic remedy (e.g. 'Lach', 'Aur.', 'Bell.').
    """
    sys.stderr.write(f"Calling get_points_by_remedy with remedy_name='{remedy_name}'\n")
    try:
        # Standardize remedy name to always end with a dot
        remedy = remedy_name.strip()
        if not remedy.endswith('.'):
            remedy += '.'
            
        conn = get_db_connection()
        cur = conn.cursor()
        
        # 1. Search in homoeopathika table (case-insensitive)
        cur.execute('''
            SELECT DISTINCT p.id, p.name_de, p.localisation, 'assigned_homeopathics' as source
            FROM punkte p
            JOIN homoeopathika h ON p.id = h.punkt_id
            WHERE LOWER(h.mittel_abkuerzung) = LOWER(?)
        ''', (remedy,))
        hom_matches = [dict(r) for r in cur.fetchall()]
        
        # 2. Search in general_analysis_rubriken table using the new rubrik_heilmittel table (case-insensitive)
        cur.execute('''
            SELECT DISTINCT p.id, p.name_de, p.localisation, r.rubrik_name
            FROM punkte p
            JOIN general_analysis_rubriken r ON p.id = r.punkt_id
            JOIN rubrik_heilmittel rm ON r.id = rm.rubrik_id
            WHERE LOWER(rm.remedy_name) = LOWER(?)
        ''', (remedy,))
        
        rub_matches = []
        for r in cur.fetchall():
            rub_matches.append({
                "id": r["id"],
                "name_de": r["name_de"],
                "localisation": r["localisation"],
                "source": f"rubric: {r['rubrik_name']}"
            })
                
        conn.close()
        
        # Combine matches, grouping sources for the same point
        points_map = {}
        for m in hom_matches + rub_matches:
            pid = m['id']
            if pid not in points_map:
                points_map[pid] = {
                    "id": pid,
                    "name_de": m['name_de'],
                    "localisation": m['localisation'],
                    "sources": []
                }
            points_map[pid]["sources"].append(m['source'])
            
        results = list(points_map.values())
        return json.dumps({"remedy_searched": remedy, "points_found": len(results), "points": results}, indent=2, ensure_ascii=False)
        
    except Exception as e:
        sys.stderr.write(f"Error in get_points_by_remedy: {str(e)}\n")
        return json.dumps({"error": str(e)}, indent=2)

@mcp.tool()
def get_points_by_meridian(meridian_name: str) -> str:
    """
    Retrieve all points belonging to a specific meridian.
    
    Args:
        meridian_name: The name of the meridian (e.g. 'Herz-Leitbahn', 'Blasen-Leitbahn', 'Konzeptionsgefäß').
    """
    sys.stderr.write(f"Calling get_points_by_meridian with meridian_name='{meridian_name}'\n")
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Case-insensitive match on meridian
        cur.execute('''
            SELECT id, name_de, translation, meridian, img_file, coord_x, coord_y, warning
            FROM punkte
            WHERE LOWER(meridian) = LOWER(?)
        ''', (meridian_name.strip(),))
        
        rows = cur.fetchall()
        conn.close()
        
        points = [dict(r) for r in rows]
        
        # Sort points by their natural sequence (extract number from ID if possible)
        def get_sort_key(p):
            m = re.search(r'_(\d+)', p['id'])
            if m:
                return (int(m.group(1)), 0)
            return (999, p['id'])
            
        points.sort(key=get_sort_key)
        
        return json.dumps({"meridian": meridian_name, "points_count": len(points), "points": points}, indent=2, ensure_ascii=False)
        
    except Exception as e:
        sys.stderr.write(f"Error in get_points_by_meridian: {str(e)}\n")
        return json.dumps({"error": str(e)}, indent=2)

if __name__ == "__main__":
    # Start server using stdio transport
    sys.stderr.write("Starting Similapunktur MCP Server...\n")
    mcp.run(transport="stdio")
