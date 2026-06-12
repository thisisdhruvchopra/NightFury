"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/vision", label: "Vision" },
  { href: "/aroma", label: "Aroma" },
  { href: "/care", label: "Care" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-night-950/85 backdrop-blur-md">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Logo />

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                  active
                    ? "text-flame-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <a
          href="#contact"
          className="hidden rounded-md bg-flame-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-flame-600 md:block"
        >
          Find Nearby Dealer
        </a>

        <button
          className="md:hidden text-slate-200"
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
        <div className="border-t border-white/5 bg-night-900 px-5 py-3 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-md px-3 py-2.5 text-sm font-semibold ${
                pathname === l.href ? "text-flame-400" : "text-slate-300"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
