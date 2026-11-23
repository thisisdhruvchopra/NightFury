"use client";

import { Cta, Eyebrow, useCarousel } from "./SceneStage";
import type { HomeStage, Spec, StageItem } from "@/data/products";
import { SHOW_TODOS, Todo, ready } from "@/lib/todo";

/* Product facts first, then the scent's notes once they are filled in. */
function details(it: StageItem): Spec[] {
  const specs = (it.specs ?? []).filter((s) => s.label !== "Scents");
  const notes = SHOW_TODOS ? it.tiles : it.tiles.filter((t) => ready(t.value));
  return [...specs, ...notes];
}

function Details({ item }: Readonly<{ item: StageItem }>) {
  return (
    <dl className="m-0 border-t border-white/15">
      {details(item).map((d) => (
        <div key={d.label} className="grid grid-cols-[80px_minmax(0,1fr)] items-baseline gap-4 border-b border-white/15 py-3">
          <dt className="font-mono text-[11px] font-bold tracking-[0.16em] text-fury uppercase">{d.label}</dt>
          <dd className="m-0 font-sans text-[15px] leading-[1.5] text-chalk"><Todo value={d.value} /></dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Homepage stage built on retail box photos (Aroma Essence). Desktop keeps the
 * pinned scroll: the box sits in the centre over a soft glow in the scent's colour, the
 * scent name and tagline fill the space on the left, and the details and buy
 * button fill the space on the right. Below 900px it becomes a carousel.
 */
export default function BoxStage({
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
      {/* Desktop: pinned stage, boxes and backdrops crossfaded by scroll position. */}
      <div ref={trackRef} className="relative hidden stage:block" style={{ height: `calc(var(--stage-h) + ${(n - 1) * 360}px)` }}>
        <div className="sticky top-[76px] overflow-hidden" style={{ height: "var(--stage-h)" }}>
          {/* CSS-only backdrop: its colours animate to the active scent, so nothing crossfades or dims. */}
          <div className="nf-essence-bg" data-scent={cur.slug} aria-hidden="true" />
          <div aria-hidden="true" className="nf-box-shade absolute inset-0" />

          <div className="nf-container relative grid h-full grid-cols-[minmax(0,1fr)_minmax(0,min(44vw,600px))_minmax(0,1fr)] items-center gap-[clamp(28px,3.4vw,56px)] py-12">
            {/* Left: who the scent is. */}
            <div>
              <Eyebrow stage={stage} />
              <div key={cur.slug} className="nf-photo-in">
                <h3 className="nf-display mt-4 text-chalk" style={{ fontSize: "clamp(40px, 4vw, 60px)", lineHeight: 1 }}>
                  {cur.name}
                </h3>
                <p className="nf-sub mt-3 text-[clamp(18px,1.5vw,22px)] text-chalk">
                  <Todo value={cur.line} fallback={cur.fallbackLine} />
                </p>
                <p className="nf-body mt-5 max-w-[340px] text-[#C9D0DC]">{cur.summary}</p>
              </div>
            </div>

            {/* Centre: the box. */}
            <div className="relative" style={{ aspectRatio: "1100 / 840" }}>
              {items.map((it, i) => (
                // eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP boxes crossfaded with opacity
                <img
                  key={it.slug}
                  src={it.box?.src}
                  alt={i === idx ? `NightFury ${it.productName} ${it.name} in its retail box` : ""}
                  aria-hidden={i !== idx}
                  decoding="async"
                  className="nf-scene-img absolute inset-0 h-full w-full rounded-[4px] object-contain shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                  style={{ opacity: i === idx ? 1 : 0 }}
                />
              ))}
            </div>

            {/* Right: what you get, and where to buy it. */}
            <div>
              <div key={cur.slug} className="nf-photo-in">
                <Details item={cur} />
                <div className="mt-7">
                  <Cta item={cur} />
                </div>
              </div>

              <div className="mt-9 flex flex-wrap gap-2">
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
              <div aria-hidden="true" className="mt-[14px] h-[2px] bg-white/15">
                <div className="h-[2px] bg-chalk transition-[width] duration-400" style={{ width: `${Math.round(((idx + 1) / n) * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: swipeable cards, each box over its own backdrop. */}
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
              <div className="relative overflow-hidden p-6" style={{ backgroundImage: `url(${it.box?.bg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP box */}
                <img
                  src={it.box?.src}
                  alt={`NightFury ${it.productName} ${it.name} in its retail box`}
                  loading="lazy"
                  decoding="async"
                  className="relative block w-full rounded-[3px] shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="nf-display text-[32px] text-chalk" style={{ lineHeight: 1 }}>{it.name}</h3>
                <p className="nf-sub mt-2 text-[17px] text-chalk"><Todo value={it.line} fallback={it.fallbackLine} /></p>
                <p className="nf-body mt-3 text-[15px] text-[#C9D0DC]">{it.summary}</p>
                <div className="mt-5"><Details item={it} /></div>
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
