"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex h-9 w-9 items-center justify-center border border-border-strong text-muted transition-colors hover:border-accent hover:text-accent"
      style={{ borderRadius: "2px" }}
      aria-label={`Cart (${itemCount} items)`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
      </svg>
      {itemCount > 0 && (
        <span
          className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center bg-accent text-[9px] font-bold text-carbon"
          style={{ borderRadius: "2px" }}
        >
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
}
