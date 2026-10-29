import Link from "next/link";
import { StatusTag } from "./ui";

type Sense = "see" | "smell" | "feel";

const CONF: Record<Sense, {
  href: string; num: string; verb: string; tagline: string; title: string; sub: string;
  panel: string; hover: string; numColor: string; textColor: string; tileBg: string; chevronBg: string; soon?: boolean;
}> = {
  see: {
    href: "/vision", num: "01", verb: "See", tagline: "See the difference", title: "Lighting", sub: "LED headlights for cars and bikes",
    panel: "bg-navy text-chalk", hover: "nf-panel-o", numColor: "#FF5500", textColor: "#AEB6C6", tileBg: "#FF5500", chevronBg: "#020F26",
  },
  smell: {
    href: "/aroma", num: "02", verb: "Smell", tagline: "Smell the difference", title: "Car Perfumes", sub: "3 formats, 11 scents",
    panel: "bg-fury text-navy", hover: "nf-panel-n", numColor: "#020F26", textColor: "#020F26", tileBg: "#020F26", chevronBg: "#FF5500",
  },
  feel: {
    href: "/care", num: "03", verb: "Feel", tagline: "Feel the difference", title: "Car Care", sub: "Microfiber and wipes",
    panel: "bg-chalk text-navy border-2 border-navy", hover: "nf-panel-o", numColor: "#E04A00", textColor: "#3A3D46", tileBg: "#020F26", chevronBg: "#FF5500", soon: true,
  },
};

function Art({ sense }: Readonly<{ sense: Sense }>) {
  if (sense === "see") {
    return (
      <div aria-hidden="true" className="absolute top-24 right-0 h-[140px] w-[62%]">
        <div className="absolute top-[15px] left-0 flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#1C2B47]">
          <div className="h-[66px] w-[66px] rounded-full bg-chalk shadow-[0_0_0_8px_rgba(244,245,247,0.18)]" />
        </div>
        <div
          className="nf-pulse-slow absolute top-0 right-0 left-[70px] h-[140px]"
          style={{ clipPath: "polygon(0 38%, 100% 0, 100% 100%, 0 62%)", background: "linear-gradient(90deg, rgba(234,242,255,0.85), rgba(234,242,255,0.05))" }}
        />
      </div>
    );
  }
  if (sense === "smell") {
    return (
      <div aria-hidden="true" className="absolute top-[92px] right-7 flex origin-top-right scale-[0.72] items-end gap-[22px]">
        <div className="flex flex-col items-center">
          <div className="h-[54px] w-[3px] bg-navy" />
          <div className="h-[34px] w-11 rounded-t-lg rounded-b border-b-4 border-[#8C6436] bg-[#B07A45]" />
          <div
            className="-mt-[2px] flex h-[110px] w-[104px] items-end bg-white"
            style={{ clipPath: "polygon(22% 0, 78% 0, 100% 28%, 100% 76%, 80% 100%, 20% 100%, 0 76%, 0 28%)" }}
          >
            <div className="h-[70%] w-full bg-[#C93F86]" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-[34px] w-[132px] items-center justify-evenly rounded-[9px] bg-navy px-[14px]">
            <span className="h-5 w-[5px] rounded-[3px] bg-[#5A6782]" />
            <span className="h-3 w-3 rounded-full bg-fury" />
            <span className="h-5 w-[5px] rounded-[3px] bg-[#5A6782]" />
          </div>
          <div className="-mt-[5px] flex h-[110px] w-[120px] items-end overflow-hidden rounded-b-[26px] bg-[rgba(255,255,255,0.85)]">
            <div className="h-[60%] w-full bg-[#F5C518]" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div aria-hidden="true" className="absolute top-[100px] right-[30px] h-[140px] w-[170px]">
      <div className="absolute bottom-0 left-0 h-10 w-[150px] rounded-md bg-[#8FA8CF]" />
      <div className="absolute bottom-[34px] left-[10px] h-10 w-[150px] rounded-md bg-[#3B5B8C]" />
      <div className="absolute bottom-[68px] left-5 h-10 w-[150px] rounded-md bg-navy" />
      <div className="absolute bottom-[102px] left-[34px] h-4 w-24 rounded-[3px] bg-fury" />
    </div>
  );
}

/** Homepage "Pick your sense" tile linking to a product line. */
export default function SensePanel({ sense }: Readonly<{ sense: Sense }>) {
  const c = CONF[sense];
  return (
    <Link
      href={c.href}
      className={`nf-panel ${c.hover} relative flex h-[clamp(320px,34vw,400px)] flex-col justify-between overflow-hidden rounded-[3px] p-7 no-underline ${c.panel}`}
      style={{ color: undefined }}
    >
      <Art sense={sense} />
      <div className="relative flex items-baseline gap-3">
        <span className="font-display text-[56px] leading-none font-extrabold italic" style={{ color: c.numColor }}>{c.num}</span>
        <span className="font-mono text-[12px] font-bold tracking-[0.2em] uppercase" style={{ color: c.textColor }}>{c.verb}</span>
      </div>
      <div className="relative flex items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-[10px] font-mono text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: c.textColor }}>
            {c.tagline}
            {c.soon && <StatusTag status="coming-soon" label="Soon" className="px-[7px] py-[3px] tracking-[0.12em]" />}
          </div>
          <div className="nf-display mt-[6px] text-[clamp(36px,3.4vw,44px)] whitespace-nowrap" style={{ lineHeight: 0.9, letterSpacing: 0 }}>{c.title}</div>
          <div className="mt-2 font-mono text-[13px]" style={{ color: sense === "see" ? "#C9CFDB" : c.textColor }}>{c.sub}</div>
        </div>
        <span aria-hidden="true" className="flex h-[52px] w-[52px] flex-none items-center justify-center" style={{ background: c.tileBg }}>
          <span className="nf-chevron h-6 w-[18px]" style={{ background: c.chevronBg }} />
        </span>
      </div>
    </Link>
  );
}
