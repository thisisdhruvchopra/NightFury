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

const STATS = [
  {
    value: "18 months",
    label: "Warranty on lighting",
    icon: <path d="M12 2 3 6v6c0 5 3.8 9 9 10 5.2-1 9-5 9-10V6l-9-4zM8.5 12l2.5 2.5L16 9.5" />,
  },
  {
    value: "IP67",
    label: "Water & dust rated",
    icon: <path d="M12 3C12 3 5 11 5 15.5a7 7 0 0 0 14 0C19 11 12 3 12 3z" />,
  },
  {
    value: "100%",
    label: "Batch quality tested",
    icon: (
      <>
        <circle cx={12} cy={13} r={8} />
        <path d="M12 13l3.5-3.5M9 2h6M12 2v3" />
      </>
    ),
  },
  {
    value: "3 lines",
    label: "Vision · Aroma · Care",
    icon: <path d="M2 17l5-10 4 7 3-4 3 7h4" />,
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
        <TachDial className="pointer-events-none absolute -right-24 top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 text-slate-400 opacity-[0.1] lg:block" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col items-center justify-center px-5 py-24 text-center">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-wider text-flame-400">
            Premium automotive parts &amp; accessories
          </p>
          <h1 className="animate-fade-up delay-100 mt-6 font-display text-5xl font-bold italic tracking-tight md:text-7xl">
            Night<span className="text-flame-500">Fury</span>
          </h1>
          <p className="animate-fade-up delay-200 mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Lighting that owns the dark, fragrance that defines your cabin, and
            care that keeps every drive showroom-fresh. One brand, one standard.
          </p>
          <div className="animate-fade-up delay-300 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/vision"
              className="rounded-md bg-flame-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-flame-600"
            >
              Explore products
            </Link>
            <a
              href="#brands"
              className="rounded-md border border-white/15 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-flame-500/60"
            >
              View the range
            </a>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="border-y border-white/5 bg-night-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center px-6 py-10 text-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f28c28"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {s.icon}
              </svg>
              <div className="mt-3 font-display text-2xl font-bold text-white">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-slate-400">{s.label}</div>
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
