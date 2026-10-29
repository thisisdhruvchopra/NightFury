/**
 * Illustrated Aroma bottles from the design files. They stand in for product
 * photography and 360 frame sets until those exist.
 *
 * Pass `angle` (degrees) to get the rotating 360 placeholder; leave it out for
 * the still used on the homepage scroll stage.
 */

type Kind = "core" | "air" | "essence";

const block = (c: string, k: number) => (
  <span key={k} className="h-7 w-9 rounded-[3px] border-2 border-[#8C6436]" style={{ background: c }} />
);

export default function Bottle({
  kind,
  liquid,
  organic,
  angle,
  showCard = true,
}: Readonly<{ kind: Kind; liquid: string; organic?: boolean; angle?: number; showCard?: boolean }>) {
  const spinning = angle !== undefined;
  const a = ((((angle ?? 0) % 360) + 360) % 360) * (Math.PI / 180);
  const c = Math.cos(a);
  const s = Math.sin(a);
  const labelStyle = spinning
    ? { transform: `translateX(${Math.round(s * 62)}px) scaleX(${Math.max(0.05, Math.abs(c)).toFixed(2)})`, opacity: Math.max(0, c) }
    : undefined;
  const hiX = Math.round(-s * 48 - 30);
  const spoke = (off: number) => Math.round(Math.sin(a + off) * 90);
  const fill = { backgroundColor: liquid };

  return (
    <div className="relative flex flex-col items-center">
      {kind === "core" && (
        <div className="flex flex-col items-center">
          {spinning ? (
            <div className="relative z-[2] h-[54px] w-[220px] overflow-hidden rounded-[14px] bg-[#1C1E23]">
              {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((off) => (
                <span
                  key={off}
                  className="absolute top-[11px] left-1/2 -ml-[3px] h-8 w-[7px] rounded bg-[#5A5F6B]"
                  style={{ transform: `translateX(${spoke(off)}px)` }}
                />
              ))}
            </div>
          ) : (
            <div className="relative z-[2] flex h-[54px] w-[220px] items-center justify-evenly rounded-[14px] bg-[#1C1E23] px-[22px]">
              <span className="h-8 w-[7px] rounded bg-[#5A5F6B]" />
              <span className="h-8 w-[7px] rounded bg-[#5A5F6B]" />
              <span className="nf-tint h-[18px] w-[18px] rounded-full" style={fill} />
              <span className="h-8 w-[7px] rounded bg-[#5A5F6B]" />
              <span className="h-8 w-[7px] rounded bg-[#5A5F6B]" />
            </div>
          )}
          <div className="relative -mt-2 flex h-[186px] w-[200px] items-end overflow-hidden rounded-b-[40px] border-[3px] border-t-0 border-[rgba(10,10,11,0.2)] bg-[rgba(255,255,255,0.65)]">
            <div className="nf-tint flex h-[62%] w-full flex-wrap items-center justify-center gap-[10px] p-4" style={fill}>
              {organic && ["#B88A55", "#C99A63", "#B88A55", "#C99A63"].map(block)}
            </div>
            <span
              className="absolute top-5 right-0 left-0 text-center text-[17px] font-bold italic text-[rgba(10,10,11,0.62)]"
              style={{ fontFamily: "Arial, Helvetica, sans-serif", ...labelStyle }}
            >
              NIGHTFURY
            </span>
            {spinning && (
              <span
                className="absolute top-0 bottom-0 left-1/2 -ml-[11px] w-[22px] bg-[rgba(255,255,255,0.55)]"
                style={{ transform: `translateX(${hiX}px)` }}
              />
            )}
          </div>
        </div>
      )}

      {kind === "air" && (
        <div className="flex items-end gap-[26px]">
          <div className="flex flex-col items-center">
            <div
              className="h-[22px] w-[30px] rounded-t-md rounded-b-[2px] bg-[#2A2D33]"
              style={spinning ? { transform: `translateX(${Math.round(s * 6)}px)` } : undefined}
            />
            <div className="h-[18px] w-[58px] bg-[#16181C]" />
            <div className="relative h-[240px] w-32 overflow-hidden rounded-[18px] bg-[#1C1E23]">
              <div className="nf-tint absolute top-[94px] right-0 left-0 h-[52px]" style={fill} />
              <span
                className="absolute top-[104px] right-0 left-0 text-center font-display text-[28px] font-extrabold italic tracking-[0.08em] text-carbon"
                style={labelStyle}
              >
                AIR
              </span>
              {spinning ? (
                <span
                  className="absolute top-0 bottom-0 left-1/2 -ml-[7px] w-[14px] bg-[rgba(255,255,255,0.12)]"
                  style={{ transform: `translateX(${hiX}px)` }}
                />
              ) : (
                <span
                  className="absolute right-0 bottom-[70px] left-0 text-center text-[14px] font-bold italic text-[#9A9AA0]"
                  style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                >
                  NIGHTFURY
                </span>
              )}
            </div>
          </div>
          {showCard && !spinning && (
            <div className="mb-14 flex flex-col items-center">
              <div className="h-16 w-[2px] bg-[#6B5A45]" />
              <div className="nf-tint flex h-[164px] w-[98px] flex-col items-center rounded-[10px] pt-[14px]" style={fill}>
                <span className="h-[14px] w-[14px] rounded-full bg-white" />
                <span
                  className="mt-10 text-[22px] font-bold italic text-[rgba(10,10,11,0.75)]"
                  style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                >
                  NF
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {kind === "essence" && (
        <div className="flex flex-col items-center">
          <div className="h-[84px] w-1" style={{ background: "repeating-linear-gradient(180deg, #8C6436 0 6px, #B88A55 6px 12px)" }} />
          <div className="h-14 w-[70px] rounded-t-[12px] rounded-b-md border-b-[6px] border-[#8C6436] bg-[#B07A45]" />
          <div
            className="nf-tint relative -mt-[2px] h-[186px] w-[176px] overflow-hidden"
            style={{ ...fill, clipPath: "polygon(22% 0, 78% 0, 100% 28%, 100% 76%, 80% 100%, 20% 100%, 0 76%, 0 28%)" }}
          >
            {spinning ? (
              <>
                <span
                  className="absolute top-[10%] bottom-[10%] left-1/2 -ml-[15px] w-[30px] bg-[rgba(255,255,255,0.4)]"
                  style={{ transform: `translateX(${hiX}px) skewX(-8deg)` }}
                />
                <span
                  className="absolute top-[18%] bottom-[18%] left-1/2 -ml-[7px] w-[14px] bg-[rgba(10,10,11,0.12)]"
                  style={{ transform: `translateX(${Math.round(s * 62)}px)` }}
                />
              </>
            ) : (
              <>
                <div
                  className="absolute top-[12%] left-[16%] h-[72%] w-[20%] bg-[rgba(255,255,255,0.38)]"
                  style={{ clipPath: "polygon(0 18%, 100% 0, 100% 100%, 0 86%)" }}
                />
                <div className="absolute top-[18%] right-[14%] h-[56%] w-[10%] bg-[rgba(10,10,11,0.1)]" />
              </>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 h-5 w-[210px] rounded-[50%] bg-[rgba(10,10,11,0.15)]" />
    </div>
  );
}
