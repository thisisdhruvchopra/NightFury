import { SHIPPING } from "./legal";

export type ProductPricing = {
  mrp: number;
  price: number;
  variantPricing?: Record<string, { mrp: number; price: number }>;
};

export const PRICING: Record<string, ProductPricing> = {
  "led-4w": {
    mrp: 4999,
    price: 3499,
    variantPricing: {
      "240W": { mrp: 4999, price: 3499 },
      "300W": { mrp: 5999, price: 4299 },
    },
  },
  "led-2w": {
    mrp: 1999,
    price: 1499,
  },
  "aroma-hanging": {
    mrp: 499,
    price: 349,
  },
  "aroma-air": {
    mrp: 599,
    price: 449,
  },
  "aroma-core": {
    // Fallback mirrors Gel, the default selection. Keep in sync with variantPricing.Gel.
    mrp: 690,
    price: 499,
    variantPricing: {
      Gel: { mrp: 690, price: 499 },
      Organic: { mrp: 790, price: 599 },
    },
  },
  "care-microfiber": {
    mrp: 399,
    price: 299,
    variantPricing: {
      "Pack of 1": { mrp: 249, price: 199 },
      "Pack of 2": { mrp: 399, price: 299 },
      "Pack of 3": { mrp: 549, price: 399 },
    },
  },
  "care-wipes": {
    mrp: 299,
    price: 199,
  },
};

export function getProductPrice(slug: string, variant?: string | null): { mrp: number; price: number } {
  const p = PRICING[slug];
  if (!p) return { mrp: 0, price: 0 };
  if (variant && p.variantPricing?.[variant]) {
    return p.variantPricing[variant];
  }
  return { mrp: p.mrp, price: p.price };
}

export function getDiscount(mrp: number, price: number): number {
  if (mrp <= 0) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateShipping(subtotal: number): number {
  if (subtotal >= 999) return 0;
  if (subtotal >= 499) return 49;
  return 79;
}

export function getShippingLabel(subtotal: number): string {
  if (subtotal >= 999) return "Free Shipping";
  if (subtotal >= 499) return `${formatPrice(49)} Shipping`;
  return `${formatPrice(79)} Shipping`;
}

export const FREE_SHIPPING_THRESHOLD = 999;

export { SHIPPING };
