import type { Metadata } from "next";
import { Saira_Condensed, Spline_Sans_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import { BUSINESS, SUPPORT, SITE_URL } from "@/lib/legal";

const saira = Saira_Condensed({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const spline = Spline_Sans_Mono({
  variable: "--font-spline",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Body/UI text face. Saira Condensed is a display font, too narrow to read at paragraph sizes.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NightFury - Drive The Difference",
  description:
    "NightFury Vision, Aroma and Care - premium LED headlights, car perfumes and car care products. Drive the difference.",
  keywords: ["NightFury", "LED headlights", "car perfumes", "car care", "automotive accessories", "Yash Marketing"],
  openGraph: {
    title: "NightFury - Drive The Difference",
    description: "Premium automotive parts and accessories. Vision. Aroma. Care.",
    url: SITE_URL,
    siteName: "NightFury",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  metadataBase: new URL(SITE_URL),
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BUSINESS.brandName,
  legalName: BUSINESS.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/media/logos/logo.png`,
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
    <html
      lang="en"
      className={`${saira.variable} ${spline.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        </CartProvider>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
