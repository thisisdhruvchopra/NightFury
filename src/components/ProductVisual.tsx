"use client";

import { useState } from "react";
import { BoxArtBySlug } from "./BoxArt";
import type { Product } from "@/lib/products";

export default function ProductVisual({
  product,
  className = "",
}: Readonly<{
  product: Product;
  className?: string;
}>) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = product.image && !imgFailed;

  if (showImage) {
    return (
      <div className={`flex h-full w-full items-center justify-center rounded p-4 ${className}`} style={{ background: "rgba(255,255,255,.03)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  if (product.boxArt) {
    return <BoxArtBySlug art={product.boxArt} className={`h-full w-full ${className}`} />;
  }

  return (
    <div className={`ph flex h-full w-full flex-col items-center justify-center gap-2 ${className}`} style={{ borderRadius: "4px" }}>
      <span className="text-[10px] tracking-[.18em] text-accent uppercase">&#9679; COMING SOON</span>
      <span className="text-[10px] tracking-[.14em] text-dim uppercase">PRODUCT IMAGERY ON ITS WAY</span>
    </div>
  );
}
