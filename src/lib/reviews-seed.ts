export type Review = {
  id: string;
  productSlug: string;
  name: string;
  location?: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  media: { type: "image" | "video"; url: string }[];
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rajat Verma",
    role: "Fortuner owner · Delhi NCR",
    quote:
      "Swapped my stock halogens for the NightFury 4W pair and the highway drive home felt like a different car. Zero flicker, zero dash errors. This is OEM-plus quality.",
    rating: 5,
  },
  {
    name: "Mehul Shah",
    role: "Accessories retailer · Ahmedabad",
    quote:
      "I stock a lot of brands. NightFury is the only one where customers come back asking for the same box by name. The packaging sells itself off the shelf.",
    rating: 5,
  },
  {
    name: "Ananya Iyer",
    role: "Swift owner · Bengaluru",
    quote:
      "The Midnight Noir spray is genuinely premium, my cab-driver friends keep asking what it is. One bottle has lasted me three months and counting.",
    rating: 5,
  },
  {
    name: "Harpreet Singh",
    role: "Royal Enfield rider · Chandigarh",
    quote:
      "Did a 600 km night run on the 2-wheeler LED through fog and rain. Visibility was unreal and the unit didn't miss a beat. Worth every rupee.",
    rating: 5,
  },
  {
    name: "Vikram Nair",
    role: "Detailing studio owner · Kochi",
    quote:
      "We use the Care microfiber on ceramic-coated cars daily. 380 GSM, edgeless, and it survives our industrial washers. Professional grade, honestly priced.",
    rating: 5,
  },
];

export const SEED_REVIEWS: Review[] = [
  // ---- Vision: 4W LED ----
  {
    id: "r1",
    productSlug: "led-4w",
    name: "Arjun Malhotra",
    location: "Gurugram",
    rating: 5,
    title: "Night highway drives are finally relaxing",
    body: "Installed on my Creta in 20 minutes. The 6000K mode is crisp white without blinding oncoming traffic when aimed right. CANBUS claim is real, no bulb-out warning, which my last brand triggered constantly.",
    date: "2026-05-18",
    verified: true,
    media: [],
  },
  {
    id: "r2",
    productSlug: "led-4w",
    name: "Sandeep Rao",
    location: "Hyderabad",
    rating: 5,
    title: "Better than units costing twice as much",
    body: "Compared these side by side with a popular imported brand. NightFury throws a wider, more even beam with a sharper cutoff. 8 months in, zero issues. The 18-month warranty sealed the deal for me.",
    date: "2026-04-02",
    verified: true,
    media: [],
  },
  {
    id: "r3",
    productSlug: "led-4w",
    name: "Kavya Krishnan",
    location: "Chennai",
    rating: 4,
    title: "Excellent light, snug fit on some models",
    body: "Beam quality is outstanding and the build feels solid. On my Baleno the dust cap needed a minor trim to close fully, worth checking your model first. Light output itself is a clear 5 stars.",
    date: "2026-03-21",
    verified: true,
    media: [],
  },
  // ---- Vision: 2W LED ----
  {
    id: "r4",
    productSlug: "led-2w",
    name: "Rohit Pawar",
    location: "Pune",
    rating: 5,
    title: "Transformed my Classic 350",
    body: "Stock headlight was a candle. This is a floodlight. Survived two months of Pune monsoon riding without a hiccup, the IP67 rating is no joke. Fitment was direct plug-and-play on the H4 socket.",
    date: "2026-05-30",
    verified: true,
    media: [],
  },
  {
    id: "r5",
    productSlug: "led-2w",
    name: "Imran Qureshi",
    location: "Lucknow",
    rating: 5,
    title: "Daily 40km night commute, total confidence",
    body: "Potholes, stray cattle, unlit stretches, I see all of it now with time to react. No flickering at idle RPM like cheaper LEDs. This should be standard fitment from the factory.",
    date: "2026-04-15",
    verified: true,
    media: [],
  },
  // ---- Aroma: hanging ----
  {
    id: "r6",
    productSlug: "aroma-hanging",
    name: "Sneha Kulkarni",
    location: "Mumbai",
    rating: 5,
    title: "Subtle, classy, lasts forever",
    body: "Ocean Breeze is fresh without being overpowering, no headache on long drives, which is rare. The glass bottle and wood cap look genuinely premium hanging from the mirror. 6 weeks in and still going.",
    date: "2026-05-09",
    verified: true,
    media: [],
  },
  {
    id: "r7",
    productSlug: "aroma-hanging",
    name: "Devendra Joshi",
    location: "Jaipur",
    rating: 4,
    title: "Great scent, wish there were more fragrances",
    body: "Quality is miles ahead of the usual petrol-pump fresheners. Scent throw is perfect for a sedan. Only wish: more fragrance options in this bottle format. Will buy again regardless.",
    date: "2026-03-28",
    verified: true,
    media: [],
  },
  // ---- Aroma: spray ----
  {
    id: "r8",
    productSlug: "aroma-spray",
    name: "Aditi Menon",
    location: "Kochi",
    rating: 5,
    title: "The hanging card idea is brilliant",
    body: "Two sprays on the card and the cabin smells like a luxury hotel lobby for days. Midnight Noir is deep and woody, not sweet. The matte black bottle lives in my glovebox, refresh takes five seconds.",
    date: "2026-05-25",
    verified: true,
    media: [],
  },
  {
    id: "r9",
    productSlug: "aroma-spray",
    name: "Nikhil Bansal",
    location: "Noida",
    rating: 5,
    title: "One bottle replaced a year of fresheners",
    body: "Did the math: I was buying a gel freshener every month. This 50 ml bottle is on month four and barely half done. Smells far better too. Easily the best value accessory in my car.",
    date: "2026-02-14",
    verified: true,
    media: [],
  },
  // ---- Care: microfiber ----
  {
    id: "r10",
    productSlug: "care-microfiber",
    name: "Farhan Sheikh",
    location: "Mumbai",
    rating: 5,
    title: "Detailing-studio quality in retail packaging",
    body: "I detail cars on weekends. These are legitimately 380 GSM, thick, edgeless, and they leave gloss black trim spotless with zero swirls. Survived 20+ machine washes so far. Stocking up.",
    date: "2026-05-12",
    verified: true,
    media: [],
  },
  {
    id: "r11",
    productSlug: "care-microfiber",
    name: "Priya Raghavan",
    location: "Coimbatore",
    rating: 5,
    title: "Finally, a cloth that doesn't scratch",
    body: "My previous cloths left fine swirls on the black bonnet that showed up in sunlight. Two months with the NightFury pair, paint is flawless. They absorb a ridiculous amount of water during drying too.",
    date: "2026-04-19",
    verified: true,
    media: [],
  },
  // ---- Care: wipes ----
  {
    id: "r12",
    productSlug: "care-wipes",
    name: "Gaurav Thakur",
    location: "Indore",
    rating: 5,
    title: "Dashboard looks new, not greasy",
    body: "Most wipes leave that oily shine that attracts more dust. These dry matte and the dashboard actually stays clean longer, the anti-static claim holds up. Safe on my touchscreen as well, no smearing.",
    date: "2026-05-28",
    verified: true,
    media: [],
  },
  {
    id: "r13",
    productSlug: "care-wipes",
    name: "Ritu Agarwal",
    location: "Kolkata",
    rating: 4,
    title: "Excellent for quick cleanups with kids",
    body: "Two kids, daily school runs, these live in my door pocket. Handles juice spills, footprints and dust equally well. The fresh-lock lid actually keeps them moist unlike other brands. Would love a bigger pack size.",
    date: "2026-03-10",
    verified: true,
    media: [],
  },
];

export function reviewsForProduct(slug: string) {
  return SEED_REVIEWS.filter((r) => r.productSlug === slug);
}

export function reviewsForBrand(productSlugs: string[]) {
  return SEED_REVIEWS.filter((r) => productSlugs.includes(r.productSlug));
}
