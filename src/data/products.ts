/**
 * Single source of truth for every product on the site (HANDOFF section 8).
 *
 * Retail rule: a variant with a `flipkartUrl` shows "Buy on Flipkart"; an empty
 * one shows "Coming to Flipkart soon". Adding a listing is a data change only.
 * No prices live here, on purpose.
 *
 * Bracketed strings ("[Character line]", "[To be confirmed]") are placeholders
 * the owner still has to supply. Leave them visible until real copy exists.
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
  "Mist the NightFury card, hang it from the mirror, hit refresh whenever you want. One bottle outlasts a dozen disposable fresheners.";
const ESSENCE_DESC =
  "Slow-release fragrance oil in faceted glass, braided cord, natural wood cap. Up to 60 days of a cabin that smells like yours.";

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
    },
    {
      slug: "300w", label: "300W", watts: 300, flipkartUrl: "",
      line: "Maximum throw.",
      colors: { tint: "#E3EAF3", halo: "#C6D3E5", liquid: "#FFFFFF", deep: "#020F26" },
      beam: { top: 10, h: 200 },
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
    "The same NightFury optics, packed into a fan-cooled, vibration-tested unit that shrugs off monsoons and broken roads.",
  formatLine: "12W / 25W // Fit, colour and warranty [To be confirmed]",
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
  formatLine: "Dashboard // 55g // 5 scents",
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
          colors: { tint: "#FDE7D6", halo: "#F7CBAD", liquid: "#EF9A6E", deep: "#843D1C" },
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
          colors: { tint: "#EAE5D8", halo: "#D6CDB4", liquid: "#8C7A4F", deep: "#4B4026" },
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
          colors: { tint: "#FFF4CC", halo: "#FCE29A", liquid: "#F5C518", deep: "#6A4E00" },
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
          colors: { tint: "#FDE2EC", halo: "#F7BFD3", liquid: "#C93F86", deep: "#7E1F52" },
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
          colors: { tint: "#DDF4E9", halo: "#B6E6CF", liquid: "#2FB580", deep: "#17603F" },
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
    "A matte-black 50 ml atomizer paired with a NightFury hanging card. Mist the card, hang it from the mirror, refresh whenever you want. One bottle outlasts a dozen disposable fresheners.",
  summary:
    "A matte-black 50 ml atomizer paired with a NightFury hanging card. Your scent, your intensity, on demand.",
  formatLine: "Spray + card // 50 ml // 3 scents",
  chips: ["50 ml", "500+ sprays", "3 scents", "Hanging card included"],
  status: "live",
  specs: [
    { label: "Volume", value: "50 ml" },
    { label: "Sprays", value: "500+" },
    { label: "Scents", value: "3" },
    { label: "Includes", value: "Hanging card" },
  ],
  steps: [
    "Mist the NightFury card two or three times.",
    "Hang the card from the rear-view mirror.",
    "Re-mist whenever the cabin needs a boost.",
  ],
  variants: [
    {
      label: "Air // 50 ml",
      scents: [
        {
          slug: "azure",
          name: "Azure",
          character: CHARACTER_TBC,
          description: AIR_DESC,
          notes: tbcNotes,
          colors: { tint: "#DEEBFA", halo: "#B8D3F3", liquid: "#3B8BEB", deep: "#184A86" },
          flipkartUrl: "",
        },
        {
          slug: "bonfire",
          name: "Bonfire",
          character: CHARACTER_TBC,
          description: AIR_DESC,
          notes: tbcNotes,
          colors: { tint: "#FDE8D6", halo: "#F8CDA6", liquid: "#E8772E", deep: "#843A0C" },
          flipkartUrl: "",
        },
        {
          slug: "impulsive",
          name: "Impulsive",
          character: CHARACTER_TBC,
          description: AIR_DESC,
          notes: tbcNotes,
          colors: { tint: "#ECE2F9", halo: "#D4BFF2", liquid: "#8A55D6", deep: "#4A2884" },
          flipkartUrl: "",
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
    "A faceted glass bottle with a braided cord and natural wood cap, holding 15 ml of slow-release fragrance oil. The most premium way to scent the drive.",
  summary:
    "Faceted glass, braided cord, natural wood cap. The most premium way to scent the drive, and it looks the part on the mirror.",
  formatLine: "Hanging glass // 15 ml // 3 scents",
  chips: ["15 ml", "Up to 60 days", "3 scents", "Glass + wood"],
  status: "live",
  specs: [
    { label: "Volume", value: "15 ml" },
    { label: "Lasts", value: "Up to 60 days" },
    { label: "Scents", value: "3" },
    { label: "Build", value: "Glass, braided cord, wood cap" },
  ],
  steps: [
    "Loop the braided cord over the rear-view mirror.",
    "Tip the bottle once so the oil reaches the wood cap.",
    "Let it hang. Fresh cabin for up to 60 days.",
  ],
  variants: [
    {
      label: "Essence // 15 ml",
      scents: [
        {
          slug: "blue-ocean",
          name: "Blue Ocean",
          character: CHARACTER_TBC,
          description: ESSENCE_DESC,
          notes: tbcNotes,
          colors: { tint: "#DCF2F4", halo: "#B1E0E6", liquid: "#1EA3B5", deep: "#0C5A65" },
          flipkartUrl: "",
        },
        {
          slug: "romance",
          name: "Romance",
          character: CHARACTER_TBC,
          description: ESSENCE_DESC,
          notes: tbcNotes,
          colors: { tint: "#FBE3EE", halo: "#F2C2D8", liquid: "#C25A8E", deep: "#74234D" },
          flipkartUrl: "",
        },
        {
          slug: "fresh-jasmine",
          name: "Fresh Jasmine",
          character: CHARACTER_TBC,
          description: ESSENCE_DESC,
          notes: tbcNotes,
          colors: { tint: "#EFF4DE", halo: "#D9E4AE", liquid: "#AFC45A", deep: "#4A5719" },
          flipkartUrl: "",
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
    colors: { tint: "#ECF0F5", halo: "#D3DBE6", liquid: "#3B6FB6", deep: "#020F26" },
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
    colors: { tint: "#E9F1EF", halo: "#CDE1DC", liquid: "#4E9F96", deep: "#020F26" },
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

/** NightFury brand / store page on Flipkart. [Ask the owner]: placeholder until supplied. */
export const FLIPKART_STORE_URL = "https://www.flipkart.com/";

export type HomeStage = {
  /** Anchor id of the stage section. */
  id: string;
  title: string;
  /** Muted suffix after the eyebrow, e.g. " // 50 ml spray". */
  sub?: string;
  /** Navy category band that starts here. */
  band?: { id: string; title: string; tagline: string };
  /** Products rendered as items of this stage, in order. */
  products: string[];
  /** Organic | Gel toggle (Aroma Core). */
  toggle?: boolean;
};

/** Homepage order (HANDOFF_HOME section 2). The page renders entirely from this. */
export const HOME_STAGES: HomeStage[] = [
  { id: "core", title: "Aroma Core", band: { id: "aroma", title: "Aroma", tagline: "Smell the difference" }, products: ["aroma-core"], toggle: true },
  { id: "air", title: "Aroma Air", sub: " // 50 ml spray", products: ["aroma-air"] },
  { id: "essence", title: "Aroma Essence", sub: " // 15 ml hanging", products: ["aroma-essence"] },
  { id: "led-4w", title: "4-Wheeler LED", sub: " // Headlight pair", band: { id: "vision", title: "Vision", tagline: "See the difference" }, products: ["led-4w"] },
  { id: "led-2w", title: "2-Wheeler LED", sub: " // Coming soon", products: ["led-2w"] },
  { id: "care-range", title: "Car Care", sub: " // Coming soon", band: { id: "care", title: "Care", tagline: "Feel the difference" }, products: ["care-microfiber", "care-wipes"] },
];

/** One step of a homepage scroll stage: a scent, a wattage or a product. */
export type StageItem = {
  slug: string;
  name: string;
  line: string;
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
      }));
    }
    if (p.models) {
      return p.models.map((m) => ({
        slug: m.slug,
        name: m.label,
        line: m.line ?? "",
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
