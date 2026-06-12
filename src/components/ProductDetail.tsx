"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import DistributorModal from "./DistributorModal";

/** Product copy column with selectable output options (e.g. 240W / 300W). */
export default function ProductDetail({ product: p }: { product: Product }) {
  const [watt, setWatt] = useState(p.wattOptions?.[0] ?? null);
  const [showDistributor, setShowDistributor] = useState(false);

  const specs =
    watt === null
      ? p.specs
      : p.specs.map((s) =>
          s.label === "Power" ? { ...s, value: `${watt} (pair)` } : s,
        );

  return (
    <div>
      {p.badge && (
        <span className="inline-block rounded-full bg-flame-500/15 px-3 py-1 text-xs font-semibold text-flame-400">
          {p.badge}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-bold md:text-4xl">{p.name}</h2>
      {p.variant && <p className="mt-1 text-sm text-slate-500">{p.variant}</p>}
      <p className="mt-2 text-lg font-medium text-flame-400">{p.tagline}</p>
      <p className="mt-5 leading-relaxed text-slate-300">{p.description}</p>

      {p.wattOptions && (
        <div className="mt-6">
          <span className="text-sm font-medium text-slate-300">Output</span>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {p.wattOptions.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setWatt(w)}
                className={`rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors ${
                  watt === w
                    ? "border-flame-500 bg-flame-500/10 text-flame-400"
                    : "border-white/15 text-slate-300 hover:border-flame-500/50"
                }`}
              >
                {w}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowDistributor(true)}
              className="ml-1 rounded-lg bg-flame-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-flame-600"
            >
              Get Yours Today!
            </button>
          </div>
        </div>
      )}

      {showDistributor && (
        <DistributorModal onClose={() => setShowDistributor(false)} />
      )}

      <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
            <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f28c28" strokeWidth="2">
              <path d="M5 13l4 4L19 7" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
        {specs.map((s) => (
          <div key={s.label} className="bg-night-900 px-4 py-3.5">
            <div className="text-xs text-slate-500">{s.label}</div>
            <div className="mt-0.5 text-sm font-semibold text-white">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
