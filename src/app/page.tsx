import Link from "next/link";
import SensePanel from "@/components/SensePanel";
import ScrollStage from "@/components/ScrollStage";
import DealerBand from "@/components/DealerBand";
import FlipkartButton from "@/components/FlipkartButton";
import { NotifyForm } from "@/components/forms";
import { Eyebrow, FeatureCard, PhotoSlot, Pip, SkewButton, StatusTag } from "@/components/ui";
import {
  AROMA_PRODUCTS,
  careMicrofiber,
  careWipes,
  dealerHref,
  notifyHref,
  visionLed2w,
  visionLed4w,
} from "@/data/products";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "NightFury: LED Headlights, Car Perfumes and Car Care",
  description:
    "NightFury Vision LED headlights, Aroma car perfumes and Care detailing essentials. Buy Aroma Core on Flipkart or stock NightFury through our dealer network across India.",
  path: "/",
});

const TRUST = ["18-month warranty", "IP67 rated", "100% batch tested", "Flipkart + dealers"];

const VISION_STATS = [
  { big: "300", unit: "W", label: "PEAK, PAIR" },
  { big: "5K", unit: "HR", label: "LIFE SPAN" },
  { big: "IP", unit: "67", label: "SEALED" },
  { big: "18", unit: "MO", label: "WARRANTY" },
];

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="bg-white">
        <div className="nf-container grid items-end gap-10 pt-[clamp(40px,6vw,72px)] lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-12">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-3 bg-navy px-[14px] py-2 font-mono text-[12px] font-bold tracking-[0.2em] uppercase text-chalk">
              <span aria-hidden="true" className="nf-pulse h-2 w-2 bg-fury" />
              Premium automotive accessories
            </div>
            <h1 className="nf-display mt-[26px]" style={{ fontSize: "clamp(58px, 10vw, 136px)", lineHeight: 0.84, letterSpacing: "-0.025em" }}>
              Drive the
              <br />
              <span className="nf-accent">difference.</span>
            </h1>
          </div>
          <div className="min-w-0 pb-2">
            <ul className="m-0 flex list-none flex-col gap-[6px] p-0 font-display text-[clamp(24px,2.4vw,30px)] leading-none font-extrabold italic uppercase">
              {["See it.", "Smell it.", "Feel it."].map((t) => (
                <li key={t} className="flex items-center gap-3"><Pip size={10} />{t}</li>
              ))}
            </ul>
            <p className="nf-body mt-[18px]">
              Lighting that owns the dark. Fragrance that takes over the cabin. Care that keeps it showroom-sharp. One brand, zero compromise.
            </p>
            <div className="mt-6 flex flex-wrap gap-5">
              <SkewButton href="#aroma" variant="orange">Explore &#8594;</SkewButton>
              <SkewButton href="/dealers" variant="outline">Stock NightFury</SkewButton>
            </div>
          </div>
        </div>

        <div className="nf-container pt-14 pb-20">
          <p className="nf-label mb-4 text-[12px] tracking-[0.2em]">{"// Pick your sense"}</p>
          <div className="grid gap-5 md:grid-cols-3">
            <SensePanel sense="see" />
            <SensePanel sense="smell" />
            <SensePanel sense="feel" />
          </div>
        </div>
        <div aria-hidden="true" className="flex flex-col gap-1">
          <div className="h-[14px] bg-fury" />
          <div className="h-[6px] bg-navy" />
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <div className="bg-navy text-chalk">
        <ul className="nf-container m-0 flex list-none flex-wrap justify-between gap-x-10 gap-y-[14px] py-[18px] font-mono text-[13px] font-semibold tracking-[0.14em] uppercase">
          {TRUST.map((t) => (
            <li key={t} className="inline-flex items-center gap-[10px]"><Pip />{t}</li>
          ))}
        </ul>
      </div>

      {/* ============ AROMA ============ */}
      <section id="aroma" className="nf-anchor bg-chalk" aria-labelledby="aroma-title">
        <div className="nf-container pt-[clamp(64px,8vw,88px)] pb-12">
          <Eyebrow>02 {"//"} NightFury Aroma</Eyebrow>
          <h2 id="aroma-title" className="nf-display mt-[14px]" style={{ fontSize: "clamp(48px, 7.4vw, 96px)" }}>
            Smell the <span className="nf-accent">difference.</span>
          </h2>
          <div className="mt-[26px] flex flex-wrap items-center justify-between gap-x-12 gap-y-5">
            <p className="nf-body nf-body-lg max-w-[560px]">
              Three formats. Eleven scents. Fragrance engineered like a performance part, because the way your car smells says as much as the way it sounds.
            </p>
            <nav aria-label="Aroma formats" className="flex flex-wrap gap-[14px]">
              {AROMA_PRODUCTS.map((p) => (
                <Link
                  key={p.slug}
                  href={`#aroma-${p.key}`}
                  className="inline-block border-2 border-navy bg-white px-[18px] py-[10px] font-display text-[17px] font-extrabold italic uppercase no-underline"
                >
                  {p.num} {p.name.replace("Aroma ", "")}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        {AROMA_PRODUCTS.map((p) => (
          <ScrollStage key={p.slug} product={p} />
        ))}
      </section>

      {/* ============ VISION ============ */}
      <section id="vision" className="nf-anchor border-t-2 border-navy bg-white" aria-labelledby="vision-title">
        <div className="nf-container nf-section grid items-center gap-14 lg:grid-cols-2">
          <PhotoSlot label="[Product photo: 4W LED pair, beam on]" flag="N° 001 Flagship" className="h-[clamp(320px,40vw,480px)]" />
          <div className="min-w-0">
            <Eyebrow>01 {"//"} NightFury Vision {"//"} See the difference</Eyebrow>
            <h2 id="vision-title" className="nf-display mt-4" style={{ fontSize: "clamp(48px, 7.4vw, 96px)" }}>
              Own the <span className="nf-accent">night.</span>
            </h2>
            <p className="nf-body nf-body-lg mt-[22px]">{visionLed4w.summary}</p>
            <dl className="m-0 mt-7 grid grid-cols-2 border-y-2 border-navy sm:grid-cols-4">
              {VISION_STATS.map((s) => (
                <div key={s.label} className="min-w-0 py-4 pr-2">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="m-0">
                    <span className="font-display text-[36px] leading-[0.9] font-extrabold italic">
                      {s.big}<span className="text-[17px] text-fury-sm">{s.unit}</span>
                    </span>
                    <span aria-hidden="true" className="mt-[6px] block font-mono text-[10px] font-bold tracking-[0.12em] text-muted">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-[18px] font-mono text-[13px] font-semibold tracking-[0.08em] uppercase">Outputs 240W / 300W {"//"} 9V to 32V {"//"} CANBUS</p>
            <div className="mt-7 flex flex-wrap gap-5">
              <FlipkartButton url={visionLed4w.models?.[0]?.flipkartUrl} name={visionLed4w.name} notifyHref={notifyHref(visionLed4w.slug)} />
              <SkewButton href={dealerHref("vision", visionLed4w.slug)} variant="outline">Bulk enquiry</SkewButton>
            </div>
            <p className="mt-[22px] font-mono text-[13px] text-muted">
              2-Wheeler LED headlight: coming soon.{" "}
              <Link href={notifyHref(visionLed2w.slug)} className="font-bold">Notify me</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ============ CARE ============ */}
      <section id="care" className="nf-anchor border-t-2 border-navy bg-chalk" aria-labelledby="care-title">
        <div className="nf-container nf-section grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="min-w-0">
            <Eyebrow>03 {"//"} NightFury Care {"//"} Feel the difference</Eyebrow>
            <h2 id="care-title" className="nf-display mt-4" style={{ fontSize: "clamp(44px, 6.2vw, 80px)" }}>
              Showroom sharp. <span className="nf-accent">Every wipe.</span>
            </h2>
            <p className="nf-body nf-body-lg mt-5">
              Detailing-grade microfiber and pH-balanced wipes. The same materials professional studios trust. Landing soon.
            </p>
          </div>
          <div className="grid min-w-0 gap-[18px] sm:grid-cols-2">
            {[careMicrofiber, careWipes].map((p) => (
              <div key={p.slug} className="nf-card bg-white p-[26px]">
                <StatusTag status={p.status} />
                <h3 className="nf-display mt-[18px] text-[32px] leading-[0.95]" style={{ letterSpacing: 0 }}>{p.name}</h3>
                <p className="mt-2 font-mono text-[12px] font-semibold tracking-[0.08em] uppercase text-muted">{p.formatLine}</p>
                <Link href={notifyHref(p.slug)} className="mt-4 inline-block py-2 font-display text-[18px] font-extrabold italic uppercase">
                  Notify me &#8594;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STANDARD ============ */}
      <section id="standard" className="nf-anchor border-t-2 border-navy bg-white" aria-labelledby="standard-title">
        <div className="nf-container nf-section">
          <h2 id="standard-title" className="nf-display mb-12 max-w-[900px]" style={{ fontSize: "clamp(44px, 6.4vw, 84px)" }}>
            Built like a <span className="nf-accent">performance brand.</span>
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard icon="gauge" title="Engineered, not assembled">
              Thermal, vibration and endurance tested before it earns the badge. One failure scraps the whole batch.
            </FeatureCard>
            <FeatureCard icon="shield" title="18-month warranty">
              One of the longest lighting warranties in the segment. Built right, it doesn&apos;t come back.
            </FeatureCard>
            <FeatureCard icon="pin" title="Dealer-first network">
              From metro accessory hubs to highway service points. Genuine NightFury, always within reach.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* ============ WHERE TO BUY ============ */}
      <section id="buy" className="nf-anchor border-t-2 border-navy bg-chalk" aria-labelledby="buy-title">
        <div className="nf-container nf-section">
          <h2 id="buy-title" className="nf-display mb-10" style={{ fontSize: "clamp(44px, 6.4vw, 84px)" }}>
            Get it <span className="nf-accent">your way.</span>
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="nf-card bg-white p-[clamp(24px,3vw,36px)]">
              <p className="nf-eyebrow text-[12px]">{"// Online"}</p>
              <h3 className="nf-display mt-[10px] text-[clamp(32px,3.4vw,42px)]" style={{ letterSpacing: 0 }}>Buy on Flipkart</h3>
              <p className="nf-body mt-3">
                Aroma Core is live on the official NightFury listings. Aroma Air, Aroma Essence and the 4W LED land next.
              </p>
              <div className="mt-[26px]">
                <SkewButton href="/where-to-buy">Shop the range &#8594;</SkewButton>
              </div>
            </div>
            <div className="nf-card bg-white p-[clamp(24px,3vw,36px)]">
              <p className="nf-eyebrow text-[12px]">{"// In store"}</p>
              <h3 className="nf-display mt-[10px] text-[clamp(32px,3.4vw,42px)]" style={{ letterSpacing: 0 }}>Find a dealer</h3>
              <p className="nf-body mt-3">Drop your city. We point you to the nearest NightFury dealer.</p>
              <form action="/where-to-buy#find-dealer" method="get" className="mt-[26px] flex border-2 border-navy bg-white">
                <label htmlFor="home-city" className="sr-only">Your city</label>
                <input
                  id="home-city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="YOUR CITY"
                  className="h-[52px] min-w-0 flex-1 border-none bg-transparent px-[18px] font-mono text-[14px] tracking-[0.1em] outline-none placeholder:text-muted"
                />
                <button type="submit" className="h-[52px] flex-none cursor-pointer border-none bg-fury px-6 font-display text-[18px] font-extrabold italic uppercase text-carbon">
                  Find &#8594;
                </button>
              </form>
            </div>
          </div>
          <p className="mt-[22px] font-mono text-[12px] text-muted">
            The 18-month warranty covers purchases from official NightFury listings and authorized dealers only.
          </p>
        </div>
      </section>

      <DealerBand
        title="Stock the brand they ask for by name."
        body="Three lines from one supplier. Retail-ready packaging. Warranty handled for your customers. Direct support from Yash Marketing, Kanpur."
        cta="Become a Dealer"
        href="/dealers"
      />

      {/* ============ NEWSLETTER ============ */}
      <section className="border-t-2 border-navy bg-white" aria-labelledby="garage-title">
        <div className="nf-container grid items-center gap-8 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="min-w-0">
            <p className="nf-eyebrow mb-2 text-[12px] tracking-[0.2em]">{"// Join the garage"}</p>
            <h2 id="garage-title" className="nf-display text-[clamp(40px,4.4vw,52px)]" style={{ lineHeight: 0.9, letterSpacing: 0 }}>New drops. First.</h2>
          </div>
          <NotifyForm
            product="newsletter"
            label="Email or WhatsApp number"
            placeholder="EMAIL OR WHATSAPP"
            button="Subscribe"
            buttonTone="navy"
            shadow
          />
        </div>
      </section>
    </>
  );
}
