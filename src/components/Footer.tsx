import Link from "next/link";
import Logo from "./Logo";
import { BUSINESS, SUPPORT, LEGAL_LINKS } from "@/lib/legal";

const mono = { fontFamily: "var(--font-spline), monospace" } as const;
const colHead = "mb-4 text-[10px] tracking-[.2em] text-dim uppercase";
const linkStyle = "nf-link w-fit text-sm font-semibold tracking-wide text-[#C8C8CE]";

export default function Footer() {
  return (
    <footer id="contact">
      <div className="carbon-trim" />

      <div className="mx-auto max-w-[1280px] px-5 pt-20 md:px-10">
        <div
          className="foot-top"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: "40px",
            paddingBottom: "48px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          {/* Brand column */}
          <div>
            <Logo size="lg" />
            <div className="mt-3.5 flex items-center gap-3">
              <div className="h-0.5 w-10" style={{ background: "linear-gradient(90deg, transparent, var(--color-accent))" }} />
              <span
                className="text-[11px] font-bold tracking-[.34em] text-chalk"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                DRIVE THE DIFFERENCE
              </span>
              <div className="h-0.5 w-10" style={{ background: "linear-gradient(90deg, var(--color-accent), transparent)" }} />
            </div>
            <p className="mt-5 max-w-[280px] text-xs leading-[1.7] text-dim" style={mono}>
              Premium automotive parts and accessories, engineered for the roads
              we actually drive on. Vision. Aroma. Care. One standard, the
              NightFury standard.
            </p>

            {/* Distributor info */}
            <div className="mt-6 border-t border-border pt-4">
              <p className="text-[11px] font-bold tracking-[.12em] text-chalk uppercase" style={mono}>{BUSINESS.legalName}</p>
              <p className="mt-0.5 text-[10px] tracking-[.1em] text-accent uppercase" style={mono}>{BUSINESS.tagline}</p>
              <p className="mt-2 text-[11px] leading-[1.6] text-dim" style={mono}>GSTIN: {BUSINESS.gstin}</p>
              <p className="mt-1 text-[11px] leading-[1.6] text-dim" style={mono}>
                {BUSINESS.address.line1},<br />
                {BUSINESS.address.line2},<br />
                {BUSINESS.address.city},<br />
                {BUSINESS.address.state} {BUSINESS.address.pin}
              </p>
            </div>
          </div>

          {/* Product Lines */}
          <div>
            <div className={colHead} style={mono}>Product Lines</div>
            <div className="flex flex-col gap-3">
              <Link href="/vision" className={linkStyle}>NightFury Vision</Link>
              <Link href="/aroma" className={linkStyle}>NightFury Aroma</Link>
              <Link href="/care" className={linkStyle}>NightFury Care</Link>
            </div>

            {/* Legal Links */}
            <div className={`mt-8 ${colHead}`} style={mono}>Legal</div>
            <div className="flex flex-col gap-3">
              {LEGAL_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={linkStyle}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <div className={colHead} style={mono}>Support</div>
            <div className="flex flex-col gap-3 text-sm font-semibold tracking-wide text-[#C8C8CE]">
              <a href={`mailto:${SUPPORT.email}`} className="nf-link w-fit">
                {SUPPORT.email}
              </a>
              <a href={SUPPORT.phoneHref} className="nf-link w-fit">
                {SUPPORT.phone}
              </a>
              <span className="text-dim text-[12px]">{SUPPORT.hours}</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className={colHead} style={mono}>Contact</div>
            <div className="flex flex-col gap-3 text-sm font-semibold tracking-wide text-[#C8C8CE]">
              <a href={`mailto:${SUPPORT.secondaryEmail}`} className="nf-link w-fit">
                {SUPPORT.secondaryEmail}
              </a>
              <Link href="/contact-us" className="nf-link w-fit text-accent">
                Contact Page &rarr;
              </Link>
            </div>

            <div className={`mt-8 ${colHead}`} style={mono}>Dealer Inquiries</div>
            <a
              href={`mailto:${SUPPORT.email}?subject=Dealer%20Inquiry`}
              className="nf-btn nf-btn-primary"
              style={{ padding: "8px 16px", fontSize: "12px" }}
            >
              <span>Become a Dealer</span>
            </a>
          </div>
        </div>

        {/* Compliance notice */}
        <div
          className="py-4 text-center text-[10px] leading-[1.7] text-dim"
          style={mono}
        >
          By using this website, you agree to our{" "}
          <Link href="/terms-and-conditions" className="text-muted underline underline-offset-2 hover:text-accent">Terms & Conditions</Link>,{" "}
          <Link href="/privacy-policy" className="text-muted underline underline-offset-2 hover:text-accent">Privacy Policy</Link>,{" "}
          <Link href="/shipping-policy" className="text-muted underline underline-offset-2 hover:text-accent">Shipping Policy</Link>, and{" "}
          <Link href="/refund-return-policy" className="text-muted underline underline-offset-2 hover:text-accent">Return Policy</Link>.
        </div>

        {/* Bottom row */}
        <div
          className="flex justify-center border-t border-border py-6 text-[11px] tracking-[.14em] text-faint uppercase"
          style={mono}
        >
          &copy; {new Date().getFullYear()}&nbsp;NIGHTFURY&trade;. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
