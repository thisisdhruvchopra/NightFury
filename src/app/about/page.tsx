import SensePanel from "@/components/SensePanel";
import DealerBand from "@/components/DealerBand";
import { Breadcrumb, Eyebrow, FeatureCard, Pip, SectionHeading } from "@/components/ui";
import { BUSINESS, SUPPORT } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About NightFury: Drive The Difference",
  description:
    "NightFury makes Vision LED headlights, Aroma car perfumes and Care detailing essentials. Distributed by Yash Marketing, Kanpur, through Flipkart and authorized dealers.",
  path: "/about",
});

const TAGLINES = [
  { line: "Vision", tag: "See the difference" },
  { line: "Aroma", tag: "Smell the difference" },
  { line: "Care", tag: "Feel the difference" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-white">
        <Breadcrumb current="About" />
        <div className="nf-container grid items-end gap-10 pt-12 pb-[clamp(48px,6vw,72px)] lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <Eyebrow>{"// About NightFury"}</Eyebrow>
            <SectionHeading as="h1" size="nf-h1" className="mt-4" lead="Drive the" accent="difference." breakLine />
          </div>
          <div className="min-w-0">
            <ul className="m-0 flex list-none flex-col gap-[6px] p-0 font-display text-[clamp(24px,2.4vw,30px)] leading-none font-extrabold italic uppercase">
              {["See it.", "Smell it.", "Feel it."].map((t) => (
                <li key={t} className="flex items-center gap-3"><Pip size={10} />{t}</li>
              ))}
            </ul>
            <p className="nf-body mt-[18px]">
              Lighting that owns the dark. Fragrance that takes over the cabin. Care that keeps it showroom-sharp. One brand, zero compromise.
            </p>
          </div>
        </div>
        <div aria-hidden="true" className="flex flex-col gap-1">
          <div className="h-[14px] bg-fury" />
          <div className="h-[6px] bg-navy" />
        </div>
      </section>

      <section className="border-b-2 border-navy bg-chalk" aria-labelledby="lines-title">
        <div className="nf-container nf-section">
          <h2 id="lines-title" className="nf-display nf-h2-sm mb-4">
            Three lines. <span className="nf-accent">One standard.</span>
          </h2>
          <ul className="m-0 mb-10 flex list-none flex-wrap gap-x-8 gap-y-2 p-0 font-mono text-[13px] font-semibold tracking-[0.14em] uppercase text-muted">
            {TAGLINES.map((t) => (
              <li key={t.line}><span className="text-carbon">{t.line}</span> {"//"} {t.tag}</li>
            ))}
          </ul>
          <div className="grid gap-5 md:grid-cols-3">
            <SensePanel sense="see" />
            <SensePanel sense="smell" />
            <SensePanel sense="feel" />
          </div>
        </div>
      </section>

      <section className="bg-white" aria-labelledby="standard-title">
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

      <section className="on-navy bg-navy text-chalk" aria-labelledby="who-title">
        <div className="nf-container nf-section grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <p className="m-0 mb-3 font-mono text-[13px] font-bold tracking-[0.2em] uppercase text-fury">{"// Who we are"}</p>
            <h2 id="who-title" className="nf-display nf-h2-sm text-chalk">
              {BUSINESS.legalName}, <span className="text-fury">Kanpur.</span>
            </h2>
            <p className="mt-5 max-w-[600px] font-mono text-[15px] leading-[1.75] text-[#C9CFDB]">
              {BUSINESS.legalName} is the authorized distributor of NightFury products. We supply the range on Flipkart and to dealers across India, and handle warranty and support for every customer.
            </p>
          </div>
          <dl className="m-0 grid min-w-0 gap-5 font-mono text-[13px] leading-[1.7]">
            <div>
              <dt className="text-[11px] font-bold tracking-[0.2em] uppercase text-fury">Registered address</dt>
              <dd className="m-0 mt-1 text-chalk">{BUSINESS.fullAddress}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold tracking-[0.2em] uppercase text-fury">GSTIN</dt>
              <dd className="m-0 mt-1 text-chalk">{BUSINESS.gstin}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold tracking-[0.2em] uppercase text-fury">Support</dt>
              <dd className="m-0 mt-1">
                <a href={`mailto:${SUPPORT.email}`} className="text-chalk hover:text-fury">{SUPPORT.email}</a>
                <br />
                <a href={SUPPORT.phoneHref} className="text-chalk hover:text-fury">{SUPPORT.phone}</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <DealerBand
        title="Stock the brand they ask for by name."
        body="Three lines from one supplier. Retail-ready packaging. Warranty handled for your customers. Direct support from Yash Marketing, Kanpur."
        cta="Become a Dealer"
        href="/dealers"
      />
    </>
  );
}
