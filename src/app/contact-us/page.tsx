import { Breadcrumb, Eyebrow, SkewButton } from "@/components/ui";
import { BUSINESS, SUPPORT, GRIEVANCE_OFFICER, SITE_URL } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact NightFury: Support and Dealer Enquiries",
  description: `Reach NightFury support at ${SUPPORT.email} or ${SUPPORT.phone}. Yash Marketing, authorized distributor, Kanpur. Dealer inquiries welcome.`,
  path: "/contact-us",
});

function InfoCard({ title, children }: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <div className="nf-card bg-white p-6 md:p-7">
      <h2 className="nf-display mb-4 text-[26px]" style={{ letterSpacing: 0, lineHeight: 1 }}>{title}</h2>
      <div className="font-mono text-[13px] leading-[1.8] text-muted">{children}</div>
    </div>
  );
}

const sub = "text-carbon font-bold text-[11px] uppercase tracking-[.1em]";
const link = "text-fury-sm underline underline-offset-2";

export default function ContactPage() {
  return (
    <>
      <section className="bg-white">
        <Breadcrumb current="Contact Us" />
        <header className="nf-container pt-10 pb-12">
          <Eyebrow>Get in touch</Eyebrow>
          <h1 className="nf-display mt-4" style={{ fontSize: "clamp(44px, 6vw, 80px)" }}>Contact Us</h1>
          <p className="nf-body mt-4 max-w-2xl">
            Have a question about NightFury products, need support with an order, or interested in becoming a dealer? We are here to help.
          </p>
        </header>
        <div aria-hidden="true" className="flex flex-col gap-1">
          <div className="h-[10px] bg-fury" />
          <div className="h-[4px] bg-navy" />
        </div>
      </section>

      <div className="bg-chalk">
        <div className="nf-container py-14">
          <div className="grid gap-6 md:grid-cols-2">
            <InfoCard title="Business Information">
              <p className="m-0 font-semibold text-carbon">{BUSINESS.legalName}</p>
              <p className="m-0 text-[11px] tracking-[.12em] uppercase text-fury-sm">{BUSINESS.tagline}</p>
              <p className="mt-3 mb-0">GSTIN: {BUSINESS.gstin}</p>
              <div className="mt-3">
                <p className={`m-0 ${sub}`}>Registered Address</p>
                <p className="m-0 mt-1">{BUSINESS.address.line1}</p>
                <p className="m-0">{BUSINESS.address.line2}</p>
                <p className="m-0">{BUSINESS.address.city}, {BUSINESS.address.state} - {BUSINESS.address.pin}</p>
                <p className="m-0">{BUSINESS.address.country}</p>
              </div>
            </InfoCard>

            <InfoCard title="Customer Support">
              <div className="flex flex-col gap-3">
                <div>
                  <p className={`m-0 ${sub}`}>Email</p>
                  <a href={`mailto:${SUPPORT.email}`} className={link}>{SUPPORT.email}</a>
                </div>
                <div>
                  <p className={`m-0 ${sub}`}>Secondary Email</p>
                  <a href={`mailto:${SUPPORT.secondaryEmail}`} className={link}>{SUPPORT.secondaryEmail}</a>
                </div>
                <div>
                  <p className={`m-0 ${sub}`}>Phone</p>
                  <a href={SUPPORT.phoneHref} className={link}>{SUPPORT.phone}</a>
                </div>
                <div>
                  <p className={`m-0 ${sub}`}>Support Hours</p>
                  <p className="m-0">{SUPPORT.hours}</p>
                </div>
                <div>
                  <p className={`m-0 ${sub}`}>Response Time</p>
                  <p className="m-0">{SUPPORT.responseTime}</p>
                </div>
              </div>
            </InfoCard>

            <InfoCard title="Grievance Officer">
              <div className="flex flex-col gap-2">
                <p className="m-0"><strong className="text-carbon">Name:</strong> {GRIEVANCE_OFFICER.name}</p>
                <p className="m-0"><strong className="text-carbon">Designation:</strong> {GRIEVANCE_OFFICER.designation}</p>
                <p className="m-0">
                  <strong className="text-carbon">Email:</strong>{" "}
                  <a href={`mailto:${GRIEVANCE_OFFICER.email}`} className={link}>{GRIEVANCE_OFFICER.email}</a>
                </p>
                <p className="m-0">
                  <strong className="text-carbon">Phone:</strong>{" "}
                  <a href={`tel:${GRIEVANCE_OFFICER.phone.replace(/\s/g, "")}`} className={link}>{GRIEVANCE_OFFICER.phone}</a>
                </p>
              </div>
              <p className="mt-3 mb-0">
                All grievances shall be acknowledged and processed in accordance with applicable Indian e-commerce regulations.
              </p>
            </InfoCard>

            <InfoCard title="Become a Dealer">
              <p className="m-0">
                NightFury supports both retail and dealer/distributor sales. Interested in stocking NightFury products at your shop?
              </p>
              <p className="mt-3 mb-0">
                Dealer-specific pricing, territories, and commercial terms are available on request.
              </p>
              <div className="mt-5">
                <SkewButton href="/dealers">Submit Dealer Inquiry &rarr;</SkewButton>
              </div>
            </InfoCard>
          </div>

          <div className="nf-ph nf-ph--white mt-10 h-[300px]">
            <div className="text-center">
              <div className="font-mono text-[11px] font-bold tracking-[.18em] uppercase text-fury-sm">YASH MARKETING</div>
              <div className="mt-1 font-mono text-[11px] tracking-[.14em] uppercase text-muted">109/75, Sisamau Bazar, Kanpur, UP 208012</div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-mono text-[12px] font-bold tracking-[.1em] uppercase text-fury-sm underline underline-offset-4"
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
