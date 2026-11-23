"""Crop each Aroma Essence box out of its white studio shot and make a
blurred backdrop for the homepage stage.

    python scripts/essence-box.py

Reads  assets/products/aroma/essence/<slug>-box.png
Writes public/home/essence/box/<slug>.webp      (the box, cropped tight)
       public/home/essence/box/<slug>-bg.webp   (soft, dark backdrop)
"""
from pathlib import Path
from PIL import Image, ImageFilter, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets/products/aroma/essence"
OUT = ROOT / "public/home/essence/box"
OUT.mkdir(parents=True, exist_ok=True)

for src in sorted(SRC.glob("*-box.png")):
    slug = src.stem.removesuffix("-box")
    im = Image.open(src).convert("RGB")
    # The navy box is the only dark area; the white set and reflection are light.
    l, t, r, b = im.convert("L").point(lambda v: 255 if v < 110 else 0).getbbox()
    box = im.crop((l + 3, t + 3, r - 3, b - 3))
    # Keep full resolution for sharp 2x screens, capped at 1400px wide.
    if box.width > 1400:
        box = box.resize((1400, round(box.height * 1400 / box.width)), Image.LANCZOS)
    box.save(OUT / f"{slug}.webp", quality=85, method=6)

    bg = box.resize((480, round(box.height * 480 / box.width)), Image.LANCZOS)
    bg = bg.filter(ImageFilter.GaussianBlur(28))
    bg = ImageEnhance.Brightness(bg).enhance(0.55)
    bg = ImageEnhance.Color(bg).enhance(1.25)
    bg.save(OUT / f"{slug}-bg.webp", quality=70, method=6)
    print(slug, box.size, (OUT / f"{slug}.webp").stat().st_size // 1024, "KB")
