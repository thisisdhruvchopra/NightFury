"use client";

import { useState } from "react";
import type { Fragrance, FragranceType } from "@/lib/products";

import { body, display, mono } from "@/lib/fonts";


function ScentPhoto({ fragrance }: Readonly<{ fragrance: Fragrance }>) {
  const [failed, setFailed] = useState(false);

  if (!fragrance.image || failed) {
    return (
      <div className="ph flex h-full w-full items-center justify-center" style={{ borderRadius: "3px" }}>
        <div className="text-[11px] tracking-[.12em] text-dim uppercase" style={mono}>
          Photo on its way
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={fragrance.image}
      alt={fragrance.name}
      onError={() => setFailed(true)}
      className="h-full w-full object-contain p-4"
    />
  );
}

function ScentCard({ fragrance }: Readonly<{ fragrance: Fragrance }>) {
  return (
    <div
      className="nf-card flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(150deg, #15100c, #0A0A0B 60%)" }}
    >
      {/* Photo */}
      <div className="relative" style={{ aspectRatio: "4 / 3" }}>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(56% 56% at 50% 50%, rgba(255,85,0,.16), transparent 70%)" }}
        />
        <div className="absolute inset-4">
          <ScentPhoto fragrance={fragrance} />
        </div>
      </div>

      {/* Copy */}
      <div className="flex flex-1 flex-col border-t border-border px-5 py-5">
        <div className="text-[24px] font-bold tracking-[.01em] text-chalk" style={display}>
          {fragrance.name}
        </div>
        <div
          className="mt-2 text-[20px] font-extrabold italic uppercase leading-[1.1] tracking-tight text-chalk"
          style={{ ...display, transform: "skewX(-4deg)" }}
        >
          {fragrance.tagline}
        </div>
        <p className="mt-3.5 flex-1 text-[15px] font-medium leading-[1.65] text-muted" style={body}>
          {fragrance.description}
        </p>

        {/* Note pyramid */}
        <div className="mt-5 space-y-3 border-t border-border pt-4">
          {([
            ["Top Note", fragrance.notes.top],
            ["Mid Note", fragrance.notes.middle],
            ["Base Note", fragrance.notes.base],
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
    </div>
  );
}

/**
 * Display order for this section only. The buy-panel selector keeps the data
 * order (Gel first, which is also the default selection).
 */
const LIBRARY_ORDER = ["Organic", "Gel"];

function orderForDisplay(types: FragranceType[]) {
  const rank = (name: string) => {
    const i = LIBRARY_ORDER.indexOf(name);
    return i === -1 ? LIBRARY_ORDER.length : i;
  };
  // Stable sort, so any type not listed above keeps its data order at the end.
  return [...types].sort((a, b) => rank(a.name) - rank(b.name));
}

export default function FragranceLibrary({ types }: Readonly<{ types: FragranceType[] }>) {
  const ordered = orderForDisplay(types);

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <h2
          className="text-[26px] font-extrabold italic uppercase leading-none tracking-tight md:text-[36px]"
          style={{ ...display, transform: "skewX(-4deg)" }}
        >
          The fragrance range
        </h2>

        {ordered.map((t) => (
          <div key={t.name} className="mt-10">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-border pt-5">
              <span className="text-[13px] font-bold tracking-[.18em] text-accent uppercase" style={mono}>
                {t.name}
              </span>
              <span className="text-[12px] font-medium tracking-[.1em] text-dim uppercase" style={mono}>
                {t.fragrances.length} {t.fragrances.length === 1 ? "scent" : "scents"}
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-[15px] font-medium leading-[1.7] text-muted" style={body}>
              {t.description}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.fragrances.map((f) => (
                <ScentCard key={f.name} fragrance={f} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
