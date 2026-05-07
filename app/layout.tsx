import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ScrollProgress } from "@/components/interactive/ScrollProgress";
import { JsonLd } from "@/components/seo/JsonLd";
import { organization, website } from "@/lib/seo/jsonLd";
import "./globals.css";

// Inter is the working substitute for Suisse Int'l (per DESIGN.md).
// Fraunces is the working substitute for Canela Deck — closest free
// editorial serif with a strong italic. Replace with licensed Suisse + Canela
// at launch; flag as substitutions in deliverables.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://glucosolutions.ca";

const SITE_DESCRIPTION =
  "Reverse prediabetes before it becomes type 2. A non-invasive wearable, AI coaching, and a registered dietitian help you see what spikes you, what calms you, and the small daily moves that compound.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GlucoSolutions — Reverse prediabetes.",
    template: "%s | Gluco Solutions",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Gluco Solutions",
  authors: [{ name: "Gluco Solutions", url: SITE_URL }],
  creator: "Gluco Solutions",
  publisher: "Gluco Solutions",
  category: "Health & Wellness",
  keywords: [
    "reverse prediabetes",
    "prediabetes",
    "prediabetes wearable",
    "non-invasive glucose monitor",
    "prediabetes reversal",
    "metabolic health",
    "glycemic awareness",
    "glucose trends",
    "food-first nutrition",
    "AI health coach",
    "registered dietitian",
    "wellness wearable",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Gluco Solutions",
    title: "Reverse prediabetes — before it becomes type 2.",
    description: SITE_DESCRIPTION,
    locale: "en_CA",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Gluco Solutions — catch prediabetes before it catches you.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gluco Solutions — Reverse prediabetes before it becomes type 2.",
    description: SITE_DESCRIPTION,
    images: ["/api/og"],
    site: "@gluco_solutions",
    creator: "@gluco_solutions",
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
    "geo.placename": "Canada",
  },
};

export const viewport: Viewport = {
  themeColor: "#F6F1E6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-charcoal">
        <JsonLd nodes={[organization(), website()]} />
        <ScrollProgress />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
