import json
import struct
import numpy as np
from scipy.spatial import cKDTree

print("=== RE-PROJECTING ALL 153 ACUPUNCTURE POINTS TO NEW BODYPARTS3D 4.0 SKIN & SKELETON ===")

# 1. Load Old_Skin (models_raw/human_body_old_tripo.glb)
with open('models_raw/human_body_old_tripo.glb', 'rb') as f:
    f.seek(12)
    clen = struct.unpack('<I', f.read(4))[0]
    f.seek(20)
    j_old = json.loads(f.read(clen).decode())
    bin_old = f.read(struct.unpack('<I4s', f.read(8))[0])

pr_old = j_old['meshes'][0]['primitives'][0]
acc_old = j_old['accessors'][pr_old['attributes']['POSITION']]
bv_old = j_old['bufferViews'][acc_old['bufferView']]
old_pos = np.frombuffer(bin_old, dtype=np.float32, count=acc_old['count']*3, offset=bv_old.get('byteOffset',0)+acc_old.get('byteOffset',0)).reshape(-1, 3)

# 2. Load New_Skin from layers_clean.npz and apply exact scale to [-0.901, +0.901]
d = np.load('models_raw/bp3d_atlas/extracted/layers_clean.npz')
raw_skin_pos = d['skin_pos']
skin_idx = d['skin_idx']
y_min, y_max = float(raw_skin_pos[:,1].min()), float(raw_skin_pos[:,1].max())
y_center = (y_min + y_max) / 2.0
scale = 1.802 / (y_max - y_min)

new_pos = np.empty_like(raw_skin_pos, dtype=np.float64)
new_pos[:, 0] = raw_skin_pos[:, 0] * scale
new_pos[:, 1] = (raw_skin_pos[:, 1] - y_center) * scale
new_pos[:, 2] = raw_skin_pos[:, 2] * scale

# Compute triangle centroids and outward normals on New_Skin
v0, v1, v2 = new_pos[skin_idx[:,0]], new_pos[skin_idx[:,1]], new_pos[skin_idx[:,2]]
tri_centers = (v0 + v1 + v2) / 3.0
tri_nrms = np.cross(v1 - v0, v2 - v0)
tri_nrms /= (np.linalg.norm(tri_nrms, axis=1, keepdims=True) + 1e-12)

# Dense sample points on New_Skin triangles (vertices + centroids + edge midpoints)
m01 = (v0 + v1) * 0.5
m12 = (v1 + v2) * 0.5
m20 = (v2 + v0) * 0.5
vn = d['skin_nrm'].astype(np.float64)
vn /= (np.linalg.norm(vn, axis=1, keepdims=True) + 1e-12)
n0, n1, n2 = vn[skin_idx[:,0]], vn[skin_idx[:,1]], vn[skin_idx[:,2]]

dense_pts = np.vstack([new_pos, tri_centers, m01, m12, m20])
dense_nrms = np.vstack([
    vn,
    tri_nrms,
    (n0 + n1) / (np.linalg.norm(n0 + n1, axis=1, keepdims=True) + 1e-12),
    (n1 + n2) / (np.linalg.norm(n1 + n2, axis=1, keepdims=True) + 1e-12),
    (n2 + n0) / (np.linalg.norm(n2 + n0, axis=1, keepdims=True) + 1e-12),
])

# Partition dense_pts into Trunk/Head vs Left Arm vs Left Leg so lateral rib points never jump to medial arm!
trunk_mask = (np.abs(dense_pts[:, 0]) <= 0.143) | (dense_pts[:, 1] >= 0.54)
trunk_pts, trunk_nrms = dense_pts[trunk_mask], dense_nrms[trunk_mask]
trunk_tree = cKDTree(trunk_pts)

arm_mask = (dense_pts[:, 0] >= 0.142) & (dense_pts[:, 1] > -0.18)
arm_pts, arm_nrms = dense_pts[arm_mask], dense_nrms[arm_mask]
arm_tree = cKDTree(arm_pts)

leg_mask = (dense_pts[:, 0] >= 0.010) & (dense_pts[:, 1] < 0.05)
leg_pts, leg_nrms = dense_pts[leg_mask], dense_nrms[leg_mask]
leg_tree = cKDTree(leg_pts)

# 3. Load Atlas bone bounds in scaled coordinates for exact hand/finger/forearm/vertebral anchoring
atlas = json.load(open('models_raw/bp3d_atlas/atlas.json', 'r', encoding='utf-8'))
part_map = {p['id']: p for p in atlas['parts']}
def bone_box(pid):
    b = np.array(part_map[pid]['bounds'], dtype=np.float64)
    b[:, 0] *= scale
    b[:, 1] = (b[:, 1] - y_center) * scale
    b[:, 2] *= scale
    return b[0], b[1], b.mean(axis=0)

# Osteologically calibrated piecewise-linear Y curve for axial body (Head, Neck, Torso, Legs)
# Anchored to Calcaneus (-0.891), Malleoli (-0.835), Tibial tuberosity (-0.455), Patella (-0.420),
# Pubic symphysis (+0.018), Umbilicus (+0.175), 12th rib (+0.238), 11th rib (+0.252),
# 7th ICS (+0.348), Xiphoid/CV_15 (+0.388), 4th ICS/CV_17 (+0.440), Manubrium/CV_22 (+0.568), C7 (+0.618), Vertex (+0.901)
old_y_knots = np.array([-0.901, -0.827, -0.754, -0.488, -0.440, -0.051, 0.002, 0.125, 0.167, 0.188, 0.293, 0.306, 0.394, 0.477, 0.504, 0.548, 0.565, 0.689, 0.800, 0.901])
new_y_knots = np.array([-0.901, -0.838, -0.758, -0.455, -0.418,  0.005, 0.018, 0.175, 0.238, 0.252, 0.348, 0.382, 0.440, 0.525, 0.550, 0.572, 0.612, 0.730, 0.815, 0.901])

def get_slice_profile(pos_arr, y_val, region, is_new=False, dy=0.020):
    sub = pos_arr[np.abs(pos_arr[:,1] - y_val) <= dy]
    if region == 'torso_head':
        max_x = 0.141 if (is_new and y_val < 0.53) else (0.158 if y_val < 0.53 else 0.180)
        sub = sub[np.abs(sub[:,0]) < max_x]
    elif region == 'left_leg':
        sub = sub[sub[:,0] > 0.015]
    elif region == 'left_arm':
        sub = sub[sub[:,0] > 0.150]
    if len(sub) < 5:
        sub = pos_arr[np.abs(pos_arr[:,1] - y_val) <= dy * 2.2]
        if region == 'left_leg': sub = sub[sub[:,0] > 0.01]
        elif region == 'left_arm': sub = sub[sub[:,0] > 0.145]
        elif region == 'torso_head': sub = sub[np.abs(sub[:,0]) < (0.143 if is_new else 0.160)]
    xmin, zmin = sub[:,0].min(), sub[:,2].min()
    xmax, zmax = sub[:,0].max(), sub[:,2].max()
    cx = 0.0 if region == 'torso_head' else (xmin + xmax) * 0.5
    cz = (zmin + zmax) * 0.5
    rx = max((xmax - xmin) * 0.5 if region != 'torso_head' else max(abs(xmin), abs(xmax)), 0.012)
    rz = max((zmax - zmin) * 0.5, 0.012)
    return cx, cz, rx, rz

# Explicit anatomical targets on New_Skin for the Upper Limb (Shoulder, Elbow, Supinated Forearm, Wrist, Hand/Fingers)
# Using exact bone landmarks from BodyParts3D 4.0 (Left humerus FJ3262, Left radius FJ3277, Left ulna FJ3286, Metacarpals & Phalanges)
UPPER_LIMB_TARGETS = {
    # Shoulder & Axilla
    'LI_15': (np.array([0.232, 0.558, -0.022]), np.array([0.85, 0.45, 0.15])),
    'SI_9':  (np.array([0.184, 0.485, -0.105]), np.array([0.35, -0.10, -0.93])),
    'HE_1':  (np.array([0.162, 0.478, +0.018]), np.array([-0.35, -0.20, 0.91])),
    # Upper Arm (Biceps brachii radial & medial borders)
    'LU_3':  (np.array([0.228, 0.405, +0.018]), np.array([0.45, 0.0, 0.89])),
    'LU_4':  (np.array([0.232, 0.372, +0.018]), np.array([0.45, 0.0, 0.89])),
    'HE_2':  (np.array([0.186, 0.342, +0.002]), np.array([-0.65, 0.0, 0.76])),
    # Elbow / Cubital Crease (Y ~ 0.264 on supinated arm)
    'LI_11': (np.array([0.258, 0.268, -0.015]), np.array([0.90, 0.0, -0.42])),
    'LU_5':  (np.array([0.236, 0.264, +0.022]), np.array([0.20, 0.10, 0.97])),
    'PC_3':  (np.array([0.215, 0.262, +0.022]), np.array([0.00, 0.10, 0.99])),
    'HE_3':  (np.array([0.194, 0.258, +0.010]), np.array([-0.60, 0.0, 0.80])),
    'TE_10': (np.array([0.215, 0.288, -0.062]), np.array([0.00, 0.0, -1.00])),
    'SI_8':  (np.array([0.195, 0.260, -0.055]), np.array([-0.55, 0.0, -0.83])),
    # Supinated Forearm & Wrist:
    # Lung (LU): Radial-palmar line from LU_5 (0.236, 0.264, +0.022) to LU_9 (0.282, 0.028, +0.028)
    'LU_5_MANN': (np.array([0.243, 0.234, +0.024]), np.array([0.25, 0.10, 0.96])),
    'LU_6':  (np.array([0.256, 0.162, +0.026]), np.array([0.30, 0.10, 0.95])),
    'LU_7':  (np.array([0.282, 0.058, +0.025]), np.array([0.55, 0.0, 0.83])),
    'LU_8':  (np.array([0.281, 0.044, +0.028]), np.array([0.40, 0.0, 0.92])),
    'LU_9':  (np.array([0.280, 0.028, +0.030]), np.array([0.35, 0.0, 0.94])),
    # Pericardium (PC): Median-palmar line from PC_3 (0.215, 0.262, +0.022) to PC_7 (0.262, 0.026, +0.028)
    'PC_6':  (np.array([0.254, 0.068, +0.026]), np.array([0.05, 0.0, 0.99])),
    'PC_7':  (np.array([0.262, 0.026, +0.028]), np.array([0.05, 0.0, 0.99])),
    # Heart (HE): Ulnar-palmar line from HE_3 (0.194, 0.258, +0.010) to HE_7 (0.244, 0.024, +0.025)
    'HE_4':  (np.array([0.236, 0.062, +0.024]), np.array([-0.25, 0.0, 0.97])),
    'HE_5':  (np.array([0.239, 0.050, +0.024]), np.array([-0.25, 0.0, 0.97])),
    'HE_6':  (np.array([0.242, 0.037, +0.025]), np.array([-0.25, 0.0, 0.97])),
    'HE_7':  (np.array([0.245, 0.024, +0.025]), np.array([-0.25, 0.0, 0.97])),
    # Large Intestine (LI) & Triple Energizer (TE) on Dorsal Forearm (-Z)
    'LI_6':  (np.array([0.278, 0.088, -0.015]), np.array([0.60, 0.0, -0.80])),
    'TE_5':  (np.array([0.256, 0.068, -0.028]), np.array([0.00, 0.0, -1.00])),
    'TE_4':  (np.array([0.264, 0.024, -0.022]), np.array([0.00, 0.0, -1.00])),
}

def get_hand_point_target(pid):
    if pid in UPPER_LIMB_TARGETS:
        return UPPER_LIMB_TARGETS[pid]
    if pid == 'LU_11': # Radial nail corner of thumb
        bmin, bmax, bc = bone_box('FJ3188') # Distal phalanx of left thumb
        return np.array([bmax[0] + 0.004, bc[1], bc[2] + 0.005]), np.array([0.6, 0.0, 0.8])
    if pid == 'LU_10': # Midpoint of 1st metacarpal bone, radial/palmar border (thenar eminence)
        bmin, bmax, bc = bone_box('FJ3240')
        return np.array([bc[0] + 0.008, bc[1], bmax[2] + 0.012]), np.array([0.3, 0.0, 0.95])
    if pid == 'LI_1': # Radial nail corner of index finger
        bmin, bmax, bc = bone_box('FJ3183')
        return np.array([bmax[0] + 0.003, bmin[1] + 0.004, bc[2]]), np.array([0.6, -0.2, -0.7])
    if pid == 'LI_3': # Radial side of index finger, proximal to 2nd MCP joint
        bmin, bmax, bc = bone_box('FJ3243')
        return np.array([bmax[0] + 0.008, bmin[1] + 0.010, bc[2] - 0.008]), np.array([0.7, 0.0, -0.7])
    if pid == 'LI_4': # Dorsum of hand between 1st and 2nd metacarpals
        _, _, bc1 = bone_box('FJ3240')
        _, _, bc2 = bone_box('FJ3243')
        mid = 0.45 * bc1 + 0.55 * bc2
        return np.array([mid[0] + 0.005, mid[1], mid[2] - 0.015]), np.array([0.3, 0.0, -0.95])
    if pid == 'PC_9': # Tip / radial nail corner of middle finger
        bmin, bmax, bc = bone_box('FJ3186')
        return np.array([bc[0], bmin[1] - 0.002, bmax[2] + 0.004]), np.array([0.0, -0.4, 0.9])
    if pid == 'PC_8': # Palm of hand, between 2nd and 3rd metacarpals
        _, _, bc2 = bone_box('FJ3243')
        _, _, bc3 = bone_box('FJ3246')
        mid = 0.5 * (bc2 + bc3)
        return np.array([mid[0], mid[1] - 0.005, mid[2] + 0.016]), np.array([0.0, 0.0, 1.0])
    if pid == 'HE_9': # Radial nail corner of little finger
        bmin, bmax, bc = bone_box('FJ3184')
        return np.array([bmax[0] + 0.002, bmin[1] + 0.003, bmax[2] + 0.003]), np.array([0.3, -0.2, 0.9])
    if pid == 'HE_8': # Palm of hand, between 4th and 5th metacarpals
        _, _, bc4 = bone_box('FJ3249')
        _, _, bc5 = bone_box('FJ3252')
        mid = 0.5 * (bc4 + bc5)
        return np.array([mid[0], mid[1] - 0.005, mid[2] + 0.015]), np.array([0.0, 0.0, 1.0])
    if pid == 'TE_3': # Dorsum of hand, between 4th and 5th metacarpals proximal to MCP joint
        bmin4, _, bc4 = bone_box('FJ3249')
        bmin5, _, bc5 = bone_box('FJ3252')
        mid = 0.5 * (bc4 + bc5)
        return np.array([mid[0], 0.5*(bmin4[1]+bmin5[1]) + 0.012, mid[2] - 0.015]), np.array([-0.2, 0.0, -0.98])
    if pid == 'SI_3': # Ulnar border of hand, proximal to 5th MCP joint
        bmin5, bmax5, bc5 = bone_box('FJ3252')
        return np.array([bmin5[0] - 0.010, bmin5[1] + 0.012, bc5[2]]), np.array([-0.95, 0.0, -0.2])
    return None

# Always read from the untouched original Tripo coordinates backup!
orig_json_path = 'models_raw/points_3d_original_tripo.json'
pts_json_path = 'frontend/public/data/points_3d.json'
pts_data = json.load(open(orig_json_path, 'r', encoding='utf-8'))

for pt in pts_data['points']:
    pid = pt['id']
    mid = pt['meridian_id']
    ox, oy, oz = pt['position']
    onx, ony, onz = pt.get('normal', [0.0, 0.0, 1.0])
    old_nrm = np.array([onx, ony, onz], dtype=np.float64)
    old_nrm /= (np.linalg.norm(old_nrm) + 1e-12)
    
    # 1. Check if it's one of the 35 upper-limb (shoulder/arm/forearm/wrist/hand) points
    hand_res = get_hand_point_target(pid)
    if hand_res is not None:
        target_pos, target_nrm = hand_res
        target_nrm = target_nrm / (np.linalg.norm(target_nrm) + 1e-12)
        active_tree, active_pts, active_nrms = arm_tree, arm_pts, arm_nrms
    elif oy < -0.075:
        # Left leg & foot
        ny = float(np.interp(oy, old_y_knots, new_y_knots))
        cx_o, cz_o, rx_o, rz_o = get_slice_profile(old_pos, oy, 'left_leg', is_new=False)
        cx_n, cz_n, rx_n, rz_n = get_slice_profile(new_pos, ny, 'left_leg', is_new=True)
        ux = (ox - cx_o) / rx_o
        uz = (oz - cz_o) / rz_o
        nx = cx_n + ux * rx_n
        nz = cz_n + uz * rz_n
        target_pos = np.array([nx, ny, nz])
        target_nrm = old_nrm
        active_tree, active_pts, active_nrms = leg_tree, leg_pts, leg_nrms
    else:
        # Head, Neck, and Torso (strictly snaps to trunk_tree so lateral ribs never jump to inner arm)
        ny = float(np.interp(oy, old_y_knots, new_y_knots))
        cx_o, cz_o, rx_o, rz_o = get_slice_profile(old_pos, oy, 'torso_head', is_new=False)
        cx_n, cz_n, rx_n, rz_n = get_slice_profile(new_pos, ny, 'torso_head', is_new=True)
        ux = (ox - cx_o) / rx_o
        uz = (oz - cz_o) / rz_o
        nx = cx_n + ux * rx_n
        nz = cz_n + uz * rz_n
        if mid in ('konzeptionsgefaess', 'lenkergefaess', 'extrapunkte'):
            nx = 0.0 # strict anatomical midline for CV / GV / EX_1
        target_pos = np.array([nx, ny, nz])
        target_nrm = old_nrm
        active_tree, active_pts, active_nrms = trunk_tree, trunk_pts, trunk_nrms

    # Snap target_pos onto the nearest point on the region-specific New_Skin tree with compatible surface normal
    dists, idxs = active_tree.query(target_pos, k=64)
    cand_pts = active_pts[idxs]
    cand_nrms = active_nrms[idxs]
    
    nrm_dots = np.sum(cand_nrms * target_nrm, axis=1)
    valid = nrm_dots > 0.25
    if np.any(valid):
        best_local = np.where(valid)[0][np.argmin(dists[valid] - 0.008 * nrm_dots[valid])]
    else:
        best_local = 0
        
    surf_pt = cand_pts[best_local].copy()
    surf_nrm = cand_nrms[best_local].copy()
    if mid in ('konzeptionsgefaess', 'lenkergefaess', 'extrapunkte'):
        surf_pt[0] = 0.0
        surf_nrm[0] = 0.0
        surf_nrm /= (np.linalg.norm(surf_nrm) + 1e-12)
        
    # Offset by +2.2mm along outward surface normal so sphere sits cleanly on skin
    final_pt = surf_pt + surf_nrm * 0.0022
    pt['position'] = [round(float(final_pt[0]), 4), round(float(final_pt[1]), 4), round(float(final_pt[2]), 4)]
    pt['normal'] = [round(float(surf_nrm[0]), 4), round(float(surf_nrm[1]), 4), round(float(surf_nrm[2]), 4)]

with open(pts_json_path, 'w', encoding='utf-8') as f:
    json.dump(pts_data, f, indent=2, ensure_ascii=False)

print("=== SUCCESSFULLY RE-PROJECTED ALL 153 POINTS TO frontend/public/data/points_3d.json ===")
for check_id in ['GV_20', 'EX_1', 'CV_22', 'CV_17', 'CV_14', 'LR_14', 'GB_23', 'GB_24', 'LR_13', 'GB_25', 'ST_25', 'CV_4', 'LU_1', 'LU_5', 'LU_7', 'LU_9', 'PC_6', 'PC_7', 'HE_3', 'HE_7', 'LI_4', 'LI_11', 'ST_36', 'SP_6', 'KI_3', 'BL_60', 'LR_3']:
    p = next(x for x in pts_data['points'] if x['id'] == check_id)
    print(f"  {check_id:8s}: pos={p['position']} nrm={p['normal']}")
