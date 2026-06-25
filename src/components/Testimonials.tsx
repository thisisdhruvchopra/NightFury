import { TESTIMONIALS } from "@/lib/reviews-seed";

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-[1280px] px-10 pt-22">
      <div className="mb-7 flex items-end gap-4">
        <span className="text-[13px] font-semibold text-accent" style={{ fontFamily: "var(--font-spline), monospace" }}>
          03
        </span>
        <h2 className="m-0 text-[38px] font-extrabold italic uppercase tracking-tight" style={{ transform: "skewX(-4deg)" }}>
          What Drivers &amp; Dealers Say
        </h2>
        <div className="mb-3 h-px flex-1 bg-grid-line" />
        <span className="mb-2 text-[11px] tracking-[.16em] text-dim uppercase" style={{ fontFamily: "var(--font-spline), monospace" }}>
          TRUSTED ACROSS INDIA
        </span>
      </div>

      <div className="review-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="nf-card p-6">
            <span className="text-sm tracking-[2px] text-accent">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <p
              className="mt-4 text-[13px] leading-[1.65] text-muted"
              style={{ fontFamily: "var(--font-spline), monospace" }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
              <div
                className="flex h-9 w-9 items-center justify-center bg-raised text-sm font-bold text-accent"
                style={{ borderRadius: "2px" }}
              >
                {t.name[0]}
              </div>
              <div>
                <div className="text-sm font-bold text-chalk">{t.name}</div>
                <div
                  className="text-[10px] tracking-[.14em] text-dim uppercase"
                  style={{ fontFamily: "var(--font-spline), monospace" }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
