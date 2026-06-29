import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { REFUND, SUPPORT, SITE_URL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Refund & Return Policy - NightFury",
  description: "NightFury return windows, refund timelines, and product-specific return conditions for Vision, Aroma, and Care products.",
  keywords: ["NightFury returns", "refund policy", "return policy", "NightFury Vision returns"],
  openGraph: {
    title: "Refund & Return Policy - NightFury",
    description: "Return windows, refund timelines, and product-specific conditions for NightFury products.",
    url: `${SITE_URL}/refund-return-policy`,
    type: "website",
  },
  twitter: { card: "summary" },
  alternates: { canonical: `${SITE_URL}/refund-return-policy` },
};

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund & Return Policy"
      description="Our return and refund policies vary by product line. Please review the specific conditions below before initiating a return."
      breadcrumb="Refund & Return Policy"
      sections={[
        {
          id: "vision",
          title: "NightFury Vision Products",
          content: (
            <p>
              Customers may initiate a return request within <strong>{REFUND.visionReturnWindow}</strong> of successful delivery.
            </p>
          ),
        },
        {
          id: "aroma",
          title: "NightFury Aroma Products",
          content: (
            <>
              <p>Returns are not accepted except when:</p>
              <ul>
                <li>Product arrived damaged</li>
                <li>Product leaked during transit</li>
                <li>Wrong product delivered</li>
                <li>Manufacturing defect detected</li>
              </ul>
            </>
          ),
        },
        {
          id: "care",
          title: "NightFury Care Products",
          content: (
            <>
              <p>Returns are not accepted except when:</p>
              <ul>
                <li>Product arrived damaged</li>
                <li>Wrong product delivered</li>
                <li>Manufacturing defect detected</li>
              </ul>
            </>
          ),
        },
        {
          id: "reporting",
          title: "Reporting Timeline",
          content: (
            <p>
              Damaged, defective, missing, or incorrect products must be reported within <strong>{REFUND.reportingTimeline}</strong>.
            </p>
          ),
        },
        {
          id: "evidence",
          title: "Required Evidence",
          content: (
            <>
              <p>Customers may be required to provide:</p>
              <ul>
                {REFUND.requiredEvidence.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
              <p>Failure to provide supporting evidence may result in claim rejection.</p>
            </>
          ),
        },
        {
          id: "refund-processing",
          title: "Refund Processing",
          content: (
            <>
              <p>
                Approved refunds shall be processed within <strong>{REFUND.refundProcessing}</strong>.
              </p>
              <p>Refunds shall be credited to the original payment source.</p>
            </>
          ),
        },
        {
          id: "cancellation",
          title: "Cancellation Policy",
          content: (
            <>
              <p>Orders may be cancelled without penalty before dispatch.</p>
              <p>Orders cannot be cancelled after dispatch. Post-dispatch requests will be handled under this Return Policy.</p>
            </>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          content: (
            <p>
              To initiate a return or refund, contact us at{" "}
              <a href={`mailto:${SUPPORT.email}`}>{SUPPORT.email}</a> or call{" "}
              <a href={SUPPORT.phoneHref}>{SUPPORT.phone}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
