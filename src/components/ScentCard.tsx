import FlipkartButton from "./FlipkartButton";
import { notifyHref, type Scent } from "@/data/products";

export default function ScentCard({
  scent,
  num,
  productSlug,
  productName,
  showDescription,
}: Readonly<{
  scent: Scent;
  num: string;
  productSlug: string;
  productName: string;
  showDescription?: boolean;
}>) {
  const { colors } = scent;
  return (
    <article
      className="flex min-w-0 flex-col rounded-[3px] border-2 border-navy p-5"
      style={{ backgroundColor: colors.tint }}
    >
      <div className="flex items-center justify-between gap-[10px]">
        <span aria-hidden="true" className="h-[34px] w-[34px] border-2 border-navy" style={{ backgroundColor: colors.liquid }} />
        <span className="font-mono text-[11px] font-bold tracking-[0.12em]" style={{ color: colors.deep }}>{num}</span>
      </div>
      <h4 className="nf-display mt-4 text-[34px] leading-[0.95]" style={{ color: colors.deep, letterSpacing: 0 }}>
        {scent.name}
      </h4>
      <p className="mt-[6px] font-display text-[17px] font-extrabold italic uppercase">{scent.character}</p>
      {showDescription && scent.description && (
        <p className="mt-2 font-mono text-[12px] leading-[1.6] text-[#262932]">{scent.description}</p>
      )}
      <dl className="mt-[14px] flex flex-col gap-[6px] font-mono text-[12px] leading-[1.45]">
        {(["top", "heart", "base"] as const).map((k) => (
          <div key={k}>
            <dt className="inline font-bold uppercase" style={{ color: colors.deep }}>{k} </dt>
            <dd className="inline m-0">{scent.notes[k]}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-auto pt-[18px]">
        <FlipkartButton
          look="card"
          url={scent.flipkartUrl}
          name={`${productName} ${scent.name}`}
          notifyHref={notifyHref(productSlug, scent.slug)}
        />
      </div>
    </article>
  );
}
