import type { StageItem } from "@/data/products";

const fill = (c: string) => ({ backgroundColor: c });

/**
 * Homepage stage illustrations from the design file. Each item switches to a
 * transparent product photo once its `photo` flag is set in the data module.
 */
function Illustration({ item }: Readonly<{ item: StageItem }>) {
  const { visual, colors, organic, beam } = item;

  if (visual === "core") {
    return (
      <div className="flex flex-col items-center">
        <div className="relative z-[2] flex h-12 w-[190px] items-center justify-around rounded-[13px] bg-[#1C1E23] px-[22px]">
          {[0, 1, 2, 3].map((i) => <span key={i} className="h-7 w-[7px] rounded bg-[#5A5F6B]" />)}
        </div>
        <div className="relative -mt-2 flex h-40 w-[172px] items-end overflow-hidden rounded-b-[36px] border-[3px] border-t-0 border-[rgba(10,10,11,0.2)] bg-[rgba(255,255,255,0.65)]">
          <div className="nf-tint flex h-[62%] w-full items-center justify-center gap-2 p-[14px]" style={fill(colors.liquid)}>
            {organic && ["#B88A55", "#C99A63", "#B88A55"].map((c, i) => (
              <span key={i} className="h-6 w-[30px] rounded-[3px] border-2 border-[#8C6436]" style={{ background: c }} />
            ))}
          </div>
          <span className="absolute top-[18px] right-0 left-0 text-center font-display text-[16px] font-extrabold italic text-[rgba(10,10,11,0.6)]">
            NIGHTFURY
          </span>
        </div>
      </div>
    );
  }

  if (visual === "air") {
    return (
      <div className="flex flex-col items-center">
        <div className="h-5 w-7 rounded-t-md rounded-b-[2px] bg-[#2A2D33]" />
        <div className="h-4 w-[54px] bg-[#16181C]" />
        <div className="relative h-[230px] w-[118px] overflow-hidden rounded-[18px] bg-[#1C1E23]">
          <div className="nf-tint absolute top-[90px] right-0 left-0 h-[50px]" style={fill(colors.liquid)} />
          <span className="absolute top-[100px] right-0 left-0 text-center font-display text-[26px] font-extrabold italic tracking-[0.08em] text-carbon">AIR</span>
        </div>
      </div>
    );
  }

  if (visual === "essence") {
    return (
      <div className="flex flex-col items-center">
        <div className="h-20 w-1" style={{ background: "repeating-linear-gradient(180deg, #8C6436 0 6px, #B88A55 6px 12px)" }} />
        <div className="h-[52px] w-16 rounded-t-[12px] rounded-b-md border-b-[6px] border-[#8C6436] bg-[#B07A45]" />
        <div
          className="nf-tint relative -mt-[2px] h-[174px] w-[164px]"
          style={{ ...fill(colors.liquid), clipPath: "polygon(22% 0, 78% 0, 100% 28%, 100% 76%, 80% 100%, 20% 100%, 0 76%, 0 28%)" }}
        >
          <span className="absolute top-[12%] bottom-[12%] left-[28%] w-[26px] bg-[rgba(255,255,255,0.4)]" style={{ transform: "skewX(-8deg)" }} />
        </div>
      </div>
    );
  }

  if (visual === "led4" || visual === "led2") {
    const b = beam ?? { top: 40, h: 140 };
    return (
      <div className="relative h-[220px] w-[380px]">
        <div
          className="nf-pulse-slow absolute left-[150px] w-[230px] bg-white opacity-95"
          style={{
            top: b.top,
            height: b.h,
            clipPath: visual === "led4" ? "polygon(0 42%, 100% 0, 100% 100%, 0 58%)" : "polygon(0 40%, 100% 0, 100% 100%, 0 60%)",
            transition: "top 0.5s ease, height 0.5s ease",
          }}
        />
        {visual === "led4" ? (
          <>
            <div className="absolute top-[76px] left-5 flex h-[68px] w-[50px] flex-col justify-around bg-[#1C1E23] py-[6px]">
              {[0, 1, 2, 3, 4].map((i) => <span key={i} className="h-1 bg-[#5A5F6B]" />)}
            </div>
            <div className="absolute top-[90px] left-[70px] h-10 w-[26px] bg-[#2A2D33]" />
            <div className="absolute top-[98px] left-[96px] h-6 w-[58px] rounded-r-[12px] border-2 border-[#1C1E23] bg-[#D5D9E0]" />
            <div className="absolute top-[102px] left-[118px] h-4 w-4 bg-fury" />
          </>
        ) : (
          <div className="absolute top-10 left-5 flex h-[140px] w-[140px] items-center justify-center rounded-full bg-[#1C1E23]">
            <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full border-4 border-muted bg-[#D5D9E0]">
              <div className="h-[34px] w-[34px] bg-fury" />
            </div>
          </div>
        )}
      </div>
    );
  }

  if (visual === "cloth") {
    return (
      <div className="flex flex-col gap-2">
        <div className="h-11 w-[220px] rounded-md bg-[#3B6FB6]" />
        <div className="ml-[18px] h-11 w-[220px] rounded-md bg-navy" />
        <div className="h-11 w-[220px] rounded-md bg-[#7FA2D3]" />
      </div>
    );
  }

  return (
    <div className="relative flex h-[150px] w-[240px] items-end justify-center rounded-[14px] border-[3px] border-navy bg-white pb-[18px]">
      <div className="absolute top-[22px] left-1/2 -ml-[60px] h-[34px] w-[120px] rounded-[17px]" style={fill(colors.liquid)} />
      <span className="font-display text-[24px] font-extrabold italic tracking-[0.06em] text-navy">NIGHTFURY</span>
    </div>
  );
}

/**
 * Product photo. The shots have white backgrounds, so they are multiplied onto
 * the tint and halo: white takes the stage colour and the jar stays true.
 * Each swap remounts the image and fades it in (keyed by src).
 */
function Photo({ src, compact }: Readonly<{ src: string; compact?: boolean }>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP that swaps on scroll; a plain img keeps the crossfade simple
    <img
      src={src}
      alt=""
      width={1200}
      height={800}
      decoding="async"
      className={`nf-photo-in relative h-auto w-full object-contain mix-blend-multiply ${compact ? "max-w-[300px]" : "max-w-[600px]"}`}
    />
  );
}

/** Halo, product and floor shadow. `compact` scales it for the mobile cards. */
export default function StageVisual({ item, compact }: Readonly<{ item: StageItem; compact?: boolean }>) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex min-w-0 items-center justify-center ${compact ? "h-[260px]" : "h-[clamp(360px,44vh,480px)]"}`}
    >
      <div
        className="nf-tint absolute aspect-square rounded-full"
        style={{ width: compact ? 220 : "min(400px, 100%)", backgroundColor: item.colors.halo }}
      />
      {item.photo ? (
        <div className="relative flex w-full justify-center">
          <Photo key={item.photo} src={item.photo} compact={compact} />
        </div>
      ) : (
        <div className={`relative flex flex-col items-center ${compact ? "scale-[0.62]" : "scale-90 xl:scale-[1.15]"}`}>
          <Illustration item={item} />
          <div className="mt-4 h-[18px] w-[200px] rounded-[50%] bg-[rgba(10,10,11,0.16)]" />
        </div>
      )}
    </div>
  );
}
