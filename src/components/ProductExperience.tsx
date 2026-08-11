"use client";

import { useState } from "react";
import type { Fragrance, Product } from "@/lib/products";
import ProductVisual from "./ProductVisual";
import ProductGallery from "./ProductGallery";
import ProductDetail from "./ProductDetail";

const mono = { fontFamily: "var(--font-spline), monospace" } as const;
/** The product-level visual, used when this product has no per-scent photography. */
function ProductMedia({ product }: Readonly<{ product: Product }>) {
  if (product.mediaDir) {
    return <ProductGallery mediaDir={product.mediaDir} productName={product.name} />;
  }
  return <ProductVisual product={product} />;
}

/** Shows the selected scent's photo, falling back to a placeholder if the file isn't there yet. */
function FragrancePhoto({ fragrance }: Readonly<{ fragrance: Fragrance }>) {
  const [failed, setFailed] = useState(false);

  // Reset the error flag when the shopper switches scent.
  const [lastName, setLastName] = useState(fragrance.name);
  if (lastName !== fragrance.name) {
    setLastName(fragrance.name);
    setFailed(false);
  }

  if (!fragrance.image || failed) {
    return (
      <div className="ph flex h-full w-full items-center justify-center" style={{ borderRadius: "4px" }}>
        <div className="px-6 text-center">
          <div className="text-[10px] tracking-[.18em] text-accent uppercase" style={mono}>
            &#9679; {fragrance.name}
          </div>
          <div className="mt-1 text-[10px] tracking-[.14em] text-dim uppercase" style={mono}>
            Photo on its way
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden"
        style={{ borderRadius: "4px", background: "rgba(255,255,255,.02)", minHeight: "300px" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fragrance.image}
          alt={fragrance.name}
          onError={() => setFailed(true)}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div
        className="mt-3 text-center text-[10px] font-medium tracking-[.16em] text-dim uppercase"
        style={mono}
      >
        {fragrance.name}
      </div>
    </div>
  );
}

export default function ProductExperience({ product }: Readonly<{ product: Product }>) {
  const [active, setActive] = useState<Fragrance | null>(
    product.fragranceTypes?.[0]?.fragrances[0] ?? null,
  );

  return (
    <article
      className="nf-card product-article relative overflow-hidden"
      style={{ background: "linear-gradient(150deg, #15100c, #0A0A0B 60%)" }}
    >
      {/* Image side */}
      <div className="product-article-img relative" style={{ minHeight: "360px" }}>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(56% 56% at 50% 50%, rgba(255,85,0,.2), transparent 70%)" }}
        />
        <div className="absolute inset-6 md:inset-8">
          {active ? <FragrancePhoto fragrance={active} /> : <ProductMedia product={product} />}
        </div>
      </div>

      {/* Detail side */}
      <div className="product-article-detail relative z-10 px-5 py-8 md:px-10 md:py-11">
        <ProductDetail product={product} onFragranceChange={setActive} />
      </div>
    </article>
  );
}
