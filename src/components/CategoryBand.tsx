import Link from "next/link";

/** Navy divider that opens a product line on the homepage, with a link to its page. */
export default function CategoryBand({
  id,
  title,
  tagline,
  kind,
  href,
  body,
}: Readonly<{ id: string; title: string; tagline: string; kind?: string; href?: string; body?: string }>) {
  return (
    <div id={id} className="nf-anchor on-navy bg-navy text-chalk">
      <div className="nf-container grid items-end gap-6 py-[clamp(48px,6vw,72px)] md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          {kind && (
            <p className="m-0 font-mono text-[12px] font-bold tracking-[0.22em] uppercase text-fury">
              {kind} <span className="text-navy-soft">{"//"} {tagline}</span>
            </p>
          )}
          <h2 className="nf-display mt-3 text-chalk" style={{ fontSize: "clamp(40px, 5vw, 68px)", lineHeight: 1 }}>
            {title}
          </h2>
          {body && <p className="nf-body mt-4 max-w-[520px] text-navy-soft">{body}</p>}
        </div>
        {href && (
          <Link href={href} className="nf-textlink self-end text-chalk hover:text-fury">
            View all {title} <span aria-hidden="true">&#8594;</span>
          </Link>
        )}
      </div>
    </div>
  );
}
