import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, SUPPORT, GRIEVANCE_OFFICER, SITE_URL } from "@/lib/legal";

const mono = { fontFamily: "var(--font-spline), monospace" } as const;

export const metadata: Metadata = {
  title: "Contact Us - NightFury",
  description: `Reach NightFury support at ${SUPPORT.email} or ${SUPPORT.phone}. Yash Marketing, authorized distributor, Kanpur. Dealer inquiries welcome.`,
  keywords: ["NightFury contact", "NightFury support", "Yash Marketing contact", "NightFury dealer inquiry"],
  openGraph: {
    title: "Contact Us - NightFury",
    description: `Reach NightFury support at ${SUPPORT.email} or ${SUPPORT.phone}.`,
    url: `${SITE_URL}/contact-us`,
    type: "website",
  },
  twitter: { card: "summary" },
  alternates: { canonical: `${SITE_URL}/contact-us` },
};

function InfoCard({ title, children }: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <div className="nf-card p-6">
      <h2
        className="mb-4 text-[18px] font-bold italic uppercase tracking-tight"
        style={{ transform: "skewX(-3deg)" }}
      >
        {title}
      </h2>
      <div className="text-[13px] leading-[1.8] text-muted" style={mono}>
        {children}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1280px] px-5 pt-6 md:px-10">
        <nav
          aria-label="Breadcrumb"
          className="text-[11px] tracking-[.14em] text-dim uppercase"
          style={mono}
        >
          <Link href="/" className="nf-link">Home</Link>
          <span className="mx-2 text-border-strong">/</span>
          <span className="text-muted">Contact Us</span>
        </nav>
      </div>

      {/* Header */}
      <header className="mx-auto max-w-[1280px] px-5 pt-8 pb-10 md:px-10">
        <div
          className="text-[11px] tracking-[.2em] text-accent uppercase"
          style={mono}
        >
          GET IN TOUCH
        </div>
        <h1
          className="mt-3 text-[36px] font-extrabold italic uppercase leading-[.92] tracking-tight md:text-[48px]"
          style={{ transform: "skewX(-4deg)" }}
        >
          Contact Us
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-[1.7] text-muted" style={mono}>
          Have a question about NightFury products, need support with an order, or interested in becoming a dealer? We are here to help.
        </p>
      </header>

      <div className="carbon-trim" />

      {/* Content grid */}
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Business Info */}
          <InfoCard title="Business Information">
            <p className="text-chalk font-semibold">{BUSINESS.legalName}</p>
            <p className="text-accent text-[11px] tracking-[.12em] uppercase">{BUSINESS.tagline}</p>
            <p className="mt-3">GSTIN: {BUSINESS.gstin}</p>
            <div className="mt-3">
              <p className="text-chalk font-semibold text-[11px] uppercase tracking-[.1em]">Registered Address</p>
              <p className="mt-1">{BUSINESS.address.line1}</p>
              <p>{BUSINESS.address.line2}</p>
              <p>{BUSINESS.address.city}, {BUSINESS.address.state} - {BUSINESS.address.pin}</p>
              <p>{BUSINESS.address.country}</p>
            </div>
          </InfoCard>

          {/* Support */}
          <InfoCard title="Customer Support">
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-chalk font-semibold text-[11px] uppercase tracking-[.1em]">Email</p>
                <a href={`mailto:${SUPPORT.email}`} className="text-accent underline underline-offset-2">{SUPPORT.email}</a>
              </div>
              <div>
                <p className="text-chalk font-semibold text-[11px] uppercase tracking-[.1em]">Secondary Email</p>
                <a href={`mailto:${SUPPORT.secondaryEmail}`} className="text-accent underline underline-offset-2">{SUPPORT.secondaryEmail}</a>
              </div>
              <div>
                <p className="text-chalk font-semibold text-[11px] uppercase tracking-[.1em]">Phone</p>
                <a href={SUPPORT.phoneHref} className="text-accent underline underline-offset-2">{SUPPORT.phone}</a>
              </div>
              <div>
                <p className="text-chalk font-semibold text-[11px] uppercase tracking-[.1em]">Support Hours</p>
                <p>{SUPPORT.hours}</p>
              </div>
              <div>
                <p className="text-chalk font-semibold text-[11px] uppercase tracking-[.1em]">Response Time</p>
                <p>{SUPPORT.responseTime}</p>
              </div>
            </div>
          </InfoCard>

          {/* Grievance Officer */}
          <InfoCard title="Grievance Officer">
            <div className="flex flex-col gap-2">
              <p><strong>Name:</strong> {GRIEVANCE_OFFICER.name}</p>
              <p><strong>Designation:</strong> {GRIEVANCE_OFFICER.designation}</p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${GRIEVANCE_OFFICER.email}`} className="text-accent underline underline-offset-2">
                  {GRIEVANCE_OFFICER.email}
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a href={`tel:${GRIEVANCE_OFFICER.phone.replace(/\s/g, "")}`} className="text-accent underline underline-offset-2">
                  {GRIEVANCE_OFFICER.phone}
                </a>
              </p>
            </div>
            <p className="mt-3 text-dim">
              All grievances shall be acknowledged and processed in accordance with applicable Indian e-commerce regulations.
            </p>
          </InfoCard>

          {/* Dealer Inquiry */}
          <InfoCard title="Become a Dealer">
            <p>
              NightFury supports both retail and dealer/distributor sales. Interested in stocking NightFury products at your shop?
            </p>
            <p className="mt-3">
              Dealer-specific pricing, territories, and commercial terms are available on request.
            </p>
            <div className="mt-5">
              <a
                href={`mailto:${SUPPORT.email}?subject=Dealer%20Inquiry`}
                className="nf-btn nf-btn-primary"
                style={{ padding: "11px 22px", fontSize: "13px" }}
              >
                <span>Submit Dealer Inquiry &rarr;</span>
              </a>
            </div>
          </InfoCard>
        </div>

        {/* Map placeholder */}
        <div className="mt-10 nf-card overflow-hidden">
          <div
            className="flex h-[300px] items-center justify-center"
            style={{
              background: "radial-gradient(60% 60% at 50% 40%, rgba(255,85,0,0.08), transparent 70%), repeating-linear-gradient(135deg, #101012 0 2px, #0c0c0e 2px 22px)",
            }}
          >
            <div className="text-center">
              <div className="text-[11px] tracking-[.18em] text-accent uppercase" style={mono}>
                YASH MARKETING
              </div>
              <div className="mt-1 text-[10px] tracking-[.14em] text-dim uppercase" style={mono}>
                109/75, Sisamau Bazar, Kanpur, UP 208012
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-[11px] font-bold tracking-[.1em] text-accent uppercase underline underline-offset-4"
                style={mono}
              >
                Open in Google Maps &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: BUSINESS.legalName,
            alternateName: BUSINESS.brandName,
            url: SITE_URL,
            telephone: SUPPORT.phone,
            email: SUPPORT.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: `${BUSINESS.address.line1}, ${BUSINESS.address.line2}`,
              addressLocality: BUSINESS.address.city,
              addressRegion: BUSINESS.address.state,
              postalCode: BUSINESS.address.pin,
              addressCountry: "IN",
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "10:00",
              closes: "19:00",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: SUPPORT.phone,
              email: SUPPORT.email,
              contactType: "customer service",
              availableLanguage: ["English", "Hindi"],
            },
          }),
        }}
      />
    </>
  );
}
