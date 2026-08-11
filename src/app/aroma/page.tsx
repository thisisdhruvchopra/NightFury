import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSubBrand } from "@/lib/products";
import AromaShowcase from "@/components/AromaShowcase";

import { body, display, mono } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "NightFury Aroma, Premium Car Perfumes | Smell the Difference",
  description:
    "Premium hanging-bottle and spray car perfumes. Long-lasting fragrance engineered for every drive.",
};

export default function AromaPage() {
  const brand = getSubBrand("aroma");
  if (!brand) notFound();

  return (
    <>
      {/* ============ BRAND HERO ============ */}
      <section className="relative flex min-h-[72svh] items-center overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(60% 60% at 50% 42%, rgba(255,85,0,.14), transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute"
          style={{ top: "-6%", right: "-10%", width: "60%", height: "24px", background: "var(--color-accent)", opacity: 0.08, transform: "rotate(-18deg)" }}
        />

        <div className="relative mx-auto w-full max-w-[1280px] px-5 py-20 text-center md:px-10 md:py-28">
          <div className="text-[12px] font-bold tracking-[.22em] text-accent uppercase" style={mono}>
            NightFury Product Line
          </div>

          <h1
            className="mx-auto mt-6 text-[52px] font-extrabold italic uppercase leading-[.85] tracking-tight md:text-[92px] lg:text-[112px]"
            style={{ ...display, transform: "skewX(-4deg)" }}
          >
            Aroma
          </h1>

          <div
            className="mt-5 text-[16px] font-semibold tracking-[.2em] text-accent uppercase md:text-[19px]"
            style={display}
          >
            Smell the Difference
          </div>

          <p
            className="mx-auto mt-8 max-w-2xl text-[16px] font-medium leading-[1.75] text-muted md:text-[17px]"
            style={body}
          >
            {brand.intro}
          </p>

          {/* Scroll cue */}
          <div
            className="mt-14 flex flex-col items-center gap-2 text-[11px] font-medium tracking-[.18em] text-dim uppercase"
            style={mono}
          >
            <span>Scroll to explore</span>
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
              <path d="M7 3v12M3 11l4 4 4-4" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

      <div className="carbon-trim" />

      {/* ============ ONE PANEL PER FRAGRANCE ============ */}
      <AromaShowcase products={brand.products} />
    </>
  );
}
