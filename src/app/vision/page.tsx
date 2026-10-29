import VisionConfigurator from "@/components/VisionConfigurator";
import DealerBand from "@/components/DealerBand";
import JsonLd from "@/components/JsonLd";
import { NotifyForm } from "@/components/forms";
import { Breadcrumb, Eyebrow, FeatureCard, PhotoSlot, SkewButton, StatusTag } from "@/components/ui";
import { dealerHref, visionLed2w, visionLed4w } from "@/data/products";
import { pageMeta, productJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "NightFury Vision: LED Headlights for Cars and Bikes",
  description:
    "NightFury Vision 4-Wheeler LED headlight pair: 240W or 300W, 6000K and 4300K modes, CANBUS-ready, IP67, 18-month warranty. 2-Wheeler LED coming soon.",
  path: "/vision",
});

const STATS = [
  { big: "300", unit: "W", label: "Peak output, pair", dark: true },
  { big: "5,000", unit: "HR", label: "Rated life span" },
  { big: "IP", unit: "67", label: "Water and dust sealed" },
  { big: "18", unit: "MO", label: "Warranty", dark: true },
];

const STEPS = [
  { t: "Remove", d: "Twist out the stock halogen bulb." },
  { t: "Plug", d: "Seat the NightFury unit and connect the plug." },
  { t: "Light up", d: "Switch on. Zero dash errors, full beam." },
];

export default function VisionPage() {
  return (
    <>
      <JsonLd data={productJsonLd(visionLed4w, "/vision#flagship")} />

      {/* ============ HERO ============ */}
      <section className="bg-white">
        <Breadcrumb current="Lighting" />
        <div className="nf-container grid items-center gap-14 pt-12 pb-[clamp(56px,8vw,88px)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <Eyebrow>01 {"//"} NightFury Vision</Eyebrow>
            <h1 className="nf-display nf-h1 mt-4">
              See the
              <br />
              <span className="nf-accent">difference.</span>
            </h1>
            <p className="nf-sub mt-[26px]">Turn night into day. Plug in and drive.</p>
            <p className="nf-body nf-body-lg mt-3 max-w-[520px]">
              Precision LED lighting for riders and drivers who refuse to compromise after dark. CANBUS-ready, thermally managed, and tested on the worst roads before it earns the badge.
            </p>
            <div className="mt-[34px] flex flex-wrap gap-[22px]">
              <SkewButton href="#flagship" variant="orange" size="lg">See the 4W LED &#8594;</SkewButton>
              <SkewButton href={dealerHref("vision")} variant="outline" size="lg">Bulk enquiry</SkewButton>
            </div>
          </div>
          <dl className="m-0 grid min-w-0 grid-cols-2 gap-[14px]">
            {STATS.map((s) => (
              <div key={s.label} className={`rounded-[3px] p-[clamp(18px,2vw,26px)] ${s.dark ? "bg-navy text-chalk" : "border-2 border-navy bg-white"}`}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="m-0">
                  <span className="font-display text-[clamp(40px,4.4vw,56px)] leading-[0.9] font-extrabold italic">
                    {s.big}
                    <span className={`text-[clamp(18px,2vw,24px)] ${s.dark ? "text-fury" : "text-fury-sm"}`}>{s.unit}</span>
                  </span>
                  <span aria-hidden="true" className={`mt-[10px] block font-mono text-[11px] font-bold tracking-[0.14em] uppercase ${s.dark ? "text-navy-soft" : "text-muted"}`}>
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ FLAGSHIP ============ */}
      <section id="flagship" className="nf-anchor border-t-2 border-navy bg-chalk">
        <div className="nf-container nf-section">
          <VisionConfigurator />
        </div>
      </section>

      {/* ============ WHY UPGRADE ============ */}
      <section className="border-t-2 border-navy bg-white" aria-labelledby="why-title">
        <div className="nf-container nf-section">
          <h2 id="why-title" className="nf-display nf-h2-sm mb-11">
            Why <span className="nf-accent">upgrade.</span>
          </h2>
          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon="canbus" title="CANBUS-ready">
              No error codes, no flicker warnings on the dash. It talks to your car&apos;s electronics.
            </FeatureCard>
            <FeatureCard icon="sun" title="Two colour modes">
              Crisp 6000K white for clear nights. Warm 4300K that cuts through fog and rain.
            </FeatureCard>
            <FeatureCard icon="drop" title="IP67 sealed">
              Water and dust rated for monsoon floods, dusty highways and pressure washes.
            </FeatureCard>
            <FeatureCard icon="shield" title="18-month warranty">
              One of the longest in the segment, handled through our dealer network.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* ============ INSTALL ============ */}
      <section className="border-t-2 border-navy bg-chalk" aria-labelledby="install-title">
        <div className="nf-container nf-section grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="min-w-0">
            <Eyebrow>{"// Install"}</Eyebrow>
            <h2 id="install-title" className="nf-display nf-h2-sm mt-[14px]">
              Plug in. <span className="nf-accent">Drive.</span>
            </h2>
            <p className="nf-body mt-[18px]">No cutting, no splicing. If your dealer fits it, it takes minutes.</p>
          </div>
          <ol className="m-0 grid min-w-0 list-none gap-4 p-0 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.t} className="nf-card bg-white p-6">
                <div className="font-display text-[52px] leading-none font-extrabold italic text-fury-lg">0{i + 1}</div>
                <div className="mt-[10px] font-display text-[24px] leading-none font-extrabold italic uppercase">{s.t}</div>
                <p className="nf-body mt-2 text-[13px] leading-[1.6]">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ 2W LED (COMING SOON) ============ */}
      <section id={visionLed2w.key} className="nf-anchor border-t-2 border-navy bg-white" aria-labelledby="two-wheeler-title">
        <div className="nf-container nf-section grid items-center gap-14 lg:grid-cols-2">
          <PhotoSlot
            label={visionLed2w.photoLabel ?? ""}
            tag={<StatusTag status={visionLed2w.status} />}
            className="h-[clamp(280px,32vw,360px)]"
          />
          <div className="min-w-0">
            <Eyebrow>Single unit {"//"} Coming soon</Eyebrow>
            <h2 id="two-wheeler-title" className="nf-display nf-h3 mt-[14px]">{visionLed2w.name}</h2>
            <p className="nf-sub mt-[10px] text-[24px] text-fury-lg">{visionLed2w.tagline}</p>
            <p className="nf-body mt-[14px]">{visionLed2w.description}</p>
            <p className="mt-[14px] font-mono text-[12px] font-bold tracking-[0.12em] uppercase">{visionLed2w.formatLine}</p>
            <NotifyForm product={visionLed2w.slug} className="mt-6 max-w-[480px]" />
          </div>
        </div>
      </section>

      {/* ============ WARRANTY ============ */}
      <section className="on-navy bg-navy text-chalk" aria-labelledby="warranty-title">
        <div className="nf-container grid items-end gap-10 py-[clamp(64px,8vw,80px)] lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <p className="mb-3 font-mono text-[13px] font-bold tracking-[0.2em] uppercase text-fury">{"// Warranty"}</p>
            <h2 id="warranty-title" className="nf-display nf-h2-sm text-chalk">
              18 months. <span className="text-fury">No drama.</span>
            </h2>
            <p className="mt-[18px] max-w-[620px] font-mono text-[15px] leading-[1.7] text-[#C9CFDB]">
              Register your Vision purchase and keep the bill. If it fails within 18 months, your dealer swaps it. Covers purchases from official NightFury listings and authorized dealers.
            </p>
          </div>
          <div>
            <SkewButton href="/warranty-policy" variant="orange" size="lg" className="whitespace-nowrap">Warranty details &#8594;</SkewButton>
          </div>
        </div>
      </section>

      <DealerBand
        title="Stock lighting that doesn't come back."
        body="Warranty-backed LED with retail-ready packaging. Bulk pricing through Yash Marketing, Kanpur."
        cta="Bulk enquiry"
        href={dealerHref("vision")}
      />
    </>
  );
}
