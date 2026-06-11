import { notFound } from "next/navigation";
import { getSubBrand } from "@/lib/products";
import { reviewsForBrand } from "@/lib/reviews-seed";
import ProductVisual from "./ProductVisual";
import Reviews from "./Reviews";
import {
  TachDial,
  SpeedChevrons,
  RoadDivider,
  CarSilhouette,
  BikeSilhouette,
} from "./AutoMotifs";

export default function SubBrandPage({ slug }: { slug: string }) {
  const brand = getSubBrand(slug);
  if (!brand) notFound();

  const productOptions = brand.products.map((p) => ({ slug: p.slug, name: p.name }));
  const seed = reviewsForBrand(brand.products.map((p) => p.slug));

  return (
    <>
      {/* ============ BRAND HERO ============ */}
      <section className="bg-carbon relative overflow-hidden border-b border-white/5">
        <TachDial className="pointer-events-none absolute -right-20 top-8 hidden h-[24rem] w-[24rem] text-slate-400 opacity-[0.11] lg:block" />
        {brand.slug === "vision" ? (
          <>
            <CarSilhouette className="pointer-events-none absolute bottom-4 right-[24%] hidden h-20 w-auto text-slate-400 opacity-[0.18] lg:block" />
            <BikeSilhouette className="pointer-events-none absolute bottom-4 right-[8%] hidden h-20 w-auto text-slate-400 opacity-[0.18] lg:block" />
          </>
        ) : (
          <CarSilhouette className="pointer-events-none absolute bottom-4 right-[8%] hidden h-20 w-auto text-slate-400 opacity-[0.18] lg:block" />
        )}
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28">
          <div className="flex items-center gap-3">
            <SpeedChevrons className="h-3.5 w-10" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
              NightFury Product Line
            </p>
          </div>
          <h1 className="mt-4 font-display text-4xl font-extrabold italic text-white md:text-6xl">
            {brand.name}
          </h1>
          <p className="mt-3 text-sm font-extrabold uppercase tracking-[0.35em] text-flame-400 md:text-base">
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
              <div className="frame-flame relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-night-900/60 p-6">
                <ProductVisual product={p} />
              </div>

              {/* Copy */}
              <div>
                {p.badge && (
                  <span className="inline-block -skew-x-6 rounded bg-flame-500 px-3 py-1 text-xs font-extrabold uppercase italic tracking-wide text-white">
                    {p.badge}
                  </span>
                )}
                <h2 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">
                  {p.name}
                </h2>
                {p.variant && (
                  <p className="mt-1 text-sm font-bold uppercase tracking-wider text-slate-500">
                    {p.variant}
                  </p>
                )}
                <p className="mt-2 text-lg font-semibold text-flame-400">{p.tagline}</p>
                <p className="mt-5 leading-relaxed text-slate-300">{p.description}</p>

                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f28c28" strokeWidth="2.5">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
                  {p.specs.map((s) => (
                    <div key={s.label} className="bg-night-900 px-4 py-3.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {s.label}
                      </div>
                      <div className="mt-0.5 text-sm font-bold text-white">{s.value}</div>
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
        <Reviews products={productOptions} seedReviews={seed} />
      </div>
    </>
  );
}
