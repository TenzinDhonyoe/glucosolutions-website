import { ArrowRight, ShieldCheck, EyeOff, FileSignature } from "lucide-react";
import { Container, Eyebrow, Button } from "@/components/ui";
import type { IconType } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const POINTS: { icon: IconType; text: string }[] = [
  { icon: ShieldCheck, text: "PHIPA- and PIPEDA-aligned data handling." },
  { icon: EyeOff, text: "Patient data is de-identified before any AI processing." },
  {
    icon: FileSignature,
    text: "You remain the health information custodian; we operate as your agent under a written agreement.",
  },
];

// Honest compliance markers per content.md — alignment + de-identification +
// custodian model. No certification claims we can't back yet.
const MARKERS = [
  "PHIPA-aligned",
  "PIPEDA-aligned",
  "De-identified before AI",
  "Custodian / agent model",
];

export function SecurityTeaser() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal variant="left">
            <Eyebrow slash>Security</Eyebrow>
            <h2 className="display-serif mt-5 text-[clamp(2rem,4.4vw,3.2rem)] text-ink-900">
              Built for PHI from day one.
            </h2>
            <Button href="/security" variant="ghost" iconRight={ArrowRight} className="mt-6 -ml-4">
              How we handle data
            </Button>
          </Reveal>

          <Stagger as="ul" className="space-y-5" stagger={0.12}>
            {POINTS.map(({ icon: Icon, text }) => (
              <StaggerItem as="li" key={text} variant="right" className="flex gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                  <Icon size={18} aria-hidden />
                </span>
                <p className="pt-1.5 text-[16px] leading-relaxed text-ink-700">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* compliance marker strip — the trust band */}
        <Stagger className="mt-14 flex flex-wrap items-center gap-3 border-t border-line pt-8" stagger={0.09}>
          {MARKERS.map((m) => (
            <StaggerItem key={m} variant="scale">
              <span className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-card px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                {m}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
