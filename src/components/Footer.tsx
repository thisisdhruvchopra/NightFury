import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer id="contact">
      <div className="carbon-trim" />

      <div className="mx-auto max-w-[1280px] px-10 pt-20">
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
            <p
              className="mt-5 max-w-[280px] text-xs leading-[1.7] text-dim"
              style={{ fontFamily: "var(--font-spline), monospace" }}
            >
              Premium automotive parts and accessories, engineered for the roads
              we actually drive on. Vision. Aroma. Care. One standard, the
              NightFury standard.
            </p>
          </div>

          {/* Product Lines */}
          <div>
            <div
              className="mb-4 text-[10px] tracking-[.2em] text-dim uppercase"
              style={{ fontFamily: "var(--font-spline), monospace" }}
            >
              Product Lines
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/vision" className="nf-link w-fit text-sm font-semibold tracking-wide text-[#C8C8CE]">
                NightFury Vision
              </Link>
              <Link href="/aroma" className="nf-link w-fit text-sm font-semibold tracking-wide text-[#C8C8CE]">
                NightFury Aroma
              </Link>
              <Link href="/care" className="nf-link w-fit text-sm font-semibold tracking-wide text-[#C8C8CE]">
                NightFury Care
              </Link>
            </div>
          </div>

          {/* Authorized Distributor */}
          <div>
            <div
              className="mb-4 text-[10px] tracking-[.2em] text-dim uppercase"
              style={{ fontFamily: "var(--font-spline), monospace" }}
            >
              Authorized Distributor
            </div>
            <div className="flex flex-col gap-3 text-sm font-semibold tracking-wide text-[#C8C8CE]">
              <span>Yash Marketing, Kanpur</span>
              <a href="mailto:yashp.marketing@gmail.com" className="nf-link w-fit">
                yashp.marketing@gmail.com
              </a>
              <a href="tel:+919839187898" className="nf-link w-fit">
                +91 98391 87898
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div
              className="mb-4 text-[10px] tracking-[.2em] text-dim uppercase"
              style={{ fontFamily: "var(--font-spline), monospace" }}
            >
              Contact
            </div>
            <div className="flex flex-col gap-3 text-sm font-semibold tracking-wide text-[#C8C8CE]">
              <a href="mailto:support@nightfury.co.in" className="nf-link w-fit">
                support@nightfury.co.in
              </a>
              <a href="tel:+919839600197" className="nf-link w-fit">
                +91 98396 00197
              </a>
              <span>Mon - Sat, 10:00 - 19:00 IST</span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex justify-center py-6 text-[11px] tracking-[.14em] text-faint uppercase"
          style={{ fontFamily: "var(--font-spline), monospace" }}
        >
          &copy; {new Date().getFullYear()} NIGHTFURY AUTOMOTIVE. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
