import type { Metadata } from "next";
import { EyeOff, FileSignature, Lock, Ban, MapPin, Boxes } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, Section, PageHero, Button, Card, Eyebrow } from "@/components/ui";
import type { IconType } from "@/components/ui";

export const metadata: Metadata = {
  title: "Security & Compliance",
  description:
    "Patient trust is the product. PHIPA- and PIPEDA-aligned data handling, de-identification before any AI processing, and a written custodian/agent agreement.",
};

type Principle = {
  icon: IconType;
  title: string;
  body: string;
  status?: string; // honest progress marker for items still being finalized
  emphasis?: boolean;
};

const PRINCIPLES: Principle[] = [
  {
    icon: EyeOff,
    title: "De-identified before any AI processing",
    body: "Patient-identifying data is stripped before anything is sent to an external model. This is our strongest, most defensible commitment — and it's built into the pipeline, not bolted on.",
    emphasis: true,
  },
  {
    icon: FileSignature,
    title: "You stay the custodian; we're your agent",
    body: "The registered dietitian remains the health information custodian. GlucoSolutions operates as your agent under a written data agreement — a real artifact we sign with you.",
  },
  {
    icon: Ban,
    title: "We don't train on your patients' data",
    body: "Your patients' data is not used to train models. We commit to this in writing in the data agreement.",
    status: "[CONFIRM before publishing]",
  },
  {
    icon: Lock,
    title: "Encryption & access controls",
    body: "Data encrypted in transit and at rest, role-based access, and audit logging. We'll confirm exactly what's live for your account before you sign.",
    status: "[CONFIRM each item is implemented]",
  },
  {
    icon: MapPin,
    title: "Data residency",
    body: "Where PHI is stored matters. We'll tell you precisely where your patients' data lives today and what's in progress — no vague claims.",
    status: "[CONFIRM — do not claim 'stored in Canada' unless true today]",
  },
  {
    icon: Boxes,
    title: "Subprocessors",
    body: "We keep a short, current list of the third parties we rely on (hosting and our model provider among them). Ask us for the latest list during diligence.",
    status: "[CONFIRM the live list]",
  },
];

export default function SecurityPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PageHero
          eyebrow="Security & compliance"
          title="Patient trust is the product."
          lead="We handle protected health information the way a cautious clinician would: PHIPA- and PIPEDA-aligned, de-identified before AI, and accountable in writing."
        />

        <Section tone="card">
          <Eyebrow number="01">How we handle PHI</Eyebrow>
          <h2 className="display-serif mb-10 mt-4 text-[clamp(1.7rem,3vw,2.3rem)] text-ink-900">
            Our commitments.
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <Card
                key={p.title}
                className={`p-7 ${p.emphasis ? "md:col-span-2" : ""}`}
                shadow={p.emphasis ? "md" : "sm"}
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                    <p.icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-ink-900">{p.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{p.body}</p>
                    {p.status ? (
                      <p className="mono-label mt-3 text-warn">{p.status}</p>
                    ) : null}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Honesty block */}
        <Section>
          <Card className="p-8" warm>
            <h2 className="display-serif text-[clamp(1.5rem,2.6vw,2rem)] text-ink-900">
              What we don&apos;t do yet.
            </h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-500">
              We&apos;re early, and we&apos;d rather tell you than let you assume.
              Formal certifications (such as SOC&nbsp;2) are not in place yet. When
              you ask where we stand on any control, you&apos;ll get a straight
              answer — what&apos;s live, what&apos;s in progress, and when.
            </p>
          </Card>
        </Section>

        {/* CTA */}
        <Section tone="ink" className="text-center">
          <h2 className="display-serif mx-auto max-w-2xl text-[clamp(1.8rem,3.4vw,2.6rem)] text-page text-balance">
            Questions about compliance?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] text-page/70">
            Talk to a founder — not a sales rep.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/contact" size="lg" pill variant="secondary">
              Talk to a founder
            </Button>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
