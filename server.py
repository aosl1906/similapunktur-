import os
import sys
import json
import sqlite3
import urllib.parse
import urllib.request
import re
import time
from http.server import SimpleHTTPRequestHandler, HTTPServer

DB_PATH = os.environ.get("SIMILAPUNKTUR_DB_PATH", "out/similapunktur.db")
PORT = 8000
SYNONYMS_PATH = "out/synonyms.json"
synonyms_data = {}

def load_synonyms():
    global synonyms_data
    if os.path.exists(SYNONYMS_PATH):
        try:
            with open(SYNONYMS_PATH, "r", encoding="utf-8") as f:
                synonyms_data = json.load(f)
            sys.stderr.write(f"Loaded {len(synonyms_data)} synonym groups.\n")
        except Exception as e:
            sys.stderr.write(f"Failed to load synonyms.json: {e}\n")
    else:
        sys.stderr.write("synonyms.json not found, starting with empty synonym map.\n")

def clean_word(word: str) -> str:
    word = re.sub(r'[^\w\s-]', '', word)
    return word.strip().lower()

def get_synonyms_from_api(word: str) -> list:
    """Fetch synonyms from OpenThesaurus API."""
    encoded = urllib.parse.quote(word)
    url = f"https://www.openthesaurus.de/synonyme/search?q={encoded}&format=application/json"
    req = urllib.request.Request(url, headers={'User-Agent': 'SimilapunkturApp/1.0 (contact: info@naturheilpraxis-maier.de)'})
    try:
        with urllib.request.urlopen(req, timeout=3) as response:
            data = json.loads(response.read().decode('utf-8'))
            synonyms = set()
            if 'synsets' in data:
                for synset in data['synsets']:
                    for term_obj in synset['terms']:
                        term = term_obj['term']
                        cleaned = clean_word(term)
                        if cleaned and cleaned != word.lower() and len(cleaned) > 2:
                            synonyms.add(cleaned)
            return list(synonyms)
    except Exception as e:
        sys.stderr.write(f"Error fetching synonyms for '{word}': {e}\n")
        return []

def get_synonyms_for_query(query: str) -> set:
    """Get all synonyms for the words in the query. Optionally calls API if not found."""
    words = [clean_word(w) for w in re.findall(r'[a-zA-ZäöüÄÖÜßéèàáíóúñ]+', query) if len(w) > 2]
    all_syns = set()
    updated_cache = False
    
    for w in words:
        if w in synonyms_data:
            all_syns.update(synonyms_data[w])
        else:
            # Query the API dynamically
            sys.stderr.write(f"Synonym cache miss for '{w}'. Querying OpenThesaurus API...\n")
            api_syns = get_synonyms_from_api(w)
            if api_syns:
                synonyms_data[w] = api_syns
                # Make bidirectional
                for s in api_syns:
                    if s not in synonyms_data:
                        synonyms_data[s] = []
                    if w not in synonyms_data[s]:
                        synonyms_data[s].append(w)
                updated_cache = True
                all_syns.update(api_syns)
                
    if updated_cache:
        try:
            with open(SYNONYMS_PATH, "w", encoding="utf-8") as f:
                json.dump(synonyms_data, f, ensure_ascii=False, indent=2)
            public_path = "frontend/public/synonyms.json"
            with open(public_path, "w", encoding="utf-8") as f:
                json.dump(synonyms_data, f, ensure_ascii=False, indent=2)
            sys.stderr.write("Saved updated synonyms.json to disk.\n")
        except Exception as e:
            sys.stderr.write(f"Failed to save synonyms.json: {e}\n")
            
    return all_syns


def get_db_connection():
    if not os.path.exists(DB_PATH):
        raise FileNotFoundError(f"Database not found at {DB_PATH}")
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

class SimilapunkturHandler(SimpleHTTPRequestHandler):
    
    def log_message(self, format, *args):
        # Override to log to stderr
        sys.stderr.write("%s - - [%s] %s\n" %
                         (self.address_string(),
                          self.log_date_time_string(),
                          format%args))

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        query_params = urllib.parse.parse_qs(parsed_url.query)
        
        # 1. API Endpoint: Point Details
        if path == "/api/point-details":
            point_id = query_params.get("id", [None])[0]
            if not point_id:
                self.send_error_response(400, "Missing 'id' parameter")
                return
                
            try:
                conn = get_db_connection()
                cur = conn.cursor()
                
                # Fetch metadata
                cur.execute("SELECT * FROM punkte WHERE id = ?", (point_id,))
                row = cur.fetchone()
                if not row:
                    self.send_error_response(404, f"Point with ID '{point_id}' not found")
                    conn.close()
                    return
                    
                # Format to target JSON schema matching Phase 1
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
                
                # Fetch associated details
                cur.execute("SELECT beschreibung FROM wirkungen WHERE punkt_id = ?", (point_id,))
                point_data["effects"] = [r["beschreibung"] for r in cur.fetchall()]
                
                cur.execute("SELECT beschreibung FROM indikationen WHERE punkt_id = ?", (point_id,))
                point_data["indications"] = [r["beschreibung"] for r in cur.fetchall()]
                
                cur.execute("SELECT mittel_abkuerzung FROM homoeopathika WHERE punkt_id = ?", (point_id,))
                point_data["assigned_homeopathics"] = [r["mittel_abkuerzung"] for r in cur.fetchall()]
                
                cur.execute("SELECT id, rubrik_name FROM general_analysis_rubriken WHERE punkt_id = ?", (point_id,))
                point_data["general_analysis_rubrics"] = []
                for r in cur.fetchall():
                    rubrik_id = r["id"]
                    # Fetch structured remedies with grades from the new table
                    cur.execute("SELECT remedy_name, grade FROM rubrik_heilmittel WHERE rubrik_id = ?", (rubrik_id,))
                    remedies = [{"name": rm["remedy_name"], "grade": rm["grade"]} for rm in cur.fetchall()]
                    point_data["general_analysis_rubrics"].append({
                        "rubric_name": r["rubrik_name"],
                        "remedies": remedies
                    })
                    
                conn.close()
                self.send_json_response(point_data)
                
            except Exception as e:
                self.send_error_response(500, str(e))
            return
            
        # 2. API Endpoint: Search Symptoms
        elif path == "/api/search-symptoms":
            query = query_params.get("q", [None])[0]
            if not query:
                self.send_error_response(400, "Missing 'q' parameter")
                return
                
            try:
                # Find synonyms using our pre-seeded cache and dynamic OpenThesaurus API fallback
                synonyms = get_synonyms_for_query(query)
                terms = [query] + list(synonyms)
                # Deduplicate terms case-insensitively
                seen_terms = set()
                unique_terms = []
                for t in terms:
                    t_clean = t.strip().lower()
                    if t_clean and t_clean not in seen_terms:
                        seen_terms.add(t_clean)
                        unique_terms.append(t.strip())
                
                conn = get_db_connection()
                cur = conn.cursor()
                
                # Query in effects (wirkungen)
                conditions_w = []
                params_w = []
                for t in unique_terms:
                    conditions_w.append("w.beschreibung LIKE ?")
                    params_w.append(f"%{t}%")
                
                sql_w = f'''
                    SELECT DISTINCT p.id, p.name_de, p.meridian, 'wirkung' as match_type, w.beschreibung as match_text
                    FROM punkte p
                    JOIN wirkungen w ON p.id = w.punkt_id
                    WHERE {" OR ".join(conditions_w)}
                '''
                cur.execute(sql_w, params_w)
                wirkungen_matches = [dict(r) for r in cur.fetchall()]
                
                # Label which term triggered the match for effects
                for m in wirkungen_matches:
                    match_text_lower = m['match_text'].lower()
                    matched_synonym = None
                    for t in unique_terms:
                        if t.lower() in match_text_lower:
                            if t.lower() != query.lower():
                                matched_synonym = t
                            break
                    m['matched_synonym'] = matched_synonym
                
                # Query in indications (indikationen)
                conditions_i = []
                params_i = []
                for t in unique_terms:
                    conditions_i.append("i.beschreibung LIKE ?")
                    params_i.append(f"%{t}%")
                
                sql_i = f'''
                    SELECT DISTINCT p.id, p.name_de, p.meridian, 'indikation' as match_type, i.beschreibung as match_text
                    FROM punkte p
                    JOIN indikationen i ON p.id = i.punkt_id
                    WHERE {" OR ".join(conditions_i)}
                '''
                cur.execute(sql_i, params_i)
                indikationen_matches = [dict(r) for r in cur.fetchall()]
                
                # Label which term triggered the match for indications
                for m in indikationen_matches:
                    match_text_lower = m['match_text'].lower()
                    matched_synonym = None
                    for t in unique_terms:
                        if t.lower() in match_text_lower:
                            if t.lower() != query.lower():
                                matched_synonym = t
                            break
                    m['matched_synonym'] = matched_synonym
                
                conn.close()
                
                # Combine matches and filter duplicates
                all_matches = wirkungen_matches + indikationen_matches
                seen = set()
                unique_matches = []
                for m in all_matches:
                    key = (m['id'], m['match_type'], m['match_text'])
                    if key not in seen:
                        seen.add(key)
                        unique_matches.append(m)
                        
                self.send_json_response({
                    "query": query,
                    "synonyms_used": list(synonyms),
                    "matches_found": len(unique_matches),
                    "matches": unique_matches
                })
                
            except Exception as e:
                self.send_error_response(500, str(e))
            return
            
        # 3. API Endpoint: Points by Remedy
        elif path == "/api/points-by-remedy":
            remedy_name = query_params.get("name", [None])[0]
            if not remedy_name:
                self.send_error_response(400, "Missing 'name' parameter")
                return
                
            try:
                remedy = remedy_name.strip()
                if not remedy.endswith('.'):
                    remedy += '.'
                    
                conn = get_db_connection()
                cur = conn.cursor()
                
                # Search directly in homoeopathika table (case-insensitive)
                cur.execute('''
                    SELECT DISTINCT p.id, p.name_de, p.localisation, 'assigned_homeopathics' as source
                    FROM punkte p
                    JOIN homoeopathika h ON p.id = h.punkt_id
                    WHERE LOWER(h.mittel_abkuerzung) = LOWER(?)
                ''', (remedy,))
                hom_matches = [dict(r) for r in cur.fetchall()]
                
                # Search in rubrics using the new rubrik_heilmittel table (case-insensitive)
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
                
                # Combine & group sources
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
                    
                self.send_json_response({
                    "remedy_searched": remedy,
                    "points_found": len(points_map),
                    "points": list(points_map.values())
                })
                
            except Exception as e:
                self.send_error_response(500, str(e))
        elif path == "/api/remedy-details":
            remedy_name = query_params.get("name", [None])[0]
            if not remedy_name:
                self.send_error_response(400, "Missing 'name' parameter")
                return
                
            try:
                remedy = remedy_name.strip()
                if not remedy.endswith('.'):
                    remedy += '.'
                    
                conn = get_db_connection()
                cur = conn.cursor()
                
                # Query associated rubrics and points
                cur.execute('''
                    SELECT g.punkt_id, p.name_de, g.rubrik_name, rh.grade
                    FROM rubrik_heilmittel rh
                    JOIN general_analysis_rubriken g ON rh.rubrik_id = g.id
                    JOIN punkte p ON g.punkt_id = p.id
                    WHERE LOWER(rh.remedy_name) = LOWER(?)
                    ORDER BY rh.grade DESC, g.punkt_id ASC
                ''', (remedy,))
                rubrics = []
                for r in cur.fetchall():
                    rubrics.append({
                        "point_id": r["punkt_id"],
                        "point_name": r["name_de"],
                        "rubric_name": r["rubrik_name"],
                        "grade": r["grade"]
                    })
                    
                # Query direct point mappings (homoeopathika)
                cur.execute('''
                    SELECT h.punkt_id, p.name_de
                    FROM homoeopathika h
                    JOIN punkte p ON h.punkt_id = p.id
                    WHERE LOWER(h.mittel_abkuerzung) = LOWER(?)
                ''', (remedy,))
                direct_points = []
                for r in cur.fetchall():
                    direct_points.append({
                        "point_id": r["punkt_id"],
                        "point_name": r["name_de"]
                    })
                    
                # Query remedy descriptions (Materia Medica)
                cur.execute('''
                SELECT remedy_name, overview, sections_json
                FROM remedy_descriptions
                WHERE LOWER(remedy_abbr) = LOWER(?)
                ''', (remedy,))
                desc_row = cur.fetchone()
                
                description = None
                if desc_row:
                    try:
                        sections = json.loads(desc_row["sections_json"])
                    except:
                        sections = {}
                    description = {
                        "full_name": desc_row["remedy_name"],
                        "overview": desc_row["overview"],
                        "sections": sections
                    }

                conn.close()
                
                self.send_json_response({
                    "remedy": remedy,
                    "rubrics": rubrics,
                    "direct_points": direct_points,
                    "description": description
                })
                
            except Exception as e:
                self.send_error_response(500, str(e))
            return

        # 4. API Endpoint: Points by Meridian
        elif path == "/api/points-by-meridian":
            meridian_name = query_params.get("name", [None])[0]
            if not meridian_name:
                self.send_error_response(400, "Missing 'name' parameter")
                return
                
            try:
                conn = get_db_connection()
                cur = conn.cursor()
                cur.execute('''
                    SELECT id, name_de, translation, meridian, img_file, coord_x, coord_y, warning
                    FROM punkte
                    WHERE LOWER(meridian) = LOWER(?)
                ''', (meridian_name.strip(),))
                
                rows = cur.fetchall()
                conn.close()
                
                # Format to target list
                points = []
                for row in rows:
                    points.append({
                        "id": row["id"],
                        "name_de": row["name_de"],
                        "translation": row["translation"],
                        "meridian": row["meridian"],
                        "warning": row["warning"],
                        "visuals": {
                            "image_filename": row["img_file"],
                            "relative_coordinates": {
                                "x_percent": row["coord_x"],
                                "y_percent": row["coord_y"]
                            }
                        }
                    })
                
                # Sort anatomically
                import re
                def get_sort_key(p):
                    m = re.search(r'_(\d+)', p['id'])
                    if m:
                        return (int(m.group(1)), 0)
                    return (999, p['id'])
                points.sort(key=get_sort_key)
                
                self.send_json_response({
                    "meridian": meridian_name,
                    "points_count": len(points),
                    "points": points
                })
                
            except Exception as e:
                self.send_error_response(500, str(e))
            return
            
        # 4.5. API Endpoint: Symptom suggestions for autocomplete
        elif path == "/api/symptom-suggestions":
            try:
                conn = get_db_connection()
                cur = conn.cursor()
                
                # Fetch unique descriptions from both tables
                cur.execute("SELECT DISTINCT beschreibung FROM wirkungen")
                w_desc = [r["beschreibung"] for r in cur.fetchall()]
                
                cur.execute("SELECT DISTINCT beschreibung FROM indikationen")
                i_desc = [r["beschreibung"] for r in cur.fetchall()]
                
                conn.close()
                
                # Merge and get unique list
                all_desc = list(set(w_desc + i_desc))
                
                # Filter out empty or extremely long text
                suggestions = [s.strip() for s in all_desc if s and len(s) < 120]
                suggestions.sort()
                
                self.send_json_response({
                    "suggestions": suggestions
                })
            except Exception as e:
                self.send_error_response(500, str(e))
            return

        # 5. Serve Assets
        elif path.startswith("/assets/"):
            asset_filename = os.path.basename(path)
            out_asset_path = os.path.join("out", "assets", asset_filename)
            dist_asset_path = os.path.join("frontend", "dist", "assets", asset_filename)
            if os.path.exists(out_asset_path):
                self.serve_file(out_asset_path)
            elif os.path.exists(dist_asset_path):
                self.serve_file(dist_asset_path)
            else:
                self.send_error_response(404, f"Asset {asset_filename} not found")
            return
            
        # 6. Serve static built frontend files
        else:
            # Serve files from frontend/dist
            frontend_dist = os.path.join("frontend", "dist")
            
            # Map default root to index.html
            sub_path = path.lstrip("/")
            if not sub_path:
                sub_path = "index.html"
                
            target_path = os.path.abspath(os.path.join(frontend_dist, sub_path))
            
            # Security: ensure file is inside frontend_dist
            if target_path.startswith(os.path.abspath(frontend_dist)) and os.path.exists(target_path) and os.path.isfile(target_path):
                self.serve_file(target_path)
            else:
                # Fallback to index.html for SPA routing if needed, or return 404
                index_path = os.path.join(frontend_dist, "index.html")
                if os.path.exists(index_path):
                    self.serve_file(index_path)
                else:
                    self.send_error_response(404, "File not found")
            return

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        
        if path == "/api/update-point-coordinate":
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                post_data = self.rfile.read(content_length)
                payload = json.loads(post_data.decode('utf-8'))
                
                point_id = payload.get("point_id")
                x_percent = payload.get("x_percent")
                y_percent = payload.get("y_percent")
                
                if not point_id or x_percent is None or y_percent is None:
                    self.send_error_response(400, "Missing parameters (point_id, x_percent, y_percent)")
                    return
                
                try:
                    x_percent = float(x_percent)
                    y_percent = float(y_percent)
                except ValueError:
                    self.send_error_response(400, "Coordinates must be numeric")
                    return
                
                # 1. Update SQLite
                conn = get_db_connection()
                cur = conn.cursor()
                cur.execute("UPDATE punkte SET coord_x = ?, coord_y = ? WHERE id = ?", (x_percent, y_percent, point_id))
                if cur.rowcount == 0:
                    self.send_error_response(404, f"Point with ID '{point_id}' not found")
                    conn.close()
                    return
                conn.commit()
                conn.close()
                
                # 2. Update JSON to keep synchronized
                json_path = 'out/similapunktur.json'
                public_json_path = 'frontend/public/similapunktur.json'
                
                def update_json_file(path):
                    if os.path.exists(path):
                        try:
                            with open(path, 'r', encoding='utf-8') as f:
                                data = json.load(f)
                            updated = False
                            for p in data:
                                if p.get('point_id') == point_id:
                                    p['visuals']['relative_coordinates']['x_percent'] = x_percent
                                    p['visuals']['relative_coordinates']['y_percent'] = y_percent
                                    updated = True
                                    break
                            if updated:
                                with open(path, 'w', encoding='utf-8') as f:
                                    json.dump(data, f, indent=2, ensure_ascii=False)
                        except Exception as je:
                            print(f"Error updating JSON file at {path}: {je}")
                
                update_json_file(json_path)
                update_json_file(public_json_path)
                            
                self.send_json_response({"success": True, "message": f"Coordinates for {point_id} updated successfully"})
            except Exception as e:
                self.send_error_response(500, str(e))
            return
        else:
            self.send_error_response(404, "Endpoint not found")
            return

    def serve_file(self, file_path):
        # Determine content type
        content_type = "text/plain"
        if file_path.endswith(".html"):
            content_type = "text/html; charset=utf-8"
        elif file_path.endswith(".js"):
            content_type = "application/javascript; charset=utf-8"
        elif file_path.endswith(".css"):
            content_type = "text/css; charset=utf-8"
        elif file_path.endswith(".png"):
            content_type = "image/png"
        elif file_path.endswith(".svg"):
            content_type = "image/svg+xml"
        elif file_path.endswith(".json"):
            content_type = "application/json; charset=utf-8"
            
        try:
            with open(file_path, "rb") as f:
                data = f.read()
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", len(data))
            # Enable CORS for local dev
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            self.send_error_response(500, f"Error reading file: {str(e)}")

    def send_json_response(self, data):
        json_bytes = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", len(json_bytes))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json_bytes)

    def send_error_response(self, status_code, message):
        err_data = {"error": message, "status": status_code}
        json_bytes = json.dumps(err_data).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", len(json_bytes))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json_bytes)

def run_server():
    server_address = ("", PORT)
    httpd = HTTPServer(server_address, SimilapunkturHandler)
    print(f"=== Similapunktur Server running on http://localhost:{PORT} ===")
    print(f"=== DB Path: {os.path.abspath(DB_PATH)} ===")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        sys.exit(0)

if __name__ == "__main__":
    load_synonyms()
    run_server()
