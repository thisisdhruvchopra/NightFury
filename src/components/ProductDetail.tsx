"use client";

import { useState } from "react";
import type { Fragrance, Product } from "@/lib/products";
import { getProductPrice, formatPrice } from "@/lib/pricing";
import { useCart } from "@/lib/cart";
import DistributorModal from "./DistributorModal";
import ProductRating from "./ProductRating";
import PriceDisplay from "./PriceDisplay";

import { body, display, mono } from "@/lib/fonts";

function OptionButton({
  label,
  suffix,
  selected,
  onClick,
}: Readonly<{ label: string; suffix?: string; selected: boolean; onClick: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className="group relative border px-4 py-3 text-[14px] font-semibold tracking-[.02em] transition-all"
      style={{
        ...body,
        borderRadius: "3px",
        borderColor: selected ? "var(--color-accent)" : "var(--color-border-strong)",
        background: selected ? "rgba(255,85,0,.12)" : "var(--color-raised)",
        color: selected ? "var(--color-accent)" : "var(--color-chalk)",
        boxShadow: selected ? "0 0 12px rgba(255,85,0,.15)" : "none",
      }}
    >
      {selected && (
        <span
          className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-accent text-[8px] text-carbon"
          style={{ borderRadius: "2px" }}
        >
          &#10003;
        </span>
      )}
      {label}
      {suffix && (
        <span className="ml-2 text-[13px] text-muted" style={{ fontWeight: 500 }}>
          {suffix}
        </span>
      )}
    </button>
  );
}

export default function ProductDetail({
  product: p,
  onFragranceChange,
}: Readonly<{
  product: Product;
  /** Notified when the shopper picks a scent, so the page can swap the hero photo. */
  onFragranceChange?: (fragrance: Fragrance | null) => void;
}>) {
  const [watt, setWatt] = useState(p.wattOptions?.[0] ?? null);
  const [fragType, setFragType] = useState(p.fragranceTypes?.[0]?.name ?? null);
  const [fragrance, setFragrance] = useState<string | null>(
    p.fragranceTypes?.[0]?.fragrances[0]?.name ?? p.fragranceOptions?.[0] ?? null,
  );
  const [pack, setPack] = useState(p.packOptions?.[0] ?? null);
  const [showDistributor, setShowDistributor] = useState(false);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const cart = useCart();

  // Fragrance type is price-bearing on Aroma Core (Gel vs Organic).
  const priceVariant = watt ?? pack ?? fragType ?? undefined;
  const { mrp, price } = getProductPrice(p.slug, priceVariant);

  const specs =
    watt === null
      ? p.specs
      : p.specs.map((s) =>
          s.label === "Power" ? { ...s, value: `${watt} (pair)` } : s,
        );

  // When fragrances are grouped by type, only the active type's list is selectable.
  const activeType = p.fragranceTypes?.find((t) => t.name === fragType);
  const fragranceChoices: string[] = p.fragranceTypes
    ? (activeType?.fragrances.map((f) => f.name) ?? [])
    : (p.fragranceOptions ?? []);

  /** The rich record for the current pick, when this product has grouped fragrances. */
  const activeFragrance = activeType?.fragrances.find((f) => f.name === fragrance) ?? null;

  // The type rides in `variant` so it drives pricing; the scent name stays in `fragrance`.
  const cartVariant = watt ?? fragType ?? undefined;
  let cartVariantLabel: string | undefined;
  if (watt) cartVariantLabel = "Output";
  else if (fragType) cartVariantLabel = "Type";

  function selectType(name: string) {
    setFragType(name);
    // Reset to the first fragrance of the newly picked type.
    const first = p.fragranceTypes?.find((t) => t.name === name)?.fragrances[0] ?? null;
    setFragrance(first?.name ?? null);
    onFragranceChange?.(first);
  }

  function selectFragrance(name: string) {
    setFragrance(name);
    onFragranceChange?.(activeType?.fragrances.find((f) => f.name === name) ?? null);
  }

  function handleAddToCart() {
    cart.addItem({
      productSlug: p.slug,
      productName: p.name,
      variant: cartVariant,
      variantLabel: cartVariantLabel,
      fragrance: fragrance ?? undefined,
      pack: pack ?? undefined,
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-3">
        <div
          className="text-[11px] tracking-[.2em] text-accent uppercase"
          style={mono}
        >
          {p.badge ?? "NIGHTFURY"}
        </div>
        {p.outOfStock && (
          <span
            className="border border-redline bg-redline/10 px-2.5 py-1 text-[10px] font-bold tracking-[.12em] text-redline uppercase"
            style={{ ...mono, borderRadius: "2px" }}
          >
            Out of Stock
          </span>
        )}
      </div>

      <h2
        className="mt-3 text-[40px] font-extrabold italic uppercase leading-[.92] tracking-tight md:text-[46px]"
        style={{ transform: "skewX(-4deg)" }}
      >
        {p.name}
      </h2>

      {p.variant && (
        <div className="mt-2.5 text-[15px] font-medium text-muted" style={body}>
          {p.variant}
        </div>
      )}

      <div className="mt-1.5 text-[15px] font-medium text-muted" style={body}>
        {p.tagline}
      </div>

      <ProductRating slug={p.slug} />

      {/* Price */}
      <div className="mt-4">
        <PriceDisplay mrp={mrp} price={price} size="md" />
      </div>

      <p
        className="mt-4 max-w-[440px] text-[15px] font-medium leading-[1.7] text-muted"
        style={body}
      >
        {p.description}
      </p>

      {/* Type of Fragrance selector (Gel / Organic) */}
      {p.fragranceTypes && (
        <div className="mt-6">
          <div className="mb-3 text-[13px] font-bold tracking-[.12em] text-chalk uppercase" style={mono}>
            Type of Fragrance
          </div>
          <div className="flex flex-wrap gap-2">
            {p.fragranceTypes.map((t) => {
              const tPrice = getProductPrice(p.slug, t.name);
              return (
                <OptionButton
                  key={t.name}
                  label={t.name}
                  suffix={tPrice.price > 0 ? formatPrice(tPrice.price) : undefined}
                  selected={fragType === t.name}
                  onClick={() => selectType(t.name)}
                />
              );
            })}
          </div>
          {activeType && (
            <p className="mt-3 max-w-[440px] text-[14px] font-medium leading-[1.65] text-dim" style={body}>
              {activeType.description}
            </p>
          )}
        </div>
      )}

      {/* Fragrance selector */}
      {fragranceChoices.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 text-[13px] font-bold tracking-[.12em] text-chalk uppercase" style={mono}>
            Select Fragrance
          </div>
          <div className="flex flex-wrap gap-2">
            {fragranceChoices.map((f) => (
              <OptionButton
                key={f}
                label={f}
                selected={fragrance === f}
                onClick={() => selectFragrance(f)}
              />
            ))}
          </div>

          {/* Selected scent: its own copy and note pyramid */}
          {activeFragrance && (
            <div
              className="mt-4 max-w-[400px] border p-4"
              style={{ borderRadius: "3px", borderColor: "var(--color-border-strong)", background: "var(--color-raised)" }}
            >
              <div
                className="text-[22px] font-extrabold italic uppercase leading-[1.1] tracking-tight text-chalk"
                style={{ ...display, transform: "skewX(-4deg)" }}
              >
                {activeFragrance.tagline}
              </div>
              <p className="mt-2.5 text-[15px] font-medium leading-[1.65] text-muted" style={body}>
                {activeFragrance.description}
              </p>

              <div className="mt-5 space-y-3 border-t border-border pt-4">
                {([
                  ["Top Note", activeFragrance.notes.top],
                  ["Mid Note", activeFragrance.notes.middle],
                  ["Base Note", activeFragrance.notes.base],
                ] as const).map(([label, value]) => (
                  <div key={label} className="flex gap-3.5">
                    <span
                      className="shrink-0 text-[11px] font-bold tracking-[.1em] text-accent uppercase"
                      style={{ ...mono, width: "82px", paddingTop: "3px" }}
                    >
                      {label}
                    </span>
                    <span className="text-[15px] font-semibold leading-[1.5] text-chalk" style={body}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pack size selector */}
      {p.packOptions && (
        <div className="mt-6">
          <div className="mb-3 text-[13px] font-bold tracking-[.12em] text-chalk uppercase" style={mono}>
            Select Pack Size
          </div>
          <div className="flex flex-wrap gap-2">
            {p.packOptions.map((pk) => {
              const pkPrice = getProductPrice(p.slug, pk);
              return (
                <button
                  key={pk}
                  type="button"
                  onClick={() => setPack(pk)}
                  className="group relative border px-4 py-2.5 text-xs font-bold tracking-[.08em] uppercase transition-all"
                  style={{
                    ...mono,
                    borderRadius: "3px",
                    borderColor: pack === pk ? "var(--color-accent)" : "var(--color-border-strong)",
                    background: pack === pk ? "rgba(255,85,0,.12)" : "var(--color-raised)",
                    color: pack === pk ? "var(--color-accent)" : "var(--color-chalk)",
                    boxShadow: pack === pk ? "0 0 12px rgba(255,85,0,.15)" : "none",
                  }}
                >
                  {pack === pk && (
                    <span
                      className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-accent text-[8px] text-carbon"
                      style={{ borderRadius: "2px" }}
                    >
                      &#10003;
                    </span>
                  )}
                  <span>{pk}</span>
                  <span className="ml-2 text-[10px] text-muted" style={{ fontWeight: 500 }}>
                    {pkPrice.price > 0 ? `₹${pkPrice.price}` : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Features */}
      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {p.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-[14px] font-medium leading-[1.5] text-[#D6D6DE]"
            style={body}
          >
            <span className="mt-[5px] text-[9px] text-accent">&#9670;</span> {f}
          </li>
        ))}
      </ul>

      {/* Specs grid */}
      <div className="spec-grid mt-5">
        {specs.map((s) => (
          <div
            key={s.label}
            className="flex items-start gap-2.5 text-[14px] font-medium leading-[1.5] text-[#D6D6DE]"
            style={body}
          >
            <span className="mt-[5px] text-[9px] text-accent">&#9670;</span> {s.label}: {s.value}
          </div>
        ))}
      </div>

      {/* Watt options */}
      {p.wattOptions && (
        <div className="mt-6">
          <div className="mb-3 text-[13px] font-bold tracking-[.12em] text-chalk uppercase" style={mono}>
            Select Output
          </div>
          <div className="flex flex-wrap gap-2">
            {p.wattOptions.map((w) => {
              const wPrice = getProductPrice(p.slug, w);
              return (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWatt(w)}
                  className="border px-4 py-2.5 text-xs font-bold tracking-[.1em] uppercase transition-colors"
                  style={{
                    ...mono,
                    borderRadius: "3px",
                    borderColor: watt === w ? "var(--color-accent)" : "var(--color-border-strong)",
                    background: watt === w ? "rgba(255,85,0,.1)" : "var(--color-raised)",
                    color: watt === w ? "var(--color-accent)" : "var(--color-chalk)",
                  }}
                >
                  {w} <span className="ml-1 text-[10px] text-muted">₹{wPrice.price}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {p.outOfStock ? (
          <span
            className="border border-border-strong px-5 py-3 text-xs font-bold tracking-[.1em] text-dim uppercase"
            style={{ ...mono, borderRadius: "2px", opacity: 0.6 }}
          >
            Out of Stock
          </span>
        ) : (
          <>
            {/* Quantity counter */}
            <div className="flex items-center border border-border-strong" style={{ borderRadius: "3px" }}>
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3.5 py-2.5 text-sm font-bold text-chalk transition-colors hover:bg-accent hover:text-carbon"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span
                className="min-w-[36px] text-center text-sm font-bold text-chalk"
                style={mono}
              >
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                className="px-3.5 py-2.5 text-sm font-bold text-chalk transition-colors hover:bg-accent hover:text-carbon"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="nf-btn nf-btn-primary"
              style={{ padding: "12px 22px", fontSize: "14px" }}
            >
              <span>{added ? "Added to Cart ✓" : "Add to Cart →"}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowDistributor(true)}
              className="nf-btn nf-btn-outline"
              style={{ padding: "12px 22px", fontSize: "13px" }}
            >
              <span>Find Dealer</span>
            </button>
          </>
        )}
      </div>

      {showDistributor && (
        <DistributorModal onClose={() => setShowDistributor(false)} />
      )}
    </div>
  );
}
