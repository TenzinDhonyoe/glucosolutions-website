import type { Metadata } from "next";
import { EyeOff, FileSignature, Lock, Ban, MapPin, Boxes, FileText, Cpu, ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Section, Button, Card, Eyebrow, MediaHero } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, DrawLine } from "@/components/motion";
import type { IconType } from "@/components/ui";

export const metadata: Metadata = {
  title: "Security & Compliance",
  description:
    "Patient trust is the product. PHI-aware safeguards: encrypted storage, row-level access controls, data minimization for AI features, and written vendor agreements before production patient use.",
};

type Principle = {
  icon: IconType;
  title: string;
  body: string;
  status?: string; // honest progress marker for items still being finalized
};

const PRINCIPLES: Principle[] = [
  {
    icon: FileSignature,
    title: "Written agreement before real patient data",
    body: "Before any real patient data is used, we put a written data protection agreement in place. You remain the health information custodian; GlucoSolutions processes patient information only on your instructions.",
  },
  {
    icon: Ban,
    title: "AI terms before production PHI use",
    body: "AI features are limited to demo or de-identified data until our vendor data-processing and retention terms are finalized.",
  },
  {
    icon: Lock,
    title: "Encryption & access controls",
    body: "Patient data is protected with encrypted transport and encrypted cloud storage. Access is restricted by authenticated accounts and database row-level security so dietitians only see linked clients.",
  },
  {
    icon: MapPin,
    title: "Data residency",
    body: "We document where patient data is hosted and disclose hosting regions before onboarding. We do not make data-residency claims unless they are contractually and technically confirmed.",
  },
  {
    icon: Boxes,
    title: "Subprocessors",
    body: "We maintain a current list of subprocessors, including hosting, authentication, email, analytics, and AI providers, and make it available during diligence.",
  },
];

/* Data-minimization flow: raw identifiers are stripped from demo or approved
   AI inputs so only the necessary clinical context moves forward. */
function DeidFlow() {
  return (
    <div className="grid items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
      {/* raw record */}
      <div className="rounded-xl border border-line bg-card p-5 shadow-sm">
        <div className="mono-label mb-3 flex items-center gap-2 text-ink-500">
          <FileText size={13} aria-hidden /> Patient record
        </div>
        <ul className="space-y-1.5 text-[13px]">
          <li className="text-ink-400 line-through decoration-high/70">Name · Maya R.</li>
          <li className="text-ink-400 line-through decoration-high/70">DOB · 1984-03-12</li>
          <li className="text-ink-400 line-through decoration-high/70">MRN · GS-4821</li>
          <li className="tnum text-ink-700">Glucose · 138 mg/dL</li>
          <li className="tnum text-ink-700">Steps · 4,210</li>
        </ul>
      </div>

      <div className="hidden items-center justify-center sm:flex">
        <ArrowRight size={18} className="text-ink-400" aria-hidden />
      </div>

      {/* strip identifiers */}
      <div className="flex flex-col items-center justify-center rounded-xl border border-sky-100 bg-sky-50 p-5 text-center">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-sky-700 text-white">
          <EyeOff size={20} aria-hidden />
        </span>
        <div className="mt-3 text-[14px] font-semibold text-ink-900">Identifiers stripped</div>
        <p className="mt-1 text-[12px] leading-snug text-ink-500">Before anything leaves our pipeline.</p>
      </div>

      <div className="hidden items-center justify-center sm:flex">
        <ArrowRight size={18} className="text-ink-400" aria-hidden />
      </div>

      {/* minimized → AI */}
      <div className="rounded-xl border border-line bg-card p-5 shadow-sm">
        <div className="mono-label mb-3 flex items-center gap-2 text-good">
          <Cpu size={13} aria-hidden /> AI input · minimized
        </div>
        <ul className="space-y-1.5 text-[13px]">
          <li className="text-good">✓ No name</li>
          <li className="text-good">✓ No DOB</li>
          <li className="text-good">✓ No MRN</li>
          <li className="tnum text-ink-700">Glucose · 138 mg/dL</li>
          <li className="tnum text-ink-700">Steps · 4,210</li>
        </ul>
      </div>
    </div>
  );
}

export default function SecurityPage() {
  return (
    <>
      <Nav transparentOverHero />
      <main className="flex-1">
        <MediaHero
          image="/photos/water-blue.jpg"
          eyebrow="Security & compliance"
          title="Patient trust is the product."
          lead="Built with PHI-aware safeguards: encrypted storage, row-level access controls, data minimization for AI features, and written vendor agreements before production patient use."
          objectPosition="center"
          wash="left"
        >
          <Button href="/contact" size="lg" pill iconRight={ArrowRight}>
            Talk to a founder
          </Button>
        </MediaHero>

        {/* The headline commitment — data minimization, shown as a pipeline */}
        <Section tone="card">
          <Reveal>
            <Eyebrow number="01">The headline commitment</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-serif mt-4 max-w-3xl text-[clamp(1.9rem,3.6vw,2.7rem)] text-ink-900 text-balance">
              Data minimization before AI features.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-500">
              AI features are limited to demo or de-identified data until vendor
              data-processing and retention terms are finalized. Where AI is
              used, we minimize inputs first and keep source facts separate from
              generated narration.
            </p>
          </Reveal>
          <Reveal delay={0.15} variant="scale" className="mt-10">
            <DeidFlow />
          </Reveal>
        </Section>

        {/* The rest of the commitments */}
        <Section>
          <Reveal>
            <Eyebrow number="02">How we handle PHI</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-serif mt-4 text-[clamp(1.7rem,3vw,2.3rem)] text-ink-900">
              The rest of our commitments.
            </h2>
          </Reveal>
          <DrawLine className="mt-8 h-px w-full origin-left bg-line" />
          <Stagger className="mt-10 grid gap-6 md:grid-cols-2" stagger={0.1}>
            {PRINCIPLES.map((p) => (
              <StaggerItem key={p.title} variant="up">
                <Card className="h-full p-7" lift>
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
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* Honesty block */}
        <Section tone="sunken">
          <Reveal variant="scale">
            <Card className="p-8 md:p-10" warm shadow="md">
              <h2 className="display-serif text-[clamp(1.5rem,2.6vw,2rem)] text-ink-900">
                What we don&apos;t do yet.
              </h2>
              <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-500">
                We&apos;re early, and we&apos;d rather tell you than let you assume.
                Formal certifications and compliance labels are not in place
                yet. We do not claim HIPAA, PHIPA, or SOC&nbsp;2 compliance until
                the underlying agreements, retention policies, incident process,
                and audit logging are nailed down.
              </p>
            </Card>
          </Reveal>
        </Section>

        {/* CTA */}
        <Section tone="ink" className="text-center">
          <Reveal>
            <h2 className="display-serif mx-auto max-w-2xl text-[clamp(1.8rem,3.4vw,2.6rem)] text-page text-balance">
              Questions about compliance?
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mx-auto mt-4 max-w-xl text-[17px] text-page/70">
              Talk to a founder, not a sales rep.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex justify-center">
              <Button href="/contact" size="lg" pill variant="secondary" iconRight={ArrowRight}>
                Talk to a founder
              </Button>
            </div>
          </Reveal>
        </Section>
      </main>
      <Footer />
    </>
  );
}
