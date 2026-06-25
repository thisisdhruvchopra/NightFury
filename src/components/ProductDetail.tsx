"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import DistributorModal from "./DistributorModal";

export default function ProductDetail({ product: p }: Readonly<{ product: Product }>) {
  const [watt, setWatt] = useState(p.wattOptions?.[0] ?? null);
  const [showDistributor, setShowDistributor] = useState(false);

  const specs =
    watt === null
      ? p.specs
      : p.specs.map((s) =>
          s.label === "Power" ? { ...s, value: `${watt} (pair)` } : s,
        );

  return (
    <div className="flex flex-col justify-center">
      <div
        className="text-[11px] tracking-[.2em] text-accent uppercase"
        style={{ fontFamily: "var(--font-spline), monospace" }}
      >
        {p.badge ?? "NIGHTFURY"}
      </div>

      <h2
        className="mt-3 text-[40px] font-extrabold italic uppercase leading-[.92] tracking-tight md:text-[46px]"
        style={{ transform: "skewX(-4deg)" }}
      >
        {p.name}
      </h2>

      {p.variant && (
        <div
          className="mt-2 text-[13px] text-muted"
          style={{ fontFamily: "var(--font-spline), monospace" }}
        >
          {p.variant}
        </div>
      )}

      <div
        className="mt-2 text-[13px] text-muted"
        style={{ fontFamily: "var(--font-spline), monospace" }}
      >
        {p.tagline}
      </div>

      <p
        className="mt-4 max-w-[400px] text-[12.5px] leading-[1.65] text-muted"
        style={{ fontFamily: "var(--font-spline), monospace" }}
      >
        {p.description}
      </p>

      {/* Features */}
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {p.features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-2 text-xs tracking-wide text-[#C8C8CE]"
            style={{ fontFamily: "var(--font-spline), monospace" }}
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
            style={{ fontFamily: "var(--font-spline), monospace" }}
          >
            <span className="text-accent">&#9670;</span> {s.label}: {s.value}
          </div>
        ))}
      </div>

      {/* Watt options + CTA */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {p.wattOptions?.map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => setWatt(w)}
            className="border px-4 py-2 text-xs font-bold tracking-[.1em] uppercase transition-colors"
            style={{
              fontFamily: "var(--font-spline), monospace",
              borderRadius: "2px",
              borderColor: watt === w ? "var(--color-accent)" : "var(--color-border-strong)",
              background: watt === w ? "rgba(255,85,0,.1)" : "transparent",
              color: watt === w ? "var(--color-accent)" : "var(--color-chalk)",
            }}
          >
            {w}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setShowDistributor(true)}
          className="nf-btn nf-btn-primary"
          style={{ padding: "12px 22px", fontSize: "14px" }}
        >
          <span>Get Yours Today! &rarr;</span>
        </button>
      </div>

      {showDistributor && (
        <DistributorModal onClose={() => setShowDistributor(false)} />
      )}
    </div>
  );
}
