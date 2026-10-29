# NightFury website rebuild: Claude Code handoff

Rebuild nightfury.co.in as a light, motorsport-styled brand and dealer site with four designed pages (Home, Vision, Aroma, Care), no prices or cart, Flipkart links for retail, and dealer enquiries as the main conversion.

## 1. What is in this package

| Path | What it is |
| --- | --- |
| `design/Main.dc.html` | Homepage design (hi-fi) |
| `design/Aroma.dc.html` | Car Perfumes page, including the 360 viewer placeholder |
| `design/Vision.dc.html` | Lighting page, including output and colour-mode selectors |
| `design/Care.dc.html` | Car Care page (all products coming soon) |
| `logo/NightFury_Logo.svg` | Current logo lockup (live text, see Logo below) |
| `HANDOFF.md` | This brief |

The `.dc.html` files are **design references, not production code**. They run on an internal prototyping runtime (`<sc-for>`, `<sc-if>`, `{{holes}}`, a `class Component extends DCLogic` logic block). Do not port that runtime. Read them as a spec: the inline styles, copy, layout, data arrays in the `<script data-dc-script>` block, and the interaction logic are what matter. Replace `<sc-for list>` with `.map()`, `<sc-if>` with conditionals, and `{{x}}` with props/state.

## 2. Stack and repo

- The live site is a Next.js app (served `/_next/...` assets). Rebuild **inside the existing repo**, keeping its routing, hosting and the five legal pages.
- Use the codebase's existing patterns. If it has no styling system, use CSS modules or Tailwind with the tokens below as CSS variables.
- Fonts via `next/font/google`: Saira Condensed (500, 600, 700, 800, italic 600 to 800) and Spline Sans Mono (400 to 700).

## 3. Routes

| Route | Source design | Status |
| --- | --- | --- |
| `/` | `Main.dc.html` | Build |
| `/vision` | `Vision.dc.html` | Build |
| `/aroma` | `Aroma.dc.html` | Build |
| `/care` | `Care.dc.html` | Build |
| `/dealers` | Dealer form spec in section 9 | Build with the same components |
| `/where-to-buy` | Homepage "Get it your way" section, expanded | Build with the same components |
| `/about`, `/contact-us` | Reuse components; copy in the content doc | Build |
| `/cart` | Remove; 301 redirect to `/` | Remove |
| Legal pages (5) | Existing | Keep; restyle to the new header and footer |

In the designs, "Become a Dealer" and dealer CTAs point at `#dealer` bands. In production, point them at `/dealers` with the product pre-selected via query string (for example `/dealers?line=aroma&product=core`).

## 4. Design tokens

**Colour** (no red anywhere: this is a hard rule)

| Token | Hex | Use |
| --- | --- | --- |
| `--chalk` | `#F4F5F7` | Page background, alternate sections |
| `--white` | `#FFFFFF` | Primary sections, cards, navbar |
| `--carbon` | `#0A0A0B` | Body and heading text only |
| `--fury` | `#FF5500` | Orange fills only: dealer band, hard shadows, accents, marquee underline |
| `--fury-text-lg` | `#E04A00` | Orange text at large sizes (headline accent words) |
| `--fury-text-sm` | `#B83E00` | Orange text at small sizes (mono eyebrows) for contrast |
| `--navy` | `#020F26` | Primary buttons, 2px borders, selected states, hard shadows on orange, marquee bar, footer, trust strip, tags, icon tiles, progress bars, warranty band |
| `--muted` | `#3A3D46` | Body copy, labels |
| `--rule` | `#C9CCD3` | Thin dividers in spec tables |
| `--hairline` | `#E2E4E9` | Navbar bottom border |

Scent colours (tint, halo, liquid, deep) live in the data arrays in `Main.dc.html` and `Aroma.dc.html`. Copy them exactly.

**Type**

- Headings: Saira Condensed 800 italic, uppercase, letter-spacing -0.02em, line-height about 0.86 to 0.9. No skew on headings.
- Sizes: hero H1 112px, section H2 80 to 96px, product titles 76 to 88px, card titles 26 to 34px. Scale down fluidly on mobile (clamp).
- Body, labels, nav, specs: Spline Sans Mono 12 to 15px. Eyebrows uppercase, letter-spacing 0.12 to 0.2em.
- Navbar is deliberately minimal: Spline Sans Mono 13px, weight 500, uppercase, not italic.

**Shape and motion**

- Border radius 2 to 3px everywhere. No pills.
- Cards: 2px solid navy border.
- Buttons: `transform: skewX(-8deg)` on the button, with the label counter-skewed `skewX(8deg)`; hard offset shadow `5px 5px 0` in orange (on navy buttons) or navy (on orange buttons); navy buttons on the orange dealer band get a white shadow.
- Race plate badge ("N° 01"): chalk fill, 3px navy border, 5px orange hard shadow.
- Speed chevrons: `clip-path: polygon(0 0,55% 0,100% 50%,55% 100%,0 100%,45% 50%)`.
- Marquee: 26s linear infinite translateX loop with duplicated content.
- Respect `prefers-reduced-motion`: stop the marquee, auto-spin, and colour transitions.

**Logo**

- Lockup: "NIGHT" + "FURY" in Saira Condensed 800 italic with `skewX(-4deg)`; NIGHT is carbon on light backgrounds and chalk on navy; FURY is always `#FF5500`. Tagline "DRIVE THE DIFFERENCE" in Spline Sans Mono 600, letter-spacing about 0.42 to 0.5em, centred under the wordmark.
- The supplied SVG uses live `<text>`, so it renders in a fallback font wherever Saira is not loaded. Render the logo as HTML text in the header and footer (as the designs do), and ask the owner for an outlined SVG for favicons, OG images and anywhere outside the site.
- Navbar: 34px wordmark with 8px tagline. Footer: 44px, weight 700, with 9px tagline.

## 5. Business rules (enforce sitewide)

- **No prices, MRPs, discounts, quantity selectors, Add to Cart, cart icons or checkout.**
- Every product variant has a `flipkartUrl` field. If it is set, show "Buy on Flipkart" (new tab, `rel="noopener"`). If it is empty, show "Coming to Flipkart soon" linking to the notify or dealer form. Adding a listing later must be a data change only.
- Two statuses only: `live` and `coming-soon`. No "Out of stock" or "Best seller" labels.
- No testimonials or star ratings until real reviews exist.
- Taglines: master "Drive The Difference"; Vision "See the Difference"; Aroma "Smell the Difference"; Care "Feel the Difference".
- Use the word "sales", never "revenue", in any business copy.
- Trademark mark: no ® on the site until the owner confirms registration status.

## 6. Shared components to build

Header (sticky, 76px, active-page underline), Marquee, Footer (navy), Breadcrumb, Eyebrow, SectionHeading, SkewButton (primary dark / primary orange / outline), RacePlate, StatusTag, SpecTable, ScentCard, SensePickerTile, ScrollStage, Viewer360, BeamPreview, DealerBand, NotifyForm, DealerForm.

## 7. Key interactions

### 7.1 ScrollStage (homepage Aroma: one per product, Core, Air, Essence)

- A tall track contains a `position: sticky; top: 76px` stage.
- Stage height: `clamp(600px, calc(100vh - 76px), 960px)` (use `100svh` with a `100vh` fallback for mobile browsers).
- Track height: stage height + `(scentCount - 1) * 360px`.
- Active index: `floor((76 - track.getBoundingClientRect().top + 180) / 360)`, clamped. Listen to scroll in capture phase on `document` (or use IntersectionObserver sentinels, one per step).
- On index change: background tint, bottle liquid, halo, text colour, notes and Flipkart button update with 0.5 to 0.6s colour transitions.
- Rail buttons scroll smoothly to that step.
- **Critical:** no ancestor of a sticky element may have `overflow: hidden` or `overflow: auto`. Use `overflow-x: clip` on wrappers. This caused the stage to scroll away in the prototype.
- Mobile (under about 900px): drop the sticky behaviour and render each product as a swipeable horizontal carousel of scent cards.

### 7.2 Viewer360 (Aroma page)

- Prototype: an illustrated bottle with a drag-to-rotate effect, format tabs (Core / Air / Essence), scent chips, rotate left/right buttons, auto-spin toggle, degree and frame readout.
- Production: a frame-sequence viewer. Data shape per scent: 36 images at `/public/aroma/360/{product}/{scent-slug}/01.webp` to `36.webp` (about 1200px, transparent or white background).
- Drag maps about 10 degrees per frame; keyboard left/right arrows step frames; buttons step 45 degrees; preload the active set; show the first frame as a still while loading.
- Until photo sets exist, keep the illustrated placeholder (it is in the design) behind a feature flag per scent, or fall back to a single product photo.
- Make the stage `touch-action: pan-y` so vertical page scroll still works on phones.

### 7.3 Vision page

- Output selector (240W / 300W) updates the Power spec.
- Colour-mode selector (6000K / 4300K) recolours the navy BeamPreview: cool white `rgba(234,242,255,0.95)` versus warm `rgba(255,217,138,0.95)`.

### 7.4 Care page

- Pack-size selector (1 / 2 / 3) updates "In the pack". Confirm with the owner which pack sizes will actually ship.

## 8. Data model

Create one typed data module (for example `src/data/products.ts`) as the single source of truth for all pages:

```ts
type Status = "live" | "coming-soon";
type Scent = {
  slug: string; name: string; character: string; description?: string;
  notes: { top: string; heart: string; base: string };
  colors: { tint: string; halo: string; liquid: string; deep: string };
  flipkartUrl?: string;
  spin360?: { frames: number; basePath: string };
};
type Product = {
  slug: string; line: "vision" | "aroma" | "care"; name: string;
  tagline: string; description: string; status: Status;
  specs: { label: string; value: string }[];
  steps?: string[];
  variants?: { group?: string; groupNote?: string; scents: Scent[] }[];
};
```

Current Flipkart listings (Aroma Core only):

| Scent | Type | URL |
| --- | --- | --- |
| Citrus Zest | Gel | https://www.flipkart.com/nightfury-citrus-zest-car-freshener-blocks-aroma-core-gel-dashboard-fragrance/p/itmf928653d25692?pid=AIRHS89GBT7CT8BX |
| Berry Bloom | Gel | https://www.flipkart.com/nightfury-berry-bloom-car-freshener-blocks-aroma-core-gel-dashboard-fragrance/p/itm0eaf7f43ca9ee?pid=AIRHS89GZA52HFQ6 |
| Mountain Mint | Gel | https://www.flipkart.com/nightfury-mountain-mint-car-freshener-blocks-aroma-core-gel-dashboard-fragrance/p/itm9683550bc48e0?pid=AIRHS849QDNDRZYG |
| Nature's Bloom | Organic | https://www.flipkart.com/nightfury-nature-s-bloom-car-freshener-blocks-aroma-core/p/itm0a6151873ad5d?pid=AIRHRMB8UZXWZPFN |
| Earth Essence | Organic | https://www.flipkart.com/nightfury-earth-essence-car-freshener-blocks-aroma-core-organic-dashboard-fragrance/p/itm512ca9b2a1f0f?pid=AIRHQEPGTNCFNNUE |

Aroma Air (Azure, Bonfire, Impulsive), Aroma Essence (Blue Ocean, Romance, Fresh Jasmine) and the 4W LED (240W, 300W) are expected on Flipkart soon; leave `flipkartUrl` empty for now.

Product status today: 4W LED, Aroma Core, Aroma Air, Aroma Essence are `live`. 2W LED, Microfiber Cloth and Car Wet Wipes are `coming-soon`. (Air and Essence are live products that are simply not yet on Flipkart.)

## 9. Forms

**Dealer enquiry** (`/dealers`): full name (required), shop or business name (required), city (required), state (dropdown of Indian states, required), phone/WhatsApp with +91 (required), email (optional), GSTIN (optional, validate 15-character format), business type (Accessories retailer / Car care studio / Workshop / Distributor / Other, required), lines interested in (Vision / Aroma / Care checkboxes, at least one), message (optional), consent checkbox "OK to contact me by phone and WhatsApp about this enquiry" (required, links to the Privacy Policy). Submit label "Send Enquiry". Success: "Thanks, we've got your enquiry. Our team will call you within 2 working days." Pre-fill line and product from the query string.

**Notify me** (per coming-soon product, plus the Care hero): phone or email, product slug captured automatically, consent line.

**Find a dealer** (Where to Buy): city, plus name and phone, tagged as a customer lead.

Implementation: a Next.js route handler (or server action) that validates server-side, rate-limits, and sends to an email address and a Google Sheet. Read destinations from environment variables (`LEADS_EMAIL_TO`, `GOOGLE_SHEETS_*`). The owner still has to confirm the destination; stub with logging if unset. Collect only these fields (DPDP Act 2023).

## 10. SEO

- Unique title and meta description per page (table in the content doc). Examples: Home "NightFury: LED Headlights, Car Perfumes and Car Care"; Aroma "NightFury Aroma: Premium Car Perfumes"; Vision "NightFury Vision: LED Headlights for Cars and Bikes"; Care "NightFury Care: Microfiber Cloths and Car Wipes".
- Canonicals on every page; fix `og:url` to `https://www.nightfury.co.in` (it currently points to nightfury.in); per-page OG titles and descriptions.
- `Product` structured data on live products with brand NightFury and **no price or offers**.
- `sitemap.xml` and `robots.txt`.

## 11. Fixes carried over from the site audit

- Footer GSTIN showed "XXXXXX" on product pages: use one shared footer component with `09AABFY5202B1ZL`.
- Remove the homepage testimonials, the duplicate featured block, and any "COMING SOON" plus "BEST SELLER" contradictions.
- Remove the raw "/cart" text links in the header.
- Aroma Core is no longer titled "Gel Dashboard Freshener"; Gel and Organic are variants.
- The "250%*" brightness claim stays off until there is a footnote with the test basis.

## 12. Placeholders to leave clearly marked

- Character lines and top / heart / base notes for the six Aroma Air and Essence scents (shown as "[Character line]" and "[To be confirmed]").
- Product photography for every product (striped placeholder boxes in the designs).
- 360 frame sets for each scent.
- 4W LED bulb fitments (H4 / H7 / H11 and so on).
- Lead form destinations.

## 13. Acceptance checklist

- [ ] Four pages match the designs at 1440px, and degrade cleanly at 1024px, 768px and 390px with no horizontal scroll.
- [ ] Zero prices, cart UI or red anywhere; grep the build for `#E11D2A` and "Add to Cart".
- [ ] Scroll stages pin, change scent on scroll, release cleanly, and fall back to carousels on mobile.
- [ ] 360 viewer works with mouse drag, touch drag, keyboard arrows and buttons, with auto-spin paused for reduced motion.
- [ ] Every Flipkart button opens the correct listing; empty URLs show "Coming to Flipkart soon".
- [ ] Dealer and notify forms validate, submit, and show success states.
- [ ] Lighthouse: Accessibility 95+, SEO 95+, Performance 85+ on mobile.
- [ ] Text contrast at least 4.5:1 (small orange text uses `#B83E00`).

## 14. Prompt to paste into Claude Code

> Read `HANDOFF.md` in this folder fully, then open each file in `design/` and treat them as the hi-fi spec. Rebuild nightfury.co.in inside this repository following the brief: shared components first (header, footer, buttons, scroll stage, 360 viewer), then the `products.ts` data module, then the pages `/`, `/aroma`, `/vision`, `/care`, `/dealers`, `/where-to-buy`, then forms and SEO. Enforce the business rules in section 5 throughout. Do not port the `.dc.html` runtime. Ask me before deleting any existing route other than `/cart`. When done, run through the acceptance checklist in section 13 and report anything that does not pass.
