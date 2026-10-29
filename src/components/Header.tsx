"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

export const NAV = [
  { href: "/vision", label: "Lighting" },
  { href: "/aroma", label: "Car Perfumes" },
  { href: "/care", label: "Car Care" },
  { href: "/where-to-buy", label: "Where to Buy" },
  { href: "/about", label: "About" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 h-[76px] border-b border-hairline bg-white">
      <nav
        aria-label="Main"
        className="nf-container flex h-[75px] items-center gap-8"
      >
        <Link
          href="/"
          aria-label="NightFury, Drive the Difference"
          className="flex-none no-underline"
        >
          <Logo />
        </Link>

        <div className="hidden min-w-0 flex-1 justify-center gap-[34px] whitespace-nowrap font-mono text-[13px] font-medium tracking-[0.12em] uppercase nav:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="nf-link py-[14px]"
              aria-current={isActive(n.href) ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </div>

        <Link
          href="/dealers"
          className="ml-auto hidden flex-none rounded-[2px] bg-navy px-5 py-[13px] font-mono text-[12px] font-semibold tracking-[0.12em] text-white uppercase no-underline hover:text-white sm:inline-block nav:ml-0"
          aria-current={isActive("/dealers") ? "page" : undefined}
        >
          Become a Dealer
        </Link>

        <button
          type="button"
          className="ml-auto flex h-11 w-11 flex-none items-center justify-center rounded-[2px] border-2 border-navy bg-white sm:ml-0 nav:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="flex flex-col gap-[5px]">
            <span className={`block h-[2px] w-5 bg-navy ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-5 bg-navy ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[2px] w-5 bg-navy ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-b-2 border-navy bg-white nav:hidden"
      >
        <div className="nf-container flex flex-col py-4 font-mono text-[14px] font-medium tracking-[0.12em] uppercase">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="border-b border-hairline py-4 no-underline"
              onClick={() => setOpen(false)}
              aria-current={isActive(n.href) ? "page" : undefined}
              style={isActive(n.href) ? { fontWeight: 700, boxShadow: "inset 4px 0 0 #FF5500", paddingLeft: 12 } : undefined}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/dealers"
            className="mt-4 rounded-[2px] bg-navy px-5 py-4 text-center text-white no-underline hover:text-white"
            onClick={() => setOpen(false)}
          >
            Become a Dealer
          </Link>
        </div>
      </div>
    </header>
  );
}
