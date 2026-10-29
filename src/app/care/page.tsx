import CarePacks from "@/components/CarePacks";
import DealerBand from "@/components/DealerBand";
import { NotifyForm } from "@/components/forms";
import { Breadcrumb, Eyebrow, FeatureCard, PhotoSlot, SkewButton, SpecTable, StatusTag } from "@/components/ui";
import { careMicrofiber, careWipes, dealerHref } from "@/data/products";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "NightFury Care: Microfiber Cloths and Car Wipes",
  description:
    "NightFury Care is coming: 380 GSM edgeless microfiber cloths and pH-balanced car wet wipes. Get notified the day they land on Flipkart and with dealers.",
  path: "/care",
});

export default function CarePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section id="top" className="nf-anchor bg-white">
        <Breadcrumb current="Car Care" />
        <div className="nf-container grid items-center gap-14 pt-12 pb-[clamp(56px,8vw,88px)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <Eyebrow>03 {"//"} NightFury Care</Eyebrow>
            <h1 className="nf-display nf-h1 mt-4">
              Feel the
              <br />
              <span className="nf-accent">difference.</span>
            </h1>
            <p className="nf-sub mt-[26px]">Showroom sharp. Every wipe.</p>
            <p className="nf-body nf-body-lg mt-3 max-w-[520px]">
              Detailing-grade care for daily drivers. Plush microfiber and pH-balanced wipes that protect paint, glass and interiors. The same materials professional studios trust.
            </p>
          </div>
          <div id="notify" className="on-navy nf-anchor min-w-0 rounded-[3px] bg-navy p-[clamp(24px,3vw,32px)] text-chalk">
            <StatusTag status="coming-soon" tone="orange" className="py-[6px]" />
            <h2 className="nf-display mt-[18px] text-[44px] text-chalk" style={{ lineHeight: 0.92, letterSpacing: 0 }}>Be first in line.</h2>
            <p className="mt-[10px] font-mono text-[13px] leading-[1.7] text-[#C9CFDB]">
              We&apos;ll message you the day Care lands on Flipkart and with dealers.
            </p>
            <NotifyForm product="care" dark className="mt-[22px]" />
          </div>
        </div>
      </section>

      {/* ============ MICROFIBER ============ */}
      <section id={careMicrofiber.key} className="nf-anchor border-t-2 border-navy bg-chalk" aria-labelledby="mf-title">
        <div className="nf-container nf-section grid items-center gap-14 lg:grid-cols-2">
          <PhotoSlot white label={careMicrofiber.photoLabel ?? ""} flag={`N° ${careMicrofiber.num}`} />
          <div className="min-w-0">
            <StatusTag status={careMicrofiber.status} className="py-[6px]" />
            <h2 id="mf-title" className="nf-display mt-4" style={{ fontSize: "clamp(44px, 5.4vw, 72px)" }}>{careMicrofiber.name}</h2>
            <p className="nf-sub mt-[10px] text-[24px] text-fury-lg">{careMicrofiber.tagline}</p>
            <p className="nf-body mt-[14px]">{careMicrofiber.description}</p>
            <CarePacks product={careMicrofiber} />
            <div className="mt-[26px] flex flex-wrap gap-5">
              <SkewButton href="#notify">Notify me</SkewButton>
              <SkewButton href={dealerHref("care", careMicrofiber.slug)} variant="outline">Dealer enquiry</SkewButton>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WIPES ============ */}
      <section id={careWipes.key} className="nf-anchor border-t-2 border-navy bg-white" aria-labelledby="wipes-title">
        <div className="nf-container nf-section grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 min-w-0 lg:order-1">
            <StatusTag status={careWipes.status} className="py-[6px]" />
            <h2 id="wipes-title" className="nf-display mt-4" style={{ fontSize: "clamp(44px, 5.4vw, 72px)" }}>{careWipes.name}</h2>
            <p className="nf-sub mt-[10px] text-[24px] text-fury-lg">{careWipes.tagline}</p>
            <p className="nf-body mt-[14px]">{careWipes.description}</p>
            <SpecTable specs={careWipes.specs} className="mt-[22px]" />
            <div className="mt-[26px] flex flex-wrap gap-5">
              <SkewButton href="#notify">Notify me</SkewButton>
              <SkewButton href={dealerHref("care", careWipes.slug)} variant="outline">Dealer enquiry</SkewButton>
            </div>
          </div>
          <div className="order-1 min-w-0 lg:order-2">
            <PhotoSlot label={careWipes.photoLabel ?? ""} flag={`N° ${careWipes.num}`} />
          </div>
        </div>
      </section>

      {/* ============ STANDARD ============ */}
      <section className="border-t-2 border-navy bg-chalk" aria-labelledby="care-std-title">
        <div className="nf-container nf-section">
          <h2 id="care-std-title" className="nf-display nf-h2-sm mb-11">
            The care <span className="nf-accent">standard.</span>
          </h2>
          <div className="grid gap-[18px] md:grid-cols-3">
            <FeatureCard white icon="shieldPlain" title="Safe on coatings">
              Ceramic, PPF and gloss black trim. No swirls, no haze.
            </FeatureCard>
            <FeatureCard white icon="dropShine" title="pH-balanced">
              Alcohol-free formula that&apos;s kind to leather, plastic and screens.
            </FeatureCard>
            <FeatureCard white icon="spark" title="Lint-free finish">
              Matte and anti-static, so dust doesn&apos;t come straight back.
            </FeatureCard>
          </div>
        </div>
      </section>

      <DealerBand
        title="Reserve Care stock early."
        body="Get on the first allocation list through Yash Marketing, Kanpur."
        cta="Dealer enquiry"
        href={dealerHref("care")}
      />
    </>
  );
}
