"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import CartIcon from "./CartIcon";

const LINKS = [
  { href: "/vision", label: "Vision" },
  { href: "/aroma", label: "Aroma" },
  { href: "/care", label: "Care" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Marquee announcement bar */}
      <div className="marquee-bar">
        <div className="marquee-track">
          <span>&#9733; 18 MONTHS WARRANTY ON LIGHTING</span>
          <span>&#9679; IP67 WATER &amp; DUST RATED</span>
          <span>&#9733; 100% BATCH QUALITY TESTED</span>
          <span>&#9679; VISION &middot; AROMA &middot; CARE</span>
          <span>&#9733; DRIVE THE DIFFERENCE</span>
          <span>&#9733; 18 MONTHS WARRANTY ON LIGHTING</span>
          <span>&#9679; IP67 WATER &amp; DUST RATED</span>
          <span>&#9733; 100% BATCH QUALITY TESTED</span>
          <span>&#9679; VISION &middot; AROMA &middot; CARE</span>
          <span>&#9733; DRIVE THE DIFFERENCE</span>
        </div>
      </div>

      {/* Nav */}
      <header
        className="sticky top-0 z-50 border-b border-border"
        style={{ background: "rgba(10,10,11,.86)", backdropFilter: "blur(12px)" }}
      >
        <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-10">
          <div className="flex items-center gap-3">
            <Logo />
            <span
              className="ml-2 hidden text-[9px] font-semibold tracking-[.28em] text-dim uppercase md:block"
              style={{ fontFamily: "var(--font-spline), monospace" }}
            >
              Drive The Difference
            </span>
          </div>

          <div className="hidden items-center gap-8 text-sm font-bold tracking-[.14em] uppercase md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nf-link ${
                  pathname === l.href ? "text-accent" : "text-chalk"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <CartIcon />
            <a href="#contact" className="nf-btn nf-btn-primary" style={{ padding: "9px 16px", fontSize: "14px" }}>
              <span>Find Nearby Dealer</span>
            </a>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <CartIcon />
          </div>
          <button
            className="text-chalk md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </nav>

        {open && (
          <div className="border-t border-border bg-panel px-5 py-3 md:hidden">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 text-sm font-bold uppercase tracking-wider ${
                  pathname === l.href ? "text-accent" : "text-chalk"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block px-3 py-2.5 text-sm font-bold uppercase tracking-wider text-accent"
            >
              Find Nearby Dealer
            </a>
          </div>
        )}
      </header>

      <div className="carbon-trim" />
    </>
  );
}
