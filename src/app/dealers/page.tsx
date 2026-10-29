import { Suspense } from "react";
import { DealerForm } from "@/components/forms";
import { Breadcrumb, Eyebrow, FeatureCard } from "@/components/ui";
import { SUPPORT } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Become a NightFury Dealer: Stock Vision, Aroma and Care",
  description:
    "Stock NightFury LED headlights, car perfumes and car care in your shop. Send a dealer enquiry and our team will call you within 2 working days.",
  path: "/dealers",
});

export default function DealersPage() {
  return (
    <>
      <section className="bg-white">
        <Breadcrumb current="Become a Dealer" />
        <div className="nf-container grid items-end gap-10 pt-12 pb-[clamp(48px,6vw,72px)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <Eyebrow>{"// For dealers"}</Eyebrow>
            <h1 className="nf-display nf-h1 mt-4">
              Stock the brand
              <br />
              <span className="nf-accent">they ask for.</span>
            </h1>
          </div>
          <p className="nf-body nf-body-lg min-w-0">
            Three lines from one supplier. Retail-ready packaging. Warranty handled for your customers. Direct support from Yash Marketing, Kanpur.
          </p>
        </div>
        <div aria-hidden="true" className="flex flex-col gap-1">
          <div className="h-[14px] bg-fury" />
          <div className="h-[6px] bg-navy" />
        </div>
      </section>

      <section className="bg-chalk" aria-labelledby="enquiry-title">
        <div className="nf-container nf-section grid items-start gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="nf-card min-w-0 bg-white p-[clamp(20px,3vw,36px)]">
            <h2 id="enquiry-title" className="nf-display mb-2 text-[clamp(36px,4vw,52px)]" style={{ letterSpacing: 0 }}>Dealer enquiry</h2>
            <p className="nf-body mb-7 text-[13px]">Fields marked * are required. We only use these details to respond to your enquiry.</p>
            <Suspense fallback={<p className="nf-body">Loading form…</p>}>
              <DealerForm />
            </Suspense>
          </div>
          <aside className="flex min-w-0 flex-col gap-[18px] lg:sticky lg:top-[108px]">
            <FeatureCard white icon="pin" title="Three lines, one supplier">
              Vision lighting, Aroma car perfumes and Care detailing essentials, all through Yash Marketing.
            </FeatureCard>
            <FeatureCard white icon="shield" title="Warranty handled">
              The 18-month Vision warranty is handled through our dealer network, with direct support from Yash Marketing.
            </FeatureCard>
            <div className="on-navy rounded-[3px] bg-navy p-6 text-chalk">
              <p className="m-0 font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-fury">Prefer to talk?</p>
              <p className="mt-3 font-mono text-[14px] leading-[1.8]">
                <a href={SUPPORT.phoneHref} className="text-chalk hover:text-fury">{SUPPORT.phone}</a>
                <br />
                <a href={`mailto:${SUPPORT.email}`} className="text-chalk hover:text-fury">{SUPPORT.email}</a>
              </p>
              <p className="mt-2 font-mono text-[12px] text-navy-soft">Mon to Sat, 10 AM to 7 PM IST</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
