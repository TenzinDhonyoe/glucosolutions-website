import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ScrollProgress } from "@/components/interactive/ScrollProgress";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gluco Solutions — Catch prediabetes before it catches you.",
    template: "%s · Gluco Solutions",
  },
  description:
    "A wellness wearable, AI coaching, and a registered dietitian — built for adults with prediabetes.",
  applicationName: "Gluco Solutions",
  authors: [{ name: "Gluco Solutions" }],
  keywords: [
    "prediabetes",
    "metabolic health",
    "glycemic awareness",
    "food-first nutrition",
    "non-invasive wearable",
    "AI coaching",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Gluco Solutions",
    title: "Catch prediabetes before it catches you.",
    description:
      "A wellness wearable, AI coaching, and a registered dietitian — built for adults with prediabetes.",
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
    title: "Gluco Solutions — Catch prediabetes before it catches you.",
    description:
      "A wellness wearable, AI coaching, and a registered dietitian — built for adults with prediabetes.",
    images: ["/api/og"],
    creator: "@_tenZdhon_",
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Gluco Solutions",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              description:
                "Food-first guidance and metabolic awareness for prediabetes.",
              sameAs: [
                "https://twitter.com/_tenZdhon_",
                "https://www.linkedin.com/company/glucosolutions",
              ],
            }),
          }}
        />
        <ScrollProgress />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
