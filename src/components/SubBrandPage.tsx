import { notFound } from "next/navigation";
import { getSubBrand } from "@/lib/products";
import ProductVisual from "./ProductVisual";
import Reviews from "./Reviews";
import {
  TachDial,
  RoadDivider,
  CarSilhouette,
  BikeSilhouette,
} from "./AutoMotifs";

export default function SubBrandPage({ slug }: { slug: string }) {
  const brand = getSubBrand(slug);
  if (!brand) notFound();

  const productOptions = brand.products.map((p) => ({ slug: p.slug, name: p.name }));

  return (
    <>
      {/* ============ BRAND HERO ============ */}
      <section className="bg-carbon relative overflow-hidden border-b border-white/5">
        <TachDial className="pointer-events-none absolute -right-20 top-8 hidden h-[24rem] w-[24rem] text-slate-400 opacity-[0.1] lg:block" />
        {brand.slug === "vision" ? (
          <>
            <CarSilhouette className="pointer-events-none absolute bottom-4 right-[24%] hidden h-20 w-auto text-slate-400 opacity-[0.18] lg:block" />
            <BikeSilhouette className="pointer-events-none absolute bottom-4 right-[8%] hidden h-20 w-auto text-slate-400 opacity-[0.18] lg:block" />
          </>
        ) : (
          <CarSilhouette className="pointer-events-none absolute bottom-4 right-[8%] hidden h-20 w-auto text-slate-400 opacity-[0.18] lg:block" />
        )}
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            NightFury product line
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            {brand.name}
          </h1>
          <p className="mt-3 text-base font-medium text-flame-400">
            {brand.tagline}
          </p>
          <p className="mt-6 max-w-2xl leading-relaxed text-slate-300">
            {brand.intro}
          </p>
        </div>
      </section>

      {/* ============ PRODUCTS ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl space-y-24 px-5">
          {brand.products.map((p, idx) => (
            <article
              key={p.slug}
              id={p.slug}
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Visual */}
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-night-900/60 p-6">
                <ProductVisual product={p} />
              </div>

              {/* Copy */}
              <div>
                {p.badge && (
                  <span className="inline-block rounded-full bg-flame-500/15 px-3 py-1 text-xs font-semibold text-flame-400">
                    {p.badge}
                  </span>
                )}
                <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                  {p.name}
                </h2>
                {p.variant && (
                  <p className="mt-1 text-sm text-slate-500">{p.variant}</p>
                )}
                <p className="mt-2 text-lg font-medium text-flame-400">{p.tagline}</p>
                <p className="mt-5 leading-relaxed text-slate-300">{p.description}</p>

                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f28c28" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
                  {p.specs.map((s) => (
                    <div key={s.label} className="bg-night-900 px-4 py-3.5">
                      <div className="text-xs text-slate-500">{s.label}</div>
                      <div className="mt-0.5 text-sm font-semibold text-white">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="relative">
        {brand.slug === "vision" ? (
          <BikeSilhouette className="absolute -top-[4rem] right-[12%] hidden h-16 w-auto text-slate-500 opacity-50 md:block" />
        ) : (
          <CarSilhouette className="absolute -top-[4rem] right-[12%] hidden h-16 w-auto text-slate-500 opacity-50 md:block" />
        )}
        <RoadDivider />
      </div>

      {/* ============ REVIEWS ============ */}
      <div className="border-t border-white/5 bg-night-900/40">
        <Reviews products={productOptions} />
      </div>
    </>
  );
}
