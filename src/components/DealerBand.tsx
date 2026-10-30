import { SkewButton } from "./ui";

/** Orange "For dealers" band that closes every product page and the homepage. */
export default function DealerBand({
  title,
  body,
  cta,
  href,
  id = "dealer",
  eyebrow = "// For dealers",
  secondary,
}: Readonly<{
  title: string;
  body: string;
  cta: string;
  href: string;
  id?: string;
  eyebrow?: string | null;
  /** Optional text link under the button, e.g. the Flipkart store. */
  secondary?: { href: string; label: string; external?: boolean };
}>) {
  return (
    <section id={id} className="on-orange nf-anchor bg-fury" aria-labelledby={`${id}-title`}>
      <div className="nf-container grid items-end gap-x-12 gap-y-8 py-[clamp(64px,8vw,88px)] lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          {eyebrow && (
            <p className="mb-[14px] font-mono text-[13px] font-bold tracking-[0.2em] uppercase text-carbon">{eyebrow}</p>
          )}
          <h2 id={`${id}-title`} className="nf-display text-carbon" style={{ fontSize: "clamp(48px, 6.4vw, 88px)", lineHeight: 0.86 }}>
            {title}
          </h2>
          <p className="mt-5 max-w-[560px] font-mono text-[15px] leading-[1.75] text-carbon">{body}</p>
        </div>
        <div className="flex flex-col items-start gap-[22px]">
          <SkewButton href={href} size="lg" className="whitespace-nowrap">
            {cta} &#8594;
          </SkewButton>
          {secondary && (
            <a
              href={secondary.href}
              {...(secondary.external ? { target: "_blank", rel: "noopener" } : {})}
              className="py-[10px] font-mono text-[13px] font-bold tracking-[0.08em] uppercase text-carbon hover:text-navy"
            >
              {secondary.label} &#8594;
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
