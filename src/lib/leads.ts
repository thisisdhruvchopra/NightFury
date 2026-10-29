/**
 * Lead forms (HANDOFF section 9). Shared by the browser (inline errors) and the
 * /api/leads route (the authority). Only the fields listed here are kept: the
 * DPDP Act 2023 asks us to collect nothing beyond what the enquiry needs.
 */
import { PRODUCT_SLUGS } from "@/data/products";

export const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
] as const;

export const BUSINESS_TYPES = [
  "Accessories retailer",
  "Car care studio",
  "Workshop",
  "Distributor",
  "Other",
] as const;

export const LINES = ["vision", "aroma", "care"] as const;
export const NOTIFY_TOPICS = [...PRODUCT_SLUGS, "care", "newsletter"];

export type LeadType = "dealer" | "notify" | "find-dealer";
export type Errors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const GSTIN = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Accepts 98765 43210, +91 98765-43210, 0919876543210 and returns +919876543210. */
export function normalisePhone(v: string) {
  let d = v.replace(/[^\d]/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? `+91${d}` : null;
}

function need(errors: Errors, key: string, value: string, label: string, min = 2) {
  if (value.length < min) errors[key] = `Enter your ${label}.`;
}

export type DealerLead = {
  type: "dealer";
  fullName: string; business: string; city: string; state: string; phone: string;
  email?: string; gstin?: string; businessType: string; lines: string[];
  product?: string; message?: string; consent: true;
};
export type NotifyLead = { type: "notify"; contact: string; product: string; scent?: string; consent: true };
export type FindDealerLead = { type: "find-dealer"; tag: "customer"; city: string; name: string; phone: string; consent: true };
export type Lead = DealerLead | NotifyLead | FindDealerLead;

/** Validates raw input and returns only the allowed, cleaned fields. */
export function validateLead(raw: Record<string, unknown>): { lead?: Lead; errors: Errors } {
  const errors: Errors = {};
  const consent = raw.consent === true || raw.consent === "on" || raw.consent === "true";
  if (!consent) errors.consent = "Please tick the box so we can contact you.";

  if (raw.type === "dealer") {
    const fullName = str(raw.fullName, 80);
    const business = str(raw.business, 120);
    const city = str(raw.city, 60);
    const state = str(raw.state, 60);
    const phone = normalisePhone(str(raw.phone, 20));
    const email = str(raw.email, 120);
    const gstin = str(raw.gstin, 15).toUpperCase();
    const businessType = str(raw.businessType, 40);
    const linesRaw = Array.isArray(raw.lines) ? raw.lines : typeof raw.lines === "string" ? [raw.lines] : [];
    const lines = linesRaw.filter((l): l is string => typeof l === "string" && (LINES as readonly string[]).includes(l));
    const product = str(raw.product, 40);
    const message = str(raw.message, 1000);

    need(errors, "fullName", fullName, "full name");
    need(errors, "business", business, "shop or business name");
    need(errors, "city", city, "city");
    if (!(INDIAN_STATES as readonly string[]).includes(state)) errors.state = "Choose your state.";
    if (!phone) errors.phone = "Enter a 10-digit Indian mobile number.";
    if (email && !EMAIL.test(email)) errors.email = "That email doesn't look right.";
    if (gstin && !GSTIN.test(gstin)) errors.gstin = "GSTIN is 15 characters, e.g. 09AABFY5202B1ZL.";
    if (!(BUSINESS_TYPES as readonly string[]).includes(businessType)) errors.businessType = "Choose your business type.";
    if (lines.length === 0) errors.lines = "Pick at least one product line.";

    if (Object.keys(errors).length) return { errors };
    return {
      errors,
      lead: {
        type: "dealer", fullName, business, city, state, phone: phone!, businessType, lines, consent: true,
        ...(email ? { email } : {}),
        ...(gstin ? { gstin } : {}),
        ...(PRODUCT_SLUGS.includes(product) ? { product } : {}),
        ...(message ? { message } : {}),
      },
    };
  }

  if (raw.type === "notify") {
    const contactRaw = str(raw.contact, 120);
    const product = str(raw.product, 40);
    const scent = str(raw.scent, 40).replace(/[^a-z0-9-]/g, "");
    const phone = normalisePhone(contactRaw);
    const email = EMAIL.test(contactRaw) ? contactRaw.toLowerCase() : null;
    if (!phone && !email) errors.contact = "Enter a 10-digit mobile number or an email.";
    if (!NOTIFY_TOPICS.includes(product)) errors.product = "Unknown product.";
    if (Object.keys(errors).length) return { errors };
    return { errors, lead: { type: "notify", contact: (phone ?? email)!, product, consent: true, ...(scent ? { scent } : {}) } };
  }

  if (raw.type === "find-dealer") {
    const city = str(raw.city, 60);
    const name = str(raw.name, 80);
    const phone = normalisePhone(str(raw.phone, 20));
    need(errors, "city", city, "city");
    need(errors, "name", name, "name");
    if (!phone) errors.phone = "Enter a 10-digit Indian mobile number.";
    if (Object.keys(errors).length) return { errors };
    return { errors, lead: { type: "find-dealer", tag: "customer", city, name, phone: phone!, consent: true } };
  }

  return { errors: { form: "Unknown form." } };
}
