import type { Metadata, Viewport } from "next";
import { Nunito_Sans, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ScrollProgress } from "@/components/interactive/ScrollProgress";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://glucosolutions.ca";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GlucoSolutions — Eat with confidence",
    template: "%s · GlucoSolutions",
  },
  description:
    "A non-invasive wearable and AI coach for glycemic trend awareness. Built for people with prediabetes who want to eat with confidence.",
  applicationName: "GlucoSolutions",
  authors: [{ name: "GlucoSolutions Inc." }],
  keywords: [
    "glycemic trends",
    "non-invasive wearable",
    "prediabetes",
    "metabolic awareness",
    "AI coaching",
    "wellness",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "GlucoSolutions",
    title: "Prediabetes is silent. Until it isn't.",
    description:
      "A non-invasive wearable and AI coach for glycemic trend awareness. Join the waitlist.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "GlucoSolutions — Prediabetes is silent. Until it isn't.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlucoSolutions — Eat with confidence",
    description:
      "A non-invasive wearable and AI coach for glycemic trend awareness.",
    images: ["/api/og"],
    creator: "@_tenZdhon_",
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07090A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${nunitoSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink-0 text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GlucoSolutions",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              description:
                "Non-invasive wearable and AI coach for glycemic trend awareness.",
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
