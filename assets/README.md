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
```

Name every file in lowercase with hyphens, using the same slug the site uses
in `src/data/products.ts`. For example, Aroma Air Azure is `azure`.

| Original | Served copy on the homepage |
| --- | --- |
| `products/aroma/core/<scent>.png` | `public/home/core/<scent>.webp` |
| `products/aroma/air/<scent>-scene.png` | `public/home/air/scene/<scent>.webp` |

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
2. Save a WebP copy, quality about 84, in `public/home/<stage>/scene/<slug>.webp`.
3. Set `scene: true` on that scent in `src/data/products.ts`. The stage
   switches to the photo layout once every scent in it has a scene.

Keep the product in the right half of a scene photo. The left side is
covered by the scent name, notes and button.

`scripts/cutout-air.py` traces the bottle out of the original Aroma Air
posters, if you ever want cutouts of them again.
