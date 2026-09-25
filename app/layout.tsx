import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "@/components/seo/JsonLd";
import { organization, website } from "@/lib/seo/jsonLd";
import "./globals.css";

// Nunito Sans is the brand face for everything. Loaded as a variable font with
// the width and optical-size axes so headlines can be set wide and light.
const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.glucosolutionsinc.com";

const SITE_DESCRIPTION =
  "A needle-free band that shows how your glucose responds to meals, walks and sleep, so people with prediabetes can see what's working and reverse it sooner. Join the waitlist.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GlucoSolutions: See how your body answers every meal",
    template: "%s | GlucoSolutions",
  },
  description: SITE_DESCRIPTION,
  applicationName: "GlucoSolutions",
  authors: [{ name: "GlucoSolutions", url: SITE_URL }],
  creator: "GlucoSolutions",
  publisher: "GlucoSolutions",
  category: "Health Technology",
  keywords: [
    "prediabetes",
    "reverse prediabetes",
    "non-invasive glucose monitor",
    "needle-free glucose wearable",
    "glucose response to food",
    "post-meal glucose",
    "blood sugar wearable",
    "prediabetes Canada",
    "metabolic health",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "GlucoSolutions",
    title: "See how your body answers every meal.",
    description: SITE_DESCRIPTION,
    locale: "en_CA",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "GlucoSolutions: a needle-free glucose band for people with prediabetes.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "See how your body answers every meal.",
    description: SITE_DESCRIPTION,
    images: ["/api/og"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-CA": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  other: {
    "geo.region": "CA",
    "geo.placename": "Toronto, Canada",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f2b2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${nunitoSans.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <JsonLd nodes={[organization(), website()]} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
