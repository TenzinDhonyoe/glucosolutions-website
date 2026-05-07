export type Faq = { q: string; a: string };

export const FAQS: readonly Faq[] = [
  {
    q: "Is this a medical device?",
    a: "No. Gluco Solutions is a wellness product. It is not intended to diagnose, treat, cure, or prevent any disease, and it is not a substitute for medical-grade glucose monitoring.",
  },
  {
    q: "Do I need a prescription?",
    a: "No. The wearable and app are available without a prescription as wellness tools for glycemic trend awareness.",
  },
  {
    q: "How accurate is it?",
    a: "Roughly 80% trend classification accuracy in benchtop testing. We classify glycemic trends — rising, stable, falling — rather than reporting absolute mg/dL values.",
  },
  {
    q: "iOS or Android?",
    a: "iOS first. Android is on the roadmap and will follow once the iOS beta cohort matures.",
  },
  {
    q: "When can I get one?",
    a: "Early access is rolling out to a limited beta cohort now. Broader rollout dates will be announced as we expand. Join the waitlist for invites.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Your data is encrypted at rest and in transit, and we never sell it. You own your data and can delete it at any time.",
  },
];
