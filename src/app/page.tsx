import Link from "next/link";
import { SUB_BRANDS } from "@/lib/products";
import Testimonials from "@/components/Testimonials";
import {
  TachDial,
  RoadDivider,
  CarSilhouette,
  BikeSilhouette,
  AlloyWheel,
} from "@/components/AutoMotifs";

const HERO_BADGES = [
  {
    title: "100% Genuine",
    sub: "Trusted quality",
    icon: <path d="M12 2 3 6v6c0 5 3.8 9 9 10 5.2-1 9-5 9-10V6l-9-4zM8.5 12l2.5 2.5L16 9.5" />,
  },
  {
    title: "Precision Fit",
    sub: "Plug-and-play install",
    icon: (
      <>
        <circle cx={12} cy={12} r={3} />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
      </>
    ),
  },
  {
    title: "Long Lasting",
    sub: "Built to perform",
    icon: <path d="M12 8v5l3 2M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9z" />,
  },
  {
    title: "18-Month Warranty",
    sub: "On LED lighting",
    icon: <path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM9 14.5 7.5 21l4.5-2 4.5 2-1.5-6.5" />,
  },
];

const CATEGORIES = [
  {
    name: "4-Wheeler LED",
    line: "NightFury Vision",
    href: "/vision#led-4w",
    icon: (
      <>
        <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
        <path d="M3 11h18v5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5z" />
        <path d="M6.5 13.5h1M16.5 13.5h1" />
      </>
    ),
  },
  {
    name: "2-Wheeler LED",
    line: "NightFury Vision",
    href: "/vision#led-2w",
    icon: (
      <>
        <circle cx={12} cy={10} r={5} />
        <path d="M12 7.5v2.5l1.8 1M5 19l3-4M19 19l-3-4" />
      </>
    ),
  },
  {
    name: "Aroma Essence",
    line: "Hanging bottle perfume",
    href: "/aroma#aroma-hanging",
    icon: (
      <>
        <path d="M9 9h6l1.5 4v7a1.5 1.5 0 0 1-1.5 1.5H9A1.5 1.5 0 0 1 7.5 20v-7L9 9z" />
        <path d="M10 9V6.5h4V9M12 2.5v4" />
      </>
    ),
  },
  {
    name: "Aroma Elite",
    line: "Spray perfume + card",
    href: "/aroma#aroma-spray",
    icon: (
      <>
        <path d="M9 8h6v12a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 20V8z" />
        <path d="M10.5 8V5.5h3V8M15 4h3M16.5 2.5v3" />
      </>
    ),
  },
  {
    name: "Microfiber Cloth",
    line: "NightFury Care",
    href: "/care#care-microfiber",
    icon: (
      <>
        <rect x={4} y={7} width={16} height={11} rx={2} />
        <path d="M4 11h16M4 14.5h16" />
      </>
    ),
  },
  {
    name: "Car Wet Wipes",
    line: "NightFury Care",
    href: "/care#care-wipes",
    icon: (
      <>
        <rect x={4} y={8} width={16} height={12} rx={3} />
        <path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M9.5 12.5q2.5-2 5 0" />
      </>
    ),
  },
];

const TRUST = [
  {
    title: "18-Month Warranty",
    sub: "No-hassle claims",
    icon: <path d="M12 2 3 6v6c0 5 3.8 9 9 10 5.2-1 9-5 9-10V6l-9-4zM8.5 12l2.5 2.5L16 9.5" />,
  },
  {
    title: "Genuine Products",
    sub: "Via authorized dealers",
    icon: <path d="M9 12l2 2 4-4M12 3l2.5 2H18l.6 3.4L21 11l-1.5 3 .5 3.5-3.4 1L14 21l-2-1.5L10 21l-2.6-2.5-3.4-1 .5-3.5L3 11l2.4-2.6L6 5h3.5L12 3z" />,
  },
  {
    title: "Expert Support",
    sub: "support@nightfury.co.in",
    icon: <path d="M4 13a8 8 0 0 1 16 0M3 15a2 2 0 0 1 2-2h1v6H5a2 2 0 0 1-2-2v-2zM21 15a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2zM18 19a3 3 0 0 1-3 3h-2" />,
  },
  {
    title: "Quality Tested",
    sub: "Every production batch",
    icon: (
      <>
        <circle cx={12} cy={13} r={8} />
        <path d="M12 13l3.5-3.5M9 2h6M12 2v3" />
      </>
    ),
  },
];

const PILLARS = [
  {
    title: "Engineered, not assembled",
    body: "Every NightFury product passes thermal, vibration and endurance testing before it earns the badge. We reject entire batches over a single failure.",
    icon: (
      <path d="M12 2 2 7v6c0 5.5 4.3 10 10 11 5.7-1 10-5.5 10-11V7l-10-5zM9 12l2 2 4-4" />
    ),
  },
  {
    title: "18-month warranty",
    body: "We back our lighting with one of the longest warranties in the segment, because products built right don't come back.",
    icon: <path d="M12 8v5l3 2M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9z" />,
  },
  {
    title: "Dealer-first network",
    body: "From metro accessory hubs to highway service points, our growing partner network keeps genuine NightFury parts within reach.",
    icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />,
  },
];

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="bg-carbon relative overflow-hidden">
        <TachDial className="pointer-events-none absolute -right-24 top-1/2 hidden h-[30rem] w-[30rem] -translate-y-1/2 text-slate-400 opacity-[0.07] lg:block" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:py-24">
          {/* Copy */}
          <div>
            <p className="animate-fade-up inline-block rounded-full border border-flame-500/25 bg-flame-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-flame-400">
              Premium automotive parts &amp; accessories
            </p>
            <h1 className="animate-fade-up delay-100 mt-7 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Built for the
              <br />
              <span className="text-flame-500">Night.</span>
            </h1>
            <p className="animate-fade-up delay-200 mt-6 max-w-lg text-lg leading-relaxed text-slate-300">
              Premium LED lighting, cabin fragrance and car care. Proven
              quality, drive with confidence every time.
            </p>

            <div className="animate-fade-up delay-200 mt-9 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {HERO_BADGES.map((b) => (
                <div key={b.title} className="flex items-start gap-2.5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f28c28"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 shrink-0"
                  >
                    {b.icon}
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-white">{b.title}</div>
                    <div className="mt-0.5 text-xs text-slate-500">{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-fade-up delay-300 mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/vision"
                className="flex items-center gap-2 rounded-md bg-flame-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-flame-600"
              >
                Explore products
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <a
                href="#categories"
                className="rounded-md border border-white/15 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-flame-500/60"
              >
                Browse categories
              </a>
            </div>
          </div>

          {/* Product showcase */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-8 rounded-full bg-flame-500/10 blur-3xl" />
            <div className="relative rotate-2 rounded-3xl bg-white p-8 shadow-2xl shadow-night-950/80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/products/4whled.png"
                alt="NightFury 4-Wheeler LED Headlight"
                className="w-full"
              />
            </div>
            <div className="absolute -left-5 top-8 rounded-lg border border-white/10 bg-night-900/95 px-4 py-2.5 shadow-xl">
              <div className="text-sm font-semibold text-white">CANBUS Ready</div>
              <div className="text-xs text-slate-500">Zero dash errors</div>
            </div>
            <div className="absolute -right-4 bottom-10 rounded-lg border border-white/10 bg-night-900/95 px-4 py-2.5 shadow-xl">
              <div className="text-sm font-semibold text-white">6000K / 4300K</div>
              <div className="text-xs text-slate-500">Dual color modes</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section id="categories" className="relative -mt-2 px-5">
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-night-900/80 p-6 md:p-8">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group flex flex-col items-center rounded-2xl px-4 py-6 text-center transition-colors hover:bg-night-800"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-flame-500/10">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f28c28"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {c.icon}
                  </svg>
                </span>
                <span className="mt-4 text-sm font-semibold text-white">{c.name}</span>
                <span className="mt-1 text-xs text-slate-500">{c.line}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-flame-400 opacity-0 transition-opacity group-hover:opacity-100">
                  View
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="px-5 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 rounded-3xl border border-white/10 bg-night-900/60 p-6 sm:grid-cols-2 lg:grid-cols-4 md:p-8">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-flame-500/10">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f28c28"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {t.icon}
                </svg>
              </span>
              <div>
                <div className="text-sm font-semibold text-white">{t.title}</div>
                <div className="mt-0.5 text-xs text-slate-500">{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SUB-BRANDS ============ */}
      <section id="brands" className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-flame-400">
            Our product lines
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold md:text-4xl">
            The NightFury range
          </h2>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {SUB_BRANDS.map((b) => (
              <Link
                key={b.slug}
                href={`/${b.slug}`}
                className="group flex flex-col rounded-2xl border border-white/10 bg-night-900/80 p-8 transition-colors hover:border-flame-500/40"
              >
                <BrandGlyph slug={b.slug} />
                <h3 className="mt-6 font-display text-2xl font-semibold">
                  {b.name.replace("NightFury ", "")}
                </h3>
                <p className="mt-1 text-sm font-medium text-flame-400">
                  {b.tagline}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">
                  {b.intro}
                </p>
                <ul className="mt-6 space-y-2">
                  {b.products.map((p) => (
                    <li key={p.slug} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-flame-500" />
                      {p.name}
                    </li>
                  ))}
                </ul>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-flame-400 transition-colors group-hover:text-flame-300">
                  Explore {b.name.replace("NightFury ", "")}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* car and bike on the road divider */}
      <div className="relative">
        <CarSilhouette className="absolute -top-[4.2rem] right-[10%] hidden h-[4.5rem] w-auto text-slate-500 opacity-50 md:block" />
        <BikeSilhouette className="absolute -top-[4.2rem] left-[10%] hidden h-[4.5rem] w-auto -scale-x-100 text-slate-500 opacity-50 md:block" />
        <RoadDivider />
      </div>

      {/* ============ WHY NIGHTFURY ============ */}
      <section className="bg-carbon relative overflow-hidden border-y border-white/5 py-24">
        <AlloyWheel className="animate-spin-slow pointer-events-none absolute -left-24 bottom-12 hidden h-80 w-80 text-slate-400 opacity-10 lg:block" />
        <div className="relative mx-auto max-w-7xl px-5">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-flame-400">
                The NightFury standard
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                Built like a performance brand
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-slate-400">
                The aftermarket is flooded with unbranded parts that fail in
                months. NightFury exists for drivers and riders who want
                OEM-plus quality with a face behind it: real warranties, real
                dealers, real accountability.
              </p>
            </div>
            <div className="space-y-6">
              {PILLARS.map((p) => (
                <div key={p.title} className="flex gap-5 rounded-2xl border border-white/5 bg-night-900/70 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-flame-500/15">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f28c28" strokeWidth="1.8">
                      {p.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden py-24">
        <CarSilhouette className="pointer-events-none absolute bottom-10 left-0 hidden h-28 w-auto -scale-x-100 text-slate-400 opacity-[0.14] lg:block" />
        <BikeSilhouette className="pointer-events-none absolute bottom-10 right-2 hidden h-28 w-auto text-slate-400 opacity-[0.14] lg:block" />
        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Ready to <span className="text-flame-500">drive the difference?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-slate-400">
            Find NightFury at your nearest accessories dealer, or partner with
            us to bring the range to your shelves.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/vision"
              className="rounded-md bg-flame-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-flame-600"
            >
              Browse the range
            </Link>
            <a
              href="#contact"
              className="rounded-md border border-white/15 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-flame-500/60"
            >
              Find nearby dealer
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function BrandGlyph({ slug }: { slug: string }) {
  const common = { width: 44, height: 44, viewBox: "0 0 24 24", fill: "none", stroke: "#f28c28", strokeWidth: 1.6 } as const;
  if (slug === "vision") {
    return (
      <svg {...common}>
        <circle cx="9" cy="12" r="6" />
        <path d="M15 8c3 0 7 1.8 7 4s-4 4-7 4M15 10.5h5M15 13.5h5" />
        <circle cx="9" cy="12" r="2.2" fill="#f28c28" stroke="none" />
      </svg>
    );
  }
  if (slug === "aroma") {
    return (
      <svg {...common}>
        <path d="M9 8h6l1.5 4v8a1.5 1.5 0 0 1-1.5 1.5H9A1.5 1.5 0 0 1 7.5 20v-8L9 8z" />
        <path d="M10 8V5.5h4V8M12 2.5v3" />
        <path d="M10.5 14c.8-1 2.2-1 3 0" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M3 13c2-5 6-8 9-8s7 3 9 8" />
      <path d="M5 13a7 7 0 0 0 14 0" />
      <path d="M9 16.5c1.8 1.4 4.2 1.4 6 0" />
    </svg>
  );
}
