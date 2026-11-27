import Link from "next/link";
import GoogleReviews from "@/components/GoogleReviews";
import HomeStages from "@/components/HomeStages";
import DealerBand from "@/components/DealerBand";
import { FeatureCard, Pip, SkewButton, StatusTag } from "@/components/ui";
import { FLIPKART_STORE_URL, notifyHref } from "@/data/products";
import { COMING_NEXT, DISTRIBUTOR_NOTE, HERO, LINES, STATS, WHY } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import { SHOW_TODOS, Todo, ready } from "@/lib/todo";

export const metadata = pageMeta({
  title: "Nightfury Automotive: LED Headlights, Car Perfumes and Car Care",
  description:
    "Nightfury Vision LED headlights, Aroma car perfumes and Care detailing essentials. Buy Aroma car perfumes on Flipkart or stock Nightfury through our dealer network across India.",
  path: "/",
});

/* Until the store URL is filled in, send shoppers to a Flipkart search for Nightfury. */
const flipkartHref = ready(FLIPKART_STORE_URL) ? FLIPKART_STORE_URL : "https://www.flipkart.com/search?q=nightfury";

/* Live site: the first four finished stats. Dev: every stat, placeholders highlighted. */
const stats = SHOW_TODOS ? STATS : STATS.filter((s) => ready(s.value)).slice(0, 4);

export default function Home() {
  return (
    <>
      {/* ============ HERO: full-bleed photo ============ */}
      <section aria-labelledby="hero-title" className="nf-hero on-navy relative isolate overflow-hidden bg-[#05070B] text-chalk">
        {/* eslint-disable-next-line @next/next/no-img-element -- single pre-sized hero WebP, loaded eagerly */}
        <img
          src={HERO.image}
          alt={HERO.imageAlt}
          fetchPriority="high"
          decoding="async"
          className="block h-[300px] w-full object-cover object-[62%_55%] md:absolute md:inset-0 md:-z-10 md:h-full md:object-[68%_50%]"
        />
        <div aria-hidden="true" className="absolute inset-x-0 top-[200px] h-[100px] bg-gradient-to-b from-transparent to-[#05070B] md:hidden" />
        <div aria-hidden="true" className="nf-hero-shade absolute inset-0 -z-10 hidden md:block" />

        {/* Text hugs the left edge and is capped at a share of the viewport, so
            it stays clear of the car, which sits from about 40% across. */}
        <div className="flex h-full flex-col justify-end px-5 pt-2 pb-12 md:justify-center md:pt-24 md:pr-0 md:pb-24 md:pl-[clamp(40px,6vw,120px)]">
          <div className="md:w-[min(480px,36vw)]">
            <p className="m-0 font-mono text-[12px] font-bold tracking-[0.2em] uppercase text-fury">{HERO.eyebrow}</p>
            <h1 id="hero-title" className="nf-display mt-5 text-chalk" style={{ fontSize: "clamp(42px, 4.6vw, 72px)", lineHeight: 1 }}>
              {HERO.title[0]}
              <br />
              <span className="text-fury">{HERO.title[1]}</span>
            </h1>
            <p className="nf-body nf-body-lg mt-6 text-[#C9D0DC]">{HERO.body}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <SkewButton href="#lines" variant="orange" size="lg" className="nf-btn--cta">
                Explore the range
              </SkewButton>
              <Link href="/dealers" className="nf-textlink text-chalk hover:text-fury">
                Become a dealer <span aria-hidden="true">&#8594;</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="nf-container absolute inset-x-0 bottom-0 hidden md:block">
          <ul className="m-0 flex list-none flex-wrap gap-x-8 gap-y-2 border-t border-white/15 p-0 py-5 font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[#C9D0DC]">
            {["18-month warranty on Vision", "IP67 rated, CANBUS-ready", "Aroma range live on Flipkart", "Dealer network across India"].map((t) => (
              <li key={t} className="flex items-center gap-[10px]"><Pip size={7} />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ PROOF NUMBERS ============ */}
      {stats.length > 0 && (
        <section aria-label="Nightfury in numbers" className="border-b border-hairline bg-white">
          <div className="nf-container">
          <dl className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
            {stats.map((s) => (
              <div key={s.label} className="flex min-w-0 flex-col-reverse gap-2 border-hairline py-8 pr-4 md:border-l md:pl-8 md:first:border-l-0 md:first:pl-0">
                <dt className="nf-label">{s.label}</dt>
                <dd className="nf-display m-0 whitespace-nowrap text-[clamp(32px,3.2vw,44px)] text-carbon"><Todo value={s.value} /></dd>
              </div>
            ))}
          </dl>
          </div>
        </section>
      )}

      {/* ============ SHOP BY LINE: photo tiles ============ */}
      <section id="lines" aria-labelledby="lines-title" className="nf-anchor bg-white">
        <div className="nf-container nf-section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="nf-eyebrow">One brand {"//"} Three senses</p>
              <h2 id="lines-title" className="nf-display nf-h2 mt-3">
                Built for <span className="nf-accent">every drive.</span>
              </h2>
            </div>
            <p className="nf-body max-w-[420px]">
              Light for the road ahead, fragrance for the cabin, and care for everything in between.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {LINES.map((l) => (
              <Link key={l.key} href={l.href} className="nf-tile group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[3px] bg-[#05070B] p-6 text-chalk no-underline hover:text-chalk md:p-7">
                {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP tile */}
                <img src={l.image} alt={l.imageAlt} loading="lazy" decoding="async" className="nf-tile-img absolute inset-0 -z-10 h-full w-full object-cover" />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#05070B] via-[#05070B]/55 to-transparent" />
                {l.status === "coming-soon" && (
                  <StatusTag status="coming-soon" tone="orange" className="absolute top-6 left-6" />
                )}
                <p className="m-0 font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-fury">{l.eyebrow} {"//"} {l.kind}</p>
                <h3 className="nf-display mt-2 text-[clamp(36px,3.4vw,48px)] text-chalk">{l.title}</h3>
                <p className="nf-body mt-3 text-[#C9D0DC]">{l.body}</p>
                <span className="nf-textlink mt-5 text-chalk group-hover:text-fury">
                  Explore {l.title} <span aria-hidden="true">&#8594;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SCROLL STAGES (Aroma, then Vision) ============ */}
      <HomeStages />

      {/* ============ COMING NEXT ============ */}
      <section aria-labelledby="next-title" className="border-t-2 border-navy bg-chalk">
        <div className="nf-container py-[clamp(48px,6vw,72px)]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="next-title" className="nf-display nf-h3">Coming <span className="nf-accent">next.</span></h2>
            <p className="nf-label">Be the first to know when they launch</p>
          </div>
          <ul className="m-0 mt-8 grid list-none gap-4 p-0 md:grid-cols-3">
            {COMING_NEXT.map((c) => (
              <li key={c.name} className="flex min-w-0 flex-col rounded-[3px] bg-white p-6">
                <h3 className="nf-display text-[30px]" style={{ letterSpacing: 0 }}>{c.name}</h3>
                <p className="nf-body mt-2 flex-1">{c.detail}</p>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  <Link href={notifyHref(c.product)} className="nf-textlink">Get notified <span aria-hidden="true">&#8594;</span></Link>
                  <Link href={c.href} className="nf-textlink text-muted">Details</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ WHY NIGHTFURY ============ */}
      <section aria-labelledby="why-title" className="bg-white">
        <div className="nf-container nf-section">
          <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
            <div>
              <p className="nf-eyebrow">Why Nightfury</p>
              <h2 id="why-title" className="nf-display nf-h2-sm mt-3">
                Made to sell. <span className="nf-accent">Built to last.</span>
              </h2>
              <p className="nf-body mt-5 max-w-[420px]">
                <Todo value={DISTRIBUTOR_NOTE} fallback="Sold across India on Flipkart and through a growing network of authorized dealers." />
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {WHY.map((w) => (
                <FeatureCard key={w.title} icon={w.icon} title={w.title} white>{w.body}</FeatureCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GoogleReviews />

      <DealerBand
        id="buy"
        eyebrow="// For dealers"
        title="Stock Nightfury."
        body="Three product lines from one supplier, retail-ready packaging and direct support from the Nightfury team. Tell us about your shop and we'll call you back within two working days."
        cta="Become a Dealer"
        href="/dealers"
        secondary={{ href: flipkartHref, label: "Buying for your car? Shop on Flipkart", external: true }}
      />
    </>
  );
}
