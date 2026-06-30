"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import Logo from "./Logo";
import CartIcon from "./CartIcon";

const mono = { fontFamily: "var(--font-spline), monospace" } as const;

const NAV_ITEMS = [
  {
    label: "Lighting",
    slug: "vision",
    href: "/vision",
    tagline: "Drive the Difference",
    products: [
      { name: "4-Wheeler LED Headlight", href: "/vision#led-4w", spec: "240W / 300W · Pair Pack" },
      { name: "2-Wheeler LED Headlight", href: "/vision#led-2w", spec: "60W · IP67 · H4 Universal" },
    ],
  },
  {
    label: "Car Perfumes",
    slug: "aroma",
    href: "/aroma",
    tagline: "Smell the Difference",
    products: [
      { name: "Aroma Essence", href: "/aroma#aroma-hanging", spec: "Hanging Bottle · 15ml" },
      { name: "Aroma Air", href: "/aroma#aroma-air", spec: "Spray + Card · 50ml" },
      { name: "Aroma Core", href: "/aroma#aroma-core", spec: "Gel Freshener · 120g" },
    ],
  },
  {
    label: "Car Care",
    slug: "care",
    href: "/care",
    tagline: "Feel the Difference",
    products: [
      { name: "Microfiber Cloth", href: "/care#care-microfiber", spec: "380 GSM · Pack of 1/2/3" },
      { name: "Car Wet Wipes", href: "/care#care-wipes", spec: "40 Wipes · pH-Balanced" },
    ],
  },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openDropdown(slug: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(slug);
  }

  function closeDropdown() {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  }

  function keepDropdown() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  function isActive(slug: string) {
    return pathname.startsWith(`/${slug}`);
  }

  return (
    <>
      {/* Marquee */}
      <div className="marquee-bar">
        <div className="marquee-track">
          <span>&#9733; 18 MONTHS WARRANTY ON LIGHTING</span>
          <span>&#9679; IP67 WATER &amp; DUST RATED</span>
          <span>&#9733; 100% BATCH QUALITY TESTED</span>
          <span>&#9679; LIGHTING &middot; CAR PERFUMES &middot; CAR CARE</span>
          <span>&#9733; DRIVE THE DIFFERENCE</span>
          <span>&#9733; 18 MONTHS WARRANTY ON LIGHTING</span>
          <span>&#9679; IP67 WATER &amp; DUST RATED</span>
          <span>&#9733; 100% BATCH QUALITY TESTED</span>
          <span>&#9679; LIGHTING &middot; CAR PERFUMES &middot; CAR CARE</span>
          <span>&#9733; DRIVE THE DIFFERENCE</span>
        </div>
      </div>

      {/* Nav */}
      <header
        className="sticky top-0 z-50 border-b border-border"
        style={{ background: "rgba(10,10,11,.92)", backdropFilter: "blur(16px)" }}
      >
        <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-10">

          {/* Logo */}
          <Logo />

          {/* Desktop nav links with dropdowns */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.slug}
                className="relative"
                onMouseEnter={() => openDropdown(item.slug)}
                onMouseLeave={closeDropdown}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1.5 rounded-none px-4 py-5 text-[13px] font-bold tracking-[.1em] uppercase transition-colors ${
                    isActive(item.slug) ? "text-accent" : "text-chalk hover:text-accent"
                  }`}
                >
                  {item.label}
                  <svg
                    width="10" height="10" viewBox="0 0 10 10" fill="none"
                    className={`transition-transform duration-200 ${activeDropdown === item.slug ? "rotate-180" : ""}`}
                  >
                    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                {/* Dropdown */}
                {activeDropdown === item.slug && (
                  <div
                    className="absolute left-0 top-full min-w-[260px] border border-border"
                    style={{
                      background: "rgba(10,10,11,.98)",
                      backdropFilter: "blur(16px)",
                      borderRadius: "3px",
                      boxShadow: "0 16px 40px rgba(0,0,0,.6)",
                    }}
                    onMouseEnter={keepDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    {/* Brand header */}
                    <Link
                      href={item.href}
                      className="flex items-center justify-between border-b border-border px-4 py-3 transition-colors hover:bg-raised"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div>
                        <div className="text-[11px] font-bold tracking-[.06em] text-chalk">
                          NightFury {item.label === "Lighting" ? "Vision" : item.label === "Car Perfumes" ? "Aroma" : "Care"}
                        </div>
                        <div className="text-[10px] tracking-[.12em] text-accent uppercase" style={mono}>
                          {item.tagline}
                        </div>
                      </div>
                      <span className="text-[10px] tracking-[.1em] text-dim uppercase" style={mono}>
                        View All &rarr;
                      </span>
                    </Link>

                    {/* Products */}
                    <div className="py-1">
                      {item.products.map((p) => (
                        <Link
                          key={p.href}
                          href={p.href}
                          className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-raised group"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div>
                            <div className="text-[13px] font-semibold text-chalk transition-colors group-hover:text-accent">
                              {p.name}
                            </div>
                            <div className="mt-0.5 text-[10px] tracking-[.06em] text-dim" style={mono}>
                              {p.spec}
                            </div>
                          </div>
                          <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">&#9670;</span>
                        </Link>
                      ))}
                    </div>

                    {/* Accent bottom border */}
                    <div className="h-[2px] bg-accent" style={{ opacity: 0.4 }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: cart + CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <CartIcon />
            <a href="#contact" className="nf-btn nf-btn-primary" style={{ padding: "9px 16px", fontSize: "13px" }}>
              <span>Find Dealer</span>
            </a>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <CartIcon />
            <button
              className="text-chalk"
              onClick={() => { setMobileOpen(!mobileOpen); setMobileExpanded(null); }}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-border bg-panel md:hidden">

            {/* Category accordion */}
            {NAV_ITEMS.map((item) => (
              <div key={item.slug} className="border-b border-border">
                {/* Category header row */}
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-5 py-4"
                  onClick={() => setMobileExpanded(mobileExpanded === item.slug ? null : item.slug)}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-bold tracking-[.1em] uppercase ${isActive(item.slug) ? "text-accent" : "text-chalk"}`}
                    >
                      {item.label}
                    </span>
                    <span className="text-[10px] tracking-[.12em] text-dim uppercase" style={mono}>
                      {item.tagline}
                    </span>
                  </div>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className={`transition-transform duration-200 ${mobileExpanded === item.slug ? "rotate-180" : ""}`}
                  >
                    <path d="M4 6l4 4 4-4" stroke={isActive(item.slug) ? "var(--color-accent)" : "var(--color-muted)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Expanded products */}
                {mobileExpanded === item.slug && (
                  <div className="border-t border-border bg-raised">
                    {/* View all link */}
                    <Link
                      href={item.href}
                      onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                      className="flex items-center justify-between px-5 py-3 text-[11px] tracking-[.14em] text-accent uppercase"
                      style={mono}
                    >
                      View all {item.label}
                      <span>&rarr;</span>
                    </Link>
                    {/* Individual products */}
                    {item.products.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                        className="flex items-center justify-between border-t border-border px-5 py-3.5 transition-colors active:bg-raised"
                      >
                        <div>
                          <div className="text-[13px] font-semibold text-chalk">{p.name}</div>
                          <div className="mt-0.5 text-[10px] tracking-[.06em] text-dim" style={mono}>{p.spec}</div>
                        </div>
                        <span className="text-accent text-[12px]">&#9670;</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Find Dealer */}
            <div className="px-5 py-4">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="nf-btn nf-btn-primary w-full justify-center"
                style={{ padding: "12px 20px", fontSize: "14px" }}
              >
                <span>Find Nearby Dealer</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <div className="carbon-trim" />
    </>
  );
}
