"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";

const DEFAULT = [
  "18-month warranty on Vision",
  "IP67 water and dust rated",
  "Now live on Flipkart",
  "Dealer enquiries open across India",
  "Drive the difference",
];

// Per-page copy, straight from the design files.
const BY_PATH: Record<string, string[]> = {
  "/aroma": [
    "Aroma Core now live on Flipkart",
    "11 scents, 3 formats",
    "Up to 60 days per bottle",
    "Dealer enquiries open across India",
  ],
  "/vision": [
    "18-month warranty on every Vision unit",
    "CANBUS-ready, zero dash errors",
    "IP67 water and dust rated",
    "Dealer enquiries open across India",
  ],
  "/care": [
    "NightFury Care is coming",
    "Detailing-grade microfiber",
    "pH-balanced car wipes",
    "Get notified first",
  ],
};

export function MarqueeBar({ items }: Readonly<{ items: string[] }>) {
  const run = (hidden: boolean) =>
    items.map((t, i) => (
      <Fragment key={`${hidden}-${i}`}>
        <span aria-hidden={hidden || undefined}>{t}</span>
        <span aria-hidden="true">{"//"}</span>
      </Fragment>
    ));
  return (
    <div className="overflow-hidden border-b-2 border-fury bg-navy whitespace-nowrap text-chalk">
      <p className="sr-only">{items.join(". ")}</p>
      <div
        aria-hidden="true"
        className="nf-marquee-track inline-flex gap-12 py-[9px] font-mono text-[12px] font-bold tracking-[0.16em] uppercase"
      >
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}

export default function Marquee() {
  const pathname = usePathname();
  return <MarqueeBar items={BY_PATH[pathname] ?? DEFAULT} />;
}
