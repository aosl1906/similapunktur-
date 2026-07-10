import os
import json
import unittest

# Ensure the database path environment variable is set
os.environ["SIMILAPUNKTUR_DB_PATH"] = "out/similapunktur.db"

# Import the tools directly
from mcp_server import (
    get_point_details,
    search_points_by_symptom,
    get_points_by_remedy,
    get_points_by_meridian
)

class TestSimilapunkturMCPServer(unittest.TestCase):
    
    def test_get_point_details_he3(self):
        """Retrieve details for HE_3 and verify the remedy list matches."""
        print("Testing get_point_details for HE_3...")
        res = get_point_details("HE_3")
        
        # Verify it has no warning banner
        self.assertFalse(res.startswith("*** WARNING:"))
        
        # Locate the JSON block (should be the entire response or after the warning if one existed)
        json_str = res[res.find("{"):] if "{" in res else res
        point_data = json.loads(json_str)
        
        self.assertEqual(point_data["point_id"], "HE_3")
        self.assertEqual(point_data["name_german"], "Herz 3")
        self.assertEqual(point_data["name_translation"], "Niedriges Meer")
        self.assertEqual(point_data["meridian"], "Herz-Leitbahn")
        
        # Expected remedy list
        expected_remedies = ["Anac.", "Aur.", "Bell.", "Calc-s.", "Cocc.", "Echi.", "Gels.", "Hell.", "Hyos.", "Hyper.", "Kali-p.", "Kalm.", "Stront-c."]
        for rem in expected_remedies:
            self.assertIn(rem, point_data["assigned_homeopathics"])
            
        print("HE_3 details verified successfully!")
        
    def test_safety_warnings_flagged(self):
        """Verify that safety warnings for points like BL_60 or KI_6 are flagged correctly."""
        print("Testing safety warnings for BL_60 and KI_6...")
        
        # 1. BL_60
        res_bl60 = get_point_details("BL_60")
        self.assertTrue(res_bl60.startswith("*** WARNING:"))
        self.assertIn("Schwangeren (Abortgefahr)!", res_bl60)
        
        # 2. KI_6
        res_ki6 = get_point_details("KI_6")
        self.assertTrue(res_ki6.startswith("*** WARNING:"))
        self.assertIn("Schwangeren behandeln!", res_ki6)
        
        # 3. BL_31
        res_bl31 = get_point_details("BL_31")
        self.assertTrue(res_bl31.startswith("*** WARNING:"))
        self.assertIn("Schwangeren behandeln!", res_bl31)
        
        print("Safety warnings verified successfully!")
        
    def test_search_points_by_symptom(self):
        """Search for symptoms and verify matches are returned."""
        print("Testing search_points_by_symptom for 'Schlaflosigkeit'...")
        res = search_points_by_symptom("Schlaflosigkeit")
        data = json.loads(res)
        
        self.assertEqual(data["query"], "Schlaflosigkeit")
        self.assertGreater(data["matches_found"], 0)
        
        # Verify schema of matches
        first_match = data["matches"][0]
        self.assertIn("id", first_match)
        self.assertIn("name_de", first_match)
        self.assertIn("meridian", first_match)
        self.assertIn("match_type", first_match)
        self.assertIn("match_text", first_match)
        
        print(f"Symptom search verified! Found {data['matches_found']} matches.")
        
    def test_get_points_by_remedy(self):
        """Verify that get_points_by_remedy handles input normalization and searches correctly."""
        print("Testing get_points_by_remedy for 'Lach'...")
        
        # Test input standardization
        res = get_points_by_remedy("Lach")
        data = json.loads(res)
        
        self.assertEqual(data["remedy_searched"], "Lach.")
        self.assertGreater(data["points_found"], 0)
        
        # Verify schema of points
        first_point = data["points"][0]
        self.assertIn("id", first_point)
        self.assertIn("name_de", first_point)
        self.assertIn("localisation", first_point)
        self.assertIn("sources", first_point)
        
        print(f"Remedy search verified! Found {data['points_found']} points for Lach.")
        
    def test_get_points_by_meridian(self):
        """Verify get_points_by_meridian returns sorted meridian points."""
        print("Testing get_points_by_meridian for 'Herz-Leitbahn'...")
        res = get_points_by_meridian("Herz-Leitbahn")
        data = json.loads(res)
        
        self.assertEqual(data["meridian"], "Herz-Leitbahn")
        self.assertEqual(data["points_count"], 5)
        
        # Verify order: HE_1, HE_3, HE_5, HE_7, HE_9
        ids = [p["id"] for p in data["points"]]
        self.assertEqual(ids, ["HE_1", "HE_3", "HE_5", "HE_7", "HE_9"])
        
        print("Meridian search verified successfully!")

if __name__ == "__main__":
    unittest.main()
