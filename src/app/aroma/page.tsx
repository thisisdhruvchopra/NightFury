import Link from "next/link";
import GoogleReviews from "@/components/GoogleReviews";
import Viewer360 from "@/components/Viewer360";
import ScentCard from "@/components/ScentCard";
import DealerBand from "@/components/DealerBand";
import JsonLd from "@/components/JsonLd";
import { Breadcrumb, Eyebrow, RacePlate, SkewButton, SpecTable, StatusTag } from "@/components/ui";
import { AROMA_PRODUCTS, dealerHref } from "@/data/products";
import { pageMeta, productJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Nightfury Aroma: Premium Car Perfumes",
  description:
    "Aroma Core dashboard canisters, Aroma Air spray with hanging card, and Aroma Essence hanging glass. Three formats, eleven scents. All three are on Flipkart now.",
  path: "/aroma",
});

const pad = (n: number) => String(n).padStart(2, "0");

const COMPARE: { label: string; values: [string, string, string] }[] = [
  { label: "Where it goes", values: ["Dashboard or console", "Card on the mirror", "Hangs from the mirror"] },
  { label: "Size", values: ["55 g glass canister", "55 ml atomizer", "12 ml glass bottle"] },
  { label: "Lasts", values: ["Up to 60 days", "500+ sprays", "Up to 45 days"] },
  { label: "Intensity", values: ["Steady, always on", "You control it", "Slow release"] },
  { label: "Scents", values: ["5 (Gel + Organic)", "3", "3"] },
  { label: "Best for", values: ["Set it and forget it", "A burst before every drive", "A premium look on the mirror"] },
];

export default function AromaPage() {
  return (
    <>
      {AROMA_PRODUCTS.map((p) => (
        <JsonLd key={p.slug} data={productJsonLd(p, `/aroma#${p.key}`)} />
      ))}

      {/* ============ HERO ============ */}
      <section className="bg-white">
        <Breadcrumb current="Car Perfumes" />
        <div className="nf-container grid items-center gap-14 pt-12 pb-[clamp(56px,8vw,88px)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <Eyebrow>02 {"//"} Nightfury Aroma</Eyebrow>
            <h1 className="nf-display nf-h1 mt-4">
              Smell the
              <br />
              <span className="nf-accent">difference.</span>
            </h1>
            <p className="nf-sub mt-[26px]">Three formats. Eleven scents. Zero compromise.</p>
            <p className="nf-body nf-body-lg mt-3 max-w-[520px]">
              Cabin fragrance engineered like a performance part. Premium oils, signature glass, matte-black hardware. Because the way your car smells says as much as the way it sounds.
            </p>
            <div className="mt-[34px] flex flex-wrap gap-[22px]">
              <SkewButton href="#viewer" variant="orange" size="lg">Spin the bottle &#8594;</SkewButton>
              <SkewButton href="#compare" variant="outline" size="lg">Which one is mine?</SkewButton>
            </div>
          </div>
          <nav aria-label="Aroma formats" className="flex min-w-0 flex-col gap-[14px]">
            {AROMA_PRODUCTS.map((p, i) => {
              const first = i === 0;
              return (
                <Link
                  key={p.slug}
                  href={`#${p.key}`}
                  className={`grid grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-4 rounded-[3px] px-5 py-[18px] no-underline sm:grid-cols-[56px_minmax(0,1fr)_auto] ${first ? "bg-navy text-chalk hover:text-chalk" : "border-2 border-navy bg-white"}`}
                >
                  <span className={`font-display text-[40px] leading-none font-bold ${first ? "text-fury" : "text-fury-lg"}`}>{p.num}</span>
                  <span className="min-w-0">
                    <span className="block font-display text-[clamp(24px,2.4vw,30px)] leading-none font-bold uppercase">{p.name}</span>
                    <span className={`mt-1 block font-mono text-[11px] tracking-[0.14em] uppercase ${first ? "text-[#B9BCC4]" : "text-[#4A4D57]"}`}>{p.formatLine}</span>
                  </span>
                  <StatusTag status={p.status} tone={first ? "orange" : "navy"} className="px-[9px] text-[10px] tracking-[0.12em]" />
                </Link>
              );
            })}
          </nav>
        </div>
      </section>

      {/* ============ 360 VIEWER ============ */}
      <section id="viewer" className="nf-anchor border-t-2 border-navy bg-chalk" aria-labelledby="viewer-title">
        <div className="nf-container py-[clamp(56px,7vw,80px)]">
          <div className="mb-9 grid items-end gap-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <div className="min-w-0">
              <Eyebrow>{"// 360 view"}</Eyebrow>
              <h2 id="viewer-title" className="nf-display nf-h2 mt-[14px]">
                Spin it. <span className="nf-accent">Every angle.</span>
              </h2>
            </div>
            <p className="nf-body border-l-2 border-navy pl-6">
              Drag the bottle to turn it. Pick a format and a scent to see it in colour. Real turntable photography replaces this preview at launch.
            </p>
          </div>
          <Viewer360 />
        </div>
      </section>

      {/* ============ ONE SECTION PER FORMAT ============ */}
      {AROMA_PRODUCTS.map((p, pi) => {
        let n = 0;
        return (
          <section
            key={p.slug}
            id={p.key}
            className={`nf-anchor border-t-2 border-navy ${pi % 2 ? "bg-chalk" : "bg-white"}`}
            aria-labelledby={`${p.key}-title`}
          >
            <div className="nf-container nf-section grid items-start gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
              <div className="min-w-0 lg:sticky lg:top-[108px]">
                <RacePlate num={p.num} />
                <h2 id={`${p.key}-title`} className="nf-display nf-h2-sm mt-[22px]">{p.name}</h2>
                <p className="nf-sub mt-[10px] text-[26px] text-fury-lg">{p.tagline}</p>
                <p className="nf-body mt-4">{p.description}</p>
                <SpecTable specs={p.specs} className="mt-[22px]" />
                <p className="nf-label mt-[26px] mb-[10px]">How to use</p>
                <ol className="m-0 flex list-none flex-col gap-[10px] p-0">
                  {p.steps?.map((t, i) => (
                    <li key={t} className="flex items-baseline gap-3">
                      <span className="w-7 flex-none font-display text-[22px] font-bold text-fury-lg">{pad(i + 1)}</span>
                      <span className="font-mono text-[13px] leading-[1.6]">{t}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-7">
                  <SkewButton href={dealerHref("aroma", p.slug)} variant="outline">Bulk enquiry</SkewButton>
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-9">
                {p.variants?.map((g) => (
                  <div key={g.label}>
                    {g.group && (
                      <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b-2 border-navy pb-3">
                        <h3 className="nf-display text-[34px]" style={{ letterSpacing: 0 }}>{g.group}</h3>
                        <span className="font-mono text-[13px] text-muted">{g.groupNote}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
                      {g.scents.map((sc) => {
                        n += 1;
                        return (
                          <ScentCard key={sc.slug} scent={sc} num={pad(n)} productSlug={p.slug} productName={p.name} />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ============ COMPARE ============ */}
      <section id="compare" className="nf-anchor border-t-2 border-navy bg-white" aria-labelledby="compare-title">
        <div className="nf-container nf-section">
          <Eyebrow>{"// Side by side"}</Eyebrow>
          <h2 id="compare-title" className="nf-display nf-h2-sm mt-[14px] mb-9">
            Which one <span className="nf-accent">is yours?</span>
          </h2>
          {/* Desktop and tablet: one table, equal fixed-width product columns. */}
          <div className="hidden overflow-hidden rounded-[3px] border-2 border-navy md:block">
            <table className="w-full table-fixed border-collapse text-[15px]">
              <caption className="sr-only">Aroma Core, Air and Essence compared</caption>
              <colgroup>
                <col className="w-[22%]" />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr className="bg-navy text-chalk">
                  <td className="px-6 py-5" />
                  {AROMA_PRODUCTS.map((p) => (
                    <th key={p.slug} scope="col" className="border-l border-white/10 px-6 py-5 text-left align-bottom font-normal">
                      <span className="block font-display text-[24px] leading-tight font-bold">{p.name}</span>
                      <span className="mt-1 block font-mono text-[11px] font-semibold tracking-[0.12em] text-navy-soft uppercase">{p.formatLine}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={row.label} className={`border-b border-hairline last:border-b-0 ${i % 2 ? "bg-chalk" : "bg-white"}`}>
                    <th scope="row" className="px-6 py-4 text-left align-top font-mono text-[11px] font-bold tracking-[0.14em] text-muted uppercase">{row.label}</th>
                    {row.values.map((v, j) => (
                      <td key={j} className="border-l border-hairline px-6 py-4 align-top leading-[1.45] text-carbon">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phones: the same comparison as one card per product, no sideways scrolling. */}
          <div className="grid gap-4 md:hidden">
            {AROMA_PRODUCTS.map((p, j) => (
              <section key={p.slug} aria-label={p.name} className="overflow-hidden rounded-[3px] border-2 border-navy bg-white">
                <div className="bg-navy px-5 py-4 text-chalk">
                  <h3 className="nf-display text-[22px]">{p.name}</h3>
                  <p className="m-0 mt-1 font-mono text-[11px] font-semibold tracking-[0.12em] text-navy-soft uppercase">{p.formatLine}</p>
                </div>
                <dl className="m-0">
                  {COMPARE.map((row) => (
                    <div key={row.label} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-4 border-b border-hairline px-5 py-3 last:border-b-0">
                      <dt className="font-mono text-[11px] font-bold tracking-[0.14em] text-muted uppercase">{row.label}</dt>
                      <dd className="m-0 text-[15px] leading-[1.45] text-carbon">{row.values[j]}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews />

      <DealerBand
        title="Put Aroma on your counter."
        body="Eleven scents, retail-ready packaging, and a format for every customer. Bulk pricing for registered dealers."
        cta="Bulk enquiry"
        href={dealerHref("aroma")}
      />
    </>
  );
}
