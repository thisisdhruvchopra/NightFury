import { notFound } from "next/navigation";
import { getSubBrand } from "@/lib/products";
import ProductVisual from "./ProductVisual";
import ProductDetail from "./ProductDetail";
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

  const productOptions = brand.products.map((p) => ({
    slug: p.slug,
    name: p.name,
    wattOptions: p.wattOptions,
  }));

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
              <ProductDetail product={p} />
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
