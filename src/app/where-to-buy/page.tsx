import { Suspense } from "react";
import Link from "next/link";
import FlipkartButton from "@/components/FlipkartButton";
import DealerBand from "@/components/DealerBand";
import { FindDealerForm, NotifyPicker } from "@/components/forms";
import { Breadcrumb, Eyebrow, SectionHeading, StatusTag } from "@/components/ui";
import { AROMA_PRODUCTS, careMicrofiber, careWipes, flatScents, notifyHref, visionLed2w, visionLed4w } from "@/data/products";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Where to Buy NightFury: Flipkart and Authorized Dealers",
  description:
    "Buy NightFury Aroma Core on the official Flipkart listings, or find an authorized NightFury dealer near you. Get notified when Aroma Air, Essence and Vision land.",
  path: "/where-to-buy",
});

export default function WhereToBuyPage() {
  const otherProducts = [visionLed4w, visionLed2w, careMicrofiber, careWipes];

  return (
    <>
      <section className="bg-white">
        <Breadcrumb current="Where to Buy" />
        <div className="nf-container pt-12 pb-[clamp(48px,6vw,72px)]">
          <Eyebrow>{"// Where to buy"}</Eyebrow>
          <SectionHeading as="h1" size="nf-h1" className="mt-4" lead="Get it" accent="your way." breakLine />
          <p className="nf-body nf-body-lg mt-6 max-w-[640px]">
            Buy online from the official NightFury listings on Flipkart, or walk into an authorized dealer. The 18-month warranty covers purchases from official NightFury listings and authorized dealers only.
          </p>
        </div>
      </section>

      {/* ============ FLIPKART ============ */}
      <section id="online" className="nf-anchor border-t-2 border-navy bg-chalk" aria-labelledby="online-title">
        <div className="nf-container nf-section">
          <Eyebrow>{"// Online"}</Eyebrow>
          <SectionHeading lead="Buy on" accent="Flipkart." size="nf-h2-sm" className="mt-[14px] mb-10" />

          <div className="flex flex-col gap-10">
            {AROMA_PRODUCTS.map((p) => (
              <div key={p.slug}>
                <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b-2 border-navy pb-3">
                  <h3 className="nf-display text-[34px]" style={{ letterSpacing: 0 }}>{p.name}</h3>
                  <span className="font-mono text-[13px] text-muted">{p.formatLine}</span>
                  <Link href={`/aroma#${p.key}`} className="ml-auto font-mono text-[12px] font-bold tracking-[0.12em] uppercase">
                    Details &#8594;
                  </Link>
                </div>
                <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 p-0">
                  {flatScents(p).map((s) => (
                    <li key={s.slug} className="flex min-w-0 flex-col gap-3 rounded-[3px] border-2 border-navy p-4" style={{ backgroundColor: s.colors.tint }}>
                      <div className="flex items-center gap-3">
                        <span aria-hidden="true" className="h-6 w-6 flex-none border-2 border-navy" style={{ backgroundColor: s.colors.liquid }} />
                        <span className="min-w-0">
                          <span className="block font-display text-[22px] leading-none font-extrabold italic uppercase" style={{ color: s.colors.deep }}>{s.name}</span>
                          {s.group.group && <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-muted">{s.group.group}</span>}
                        </span>
                      </div>
                      <div className="mt-auto">
                        <FlipkartButton look="card" url={s.flipkartUrl} name={`${p.name} ${s.name}`} notifyHref={notifyHref(p.slug, s.slug)} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <div className="mb-4 border-b-2 border-navy pb-3">
                <h3 className="nf-display text-[34px]" style={{ letterSpacing: 0 }}>Vision and Care</h3>
              </div>
              <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 p-0">
                {otherProducts.map((p) => {
                  const url = p.models?.find((m) => m.flipkartUrl)?.flipkartUrl;
                  return (
                    <li key={p.slug} className="flex min-w-0 flex-col gap-3 rounded-[3px] border-2 border-navy bg-white p-4">
                      <div>
                        <StatusTag status={p.status} />
                        <span className="mt-3 block font-display text-[22px] leading-none font-extrabold italic uppercase">{p.name}</span>
                      </div>
                      <div className="mt-auto">
                        <FlipkartButton look="card" url={url} name={p.name} notifyHref={notifyHref(p.slug)} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DEALER + NOTIFY ============ */}
      <section className="border-t-2 border-navy bg-white">
        <div className="nf-container nf-section grid items-start gap-5 lg:grid-cols-2">
          <div id="find-dealer" className="nf-anchor nf-card min-w-0 p-[clamp(24px,3vw,36px)]">
            <p className="nf-eyebrow text-[12px]">{"// In store"}</p>
            <h2 className="nf-display mt-[10px] text-[clamp(32px,3.4vw,42px)]" style={{ letterSpacing: 0 }}>Find a dealer</h2>
            <p className="nf-body mt-3">Drop your city and number. We call you back with the nearest NightFury dealer.</p>
            <Suspense fallback={null}>
              <FindDealerForm />
            </Suspense>
          </div>
          <div id="notify" className="nf-anchor nf-card min-w-0 bg-chalk p-[clamp(24px,3vw,36px)]">
            <p className="nf-eyebrow text-[12px]">{"// Not on Flipkart yet?"}</p>
            <h2 className="nf-display mt-[10px] mb-3 text-[clamp(32px,3.4vw,42px)]" style={{ letterSpacing: 0 }}>Get notified</h2>
            <p className="nf-body mb-6">We&apos;ll message you the day it lands on Flipkart and with dealers.</p>
            <Suspense fallback={null}>
              <NotifyPicker />
            </Suspense>
          </div>
        </div>
      </section>

      <DealerBand
        title="Run a shop? Stock NightFury."
        body="Three lines from one supplier. Retail-ready packaging. Warranty handled for your customers. Direct support from Yash Marketing, Kanpur."
        cta="Become a Dealer"
        href="/dealers"
      />
    </>
  );
}
