/** A single scent, with its own copy, note pyramid and photo. */
export type Fragrance = {
  name: string;
  /** Short marketing line shown under the name. */
  tagline: string;
  description: string;
  notes: { top: string; middle: string; base: string };
  /** Path under /public. Falls back to a placeholder if the file is missing. */
  image?: string;
};

export type FragranceType = {
  name: string;
  description: string;
  fragrances: Fragrance[];
};

export type Product = {
  slug: string;
  /** Clean URL segment for the product's own page, e.g. /aroma/essence. */
  pageSlug?: string;
  name: string;
  variant?: string;
  tagline: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  /** Path under /public. If the file is missing, the UI falls back to SVG box art. */
  image?: string;
  /** Media gallery folder path under /public/media/products/. Files named 1.png, 2.png, etc. or 1.mp4 etc. */
  mediaDir?: string;
  /** Which built-in SVG box art to render when no photo exists. */
  boxArt?: "led2w" | "microfiber" | "wipes";
  /** Selectable output options, e.g. wattages. */
  wattOptions?: string[];
  /** Selectable fragrance options for Aroma products. */
  fragranceOptions?: string[];
  /** Fragrance grouped by type, e.g. Gel / Organic. Takes precedence over fragranceOptions. */
  fragranceTypes?: FragranceType[];
  /** Selectable pack size options. */
  packOptions?: string[];
  badge?: string;
  outOfStock?: boolean;
};

export type SubBrand = {
  slug: "vision" | "aroma" | "care";
  name: string;
  tagline: string;
  accent: string;
  intro: string;
  products: Product[];
};

export const SUB_BRANDS: SubBrand[] = [
  {
    slug: "vision",
    name: "NightFury Vision",
    tagline: "Drive the Difference",
    accent: "#f28c28",
    intro:
      "Precision-engineered LED lighting for riders and drivers who refuse to compromise after dark. Every Vision unit is CANBUS-ready, thermally managed, and tested for the worst roads before it earns the badge.",
    products: [
      {
        slug: "led-4w",
        name: "4-Wheeler LED Headlight",
        variant: "Pair Pack",
        tagline: "Superior visibility on the road",
        description:
          "Our flagship LED pair, available in 240W and 300W outputs, turns night into day with dual 6000K / 4300K color temperature modes and full-width road coverage. CANBUS integration means zero dashboard errors, plug in and drive.",
        features: [
          "Available in 240W and 300W",
          "Cool 6000K / 4300K color temperature",
          "Life span up to 5,000 hours",
          "CANBUS integration, no error codes",
          "Super brightness up to 250%*",
          "Excellent road coverage",
        ],
        specs: [
          { label: "Power", value: "240W / 300W" },
          { label: "Voltage", value: "9V-32V" },
          { label: "Color Temp", value: "6000K / 4300K" },
          { label: "Life Span", value: "5,000 hours" },
          { label: "Warranty", value: "18 months" },
          { label: "Pack", value: "Pair Pack" },
        ],
        image: "/media/products/vision/4whled/1.png",
        mediaDir: "vision/4whled",
        wattOptions: ["240W", "300W"],
        badge: "Premium Edition",
      },
      {
        slug: "led-2w",
        name: "2-Wheeler LED Headlight",
        mediaDir: "vision/2whled",
        variant: "Single Unit",
        tagline: "Own the night, on two wheels",
        description:
          "Compact, vibration-tested LED engineered for motorcycles and scooters. The same NightFury optics as our 4-wheeler flagship, packed into a fan-cooled unit that shrugs off monsoons and washboard roads.",
        features: [
          "Ultra bright 60W output",
          "Cool 6000K / 4300K color temperature",
          "Vibration-tested for two-wheelers",
          "IP67 water & dust resistant",
          "Life span up to 5,000 hours",
          "Universal H4 fitment",
        ],
        specs: [
          { label: "Power", value: "60W" },
          { label: "Voltage", value: "9V-32V" },
          { label: "Color Temp", value: "6000K / 4300K" },
          { label: "Rating", value: "IP67" },
          { label: "Warranty", value: "18 months" },
          { label: "Fitment", value: "H4 Universal" },
        ],
        badge: "Premium Edition",
        outOfStock: true,
      },
    ],
  },
  {
    slug: "aroma",
    name: "NightFury Aroma",
    tagline: "Smell the Difference",
    accent: "#f28c28",
    intro:
      "Cabin fragrance engineered like a performance part. Long-lasting premium oils, signature glass and matte-black hardware, because the way your car smells says as much as the way it sounds.",
    products: [
      {
        slug: "aroma-core",
        pageSlug: "core",
        name: "Aroma Core",
        mediaDir: "aroma/core",
        variant: "Gel Dashboard Freshener · 55g",
        fragranceTypes: [
          {
            name: "Gel",
            description:
              "A solid gel that releases at a steady rate whatever the cabin temperature, and never spills on a hard corner.",
            fragrances: [
              {
                name: "Citrus Zest",
                tagline: "Bright. Clean. Awake.",
                description:
                  "A sharp burst of cold-pressed citrus that cuts through stale cabin air on the first turn of the key. Bright enough for the morning commute without turning sweet by the afternoon.",
                notes: { top: "Sicilian bergamot, lemon peel", middle: "Neroli, green apple", base: "White musk, light cedar" },
                image: "/media/products/aroma/core/gel/citrus-zest.png",
              },
              {
                name: "Berry Bloom",
                tagline: "Soft. Rounded. Warm.",
                description:
                  "Ripe red berries over a bed of florals, warmed by vanilla as it settles. The friendliest scent in the range, and the one passengers ask about most.",
                notes: { top: "Wild strawberry, raspberry", middle: "Rose petal, jasmine", base: "Vanilla, soft amber" },
                image: "/media/products/aroma/core/gel/berry-bloom.png",
              },
              {
                name: "Mountain Mint",
                tagline: "Cool. Sharp. Focused.",
                description:
                  "Crushed mint and eucalyptus with a cool green edge that keeps the cabin feeling ventilated. Built for long night drives and heavy traffic.",
                notes: { top: "Peppermint, eucalyptus", middle: "Spearmint, green tea", base: "Vetiver, cedarwood" },
                image: "/media/products/aroma/core/gel/mountain-mint.png",
              },
            ],
          },
          {
            name: "Organic",
            description:
              "Organically derived oils on a natural carrier. A softer, closer throw for drivers who want fragrance without the intensity of a synthetic blend.",
            fragrances: [
              {
                name: "Nature's Bloom",
                tagline: "Fresh Florals. Open Air.",
                description:
                  "Orange blossom and jasmine over a clean dew accord, the smell of a window left open on a spring morning. Light on the nose and slow to fade.",
                notes: { top: "Orange blossom, dew accord", middle: "Jasmine, ylang-ylang", base: "Sandalwood, white musk" },
                image: "/media/products/aroma/core/organic/natures-bloom.png",
              },
              {
                name: "Earth Essence",
                tagline: "Grounded. Woody. Quiet.",
                description:
                  "Damp earth, moss and warm wood, closer to a forest floor after rain than to a perfume counter. The most understated scent in the range.",
                notes: { top: "Bergamot, black pepper", middle: "Patchouli, clary sage", base: "Oakmoss, sandalwood" },
                image: "/media/products/aroma/core/organic/earth-essence.png",
              },
            ],
          },
        ],
        tagline: "Silent fragrance, always on.",
        description:
          "A sleek glass canister with a wheel rim design inspired by luxury cars. Aroma Core sits quietly on your console and releases a steady, subtle fragrance for weeks. No cords, no clips, no refills needed.",
        features: [
          "Gel and organic formulations",
          "Long lasting, up to 60 days",
          "Compact dashboard design",
          "Glass canister, wheel-rim design",
          "No installation required",
          "Made for every drive",
        ],
        specs: [
          { label: "Weight", value: "55g" },
          { label: "Fragrances", value: "5 scents, 2 types" },
          { label: "Placement", value: "Dashboard / console" },
          { label: "Duration", value: "Up to 60 days" },
        ],
        badge: "Premium Edition",
      },
      {
        slug: "aroma-air",
        pageSlug: "air",
        name: "Aroma Air",
        mediaDir: "aroma/air",
        variant: "Spray + Hanging Card · 50 ml",
        fragranceOptions: ["Fragrance A", "Fragrance B", "Fragrance C", "Fragrance D", "Fragrance E"],
        tagline: "Spray. Hang. Arrive.",
        description:
          "A matte-black 50 ml atomizer paired with a NightFury hanging card. Mist the card, hang it from your mirror, and refresh whenever you want, one bottle outlasts a dozen disposable fresheners.",
        features: [
          "Premium fragrance",
          "Long lasting formula",
          "Refreshing aroma",
          "Matte-black atomizer bottle",
          "Reusable hanging card included",
          "Made for every drive",
        ],
        specs: [
          { label: "Volume", value: "50 ml" },
          { label: "Fragrances", value: "5 scents" },
          { label: "Type", value: "Spray + hanging card" },
          { label: "Duration", value: "500+ sprays" },
        ],
        badge: "Premium Edition",
      },
      {
        slug: "aroma-hanging",
        pageSlug: "essence",
        name: "Aroma Essence",
        mediaDir: "aroma/essence",
        variant: "Hanging Bottle · 15 ml",
        fragranceOptions: ["Fragrance A", "Fragrance B", "Fragrance C", "Fragrance D", "Fragrance E"],
        tagline: "Premium fragrance, suspended in glass",
        description:
          "A faceted glass bottle with a braided cord and natural wood cap, filled with 15 ml of slow-release premium fragrance oil. Choose your scent, it keeps the cabin fresh for weeks, not days.",
        features: [
          "Premium fragrance oil",
          "Long lasting, weeks of slow release",
          "Refreshing aroma",
          "Faceted glass bottle, wood cap",
          "Braided hanging cord",
          "Made for every drive",
        ],
        specs: [
          { label: "Volume", value: "15 ml" },
          { label: "Fragrances", value: "5 scents" },
          { label: "Type", value: "Hanging bottle" },
          { label: "Duration", value: "Up to 55 days" },
        ],
        badge: "Premium Edition",
      },
    ],
  },
  {
    slug: "care",
    name: "NightFury Care",
    tagline: "Feel the Difference",
    accent: "#f28c28",
    intro:
      "Detailing-grade care products for daily drivers. Plush microfiber and pH-balanced wipes that protect paint, glass and interiors, the same materials professional studios trust.",
    products: [
      {
        slug: "care-microfiber",
        name: "Microfiber Cloth",
        mediaDir: "care/microfiber",
        variant: "380 GSM",
        packOptions: ["Pack of 1", "Pack of 2", "Pack of 3"],
        tagline: "Scratch-free shine, every wipe",
        description:
          "Ultra-plush 380 GSM microfiber with laser-cut edgeless borders. Lifts dust and polish residue without a single swirl mark, safe on ceramic coats, PPF and gloss black trim.",
        features: [
          "380 GSM ultra-plush weave",
          "Edgeless laser-cut borders",
          "Swirl & scratch free",
          "Lint-free finish",
          "Machine washable 300+ cycles",
          "Safe on ceramic & PPF",
        ],
        specs: [
          { label: "Density", value: "380 GSM" },
          { label: "Size", value: "40 × 40 cm" },
          { label: "Pack", value: "2 cloths" },
          { label: "Blend", value: "80/20 polyester-polyamide" },
        ],
        badge: "Premium Edition",
        outOfStock: true,
      },
      {
        slug: "care-wipes",
        name: "Car Wet Wipes",
        mediaDir: "care/wipes",
        variant: "Interior & Dashboard · 40 wipes",
        tagline: "Showroom clean, anywhere",
        description:
          "Thick pH-balanced wipes that cut through dust, grime and fingerprints on dashboards, screens and leather, then dry to a matte, anti-static finish. No grease, no shine, no residue.",
        features: [
          "pH-balanced, alcohol-free formula",
          "Anti-static matte finish",
          "Safe on leather, plastic & screens",
          "UV protection additive",
          "Thick 50 GSM wipe material",
          "Resealable fresh-lock lid",
        ],
        specs: [
          { label: "Count", value: "40 wipes" },
          { label: "Material", value: "50 GSM spunlace" },
          { label: "Formula", value: "pH-balanced, alcohol-free" },
          { label: "Finish", value: "Matte anti-static" },
        ],
        badge: "Premium Edition",
        outOfStock: true,
      },
    ],
  },
];

export function getSubBrand(slug: string) {
  return SUB_BRANDS.find((b) => b.slug === slug);
}

/** Look up a product by its clean page slug within a sub-brand, e.g. ("aroma", "essence"). */
export function getProductByPageSlug(brandSlug: string, pageSlug: string) {
  const brand = getSubBrand(brandSlug);
  if (!brand) return undefined;
  return brand.products.find((p) => p.pageSlug === pageSlug);
}
