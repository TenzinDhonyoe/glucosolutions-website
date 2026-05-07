import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://glucosolutions.ca";

// AI / answer-engine crawlers we explicitly welcome. Listing them by name
// (rather than relying on the universal rule) makes intent clear and is
// resilient to any future default-deny shifts in their behavior.
const LLM_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Amazonbot",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/og"],
        disallow: ["/api/"],
      },
      ...LLM_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
