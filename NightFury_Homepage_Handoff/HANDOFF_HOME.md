# NightFury homepage: Claude Code handoff (v2, 30 Oct 2026)

Build the new homepage (`/`) for nightfury.co.in. The page is a centred, text-led hero that introduces Vision, Aroma and Care. Below it sit three category bands, each followed by scroll-pinned product stages. The page ends with one dealer band and the footer.

This brief covers the homepage only. It **supersedes every homepage detail** in `Website_Rebuild_Handoff.md` (the old sense panels, the "Get it your way" section, the newsletter and section 7.1). Everything else in that brief still applies unchanged, including design tokens, logo rules, business rules, forms, SEO and the data module.

## 1. Package

| Path | What it is |
| --- | --- |
| `design/Main.dc.html` | Homepage hi-fi design (the spec) |
| `HANDOFF_HOME.md` | This brief |

`Main.dc.html` is a **design reference, not production code**. It runs on an internal prototyping runtime: `<sc-for>`, `<sc-if>`, `{{holes}}` and a `class Component extends DCLogic` block. Do not port that runtime. Use the inline styles, copy, layout and the `NF_SECTIONS` data array in the `<script data-dc-script>` block as the spec. Replace `<sc-for list>` with `.map()`, `<sc-if>` with conditionals, and `{{x}}` with props or state.

## 2. Page structure, top to bottom

| # | Block | Anchor | Notes |
| --- | --- | --- | --- |
| 1 | Marquee | | Navy bar, 2px orange bottom border, 30s loop |
| 2 | Header | | Sticky, 76px, white |
| 3 | Hero | | Centred headline, brand line, three category columns |
| 4 | Aroma band | `#aroma` | Navy divider |
| 5 | Stage: Aroma Core | `#core` | 5 scents, Organic/Gel toggle |
| 6 | Stage: Aroma Air | `#air` | 3 scents |
| 7 | Stage: Aroma Essence | `#essence` | 3 scents |
| 8 | Vision band | `#vision` | Navy divider |
| 9 | Stage: 4-Wheeler LED | `#led-4w` | 240W, 300W |
| 10 | Stage: 2-Wheeler LED | `#led-2w` | 12W, 25W (coming soon) |
| 11 | Care band | `#care` | Navy divider |
| 12 | Stage: Car Care | `#care-range` | Microfiber, Wet Wipes (coming soon) |
| 13 | Dealer band | `#buy` | Orange, one main CTA plus a Flipkart text link |
| 14 | Footer | | Navy, shared component |

Every anchored block gets `scroll-margin-top: 76px` so in-page jumps land below the sticky header.

## 3. Block specs

### 3.1 Marquee
- Messages, duplicated for a seamless loop: "18-month warranty on Vision", "Now live on Flipkart", "Dealer enquiries open across India", separated by `//`.
- Spline Sans Mono 12px, 700, uppercase, letter-spacing 0.16em, chalk on navy.
- Pause the animation under `prefers-reduced-motion`.

### 3.2 Header
- Logo lockup as HTML text: NIGHT (carbon) plus FURY (`#FF5500`) in Saira Condensed 800 italic 34px with `skewX(-4deg)`. Under it, "DRIVE THE DIFFERENCE" in Spline Sans Mono 600 8px, letter-spacing 0.42em, centred. The logo links to `/`.
- Centre links in Spline Sans Mono 13px, 500, uppercase, not italic, with an orange 3px underline that grows on hover:
  - Lighting → `/vision`
  - Car Perfumes → `/aroma`
  - Car Care → `/care`
  - Where to Buy → `/where-to-buy`
- Right: a flat navy "Become a Dealer" button → `/dealers`.
- On phones the links wrap or collapse into a menu button. Do not let the header exceed 76px when sticky on desktop.

### 3.3 Hero (centred)
- Container max-width 1280px, padding 80px 40px 88px, everything centred on one axis.
- H1: "Drive the" / "difference." on two lines. Saira Condensed 800 italic, 136px, line-height 0.84, letter-spacing -0.02em, uppercase. "difference." uses `#E04A00`. Use `clamp()` down to about 64px on phones.
- Brand line, max-width 560px, 32px below: "NightFury makes premium automotive accessories for drivers who want any car to feel special. One brand, built around three senses." Spline Sans Mono 15px, line-height 1.75, `#3A3D46`.
- 72px below: a three-column grid with 40px gaps that stacks on mobile. Each column has a 3px navy top rule, centred text, and a flex column so all three buttons align at the same height:

| Eyebrow | Title | Tagline | Description | Button → target |
| --- | --- | --- | --- | --- |
| 01 // SEE | Vision | See the difference | LED headlights for 4-wheelers and 2-wheelers. Brighter, whiter light, backed by an 18-month warranty. | Explore ↓ → `#vision` |
| 02 // SMELL | Aroma | Smell the difference | Car perfumes in three formats: Core for the dash, Air as a spray, Essence to hang. Eleven scents in all. | Explore ↓ → `#aroma` |
| 03 // FEEL | Care | Feel the difference | Microfiber cloths and wet wipes to keep the cabin and paint spotless. Coming soon. | Explore ↓ → `#care` |

- The eyebrow is mono 12px, 700, letter-spacing 0.18em, `#B83E00`. The title is 56px 800 italic. The tagline is 20px 800 italic uppercase, `#E04A00`. The description is mono 14px, max-width 340px, and grows (`flex: 1`) so the buttons line up.
- **Small** skew buttons: navy fill, chalk text, 14px 800 italic uppercase, padding 9px 16px, `skewX(-8deg)` with the label counter-skewed, and a `4px 4px 0` orange hard shadow. Clicking smooth-scrolls to the band (honour reduced motion).
- There are no product images or panels in the hero. This is deliberate.

### 3.4 Category bands (Aroma, Vision, Care)
- Full-width navy (`#020F26`) band, padding 56px 40px, content centred.
- Title: Saira Condensed 800 italic 96px uppercase in chalk.
- Tagline 16px below it: Spline Sans Mono 13px, 700, uppercase, letter-spacing 0.32em, in `#FF5500`. Offset the trailing letter-spacing with `margin-right: -0.32em` so it centres optically.
- Copy: Aroma / "Smell the difference"; Vision / "See the difference"; Care / "Feel the difference".

### 3.5 Scroll stages (the core interaction)
There are six stages, each a tall track holding a pinned stage. Each scroll step shows one item: a scent, a wattage or a product. Section 4 has the full mechanics.

**Layout inside the stage** (max-width 1280px, two columns that wrap on mobile):

Left column:
1. Eyebrow: the stage title (for example "Aroma Core") in mono 13px 700 `#B83E00`. A muted suffix follows where the data has one, for example " // 50 ml spray".
2. **Aroma Core only:** an Organic | Gel segmented toggle (section 3.6).
3. Item name: Saira Condensed 800 italic 96px uppercase, coloured with the item's `deep` colour. The colour transitions over 0.5s.
4. Character line: 24px 800 italic uppercase.
5. Three info tiles in a row, max-width 520px. Each has a white 75% fill and a 2px navy border; the label is mono 10px 700 in `deep`, the value mono 13px.
   - Scents: Top, Heart, Base.
   - LEDs and Care: three specs.
6. One skew CTA (navy, 17px, `6px 6px 0` orange shadow). The label depends on the item:
   - `coming-soon` → "Get notified →", opening the notify form for that product.
   - `live` with a `flipkartUrl` → "Buy on Flipkart →", opening in a new tab with `rel="noopener"`.
   - `live` without a URL → "Coming to Flipkart soon", linking to the notify or dealer form.
7. Rail: a wrapping row of buttons, one per item. Each shows a small colour square plus the name. The active item is navy with chalk text; the rest are white with a navy border. Clicking smooth-scrolls to that step.
8. Progress bar: 3px tall, max-width 360px, navy fill at `(index + 1) / count`.

Right column: the product visual centred on a 400px circle in the item's `halo` colour, with a soft floor shadow.
- The prototype uses CSS illustrations: Core jar (with wooden blocks when Organic), Air atomizer, Essence hanging bottle, 4W bulb with beam, 2W round headlamp, folded cloths and a wipes pack.
- **In production, replace each with a transparent product photo** at `/public/home/{stage}/{item-slug}.webp`, about 900px. Keep the halo and swap images with a short crossfade.
- Until photos exist, keep the illustration or a single generic product shot, behind a per-item flag.

**Background:** the whole track (not only the sticky stage) takes the active item's `tint` colour with a 0.6s transition. This ensures no white gap ever shows below the pinned stage.

**Stage contents and order:**

| Stage | Items in order | Status | CTA |
| --- | --- | --- | --- |
| Aroma Core | Nature's Bloom, Earth Essence (Organic), then Citrus Zest, Berry Bloom, Mountain Mint (Gel) | live | Buy on Flipkart (all five have URLs) |
| Aroma Air | Azure, Bonfire, Impulsive | live, no URL yet | Coming to Flipkart soon |
| Aroma Essence | Blue Ocean, Romance, Fresh Jasmine | live, no URL yet | Coming to Flipkart soon |
| 4-Wheeler LED | 240W, 300W | live, no URL yet | Coming to Flipkart soon |
| 2-Wheeler LED | 12W, 25W | coming-soon | Get notified |
| Car Care | Microfiber, Wet Wipes | coming-soon | Get notified |

Item names, lines, notes or specs, and the four colours (`tint`, `halo`, `liquid`, `deep`) are all in `NF_SECTIONS` in `Main.dc.html`. Copy them exactly into the data module.

### 3.6 Organic | Gel toggle (Aroma Core stage)
- Segmented control below the eyebrow: a 2px navy border and white fill, with two buttons (Organic, Gel), each at least 44px tall. Mono 12px 700 uppercase, letter-spacing 0.16em, with an 8px dot before each label.
- Active state: navy fill, chalk text and an orange (`#FF5500`) dot. Inactive: white fill, `#3A3D46` text and a grey dot. 0.35s colour transition.
- **It is driven by scroll:** the active side always matches the `type` of the current scent. It reads Organic for the first two scents and flips to Gel at Citrus Zest.
- Clicking a side smooth-scrolls to the first scent of that type.
- Use `role="group"` with `aria-label="Aroma Core type"` on the wrapper and `aria-pressed` on each button.

### 3.7 Dealer band (`#buy`)
- Orange (`#FF5500`) band, padding 88px 40px. Text sits on the left; actions sit on the right and stack on mobile.
- H2 "Stock NightFury." in 88px 800 italic.
- Body copy: "Three lines from one supplier, retail-ready packaging and direct support from Yash Marketing, Kanpur."
- Primary: navy skew button "Become a Dealer →" with a `7px 7px 0` white shadow, linking to `/dealers`.
- Secondary text link: "Buying for your car? Shop on Flipkart →". It should go to the NightFury Flipkart brand or store URL; **ask the owner** for it, and use `https://www.flipkart.com/` until then.

### 3.8 Footer
Use the shared footer from the main brief: navy, logo lockup at 44px 800 with a 9px tagline, the Yash Marketing address, Products, Company and Support columns, and a bottom bar reading "© 2026 NightFury. All rights reserved. GSTIN 09AABFY5202B1ZL" with the five legal links.

## 4. Scroll stage mechanics

- **Structure:** `<section id>` holds the track (`position: relative`), which holds the stage (`position: sticky; top: 76px`).
- **Stage height:** `clamp(600px, calc(100svh - 76px), 960px)`, with `100vh` as a fallback. The prototype fixes it at 640px only because of its canvas.
- **Track height:** stage height + `(itemCount - 1) * 360px`.
- **Active index:** `clamp(floor((76 - track.getBoundingClientRect().top + 180) / 360), 0, count - 1)`. Compute it in one passive scroll listener (capture phase on `document`) for all six tracks, or use one IntersectionObserver sentinel per step. Only set state when an index actually changes.
- **Rail click:** scroll by `track.top - 76 + i * 360 + 2` with `behavior: smooth` (instant under reduced motion).
- **Critical:** no ancestor of a sticky stage may have `overflow: hidden` or `overflow: auto`. Use `overflow-x: clip` on page wrappers. This bug broke pinning in an earlier prototype.
- **Transitions:** tint, halo, liquid and name colour animate over 0.5 to 0.6s. Disable them under `prefers-reduced-motion`.
- **Mobile (under about 900px):** drop sticky pinning. Render each stage as its title, then a horizontal snap carousel of item cards (visual, name, line, tiles, CTA). On Aroma Core, the Organic/Gel toggle filters or scrolls the carousel.

## 5. Data module changes

Extend `src/data/products.ts` from the main brief:

- **Aroma Core scents** gain `type: "organic" | "gel"`. The canonical order is Organic first (Nature's Bloom, Earth Essence), then Gel (Citrus Zest, Berry Bloom, Mountain Mint).
- **Vision splits into two products:**
  - `led-4w`: variants 240W and 300W; specs Colour 6000K / 4300K, Rating IP67 with CANBUS, Warranty 18 months; status `live`.
  - `led-2w`: variants **12W and 25W**; status `coming-soon`; specs to be confirmed.
- **Care:** Microfiber and Wet Wipes, both `coming-soon`.
- Add a small `homeStages` config listing, in order, the stage id, title, band (if one starts there) and product slug, so the homepage renders entirely from data.

## 6. Do not build (removed from earlier homepage designs)

- The three big illustrated sense panels in the hero.
- The "Scroll the range" jump bar.
- "The NightFury standard" four-point block.
- The separate "Get it your way" / Where to Buy cards on the homepage. Where to Buy is its own route.
- The newsletter signup.
- The About link in the header.
- Spec chips, scent descriptions and "How to use" steps inside the homepage stages. These live on the product pages.

## 7. Open items (leave clearly marked)

- 2W LED 12W and 25W: fit, colour temperature, warranty and launch status.
- Character lines and Top / Heart / Base notes for Aroma Air and Essence. They show as "[Character line]" and "[To be confirmed]".
- Microfiber and Wet Wipes sizes, pack counts and colours.
- The NightFury Flipkart brand or store URL for the dealer band link.
- Transparent product photography for every stage item.

## 8. Acceptance checklist

- [ ] Matches `Main.dc.html` at 1440px; no horizontal scroll at 1024, 768 and 390px.
- [ ] Hero text is centred on one axis, and the three Explore buttons sit on one line at desktop widths.
- [ ] Each Explore button smooth-scrolls to its band, and the band title clears the sticky header.
- [ ] Section order is Aroma (Core, Air, Essence), then Vision (4W, 2W), then Care.
- [ ] All six stages pin, step one item per 360px of scroll, release cleanly, and never show a white gap.
- [ ] The Organic/Gel toggle follows scroll and jumps to each group when clicked.
- [ ] CTA labels follow the live / coming-soon / Flipkart URL rules; all five Core Flipkart links open the correct listing in a new tab.
- [ ] No prices, cart UI, ® mark or red anywhere.
- [ ] Mobile shows carousels instead of pinned stages.
- [ ] Reduced motion stops the marquee, the pulsing beams and the colour transitions.
- [ ] Contrast is at least 4.5:1; small orange text uses `#B83E00`.

## 9. Prompt to paste into Claude Code

> Read `HANDOFF_HOME.md` fully, then open `design/Main.dc.html` and treat it as the hi-fi spec for the homepage. Also read `Website_Rebuild_Handoff.md` if it is in the repo, for design tokens, business rules and the data module; where the two conflict about the homepage, `HANDOFF_HOME.md` wins. Build `/` inside this repository: first update the products data module (section 5), then build or extend the shared Header, Footer, SkewButton, CategoryBand, ScrollStage and TypeToggle components, then compose the page in the order in section 2. Do not port the `.dc.html` runtime. Do not build anything listed in section 6. Leave the open items in section 7 as visible placeholders. When finished, go through the acceptance checklist in section 8 and report anything that does not pass.
