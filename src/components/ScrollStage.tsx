"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Bottle from "./Bottle";
import FlipkartButton from "./FlipkartButton";
import ScentCard from "./ScentCard";
import { RacePlate, SkewButton } from "./ui";
import { dealerHref, flatScents, notifyHref, type Product } from "@/data/products";

const NAV = 76;
const STEP = 360;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Homepage Aroma stage (HANDOFF 7.1). A tall track holds a sticky stage; each
 * 360px of scroll advances one scent. Below 900px it becomes a swipeable
 * carousel instead. No ancestor may have overflow hidden/auto, or the sticky
 * stage scrolls away.
 */
export default function ScrollStage({ product }: Readonly<{ product: Product }>) {
  const scents = flatScents(product);
  const n = scents.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.offsetParent === null) return; // hidden on mobile
    const top = el.getBoundingClientRect().top;
    const i = Math.max(0, Math.min(n - 1, Math.floor((NAV - top + STEP / 2) / STEP)));
    setIdx((prev) => (prev === i ? prev : i));
  }, [n]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
    };
  }, [onScroll]);

  const go = (i: number) => {
    setIdx(i);
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delta = el.getBoundingClientRect().top - NAV + i * STEP + 2;
    window.scrollBy({ top: delta, behavior: reduce ? "auto" : "smooth" });
  };

  const cur = scents[idx];
  const { colors } = cur;

  return (
    <div id={`aroma-${product.key}`} className="nf-anchor border-t-2 border-navy bg-white">
      {/* Product header */}
      <div className="nf-container grid gap-8 pt-14 pb-10 md:grid-cols-2 md:gap-12">
        <div className="flex min-w-0 flex-col justify-end">
          <div><RacePlate num={product.num} /></div>
          <h3 className="nf-display nf-h3 mt-[22px]" style={{ fontSize: "clamp(48px, 6vw, 84px)" }}>{product.name}</h3>
          <p className="nf-sub mt-[10px] text-fury-lg">{product.tagline}</p>
        </div>
        <div className="flex min-w-0 flex-col justify-between gap-5 md:border-l-2 md:border-navy md:pl-10">
          <p className="nf-body">{product.summary}</p>
          <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0">
            {product.chips?.map((c) => (
              <li
                key={c}
                className="truncate rounded-[3px] border-2 border-navy px-[14px] py-[10px] font-mono text-[12px] font-bold tracking-[0.12em] uppercase"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop: pinned stage */}
      <div
        ref={trackRef}
        className="relative hidden stage:block"
        style={{ height: `calc(var(--stage-h) + ${(n - 1) * STEP}px)` }}
      >
        <div
          className="nf-tint sticky top-[76px] overflow-hidden border-t border-[rgba(10,10,11,0.12)]"
          style={{ height: "var(--stage-h)", backgroundColor: colors.tint }}
        >
          <div className="h-[5px] bg-[rgba(10,10,11,0.1)]">
            <div
              className="h-[5px] bg-navy transition-[width] duration-400"
              style={{ width: `${Math.round(((idx + 1) / n) * 100)}%` }}
            />
          </div>
          <div className="nf-container grid h-[calc(100%-5px)] grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_200px] items-center gap-8 py-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_230px]">
            <div className="min-w-0">
              <p className="nf-tint m-0 font-mono text-[13px] font-bold tracking-[0.16em] uppercase" style={{ color: colors.deep }}>
                {cur.group.label} {"//"} {pad(idx + 1)} / {pad(n)}
              </p>
              <h4
                className="nf-display nf-tint mt-[10px]"
                style={{ fontSize: "clamp(52px, 5.4vw, 76px)", lineHeight: 0.9, letterSpacing: "-0.01em", color: colors.deep }}
              >
                {cur.name}
              </h4>
              <p className="nf-sub mt-[14px] text-[26px] tracking-[0.02em]">{cur.character}</p>
              <p className="mt-2 max-w-[480px] font-mono text-[13px] leading-[1.65] text-[#262932]">{cur.description}</p>
              <div className="mt-[18px] grid max-w-[520px] grid-cols-3 gap-[10px]">
                {(["top", "heart", "base"] as const).map((k) => (
                  <div key={k} className="min-w-0 rounded-[3px] border-[1.5px] border-navy bg-[rgba(255,255,255,0.8)] px-3 py-[10px]">
                    <div className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: colors.deep }}>{k}</div>
                    <div className="mt-[5px] text-[16px] leading-[1.15] font-bold">{cur.notes[k]}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-5">
                <FlipkartButton
                  url={cur.flipkartUrl}
                  name={`${product.name} ${cur.name}`}
                  notifyHref={notifyHref(product.slug, cur.slug)}
                />
                <SkewButton href={dealerHref("aroma", product.slug)} variant="outline">Bulk enquiry</SkewButton>
              </div>
            </div>

            <div aria-hidden="true" className="relative flex h-[440px] min-w-0 items-center justify-center overflow-hidden">
              <div className="nf-tint absolute h-[340px] w-[340px] max-w-full rounded-full" style={{ backgroundColor: colors.halo }} />
              <div className="absolute top-[6px] left-[6px] h-[18px] w-[18px] border-t-2 border-l-2 border-navy" />
              <div className="absolute right-[6px] bottom-[6px] h-[18px] w-[18px] border-r-2 border-b-2 border-navy" />
              <div className="relative origin-center scale-[0.8] xl:scale-100">
                <Bottle kind={product.key as "core" | "air" | "essence"} liquid={colors.liquid} organic={cur.group.organic} />
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <p className="m-0 mb-1 font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[#262932]">{"// Scroll or pick"}</p>
              {scents.map((sc, i) => {
                const on = i === idx;
                return (
                  <button
                    key={sc.slug}
                    type="button"
                    onClick={() => go(i)}
                    aria-current={on ? "true" : undefined}
                    className="flex min-h-[46px] w-full cursor-pointer items-center gap-[10px] overflow-hidden rounded-[3px] border-2 border-navy px-3 py-2 text-left font-display text-[18px] font-extrabold italic tracking-[0.02em] whitespace-nowrap uppercase"
                    style={{ background: on ? "#020F26" : "rgba(255,255,255,0.85)", color: on ? "#F4F5F7" : "#0A0A0B" }}
                  >
                    <span className="flex-none font-mono text-[11px] font-bold not-italic" style={{ color: on ? "#FF8A4C" : "#3A3D46" }}>{pad(i + 1)}</span>
                    <span aria-hidden="true" className="h-3 w-3 flex-none border-[1.5px]" style={{ backgroundColor: sc.colors.liquid, borderColor: on ? "#F4F5F7" : "#0A0A0B" }} />
                    <span className="truncate">{sc.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: swipeable carousel */}
      <div className="nf-container pb-12 stage:hidden">
        <p className="nf-label mb-3">{`// Swipe for all ${n} scents`}</p>
        <div className="nf-carousel" role="region" aria-label={`${product.name} scents`} tabIndex={0}>
          {scents.map((sc, i) => (
            <ScentCard
              key={sc.slug}
              scent={sc}
              num={`${sc.group.label} // ${pad(i + 1)}`}
              productSlug={product.slug}
              productName={product.name}
              showDescription
            />
          ))}
        </div>
        <div className="mt-6">
          <SkewButton href={dealerHref("aroma", product.slug)} variant="outline">Bulk enquiry</SkewButton>
        </div>
      </div>
    </div>
  );
}
