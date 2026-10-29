"use client";

import { useEffect, useRef, useState } from "react";
import Bottle from "./Bottle";
import FlipkartButton from "./FlipkartButton";
import { AROMA_PRODUCTS, flatScents, notifyHref } from "@/data/products";
import { useReducedMotion } from "@/lib/useReducedMotion";

const pad = (n: number) => String(n).padStart(2, "0");
const LABEL: Record<string, string> = { core: "Core", air: "Air", essence: "Essence" };
const DEG_PER_PX = 0.6;

/**
 * Aroma 360 viewer (HANDOFF 7.2). Each scent with a `spin360` set plays a
 * 36-frame turntable sequence from /public/aroma/360/{product}/{scent}/NN.webp.
 * Scents without one fall back to the illustrated bottle from the design.
 */
export default function Viewer360() {
  const [prodIdx, setProdIdx] = useState(0);
  const [scentIdx, setScentIdx] = useState(0);
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [auto, setAuto] = useState(false);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const drag = useRef({ x: 0, angle: 0 });
  const reduce = useReducedMotion();

  const product = AROMA_PRODUCTS[prodIdx];
  const scents = flatScents(product);
  const cur = scents[Math.min(scentIdx, scents.length - 1)];
  const { colors } = cur;
  const spin = cur.spin360;
  const frames = spin?.frames ?? 36;
  const norm = ((angle % 360) + 360) % 360;
  const frame = Math.round(norm / (360 / frames)) % frames;
  const spinOn = auto && !reduce;

  // Auto-spin: never runs under prefers-reduced-motion.
  useEffect(() => {
    if (!spinOn || dragging) return;
    const t = setInterval(() => setAngle((a) => a + 2), 40);
    return () => clearInterval(t);
  }, [spinOn, dragging]);

  // Preload the active frame set; the first frame stands in until it is ready.
  useEffect(() => {
    if (!spin || loaded[spin.basePath]) return;
    let left = spin.frames;
    const imgs = Array.from({ length: spin.frames }, (_, i) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        left -= 1;
        if (left === 0) setLoaded((m) => ({ ...m, [spin.basePath]: true }));
      };
      img.src = `${spin.basePath}/${pad(i + 1)}.webp`;
      return img;
    });
    return () => imgs.forEach((img) => { img.onload = img.onerror = null; });
  }, [spin, loaded]);

  const ready = spin ? loaded[spin.basePath] : false;
  const shownFrame = ready ? frame : 0;

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX, angle };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    setDragging(true);
    setAuto(false);
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setAngle(drag.current.angle + (e.clientX - drag.current.x) * DEG_PER_PX);
  };
  const onUp = () => setDragging(false);

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = 360 / frames;
    if (e.key === "ArrowLeft") { e.preventDefault(); setAuto(false); setAngle((a) => a - step); }
    else if (e.key === "ArrowRight") { e.preventDefault(); setAuto(false); setAngle((a) => a + step); }
    else if (e.key === "Home") { e.preventDefault(); setAngle(0); }
  };

  const rotate = (d: number) => { setAuto(false); setAngle((a) => a + d); };

  const pickProduct = (i: number) => { setProdIdx(i); setScentIdx(0); };
  const toggleStyle = (on: boolean) =>
    on ? { background: "#020F26", color: "#F4F5F7" } : { background: "#FFFFFF", color: "#0A0A0B" };

  return (
    <div className="grid gap-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-stretch">
      <div
        role="slider"
        tabIndex={0}
        aria-label={`${product.name} ${cur.name}, 360 view. Drag, or use the left and right arrow keys, to rotate.`}
        aria-valuemin={0}
        aria-valuemax={359}
        aria-valuenow={Math.round(norm)}
        aria-valuetext={`${Math.round(norm)} degrees, frame ${frame + 1} of ${frames}`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onLostPointerCapture={onUp}
        onKeyDown={onKey}
        className="nf-tint relative flex h-[clamp(420px,110vw,600px)] min-w-0 items-center justify-center overflow-hidden rounded-[3px] border-2 border-navy select-none lg:h-[600px]"
        style={{ backgroundColor: colors.tint, cursor: dragging ? "grabbing" : "grab", touchAction: "pan-y" }}
      >
        <div className="absolute top-[18px] left-[18px] z-[1] bg-navy px-3 py-[6px] font-mono text-[11px] font-bold tracking-[0.14em] uppercase text-chalk">
          {spin ? "360 view" : `Placeholder // ${frames}-frame spin`}
        </div>
        <div
          aria-hidden="true"
          className="nf-tint absolute top-[18px] right-[18px] z-[1] text-right font-mono text-[12px] leading-[1.8] font-bold tracking-[0.12em] uppercase"
          style={{ color: colors.deep }}
        >
          <div>{Math.round(norm)}&#176;</div>
          <div>Frame {frame + 1} / {frames}</div>
        </div>
        <div aria-hidden="true" className="absolute bottom-3 left-3 h-[18px] w-[18px] border-b-2 border-l-2 border-navy" />
        <div aria-hidden="true" className="absolute top-16 right-3 h-[18px] w-[18px] border-t-2 border-r-2 border-navy" />

        {spin ? (
          // eslint-disable-next-line @next/next/no-img-element -- frame sequence swaps src every few ms; next/image adds nothing here
          <img
            src={`${spin.basePath}/${pad(shownFrame + 1)}.webp`}
            alt=""
            draggable={false}
            className="pointer-events-none relative max-h-[86%] max-w-[86%] object-contain"
          />
        ) : (
          <>
            <div aria-hidden="true" className="nf-tint absolute aspect-square w-[min(420px,80%)] rounded-full" style={{ backgroundColor: colors.halo }} />
            <div aria-hidden="true" className="absolute bottom-[70px] h-[120px] w-[min(420px,86%)] rounded-[50%] border-2 border-dashed border-[rgba(10,10,11,0.25)]" />
            <div aria-hidden="true" className="pointer-events-none relative scale-[0.85] sm:scale-110 lg:scale-125">
              <Bottle kind={product.key as "core" | "air" | "essence"} liquid={colors.liquid} organic={cur.group.organic} angle={angle} />
            </div>
          </>
        )}

        <div aria-hidden="true" className="pointer-events-none absolute right-0 bottom-5 left-0 flex items-center justify-center gap-[14px] font-mono text-[12px] font-bold tracking-[0.16em] uppercase">
          <span>&#8592;</span>Drag to rotate<span>&#8594;</span>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-[22px] rounded-[3px] border-2 border-navy bg-white p-6 md:p-7">
        <div>
          <p className="nf-label mb-[10px]">Format</p>
          <div className="grid grid-cols-3 gap-2">
            {AROMA_PRODUCTS.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                aria-pressed={i === prodIdx}
                onClick={() => pickProduct(i)}
                className="min-h-12 cursor-pointer rounded-[3px] border-2 border-navy p-2 font-display text-[19px] font-extrabold italic uppercase"
                style={toggleStyle(i === prodIdx)}
              >
                {LABEL[p.key]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="nf-label mb-[10px]">Scent</p>
          <div className="flex flex-wrap gap-2">
            {scents.map((sc, i) => {
              const on = sc.slug === cur.slug;
              return (
                <button
                  key={sc.slug}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setScentIdx(i)}
                  className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[3px] border-2 border-navy px-[14px] py-[6px] font-display text-[17px] font-bold uppercase"
                  style={toggleStyle(on)}
                >
                  <span aria-hidden="true" className="h-3 w-3 border-[1.5px]" style={{ backgroundColor: sc.colors.liquid, borderColor: on ? "#F4F5F7" : "#0A0A0B" }} />
                  {sc.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="border-t-2 border-navy pt-[18px]">
          <p className="m-0 font-mono text-[12px] font-bold tracking-[0.14em] uppercase" style={{ color: colors.deep }}>
            {product.name}{cur.group.group ? ` // ${cur.group.group}` : ""}
          </p>
          <p className="nf-display mt-[6px] text-[44px] leading-[0.95]" style={{ color: colors.deep, letterSpacing: 0 }}>{cur.name}</p>
          <p className="nf-sub mt-[6px] text-[20px]">{cur.character}</p>
        </div>
        <div className="flex gap-[10px]">
          <button type="button" onClick={() => rotate(-45)} aria-label="Rotate left 45 degrees" className="min-h-12 flex-1 cursor-pointer rounded-[3px] border-2 border-navy bg-white font-mono text-[13px] font-bold">
            &#8592; 45&#176;
          </button>
          <button
            type="button"
            onClick={() => setAuto((v) => !v)}
            disabled={reduce}
            aria-pressed={spinOn}
            title={reduce ? "Auto spin is off because your device prefers reduced motion" : undefined}
            className="min-h-12 flex-[1.4] cursor-pointer rounded-[3px] border-2 border-navy font-mono text-[12px] font-bold tracking-[0.1em] uppercase disabled:cursor-not-allowed disabled:opacity-60"
            style={toggleStyle(spinOn)}
          >
            {reduce ? "Auto spin off" : spinOn ? "Stop spin" : "Auto spin"}
          </button>
          <button type="button" onClick={() => rotate(45)} aria-label="Rotate right 45 degrees" className="min-h-12 flex-1 cursor-pointer rounded-[3px] border-2 border-navy bg-white font-mono text-[13px] font-bold">
            45&#176; &#8594;
          </button>
        </div>
        <FlipkartButton
          look="block"
          buyLabel="Buy this on Flipkart"
          url={cur.flipkartUrl}
          name={`${product.name} ${cur.name}`}
          notifyHref={notifyHref(product.slug, cur.slug)}
        />
      </div>
    </div>
  );
}
