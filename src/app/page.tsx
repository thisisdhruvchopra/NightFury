import HomeStages from "@/components/HomeStages";
import DealerBand from "@/components/DealerBand";
import { SkewButton } from "@/components/ui";
import { FLIPKART_STORE_URL } from "@/data/products";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "NightFury: LED Headlights, Car Perfumes and Car Care",
  description:
    "NightFury Vision LED headlights, Aroma car perfumes and Care detailing essentials. Buy Aroma Core on Flipkart or stock NightFury through our dealer network across India.",
  path: "/",
});

const SENSES = [
  {
    eyebrow: "01 // SEE",
    title: "Vision",
    tagline: "See the difference",
    body: "LED headlights for 4-wheelers and 2-wheelers. Brighter, whiter light, backed by an 18-month warranty.",
    href: "#vision",
  },
  {
    eyebrow: "02 // SMELL",
    title: "Aroma",
    tagline: "Smell the difference",
    body: "Car perfumes in three formats: Core for the dash, Air as a spray, Essence to hang. Eleven scents in all.",
    href: "#aroma",
  },
  {
    eyebrow: "03 // FEEL",
    title: "Care",
    tagline: "Feel the difference",
    body: "Microfiber cloths and wet wipes to keep the cabin and paint spotless. Coming soon.",
    href: "#care",
  },
];

export default function Home() {
  return (
    <>
      {/* ============ HERO (centred, text only by design) ============ */}
      <section aria-labelledby="hero-title" className="bg-white">
        <div className="nf-container pt-[clamp(48px,7vw,80px)] pb-[clamp(56px,7vw,88px)]">
          <div className="flex flex-col items-center text-center">
            <h1
              id="hero-title"
              className="nf-display"
              style={{ fontSize: "clamp(64px, 10.5vw, 136px)", lineHeight: 0.84 }}
            >
              Drive the
              <br />
              <span className="nf-accent">difference.</span>
            </h1>
            <p className="nf-body nf-body-lg mt-8 max-w-[560px]">
              NightFury makes premium automotive accessories for drivers who want any car to feel special. One brand, built around three senses.
            </p>
          </div>

          <div className="mt-[72px] grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-10">
            {SENSES.map((s) => (
              <div key={s.title} className="flex min-w-0 flex-col items-center border-t-[3px] border-navy pt-6 text-center">
                <p className="m-0 font-mono text-[12px] font-bold tracking-[0.18em] text-fury-sm">{s.eyebrow}</p>
                <h2 className="nf-display mt-[10px] text-[56px]" style={{ lineHeight: 0.9, letterSpacing: 0 }}>{s.title}</h2>
                <p className="nf-sub mt-[6px] text-[20px] text-fury-lg">{s.tagline}</p>
                <p className="nf-body mt-3 max-w-[340px] flex-1 leading-[1.7]">{s.body}</p>
                <div className="mt-5">
                  <SkewButton href={s.href} size="sm">Explore &#8595;</SkewButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BANDS + SCROLL STAGES (from HOME_STAGES) ============ */}
      <HomeStages />

      <DealerBand
        id="buy"
        eyebrow={null}
        title="Stock NightFury."
        body="Three lines from one supplier, retail-ready packaging and direct support from Yash Marketing, Kanpur."
        cta="Become a Dealer"
        href="/dealers"
        secondary={{ href: FLIPKART_STORE_URL, label: "Buying for your car? Shop on Flipkart", external: true }}
      />
    </>
  );
}
