import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { SHIPPING, SUPPORT, SITE_URL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Shipping Policy - NightFury",
  description: "NightFury delivery timelines and service areas. Pan India delivery via Shiprocket.",
  keywords: ["NightFury shipping", "delivery policy", "Pan India delivery"],
  openGraph: {
    title: "Shipping Policy - NightFury",
    description: "Delivery timelines and service areas for NightFury products.",
    url: `${SITE_URL}/shipping-policy`,
    type: "website",
  },
  twitter: { card: "summary" },
  alternates: { canonical: `${SITE_URL}/shipping-policy` },
};

export default function ShippingPage() {
  return (
    <LegalPage
      title="Shipping Policy"
      description="We ship NightFury products across India. Here is everything you need to know about our shipping process and timelines."
      breadcrumb="Shipping Policy"
      sections={[
        {
          id: "service-area",
          title: "Service Area",
          content: (
            <p>
              NightFury ships <strong>{SHIPPING.serviceArea}</strong>. Shipping availability remains subject to courier serviceability at your PIN code.
            </p>
          ),
        },
        {
          id: "partner",
          title: "Shipping Partner",
          content: (
            <p>
              Our primary logistics platform is <strong>{SHIPPING.partner}</strong>. NightFury may utilize multiple courier providers through {SHIPPING.partner} to ensure timely and reliable delivery.
            </p>
          ),
        },
        {
          id: "processing",
          title: "Processing Time",
          content: (
            <>
              <p>
                Orders are generally processed within <strong>{SHIPPING.processingTime}</strong> of successful order confirmation.
              </p>
              <p>
                Orders placed on holidays or weekends may be processed on the next business day.
              </p>
            </>
          ),
        },
        {
          id: "delivery",
          title: "Delivery Timeline",
          content: (
            <>
              <p>
                Estimated delivery: <strong>{SHIPPING.deliveryTime}</strong>
              </p>
              <p>Actual delivery timelines may vary due to:</p>
              <ul>
                <li>Remote locations</li>
                <li>Weather conditions</li>
                <li>Natural disasters</li>
                <li>Public holidays</li>
                <li>Courier delays</li>
              </ul>
            </>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          content: (
            <p>
              For shipping inquiries, contact us at{" "}
              <a href={`mailto:${SUPPORT.email}`}>{SUPPORT.email}</a> or call{" "}
              <a href={SUPPORT.phoneHref}>{SUPPORT.phone}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
