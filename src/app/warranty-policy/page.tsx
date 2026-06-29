import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { WARRANTY, SUPPORT, SITE_URL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Warranty Policy - NightFury",
  description: "NightFury Vision warranty coverage, exclusions, and claim process. Learn what is covered and how to file a warranty claim.",
  keywords: ["NightFury warranty", "LED headlight warranty", "warranty policy", "NightFury Vision warranty"],
  openGraph: {
    title: "Warranty Policy - NightFury",
    description: "Warranty coverage, exclusions, and claim process for NightFury Vision products.",
    url: `${SITE_URL}/warranty-policy`,
    type: "website",
  },
  twitter: { card: "summary" },
  alternates: { canonical: `${SITE_URL}/warranty-policy` },
};

export default function WarrantyPage() {
  return (
    <LegalPage
      title="Warranty Policy"
      description="NightFury stands behind the quality of its products. Review our warranty coverage, exclusions, and how to file a claim."
      breadcrumb="Warranty Policy"
      sections={[
        {
          id: "applicable",
          title: "Applicable Products",
          content: (
            <p>
              Warranty applies to <strong>{WARRANTY.applicableProducts}</strong> (LED headlights).
            </p>
          ),
        },
        {
          id: "coverage",
          title: "What Is Covered",
          content: (
            <>
              <p>Warranty covers:</p>
              <ul>
                {WARRANTY.coverage.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </>
          ),
        },
        {
          id: "exclusions",
          title: "What Is Not Covered",
          content: (
            <>
              <p>Warranty does not cover:</p>
              <ul>
                {WARRANTY.exclusions.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </>
          ),
        },
        {
          id: "claim",
          title: "Claim Process",
          content: (
            <>
              <p>To file a warranty claim, customers may:</p>
              <ul>
                <li>Contact the dealer where the product was purchased</li>
                <li>
                  Contact NightFury Support directly at{" "}
                  <a href={`mailto:${SUPPORT.email}`}>{SUPPORT.email}</a> or{" "}
                  <a href={SUPPORT.phoneHref}>{SUPPORT.phone}</a>
                </li>
              </ul>
              <p>Please have your invoice or order ID ready when contacting support.</p>
            </>
          ),
        },
        {
          id: "aroma-care",
          title: "Aroma & Care Products",
          content: (
            <p>
              NightFury Aroma and Care products are consumables and do not carry a separate warranty unless explicitly stated. Damaged or defective items are handled under our <a href="/refund-return-policy">Refund & Return Policy</a>.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          content: (
            <p>
              For warranty inquiries, contact us at{" "}
              <a href={`mailto:${SUPPORT.email}`}>{SUPPORT.email}</a> or call{" "}
              <a href={SUPPORT.phoneHref}>{SUPPORT.phone}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
