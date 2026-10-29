import { SkewButton } from "./ui";

/** Orange "For dealers" band that closes every product page. */
export default function DealerBand({
  title,
  body,
  cta,
  href,
  id = "dealer",
}: Readonly<{ title: string; body: string; cta: string; href: string; id?: string }>) {
  return (
    <section id={id} className="on-orange nf-anchor bg-fury" aria-labelledby={`${id}-title`}>
      <div className="nf-container grid items-end gap-10 py-[clamp(64px,8vw,96px)] lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <p className="mb-[14px] font-mono text-[13px] font-bold tracking-[0.2em] uppercase text-carbon">{"// For dealers"}</p>
          <h2 id={`${id}-title`} className="nf-display text-carbon" style={{ fontSize: "clamp(42px, 6vw, 88px)" }}>
            {title}
          </h2>
          <p className="mt-[22px] max-w-[600px] font-mono text-[15px] leading-[1.75] text-carbon">{body}</p>
        </div>
        <div>
          <SkewButton href={href} size="lg" className="whitespace-nowrap">
            {cta} &#8594;
          </SkewButton>
        </div>
      </div>
    </section>
  );
}
