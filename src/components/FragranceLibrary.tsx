"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

function ScentCard({ fragrance, type }: Readonly<{ fragrance: Fragrance; type: string }>) {
  return (
    <div
      className="nf-card flex h-full flex-col overflow-hidden"
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
        {/* Type badge, since the panel no longer groups by heading */}
        <span
          className="absolute left-3 top-3 border border-accent/40 bg-carbon/80 px-2.5 py-1 text-[10px] font-bold tracking-[.14em] text-accent uppercase"
          style={{ ...mono, borderRadius: "2px" }}
        >
          {type}
        </span>
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
        {/* Notes live in the buy panel above, not on these cards. */}
        <p className="mt-3.5 flex-1 text-[15px] font-medium leading-[1.65] text-muted" style={body}>
          {fragrance.description}
        </p>
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

const AUTO_ADVANCE_MS = 4500;

export default function FragranceLibrary({ types }: Readonly<{ types: FragranceType[] }>) {
  const ordered = orderForDisplay(types);
  // One flat track: every scent, Organic first, each tagged with its type.
  const cards = ordered.flatMap((t) => t.fragrances.map((f) => ({ fragrance: f, type: t.name })));

  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = cards.length;

  const goTo = useCallback((i: number) => {
    const el = trackRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    setIndex(i);
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => goTo((index + dir + count) % count),
    [goTo, index, count],
  );

  // Keep the interval calling the latest step without resetting on every index change.
  const stepRef = useRef(step);
  useEffect(() => { stepRef.current = step; }, [step]);

  useEffect(() => {
    if (paused || count <= 1) return;
    if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => stepRef.current(1), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  /** Keep the dots in sync when the panel is scrolled or swiped by hand. */
  function handleScroll() {
    const el = trackRef.current;
    if (!el) return;
    let nearest = 0;
    let best = Infinity;
    for (let i = 0; i < el.children.length; i++) {
      const c = el.children[i] as HTMLElement;
      const d = Math.abs(c.offsetLeft - el.offsetLeft - el.scrollLeft);
      if (d < best) { best = d; nearest = i; }
    }
    setIndex(nearest);
  }

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        {/* Heading + arrows */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            className="text-[26px] font-extrabold italic uppercase leading-none tracking-tight md:text-[36px]"
            style={{ ...display, transform: "skewX(-4deg)" }}
          >
            The fragrance range
          </h2>

          <div className="flex items-center gap-2">
            <span className="mr-2 text-[12px] font-medium tracking-[.1em] text-dim uppercase" style={mono}>
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            {([["Previous", -1], ["Next", 1]] as const).map(([label, dir]) => (
              <button
                key={label}
                type="button"
                onClick={() => step(dir)}
                aria-label={`${label} fragrance`}
                className="flex h-10 w-10 items-center justify-center border border-border-strong text-chalk transition-colors hover:border-accent hover:bg-accent hover:text-carbon"
                style={{ borderRadius: "2px" }}
              >
                {dir === -1 ? "‹" : "›"}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable panel */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          className="frag-track mt-8 flex gap-4 overflow-x-auto pb-2"
          tabIndex={0}
          aria-label="Fragrance range, scroll sideways"
        >
          {cards.map(({ fragrance, type }) => (
            <div key={fragrance.name} className="frag-slide">
              <ScentCard fragrance={fragrance} type={type} />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-5 flex justify-center gap-2">
          {cards.map((c, i) => (
            <button
              key={c.fragrance.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to ${c.fragrance.name}`}
              aria-current={i === index}
              className="h-1.5 transition-all"
              style={{
                width: i === index ? "26px" : "10px",
                borderRadius: "2px",
                background: i === index ? "var(--color-accent)" : "var(--color-border-strong)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
