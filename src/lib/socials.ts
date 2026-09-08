import { BUSINESS, SUPPORT, SITE_URL } from "./legal";

/**
 * Everything the /socials page renders comes from this file.
 *
 * To point a second domain at this page (e.g. links.nightfury.in), set
 * SOCIALS_HOST in the environment and add the domain in your host/DNS.
 * next.config.ts rewrites that host's root to /socials, so nothing here
 * or in the page has to change.
 */
export const SOCIALS_PAGE = {
  /** Hostname whose root should serve this page. Empty = feature off. */
  host: process.env.SOCIALS_HOST ?? "",
  /** Canonical URL of the page, used for metadata and the QR/share link. */
  get url() {
    return this.host ? `https://${this.host}` : `${SITE_URL}/socials`;
  },
  eyebrow: "OFFICIAL LINKS",
  title: "NightFury",
  /* Split so FURY can carry the accent orange, the way the logo does. */
  titleLead: "Night",
  titleAccent: "Fury",
  subtitle: "Drive The Difference",
  blurb:
    "Every official NightFury channel in one place. Shop the store, follow the build, or talk to the distributor directly.",
  /* Background photo behind both panels. */
  background: "/media/graphics/carled.png",
} as const;

/**
 * The socials page publishes its own line, not the site-wide support number
 * in legal.ts. Phone, WhatsApp and the page metadata all read from here.
 */
export const SOCIALS_PHONE = {
  display: "+91 9839187898",
  href: "tel:+919839187898",
  digits: "919839187898",
} as const;

export type SocialLink = {
  key: string;
  label: string;
  handle: string;
  href: string;
  note: string;
  /** true = opens off-site, gets target=_blank */
  external: boolean;
};

// TODO: confirm the live Instagram handle before shipping.
export const INSTAGRAM = {
  handle: "@nightfury.in",
  url: "https://www.instagram.com/nightfury.in/",
} as const;

export const WHATSAPP = {
  /** Digits only, country code first, no + or spaces. */
  number: SOCIALS_PHONE.digits,
  get url() {
    return `https://wa.me/${this.number}`;
  },
} as const;

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    key: "website",
    label: "Official Website",
    handle: SITE_URL.replace(/^https?:\/\//, ""),
    href: SITE_URL,
    note: "Vision, Aroma and Care. Shop the full range.",
    external: true,
  },
  {
    key: "instagram",
    label: "Instagram",
    handle: INSTAGRAM.handle,
    href: INSTAGRAM.url,
    note: "Product drops, installs and behind the counter.",
    external: true,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    handle: SOCIALS_PHONE.display,
    href: WHATSAPP.url,
    note: "Orders, stock checks and dealer pricing.",
    external: true,
  },
  {
    key: "email",
    label: "Email Support",
    handle: SUPPORT.email,
    href: `mailto:${SUPPORT.email}`,
    note: SUPPORT.responseTime,
    external: false,
  },
  {
    key: "dealer",
    label: "Dealer Inquiry",
    handle: "Become a NightFury dealer",
    href: `mailto:${SUPPORT.email}?subject=Dealer%20Inquiry`,
    note: "Dealer pricing, territories and commercial terms on request.",
    external: false,
  },
] as const;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  BUSINESS.fullAddress,
)}`;
