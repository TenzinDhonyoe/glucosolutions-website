import type { Faq } from "@/lib/seo/faqs";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://glucosolutions.ca";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PRODUCT_ID = `${SITE_URL}/#product`;
const APP_ID = `${SITE_URL}/#softwareapplication`;
const SERVICE_ID = `${SITE_URL}/#service`;

const ORG_DESCRIPTION =
  "Gluco Solutions helps adults reverse prediabetes before it becomes type 2 diabetes. A non-invasive wearable, AI coaching, and a registered dietitian show you what spikes you, what calms you, and the small daily moves that compound. Wellness product, not a medical device.";

export type JsonLdNode = Record<string, unknown>;

export function organization(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Gluco Solutions",
    legalName: "Gluco Solutions",
    alternateName: "GlucoSolutions",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
    },
    image: `${SITE_URL}/logo.png`,
    description: ORG_DESCRIPTION,
    slogan: "Reverse prediabetes before it becomes type 2.",
    email: "hello@glucosolutions.ca",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CA",
    },
    areaServed: { "@type": "Country", name: "Canada" },
    sameAs: [
      "https://x.com/gluco_solutions",
      "https://www.linkedin.com/company/glucosolutions",
    ],
  };
}

export function website(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Gluco Solutions",
    description: ORG_DESCRIPTION,
    inLanguage: "en-CA",
    publisher: { "@id": ORG_ID },
  };
}

export function faqPage(faqs: readonly Faq[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    inLanguage: "en-CA",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function product(): JsonLdNode {
  return {
    "@type": "Product",
    "@id": PRODUCT_ID,
    name: "Gluco Solutions Wearable",
    category: "Wellness",
    description:
      "A non-invasive optical wearable that reads glycemic trends through the skin to help adults reverse prediabetes. No needles, no consumables, weekly charging. Wellness device, not a medical device.",
    brand: { "@id": ORG_ID },
    manufacturer: { "@id": ORG_ID },
    image: `${SITE_URL}/logo.png`,
    audience: {
      "@type": "PeopleAudience",
      suggestedMinAge: 18,
      audienceType: "Adults with prediabetes",
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Sensing", value: "Non-invasive optical" },
      { "@type": "PropertyValue", name: "Consumables", value: "None" },
      { "@type": "PropertyValue", name: "Charging", value: "Weekly" },
      { "@type": "PropertyValue", name: "Prescription required", value: "No" },
      {
        "@type": "PropertyValue",
        name: "Trend classification accuracy",
        value: "~80% (rising / stable / falling)",
      },
    ],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      priceCurrency: "CAD",
      price: "0",
      url: `${SITE_URL}/#waitlist`,
      seller: { "@id": ORG_ID },
    },
  };
}

export function softwareApplication(): JsonLdNode {
  return {
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: "Gluco Solutions",
    applicationCategory: "HealthApplication",
    operatingSystem: "iOS",
    description:
      "iOS app that pairs with the Gluco Solutions wearable to surface meal scores, activity context, and one plain-English nudge at a time.",
    publisher: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      priceCurrency: "CAD",
      price: "0",
    },
  };
}

export function service(): JsonLdNode {
  return {
    "@type": "Service",
    "@id": SERVICE_ID,
    name: "Gluco Solutions coaching",
    serviceType: "Wellness coaching",
    description:
      "AI coaching combined with registered dietitian guidance for reversing prediabetes. Personalized, plain-English nudges on meals, activity, and sleep — built around the habit changes that compound into a healthier metabolic decade.",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Canada" },
    audience: {
      "@type": "PeopleAudience",
      suggestedMinAge: 18,
      audienceType: "Adults with prediabetes",
    },
  };
}

export function webPage(args: {
  path: string;
  name: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
}): JsonLdNode {
  const url = `${SITE_URL}${args.path}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: args.name,
    description: args.description,
    inLanguage: "en-CA",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    ...(args.datePublished ? { datePublished: args.datePublished } : {}),
    ...(args.dateModified ? { dateModified: args.dateModified } : {}),
  };
}

export function graph(nodes: readonly JsonLdNode[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
