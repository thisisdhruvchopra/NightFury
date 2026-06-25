import Link from "next/link";
import { SUB_BRANDS } from "@/lib/products";
import { TESTIMONIALS } from "@/lib/reviews-seed";

const STATS = [
  { value: "18", unit: " mo", cap: "WARRANTY ON LIGHTING" },
  { value: "IP67", unit: "", cap: "WATER & DUST RATED" },
  { value: "100", unit: "%", cap: "BATCH QUALITY TESTED" },
  { value: "3", unit: " lines", cap: "VISION · AROMA · CARE" },
];

const PILLARS = [
  {
    icon: "⚙",
    title: "Engineered, Not Assembled",
    body: "Every NightFury product passes thermal, vibration and endurance testing before it earns the badge. We reject entire batches over a single failure.",
  },
  {
    icon: "🛡",
    title: "18-Month Warranty",
    body: "We back our lighting with one of the longest warranties in the segment, because products built right don't come back.",
  },
  {
    icon: "🤝",
    title: "Dealer-First Network",
    body: "From metro accessory hubs to highway service points, our growing partner network keeps genuine NightFury parts within reach.",
  },
];

const TAGLINES: Record<string, string> = {
  vision: "DRIVE THE DIFFERENCE",
  aroma: "SMELL THE DIFFERENCE",
  care: "FEEL THE DIFFERENCE",
};

const ALL_PRODUCTS = SUB_BRANDS.flatMap((b) =>
  b.products.map((p) => ({ ...p, brand: b.slug, brandName: b.name }))
);

const FEATURED = ALL_PRODUCTS.find((p) => p.slug === "led-4w")!;

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="mx-auto max-w-[1280px] px-10">
        <div
          className="hero-grid relative"
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: "30px",
            alignItems: "center",
            minHeight: "620px",
            padding: "40px 0",
          }}
        >
          {/* Livery stripes */}
          <div
            className="pointer-events-none absolute"
            style={{ top: "-6%", right: "-12%", width: "70%", height: "30px", background: "var(--color-accent)", opacity: 0.1, transform: "rotate(-20deg)" }}
          />
          <div
            className="pointer-events-none absolute"
            style={{ top: "4%", right: "-12%", width: "70%", height: "12px", background: "var(--color-chalk)", opacity: 0.05, transform: "rotate(-20deg)" }}
          />

          {/* Left: copy */}
          <div className="relative z-10">
            <div
              className="mb-6 inline-flex items-center gap-2 border border-border-strong px-3 py-1.5 text-[11px] tracking-[.2em] text-accent uppercase"
              style={{ fontFamily: "var(--font-spline), monospace", borderRadius: "2px" }}
            >
              <span className="dot" /> PREMIUM AUTOMOTIVE PARTS &amp; ACCESSORIES
            </div>

            <h1
              className="m-0 text-[84px] font-extrabold italic uppercase leading-[.88] tracking-tight"
              style={{ transform: "skewX(-4deg)" }}
            >
              Night<span className="text-accent">Fury</span>
            </h1>

            <p
              className="mt-6 max-w-[430px] text-sm leading-[1.7] text-muted"
              style={{ fontFamily: "var(--font-spline), monospace" }}
            >
              Lighting that owns the dark, fragrance that defines your cabin, and
              care that keeps every drive showroom-fresh. One brand, one standard.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link href="/vision" className="nf-btn nf-btn-primary" style={{ padding: "15px 28px", fontSize: "16px", boxShadow: "6px 6px 0 rgba(255,85,0,.25)" }}>
                <span>Explore Products &rarr;</span>
              </Link>
              <a href="#brands" className="nf-btn nf-btn-outline" style={{ padding: "15px 24px", fontSize: "15px" }}>
                <span>View The Range</span>
              </a>
            </div>

            <div className="mt-11 flex flex-wrap gap-7">
              {STATS.map((s) => (
                <div key={s.cap}>
                  <div className="text-[30px] font-extrabold italic leading-[.9] text-chalk">
                    {s.value}
                    {s.unit && <span className="text-[15px] text-accent">{s.unit}</span>}
                  </div>
                  <div
                    className="mt-1.5 text-[10px] tracking-[.16em] text-dim"
                    style={{ fontFamily: "var(--font-spline), monospace" }}
                  >
                    {s.cap}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero image placeholder */}
          <div className="relative z-10">
            <div
              className="pointer-events-none absolute"
              style={{
                inset: "-6% -4%",
                background: "radial-gradient(54% 60% at 56% 50%, rgba(255,85,0,.26), transparent 68%)",
                animation: "nfGlow 5s ease-in-out infinite",
              }}
            />
            <div className="relative">
              <div
                className="absolute right-4 top-4 z-10 bg-accent px-3 py-1 text-[10px] font-bold tracking-[.14em] text-carbon"
                style={{ fontFamily: "var(--font-spline), monospace", transform: "skewX(-10deg)" }}
              >
                PREMIUM EDITION
              </div>
              <img
                src="/media/products/4whled.png"
                alt="NightFury 4-Wheeler LED Headlight"
                style={{ width: "100%", borderRadius: "4px", objectFit: "contain" }}
              />
              <div className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-[#3A3A40]" />
              <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-[#3A3A40]" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section id="brands" className="mx-auto max-w-[1280px] px-10 pt-22">
        <div className="mb-7 flex items-end gap-4">
          <span className="text-[13px] font-semibold text-accent" style={{ fontFamily: "var(--font-spline), monospace" }}>
            01
          </span>
          <h2 className="m-0 text-[38px] font-extrabold italic uppercase tracking-tight" style={{ transform: "skewX(-4deg)" }}>
            The NightFury Range
          </h2>
          <div className="mb-3 h-px flex-1 bg-grid-line" />
          <span className="mb-2 text-[11px] tracking-[.16em] text-dim uppercase" style={{ fontFamily: "var(--font-spline), monospace" }}>
            OUR PRODUCT LINES
          </span>
        </div>

        <div className="cat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {SUB_BRANDS.map((b) => (
            <Link key={b.slug} href={`/${b.slug}`} className="nf-card group relative cursor-pointer overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{ background: "radial-gradient(60% 50% at 50% 30%, rgba(255,85,0,.14), transparent 70%)" }}
              />
              <div className="ph" style={{ width: "100%", height: "230px" }}>
                {b.slug.toUpperCase()} - COMING SOON
              </div>
              <div className="relative z-20 flex items-center justify-between border-t border-border px-5 py-5">
                <div>
                  <div className="text-[23px] font-extrabold italic uppercase leading-[.95]" style={{ transform: "skewX(-5deg)" }}>
                    {b.name.replace("NightFury ", "")}
                  </div>
                  <div
                    className="mt-1.5 text-[10.5px] tracking-[.14em] text-dim"
                    style={{ fontFamily: "var(--font-spline), monospace" }}
                  >
                    {TAGLINES[b.slug]}
                  </div>
                </div>
                <span className="text-[26px] font-bold text-accent transition-transform duration-200 group-hover:translate-x-1.5">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ FEATURED PRODUCT ============ */}
      <section className="mx-auto max-w-[1280px] px-10 pt-22">
        <div
          className="nf-card relative overflow-hidden"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", background: "linear-gradient(150deg, #15100c, #0A0A0B 60%)" }}
        >
          {/* Livery accent */}
          <div
            className="pointer-events-none absolute"
            style={{ top: "-30%", left: "-6%", width: "60%", height: "30px", background: "var(--color-accent)", opacity: 0.12, transform: "rotate(-22deg)" }}
          />

          {/* Image */}
          <div className="relative" style={{ minHeight: "460px" }}>
            <div className="absolute inset-0" style={{ background: "radial-gradient(56% 56% at 50% 50%, rgba(255,85,0,.24), transparent 70%)" }} />
            <div
              className="absolute left-5 top-5 z-10 bg-chalk px-3 py-1 text-[15px] font-extrabold italic tracking-[.05em] text-carbon"
              style={{ fontFamily: "var(--font-display), sans-serif", transform: "skewX(-9deg)" }}
            >
              PREMIUM EDITION
            </div>
            <div className="ph absolute" style={{ inset: "30px", borderRadius: "4px" }}>
              4-WHEELER LED HEADLIGHT - COMING SOON
            </div>
          </div>

          {/* Body */}
          <div className="relative z-10 flex flex-col justify-center px-10 py-11">
            <div
              className="text-[11px] tracking-[.2em] text-accent uppercase"
              style={{ fontFamily: "var(--font-spline), monospace" }}
            >
              VISION &middot; 4-WHEELER &middot; PAIR PACK
            </div>
            <h3
              className="mt-3 text-[46px] font-extrabold italic uppercase leading-[.92] tracking-tight"
              style={{ transform: "skewX(-4deg)" }}
            >
              4-Wheeler LED<br />Headlight
            </h3>
            <div
              className="mt-2.5 text-[13px] text-muted"
              style={{ fontFamily: "var(--font-spline), monospace" }}
            >
              Superior visibility on the road
            </div>
            <p
              className="mt-3.5 max-w-[400px] text-[12.5px] leading-[1.65] text-muted"
              style={{ fontFamily: "var(--font-spline), monospace" }}
            >
              {FEATURED.description}
            </p>
            <div
              className="mt-5"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 26px", maxWidth: "380px" }}
            >
              {FEATURED.specs.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 text-xs tracking-wide text-[#C8C8CE]"
                  style={{ fontFamily: "var(--font-spline), monospace" }}
                >
                  <span className="text-accent">&#9670;</span> {s.value}
                </div>
              ))}
            </div>
            <div className="mt-5">
              <Link href="/vision" className="nf-btn nf-btn-primary" style={{ padding: "14px 26px", fontSize: "16px", boxShadow: "5px 5px 0 rgba(255,85,0,.22)" }}>
                <span>Get Yours Today! &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LINEUP ============ */}
      <section className="mx-auto max-w-[1280px] px-10 pt-22">
        <div className="mb-7 flex items-end gap-4">
          <span className="text-[13px] font-semibold text-accent" style={{ fontFamily: "var(--font-spline), monospace" }}>
            02
          </span>
          <h2 className="m-0 text-[38px] font-extrabold italic uppercase tracking-tight" style={{ transform: "skewX(-4deg)" }}>
            The Lineup
          </h2>
          <div className="mb-3 h-px flex-1 bg-grid-line" />
          <span className="mb-2 text-[11px] tracking-[.16em] text-dim uppercase" style={{ fontFamily: "var(--font-spline), monospace" }}>
            {ALL_PRODUCTS.length} PRODUCTS &middot; 3 LINES
          </span>
        </div>

        <div className="lineup-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {ALL_PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.brand}#${p.slug}`}
              className="nf-card group relative flex cursor-pointer flex-col overflow-hidden"
            >
              <div className="ph" style={{ width: "100%", height: "190px" }}>
                {p.brand.toUpperCase()} - COMING SOON
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4 pb-4.5">
                <div
                  className="text-[9.5px] tracking-[.16em] text-accent"
                  style={{ fontFamily: "var(--font-spline), monospace" }}
                >
                  {p.brand.toUpperCase()}
                </div>
                <div className="text-[19px] font-bold italic uppercase leading-none" style={{ transform: "skewX(-4deg)" }}>
                  {p.name}
                </div>
                <div
                  className="text-[10px] tracking-[.06em] text-dim leading-[1.5]"
                  style={{ fontFamily: "var(--font-spline), monospace" }}
                >
                  {p.variant}
                </div>
                <div className="mt-auto flex items-center justify-end pt-3">
                  <span
                    className="border border-border-strong bg-raised px-3 py-2 text-[11px] font-bold tracking-[.1em] text-chalk uppercase transition-colors group-hover:border-accent group-hover:text-accent"
                    style={{ fontFamily: "var(--font-spline), monospace", borderRadius: "2px" }}
                  >
                    {p.slug === "led-4w" ? "Find Dealer" : "Coming Soon"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ WHY NIGHTFURY ============ */}
      <section className="mx-auto max-w-[1280px] px-10 pt-22">
        <div className="nf-card relative overflow-hidden p-12">
          <div
            className="pointer-events-none absolute right-[-20px] top-1/2 -translate-y-1/2 text-[90px] font-bold italic uppercase leading-[.7] whitespace-nowrap"
            style={{ fontFamily: "Arial, Helvetica, sans-serif", color: "rgba(255,255,255,.035)" }}
          >
            NightFury
          </div>

          <div
            className="text-[11px] tracking-[.2em] text-accent uppercase"
            style={{ fontFamily: "var(--font-spline), monospace" }}
          >
            THE NIGHTFURY STANDARD
          </div>
          <h2
            className="mt-2 text-[34px] font-extrabold italic uppercase tracking-tight"
            style={{ transform: "skewX(-4deg)" }}
          >
            Built Like A <span className="text-accent">Performance</span> Brand
          </h2>
          <p
            className="mt-4 max-w-[540px] text-[12.5px] leading-[1.65] text-muted"
            style={{ fontFamily: "var(--font-spline), monospace" }}
          >
            The aftermarket is flooded with unbranded parts that fail in months.
            NightFury exists for drivers and riders who want OEM-plus quality with
            a face behind it: real warranties, real dealers, real accountability.
          </p>

          <div className="why-grid mt-8" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {PILLARS.map((p) => (
              <div key={p.title}>
                <div className="text-2xl">{p.icon}</div>
                <div className="mt-3 text-base font-bold italic uppercase text-chalk">{p.title}</div>
                <div
                  className="mt-2 text-xs leading-[1.65] text-dim"
                  style={{ fontFamily: "var(--font-spline), monospace" }}
                >
                  {p.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
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

      {/* ============ CLOSING CTA ============ */}
      <section className="mx-auto max-w-[1280px] px-10 pt-22 pb-16">
        <div
          className="nf-card overflow-hidden p-12"
          style={{ background: "linear-gradient(120deg, var(--color-accent), #cc4400)", textAlign: "center" }}
        >
          <div
            className="text-[11px] font-semibold tracking-[.2em] text-carbon/50 uppercase"
            style={{ fontFamily: "var(--font-spline), monospace" }}
          >
            THE NIGHTFURY STANDARD
          </div>
          <h2
            className="mt-4 text-[42px] font-extrabold italic uppercase leading-[.92] text-carbon"
            style={{ transform: "skewX(-4deg)" }}
          >
            Ready To Drive<br />The Difference?
          </h2>
          <p
            className="mx-auto mt-4 max-w-[420px] text-[13px] leading-[1.6] text-carbon/70"
            style={{ fontFamily: "var(--font-spline), monospace" }}
          >
            Find NightFury at your nearest accessories dealer, or partner with
            us to bring the range to your shelves.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/vision"
              className="nf-btn"
              style={{
                background: "var(--color-carbon)",
                color: "var(--color-chalk)",
                fontWeight: 800,
                fontStyle: "italic",
                textTransform: "uppercase",
                transform: "skewX(-8deg)",
                padding: "14px 26px",
                fontSize: "15px",
                boxShadow: "5px 5px 0 rgba(0,0,0,.25)",
              }}
            >
              <span style={{ display: "inline-block", transform: "skewX(8deg)" }}>Browse The Range &rarr;</span>
            </Link>
            <a
              href="#contact"
              className="nf-btn"
              style={{
                border: "1px solid rgba(0,0,0,.3)",
                color: "var(--color-carbon)",
                fontWeight: 700,
                textTransform: "uppercase",
                transform: "skewX(-8deg)",
                padding: "14px 24px",
                fontSize: "14px",
                background: "transparent",
              }}
            >
              <span style={{ display: "inline-block", transform: "skewX(8deg)" }}>Find Nearby Dealer</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
