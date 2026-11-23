# Source images

Full-size originals live here. Nothing in this folder is served by the
website, so keep the highest-quality file you have.

The website serves small, optimized copies from `public/`. Make one from the
original whenever you add or replace a photo.

## Layout

```
assets/
  products/
    <line>/            aroma, vision, care
      <format>/        core, air, essence, led-4w, ...
        <item>.png             product photo
        <item>-scene.png       wide styled scene (product in a setting)
        <item>-poster.png      full advertising poster
        <item>-box.png         retail box on a white studio background
  brand/
    flipkart/          Flipkart icon and wordmark, served from public/brand/
```

Name every file in lowercase with hyphens, using the same slug the site uses
in `src/data/products.ts`. For example, Aroma Air Azure is `azure`.

| Original | Served copy on the homepage |
| --- | --- |
| `products/aroma/core/<scent>.png` | `public/home/core/<scent>.webp` |
| `products/aroma/air/<scent>-scene.png` | `public/home/air/scene/<scent>.webp` |
| `products/aroma/essence/<scent>-box.png` | `public/home/essence/box/<scent>.webp` and `<scent>-bg.webp` |

## Adding a photo to a homepage stage

There are two kinds of stage photo.

**Cutout.** A transparent product shot that sits beside the text, as on the
Aroma Core stage.

1. Save the original here, following the layout above.
2. Make a transparent WebP in `public/home/<stage>/<slug>.webp`.
3. Set `photo: true` on that scent or model in `src/data/products.ts`.

**Scene.** A wide photo that fills the whole stage, with dark empty space on
the left for the text, as on the Aroma Air stage.

1. Save the original as `<slug>-scene.png`.
2. Run `python scripts/air-scenes.py`. It writes `<slug>.webp` and a
   sharpened `<slug>@2x.webp` for large screens to `public/home/air/scene/`.
   Use originals at least 3000px wide when you can; the current ones are
   1890px, which is why the 2x copies are upscaled.
3. Set `scene: true` on that scent in `src/data/products.ts`. The stage
   switches to the photo layout once every scent in it has a scene.

Keep the product in the right half of a scene photo. The left side is
covered by the scent name, notes and button.

**Box.** A retail box photo, shown in the centre of the stage over a blurred
copy of itself, with the copy on either side, as on the Aroma Essence stage.

1. Save the original as `<slug>-box.png`, on a plain white background.
2. Run `python scripts/essence-box.py`. It crops the box and writes both
   WebP files to `public/home/essence/box/`.
3. Set `box: true` on that scent in `src/data/products.ts`.

`scripts/cutout-air.py` traces the bottle out of the original Aroma Air
posters, if you ever want cutouts of them again.
