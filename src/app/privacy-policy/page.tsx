import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { BUSINESS, SUPPORT, GRIEVANCE_OFFICER, SITE_URL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy - NightFury",
  description: "How NightFury and Yash Marketing collect, use, and protect your personal information when you use nightfury.in.",
  keywords: ["NightFury privacy policy", "data protection", "Yash Marketing privacy"],
  openGraph: {
    title: "Privacy Policy - NightFury",
    description: "How NightFury collects, uses, and protects your personal information.",
    url: `${SITE_URL}/privacy-policy`,
    type: "website",
  },
  twitter: { card: "summary" },
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This policy explains how we collect, use, and safeguard your personal data when you visit nightfury.in or purchase our products."
      breadcrumb="Privacy Policy"
      sections={[
        {
          id: "collection",
          title: "Information We Collect",
          content: (
            <>
              <p>NightFury ({BUSINESS.legalName}) may collect the following information:</p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Billing address</li>
                <li>Shipping address</li>
                <li>Order information</li>
                <li>Device information</li>
                <li>IP address</li>
              </ul>
            </>
          ),
        },
        {
          id: "usage",
          title: "How We Use Your Information",
          content: (
            <>
              <p>Information is collected solely for:</p>
              <ul>
                <li>Order processing and fulfillment</li>
                <li>Customer support</li>
                <li>Warranty management</li>
                <li>Fraud prevention</li>
                <li>Marketing communications</li>
              </ul>
              <p>
                We do not sell, rent, or share your personal information with third parties except as necessary to process your order (payment gateways, shipping partners) or as required by law.
              </p>
            </>
          ),
        },
        {
          id: "security",
          title: "Data Security",
          content: (
            <p>
              We implement industry-standard security measures to protect your personal data. All online transactions are processed through secure payment infrastructure. NightFury does not store complete card information on its servers.
            </p>
          ),
        },
        {
          id: "cookies",
          title: "Cookies & Tracking",
          content: (
            <p>
              We may use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings.
            </p>
          ),
        },
        {
          id: "opt-out",
          title: "Opt-Out & Communication Preferences",
          content: (
            <p>
              Customers may opt out of promotional communication at any time by contacting us at <a href={`mailto:${SUPPORT.email}`}>{SUPPORT.email}</a> or using the unsubscribe link provided in our emails.
            </p>
          ),
        },
        {
          id: "grievance",
          title: "Grievance Officer",
          content: (
            <>
              <p>In accordance with applicable regulations, our Grievance Officer details are:</p>
              <ul>
                <li><strong>Name:</strong> {GRIEVANCE_OFFICER.name}</li>
                <li><strong>Designation:</strong> {GRIEVANCE_OFFICER.designation}</li>
                <li><strong>Email:</strong> <a href={`mailto:${GRIEVANCE_OFFICER.email}`}>{GRIEVANCE_OFFICER.email}</a></li>
                <li><strong>Phone:</strong> <a href={`tel:${GRIEVANCE_OFFICER.phone.replace(/\s/g, "")}`}>{GRIEVANCE_OFFICER.phone}</a></li>
              </ul>
              <p>All grievances shall be acknowledged and processed in accordance with applicable Indian e-commerce regulations.</p>
            </>
          ),
        },
        {
          id: "changes",
          title: "Changes to This Policy",
          content: (
            <p>
              NightFury reserves the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated effective date. Continued use of the website constitutes acceptance of the revised policy.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          content: (
            <p>
              For privacy-related inquiries, contact us at{" "}
              <a href={`mailto:${SUPPORT.email}`}>{SUPPORT.email}</a> or call{" "}
              <a href={SUPPORT.phoneHref}>{SUPPORT.phone}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
