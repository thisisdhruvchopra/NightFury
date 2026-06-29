import Link from "next/link";
import { SUPPORT } from "@/lib/legal";

const mono = { fontFamily: "var(--font-spline), monospace" } as const;

export default function OrderConfirmationPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-5 py-24 text-center md:px-10">
      <div
        className="text-[11px] tracking-[.2em] text-accent uppercase"
        style={mono}
      >
        ORDER PLACED SUCCESSFULLY
      </div>
      <h1
        className="mt-4 text-[36px] font-extrabold italic uppercase leading-[.92] tracking-tight md:text-[48px]"
        style={{ transform: "skewX(-4deg)" }}
      >
        Thank You!
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-sm leading-[1.7] text-muted" style={mono}>
        Your order has been placed. You will receive a confirmation email with tracking details shortly.
      </p>

      <div className="mx-auto mt-8 max-w-md nf-card p-6 text-left">
        <div className="text-[11px] font-bold tracking-[.14em] text-dim uppercase" style={mono}>
          WHAT HAPPENS NEXT
        </div>
        <ul className="mt-3 space-y-3 text-[13px] text-muted" style={mono}>
          <li className="flex gap-3">
            <span className="text-accent font-bold">1.</span>
            Order confirmation email sent to your inbox
          </li>
          <li className="flex gap-3">
            <span className="text-accent font-bold">2.</span>
            Order processed within 24 hours
          </li>
          <li className="flex gap-3">
            <span className="text-accent font-bold">3.</span>
            Tracking number shared via email and SMS
          </li>
          <li className="flex gap-3">
            <span className="text-accent font-bold">4.</span>
            Estimated delivery in 1-3 business days
          </li>
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="nf-btn nf-btn-primary"
          style={{ padding: "14px 28px", fontSize: "15px" }}
        >
          <span>Back to Home &rarr;</span>
        </Link>
        <a
          href={`mailto:${SUPPORT.email}`}
          className="nf-btn nf-btn-outline"
          style={{ padding: "14px 24px", fontSize: "13px" }}
        >
          <span>Need Help?</span>
        </a>
      </div>
    </div>
  );
}
