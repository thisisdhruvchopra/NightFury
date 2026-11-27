/**
 * Homepage and brand content in one place.
 *
 * Anything in [square brackets] is a placeholder for you to fill in. It is
 * hidden on the live site and highlighted in orange while you run
 * `npm run dev`, so nothing half-finished ever reaches customers.
 * Replace the bracketed text (brackets included) with the real value.
 */

export const HERO = {
  eyebrow: "Premium automotive accessories // Made for Indian roads",
  title: ["Drive the", "difference."],
  body:
    "LED headlights, car perfumes and care essentials, engineered to make any car feel special. Supplied to dealers across India and available on Flipkart.",
  image: "/home/hero.webp",
  imageAlt: "A car at night with Nightfury LED headlights cutting through the dark",
};

/**
 * Proof numbers under the hero. The live site shows the first four that are
 * filled in, so add your real numbers and they take over from the defaults.
 */
export const STATS: { value: string; label: string }[] = [
  { value: "25+", label: "Dealers across India" },
  { value: "[00+]", label: "Cities served" },
  { value: "1", label: "Year in automotive distribution" },
  { value: "3", label: "Product lines" },
  { value: "11", label: "Signature scents" },
  { value: "18 mo", label: "Warranty on Vision LED" },
];

/** The three category tiles. Images are cropped from your existing posters. */
export const LINES = [
  {
    key: "vision",
    eyebrow: "01 // See",
    title: "Vision",
    kind: "LED headlights",
    tagline: "See the difference",
    body: "240W and 300W LED pairs with dual colour modes, CANBUS-ready and IP67 rated.",
    href: "/vision",
    image: "/home/tiles/vision.webp",
    imageAlt: "Car headlight beam on a dark road",
    status: "live" as const,
  },
  {
    key: "aroma",
    eyebrow: "02 // Smell",
    title: "Aroma",
    kind: "Car perfumes",
    tagline: "Smell the difference",
    body: "Three formats for the dash, the mirror and on demand. Eleven signature scents.",
    href: "/aroma",
    image: "/home/tiles/aroma.webp",
    imageAlt: "Nightfury Aroma bottle with fragrance smoke",
    status: "live" as const,
  },
  {
    key: "care",
    eyebrow: "03 // Feel",
    title: "Care",
    kind: "Car care",
    tagline: "Feel the difference",
    body: "Detailing-grade microfiber and cabin wipes to keep paint and interiors spotless.",
    href: "/care",
    image: "/home/tiles/care.webp",
    imageAlt: "Silhouette of a car in a dark studio",
    status: "coming-soon" as const,
  },
];

/** "Why Nightfury" points. */
export const WHY = [
  {
    icon: "shield" as const,
    title: "18-month warranty",
    body: "Every Vision LED pair is covered for 18 months against manufacturing defects.",
  },
  {
    icon: "canbus" as const,
    title: "Plug and play",
    body: "CANBUS-ready LEDs fit in minutes with no cutting, splicing or dashboard errors.",
  },
  {
    icon: "spark" as const,
    title: "Retail-ready packaging",
    body: "Display-ready boxes built to sell off the shelf, not sit behind the counter.",
  },
  {
    icon: "pin" as const,
    title: "Direct dealer support",
    body: "Stock, schemes and after-sales handled directly by the Nightfury team.",
  },
];

/**
 * One line of credibility for the distributor. Mention the brands Yash
 * Marketing already distributes only after those brands have agreed to it.
 */
export const DISTRIBUTOR_NOTE =
  "[One line about Yash Marketing, e.g. 'Distributed by Yash Marketing, supplying automotive parts and accessories to dealers since 19XX.']";

/** Products that appear in the "Coming next" row instead of a full stage. */
export const COMING_NEXT = [
  { name: "2-Wheeler LED", detail: "12W and 25W headlights for bikes and scooters", href: "/vision#two-wheeler", product: "led-2w" },
  { name: "Microfiber Cloth", detail: "Edgeless, swirl-free detailing cloth", href: "/care#microfiber", product: "care-microfiber" },
  { name: "Car Wet Wipes", detail: "pH-balanced wipes for dash, screens and leather", href: "/care#wipes", product: "care-wipes" },
];
