import type { Metadata, Viewport } from "next";
import { Saira_Condensed, Spline_Sans_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import { BUSINESS, SUPPORT, SITE_URL } from "@/lib/legal";

const saira = Saira_Condensed({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const spline = Spline_Sans_Mono({
  variable: "--font-spline",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "NightFury: LED Headlights, Car Perfumes and Car Care",
  description:
    "NightFury Vision LED headlights, Aroma car perfumes and Care detailing products. Buy on Flipkart or through authorized dealers across India.",
  openGraph: {
    siteName: "NightFury",
    url: SITE_URL,
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BUSINESS.brandName,
  legalName: BUSINESS.legalName,
  url: SITE_URL,
  slogan: "Drive The Difference",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SUPPORT.phone,
    email: SUPPORT.email,
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: `${BUSINESS.address.line1}, ${BUSINESS.address.line2}`,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.state,
    postalCode: BUSINESS.address.pin,
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${saira.variable} ${spline.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-navy focus:px-4 focus:py-3 focus:font-mono focus:text-white"
        >
          Skip to content
        </a>
        <div className="nf-shell">
          <Marquee />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
