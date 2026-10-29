import type { Metadata } from "next";
import { SITE_URL } from "./legal";
import type { Product } from "@/data/products";
import { flatScents } from "@/data/products";

/** Per-page title, description, canonical and OG tags, all on www.nightfury.co.in. */
export function pageMeta({
  title,
  description,
  path,
}: Readonly<{ title: string; description: string; path: string }>): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "NightFury", type: "website", locale: "en_IN" },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Product structured data. No price and no offers until the owner says so. */
export function productJsonLd(p: Product, path: string) {
  const scents = flatScents(p);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `NightFury ${p.name}`,
    description: p.description,
    brand: { "@type": "Brand", name: "NightFury" },
    url: `${SITE_URL}${path}`,
    category: p.line === "vision" ? "Vehicle lighting" : p.line === "aroma" ? "Car air freshener" : "Car care",
    ...(scents.length
      ? { additionalProperty: [{ "@type": "PropertyValue", name: "Scents", value: scents.map((s) => s.name).join(", ") }] }
      : {}),
  };
}
