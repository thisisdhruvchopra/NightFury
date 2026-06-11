/**
 * Vector renditions of NightFury packaging, matching the printed box system:
 * navy panel, italic wordmark, orange PREMIUM EDITION badge, orange rounded
 * window frame, vertical feature-icon strip, product band at the bottom.
 */

const NAVY = "#0f2a44";
const NAVY_DEEP = "#0a1622";
const ORANGE = "#f28c28";
const ORANGE_HI = "#ffd36a";

function Wordmark({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <text
        fontFamily="var(--font-montserrat), Montserrat, sans-serif"
        fontWeight={800}
        fontStyle="italic"
        fontSize={34}
        fill="#ffffff"
      >
        NightFury
      </text>
      <rect x={2} y={8} width={148} height={3} fill={ORANGE} />
      <text
        y={22}
        x={2}
        fontFamily="var(--font-montserrat), Montserrat, sans-serif"
        fontWeight={600}
        fontSize={10.5}
        letterSpacing={2.5}
        fill="#cfd9e8"
      >
        DRIVE THE DIFFERENCE
      </text>
    </g>
  );
}

function PremiumBadge({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={86} height={34} rx={5} fill={ORANGE} transform="skewX(-8)" />
      <text
        x={38}
        y={14}
        textAnchor="middle"
        fontFamily="var(--font-montserrat), Montserrat, sans-serif"
        fontWeight={800}
        fontStyle="italic"
        fontSize={11}
        fill="#fff"
      >
        PREMIUM
      </text>
      <text
        x={38}
        y={27}
        textAnchor="middle"
        fontFamily="var(--font-montserrat), Montserrat, sans-serif"
        fontWeight={800}
        fontStyle="italic"
        fontSize={11}
        fill="#fff"
      >
        EDITION
      </text>
    </g>
  );
}

function SideStrip({
  x,
  height,
  items,
}: {
  x: number;
  height: number;
  items: { icon: React.ReactNode; label: string[] }[];
}) {
  const step = height / items.length;
  return (
    <g transform={`translate(${x} 0)`}>
      <line x1={52} y1={20} x2={52} y2={height - 20} stroke="rgba(255,255,255,0.12)" />
      {items.map((it, i) => (
        <g key={i} transform={`translate(0 ${step * i + step / 2 - 18})`}>
          <g transform="translate(14 0)" stroke={ORANGE} strokeWidth={1.6} fill="none">
            {it.icon}
          </g>
          {it.label.map((line, j) => (
            <text
              key={j}
              x={24}
              y={30 + j * 9}
              textAnchor="middle"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
              fontWeight={600}
              fontSize={6.5}
              letterSpacing={0.5}
              fill="#cfd9e8"
            >
              {line}
            </text>
          ))}
        </g>
      ))}
    </g>
  );
}

const ICONS = {
  bolt: <path d="M11 1 4 12h6l-2 9 8-12h-6l1-8z" transform="scale(0.85)" />,
  drop: <path d="M9 1C9 1 2 9 2 13a7 7 0 0 0 14 0C16 9 9 1 9 1z" transform="scale(0.9)" />,
  clock: (
    <>
      <circle cx={9} cy={9} r={8} />
      <path d="M9 4.5V9l3 2" />
    </>
  ),
  shield: <path d="M9 1 16 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V4l7-3z" />,
  leaf: <path d="M16 2C6 2 2 8 2 14c0 1.5.3 2.7.8 3.6C5 13 9 9 14 7c-4 3-7.5 7-9 11 .8.3 1.8.5 3 .5 6 0 8-7 8-16.5z" transform="scale(0.85)" />,
  sparkle: (
    <>
      <path d="M9 1v16M1 9h16" />
      <path d="M4 4l10 10M14 4 4 14" opacity={0.6} />
    </>
  ),
};

/* ------------------------------------------------------------------ */
/* 2-Wheeler LED Headlight, landscape box front                       */
/* ------------------------------------------------------------------ */
export function Box2WLed({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 460" className={className} role="img" aria-label="NightFury 2-Wheeler LED Headlight box">
      <defs>
        <linearGradient id="b2-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#163b5c" />
          <stop offset="0.6" stopColor={NAVY} />
          <stop offset="1" stopColor={NAVY_DEEP} />
        </linearGradient>
        <radialGradient id="b2-beam" cx="0.25" cy="0.5" r="0.8">
          <stop offset="0" stopColor="#dff1ff" stopOpacity="0.9" />
          <stop offset="0.4" stopColor="#9fd4ff" stopOpacity="0.25" />
          <stop offset="1" stopColor="#9fd4ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="b2-fin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8edf5" />
          <stop offset="0.5" stopColor="#9aa7ba" />
          <stop offset="1" stopColor="#5d6b80" />
        </linearGradient>
      </defs>

      <rect width={640} height={460} rx={14} fill="url(#b2-bg)" />
      <rect x={1} y={1} width={638} height={458} rx={13} fill="none" stroke="rgba(255,255,255,0.08)" />

      <Wordmark x={28} y={52} />
      <PremiumBadge x={206} y={24} />
      <text x={300} y={42} fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={800} fontSize={22} fill="#fff">
        LED
      </text>
      <text x={300} y={64} fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={800} fontSize={22} fill="#fff">
        HEADLIGHT
      </text>
      <g transform="translate(540 22)">
        <rect width={84} height={26} rx={6} fill={ORANGE} />
        <text x={42} y={17} textAnchor="middle" fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={800} fontSize={11} fill="#fff">
          2-WHEELER
        </text>
      </g>

      {/* Headline */}
      <text x={28} y={120} fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={800} fontSize={21} fill={ORANGE_HI}>
        OWN THE NIGHT
      </text>
      <text x={28} y={144} fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={800} fontSize={21} fill={ORANGE_HI}>
        ON TWO WHEELS
      </text>

      {/* Feature list */}
      {[
        "ULTRA BRIGHT 120W",
        "IP67 WATER RESISTANT",
        "COOL 6000K / 4300K",
        "VIBRATION TESTED",
        "LIFE SPAN UP TO 5000 HOURS",
      ].map((t, i) => (
        <g key={t} transform={`translate(28 ${172 + i * 30})`}>
          <circle cx={7} cy={-4} r={7} fill="none" stroke={ORANGE} strokeWidth={1.5} />
          <circle cx={7} cy={-4} r={2.5} fill={ORANGE} />
          <text x={24} fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={700} fontSize={12.5} fill="#e8edf5">
            {t}
          </text>
        </g>
      ))}

      {/* Scene window */}
      <g>
        <rect x={268} y={92} width={300} height={250} rx={16} fill={NAVY_DEEP} stroke={ORANGE} strokeWidth={2.5} />
        <clipPath id="b2-clip">
          <rect x={270} y={94} width={296} height={246} rx={14} />
        </clipPath>
        <g clipPath="url(#b2-clip)">
          {/* road */}
          <rect x={270} y={250} width={296} height={90} fill="#0d1f33" />
          <path d="M270 250h296L480 340H300z" fill="#16334f" />
          <path d="M410 252 402 340h14l-2-88z" fill="#e8edf5" opacity={0.5} />
          {/* beam */}
          <path d="M352 218 L566 160 L566 320 L352 240z" fill="url(#b2-beam)" />
          {/* motorcycle silhouette */}
          <g transform="translate(290 188)" fill="#02060e">
            <circle cx={18} cy={66} r={20} />
            <circle cx={18} cy={66} r={11} fill="#0d1726" />
            <circle cx={92} cy={66} r={20} />
            <circle cx={92} cy={66} r={11} fill="#0d1726" />
            <path d="M10 60 30 28h22l10-12h14l-6 14 16 4 12 20-10 8H58L38 70z" />
            <path d="M62 16l12-10 8 4-8 10z" />
          </g>
          {/* headlight flare */}
          <circle cx={352} cy={228} r={10} fill="#ffffff" />
          <circle cx={352} cy={228} r={20} fill="#cfe9ff" opacity={0.35} />
          {/* LED unit render */}
          <g transform="translate(468 218)">
            <rect x={-6} y={-44} width={26} height={58} rx={4} fill="#dfe7f2" />
            <rect x={-2} y={-40} width={18} height={22} rx={2} fill="#fff8e8" stroke="#c8d2e0" />
            <circle cx={7} cy={-29} r={6} fill="#fffdf4" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect key={i} x={-10 + i * 6} y={16} width={4} height={34} rx={1.5} fill="url(#b2-fin)" />
            ))}
            <rect x={-12} y={10} width={40} height={8} rx={3} fill="#aab6c8" />
          </g>
        </g>
      </g>

      {/* Bottom strip */}
      <g transform="translate(0 372)">
        <rect x={0} y={0} width={640} height={88} fill="rgba(0,0,0,0.28)" />
        {[
          { icon: ICONS.bolt, l1: "VOLTAGE", l2: "9V-32V" },
          { icon: ICONS.drop, l1: "IP67", l2: "RATED" },
          { icon: ICONS.clock, l1: "5000 HRS", l2: "LIFE SPAN" },
          { icon: ICONS.shield, l1: "18 MONTHS", l2: "WARRANTY" },
        ].map((f, i) => (
          <g key={i} transform={`translate(${60 + i * 150} 22)`}>
            <g stroke={ORANGE} strokeWidth={1.6} fill="none" transform="translate(0 4)">
              {f.icon}
            </g>
            <text x={30} y={14} fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={800} fontSize={11} fill="#fff">
              {f.l1}
            </text>
            <text x={30} y={28} fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={600} fontSize={9} fill="#aab8cc">
              {f.l2}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Microfiber Cloth, portrait box front                               */
/* ------------------------------------------------------------------ */
export function BoxMicrofiber({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 560" className={className} role="img" aria-label="NightFury Microfiber Cloth box">
      <defs>
        <linearGradient id="mf-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#163b5c" />
          <stop offset="0.6" stopColor={NAVY} />
          <stop offset="1" stopColor={NAVY_DEEP} />
        </linearGradient>
        <linearGradient id="mf-cloth" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2b705" />
          <stop offset="0.5" stopColor="#f28c28" />
          <stop offset="1" stopColor="#d9741f" />
        </linearGradient>
        <linearGradient id="mf-cloth2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1c3e5e" />
          <stop offset="1" stopColor="#0f2a44" />
        </linearGradient>
      </defs>

      <rect width={420} height={560} rx={14} fill="url(#mf-bg)" />
      <rect x={1} y={1} width={418} height={558} rx={13} fill="none" stroke="rgba(255,255,255,0.08)" />

      <Wordmark x={26} y={50} scale={0.85} />
      <PremiumBadge x={268} y={22} />
      <text x={26} y={102} fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={800} fontSize={20} fill="#fff">
        MICROFIBER CLOTH
      </text>
      <text x={26} y={124} fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={700} fontSize={12.5} fill={ORANGE_HI} letterSpacing={1}>
        SCRATCH-FREE SHINE, EVERY WIPE
      </text>

      {/* Window with folded cloths */}
      <g>
        <rect x={64} y={146} width={292} height={250} rx={16} fill={NAVY_DEEP} stroke={ORANGE} strokeWidth={2.5} />
        <clipPath id="mf-clip">
          <rect x={66} y={148} width={288} height={246} rx={14} />
        </clipPath>
        <g clipPath="url(#mf-clip)">
          <ellipse cx={210} cy={372} rx={150} ry={26} fill="#000" opacity={0.45} />
          {/* navy cloth (back) */}
          <g transform="translate(210 268) rotate(-4)">
            <rect x={-118} y={-10} width={236} height={104} rx={14} fill="url(#mf-cloth2)" />
            {[1, 2, 3].map((i) => (
              <line key={i} x1={-118} y1={-10 + i * 26} x2={118} y2={-10 + i * 26} stroke="rgba(255,255,255,0.07)" strokeWidth={3} />
            ))}
          </g>
          {/* orange cloth (front) */}
          <g transform="translate(210 226) rotate(3)">
            <rect x={-118} y={-44} width={236} height={104} rx={14} fill="url(#mf-cloth)" />
            {[1, 2, 3].map((i) => (
              <line key={i} x1={-118} y1={-44 + i * 26} x2={118} y2={-44 + i * 26} stroke="rgba(255,255,255,0.14)" strokeWidth={3} />
            ))}
            {/* plush texture dots */}
            {Array.from({ length: 60 }).map((_, i) => (
              <circle
                key={i}
                cx={-110 + (i % 12) * 20}
                cy={-36 + Math.floor(i / 12) * 19}
                r={1.4}
                fill="rgba(255,255,255,0.18)"
              />
            ))}
            <text x={0} y={14} textAnchor="middle" fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={800} fontStyle="italic" fontSize={19} fill="#fff" opacity={0.92}>
              NightFury
            </text>
          </g>
          {/* sparkles */}
          <g stroke="#fff" strokeWidth={1.6} opacity={0.85}>
            <path d="M118 180v18M109 189h18" />
            <path d="M308 196v14M301 203h14" />
            <path d="M296 330v12M290 336h12" />
          </g>
        </g>
      </g>

      <text x={210} y={428} textAnchor="middle" fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={800} fontSize={17} fill={ORANGE_HI}>
        380 GSM · PACK OF 2
      </text>
      <text x={210} y={448} textAnchor="middle" fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={600} fontSize={11} fill="#cfd9e8" letterSpacing={1.5}>
        40 × 40 CM · EDGELESS
      </text>

      <g transform="translate(0 470)">
        <rect width={420} height={90} fill="rgba(0,0,0,0.28)" />
        {[
          { icon: ICONS.sparkle, l1: "SWIRL", l2: "FREE" },
          { icon: ICONS.drop, l1: "SUPER", l2: "ABSORBENT" },
          { icon: ICONS.shield, l1: "CERAMIC &", l2: "PPF SAFE" },
          { icon: ICONS.leaf, l1: "300+ WASH", l2: "CYCLES" },
        ].map((f, i) => (
          <g key={i} transform={`translate(${26 + i * 96} 24)`}>
            <g stroke={ORANGE} strokeWidth={1.6} fill="none" transform="scale(0.9)">
              {f.icon}
            </g>
            <text x={28} y={10} fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={800} fontSize={9} fill="#fff">
              {f.l1}
            </text>
            <text x={28} y={22} fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={600} fontSize={8} fill="#aab8cc">
              {f.l2}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Car Wet Wipes, landscape soft-pack front                           */
/* ------------------------------------------------------------------ */
export function BoxWetWipes({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 460" className={className} role="img" aria-label="NightFury Car Wet Wipes pack">
      <defs>
        <linearGradient id="ww-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#163b5c" />
          <stop offset="0.6" stopColor={NAVY} />
          <stop offset="1" stopColor={NAVY_DEEP} />
        </linearGradient>
        <linearGradient id="ww-sheen" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor="rgba(255,255,255,0.16)" />
          <stop offset="0.25" stopColor="rgba(255,255,255,0)" />
          <stop offset="0.7" stopColor="rgba(255,255,255,0)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.1)" />
        </linearGradient>
      </defs>

      {/* soft pack silhouette */}
      <path
        d="M30 60 Q26 38 50 34 L590 26 Q616 24 614 50 L612 410 Q614 434 588 434 L52 426 Q28 426 30 402 Z"
        fill="url(#ww-bg)"
      />
      <path
        d="M30 60 Q26 38 50 34 L590 26 Q616 24 614 50 L612 410 Q614 434 588 434 L52 426 Q28 426 30 402 Z"
        fill="url(#ww-sheen)"
      />
      <path
        d="M30 60 Q26 38 50 34 L590 26 Q616 24 614 50 L612 410 Q614 434 588 434 L52 426 Q28 426 30 402 Z"
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={1.5}
      />
      {/* crimped edges */}
      <g stroke="rgba(255,255,255,0.12)" strokeWidth={1}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${36 + i * 4} 58 L${36 + i * 4} 402`} />
        ))}
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${604 - i * 4} 50 L${602 - i * 4} 410`} />
        ))}
      </g>

      <Wordmark x={60} y={88} scale={0.9} />
      <PremiumBadge x={300} y={52} />
      <g transform="translate(478 54)">
        <rect width={108} height={26} rx={6} fill={ORANGE} />
        <text x={54} y={17} textAnchor="middle" fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={800} fontSize={11} fill="#fff">
          40 WIPES
        </text>
      </g>

      <text x={60} y={158} fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={800} fontSize={30} fill="#fff">
        CAR WET WIPES
      </text>
      <text x={60} y={184} fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={700} fontSize={14} fill={ORANGE_HI} letterSpacing={1}>
        SHOWROOM CLEAN, ANYWHERE
      </text>

      {/* flip lid */}
      <g transform="translate(388 196)">
        <rect width={180} height={120} rx={14} fill="#071226" stroke={ORANGE} strokeWidth={2.5} />
        <rect x={18} y={14} width={144} height={92} rx={10} fill="#10254a" />
        <rect x={58} y={4} width={64} height={9} rx={4.5} fill={ORANGE} />
        {/* wipe emerging */}
        <path d="M62 60 Q90 28 118 60 Q132 76 118 88 L62 88 Q48 74 62 60z" fill="#e8edf5" />
        <path d="M66 64 Q90 38 114 64" stroke="#aab8cc" strokeWidth={2} fill="none" />
        <text x={90} y={108} textAnchor="middle" fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={700} fontSize={8.5} fill="#cfd9e8" letterSpacing={1}>
          FRESH-LOCK LID
        </text>
      </g>

      {/* features */}
      {[
        "pH-BALANCED · ALCOHOL FREE",
        "ANTI-STATIC MATTE FINISH",
        "SAFE ON LEATHER & SCREENS",
        "UV PROTECTION ADDITIVE",
      ].map((t, i) => (
        <g key={t} transform={`translate(60 ${224 + i * 32})`}>
          <circle cx={7} cy={-4} r={7} fill="none" stroke={ORANGE} strokeWidth={1.5} />
          <circle cx={7} cy={-4} r={2.5} fill={ORANGE} />
          <text x={24} fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={700} fontSize={13} fill="#e8edf5">
            {t}
          </text>
        </g>
      ))}

      <g transform="translate(0 356)">
        <rect x={42} y={0} width={560} height={56} rx={10} fill="rgba(0,0,0,0.28)" />
        {[
          { icon: ICONS.drop, t: "DEEP CLEAN" },
          { icon: ICONS.sparkle, t: "NO RESIDUE" },
          { icon: ICONS.leaf, t: "GENTLE FORMULA" },
          { icon: ICONS.shield, t: "INTERIOR SAFE" },
        ].map((f, i) => (
          <g key={i} transform={`translate(${78 + i * 138} 18)`}>
            <g stroke={ORANGE} strokeWidth={1.6} fill="none" transform="scale(0.85)">
              {f.icon}
            </g>
            <text x={26} y={13} fontFamily="var(--font-montserrat), Montserrat, sans-serif" fontWeight={800} fontSize={10} fill="#fff">
              {f.t}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export function BoxArtBySlug({ art, className }: { art: "led2w" | "microfiber" | "wipes"; className?: string }) {
  if (art === "led2w") return <Box2WLed className={className} />;
  if (art === "microfiber") return <BoxMicrofiber className={className} />;
  return <BoxWetWipes className={className} />;
}
