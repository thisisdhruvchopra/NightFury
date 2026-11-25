import { Suspense } from "react";
import Link from "next/link";
import FlipkartButton from "@/components/FlipkartButton";
import { FlipkartWordmark } from "@/components/FlipkartMark";
import DealerBand from "@/components/DealerBand";
import { FindDealerForm, NotifyPicker } from "@/components/forms";
import { Breadcrumb, Eyebrow } from "@/components/ui";
import {
  AROMA_PRODUCTS,
  careMicrofiber,
  careWipes,
  flatScents,
  notifyHref,
  shopImage,
  visionLed2w,
  visionLed4w,
  type ShopImage,
} from "@/data/products";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Where to Buy Nightfury: Flipkart and Authorized Dealers",
  description:
    "Buy Nightfury Aroma Core, Air and Essence on the official Flipkart listings, or find an authorized Nightfury dealer near you. Get notified when Vision and Care land.",
  path: "/where-to-buy",
});

/** Product photo at the top of a shop card. */
function CardImage({ img, alt }: Readonly<{ img: ShopImage; alt: string }>) {
  return (
    <div className={`relative aspect-[4/3] overflow-hidden ${img.dark ? "bg-[#05070B]" : "bg-chalk"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP product photos */}
      <img
        src={img.src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${img.fit === "contain" ? "object-contain p-4" : "object-cover"}`}
        style={img.position ? { objectPosition: img.position } : undefined}
      />
    </div>
  );
}

function ShopCard({
  img,
  alt,
  name,
  sub,
  swatch,
  children,
}: Readonly<{ img: ShopImage; alt: string; name: string; sub?: string; swatch?: string; children: React.ReactNode }>) {
  return (
    <li className="group flex min-w-0 flex-col overflow-hidden rounded-[4px] border border-navy/15 bg-white transition-shadow hover:shadow-[0_10px_28px_rgba(2,15,38,0.10)]">
      <CardImage img={img} alt={alt} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-start gap-[10px]">
          {swatch && <span aria-hidden="true" className="mt-[6px] h-[10px] w-[10px] flex-none rounded-full" style={{ backgroundColor: swatch }} />}
          <div className="min-w-0">
            <p className="m-0 font-display text-[19px] leading-tight font-bold text-navy">{name}</p>
            {sub && <p className="m-0 mt-1 font-mono text-[11px] font-semibold tracking-[0.12em] text-muted uppercase">{sub}</p>}
          </div>
        </div>
        <div className="mt-auto">{children}</div>
      </div>
    </li>
  );
}

function GroupHeading({ title, line, href }: Readonly<{ title: string; line?: string; href?: string }>) {
  return (
    <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-navy/15 pb-3">
      <h3 className="nf-display m-0 text-[clamp(24px,2.4vw,30px)]">{title}</h3>
      {line && <span className="font-mono text-[12px] text-muted">{line}</span>}
      {href && (
        <Link href={href} className="ml-auto font-mono text-[12px] font-bold tracking-[0.12em] text-navy uppercase hover:text-fury">
          Details &#8594;
        </Link>
      )}
    </div>
  );
}

const GRID = "m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 p-0";

export default function WhereToBuyPage() {
  const otherProducts = [visionLed4w, visionLed2w, careMicrofiber, careWipes];

  return (
    <>
      {/* ============ INTRO ============ */}
      <section className="bg-white">
        <Breadcrumb current="Where to Buy" />
        <div className="nf-container pt-10 pb-[clamp(48px,6vw,80px)]">
          <div className="min-w-0 max-w-[760px]">
            <Eyebrow>{"// Where to buy"}</Eyebrow>
            <h1 className="nf-display nf-h1 mt-4">Buy online, or from a dealer near you.</h1>
            <p className="nf-body nf-body-lg mt-6 max-w-[560px]">
              Every Nightfury product is sold through the official listings on Flipkart and through authorized dealers. The 18-month warranty on Vision covers purchases from these two channels only.
            </p>
            <div className="mt-8 grid max-w-[560px] gap-3 sm:grid-cols-2">
              <a href="#online" className="flex items-center justify-between gap-3 rounded-[4px] border border-navy/15 bg-white px-5 py-4 no-underline transition-colors hover:border-navy">
                <span>
                  <span className="block font-mono text-[11px] font-bold tracking-[0.14em] text-muted uppercase">Online</span>
                  <span className="mt-1 block font-display text-[18px] font-bold text-navy">Flipkart</span>
                </span>
                <span aria-hidden="true" className="text-navy">&#8595;</span>
              </a>
              <a href="#find-dealer" className="flex items-center justify-between gap-3 rounded-[4px] border border-navy/15 bg-white px-5 py-4 no-underline transition-colors hover:border-navy">
                <span>
                  <span className="block font-mono text-[11px] font-bold tracking-[0.14em] text-muted uppercase">In store</span>
                  <span className="mt-1 block font-display text-[18px] font-bold text-navy">Find a dealer</span>
                </span>
                <span aria-hidden="true" className="text-navy">&#8595;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FLIPKART ============ */}
      <section id="online" className="nf-anchor border-t border-navy/15 bg-chalk" aria-labelledby="online-title">
        <div className="nf-container nf-section">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
            <div className="min-w-0">
              <Eyebrow>{"// Online"}</Eyebrow>
              <h2 id="online-title" className="nf-display nf-h2-sm mt-[14px]">Official Flipkart listings</h2>
              <p className="nf-body mt-3 max-w-[560px]">Pick your scent and you land straight on its official Nightfury page on Flipkart.</p>
            </div>
            <FlipkartWordmark height={36} />
          </div>

          <div className="flex flex-col gap-14">
            {AROMA_PRODUCTS.map((p) => (
              <div key={p.slug}>
                <GroupHeading title={p.name} line={p.formatLine} href={`/aroma#${p.key}`} />
                <ul className={GRID}>
                  {flatScents(p).map((s) => (
                    <ShopCard
                      key={s.slug}
                      img={shopImage(p, s)}
                      alt={`Nightfury ${p.name} ${s.name}`}
                      name={s.name}
                      sub={s.group.group}
                      swatch={s.colors.liquid}
                    >
                      <FlipkartButton look="card" url={s.flipkartUrl} name={`${p.name} ${s.name}`} notifyHref={notifyHref(p.slug, s.slug)} />
                    </ShopCard>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <GroupHeading title="Vision and Care" />
              <ul className={GRID}>
                {otherProducts.map((p) => {
                  const url = p.models?.find((m) => m.flipkartUrl)?.flipkartUrl;
                  return (
                    <ShopCard
                      key={p.slug}
                      img={shopImage(p)}
                      alt={`Nightfury ${p.name}`}
                      name={p.name}
                      sub={p.status === "live" ? undefined : "Coming soon"}
                    >
                      <FlipkartButton look="card" url={url} name={p.name} notifyHref={notifyHref(p.slug)} />
                    </ShopCard>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DEALER + NOTIFY ============ */}
      <section className="border-t border-navy/15 bg-white">
        <div className="nf-container nf-section grid items-start gap-5 lg:grid-cols-2">
          <div id="find-dealer" className="nf-anchor min-w-0 rounded-[4px] border border-navy/15 bg-white p-[clamp(24px,3vw,36px)]">
            <p className="nf-eyebrow text-[12px]">{"// In store"}</p>
            <h2 className="nf-display mt-[10px] text-[clamp(28px,3vw,36px)]">Find a dealer</h2>
            <p className="nf-body mt-3">Share your city and number. We call you back with the nearest authorized Nightfury dealer.</p>
            <Suspense fallback={null}>
              <FindDealerForm />
            </Suspense>
          </div>
          <div id="notify" className="nf-anchor min-w-0 rounded-[4px] border border-navy/15 bg-chalk p-[clamp(24px,3vw,36px)]">
            <p className="nf-eyebrow text-[12px]">{"// Not on Flipkart yet?"}</p>
            <h2 className="nf-display mt-[10px] mb-3 text-[clamp(28px,3vw,36px)]">Get notified</h2>
            <p className="nf-body mb-6">We&apos;ll message you the day it lands on Flipkart and with dealers.</p>
            <Suspense fallback={null}>
              <NotifyPicker />
            </Suspense>
          </div>
        </div>
      </section>

      <DealerBand
        title="Run a shop? Stock Nightfury."
        body="Three lines from one supplier. Retail-ready packaging. Warranty handled for your customers. Direct support from Yash Marketing, Kanpur."
        cta="Become a Dealer"
        href="/dealers"
      />
    </>
  );
}
