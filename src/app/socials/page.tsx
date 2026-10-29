import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./socials.css";
import { BUSINESS, SUPPORT, SITE_URL } from "@/lib/legal";
import {
  SOCIALS_PAGE,
  SOCIALS_PHONE,
  SOCIAL_LINKS,
  INSTAGRAM,
  WHATSAPP,
  MAPS_URL,
  type SocialLink,
} from "@/lib/socials";

// Spline Sans Mono reads blocky at the small sizes this page leans on, so the
// links page sets its own text face. The condensed display headings stay.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ui = { fontFamily: "var(--font-manrope), system-ui, sans-serif" } as const;

export const metadata: Metadata = {
  title: "NightFury - Official Links",
  description: `Official NightFury links: ${SITE_URL}, Instagram ${INSTAGRAM.handle}, WhatsApp ${SOCIALS_PHONE.display}, and Yash Marketing, authorized distributor, Kanpur.`,
  keywords: ["NightFury Instagram", "NightFury links", "NightFury distributor", "Yash Marketing Kanpur"],
  openGraph: {
    title: "NightFury - Official Links",
    description: "Every official NightFury channel in one place.",
    url: SOCIALS_PAGE.url,
    type: "website",
  },
  twitter: { card: "summary" },
  alternates: { canonical: SOCIALS_PAGE.url },
};

/* ===== Icons ===== */
const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ICONS: Record<string, React.ReactNode> = {
  website: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </svg>
  ),
  instagram: (
    <svg {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  whatsapp: (
    <svg {...iconProps}>
      <path d="M3.5 20.5l1.3-4.2A8 8 0 1 1 8 19.4l-4.5 1.1z" />
      <path d="M9 9.2c.2 1 .8 2.1 1.6 2.9.8.8 1.9 1.4 2.9 1.6l.9-1.1 1.8.9c-.2 1-1.2 1.6-2.2 1.4a8 8 0 0 1-6.1-6.1c-.2-1 .4-2 1.4-2.2l.9 1.8-1.2.8z" />
    </svg>
  ),
  email: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </svg>
  ),
  dealer: (
    <svg {...iconProps}>
      <path d="M3 9.5L5 5h14l2 4.5" />
      <path d="M3 9.5h18V17a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <circle cx="7" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="13" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
};

/* ===== One link tile ===== */
function LinkTile({ link }: Readonly<{ link: SocialLink }>) {
  const anchorProps = link.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={link.href}
      {...anchorProps}
      className="socials-tile nf-card group flex flex-col gap-3 px-4 py-5"
    >
      <span
        className="socials-icon flex h-11 w-11 shrink-0 items-center justify-center border border-border-strong text-accent transition-colors group-hover:border-accent"
        style={{ borderRadius: "2px", background: "rgba(255,85,0,0.06)" }}
      >
        {ICONS[link.key]}
      </span>

      <span className="block min-w-0">
        <span
          className="block text-[10px] font-semibold tracking-[.18em] text-muted uppercase"
          style={ui}
        >
          {link.label}
        </span>
        <span className="mt-1.5 block truncate text-[15px] font-bold leading-tight text-chalk">
          {link.handle}
        </span>
      </span>

      <span
        className="socials-note mt-auto block text-[11px] leading-[1.6] text-muted"
        style={ui}
      >
        {link.note}
      </span>

      <span
        className="socials-arrow text-[13px] text-border-strong transition-colors group-hover:text-accent"
        aria-hidden
      >
        &rarr;
      </span>
    </a>
  );
}

export default function SocialsPage() {
  return (
    <div className={`${manrope.variable} socials-root`}>
      {/* ===== Panel 1: everything above the fold ===== */}
      <section className="socials-panel relative isolate w-full px-5 py-8 md:px-10">
        {/* Car photo is scoped to this panel so it is not cropped away over a
            two-screen box, and so the site footer keeps its own ground. */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <Image
            src={SOCIALS_PAGE.background}
            alt=""
            fill
            priority
            sizes="100vw"
            className="socials-bg-img object-cover object-bottom"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,11,.92) 0%, rgba(10,10,11,.58) 48%, rgba(10,10,11,.80) 100%)",
            }}
          />
        </div>

        <div className="mx-auto w-full max-w-[1180px]">
        <header className="text-center">
          <Image
            src="/media/logos/logo.png"
            alt="NightFury"
            width={56}
            height={56}
            className="mx-auto h-10 w-10 rounded-lg md:h-14 md:w-14"
            priority
          />

          <div
            className="mt-3 text-[10px] tracking-[.2em] text-accent uppercase md:mt-4"
            style={ui}
          >
            {SOCIALS_PAGE.eyebrow}
          </div>

          <h1
            className="mt-2 text-[32px] font-extrabold italic uppercase leading-[.9] tracking-tight md:text-[52px]"
            style={{ transform: "skewX(-4deg)" }}
          >
            <span>{SOCIALS_PAGE.titleLead}</span>
            <span className="text-accent">{SOCIALS_PAGE.titleAccent}</span>
          </h1>

          <div className="mt-3 flex items-center justify-center gap-3">
            <div
              className="h-0.5 w-8"
              style={{ background: "linear-gradient(90deg, transparent, var(--color-accent))" }}
            />
            <span
              className="text-[10px] font-bold tracking-[.34em] text-chalk uppercase"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              {SOCIALS_PAGE.subtitle}
            </span>
            <div
              className="h-0.5 w-8"
              style={{ background: "linear-gradient(90deg, var(--color-accent), transparent)" }}
            />
          </div>

          <p
            className="mx-auto mt-3 max-w-[640px] text-[11px] leading-[1.6] text-muted md:mt-4 md:text-[12px]"
            style={ui}
          >
            {SOCIALS_PAGE.blurb}
          </p>
        </header>

        {/* Links, running across rather than down */}
        <div className="socials-grid mt-6 md:mt-8">
          {SOCIAL_LINKS.map((link) => (
            <LinkTile key={link.key} link={link} />
          ))}
        </div>

        {/* Scroll cue to panel 2 */}
        <div className="mt-6 text-center md:mt-8">
          <a
            href="#distributor"
            className="inline-flex flex-col items-center gap-1 text-[10px] tracking-[.2em] text-muted uppercase transition-colors hover:text-accent"
            style={ui}
          >
            Authorized Distributor
            <span aria-hidden className="text-accent">&darr;</span>
          </a>
        </div>
        </div>
      </section>

      <div className="carbon-trim" />

      {/* ===== Panel 2: distributor ===== */}
      <section
        id="distributor"
        className="socials-panel socials-panel-2 mx-auto w-full max-w-[1180px] px-5 py-10 md:px-10"
      >
        <div
          className="text-center text-[10px] tracking-[.2em] text-accent uppercase"
          style={ui}
        >
          Sold And Serviced By
        </div>

        <h2
          className="socials-dist-h2 mt-2 text-center text-[30px] font-extrabold italic uppercase leading-[.95] tracking-tight md:text-[42px]"
          style={{ transform: "skewX(-4deg)" }}
        >
          Authorized Distributor
        </h2>

        <div className="socials-dist-grid mt-8 grid gap-4 md:grid-cols-3">
          {/* Identity */}
          <div className="socials-dist-card nf-card p-6">
            <p className="text-[18px] font-bold text-chalk">{BUSINESS.legalName}</p>
            <p
              className="mt-1 text-[10px] tracking-[.12em] text-accent uppercase"
              style={ui}
            >
              {BUSINESS.tagline}
            </p>
            <p className="mt-4 text-[12px] text-muted" style={ui}>
              GSTIN: {BUSINESS.gstin}
            </p>
            <p className="mt-4 text-[12px] leading-[1.8] text-muted" style={ui}>
              {BUSINESS.address.line1},<br />
              {BUSINESS.address.line2},<br />
              {BUSINESS.address.city}, {BUSINESS.address.state} - {BUSINESS.address.pin},<br />
              {BUSINESS.address.country}
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-[10px] font-bold tracking-[.12em] text-accent uppercase underline underline-offset-4"
              style={ui}
            >
              Open in Google Maps &rarr;
            </a>
          </div>

          {/* Contacts */}
          <div className="socials-dist-card nf-card p-6">
            <h3
              className="text-[15px] font-bold italic uppercase tracking-tight"
              style={{ transform: "skewX(-3deg)" }}
            >
              Contacts
            </h3>
            <dl className="socials-contacts mt-4 text-[12px] leading-[1.7] text-muted" style={ui}>
              <div>
                <dt className="text-[10px] font-semibold tracking-[.14em] text-muted uppercase">Phone</dt>
                <dd className="mt-1">
                  <a href={SOCIALS_PHONE.href} className="text-accent underline underline-offset-2">
                    {SOCIALS_PHONE.display}
                  </a>
                </dd>
              </div>

              <div className="mt-3">
                <dt className="text-[10px] font-semibold tracking-[.14em] text-muted uppercase">WhatsApp</dt>
                <dd className="mt-1">
                  <a
                    href={WHATSAPP.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-2"
                  >
                    Message us
                  </a>
                </dd>
              </div>

              <div className="mt-3">
                <dt className="text-[10px] font-semibold tracking-[.14em] text-muted uppercase">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${SUPPORT.email}`} className="text-accent underline underline-offset-2">
                    {SUPPORT.email}
                  </a>
                </dd>
              </div>

              <div className="mt-3">
                <dt className="text-[10px] font-semibold tracking-[.14em] text-muted uppercase">Alt Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${SUPPORT.secondaryEmail}`} className="text-accent underline underline-offset-2">
                    {SUPPORT.secondaryEmail}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Hours and dealer */}
          <div className="socials-dist-card nf-card flex flex-col p-6">
            <h3
              className="text-[15px] font-bold italic uppercase tracking-tight"
              style={{ transform: "skewX(-3deg)" }}
            >
              Hours &amp; Dealers
            </h3>
            <div className="mt-4 text-[12px] leading-[1.7] text-muted" style={ui}>
              <p className="text-[10px] font-semibold tracking-[.14em] text-muted uppercase">Open</p>
              <p className="mt-1">{SUPPORT.hours}</p>

              <p className="socials-response mt-3 text-[10px] font-semibold tracking-[.14em] text-muted uppercase">Response</p>
              <p className="socials-response mt-1">{SUPPORT.responseTime}</p>
            </div>

            <a
              href={`mailto:${SUPPORT.email}?subject=Dealer%20Inquiry`}
              className="nf-btn nf-btn-primary mt-6 self-start"
              style={{ padding: "10px 20px", fontSize: "12px" }}
            >
              <span>Become a Dealer &rarr;</span>
            </a>
          </div>
        </div>

        {/* Footer note */}
        <div
          className="mt-8 text-center text-[10px] leading-[1.8] tracking-[.14em] text-dim uppercase"
          style={ui}
        >
          <Link href="/contact-us" className="text-muted underline underline-offset-4 hover:text-accent">
            Full Contact Details
          </Link>
          <span className="mx-2">/</span>
          <Link href="/privacy-policy" className="text-muted underline underline-offset-4 hover:text-accent">
            Privacy
          </Link>
          <span className="mx-2">/</span>
          <Link href="/terms-and-conditions" className="text-muted underline underline-offset-4 hover:text-accent">
            Terms
          </Link>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: BUSINESS.brandName,
            legalName: BUSINESS.legalName,
            url: SITE_URL,
            logo: `${SITE_URL}/media/logos/logo.png`,
            sameAs: [SITE_URL, INSTAGRAM.url],
            telephone: SOCIALS_PHONE.display,
            email: SUPPORT.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: `${BUSINESS.address.line1}, ${BUSINESS.address.line2}`,
              addressLocality: BUSINESS.address.city,
              addressRegion: BUSINESS.address.state,
              postalCode: BUSINESS.address.pin,
              addressCountry: "IN",
            },
          }),
        }}
      />
    </div>
  );
}
