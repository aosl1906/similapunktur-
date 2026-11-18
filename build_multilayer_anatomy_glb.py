import bpy
import numpy as np
import os
import shutil

print("=== BUILDING PRODUCTION 4-LAYER ANATOMY GLB (SKIN + MUSCLES + TENDONS + SKELETON) ===")

# Backup old human_body.glb if not already backed up
old_glb = "frontend/public/models/human_body.glb"
backup_glb = "models_raw/human_body_old_tripo.glb"
if os.path.exists(old_glb) and not os.path.exists(backup_glb):
    shutil.copy2(old_glb, backup_glb)
    print("Backed up old Tripo human_body.glb to", backup_glb)

bpy.ops.wm.read_factory_settings(use_empty=True)

data = np.load('models_raw/bp3d_atlas/extracted/layers_clean.npz')
skin_pos = data['skin_pos']
y_min = float(skin_pos[:, 1].min())
y_max = float(skin_pos[:, 1].max())
y_center = (y_min + y_max) / 2.0
scale = 1.802 / (y_max - y_min)
print(f"Scaling factor: {scale:.6f} (y_center={y_center:.5f}) -> target Y [-0.901, +0.901]")

def create_blender_mesh(name, pos, idx, mat, decimate_ratio=None, weld_thresh=0.0001):
    b_pos = np.empty_like(pos, dtype=np.float32)
    b_pos[:, 0] = pos[:, 0] * scale
    b_pos[:, 1] = -pos[:, 2] * scale
    b_pos[:, 2] = (pos[:, 1] - y_center) * scale
    
    mesh = bpy.data.meshes.new(name + "_Mesh")
    mesh.from_pydata(b_pos.tolist(), [], idx.tolist())
    mesh.update()
    for poly in mesh.polygons:
        poly.use_smooth = True
        
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    
    bpy.context.view_layer.objects.active = obj
    if weld_thresh is not None:
        bpy.ops.object.mode_set(mode='EDIT')
        bpy.ops.mesh.select_all(action='SELECT')
        bpy.ops.mesh.remove_doubles(threshold=weld_thresh)
        bpy.ops.object.mode_set(mode='OBJECT')
        
    if decimate_ratio is not None and decimate_ratio < 1.0:
        mod = obj.modifiers.new(name="Decimate", type='DECIMATE')
        mod.ratio = decimate_ratio
        bpy.ops.object.modifier_apply(modifier=mod.name)
        
    for poly in obj.data.polygons:
        poly.use_smooth = True
    print(f"Created {name}: {len(obj.data.vertices)} verts, {len(obj.data.polygons)} tris")
    return obj

def make_pbr_mat(name, base_color, roughness=0.5, metalness=0.02):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*base_color, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metalness
    return m

mat_skin = make_pbr_mat("Mat_Clinical_Skin", (0.92, 0.89, 0.85), roughness=0.50)
mat_musc = make_pbr_mat("Mat_Anatomy_Muscles", (0.65, 0.24, 0.20), roughness=0.54)
mat_tend = make_pbr_mat("Mat_Anatomy_Tendons", (0.88, 0.84, 0.77), roughness=0.28)
mat_skel = make_pbr_mat("Mat_Anatomy_Skeleton", (0.91, 0.87, 0.76), roughness=0.42)

#Wait: In skin_pos, the last 4 parts (FJ1317, FJ1368, FJ1289, FJ1340) are the eyeballs (which have 19,968 tris out of 44,304 tris).
# Decimating the eyeballs or keeping skin_pos as-is: wait - 44,304 tris is already smaller than the old human_body.glb (50,000 tris)!
obj_skin = create_blender_mesh("HumanBody", data['skin_pos'], data['skin_idx'], mat_skin, decimate_ratio=None, weld_thresh=None)
obj_musc = create_blender_mesh("AnatomyMuscles", data['musc_pos'], data['musc_idx'], mat_musc, decimate_ratio=0.18, weld_thresh=0.0001)
obj_tend = create_blender_mesh("AnatomyTendons", data['tend_pos'], data['tend_idx'], mat_tend, decimate_ratio=0.45, weld_thresh=0.0001)
obj_skel = create_blender_mesh("AnatomySkeleton", data['skel_pos'], data['skel_idx'], mat_skel, decimate_ratio=0.24, weld_thresh=0.0001)

# Export multi-layer GLB
out_glb = os.path.abspath("frontend/public/models/human_body.glb")
bpy.ops.export_scene.gltf(
    filepath=out_glb,
    export_format='GLB',
    export_apply=True,
    export_normals=True,
    export_materials='EXPORT'
)
size_mb = os.path.getsize(out_glb) / (1024 * 1024)
print(f"=== EXPORTED {out_glb} ({size_mb:.2f} MB) ===")
