import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FinalCta } from "@/components/home/FinalCta";
import { Container, Section, PageHero, Button, Card, Accordion } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One plan, everything included. $199/month per practice — the clinical dashboard, Redu for your patients, messaging, session-prep summaries, and all interpretation features.",
};

const INCLUDES = [
  "The clinical dashboard",
  "Redu for your patients",
  "Between-session messaging",
  "Session-prep summaries",
  "All interpretation features",
];

const FAQS = [
  {
    q: "Do my patients pay anything?",
    a: "No. Redu is included for your patients at no cost to them.",
  },
  {
    q: "Do I need CGMs?",
    a: "No. Patients can log glucose manually; CGM is supported, not required.",
  },
  {
    q: "Is this PHIPA / PIPEDA compliant?",
    a: (
      <>
        We align our data handling with PHIPA and PIPEDA.{" "}
        <Link href="/security" className="font-medium text-sky-700 underline decoration-sky-700/40 underline-offset-2 transition-colors hover:decoration-sky-700">
          See how we handle data →
        </Link>
      </>
    ),
  },
  {
    q: "Who owns the patient data?",
    a: (
      <>
        The patient&apos;s information stays under your custodianship; we operate
        as your agent under a written agreement.{" "}
        <Link href="/security" className="font-medium text-sky-700 underline decoration-sky-700/40 underline-offset-2 transition-colors hover:decoration-sky-700">
          More on Security →
        </Link>
      </>
    ),
  },
  {
    q: "Can I export my data if I leave?",
    a: "Your data is yours. If you ever leave, we'll help you export it.",
  },
  {
    q: "Is this medical advice? Does it diagnose?",
    a: "No. It organizes and interprets data to support your clinical judgment — it doesn't replace it.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PageHero
          eyebrow="Pricing"
          title="Simple pricing for solo practice."
          lead="One plan. No tiers to decode, no per-feature upsells. At our stage, every sale is a conversation — so the button is a demo, not a checkout."
          center
        />

        <section className="pb-8">
          <Container>
            <Card className="mx-auto max-w-lg p-8 text-center" shadow="md">
              <div className="flex items-baseline justify-center gap-2">
                <span className="tnum text-6xl font-medium text-ink-900">$199</span>
                <span className="text-[16px] text-ink-500">/ month · per practice</span>
              </div>
              <p className="mt-3 text-[15px] text-ink-500">Cancel anytime.</p>

              <ul className="mx-auto mt-7 max-w-sm space-y-3 text-left">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-good-bg text-good">
                      <Check size={13} aria-hidden />
                    </span>
                    <span className="text-[15px] text-ink-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button href="/contact" size="lg" pill fullWidth iconRight={ArrowRight}>
                  Book a demo
                </Button>
              </div>
              {/* [CONFIRM] patient cap / per-seat, annual discount, pilot pricing, data-on-cancel */}
              <p className="mt-5 text-[13px] text-ink-500">
                Patient limits, annual options, and founding-RD pricing — we&apos;ll
                cover these on the call.
              </p>
            </Card>
          </Container>
        </section>

        <Section>
          <div className="mx-auto max-w-2xl">
            <h2 className="display-serif text-center text-[clamp(1.7rem,3vw,2.3rem)] text-ink-900">
              Questions, answered.
            </h2>
            <Accordion items={FAQS} className="mt-8" />
          </div>
        </Section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
