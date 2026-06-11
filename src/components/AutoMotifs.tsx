/**
 * Automotive vector elements: tachometer dial, speed chevrons,
 * road-marking divider. Used as decorative brand motifs.
 */

/** Tachometer with redline arc and needle. Decorative, scales to container. */
export function TachDial({ className = "" }: { className?: string }) {
  // 240° sweep from 210° (0 rpm) to -30° (8 rpm), needle at ~6.5
  const cx = 100;
  const cy = 100;
  const start = 210;
  const sweep = 240;
  const ticks = [];
  for (let i = 0; i <= 40; i++) {
    const angle = ((start - (sweep * i) / 40) * Math.PI) / 180;
    const major = i % 5 === 0;
    const r1 = major ? 74 : 80;
    const r2 = 86;
    ticks.push(
      <line
        key={i}
        x1={cx + r1 * Math.cos(angle)}
        y1={cy - r1 * Math.sin(angle)}
        x2={cx + r2 * Math.cos(angle)}
        y2={cy - r2 * Math.sin(angle)}
        stroke={i >= 33 ? "#f28c28" : "currentColor"}
        strokeWidth={major ? 2.5 : 1}
      />,
    );
  }
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
    const angle = ((start - (sweep * n) / 8) * Math.PI) / 180;
    return (
      <text
        key={n}
        x={cx + 62 * Math.cos(angle)}
        y={cy - 62 * Math.sin(angle) + 4}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fontFamily="var(--font-montserrat), sans-serif"
        fill={n >= 7 ? "#f28c28" : "currentColor"}
      >
        {n}
      </text>
    );
  });
  // needle at 6.5
  const needleAngle = ((start - (sweep * 6.5) / 8) * Math.PI) / 180;

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle cx={cx} cy={cy} r={92} fill="none" stroke="currentColor" strokeWidth={1.5} opacity={0.5} />
      {/* redline arc */}
      <path
        d={describeArc(cx, cy, 88, 6.6, 8, start, sweep)}
        fill="none"
        stroke="#f28c28"
        strokeWidth={5}
        opacity={0.85}
      />
      <g opacity={0.9}>{ticks}</g>
      <g opacity={0.8}>{numbers}</g>
      <line
        x1={cx - 14 * Math.cos(needleAngle)}
        y1={cy + 14 * Math.sin(needleAngle)}
        x2={cx + 56 * Math.cos(needleAngle)}
        y2={cy - 56 * Math.sin(needleAngle)}
        stroke="#f28c28"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={8} fill="#f28c28" />
      <circle cx={cx} cy={cy} r={3.5} fill="#0a1622" />
      <text
        x={cx}
        y={cy + 36}
        textAnchor="middle"
        fontSize={9}
        fontWeight={700}
        letterSpacing={2}
        fontFamily="var(--font-montserrat), sans-serif"
        fill="currentColor"
        opacity={0.7}
      >
        RPM ×1000
      </text>
    </svg>
  );
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  fromVal: number,
  toVal: number,
  start: number,
  sweep: number,
) {
  const a1 = ((start - (sweep * fromVal) / 8) * Math.PI) / 180;
  const a2 = ((start - (sweep * toVal) / 8) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy - r * Math.sin(a1);
  const x2 = cx + r * Math.cos(a2);
  const y2 = cy - r * Math.sin(a2);
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
}

/** Triple speed chevrons, like motorsport livery. */
export function SpeedChevrons({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${i * 34 + 4} 4 L${i * 34 + 28} 20 L${i * 34 + 4} 36`}
          fill="none"
          stroke="#f28c28"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={1 - i * 0.3}
        />
      ))}
    </svg>
  );
}

/** Sports-car side profile, line art, facing right, with headlight beam. */
export function CarSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 350 130" className={className} aria-hidden="true" fill="none">
      {/* headlight beam */}
      <path d="M322 64 L350 55 L350 88 L324 80 Z" fill="#ffd36a" opacity={0.22} />
      {/* body */}
      <path
        d="M24 92 Q10 92 12 80 Q14 68 34 62 L72 54 Q118 30 168 28 Q216 27 244 44 L274 56 Q316 62 322 78 Q326 90 310 92 L292 92 A30 30 0 0 0 232 92 L122 92 A30 30 0 0 0 62 92 L24 92 Z"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinejoin="round"
      />
      {/* glasshouse */}
      <path
        d="M90 54 L126 37 Q164 31 198 36 L224 49 Q186 44 158 45 Q122 47 90 54 Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* door line + handle */}
      <path d="M163 45 L160 90 M176 62 L192 62" stroke="currentColor" strokeWidth={2} />
      {/* headlight + taillight */}
      <path d="M310 70 L321 73" stroke="#ffd36a" strokeWidth={4} strokeLinecap="round" />
      <path d="M14 72 L22 70" stroke="#f28c28" strokeWidth={4} strokeLinecap="round" />
      {/* wheels */}
      <g stroke="currentColor">
        <circle cx={92} cy={92} r={20} strokeWidth={3} />
        <circle cx={92} cy={92} r={7} strokeWidth={2} />
        <path d="M92 85v14M85 92h14" strokeWidth={1.5} />
        <circle cx={262} cy={92} r={20} strokeWidth={3} />
        <circle cx={262} cy={92} r={7} strokeWidth={2} />
        <path d="M262 85v14M255 92h14" strokeWidth={1.5} />
      </g>
    </svg>
  );
}

/** Motorcycle side profile, line art, facing right, with headlight beam. */
export function BikeSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 160" className={className} aria-hidden="true" fill="none">
      {/* headlight beam */}
      <path d="M232 44 L278 30 L278 64 L236 60 Z" fill="#ffd36a" opacity={0.22} />

      {/* wheels with spokes */}
      <g stroke="currentColor">
        <circle cx={62} cy={115} r={32} strokeWidth={3} />
        <circle cx={62} cy={115} r={22} strokeWidth={1.2} />
        <circle cx={62} cy={115} r={5} strokeWidth={2} />
        <path d="M62 93v44M40 115h44M47 100l30 30M77 100l-30 30" strokeWidth={1} />
        <circle cx={234} cy={115} r={32} strokeWidth={3} />
        <circle cx={234} cy={115} r={22} strokeWidth={1.2} />
        <circle cx={234} cy={115} r={5} strokeWidth={2} />
        <path d="M234 93v44M212 115h44M219 100l30 30M249 100l-30 30" strokeWidth={1} />
      </g>

      {/* fenders */}
      <path d="M36 96 A32 32 0 0 1 88 94" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
      <path d="M210 94 A32 32 0 0 1 260 98" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />

      <g stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        {/* front fork (twin tubes) */}
        <path d="M232 113 L212 50" />
        <path d="M240 110 L220 47" />
        {/* triple clamp + handlebar with grip */}
        <path d="M212 50 L222 46" />
        <path d="M214 44 L196 32 L184 34" />
        {/* main frame: steering head to engine cradle to rear axle */}
        <path d="M210 54 L172 80" />
        <path d="M62 115 L122 104 L142 100" />
        {/* seat rail */}
        <path d="M126 70 L88 76 Q74 78 72 90" />
        {/* fuel tank */}
        <path d="M128 72 Q130 56 154 53 Q178 52 188 62 Q190 68 184 72 Q158 80 134 78 Q128 76 128 72 Z" />
        {/* seat and tail unit */}
        <path d="M126 72 L98 74 Q84 74 80 64 Q92 64 104 66 Q116 68 126 70" />
        {/* engine block */}
        <path d="M142 82 L176 82 L172 102 L146 102 Z" />
        <path d="M148 88 L170 88 M147 94 L171 94" strokeWidth={1.5} />
        {/* exhaust pipe sweeping to rear */}
        <path d="M150 102 Q120 116 84 110" strokeWidth={4.5} />
        <path d="M84 113 L72 112" strokeWidth={6} />
      </g>

      {/* headlight + glow */}
      <circle cx={224} cy={52} r={7} stroke="#ffd36a" strokeWidth={3} />
      <circle cx={224} cy={52} r={2.5} fill="#ffd36a" />
      {/* taillight */}
      <path d="M80 60 L74 56" stroke="#f28c28" strokeWidth={4} strokeLinecap="round" />
    </svg>
  );
}

/** Five-spoke alloy wheel with brake disc, pair with .animate-spin-slow. */
export function AlloyWheel({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none">
      <circle cx={60} cy={60} r={56} stroke="currentColor" strokeWidth={4} />
      <circle cx={60} cy={60} r={45} stroke="currentColor" strokeWidth={1.5} />
      <circle cx={60} cy={60} r={26} stroke="currentColor" strokeWidth={1} strokeDasharray="3 4" />
      <circle cx={60} cy={60} r={10} stroke="#f28c28" strokeWidth={3} />
      {[0, 72, 144, 216, 288].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 60 60)`}>
          <path d="M55 51 L52 18 M65 51 L68 18" stroke="currentColor" strokeWidth={2.5} />
          <circle cx={60} cy={44} r={2.5} fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

/** Horizontal road with dashed center marking, section divider. */
export function RoadDivider() {
  return (
    <div className="relative flex h-12 items-center overflow-hidden" aria-hidden="true">
      <div className="h-px w-full bg-white/10" />
      <svg
        className="absolute left-1/2 top-1/2 h-10 w-full max-w-7xl -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 1200 40"
        preserveAspectRatio="xMidYMid meet"
      >
        <line
          x1="0"
          y1="20"
          x2="1200"
          y2="20"
          stroke="#f28c28"
          strokeWidth="3"
          strokeDasharray="36 28"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}
