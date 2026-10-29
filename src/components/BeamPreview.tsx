export type Temp = 6000 | 4300;

const BEAM: Record<Temp, { label: string; beam: string; fade: string }> = {
  6000: { label: "6000K white", beam: "rgba(234,242,255,0.95)", fade: "rgba(234,242,255,0.25)" },
  4300: { label: "4300K warm", beam: "rgba(255,217,138,0.95)", fade: "rgba(255,217,138,0.25)" },
};

/** Navy beam preview that recolours with the selected colour mode (HANDOFF 7.3). */
export default function BeamPreview({ temp, strong }: Readonly<{ temp: Temp; strong?: boolean }>) {
  const b = BEAM[temp];
  return (
    <div role="img" aria-label={`Beam colour preview at ${b.label}`} className="relative h-[230px] overflow-hidden rounded-[3px] bg-navy">
      <div className="absolute top-4 left-[18px] font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-navy-soft">
        Beam preview {"//"} {b.label}
      </div>
      <div
        className="nf-tint absolute top-[70px] left-0 h-[160px] w-full"
        style={{
          clipPath: "polygon(0 34%, 100% 0, 100% 100%, 0 66%)",
          background: `linear-gradient(90deg, ${b.beam} 0%, ${b.fade} 70%, rgba(2,15,38,0) 100%)`,
          opacity: strong ? 1 : 0.78,
          transition: "background 0.4s ease, opacity 0.4s ease",
        }}
      />
      <div className="absolute top-[128px] left-[18px] h-11 w-9 rounded-md border-2 border-muted bg-[#1C1E23]" />
      <div className="absolute top-[136px] left-[22px] h-7 w-7 rounded-full" style={{ background: b.beam, transition: "background 0.4s ease" }} />
      <div
        className="absolute right-0 bottom-6 left-0 h-1"
        style={{ background: "repeating-linear-gradient(90deg, rgba(244,245,247,0.5) 0 40px, transparent 40px 80px)" }}
      />
    </div>
  );
}
