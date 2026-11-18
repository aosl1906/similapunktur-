import os
from PIL import Image, ImageFilter
import numpy as np
from scipy.ndimage import sobel

diffuse_path = 'frontend/public/models/textures/body_muscle_diffuse.png'
skin_path = 'frontend/public/models/textures/original_skin.jpg'
out_dir = 'frontend/public/models/textures'

# 1. Load baked diffuse and original skin
diffuse_im = Image.open(diffuse_path).convert('RGB')
skin_im = Image.open(skin_path).convert('RGB').resize((2048, 2048), Image.Resampling.LANCZOS)

diff_arr = np.array(diffuse_im, dtype=np.float32)
skin_arr = np.array(skin_im, dtype=np.float32)

# Mask of baked muscle: where diff_arr is non-black
mask = (diff_arr.sum(axis=2) > 15).astype(np.float32)

# Soft feathering on the mask edges
mask_im = Image.fromarray((mask * 255).astype(np.uint8))
mask_im = mask_im.filter(ImageFilter.GaussianBlur(radius=2))
mask_feathered = np.array(mask_im, dtype=np.float32) / 255.0
mask_3d = mask_feathered[:, :, np.newaxis]

# Blended Diffuse: baked muscles where present, natural skin where not baked
final_diffuse_arr = np.clip(diff_arr * mask_3d + skin_arr * (1.0 - mask_3d), 0, 255).astype(np.uint8)
final_diffuse_im = Image.fromarray(final_diffuse_arr)
final_diffuse_im.save(os.path.join(out_dir, 'body_muscle_diffuse.png'))
final_diffuse_im.save(os.path.join(out_dir, 'body_muscle_diffuse.webp'), 'WEBP', quality=85)
print('Diffuse generated and saved (PNG & WebP)')

# 2. Generate Roughness Map:
# Muscle tissue: ~0.70 roughness (matte)
# Tendons / Fascia / Aponeuroses (high brightness in diffuse): ~0.28 roughness (shiny/wet)
# Skin areas: ~0.52 roughness
gray = np.dot(final_diffuse_arr[..., :3], [0.2989, 0.5870, 0.1140]) / 255.0

roughness_arr = np.ones((2048, 2048), dtype=np.float32) * 0.52
muscle_rough = 0.76 - (gray * 0.48)
roughness_arr = np.clip(muscle_rough * mask_feathered + 0.52 * (1.0 - mask_feathered), 0.15, 0.85)
roughness_uint8 = (roughness_arr * 255).astype(np.uint8)
roughness_im = Image.fromarray(roughness_uint8)
roughness_im.save(os.path.join(out_dir, 'body_muscle_roughness.png'))
roughness_im.save(os.path.join(out_dir, 'body_muscle_roughness.webp'), 'WEBP', quality=85)
print('Roughness generated and saved (PNG & WebP)')

# 3. Generate Tangent Normal Map
dx = sobel(gray, axis=1) * 2.5
dy = sobel(gray, axis=0) * 2.5
dz = np.ones_like(gray) * 0.75

norm = np.sqrt(dx**2 + dy**2 + dz**2)
nx = (dx / norm)
ny = (dy / norm)
nz = (dz / norm)

r = ((nx * 0.5 + 0.5) * 255).astype(np.uint8)
g = ((-ny * 0.5 + 0.5) * 255).astype(np.uint8)
b = ((nz * 0.5 + 0.5) * 255).astype(np.uint8)

normal_arr = np.stack([r, g, b], axis=2)

thorax_norm_path = 'frontend/public/models/textures/body_muscle_normal_test.png'
if os.path.exists(thorax_norm_path):
    th_im = Image.open(thorax_norm_path).convert('RGB')
    th_arr = np.array(th_im)
    th_mask = (np.abs(th_arr.astype(int) - [128, 128, 255]).sum(axis=2) > 20).astype(np.float32)[:, :, np.newaxis]
    normal_arr = np.clip(th_arr * th_mask + normal_arr * (1.0 - th_mask), 0, 255).astype(np.uint8)

normal_im = Image.fromarray(normal_arr)
normal_im.save(os.path.join(out_dir, 'body_muscle_normal.png'))
normal_im.save(os.path.join(out_dir, 'body_muscle_normal.webp'), 'WEBP', quality=85)
print('Normal Map generated and saved (PNG & WebP)')
