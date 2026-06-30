import { notFound } from "next/navigation";
import { getSubBrand } from "@/lib/products";
import ProductVisual from "./ProductVisual";
import ProductGallery from "./ProductGallery";
import ProductDetail from "./ProductDetail";
import Reviews from "./Reviews";

const TAGLINES: Record<string, string> = {
  vision: "DRIVE THE DIFFERENCE",
  aroma: "SMELL THE DIFFERENCE",
  care: "FEEL THE DIFFERENCE",
};

export default function SubBrandPage({ slug }: Readonly<{ slug: string }>) {
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
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute"
          style={{ top: "-6%", right: "-10%", width: "60%", height: "24px", background: "var(--color-accent)", opacity: 0.08, transform: "rotate(-18deg)" }}
        />
        <div className="relative mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-28">
          <div
            className="text-[11px] tracking-[.2em] text-accent uppercase"
            style={{ fontFamily: "var(--font-spline), monospace" }}
          >
            NIGHTFURY PRODUCT LINE
          </div>
          <h1
            className="mt-4 text-[36px] font-extrabold italic uppercase leading-[.88] tracking-tight md:text-[52px] lg:text-[64px]"
            style={{ transform: "skewX(-4deg)" }}
          >
            {brand.name.replace("NightFury ", "")}
          </h1>
          <div className="mt-3 text-sm font-bold tracking-[.14em] text-accent uppercase">
            {TAGLINES[brand.slug]}
          </div>
          <p
            className="mt-6 max-w-2xl text-sm leading-[1.7] text-muted"
            style={{ fontFamily: "var(--font-spline), monospace" }}
          >
            {brand.intro}
          </p>
        </div>
      </section>

      <div className="carbon-trim" />

      {/* ============ PRODUCTS ============ */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-[1280px] space-y-12 px-5 md:space-y-24 md:px-10">
          {brand.products.map((p, idx) => (
            <article
              key={p.slug}
              id={p.slug}
              className={`nf-card product-article relative overflow-hidden ${idx % 2 === 1 ? "reverse" : ""}`}
              style={{ background: "linear-gradient(150deg, #15100c, #0A0A0B 60%)" }}
            >
              {/* Image side */}
              <div
                className="product-article-img relative"
                style={{ minHeight: "360px" }}
              >
                <div className="absolute inset-0" style={{ background: "radial-gradient(56% 56% at 50% 50%, rgba(255,85,0,.2), transparent 70%)" }} />
                <div className="absolute inset-6 md:inset-8">
                  {p.mediaDir ? (
                    <ProductGallery mediaDir={p.mediaDir} productName={p.name} />
                  ) : (
                    <ProductVisual product={p} />
                  )}
                </div>
              </div>

              {/* Detail side */}
              <div className="product-article-detail relative z-10 px-5 py-8 md:px-10 md:py-11">
                <ProductDetail product={p} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="carbon-trim" />

      {/* ============ REVIEWS ============ */}
      <div className="border-t border-border">
        <Reviews products={productOptions} />
      </div>
    </>
  );
}
