import Link from "next/link";
import type { Status } from "@/data/products";

/* Small presentational building blocks shared by every page. */

type BtnVariant = "dark" | "orange" | "outline";

export function SkewButton({
  href,
  children,
  variant = "dark",
  size,
  block,
  external,
  className = "",
  ariaLabel,
}: Readonly<{
  href: string;
  children: React.ReactNode;
  variant?: BtnVariant;
  size?: "lg";
  block?: boolean;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}>) {
  const cls = `nf-btn nf-btn--${variant} ${size === "lg" ? "nf-btn--lg" : ""} ${block ? "nf-btn--block" : ""} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={cls} aria-label={ariaLabel}>
        <span>{children}</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      <span>{children}</span>
    </Link>
  );
}

export function Eyebrow({ children, className = "" }: Readonly<{ children: React.ReactNode; className?: string }>) {
  return <p className={`nf-eyebrow ${className}`}>{children}</p>;
}

/** Heading with an orange accent tail, e.g. "Smell the <accent>difference.</accent>" */
export function SectionHeading({
  as: Tag = "h2",
  lead,
  accent,
  size = "nf-h2",
  className = "",
  breakLine,
}: Readonly<{
  as?: "h1" | "h2" | "h3";
  lead: string;
  accent?: string;
  size?: string;
  className?: string;
  breakLine?: boolean;
}>) {
  return (
    <Tag className={`nf-display ${size} ${className}`}>
      {lead}
      {accent && (
        <>
          {breakLine ? <br /> : " "}
          <span className="nf-accent">{accent}</span>
        </>
      )}
    </Tag>
  );
}

export function Breadcrumb({ current }: Readonly<{ current: string }>) {
  return (
    <nav aria-label="Breadcrumb" className="nf-container pt-7 font-mono text-[12px] tracking-[0.12em] uppercase text-muted">
      <Link href="/" className="no-underline">Home</Link>
      <span aria-hidden="true"> / </span>
      <span aria-current="page" className="font-bold text-carbon">{current}</span>
    </nav>
  );
}

/** "N° 01" badge: chalk fill, 3px navy border, 5px orange hard shadow. */
export function RacePlate({ num, className = "" }: Readonly<{ num: string; className?: string }>) {
  return (
    <div
      className={`inline-block border-[3px] border-navy bg-chalk px-[14px] py-[6px] font-display text-[22px] leading-none font-extrabold italic shadow-[5px_5px_0_#FF5500] ${className}`}
    >
      N&#176; {num}
    </div>
  );
}

/** Navy flag on photo slots, e.g. "N° 001 Flagship". */
export function PlateFlag({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="absolute top-[18px] left-[18px] bg-navy px-[14px] py-[6px] font-display text-[18px] font-extrabold italic text-chalk shadow-[4px_4px_0_#FF5500]">
      {children}
    </div>
  );
}

/** Two statuses only: live and coming-soon. */
export function StatusTag({
  status,
  label,
  tone = "navy",
  className = "",
}: Readonly<{ status: Status; label?: string; tone?: "navy" | "orange"; className?: string }>) {
  const text = label ?? (status === "live" ? "Live" : "Coming soon");
  const colours = tone === "orange" ? "bg-fury text-carbon" : "bg-navy text-white";
  return (
    <span
      className={`inline-block px-[11px] py-[5px] font-mono text-[11px] font-bold tracking-[0.14em] uppercase ${colours} ${className}`}
    >
      {text}
    </span>
  );
}

export function SpecTable({
  specs,
  className = "",
}: Readonly<{ specs: { label: string; value: string }[]; className?: string }>) {
  return (
    <dl className={`m-0 border-t-2 border-navy ${className}`}>
      {specs.map((s) => (
        <div
          key={s.label}
          className="flex justify-between gap-4 border-b border-rule py-[11px] font-mono text-[13px]"
        >
          <dt className="text-[11px] font-bold tracking-[0.1em] uppercase text-muted">{s.label}</dt>
          <dd className="m-0 text-right font-semibold">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Striped product-photo slot. The bracketed label stays until real photos exist. */
export function PhotoSlot({
  label,
  flag,
  tag,
  white,
  className = "h-[clamp(300px,40vw,440px)]",
}: Readonly<{ label: string; flag?: string; tag?: React.ReactNode; white?: boolean; className?: string }>) {
  return (
    <div className={`nf-ph ${white ? "nf-ph--white" : ""} min-w-0 ${className}`}>
      {flag && <PlateFlag>{flag}</PlateFlag>}
      {tag && <div className="absolute top-[18px] left-[18px]">{tag}</div>}
      <span className="font-mono text-[13px] font-semibold tracking-[0.16em] uppercase text-muted">{label}</span>
    </div>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  gauge: (<><path d="M12 14l4-4" /><path d="M3.3 16a9 9 0 1 1 17.4 0" /><circle cx="12" cy="14" r="1.5" /></>),
  shield: (<><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>),
  shieldPlain: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />,
  pin: (<><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>),
  canbus: (<><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 10h4M7 14h2M15 10l2 2-2 2" /></>),
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>),
  drop: <path d="M12 3c3 4 6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 3-6 6-10z" />,
  dropShine: (<><path d="M12 3c3 4 6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 3-6 6-10z" /><path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" /></>),
  spark: <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" />,
};

export type IconName = keyof typeof ICONS;

export function FeatureCard({
  icon,
  title,
  children,
  white,
}: Readonly<{ icon: IconName; title: string; children: React.ReactNode; white?: boolean }>) {
  return (
    <div className={`nf-card p-6 md:p-7 ${white ? "bg-white" : ""}`}>
      <div className="flex h-[52px] w-[52px] items-center justify-center bg-navy md:h-14 md:w-14">
        <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF5500" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {ICONS[icon]}
        </svg>
      </div>
      <h3 className="nf-display mt-5 text-[26px] leading-none md:text-[28px]" style={{ letterSpacing: 0 }}>{title}</h3>
      <p className="nf-body mt-3 text-[13px] leading-[1.7]">{children}</p>
    </div>
  );
}

/** Small orange square bullet used in the hero and trust strip. */
export function Pip({ size = 9 }: Readonly<{ size?: number }>) {
  return <span aria-hidden="true" className="inline-block flex-none bg-fury" style={{ width: size, height: size }} />;
}
