import json
import os
import difflib

def main():
    json_path = 'out/similapunktur.json'
    boericke_path = 'boericke_materia_medica.json'
    ttb_path = 'ttb_repertory.json'
    report_path = 'out/unmatched_remedies_review.md'
    template_path = 'remedy_mappings.json'
    
    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found. Run extract_similapunktur.py first.")
        return
        
    if not os.path.exists(boericke_path):
        print(f"Error: {boericke_path} not found.")
        return
        
    # Load Similapunktur data
    with open(json_path, 'r', encoding='utf-8') as f:
        simila_data = json.load(f)
        
    # Load Boericke Materia Medica
    with open(boericke_path, 'r', encoding='utf-8') as f:
        boericke = json.load(f)
    boericke_keys = set(boericke.keys())
    # Dictionary mapping normalized lowercase name -> original cased name with dot
    boericke_map = {k.lower().replace(".", "").strip(): k if k.endswith('.') else k + '.' for k in boericke_keys}
    
    # Load TTB Bönninghausen Repertory
    ttb_remedies = set()
    ttb_map = {}
    if os.path.exists(ttb_path):
        with open(ttb_path, 'r', encoding='utf-8') as f:
            ttb = json.load(f)
        for rubric, remedies in ttb.items():
            for r in remedies:
                name = r['name']
                ttb_remedies.add(name)
                ttb_map[name.lower().replace(".", "").strip()] = name if name.endswith('.') else name + '.'
    else:
        print("Warning: ttb_repertory.json not found.")

    # All target vocabulary for suggestions
    target_vocab = sorted(list(set(boericke_map.values()) | set(ttb_map.values())))
    target_vocab_clean = [t.lower().replace(".", "").strip() for t in target_vocab]
    
    # Collect all remedy occurrences in Similapunktur
    remedy_occurrences = {} # remedy -> { 'assigned_points': [], 'rubrics': [] }
    
    for item in simila_data:
        pt_id = item['point_id']
        pt_name = item['name_german']
        pt_display = f"{pt_id} ({pt_name})"
        
        for r in item.get('assigned_homeopathics', []):
            remedy_occurrences.setdefault(r, {'assigned_points': [], 'rubrics': []})
            if pt_display not in remedy_occurrences[r]['assigned_points']:
                remedy_occurrences[r]['assigned_points'].append(pt_display)
                
        for rub in item.get('general_analysis_rubrics', []):
            rubric_name = rub['rubric_name']
            for r_obj in rub.get('remedies', []):
                r = r_obj['name']
                remedy_occurrences.setdefault(r, {'assigned_points': [], 'rubrics': []})
                rub_display = f"{rubric_name} bei {pt_display}"
                if rub_display not in remedy_occurrences[r]['rubrics']:
                    remedy_occurrences[r]['rubrics'].append(rub_display)
                    
    # Identify unmatched remedies
    unmatched_remedies = []
    
    for r, occ in remedy_occurrences.items():
        r_clean = r.lower().replace(".", "").strip()
        
        # Check if in Boericke or TTB
        in_boericke = r_clean in boericke_map
        in_ttb = r_clean in ttb_map
        
        if not in_boericke and not in_ttb:
            # Generate suggestions
            close_matches = difflib.get_close_matches(r_clean, target_vocab_clean, n=3, cutoff=0.5)
            suggestions = []
            for m in close_matches:
                # Find original name
                orig = boericke_map.get(m) or ttb_map.get(m)
                if orig and orig not in suggestions:
                    suggestions.append(orig)
            
            unmatched_remedies.append({
                'name': r,
                'assigned_points': occ['assigned_points'],
                'rubrics': occ['rubrics'],
                'suggestions': suggestions
            })
            
    # Sort unmatched remedies alphabetically
    unmatched_remedies.sort(key=lambda x: x['name'].lower())
    
    # Write unmatched report in Markdown
    os.makedirs('out', exist_ok=True)
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("# Review-Vorlage: Unbekannte Arzneimittelkürzel\n\n")
        f.write("> [!NOTE]\n")
        f.write("> Diese Kürzel wurden in der Datei `Maier-Similapunkte.txt` gefunden, konnten aber\n")
        f.write("> weder in der Arzneimittellehre (Boericke) noch im Repertorium (TTB) zugeordnet werden.\n")
        f.write("> Bitte prüfen Sie diese Kürzel und tragen Sie die korrekten Mappings in `remedy_mappings.json` ein.\n\n")
        
        f.write("## Zusammenfassung\n")
        f.write(f"- Gefundene unklare Kürzel insgesamt: **{len(unmatched_remedies)}**\n")
        f.write("- Davon modern/gewollt ohne Materia Medica (z.B. Okoubaka, Harpagophytum): bitte mit `null` (keine Änderung) oder dem passenden Kürzel belegen.\n\n")
        
        f.write("## Liste der unklaren Kürzel\n\n")
        
        f.write("| Kürzel in Text | Vorkommen (Punkte/Rubriken) | Automatische Vorschläge | Gewünschtes Kürzel (durch Experte einzutragen) |\n")
        f.write("| :--- | :--- | :--- | :--- |\n")
        
        for item in unmatched_remedies:
            name = item['name']
            
            # Combine occurrences
            occ_list = []
            if item['assigned_points']:
                occ_list.append("Direkt bei: " + ", ".join(item['assigned_points'][:3]))
            if item['rubrics']:
                occ_list.append("Rubriken: " + "; ".join(item['rubrics'][:2]))
            occ_desc = " | ".join(occ_list)
            if len(occ_desc) > 150:
                occ_desc = occ_desc[:147] + "..."
                
            sug_desc = ", ".join(item['suggestions']) if item['suggestions'] else "Keine guten Treffer"
            
            # Escape pipes for markdown table compatibility
            occ_desc = occ_desc.replace('|', '\\|')
            sug_desc = sug_desc.replace('|', '\\|')
            
            f.write(f"| `{name}` | {occ_desc} | {sug_desc} | |\n")
            
    print(f"Saved review report to {report_path}")
    
    # Write a template remedy_mappings.json if it doesn't exist
    if not os.path.exists(template_path):
        mappings_template = {
            "// Info": "Mappen Sie hier unklare Kürzel auf die Standardkürzel aus Boericke/TTB. Setzen Sie den Wert auf null, wenn das Kürzel so bleiben soll.",
            "mappings": {}
        }
        for item in unmatched_remedies:
            name = item['name']
            sug = item['suggestions'][0] if item['suggestions'] else ""
            mappings_template["mappings"][name] = sug if sug else None
            
        with open(template_path, 'w', encoding='utf-8') as f:
            json.dump(mappings_template, f, ensure_ascii=False, indent=2)
        print(f"Created template mapping file at {template_path}")
    else:
        print(f"{template_path} already exists. Skipping template creation.")

if __name__ == '__main__':
    main()
