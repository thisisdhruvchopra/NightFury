import type { Metadata } from "next";
import { BUSINESS, SUPPORT, SITE_URL } from "./legal";
import { INSTAGRAM } from "./socials";
import type { Product } from "@/data/products";
import { flatScents, shopImage } from "@/data/products";

/** Share-preview image for every page (WhatsApp, Instagram DMs, Google Discover). */
export const OG_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Nightfury: LED headlights, car perfumes and car care",
} as const;

/** Square brand logo on navy, used by Google for the knowledge panel and results. */
export const LOGO_URL = `${SITE_URL}/brand/nightfury/logo-512.png`;

const abs = (src: string) => (src.startsWith("http") ? src : `${SITE_URL}${src}`);

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
    // A page-level openGraph replaces the layout's, so the image has to be repeated here.
    openGraph: { title, description, url, siteName: "Nightfury", type: "website", locale: "en_IN", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

/** Brand entity: name, logo, socials and support line. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.brandName,
    alternateName: "Nightfury Automotive",
    url: SITE_URL,
    logo: LOGO_URL,
    image: abs(OG_IMAGE.url),
    slogan: "Drive The Difference",
    description: "Nightfury makes Vision LED headlights, Aroma car perfumes and Care detailing products for drivers in India.",
    sameAs: [INSTAGRAM.url],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SUPPORT.phone,
      email: SUPPORT.email,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${BUSINESS.address.line1}, ${BUSINESS.address.line2}`,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.pin,
      addressCountry: "IN",
    },
  };
}

/** Tells Google the site's name, so results read "Nightfury" rather than the bare domain. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Nightfury",
    alternateName: ["Nightfury Automotive", "Nightfury India", "nightfury.co.in"],
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/** Home > current page trail, matching the visible breadcrumb. */
export function breadcrumbJsonLd(current: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: current },
    ],
  };
}

/** Product structured data. No price and no offers until the owner says so. */
export function productJsonLd(p: Product, path: string) {
  const scents = flatScents(p);
  const images = [...new Set((scents.length ? scents.map((s) => shopImage(p, s).src) : [shopImage(p).src]).map(abs))];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Nightfury ${p.name}`,
    description: p.description,
    image: images,
    brand: { "@type": "Brand", name: "Nightfury" },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}${path}`,
    category: p.line === "vision" ? "Vehicle lighting" : p.line === "aroma" ? "Car air freshener" : "Car care",
    ...(scents.length
      ? { additionalProperty: [{ "@type": "PropertyValue", name: "Scents", value: scents.map((s) => s.name).join(", ") }] }
      : {}),
  };
}
