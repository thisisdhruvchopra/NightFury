import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/legal";
import { AROMA_PRODUCTS, flatScents, shopImage, visionLed4w } from "@/data/products";

const abs = (src: string) => `${SITE_URL}${src}`;

/* Product photos listed per page, so they can surface in Google Images. */
const IMAGES: Record<string, string[]> = {
  "": [abs("/home/hero.webp")],
  "/aroma": [...new Set(AROMA_PRODUCTS.flatMap((p) => flatScents(p).map((s) => abs(shopImage(p, s).src))))],
  "/vision": [abs(shopImage(visionLed4w).src)],
};

const ROUTES: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, freq: "weekly" },
  { path: "/aroma", priority: 0.9, freq: "weekly" },
  { path: "/vision", priority: 0.9, freq: "weekly" },
  { path: "/care", priority: 0.8, freq: "weekly" },
  { path: "/where-to-buy", priority: 0.8, freq: "weekly" },
  { path: "/dealers", priority: 0.8, freq: "monthly" },
  { path: "/about", priority: 0.6, freq: "monthly" },
  { path: "/contact-us", priority: 0.5, freq: "yearly" },
  { path: "/terms-and-conditions", priority: 0.2, freq: "yearly" },
  { path: "/privacy-policy", priority: 0.2, freq: "yearly" },
  { path: "/shipping-policy", priority: 0.2, freq: "yearly" },
  { path: "/refund-return-policy", priority: 0.2, freq: "yearly" },
  { path: "/warranty-policy", priority: 0.2, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: r.freq,
    priority: r.priority,
    ...(IMAGES[r.path] ? { images: IMAGES[r.path] } : {}),
  }));
}
