"use client";

import { useState } from "react";
import BeamPreview, { type Temp } from "./BeamPreview";
import FlipkartButton from "./FlipkartButton";
import { PhotoSlot, SkewButton, SpecTable, Eyebrow } from "./ui";
import { dealerHref, notifyHref, visionLed4w as p } from "@/data/products";

const TEMPS: { k: Temp; label: string; swatch: string }[] = [
  { k: 6000, label: "6000K White", swatch: "#EAF2FF" },
  { k: 4300, label: "4300K Warm", swatch: "#FFD98A" },
];

const pick = (on: boolean) =>
  on ? { background: "#020F26", color: "#F4F5F7" } : { background: "#FFFFFF", color: "#0A0A0B" };

/** 4W LED flagship block: output selector updates Power, colour mode recolours the beam. */
export default function VisionConfigurator() {
  const models = p.models ?? [];
  const [modelIdx, setModelIdx] = useState(0);
  const [temp, setTemp] = useState<Temp>(6000);
  const model = models[modelIdx];
  const specs = p.specs.map((s) => (s.label === "Power" ? { ...s, value: `${model.watts}W (pair)` } : s));

  return (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
      <div className="flex min-w-0 flex-col gap-[18px]">
        <PhotoSlot white label={p.photoLabel ?? ""} flag={`N° ${p.num} Flagship`} className="h-[clamp(300px,40vw,420px)]" />
        <BeamPreview temp={temp} strong={model.watts === 300} />
      </div>

      <div className="min-w-0">
        <Eyebrow>Pair pack {"//"} Live</Eyebrow>
        <h2 className="nf-display mt-[14px]" style={{ fontSize: "clamp(44px, 5.4vw, 76px)" }}>{p.name}</h2>
        <p className="nf-sub mt-[10px] text-fury-lg">{p.tagline}</p>
        <p className="nf-body mt-4">{p.description}</p>

        <p className="nf-label mt-[26px] mb-[10px]" id="output-label">Output</p>
        <div className="grid grid-cols-2 gap-[10px]" role="group" aria-labelledby="output-label">
          {models.map((m, i) => (
            <button
              key={m.slug}
              type="button"
              aria-pressed={i === modelIdx}
              onClick={() => setModelIdx(i)}
              className="min-h-14 cursor-pointer rounded-[3px] border-2 border-navy font-display text-[28px] font-extrabold italic"
              style={pick(i === modelIdx)}
            >
              {m.label}
            </button>
          ))}
        </div>

        <p className="nf-label mt-[18px] mb-[10px]" id="temp-label">Colour mode (preview on the left)</p>
        <div className="grid grid-cols-2 gap-[10px]" role="group" aria-labelledby="temp-label">
          {TEMPS.map((t) => {
            const on = t.k === temp;
            return (
              <button
                key={t.k}
                type="button"
                aria-pressed={on}
                onClick={() => setTemp(t.k)}
                className="flex min-h-[52px] cursor-pointer items-center justify-center gap-[10px] rounded-[3px] border-2 border-navy px-2 font-display text-[clamp(18px,2vw,22px)] font-extrabold italic uppercase"
                style={pick(on)}
              >
                <span aria-hidden="true" className="h-[14px] w-[14px] rounded-full border-[1.5px]" style={{ background: t.swatch, borderColor: on ? "#F4F5F7" : "#0A0A0B" }} />
                {t.label}
              </button>
            );
          })}
        </div>

        <SpecTable specs={specs} className="mt-[26px]" />

        <div className="mt-7 flex flex-wrap gap-5">
          <FlipkartButton
            url={model.flipkartUrl}
            name={`${p.name} ${model.label}`}
            notifyHref={notifyHref(p.slug, model.slug)}
          />
          <SkewButton href={dealerHref("vision", p.slug)} variant="outline">Bulk enquiry</SkewButton>
        </div>
        <p className="mt-[18px] font-mono text-[12px] text-muted">
          Fitments: [Confirm bulb types, e.g. H4 / H7 / H11]. Brightness claims to be added with test basis.
        </p>
      </div>
    </div>
  );
}
