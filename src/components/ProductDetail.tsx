"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { getProductPrice } from "@/lib/pricing";
import { useCart } from "@/lib/cart";
import DistributorModal from "./DistributorModal";
import ProductRating from "./ProductRating";
import PriceDisplay from "./PriceDisplay";

const mono = { fontFamily: "var(--font-spline), monospace" } as const;

export default function ProductDetail({ product: p }: Readonly<{ product: Product }>) {
  const [watt, setWatt] = useState(p.wattOptions?.[0] ?? null);
  const [fragrance, setFragrance] = useState(p.fragranceOptions?.[0] ?? null);
  const [pack, setPack] = useState(p.packOptions?.[0] ?? null);
  const [showDistributor, setShowDistributor] = useState(false);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const cart = useCart();

  const priceVariant = watt ?? pack ?? undefined;
  const { mrp, price } = getProductPrice(p.slug, priceVariant);

  const specs =
    watt === null
      ? p.specs
      : p.specs.map((s) =>
          s.label === "Power" ? { ...s, value: `${watt} (pair)` } : s,
        );

  function handleAddToCart() {
    cart.addItem({
      productSlug: p.slug,
      productName: p.name,
      variant: watt ?? undefined,
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
        <div className="mt-2 text-[13px] text-muted" style={mono}>
          {p.variant}
        </div>
      )}

      <div className="mt-2 text-[13px] text-muted" style={mono}>
        {p.tagline}
      </div>

      <ProductRating slug={p.slug} />

      {/* Price */}
      <div className="mt-4">
        <PriceDisplay mrp={mrp} price={price} size="md" />
      </div>

      <p
        className="mt-4 max-w-[400px] text-[12.5px] leading-[1.65] text-muted"
        style={mono}
      >
        {p.description}
      </p>

      {/* Fragrance selector */}
      {p.fragranceOptions && (
        <div className="mt-6">
          <div className="mb-3 text-[11px] font-bold tracking-[.14em] text-chalk uppercase" style={mono}>
            Select Fragrance
          </div>
          <div className="flex flex-wrap gap-2">
            {p.fragranceOptions.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFragrance(f)}
                className="group relative border px-4 py-2.5 text-xs font-bold tracking-[.08em] uppercase transition-all"
                style={{
                  ...mono,
                  borderRadius: "3px",
                  borderColor: fragrance === f ? "var(--color-accent)" : "var(--color-border-strong)",
                  background: fragrance === f ? "rgba(255,85,0,.12)" : "var(--color-raised)",
                  color: fragrance === f ? "var(--color-accent)" : "var(--color-chalk)",
                  boxShadow: fragrance === f ? "0 0 12px rgba(255,85,0,.15)" : "none",
                }}
              >
                {fragrance === f && (
                  <span
                    className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-accent text-[8px] text-carbon"
                    style={{ borderRadius: "2px" }}
                  >
                    &#10003;
                  </span>
                )}
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pack size selector */}
      {p.packOptions && (
        <div className="mt-6">
          <div className="mb-3 text-[11px] font-bold tracking-[.14em] text-chalk uppercase" style={mono}>
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
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {p.features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-2 text-xs tracking-wide text-[#C8C8CE]"
            style={mono}
          >
            <span className="text-accent">&#9670;</span> {f}
          </li>
        ))}
      </ul>

      {/* Specs grid */}
      <div
        className="mt-5"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 26px", maxWidth: "380px" }}
      >
        {specs.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-2 text-xs tracking-wide text-[#C8C8CE]"
            style={mono}
          >
            <span className="text-accent">&#9670;</span> {s.label}: {s.value}
          </div>
        ))}
      </div>

      {/* Watt options */}
      {p.wattOptions && (
        <div className="mt-6">
          <div className="mb-3 text-[11px] font-bold tracking-[.14em] text-chalk uppercase" style={mono}>
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
