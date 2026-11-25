/**
 * Single source of truth for every product on the site (HANDOFF section 8).
 *
 * Retail rule: a variant with a `flipkartUrl` shows "Buy on Flipkart"; an empty
 * one shows "Coming to Flipkart soon". Adding a listing is a data change only.
 * No prices live here, on purpose.
 *
 * Bracketed strings ("[Character line]", "[To be confirmed]") are placeholders
 * for you to fill in. They are hidden on the live site and highlighted in
 * orange during `npm run dev` (see src/lib/todo.tsx).
 */

export type Status = "live" | "coming-soon";
export type Line = "vision" | "aroma" | "care";
export type CoreType = "organic" | "gel";
/** Which illustration stands in for product photography on the homepage stages. */
export type Visual = "core" | "air" | "essence" | "led4" | "led2" | "cloth" | "wipes";
export type Spec = { label: string; value: string };

export type ScentColors = {
  /** Section background behind the scent. */
  tint: string;
  /** Circle behind the bottle. */
  halo: string;
  /** Bottle fill and swatches. */
  liquid: string;
  /** Text colour on the tint. */
  deep: string;
};

export type Scent = {
  slug: string;
  name: string;
  character: string;
  description?: string;
  notes: { top: string; heart: string; base: string };
  colors: ScentColors;
  flipkartUrl?: string;
  /** Aroma Core only: Organic (wooden blocks) or Gel. */
  type?: CoreType;
  /** Set once a 36-frame turntable set exists under /public/aroma/360/... */
  spin360?: { frames: number; basePath: string };
  /** True once /public/home/{stage}/{slug}.webp exists; until then the illustration shows. */
  photo?: boolean;
  /** Full-bleed scene photo at /public/home/{stage}/scene/{slug}.webp. When every
      item in a stage has one, the stage renders as a photo backdrop. */
  scene?: boolean;
  /** Retail box photo at /public/home/{stage}/box/{slug}.webp, with a blurred
      {slug}-bg.webp backdrop. When every item in a stage has one, the stage
      shows the box centred with the copy either side. */
  box?: boolean;
};

export type ScentGroup = {
  group?: string;
  groupNote?: string;
  /** Short label used on the scroll stage, e.g. "Core // Gel". */
  label: string;
  /** Organic Core uses wooden blocks in the bottle illustration. */
  organic?: boolean;
  scents: Scent[];
};

/** Purchasable models of a non-scented product, e.g. 240W and 300W LED. */
export type Model = {
  slug: string;
  label: string;
  watts?: number;
  flipkartUrl?: string;
  /** Homepage stage copy and colours. */
  line?: string;
  colors?: ScentColors;
  /** Beam size in the LED illustration. */
  beam?: { top: number; h: number };
  photo?: boolean;
};

export type Product = {
  slug: string;
  line: Line;
  name: string;
  /** Short anchor on the line page, e.g. "core". */
  key: string;
  num: string;
  tagline: string;
  description: string;
  /** Shorter pitch used on the homepage. */
  summary?: string;
  /** "Dashboard // 55g // 5 scents" style line. */
  formatLine?: string;
  /** Spec chips on the homepage stage header. */
  chips?: string[];
  status: Status;
  specs: { label: string; value: string }[];
  steps?: string[];
  variants?: ScentGroup[];
  models?: Model[];
  /** Pack-size options. Owner still has to confirm which sizes ship. */
  packs?: number[];
  photoLabel?: string;
  visual?: Visual;
  /** Three short specs for homepage stage tiles (models and single products). */
  tiles?: Spec[];
  /** Homepage stage card for a product without scents or models (Care). */
  home?: { name: string; line: string; colors: ScentColors; photo?: boolean };
};

export const TBC = "[To be confirmed]";
export const CHARACTER_TBC = "[Character line]";

const tbcNotes = { top: TBC, heart: TBC, base: TBC };

const AIR_DESC =
  "Mist the Nightfury card, hang it from the mirror, hit refresh whenever you want. One bottle outlasts a dozen disposable fresheners.";

/* ------------------------------------------------------------------ Vision */

export const visionLed4w: Product = {
  slug: "led-4w",
  line: "vision",
  key: "flagship",
  visual: "led4",
  num: "001",
  name: "4-Wheeler LED Headlight",
  tagline: "Own the night.",
  description:
    "Our flagship LED pair turns night into day with dual colour modes and full-width road coverage. CANBUS integration means zero dashboard errors: plug in and drive.",
  summary:
    "The 4-Wheeler LED pair. Dual 6000K and 4300K modes, full-width road coverage, CANBUS-ready so it plugs in with zero dashboard errors.",
  status: "live",
  models: [
    {
      slug: "240w", label: "240W", watts: 240, flipkartUrl: "",
      line: "Sharp, white and ready.",
      colors: { tint: "#ECF1F7", halo: "#D5DFEC", liquid: "#FFFFFF", deep: "#020F26" },
      beam: { top: 40, h: 140 },
      photo: true,
    },
    {
      slug: "300w", label: "300W", watts: 300, flipkartUrl: "",
      line: "Maximum throw.",
      colors: { tint: "#E3EAF3", halo: "#C6D3E5", liquid: "#FFFFFF", deep: "#020F26" },
      beam: { top: 10, h: 200 },
      photo: true,
    },
  ],
  tiles: [
    { label: "Colour", value: "6000K / 4300K" },
    { label: "Rating", value: "IP67, CANBUS" },
    { label: "Warranty", value: "18 months" },
  ],
  specs: [
    { label: "Power", value: "240W / 300W (pair)" },
    { label: "Voltage", value: "9V to 32V" },
    { label: "Colour modes", value: "6000K / 4300K" },
    { label: "Life span", value: "5,000 hours" },
    { label: "Rating", value: "IP67" },
    { label: "CANBUS", value: "Integrated, no error codes" },
    { label: "Warranty", value: "18 months" },
    { label: "Pack", value: "Pair" },
  ],
  photoLabel: "[Product photo: 4W LED pair, pack shot]",
};

export const visionLed2w: Product = {
  slug: "led-2w",
  line: "vision",
  key: "two-wheeler",
  visual: "led2",
  num: "002",
  name: "2-Wheeler LED Headlight",
  tagline: "Own the night, on two wheels.",
  description:
    "The same Nightfury optics, packed into a fan-cooled, vibration-tested unit that shrugs off monsoons and broken roads.",
  formatLine: "12W / 25W",
  status: "coming-soon",
  models: [
    {
      slug: "12w", label: "12W", watts: 12,
      line: "Clean everyday upgrade.",
      colors: { tint: "#EEF1F5", halo: "#D8DEE7", liquid: "#FFFFFF", deep: "#020F26" },
      beam: { top: 60, h: 100 },
    },
    {
      slug: "25w", label: "25W", watts: 25,
      line: "Brighter for highways.",
      colors: { tint: "#E5EAF1", halo: "#CBD4E1", liquid: "#FFFFFF", deep: "#020F26" },
      beam: { top: 30, h: 160 },
    },
  ],
  tiles: [
    { label: "Fit", value: TBC },
    { label: "Colour", value: TBC },
    { label: "Warranty", value: TBC },
  ],
  specs: [],
  photoLabel: "[Product photo: 2W LED unit]",
};

/* ------------------------------------------------------------------- Aroma */

export const aromaCore: Product = {
  slug: "aroma-core",
  line: "aroma",
  key: "core",
  visual: "core",
  num: "01",
  name: "Aroma Core",
  tagline: "Bolted to the dash. Always on.",
  description:
    "A glass canister with a wheel-rim cap inspired by luxury cars. Sits quietly on the console and releases a steady fragrance for weeks. No cords, no clips, no refills.",
  summary:
    "A glass canister with a wheel-rim cap inspired by luxury cars. Sits on the console and releases a steady fragrance for weeks. No cords, no clips, no refills.",
  formatLine: "Dashboard // 55 g // 5 scents",
  chips: ["55g", "Gel or Organic", "5 scents", "Up to 60 days"],
  status: "live",
  specs: [
    { label: "Weight", value: "55g" },
    { label: "Types", value: "Gel or Organic" },
    { label: "Scents", value: "5" },
    { label: "Placement", value: "Dashboard / console" },
    { label: "Lasts", value: "Up to 60 days" },
  ],
  steps: [
    "Peel the seal and twist off the cap.",
    "Set it on the dash or console, out of direct airflow.",
    "Drive. It releases steadily for up to 60 days.",
  ],
  variants: [
    {
      group: "Organic",
      groupNote: "Wooden blocks with organically derived oils, under a UV-protected cap.",
      label: "Core // Organic",
      organic: true,
      scents: [
        {
          slug: "natures-bloom",
          name: "Nature's Bloom",
          character: "Fresh florals. Open air.",
          description: "Orange blossom and jasmine over a clean dew accord. A window left open on a spring morning.",
          notes: { top: "Orange blossom, dew", heart: "Jasmine, ylang-ylang", base: "Sandalwood, musk" },
          type: "organic",
          photo: true,
          colors: { tint: "#F4F5F7", halo: "#E2E4E9", liquid: "#B0705A", deep: "#020F26" },
          flipkartUrl:
            "https://www.flipkart.com/nightfury-nature-s-bloom-car-freshener-blocks-aroma-core/p/itm0a6151873ad5d?pid=AIRHRMB8UZXWZPFN",
        },
        {
          slug: "earth-essence",
          name: "Earth Essence",
          character: "Grounded. Woody. Quiet.",
          description: "Damp earth, moss and warm wood. Closer to a forest floor after rain than a perfume counter.",
          notes: { top: "Bergamot, black pepper", heart: "Patchouli, clary sage", base: "Oakmoss, sandalwood" },
          type: "organic",
          photo: true,
          colors: { tint: "#F4F5F7", halo: "#E2E4E9", liquid: "#7D6E4E", deep: "#020F26" },
          flipkartUrl:
            "https://www.flipkart.com/nightfury-earth-essence-car-freshener-blocks-aroma-core-organic-dashboard-fragrance/p/itm512ca9b2a1f0f?pid=AIRHQEPGTNCFNNUE",
        },
      ],
    },
    {
      group: "Gel",
      groupNote: "Steady release at any cabin temperature. Never spills on a hard corner.",
      label: "Core // Gel",
      scents: [
        {
          slug: "citrus-zest",
          name: "Citrus Zest",
          character: "Bright. Clean. Awake.",
          description: "A sharp burst of cold-pressed citrus that cuts through stale cabin air on the first turn of the key.",
          notes: { top: "Bergamot, lemon peel", heart: "Neroli, green apple", base: "White musk, cedar" },
          type: "gel",
          photo: true,
          colors: { tint: "#F4F5F7", halo: "#E2E4E9", liquid: "#C29B2A", deep: "#020F26" },
          flipkartUrl:
            "https://www.flipkart.com/nightfury-citrus-zest-car-freshener-blocks-aroma-core-gel-dashboard-fragrance/p/itmf928653d25692?pid=AIRHS89GBT7CT8BX",
        },
        {
          slug: "berry-bloom",
          name: "Berry Bloom",
          character: "Soft. Rounded. Warm.",
          description: "Ripe red berries over florals, warmed by vanilla as it settles. The one passengers ask about most.",
          notes: { top: "Strawberry, raspberry", heart: "Rose petal, jasmine", base: "Vanilla, soft amber" },
          type: "gel",
          photo: true,
          colors: { tint: "#F4F5F7", halo: "#E2E4E9", liquid: "#8A3A5C", deep: "#020F26" },
          flipkartUrl:
            "https://www.flipkart.com/nightfury-berry-bloom-car-freshener-blocks-aroma-core-gel-dashboard-fragrance/p/itm0eaf7f43ca9ee?pid=AIRHS89GZA52HFQ6",
        },
        {
          slug: "mountain-mint",
          name: "Mountain Mint",
          character: "Cool. Sharp. Focused.",
          description: "Crushed mint and eucalyptus with a cold green edge. Built for long night drives and heavy traffic.",
          notes: { top: "Peppermint, eucalyptus", heart: "Spearmint, green tea", base: "Vetiver, cedarwood" },
          type: "gel",
          photo: true,
          colors: { tint: "#F4F5F7", halo: "#E2E4E9", liquid: "#3E8A6A", deep: "#020F26" },
          flipkartUrl:
            "https://www.flipkart.com/nightfury-mountain-mint-car-freshener-blocks-aroma-core-gel-dashboard-fragrance/p/itm9683550bc48e0?pid=AIRHS849QDNDRZYG",
        },
      ],
    },
  ],
};

export const aromaAir: Product = {
  slug: "aroma-air",
  line: "aroma",
  key: "air",
  visual: "air",
  num: "02",
  name: "Aroma Air",
  tagline: "Spray. Hang. Arrive.",
  description:
    "A matte-black 55 ml atomizer paired with a Nightfury hanging card. Mist the card, hang it from the mirror, refresh whenever you want. One bottle outlasts a dozen disposable fresheners.",
  summary:
    "A matte-black 55 ml atomizer paired with a Nightfury hanging card. Your scent, your intensity, on demand.",
  formatLine: "Spray + card // 55 ml // 3 scents",
  chips: ["55 ml", "500+ sprays", "3 scents", "Hanging card included"],
  status: "live",
  specs: [
    { label: "Volume", value: "55 ml" },
    { label: "Sprays", value: "500+" },
    { label: "Scents", value: "3" },
    { label: "Includes", value: "Hanging card" },
  ],
  steps: [
    "Mist the Nightfury card two or three times.",
    "Hang the card from the rear-view mirror.",
    "Re-mist whenever the cabin needs a boost.",
  ],
  variants: [
    {
      label: "Air // 55 ml",
      scents: [
        {
          slug: "azure",
          name: "Azure",
          character: "Smell like you mean business.",
          description: AIR_DESC,
          notes: { top: "Aquatic, nutmeg", heart: "Muguet, tobacco, iris", base: "Woody amber, sandalwood, musk" },
          scene: true,
          colors: { tint: "#F4F5F7", halo: "#E2E4E9", liquid: "#3C6EA8", deep: "#020F26" },
          flipkartUrl: 
            "https://www.flipkart.com/nightfury-aroma-air-spray-azur/p/itmf6b86742e2711?pid=AIRHT88VW6ZYUYQW",
        },
        {
          slug: "bonfire",
          name: "Bonfire",
          character: "Brewed for the road.",
          description: AIR_DESC,
          notes: { top: "Mandarin, cinnamon, banana, ginger, dried fruits", heart: "Jasmine, aquatic", base: "Vanilla, gourmand, woody amber, cedar" },
          scene: true,
          colors: { tint: "#F4F5F7", halo: "#E2E4E9", liquid: "#B0562A", deep: "#020F26" },
          flipkartUrl: 
            "https://www.flipkart.com/nightfury-bonfire-spray-azur/p/itmf6b86742e2711?pid=AIRHT88VGMVFGNPS",
        },
        {
          slug: "impulsive",
          name: "Impulsive",
          character: "Blame the night.",
          description: AIR_DESC,
          notes: { top: "Cardamom, bergamot", heart: "Toffee, lavender", base: "Amberwood, vetiver" },
          scene: true,
          colors: { tint: "#F4F5F7", halo: "#E2E4E9", liquid: "#9A6A2F", deep: "#020F26" },
          flipkartUrl: 
            "https://www.flipkart.com/nightfury-impulsive-spray-azur/p/itmf6b86742e2711?pid=AIRHT88VW83TBHNH",
        },
      ],
    },
  ],
};

export const aromaEssence: Product = {
  slug: "aroma-essence",
  line: "aroma",
  key: "essence",
  visual: "essence",
  num: "03",
  name: "Aroma Essence",
  tagline: "Hang it. Own the cabin.",
  description:
    "A faceted glass bottle with a braided cord and natural wood cap, holding 12 ml of slow-release fragrance oil. The most premium way to scent the drive.",
  summary:
    "Faceted glass, braided cord, natural wood cap. The most premium way to scent the drive, and it looks the part on the mirror.",
  formatLine: "Hanging glass // 12 ml // 3 scents",
  chips: ["12 ml", "Up to 45 days", "3 scents", "Glass + wood"],
  status: "live",
  specs: [
    { label: "Volume", value: "12 ml" },
    { label: "Lasts", value: "Up to 45 days" },
    { label: "Scents", value: "3" },
    { label: "Build", value: "Glass, braided cord, wood cap" },
  ],
  steps: [
    "Loop the braided cord over the rear-view mirror.",
    "Tip the bottle once so the oil reaches the wood cap.",
    "Let it hang. Fresh cabin for up to 45 days.",
  ],
  variants: [
    {
      label: "Essence // 12 ml",
      scents: [
        {
          slug: "blue-ocean",
          name: "Blue Ocean",
          character: "Open water, open road.",
          description: "Cool, clean and airy. A fresh marine scent that keeps the cabin feeling wide open, even in traffic.",
          notes: tbcNotes,
          box: true,
          colors: { tint: "#F4F5F7", halo: "#E2E4E9", liquid: "#2457C5", deep: "#020F26" },
          flipkartUrl: 
            "https://www.flipkart.com/nightfury-blue-ocean-diffuser-aroma-essence/p/itme2ad60f821ad4?pid=AIRHSS8HYJEJTYAV",
        },
        {
          slug: "romance",
          name: "Romance",
          character: "Made for the long way home.",
          description: "Soft, warm and a little sweet. The one for date nights, late drives and anyone in the passenger seat.",
          notes: tbcNotes,
          box: true,
          colors: { tint: "#F4F5F7", halo: "#E2E4E9", liquid: "#D9605C", deep: "#020F26" },
          flipkartUrl: 
            "https://www.flipkart.com/nightfury-romance-diffuser-aroma-essence/p/itmaab182e1f5fad?pid=AIRHSS8HTGVAFJHG",
        },
        {
          slug: "fresh-jasmine",
          name: "Fresh Jasmine",
          character: "Calm, in full bloom.",
          description: "Green and floral with a clean finish. A quiet, steady freshness for the daily commute.",
          notes: tbcNotes,
          box: true,
          colors: { tint: "#F4F5F7", halo: "#E2E4E9", liquid: "#7FA22E", deep: "#020F26" },
          flipkartUrl: 
            "https://www.flipkart.com/nightfury-fresh-jasmine-diffuser-aroma-essence/p/itm918a83e0cec64?pid=AIRHSS8HYQESKNB7",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------- Care */

export const careMicrofiber: Product = {
  slug: "care-microfiber",
  line: "care",
  key: "microfiber",
  num: "01",
  visual: "cloth",
  home: {
    name: "Microfiber",
    line: "Soft on paint and glass.",
    colors: { tint: "#F4F5F7", halo: "#E2E4E9", liquid: "#3B5F8F", deep: "#020F26" },
  },
  tiles: [
    { label: "Size", value: TBC },
    { label: "Pack", value: TBC },
    { label: "Use", value: "Paint, glass" },
  ],
  name: "Microfiber Cloth",
  tagline: "Scratch-free shine, every wipe.",
  description:
    "Ultra-plush 380 GSM microfiber with laser-cut edgeless borders. Lifts dust and polish residue without a single swirl mark. Safe on ceramic coats, PPF and gloss black trim.",
  formatLine: "380 GSM // Edgeless // Swirl-free",
  status: "coming-soon",
  packs: [1, 2, 3],
  specs: [
    { label: "Density", value: "380 GSM" },
    { label: "Size", value: "40 x 40 cm" },
    { label: "Blend", value: "80/20 polyester-polyamide" },
    { label: "Washable", value: "300+ machine cycles" },
  ],
  photoLabel: "[Product photo: microfiber cloth, folded]",
};

export const careWipes: Product = {
  slug: "care-wipes",
  line: "care",
  key: "wipes",
  num: "02",
  visual: "wipes",
  home: {
    name: "Wet Wipes",
    line: "Quick clean between washes.",
    colors: { tint: "#F4F5F7", halo: "#E2E4E9", liquid: "#3F7F78", deep: "#020F26" },
  },
  tiles: [
    { label: "Count", value: TBC },
    { label: "Pack", value: TBC },
    { label: "Use", value: "Dash, screens" },
  ],
  name: "Car Wet Wipes",
  tagline: "Showroom clean, anywhere.",
  description:
    "Thick pH-balanced wipes that cut through dust, grime and fingerprints on dashboards, screens and leather, then dry to a matte, anti-static finish. No grease, no shine, no residue.",
  formatLine: "40 wipes // pH-balanced // Matte",
  status: "coming-soon",
  specs: [
    { label: "Count", value: "40 wipes" },
    { label: "Material", value: "50 GSM spunlace" },
    { label: "Formula", value: "pH-balanced, alcohol-free" },
    { label: "Finish", value: "Matte, anti-static" },
    { label: "Lid", value: "Resealable fresh-lock" },
  ],
  photoLabel: "[Product photo: wet wipes pack]",
};

/* ------------------------------------------------------------- Collections */

export const AROMA_PRODUCTS = [aromaCore, aromaAir, aromaEssence];
export const PRODUCTS: Product[] = [
  visionLed4w,
  visionLed2w,
  aromaCore,
  aromaAir,
  aromaEssence,
  careMicrofiber,
  careWipes,
];

export const PRODUCT_SLUGS = PRODUCTS.map((p) => p.slug);

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Every scent of a product, with its group carried along. */
export function flatScents(p: Product) {
  return (p.variants ?? []).flatMap((g) => g.scents.map((s) => ({ ...s, group: g })));
}

export const SCENT_COUNT = AROMA_PRODUCTS.reduce((n, p) => n + flatScents(p).length, 0);

/** Where a "Coming to Flipkart soon" button sends people: the notify form. */
export function notifyHref(productSlug: string, scentSlug?: string) {
  const q = new URLSearchParams({ product: productSlug });
  if (scentSlug) q.set("scent", scentSlug);
  return `/where-to-buy?${q.toString()}#notify`;
}

/** Dealer CTAs pre-select the line and product on /dealers. */
export function dealerHref(line?: Line, productSlug?: string) {
  const q = new URLSearchParams();
  if (line) q.set("line", line);
  if (productSlug) q.set("product", productSlug);
  const s = q.toString();
  return s ? `/dealers?${s}` : "/dealers";
}

/* ------------------------------------------------------------ Homepage */

/**
 * Nightfury brand / store page on Flipkart. Paste the real URL here; until
 * then the "Shop on Flipkart" link opens a Flipkart search for Nightfury.
 */
export const FLIPKART_STORE_URL = "[Nightfury Flipkart store URL]";

export type HomeStage = {
  /** Anchor id of the stage section. */
  id: string;
  title: string;
  /** Muted suffix after the eyebrow, e.g. " // 55 ml spray". */
  sub?: string;
  /** Navy category band that starts here. */
  band?: { id: string; title: string; tagline: string; kind?: string; href?: string; body?: string };
  /** Products rendered as items of this stage, in order. */
  products: string[];
  /** Organic | Gel toggle (Aroma Core). */
  toggle?: boolean;
};

/** Homepage order (HANDOFF_HOME section 2). The page renders entirely from this. */
/* Only products you can buy today get a full scroll stage. 2-Wheeler LED and
   Care sit in the smaller "Coming next" row (src/data/site.ts) until launch:
   to give one a stage, add it back here. */
export const HOME_STAGES: HomeStage[] = [
  {
    id: "core", title: "Aroma Core", sub: " // Dashboard 55g",
    band: { id: "aroma", title: "Aroma", kind: "Car perfumes", tagline: "Smell the difference", href: "/aroma", body: "Three formats, eleven scents. Scroll through the range." },
    products: ["aroma-core"], toggle: true,
  },
  { id: "air", title: "Aroma Air", sub: " // 55 ml spray", products: ["aroma-air"] },
  { id: "essence", title: "Aroma Essence", sub: " // 12 ml hanging", products: ["aroma-essence"] },
  {
    id: "led-4w", title: "4-Wheeler LED", sub: " // Headlight pair",
    band: { id: "vision", title: "Vision", kind: "LED headlights", tagline: "See the difference", href: "/vision", body: "240W and 300W pairs, 18-month warranty." },
    products: ["led-4w"],
  },
];

/** One step of a homepage scroll stage: a scent, a wattage or a product. */
export type StageItem = {
  slug: string;
  name: string;
  line: string;
  /** Shown on the live site when `line` is still a placeholder. */
  fallbackLine: string;
  /** Shown on the live site when every tile is still a placeholder. */
  summary: string;
  tiles: Spec[];
  colors: ScentColors;
  visual: Visual;
  status: Status;
  productName: string;
  flipkartUrl?: string;
  notifyHref: string;
  type?: CoreType;
  organic?: boolean;
  beam?: { top: number; h: number };
  /** Transparent product photo, only when the per-item flag is set. */
  photo?: string;
  /** Full-bleed scene photo, only when the per-item flag is set. */
  scene?: string;
  /** Retail box photo and its blurred backdrop, only when the per-item flag is set. */
  box?: { src: string; bg: string };
  /** Product-level specs (volume, lifetime) for stages that show them. */
  specs?: Spec[];
};

const DEFAULT_COLORS: ScentColors = { tint: "#ECF1F7", halo: "#D5DFEC", liquid: "#FFFFFF", deep: "#020F26" };

export function stageItems(stage: HomeStage): StageItem[] {
  return stage.products.flatMap((slug): StageItem[] => {
    const p = getProduct(slug);
    if (!p) return [];
    const visual = p.visual ?? "core";
    const photo = (item: string, on?: boolean) => (on ? `/home/${stage.id}/${item}.webp` : undefined);
    if (p.variants) {
      return flatScents(p).map((s) => ({
        slug: s.slug,
        name: s.name,
        line: s.character,
        fallbackLine: p.tagline,
        summary: s.description ?? p.summary ?? p.description,
        colors: s.colors,
        visual,
        status: p.status,
        productName: p.name,
        flipkartUrl: s.flipkartUrl,
        notifyHref: notifyHref(p.slug, s.slug),
        type: s.type,
        organic: s.type === "organic",
        tiles: [
          { label: "Top", value: s.notes.top },
          { label: "Heart", value: s.notes.heart },
          { label: "Base", value: s.notes.base },
        ],
        photo: photo(s.slug, s.photo),
        scene: s.scene ? `/home/${stage.id}/scene/${s.slug}.webp` : undefined,
        specs: p.specs,
        box: s.box ? { src: `/home/${stage.id}/box/${s.slug}.webp`, bg: `/home/${stage.id}/box/${s.slug}-bg.webp` } : undefined,
      }));
    }
    if (p.models) {
      return p.models.map((m) => ({
        slug: m.slug,
        name: m.label,
        line: m.line ?? "",
        fallbackLine: p.tagline,
        summary: p.summary ?? p.description,
        tiles: p.tiles ?? [],
        colors: m.colors ?? DEFAULT_COLORS,
        visual,
        status: p.status,
        productName: p.name,
        flipkartUrl: m.flipkartUrl,
        notifyHref: notifyHref(p.slug, m.slug),
        beam: m.beam,
        photo: photo(m.slug, m.photo),
      }));
    }
    const h = p.home;
    if (!h) return [];
    return [{
      slug: p.slug,
      name: h.name,
      line: h.line,
      fallbackLine: p.tagline,
      summary: p.summary ?? p.description,
      tiles: p.tiles ?? [],
      colors: h.colors,
      visual,
      status: p.status,
      productName: p.name,
      notifyHref: notifyHref(p.slug),
      photo: photo(p.slug, h.photo),
    }];
  });
}

/* ------------------------------------------------------------ Shop photos */

export type ShopImage = { src: string; fit: "contain" | "cover"; position?: string; dark?: boolean };

/**
 * Best available photo for a product or scent in shop listings: the scent's
 * own cutout, scene or box photo first, then the product line's tile photo.
 */
export function shopImage(p: Product, s?: Scent): ShopImage {
  if (s?.box) return { src: `/home/essence/box/${s.slug}.webp`, fit: "contain", dark: true };
  if (s?.scene) return { src: `/home/air/scene/${s.slug}.webp`, fit: "cover", position: "74% 50%", dark: true };
  if (s?.photo) return { src: `/home/core/${s.slug}.webp`, fit: "contain" };
  if (p.slug === "led-4w") return { src: "/home/led-4w/240w.webp", fit: "contain" };
  return { src: `/home/tiles/${p.line}.webp`, fit: "cover", dark: true };
}
