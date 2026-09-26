import type { Faq } from "@/lib/seo/faqs";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.glucosolutionsinc.com";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PRODUCT_ID = `${SITE_URL}/#product`;
const APP_ID = `${SITE_URL}/#softwareapplication`;

const ORG_DESCRIPTION =
  "GlucoSolutions makes a needle-free glucose band for people with prediabetes. It reads glucose trends through the skin and shows how meals, movement, sleep and stress move them, so people can reverse prediabetes sooner.";

export type JsonLdNode = Record<string, unknown>;

export function organization(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "GlucoSolutions",
    legalName: "GlucoSolutions Inc.",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
    },
    image: `${SITE_URL}/logo.svg`,
    description: ORG_DESCRIPTION,
    slogan: "See what moves your blood sugar.",
    email: "tenzin@glucosolutions.ca",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: { "@type": "Country", name: "Canada" },
    // [CONFIRM] company social handles
    sameAs: ["https://x.com/gluco_solutions"],
  };
}

export function website(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "GlucoSolutions",
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
    name: "GlucoSolutions band",
    category: "Wellness",
    description:
      "A non-invasive band that reads glucose trends (rising, steady, settling) through the skin, to help adults with prediabetes see which habits move them. No needles, no consumables, weekly charging. In development. Wellness device, not a medical device.",
    brand: { "@id": ORG_ID },
    manufacturer: { "@id": ORG_ID },
    image: `${SITE_URL}/logo.png`,
    audience: {
      "@type": "PeopleAudience",
      suggestedMinAge: 18,
      audienceType: "Adults with prediabetes",
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Sensing", value: "Non-invasive, through the skin" },
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
      url: `${SITE_URL}/#join`,
      seller: { "@id": ORG_ID },
    },
  };
}

export function softwareApplication(): JsonLdNode {
  return {
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: "GlucoSolutions",
    applicationCategory: "HealthApplication",
    operatingSystem: "iOS",
    description:
      "iPhone app that pairs with the GlucoSolutions band to show how meals, movement and sleep moved your glucose, with one plain-English suggestion at a time.",
    publisher: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      priceCurrency: "CAD",
      price: "0",
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
