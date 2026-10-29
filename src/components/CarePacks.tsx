"use client";

import { useState } from "react";
import { SpecTable } from "./ui";
import type { Product } from "@/data/products";

/** Pack-size selector for the microfiber cloth; updates "In the pack" (HANDOFF 7.4). */
export default function CarePacks({ product }: Readonly<{ product: Product }>) {
  const packs = product.packs ?? [1];
  const [pack, setPack] = useState(packs[0]);
  const [first, ...rest] = product.specs;
  const specs = [
    first,
    rest[0],
    { label: "In the pack", value: `${pack} ${pack === 1 ? "cloth" : "cloths"}` },
    ...rest.slice(1),
  ].filter(Boolean);

  return (
    <>
      <p className="nf-label mt-[22px] mb-[10px]" id="pack-label">Pack size</p>
      <div className="grid grid-cols-3 gap-[10px]" role="group" aria-labelledby="pack-label">
        {packs.map((n) => {
          const on = n === pack;
          return (
            <button
              key={n}
              type="button"
              aria-pressed={on}
              onClick={() => setPack(n)}
              className="min-h-[52px] cursor-pointer rounded-[3px] border-2 border-navy font-display text-[clamp(17px,1.8vw,20px)] font-extrabold italic uppercase"
              style={on ? { background: "#020F26", color: "#F4F5F7" } : { background: "#FFFFFF", color: "#0A0A0B" }}
            >
              Pack of {n}
            </button>
          );
        })}
      </div>
      <p className="mt-2 font-mono text-[11px] text-muted">[Pack sizes to be confirmed]</p>
      <SpecTable specs={specs} className="mt-[18px]" />
    </>
  );
}
