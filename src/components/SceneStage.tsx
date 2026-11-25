"use client";

import { useRef, useState } from "react";
import { SkewButton } from "./ui";
import type { HomeStage, StageItem } from "@/data/products";
import { SHOW_TODOS, Todo, ready } from "@/lib/todo";
import { FlipkartLabel } from "./FlipkartMark";

/* Scenes ship at 1890px plus a sharpened 3200px copy for big and high-density
   screens (scripts/air-scenes.py); the browser picks by rendered width. */
const sceneSrcSet = (src?: string) => (src ? `${src} 1890w, ${src.replace(/\.webp$/, "@2x.webp")} 3200w` : undefined);

/* Until a scent's Flipkart URL is filled in, the button opens a Flipkart
   search for that scent so it never leads nowhere. */
const flipkartHref = (it: StageItem) =>
  it.flipkartUrl || `https://www.flipkart.com/search?q=${encodeURIComponent(`Nightfury ${it.productName} ${it.name}`)}`;

export function Cta({ item }: Readonly<{ item: StageItem }>) {
  return (
    <SkewButton
      href={flipkartHref(item)}
      external
      variant="light"
      ariaLabel={`Buy ${item.productName} ${item.name} on Flipkart (opens in a new tab)`}
    >
      <FlipkartLabel>Buy on Flipkart &#8594;</FlipkartLabel>
    </SkewButton>
  );
}

/** Top, heart and base notes as a quiet list with hairline dividers. */
function Notes({ item }: Readonly<{ item: StageItem }>) {
  const tiles = SHOW_TODOS ? item.tiles : item.tiles.filter((t) => ready(t.value));
  if (!tiles.length) return <p className="nf-body mt-6 text-[#C9D0DC]">{item.summary}</p>;
  return (
    <dl className="m-0 mt-7 max-w-[460px] border-t border-white/15">
      {tiles.map((t) => (
        <div key={t.label} className="grid grid-cols-[72px_minmax(0,1fr)] items-baseline gap-4 border-b border-white/15 py-3">
          <dt className="font-mono text-[11px] font-bold tracking-[0.16em] text-fury uppercase">{t.label}</dt>
          <dd className="m-0 font-sans text-[15px] leading-[1.5] text-chalk"><Todo value={t.value} /></dd>
        </div>
      ))}
    </dl>
  );
}

export function Eyebrow({ stage }: Readonly<{ stage: HomeStage }>) {
  return (
    <p className="nf-eyebrow text-fury">
      {stage.title}
      {stage.sub && <span className="text-navy-soft">{stage.sub}</span>}
    </p>
  );
}

/** Tracks which card of a horizontal snap carousel is closest to the start. */
export function useCarousel() {
  const carousel = useRef<HTMLDivElement>(null);
  const [mIdx, setMIdx] = useState(0);
  const onCarouselScroll = () => {
    const el = carousel.current;
    if (!el) return;
    const cards = [...el.children] as HTMLElement[];
    const dist = (c: HTMLElement) => Math.abs(c.offsetLeft - el.offsetLeft - el.scrollLeft);
    let best = 0;
    cards.forEach((c, i) => { if (dist(c) < dist(cards[best])) best = i; });
    if (best !== mIdx) setMIdx(best);
  };
  return { carousel, mIdx, onCarouselScroll };
}

/**
 * Homepage stage built on full-bleed scene photos (Aroma Air). Desktop keeps
 * the pinned scroll: each 360px of scroll crossfades to the next scene, and
 * the scent details sit in the dark space on the left of each photo. Below
 * 900px it becomes a swipeable carousel of photo cards.
 */
export default function SceneStage({
  stage,
  items,
  idx,
  trackRef,
  onPick,
}: Readonly<{
  stage: HomeStage;
  items: StageItem[];
  idx: number;
  trackRef: (el: HTMLDivElement | null) => void;
  onPick: (i: number) => void;
}>) {
  const n = items.length;
  const cur = items[idx];

  const { carousel, mIdx, onCarouselScroll } = useCarousel();

  return (
    <section id={stage.id} aria-label={stage.title} className="nf-anchor on-navy border-t-2 border-navy bg-[#05070B] text-chalk">
      {/* Desktop: pinned stage, scenes stacked and crossfaded by scroll position. */}
      <div ref={trackRef} className="relative hidden stage:block" style={{ height: `calc(var(--stage-h) + ${(n - 1) * 360}px)` }}>
        <div className="sticky top-[76px] overflow-hidden" style={{ height: "var(--stage-h)" }}>
          {items.map((it, i) => (
            // eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP scenes crossfaded with opacity
            <img
              key={it.slug}
              src={it.scene}
              srcSet={sceneSrcSet(it.scene)}
              sizes="100vw"
              alt={i === idx ? `Nightfury ${it.productName} ${it.name} spray bottle` : ""}
              aria-hidden={i !== idx}
              loading="lazy"
              decoding="async"
              className="nf-scene-img absolute inset-0 h-full w-full object-cover object-[78%_50%]"
              style={{ opacity: i === idx ? 1 : 0 }}
            />
          ))}
          <div aria-hidden="true" className="nf-scene-shade absolute inset-0" />

          <div className="nf-container relative flex h-full items-center py-12">
            <div className="w-[min(500px,40vw)]">
              <Eyebrow stage={stage} />
              {/* Keyed by scent so the copy fades in with each new scene. */}
              <div key={cur.slug} className="nf-photo-in">
                <h3 className="nf-display mt-4 text-chalk" style={{ fontSize: "clamp(44px, 4.6vw, 68px)", lineHeight: 1 }}>
                  {cur.name}
                </h3>
                <p className="nf-sub mt-3 text-[clamp(18px,1.6vw,22px)] text-[#C9D0DC]">
                  <Todo value={cur.line} fallback={cur.fallbackLine} />
                </p>
                <Notes item={cur} />
                <div className="mt-8">
                  <Cta item={cur} />
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                {items.map((it, i) => {
                  const on = i === idx;
                  return (
                    <button
                      key={it.slug}
                      type="button"
                      aria-pressed={on}
                      onClick={() => onPick(i)}
                      className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[2px] border py-2 pr-4 pl-[14px] font-mono text-[12px] font-bold tracking-[0.12em] uppercase transition-colors ${on ? "border-chalk bg-chalk text-navy" : "border-white/35 bg-transparent text-chalk hover:border-chalk"}`}
                    >
                      <span aria-hidden="true" className="h-[9px] w-[9px]" style={{ backgroundColor: it.colors.liquid }} />
                      {it.name}
                    </button>
                  );
                })}
              </div>
              <div aria-hidden="true" className="mt-[14px] h-[2px] max-w-[340px] bg-white/15">
                <div className="h-[2px] bg-chalk transition-[width] duration-400" style={{ width: `${Math.round(((idx + 1) / n) * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: swipeable photo cards. */}
      <div className="py-10 stage:hidden">
        <div className="nf-container">
          <Eyebrow stage={stage} />
        </div>
        <div
          ref={carousel}
          onScroll={onCarouselScroll}
          className="nf-carousel mt-5 scroll-px-5 px-5 md:scroll-px-10 md:px-10"
          role="region"
          aria-label={`${stage.title}: ${n} items`}
          tabIndex={0}
        >
          {items.map((it) => (
            <article key={it.slug} className="flex min-w-0 flex-col overflow-hidden rounded-[3px] border border-white/10 bg-[#0B0E14]">
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP scene */}
              <img
                src={it.scene}
                srcSet={sceneSrcSet(it.scene)}
                sizes="(min-width: 768px) 60vw, 90vw"
                alt={`Nightfury ${it.productName} ${it.name} spray bottle`}
                loading="lazy"
                decoding="async"
                className="block aspect-[4/3] w-full object-cover object-[74%_50%]"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="nf-display text-[32px] text-chalk" style={{ lineHeight: 1 }}>{it.name}</h3>
                <p className="nf-sub mt-2 text-[17px] text-[#C9D0DC]"><Todo value={it.line} fallback={it.fallbackLine} /></p>
                <Notes item={it} />
                <div className="mt-auto pt-6">
                  <Cta item={it} />
                </div>
              </div>
            </article>
          ))}
        </div>
        {n > 1 && (
          <div aria-hidden="true" className="nf-container mt-4 flex items-center gap-[6px]">
            {items.map((it, i) => (
              <span key={it.slug} className="h-[3px] transition-all duration-300" style={{ width: i === mIdx ? 28 : 10, background: i === mIdx ? "#F4F5F7" : "rgba(244,245,247,0.25)" }} />
            ))}
            <span className="ml-3 font-mono text-[11px] font-bold tracking-[0.14em] text-navy-soft uppercase">{mIdx + 1} / {n} &middot; Swipe</span>
          </div>
        )}
      </div>
    </section>
  );
}
