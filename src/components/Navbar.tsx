"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import DistributorModal from "./DistributorModal";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/vision", label: "Vision" },
  { href: "/aroma", label: "Aroma" },
  { href: "/care", label: "Care" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showDealer, setShowDealer] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-night-950/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-5">
        <Logo className="shrink-0" />

        <SearchBar className="hidden w-full max-w-xs flex-1 lg:block xl:max-w-sm" />

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-3.5 py-2 text-sm font-semibold tracking-wide transition-colors ${
                  active
                    ? "text-flame-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setShowDealer(true)}
            className="ml-3 flex items-center gap-2 rounded-md bg-flame-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-flame-600"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            Find Nearby Dealer
          </button>
        </div>

        <button
          className="ml-auto text-slate-200 md:hidden"
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
        <div className="border-t border-white/5 bg-night-900 px-5 py-4 md:hidden">
          <SearchBar className="mb-3" />
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
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setShowDealer(true);
            }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-flame-500 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Find Nearby Dealer
          </button>
        </div>
      )}

      {showDealer && <DistributorModal onClose={() => setShowDealer(false)} />}
    </header>
  );
}
