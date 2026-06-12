"use client";

import { useState } from "react";
import { BoxArtBySlug } from "./BoxArt";
import type { Product } from "@/lib/products";

/**
 * Renders the real product photo when it exists in /public/products,
 * the SVG box art if configured, and otherwise a "Coming Soon" panel.
 * Products with an image path that fails to load fall back to the
 * brand wordmark (the photo just hasn't been uploaded yet).
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

  if (product.image) {
    // Image is expected but missing: show the wordmark placeholder.
    return (
      <div className={`flex h-full w-full items-center justify-center ${className}`}>
        <span className="font-display text-xl font-bold italic text-white/30">
          Night<span className="text-flame-500/40">Fury</span>
        </span>
      </div>
    );
  }

  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-2 ${className}`}>
      <span className="font-display text-2xl font-semibold italic text-slate-400">
        Coming Soon
      </span>
      <span className="text-xs text-slate-600">Product imagery on its way</span>
    </div>
  );
}
