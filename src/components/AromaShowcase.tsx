"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";

import { body, display, mono } from "@/lib/fonts";

const EXTENSIONS = ["png", "jpg", "jpeg", "webp"];
const MAX_PROBE = 3;

/** Probes /media/products/<dir>/1.png, 1.jpg, ... and returns the first that loads. */
function useFirstPhoto(mediaDir: string | undefined) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!mediaDir) return;
    let cancelled = false;
    const candidates: string[] = [];
    for (let i = 1; i <= MAX_PROBE; i++) {
      for (const ext of EXTENSIONS) candidates.push(`/media/products/${mediaDir}/${i}.${ext}`);
    }

    // Probe in order, stop at the first hit so the lowest-numbered file wins.
    (function probe(idx: number) {
      if (cancelled || idx >= candidates.length) return;
      const img = new Image();
      img.onload = () => { if (!cancelled) setSrc(candidates[idx]); };
      img.onerror = () => probe(idx + 1);
      img.src = candidates[idx];
    })(0);

    return () => { cancelled = true; };
  }, [mediaDir]);

  return src;
}

function ShowcasePanel({
  product,
  index,
  total,
}: Readonly<{ product: Product; index: number; total: number }>) {
  const photo = useFirstPhoto(product.mediaDir);
  const reverse = index % 2 === 1;
  const fragranceCount =
    product.fragranceTypes?.reduce((n, t) => n + t.fragrances.length, 0) ??
    product.fragranceOptions?.length ??
    0;

  return (
    <section
      className="aroma-panel relative flex items-center overflow-hidden border-b border-border"
      style={{ scrollSnapAlign: "start" }}
      aria-label={product.name}
    >
      {/* Ambient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: reverse
            ? "radial-gradient(70% 70% at 78% 50%, rgba(255,85,0,.16), transparent 68%)"
            : "radial-gradient(70% 70% at 22% 50%, rgba(255,85,0,.16), transparent 68%)",
        }}
      />
      {/* Oversized index numeral */}
      <div
        className="pointer-events-none absolute select-none leading-none"
        style={{
          ...display,
          top: "8%",
          [reverse ? "left" : "right"]: "4%",
          fontSize: "clamp(140px, 26vw, 380px)",
          fontWeight: 800,
          fontStyle: "italic",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,85,0,.10)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div
        className={`relative mx-auto grid w-full max-w-[1280px] items-center gap-8 px-5 py-16 md:gap-14 md:px-10 md:py-20 ${
          reverse ? "aroma-panel-reverse" : ""
        }`}
        style={{ gridTemplateColumns: "1fr" }}
      >
        {/* Photo */}
        <div className="aroma-panel-photo relative flex items-center justify-center">
          <div
            className="relative flex w-full items-center justify-center overflow-hidden"
            style={{
              borderRadius: "4px",
              border: "1px solid var(--color-border-strong)",
              background: "linear-gradient(150deg, #15100c, #0A0A0B 62%)",
              aspectRatio: "4 / 5",
              maxHeight: "62vh",
            }}
          >
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt={product.name}
                className="h-full w-full object-contain p-6 md:p-10"
              />
            ) : (
              <div className="ph flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="text-[12px] font-bold tracking-[.16em] text-accent uppercase" style={mono}>
                    &#9679; COMING SOON
                  </div>
                  <div className="mt-1.5 text-[12px] tracking-[.1em] text-dim uppercase" style={mono}>
                    PRODUCT IMAGERY ON ITS WAY
                  </div>
                </div>
              </div>
            )}
            <span
              className="absolute bottom-3 left-3 bg-carbon/70 px-2 py-1 text-[9px] tracking-[.14em] text-muted uppercase"
              style={{ ...mono, borderRadius: "2px" }}
            >
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Copy */}
        <div className="aroma-panel-copy relative z-10">
          <div className="text-[12px] font-bold tracking-[.18em] text-accent uppercase" style={mono}>
            {product.badge ?? "NIGHTFURY AROMA"}
          </div>

          <h2
            className="mt-4 text-[38px] font-extrabold italic uppercase leading-[.9] tracking-tight md:text-[56px] lg:text-[64px]"
            style={{ ...display, transform: "skewX(-4deg)" }}
          >
            {product.name}
          </h2>

          <div className="mt-3 text-[16px] font-semibold tracking-[.12em] text-accent uppercase" style={display}>
            {product.tagline}
          </div>

          <div className="mt-2.5 text-[13px] font-medium tracking-[.1em] text-dim uppercase" style={mono}>
            {product.variant}
          </div>

          <p className="mt-6 max-w-xl text-[16px] font-medium leading-[1.75] text-muted" style={body}>
            {product.description}
          </p>

          {/* Spec strip */}
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
            {product.specs.slice(0, 3).map((s) => (
              <div key={s.label}>
                <div className="text-[11px] font-medium tracking-[.14em] text-dim uppercase" style={mono}>
                  {s.label}
                </div>
                <div className="mt-1.5 text-[19px] font-bold tracking-[.01em] text-chalk" style={display}>
                  {s.value}
                </div>
              </div>
            ))}
            {fragranceCount > 0 && (
              <div>
                <div className="text-[11px] font-medium tracking-[.14em] text-dim uppercase" style={mono}>
                  Fragrances
                </div>
                <div className="mt-1.5 text-[19px] font-bold tracking-[.01em] text-chalk" style={display}>
                  {fragranceCount} options
                </div>
              </div>
            )}
          </div>

          {/* Shop Now */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={`/aroma/${product.pageSlug}`}
              className="nf-btn nf-btn-primary"
              style={{ padding: "13px 30px", fontSize: "14px" }}
            >
              <span>Shop Now</span>
            </Link>
            {product.outOfStock && (
              <span
                className="border border-redline bg-redline/10 px-2.5 py-1 text-[10px] font-bold tracking-[.12em] text-redline uppercase"
                style={{ ...mono, borderRadius: "2px" }}
              >
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AromaShowcase({ products }: Readonly<{ products: Product[] }>) {
  return (
    <div className="aroma-showcase">
      {products.map((p, i) => (
        <ShowcasePanel key={p.slug} product={p} index={i} total={products.length} />
      ))}
    </div>
  );
}
