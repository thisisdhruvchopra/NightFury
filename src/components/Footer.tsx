import Link from "next/link";
import Logo from "./Logo";
import { BUSINESS, SUPPORT } from "@/lib/legal";

const colHead = "font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-fury";
const colLink = "font-display text-[18px] font-bold uppercase text-chalk no-underline hover:text-fury";

const LEGAL = [
  { href: "/terms-and-conditions", label: "Terms" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/shipping-policy", label: "Shipping" },
  { href: "/refund-return-policy", label: "Refund" },
  { href: "/warranty-policy", label: "Warranty" },
];

/** One shared footer for every page, so the GSTIN is always the real one. */
export default function Footer() {
  return (
    <footer className="on-navy bg-navy text-chalk">
      <div aria-hidden="true" className="h-[6px] bg-fury" />
      <div className="nf-container grid gap-10 pt-14 pb-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
        <div className="min-w-0">
          <div role="img" aria-label="NightFury, Drive the Difference">
            <Logo variant="footer" />
          </div>
          <p className="mt-6 font-mono text-[12px] leading-[1.8] text-navy-soft">
            {BUSINESS.legalName}
            <br />
            {BUSINESS.tagline}
            <br />
            GSTIN {BUSINESS.gstin}
            <br />
            {BUSINESS.address.line1}, {BUSINESS.address.line2},
            <br />
            {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.pin}
          </p>
        </div>

        <nav aria-label="Products" className="flex min-w-0 flex-col items-start gap-3">
          <span className={colHead}>Products</span>
          <Link href="/vision" className={colLink}>Vision</Link>
          <Link href="/aroma" className={colLink}>Aroma</Link>
          <Link href="/care" className={colLink}>Care</Link>
        </nav>

        <nav aria-label="Company" className="flex min-w-0 flex-col items-start gap-3">
          <span className={colHead}>Company</span>
          <Link href="/about" className={colLink}>About</Link>
          <Link href="/dealers" className={colLink}>Become a Dealer</Link>
          <Link href="/where-to-buy" className={colLink}>Where to Buy</Link>
          <Link href="/warranty-policy" className={colLink}>Warranty</Link>
          <Link href="/contact-us" className={colLink}>Contact</Link>
        </nav>

        <div className="flex min-w-0 flex-col items-start gap-3 font-mono text-[13px]">
          <span className={colHead}>Support</span>
          <a href={`mailto:${SUPPORT.email}`} className="text-chalk no-underline hover:text-fury">{SUPPORT.email}</a>
          <a href={SUPPORT.phoneHref} className="text-chalk no-underline hover:text-fury">{SUPPORT.phone}</a>
          <span className="text-navy-soft">Mon to Sat, 10 AM to 7 PM IST</span>
        </div>
      </div>

      <div className="nf-container">
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-[10px] border-t border-[#1C2B47] pt-5 pb-9 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-navy-soft">
          <span>&copy; 2026 NightFury. All rights reserved. GSTIN {BUSINESS.gstin}</span>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-2">
            {LEGAL.map((l, i) => (
              <span key={l.href}>
                <Link href={l.href} className="text-navy-soft no-underline hover:text-fury">{l.label}</Link>
                {i < LEGAL.length - 1 && <span aria-hidden="true"> &middot;</span>}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
