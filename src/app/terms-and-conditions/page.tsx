import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { BUSINESS, SUPPORT, JURISDICTION, SITE_URL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions - NightFury",
  description: "Terms and conditions governing the use of nightfury.in, purchase of NightFury products, and related services by Yash Marketing.",
  keywords: ["NightFury terms", "terms and conditions", "Yash Marketing", "automotive accessories terms"],
  openGraph: {
    title: "Terms & Conditions - NightFury",
    description: "Terms and conditions governing the use of nightfury.in and purchase of NightFury products.",
    url: `${SITE_URL}/terms-and-conditions`,
    type: "website",
  },
  twitter: { card: "summary" },
  alternates: { canonical: `${SITE_URL}/terms-and-conditions` },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="These terms govern your use of nightfury.in and the purchase of NightFury products. Please read them carefully before using our website."
      breadcrumb="Terms & Conditions"
      sections={[
        {
          id: "overview",
          title: "Overview",
          content: (
            <>
              <p>
                This website is operated by <strong>{BUSINESS.legalName}</strong>, the authorized distributor of <strong>{BUSINESS.brandName}</strong> products. By accessing or using this website, you agree to be bound by these Terms & Conditions.
              </p>
              <p>
                {BUSINESS.legalName} operates as the authorized distributor and business entity responsible for the sale, fulfillment, support, warranty, and customer service of all NightFury products.
              </p>
            </>
          ),
        },
        {
          id: "eligibility",
          title: "Eligibility",
          content: (
            <p>
              By using this website, you represent that you are at least 18 years of age, or accessing the website under the supervision of a parent or legal guardian. You agree to provide accurate, current, and complete information when you submit any form on this website.
            </p>
          ),
        },
        {
          id: "products",
          title: "Products & Pricing",
          content: (
            <>
              <p>
                All product descriptions, images, and specifications are provided for informational purposes. NightFury reserves the right to modify product details, pricing, and availability without prior notice.
              </p>
            </>
          ),
        },
        {
          id: "ip",
          title: "Intellectual Property",
          content: (
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, product designs, and software, is the property of NightFury / {BUSINESS.legalName} and is protected under applicable intellectual property laws. Unauthorized use, reproduction, or distribution is prohibited.
            </p>
          ),
        },
        {
          id: "limitation",
          title: "Limitation of Liability",
          content: (
            <p>
              NightFury shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or purchase of products. Our total liability shall not exceed the amount paid by you for the specific product in question.
            </p>
          ),
        },
        {
          id: "jurisdiction",
          title: "Governing Law & Jurisdiction",
          content: (
            <p>
              All disputes arising from the use of this website, purchase of products, warranty claims, or related services shall be governed by the laws of India. Courts located in <strong>{JURISDICTION}</strong> shall have exclusive jurisdiction.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          content: (
            <p>
              For questions about these terms, contact us at{" "}
              <a href={`mailto:${SUPPORT.email}`}>{SUPPORT.email}</a> or call{" "}
              <a href={SUPPORT.phoneHref}>{SUPPORT.phone}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
