"use client";

import { useRef, useState } from "react";
import StageVisual from "./StageVisual";
import TypeToggle from "./TypeToggle";
import { SkewButton } from "./ui";
import type { CoreType, HomeStage, StageItem } from "@/data/products";

/** CTA rule: coming-soon notifies, live with a URL buys on Flipkart, live without waits. */
function StageCta({ item }: Readonly<{ item: StageItem }>) {
  const name = `${item.productName} ${item.name}`;
  if (item.status === "coming-soon") {
    return (
      <SkewButton href={item.notifyHref} className="nf-btn--cta" ariaLabel={`Get notified when ${name} launches`}>
        Get notified &#8594;
      </SkewButton>
    );
  }
  if (item.flipkartUrl) {
    return (
      <SkewButton href={item.flipkartUrl} external className="nf-btn--cta" ariaLabel={`Buy ${name} on Flipkart (opens in a new tab)`}>
        Buy on Flipkart &#8594;
      </SkewButton>
    );
  }
  return (
    <SkewButton href={item.notifyHref} className="nf-btn--cta" ariaLabel={`${name} is coming to Flipkart soon. Get notified`}>
      Coming to Flipkart soon
    </SkewButton>
  );
}

function Tiles({ item, compact }: Readonly<{ item: StageItem; compact?: boolean }>) {
  return (
    <dl className={`m-0 mt-[22px] grid max-w-[520px] gap-[10px] ${compact ? "grid-cols-1" : "grid-cols-3"}`}>
      {item.tiles.map((t) => (
        <div key={t.label} className="min-w-0 border-2 border-navy bg-[rgba(255,255,255,0.75)] px-3 py-[10px]">
          <dt className="nf-tint font-mono text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: item.colors.deep }}>
            {t.label}
          </dt>
          <dd className="m-0 mt-1 font-mono text-[13px] leading-[1.4] break-words">{t.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Eyebrow({ stage }: Readonly<{ stage: HomeStage }>) {
  return (
    <p className="nf-eyebrow">
      {stage.title}
      {stage.sub && <span className="text-muted">{stage.sub}</span>}
    </p>
  );
}

const firstOfType = (items: StageItem[], t: CoreType) => items.findIndex((it) => it.type === t);

/**
 * One homepage stage (HANDOFF_HOME 3.5 and 4). Desktop: a tall tinted track
 * with a sticky stage; each 360px of scroll is one item. The parent owns the
 * index so a single scroll listener serves every track. Below 900px: a
 * horizontal snap carousel of cards instead.
 */
export default function ScrollStage({
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

  // Mobile carousel: the toggle follows the card in view and scrolls to a group.
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
  const jumpCarousel = (t: CoreType) => {
    const el = carousel.current;
    const i = firstOfType(items, t);
    if (!el || i < 0) return;
    const card = el.children[i] as HTMLElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id={stage.id} aria-label={stage.title} className="nf-anchor border-t-2 border-navy">
      {/* Desktop: pinned stage. The whole track carries the tint so no white gap shows. */}
      <div
        ref={trackRef}
        className="nf-tint relative hidden stage:block"
        style={{ height: `calc(var(--stage-h) + ${(n - 1) * 360}px)`, backgroundColor: cur.colors.tint }}
      >
        <div className="sticky top-[76px] overflow-hidden" style={{ height: "var(--stage-h)" }}>
          <div className="nf-container grid h-full grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center gap-x-16 py-12">
            <div className="min-w-0">
              <Eyebrow stage={stage} />
              {stage.toggle && <TypeToggle active={cur.type} onPick={(t) => onPick(firstOfType(items, t))} />}
              <h3
                className="nf-display nf-tint mt-4"
                style={{ fontSize: "clamp(56px, 6.6vw, 96px)", lineHeight: 0.86, color: cur.colors.deep, transitionDuration: "0.5s" }}
              >
                {cur.name}
              </h3>
              <p className="nf-sub mt-3 text-[24px]">{cur.line}</p>
              <Tiles item={cur} />
              <div className="mt-7">
                <StageCta item={cur} />
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                {items.map((it, i) => {
                  const on = i === idx;
                  const dot = it.visual === "led4" || it.visual === "led2" ? "#FFFFFF" : it.colors.liquid;
                  return (
                    <button
                      key={it.slug}
                      type="button"
                      aria-pressed={on}
                      onClick={() => onPick(i)}
                      className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[2px] border-2 border-navy py-2 pr-4 pl-[14px] font-display text-[17px] font-extrabold italic uppercase"
                      style={{ background: on ? "#020F26" : "#FFFFFF", color: on ? "#F4F5F7" : "#0A0A0B" }}
                    >
                      <span aria-hidden="true" className="h-[10px] w-[10px] border-[1.5px]" style={{ backgroundColor: dot, borderColor: on ? "#F4F5F7" : "#0A0A0B" }} />
                      {it.name}
                    </button>
                  );
                })}
              </div>
              <div aria-hidden="true" className="mt-[14px] h-[3px] max-w-[360px] bg-[rgba(2,15,38,0.14)]">
                <div className="h-[3px] bg-navy transition-[width] duration-400" style={{ width: `${Math.round(((idx + 1) / n) * 100)}%` }} />
              </div>
            </div>

            <StageVisual item={cur} />
          </div>
        </div>
      </div>

      {/* Mobile: title, then a swipeable carousel of item cards. */}
      <div className="bg-white py-10 stage:hidden">
        <div className="nf-container">
          <Eyebrow stage={stage} />
          {stage.toggle && <TypeToggle active={items[mIdx]?.type} onPick={jumpCarousel} />}
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
            <article key={it.slug} className="flex min-w-0 flex-col rounded-[3px] border-2 border-navy p-5" style={{ backgroundColor: it.colors.tint }}>
              <StageVisual item={it} compact />
              <h3 className="nf-display mt-2 text-[44px]" style={{ color: it.colors.deep, lineHeight: 0.9 }}>{it.name}</h3>
              <p className="nf-sub mt-2 text-[18px]">{it.line}</p>
              <Tiles item={it} compact />
              <div className="mt-auto pt-6">
                <StageCta item={it} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
