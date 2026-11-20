"""Cut the Aroma Air bottle out of each poster with a traced silhouette.

Usage: python scripts/cutout-air.py <src.png> <shape> <out.webp> [preview.png]
shape: "a" (Azure/Bonfire layout) or "b" (Impulsive layout).
Each shape is three rounded rectangles (cap, collar, body) in poster pixels.
"""
import sys
from PIL import Image, ImageDraw, ImageFilter

SHAPES = {
    #        (x0, y0, x1, y1, radius)
    "a": [(573, 341, 681, 504, 14), (564, 502, 692, 610, 10), (533, 610, 723, 1092, 44)],
    "b": [(575, 221, 701, 386, 14), (563, 388, 710, 512, 11), (525, 510, 747, 1085, 46)],
}
BOTTOM_R = 16  # tighter radius at the base than the shoulder
SS = 4         # supersample factor for smooth edges

src, shape, out = sys.argv[1], sys.argv[2], sys.argv[3]
im = Image.open(src).convert("RGB")
W, H = im.size
mask = Image.new("L", (W * SS, H * SS), 0)
d = ImageDraw.Draw(mask)
rects = SHAPES[shape]
for i, (x0, y0, x1, y1, r) in enumerate(rects):
    box = [x0 * SS, y0 * SS, x1 * SS, y1 * SS]
    d.rounded_rectangle(box, radius=r * SS, fill=255)
    if i == len(rects) - 1:  # body: square off the shoulder's bottom, then round the base tighter
        d.rectangle([x0 * SS, (y0 + r) * SS, x1 * SS, (y1 - BOTTOM_R) * SS], fill=255)
        d.rectangle([x0 * SS, (y1 - BOTTOM_R) * SS, x1 * SS, y1 * SS], fill=0)
        d.rounded_rectangle([x0 * SS, (y1 - 2 * BOTTOM_R) * SS, x1 * SS, y1 * SS], radius=BOTTOM_R * SS, fill=255)
mask = mask.resize((W, H), Image.LANCZOS).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6))

x0 = min(r[0] for r in rects); y0 = min(r[1] for r in rects)
x1 = max(r[2] for r in rects); y1 = max(r[3] for r in rects)
pad = 24
bottle = im.convert("RGBA"); bottle.putalpha(mask)
bottle = bottle.crop((x0 - pad, y0 - pad, x1 + pad, y1 + pad + 30))

# Soft contact shadow under the base so the bottle sits on the stage floor.
cw, ch = bottle.size
shadow = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
sd = ImageDraw.Draw(shadow)
by = y1 - (y0 - pad)
sd.ellipse([pad - 10, by - 10, cw - pad + 10, by + 16], fill=(10, 10, 11, 90))
shadow = shadow.filter(ImageFilter.GaussianBlur(9))
final = Image.alpha_composite(shadow, bottle)

# Keep the poster's native resolution: resizing only softens the label text.
final.save(out, "WEBP", quality=88, method=6)
if len(sys.argv) > 4:
    bg = Image.new("RGBA", final.size, (244, 245, 247, 255))
    Image.alpha_composite(bg, final).save(sys.argv[4])
print(out, final.size)
