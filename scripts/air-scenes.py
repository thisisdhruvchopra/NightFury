"""Make the web copies of the Aroma Air scene photos.

    python scripts/air-scenes.py

Reads  assets/products/aroma/air/<slug>-scene.png
Writes public/home/air/scene/<slug>.webp      (source size, for 1x screens)
       public/home/air/scene/<slug>@2x.webp   (upscaled and sharpened, for
                                               large and high-density screens)

The originals are 1890px wide, smaller than the stage on most laptops. The
2x copy is resampled with Lanczos and lightly sharpened, which looks crisper
than letting the browser stretch the 1x file. Replace the originals with
larger renders when you have them and run this again.
"""
from pathlib import Path
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets/products/aroma/air"
OUT = ROOT / "public/home/air/scene"
OUT.mkdir(parents=True, exist_ok=True)

for src in sorted(SRC.glob("*-scene.png")):
    slug = src.stem.removesuffix("-scene")
    im = Image.open(src).convert("RGB")
    im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=40, threshold=2)).save(OUT / f"{slug}.webp", quality=90, method=6)

    w = 3200
    big = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    big = big.filter(ImageFilter.UnsharpMask(radius=2.2, percent=70, threshold=2))
    big.save(OUT / f"{slug}@2x.webp", quality=84, method=6)
    print(slug, im.size, big.size, (OUT / f"{slug}.webp").stat().st_size // 1024, "KB /", (OUT / f"{slug}@2x.webp").stat().st_size // 1024, "KB")
