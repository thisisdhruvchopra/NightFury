import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Saira_Condensed, Spline_Sans_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/legal";
import { OG_IMAGE, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

// Saira Condensed now draws only the Nightfury wordmark and the product
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
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

// Paragraphs, labels and navigation.
const inter = Inter({
  variable: "--font-inter",
  style: ["normal", "italic"],
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
  title: "Nightfury: LED Headlights, Car Perfumes and Car Care",
  description:
    "Nightfury Vision LED headlights, Aroma car perfumes and Care detailing products. Buy on Flipkart or through authorized dealers across India.",
  applicationName: "Nightfury",
  openGraph: {
    siteName: "Nightfury",
    url: SITE_URL,
    type: "website",
    locale: "en_IN",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
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
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
