import Link from "next/link";
import { Breadcrumb } from "@/components/ui";
import { FlipkartIcon } from "@/components/FlipkartMark";
import { SOCIAL_ICONS } from "@/components/SocialIcons";
import { AROMA_PRODUCTS, shopImage } from "@/data/products";
import { SUPPORT } from "@/lib/legal";
import { SOCIAL_LINKS } from "@/lib/socials";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About NightFury: Thank You for Choosing Us",
  description:
    "NightFury makes Vision LED headlights, Aroma car perfumes and Care detailing essentials. Follow us on Instagram, message us on WhatsApp, and get the most from your NightFury product.",
  path: "/about",
});

/* This page is the landing page for the QR code on the thank-you card in
   every NightFury box, so it speaks to someone who has just bought. */

const LINES = [
  {
    name: "Vision",
    tag: "See the difference",
    body: "LED headlight pairs for cars, with an 18-month warranty.",
    href: "/vision",
    img: "/home/tiles/vision.webp",
  },
  {
    name: "Aroma",
    tag: "Smell the difference",
    body: "Car perfumes in three formats: a dashboard jar, a spray with hanging card, and hanging glass.",
    href: "/aroma",
    img: "/home/tiles/aroma.webp",
  },
  {
    name: "Care",
    tag: "Feel the difference",
    body: "Microfiber cloths and wet wipes to keep the car clean between washes. Coming soon.",
    href: "/care",
    img: "/home/tiles/care.webp",
  },
];

/* Every channel except the dealer enquiry, which is not for this audience. */
const CHANNELS = SOCIAL_LINKS.filter((l) => l.key !== "dealer");

function Kicker({ children }: Readonly<{ children: React.ReactNode }>) {
  return <p className="m-0 font-mono text-[12px] font-bold tracking-[0.2em] text-fury uppercase">{children}</p>;
}

export default function AboutPage() {
  return (
    <>
      {/* ============ THANK YOU ============ */}
      <section className="on-navy relative overflow-hidden bg-[#05070B] text-chalk">
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP backdrop */}
        <img
          src="/home/hero.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[70%_50%] opacity-80"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,11,0.95)_0%,rgba(5,7,11,0.8)_45%,rgba(5,7,11,0.2)_100%)]" />
        <div className="relative">
          <div className="[&_*]:text-[#9AA6BA]">
            <Breadcrumb current="About" />
          </div>
          <div className="nf-container pt-10 pb-[clamp(64px,9vw,120px)]">
            <div className="max-w-[640px]">
              <Kicker>{"// Thank you"}</Kicker>
              <h1 className="nf-display nf-h1 mt-4 text-chalk">
                Thanks for choosing <span className="text-fury">NightFury.</span>
              </h1>
              <p className="nf-body nf-body-lg mt-6 text-[#C9D0DC]">
                You&apos;ve just added a little NightFury to your drive. This page is for you: who we are, how to get the most out of what you bought, and where to find us.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {CHANNELS.filter((c) => c.key === "instagram" || c.key === "whatsapp").map((c) => (
                  <a
                    key={c.key}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[10px] rounded-[2px] border border-chalk bg-chalk px-5 py-3 font-sans text-[14px] font-semibold tracking-[0.06em] text-navy uppercase no-underline hover:bg-white"
                  >
                    {SOCIAL_ICONS[c.key]}
                    {c.key === "instagram" ? `Follow ${c.handle}` : "Message us on WhatsApp"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HANDLES ============ */}
      <section id="follow" className="nf-anchor bg-white" aria-labelledby="follow-title">
        <div className="nf-container nf-section">
          <Kicker>{"// Stay in touch"}</Kicker>
          <h2 id="follow-title" className="nf-display nf-h2-sm mt-[14px]">Find us everywhere.</h2>
          <p className="nf-body mt-3 max-w-[600px]">New scents, installs and offers land here first. Questions about your order go straight to a real person.</p>

          <ul className="m-0 mt-8 grid list-none gap-3 p-0 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
            {CHANNELS.map((c) => (
              <li key={c.key} className="min-w-0">
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group grid h-full grid-cols-[44px_minmax(0,1fr)] items-center gap-x-4 gap-y-3 rounded-[4px] border border-navy/15 bg-white p-4 no-underline transition-colors hover:border-navy sm:flex sm:flex-col sm:items-start sm:p-5"
                >
                  {c.key === "website" ? (
                    <span className="flex h-11 w-11 items-center justify-center rounded-[4px] bg-navy">
                      {/* eslint-disable-next-line @next/next/no-img-element -- tiny fixed-size brand mark */}
                      <img src="/media/logos/nf-mark.webp" alt="" aria-hidden="true" width={26} height={26} className="h-[26px] w-[26px] object-contain" />
                    </span>
                  ) : (
                    <span className="flex h-11 w-11 items-center justify-center rounded-[4px] bg-chalk text-navy group-hover:bg-navy group-hover:text-chalk">
                      {SOCIAL_ICONS[c.key]}
                    </span>
                  )}
                  <span className="flex min-w-0 flex-col gap-1 sm:gap-3">
                    <span className="font-mono text-[11px] font-bold tracking-[0.16em] text-muted uppercase">{c.label}</span>
                    <span className="truncate font-display text-[17px] font-bold text-navy">{c.handle}</span>
                  </span>
                  <span className="hidden text-[13px] leading-[1.5] text-muted sm:mt-auto sm:block">{c.note}</span>
                </a>
              </li>
            ))}
            <li className="min-w-0">
              <Link
                href="/where-to-buy#online"
                className="group grid h-full grid-cols-[44px_minmax(0,1fr)] items-center gap-x-4 gap-y-3 rounded-[4px] border border-navy/15 bg-white p-4 no-underline transition-colors hover:border-navy sm:flex sm:flex-col sm:items-start sm:p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[4px] bg-chalk">
                  <FlipkartIcon size={26} />
                </span>
                <span className="flex min-w-0 flex-col gap-1 sm:gap-3">
                  <span className="font-mono text-[11px] font-bold tracking-[0.16em] text-muted uppercase">Flipkart</span>
                  <span className="truncate font-display text-[17px] font-bold text-navy">Official listings</span>
                </span>
                <span className="hidden text-[13px] leading-[1.5] text-muted sm:mt-auto sm:block">Reorder your scent or try a new one.</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ============ WHAT IS NIGHTFURY ============ */}
      <section className="border-t border-navy/15 bg-chalk" aria-labelledby="what-title">
        <div className="nf-container nf-section">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <Kicker>{"// What is NightFury"}</Kicker>
              <h2 id="what-title" className="nf-display nf-h2-sm mt-[14px]">Made to make any car feel special.</h2>
            </div>
            <p className="nf-body nf-body-lg m-0 max-w-[560px]">
              NightFury is a car accessories brand from India, built around one idea: <strong className="text-navy">drive the difference</strong>. We make three lines, for how your car looks at night, how it smells inside, and how clean it stays.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {LINES.map((l) => (
              <Link key={l.name} href={l.href} className="group relative block aspect-[4/5] overflow-hidden rounded-[4px] bg-[#05070B] no-underline">
                {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP tile */}
                <img src={l.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,7,11,0.92)_0%,rgba(5,7,11,0.3)_55%,rgba(5,7,11,0)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="m-0 font-mono text-[11px] font-bold tracking-[0.18em] text-fury uppercase">{l.tag}</p>
                  <p className="m-0 mt-2 font-display text-[30px] leading-none font-bold text-chalk">{l.name}</p>
                  <p className="m-0 mt-3 text-[14px] leading-[1.55] text-[#C9D0DC]">{l.body}</p>
                  <p className="m-0 mt-4 font-mono text-[12px] font-bold tracking-[0.12em] text-chalk uppercase">Explore &#8594;</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GETTING STARTED ============ */}
      <section className="border-t border-navy/15 bg-white" aria-labelledby="start-title">
        <div className="nf-container nf-section">
          <Kicker>{"// Getting started"}</Kicker>
          <h2 id="start-title" className="nf-display nf-h2-sm mt-[14px]">Got an Aroma? Here&apos;s how to use it.</h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {AROMA_PRODUCTS.map((p) => {
              const first = p.variants?.[0]?.scents[0];
              const img = shopImage(p, first);
              return (
                <div key={p.slug} className="flex min-w-0 flex-col overflow-hidden rounded-[4px] border border-navy/15 bg-white">
                  <div className={`relative aspect-[16/9] overflow-hidden ${img.dark ? "bg-[#05070B]" : "bg-chalk"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP product photo */}
                    <img
                      src={img.src}
                      alt=""
                      loading="lazy"
                      className={`absolute inset-0 h-full w-full ${img.fit === "contain" ? "object-contain p-3" : "object-cover"}`}
                      style={img.position ? { objectPosition: img.position } : undefined}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="m-0 font-display text-[22px] font-bold text-navy">{p.name}</p>
                    <p className="m-0 mt-1 font-mono text-[12px] text-muted">{p.formatLine}</p>
                    <ol className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
                      {p.steps?.map((t, i) => (
                        <li key={t} className="grid grid-cols-[26px_minmax(0,1fr)] items-baseline gap-2 text-[15px] leading-[1.5] text-carbon">
                          <span className="font-mono text-[12px] font-bold text-fury">0{i + 1}</span>
                          {t}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ SUPPORT ============ */}
      <section className="border-t border-navy/15 bg-chalk" aria-labelledby="help-title">
        <div className="nf-container nf-section">
          <Kicker>{"// We've got you"}</Kicker>
          <h2 id="help-title" className="nf-display nf-h2-sm mt-[14px]">Warranty and support.</h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-[4px] border border-navy/15 bg-white p-6">
              <p className="m-0 font-display text-[20px] font-bold text-navy">18-month warranty on Vision</p>
              <p className="nf-body mt-3">Every Vision LED bought from an official NightFury listing or an authorized dealer is covered for manufacturing defects. Keep your invoice or order ID.</p>
              <Link href="/warranty-policy" className="mt-4 inline-block font-mono text-[12px] font-bold tracking-[0.12em] text-navy uppercase hover:text-fury">Warranty details &#8594;</Link>
            </div>
            <div className="rounded-[4px] border border-navy/15 bg-white p-6">
              <p className="m-0 font-display text-[20px] font-bold text-navy">Need help?</p>
              <p className="nf-body mt-3">Questions about your product or order? Write or call us. {SUPPORT.hours}.</p>
              <p className="m-0 mt-4 flex flex-col gap-1 text-[15px]">
                <a href={`mailto:${SUPPORT.email}`} className="font-semibold text-navy hover:text-fury">{SUPPORT.email}</a>
                <a href={SUPPORT.phoneHref} className="font-semibold text-navy hover:text-fury">{SUPPORT.phone}</a>
              </p>
            </div>
            <div className="rounded-[4px] border border-navy/15 bg-white p-6">
              <p className="m-0 flex items-center gap-[10px] font-display text-[20px] font-bold text-navy">
                <FlipkartIcon size={24} /> Bought on Flipkart?
              </p>
              <p className="nf-body mt-3">A quick rating from your Flipkart orders helps other drivers find NightFury. It means a lot to a young brand like ours.</p>
              <Link href="/where-to-buy#online" className="mt-4 inline-block font-mono text-[12px] font-bold tracking-[0.12em] text-navy uppercase hover:text-fury">Our Flipkart listings &#8594;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHO WE ARE ============ */}
      <section className="on-navy bg-navy text-chalk" aria-labelledby="who-title">
        <div className="nf-container nf-section grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <Kicker>{"// Who we are"}</Kicker>
            <h2 id="who-title" className="nf-display nf-h2-sm mt-[14px] text-chalk">
              Built for drivers who <span className="text-fury">notice the details.</span>
            </h2>
            <p className="nf-body mt-5 max-w-[600px] text-[#C9CFDB]">
              NightFury started with a simple belief: the car you drive every day deserves the same care as the one you dream about. So we make the things that change how it feels from the driver&apos;s seat, brighter light at night, a cabin that smells like yours, and a finish that stays clean.
            </p>
            <p className="nf-body mt-4 max-w-[600px] text-[#C9CFDB]">
              Every product is sold through our official Flipkart listings and authorized dealers across India, and backed by a support team you can actually reach.
            </p>
            <Link href="/dealers" className="mt-6 inline-block font-mono text-[12px] font-bold tracking-[0.12em] text-chalk uppercase hover:text-fury">
              Run a shop? Become a dealer &#8594;
            </Link>
          </div>
          <ul className="m-0 flex min-w-0 list-none flex-col justify-center gap-6 p-0">
            {LINES.map((l) => (
              <li key={l.name} className="border-l-2 border-fury pl-5">
                <p className="m-0 font-mono text-[11px] font-bold tracking-[0.2em] text-fury uppercase">{l.name}</p>
                <p className="m-0 mt-1 font-display text-[clamp(24px,2.4vw,32px)] leading-tight font-bold text-chalk">{l.tag}.</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
