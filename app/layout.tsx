import type { Metadata, Viewport } from "next";
import { Newsreader, Geist_Mono, Nunito_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ScrollProgress } from "@/components/interactive/ScrollProgress";
import { SmoothScroll } from "@/components/motion";
import { JsonLd } from "@/components/seo/JsonLd";
import { organization, website } from "@/lib/seo/jsonLd";
import "./globals.css";

// GlucoSolutions Design System — Nunito Sans is the primary face site-wide
// (body, UI and display). Newsreader is kept only for the in-product mockup's
// client name; Geist Mono is for data, units and labels.
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

// Nunito Sans — the site's primary face (body + display). Full weight range so
// body copy, UI and headlines all draw from one family.
const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://glucosolutions.ca";

const SITE_DESCRIPTION =
  "See what your patients do between sessions. Sourced AI interpretation, a patient app, and outcomes reporting. Clinical software built for dietitians.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GlucoSolutions: Clinical software for dietitians",
    template: "%s · GlucoSolutions",
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
    "dietitian software platform",
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
        alt: "GlucoSolutions: clinical software for dietitians.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlucoSolutions: Clinical software for dietitians",
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
      className={`${newsreader.variable} ${geistMono.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-page text-ink-700">
        <JsonLd nodes={[organization(), website()]} />
        <SmoothScroll />
        <ScrollProgress />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
