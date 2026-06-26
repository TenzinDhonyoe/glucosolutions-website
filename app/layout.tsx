import type { Metadata, Viewport } from "next";
import { Newsreader, Hanken_Grotesk, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ScrollProgress } from "@/components/interactive/ScrollProgress";
import { JsonLd } from "@/components/seo/JsonLd";
import { organization, website } from "@/lib/seo/jsonLd";
import "./globals.css";

// GlucoSolutions Design System v1.0 — three voices, one tone.
// Hanken Grotesk = humanist sans for body & UI.
// Newsreader    = editorial serif for headlines & quotes.
// Geist Mono     = monospace for data, units and labels.
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://glucosolutions.ca";

const SITE_DESCRIPTION =
  "See what your patients do between sessions. Sourced AI interpretation, a patient app, and outcomes reporting — clinical software built for solo private-practice dietitians.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GlucoSolutions — Clinical software for solo dietitians",
    template: "%s — GlucoSolutions",
  },
  description: SITE_DESCRIPTION,
  applicationName: "GlucoSolutions",
  authors: [{ name: "GlucoSolutions", url: SITE_URL }],
  creator: "GlucoSolutions",
  publisher: "GlucoSolutions",
  category: "Health Technology",
  keywords: [
    "dietitian software",
    "registered dietitian dashboard",
    "private practice dietitian",
    "between-session patient monitoring",
    "glucose monitoring software",
    "CGM dashboard for dietitians",
    "clinical nutrition software",
    "patient engagement app",
    "outcomes reporting",
    "prediabetes management",
    "metabolic health",
    "Redu app",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "GlucoSolutions",
    title: "Know what your patients do between sessions.",
    description: SITE_DESCRIPTION,
    locale: "en_CA",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "GlucoSolutions — clinical software for solo private-practice dietitians.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlucoSolutions — Clinical software for solo dietitians",
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
  themeColor: "#F7F3EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${newsreader.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-page text-ink-700">
        <JsonLd nodes={[organization(), website()]} />
        <ScrollProgress />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
