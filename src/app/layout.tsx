import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Saira_Condensed, Spline_Sans_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import { BUSINESS, SUPPORT, SITE_URL } from "@/lib/legal";

// Saira Condensed now draws only the NightFury wordmark and the product
// mockup labels, so the logo keeps its original lockup.
const saira = Saira_Condensed({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

// Headings: a tight, upright grotesque for a sober, corporate voice.
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

// Paragraphs, labels and navigation.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Kept only for the /socials page, which has its own styling.
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
    <html lang="en-IN" className={`${saira.variable} ${interTight.variable} ${inter.variable} ${spline.variable}`}>
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
