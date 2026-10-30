/** Full-width navy divider that opens a product line on the homepage. */
export default function CategoryBand({
  id,
  title,
  tagline,
}: Readonly<{ id: string; title: string; tagline: string }>) {
  return (
    <div id={id} className="nf-anchor bg-navy text-chalk">
      <div className="nf-container flex flex-col items-center gap-4 py-14 text-center">
        <h2 className="nf-display text-chalk" style={{ fontSize: "clamp(56px, 8vw, 96px)", lineHeight: 0.86 }}>
          {title}
        </h2>
        <span className="mr-[-0.32em] font-mono text-[13px] font-bold tracking-[0.32em] uppercase text-fury">
          {tagline}
        </span>
      </div>
    </div>
  );
}
