"use client";

import { useState } from "react";
import { BoxArtBySlug } from "./BoxArt";
import type { Product } from "@/lib/products";

/**
 * Renders the real product photo when it exists in /public/products,
 * and falls back to the on-brand SVG box art otherwise.
 */
export default function ProductVisual({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = product.image && !imgFailed;

  if (showImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={product.image}
        alt={product.name}
        className={`h-full w-full object-contain ${className}`}
        onError={() => setImgFailed(true)}
      />
    );
  }

  if (product.boxArt) {
    return <BoxArtBySlug art={product.boxArt} className={`h-full w-full ${className}`} />;
  }

  return (
    <div className={`flex h-full w-full items-center justify-center ${className}`}>
      <span className="font-display text-xl font-extrabold italic text-white/30">
        Night<span className="text-flame-500/40">Fury</span>
      </span>
    </div>
  );
}
