# NightFury media library

Drop all brand assets here. Anything in this folder is served by the website
at the URL `/media/<subfolder>/<filename>`.

| Folder | What goes here | Example URL |
| --- | --- | --- |
| `logos/` | Logo files (PNG/SVG, light and dark variants) | `/media/logos/nf-mark.png` |
| `products/` | Product and box photos | `/media/products/vision-led-4w.png` |
| `photos/` | Lifestyle and in-use photography | `/media/photos/highway-night.jpg` |
| `videos/` | Promo and demo videos (MP4/WebM) | `/media/videos/vision-demo.mp4` |
| `graphics/` | Banners, social graphics, illustrations | `/media/graphics/launch-banner.png` |
| `posters/` | Print posters and shelf displays | `/media/posters/dealer-a4.pdf` |

## Naming

Use lowercase with hyphens: `vision-led-2w-front.png`, not
`Vision LED (FRONT) Final2.png`. Browsers and the code reference these paths
exactly, so consistent names avoid broken images.

## Using a file on the site

Tell Claude the path (e.g. "use /media/photos/highway-night.jpg as the Vision
hero background") or reference it in code:

```tsx
<img src="/media/products/vision-led-4w.png" alt="..." />
```

Note: product page photos currently load from `/public/products/` (see
src/lib/products.ts). New assets should go here in `/public/media/` going
forward.
