"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import CategoryBand from "./CategoryBand";
import ScrollStage from "./ScrollStage";
import { HOME_STAGES, stageItems } from "@/data/products";

const NAV = 76;
const STEP = 360;
const STAGES = HOME_STAGES.map((stage) => ({ stage, items: stageItems(stage) }));

/**
 * Category bands and the six homepage scroll stages, rendered from
 * HOME_STAGES. One passive capture-phase scroll listener computes the active
 * item of every track and only sets state when an index changes.
 */
export default function HomeStages() {
  const tracks = useRef<(HTMLDivElement | null)[]>([]);
  const [idx, setIdx] = useState<number[]>(() => STAGES.map(() => 0));

  const onScroll = useCallback(() => {
    setIdx((prev) => {
      let changed = false;
      const next = prev.map((cur, s) => {
        const el = tracks.current[s];
        if (!el || el.offsetParent === null) return cur; // hidden below 900px
        const top = el.getBoundingClientRect().top;
        const i = Math.max(0, Math.min(STAGES[s].items.length - 1, Math.floor((NAV - top + STEP / 2) / STEP)));
        if (i !== cur) changed = true;
        return i;
      });
      return changed ? next : prev;
    });
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
    };
  }, [onScroll]);

  const go = (s: number, i: number) => {
    if (i < 0) return;
    setIdx((prev) => prev.map((v, k) => (k === s ? i : v)));
    const el = tracks.current[s];
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollBy({ top: el.getBoundingClientRect().top - NAV + i * STEP + 2, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      {STAGES.map(({ stage, items }, s) => (
        <Fragment key={stage.id}>
          {stage.band && <CategoryBand {...stage.band} />}
          <ScrollStage
            stage={stage}
            items={items}
            idx={idx[s]}
            trackRef={(el) => { tracks.current[s] = el; }}
            onPick={(i) => go(s, i)}
          />
        </Fragment>
      ))}
    </>
  );
}
