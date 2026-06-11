export type Product = {
  slug: string;
  name: string;
  variant?: string;
  tagline: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  /** Path under /public. If the file is missing, the UI falls back to SVG box art. */
  image?: string;
  /** Which built-in SVG box art to render when no photo exists. */
  boxArt?: "led2w" | "microfiber" | "wipes";
  badge?: string;
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
          "Our flagship 250W LED pair turns night into day with dual 6000K / 4300K color temperature modes and full-width road coverage. CANBUS integration means zero dashboard errors, plug in and drive.",
        features: [
          "Ultra bright 250W output",
          "Cool 6000K / 4300K color temperature",
          "Life span up to 5,000 hours",
          "CANBUS integration, no error codes",
          "Super brightness up to 250%",
          "Excellent road coverage",
        ],
        specs: [
          { label: "Power", value: "250W (pair)" },
          { label: "Voltage", value: "9V-32V" },
          { label: "Color Temp", value: "6000K / 4300K" },
          { label: "Life Span", value: "5,000 hours" },
          { label: "Warranty", value: "18 months" },
          { label: "Pack", value: "Pair Pack" },
        ],
        image: "/products/vision-led-4w.png",
        badge: "Premium Edition",
      },
      {
        slug: "led-2w",
        name: "2-Wheeler LED Headlight",
        variant: "Single Unit",
        tagline: "Own the night, on two wheels",
        description:
          "Compact, vibration-tested LED engineered for motorcycles and scooters. The same NightFury optics as our 4-wheeler flagship, packed into a fan-cooled unit that shrugs off monsoons and washboard roads.",
        features: [
          "Ultra bright 120W output",
          "Cool 6000K / 4300K color temperature",
          "Vibration-tested for two-wheelers",
          "IP67 water & dust resistant",
          "Life span up to 5,000 hours",
          "Universal H4 fitment",
        ],
        specs: [
          { label: "Power", value: "120W" },
          { label: "Voltage", value: "9V-32V" },
          { label: "Color Temp", value: "6000K / 4300K" },
          { label: "Rating", value: "IP67" },
          { label: "Warranty", value: "18 months" },
          { label: "Fitment", value: "H4 Universal" },
        ],
        boxArt: "led2w",
        badge: "Premium Edition",
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
        slug: "aroma-hanging",
        name: "Hanging Bottle Car Perfume",
        variant: "Ocean Breeze · 8 ml",
        tagline: "Premium fragrance, suspended in glass",
        description:
          "A faceted glass bottle with a braided cord and natural wood cap, filled with 8 ml of slow-release premium fragrance oil. Ocean Breeze keeps the cabin fresh for weeks, not days.",
        features: [
          "Premium fragrance oil",
          "Long lasting, weeks of slow release",
          "Refreshing aroma",
          "Faceted glass bottle, wood cap",
          "Braided hanging cord",
          "Made for every drive",
        ],
        specs: [
          { label: "Volume", value: "8 ml" },
          { label: "Fragrance", value: "Ocean Breeze" },
          { label: "Type", value: "Hanging bottle" },
          { label: "Duration", value: "Up to 45 days" },
        ],
        image: "/products/aroma-hanging.png",
        badge: "Premium Edition",
      },
      {
        slug: "aroma-spray",
        name: "Spray Car Perfume",
        variant: "Midnight Noir · 50 ml",
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
          { label: "Fragrance", value: "Midnight Noir" },
          { label: "Type", value: "Spray + hanging card" },
          { label: "Duration", value: "200+ sprays" },
        ],
        image: "/products/aroma-spray.png",
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
        variant: "380 GSM · Pack of 2",
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
        boxArt: "microfiber",
        badge: "Premium Edition",
      },
      {
        slug: "care-wipes",
        name: "Car Wet Wipes",
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
        boxArt: "wipes",
        badge: "Premium Edition",
      },
    ],
  },
];

export function getSubBrand(slug: string) {
  return SUB_BRANDS.find((b) => b.slug === slug);
}
