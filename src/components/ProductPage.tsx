import Link from "next/link";
import type { Product, SubBrand } from "@/lib/products";
import ProductExperience from "./ProductExperience";
import FragranceLibrary from "./FragranceLibrary";
import Reviews from "./Reviews";

import { body, display, mono } from "@/lib/fonts";

export default function ProductPage({
  brand,
  product,
}: Readonly<{ brand: SubBrand; product: Product }>) {
  const brandShort = brand.name.replace("NightFury ", "");
  const siblings = brand.products.filter((p) => p.slug !== product.slug && p.pageSlug);

  return (
    <>
      {/* ============ BREADCRUMB ============ */}
      <div className="border-b border-border">
        <nav
          className="mx-auto flex max-w-[1280px] items-center gap-2 px-5 py-4 text-[12px] font-medium tracking-[.12em] uppercase md:px-10"
          style={mono}
          aria-label="Breadcrumb"
        >
          <Link href={`/${brand.slug}`} className="text-dim transition-colors hover:text-accent">
            {brandShort}
          </Link>
          <span className="text-faint">/</span>
          <span className="text-chalk">{product.name}</span>
        </nav>
      </div>

      {/* ============ PRODUCT ============ */}
      <section className="py-8 md:py-14">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10">
          <ProductExperience product={product} />
        </div>
      </section>

      <div className="carbon-trim" />

      {/* ============ FRAGRANCE RANGE ============ */}
      {product.fragranceTypes && (
        <>
          <FragranceLibrary types={product.fragranceTypes} />
          <div className="carbon-trim" />
        </>
      )}

      {/* ============ FEATURES ============ */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10">
          <h2
            className="text-[26px] font-extrabold italic uppercase leading-none tracking-tight md:text-[36px]"
            style={{ ...display, transform: "skewX(-4deg)" }}
          >
            What makes it different
          </h2>
          <div className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f) => (
              <div key={f} className="flex items-start gap-3 border-t border-border pt-4">
                <span className="mt-[6px] text-[10px] text-accent">&#9670;</span>
                <span className="text-[16px] font-medium leading-[1.6] text-muted" style={body}>
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="carbon-trim" />

      {/* ============ OTHER PRODUCTS IN THE LINE ============ */}
      {siblings.length > 0 && (
        <section className="border-t border-border py-12 md:py-16">
          <div className="mx-auto max-w-[1280px] px-5 md:px-10">
            <div className="text-[12px] font-bold tracking-[.18em] text-accent uppercase" style={mono}>
              More from {brandShort}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${brand.slug}/${s.pageSlug}`}
                  className="nf-card group flex items-center justify-between px-5 py-6 transition-colors hover:border-accent"
                  style={{ background: "linear-gradient(150deg, #15100c, #0A0A0B 60%)" }}
                >
                  <div>
                    <div
                      className="text-[22px] font-bold tracking-[.01em] text-chalk transition-colors group-hover:text-accent"
                      style={display}
                    >
                      {s.name}
                    </div>
                    <div className="mt-1.5 text-[12px] font-medium tracking-[.1em] text-dim uppercase" style={mono}>
                      {s.variant}
                    </div>
                  </div>
                  <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ REVIEWS ============ */}
      <div className="border-t border-border">
        <Reviews
          products={[{ slug: product.slug, name: product.name, wattOptions: product.wattOptions }]}
        />
      </div>
    </>
  );
}
