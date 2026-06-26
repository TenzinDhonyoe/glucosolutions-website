import { ArrowRight, ShieldCheck, EyeOff, FileSignature } from "lucide-react";
import { Container, Eyebrow, Button } from "@/components/ui";
import type { IconType } from "@/components/ui";

const POINTS: { icon: IconType; text: string }[] = [
  { icon: ShieldCheck, text: "PHIPA- and PIPEDA-aligned data handling." },
  { icon: EyeOff, text: "Patient data is de-identified before any AI processing." },
  {
    icon: FileSignature,
    text: "You remain the health information custodian; we operate as your agent under a written agreement.",
  },
];

export function SecurityTeaser() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <Eyebrow number="06">Security</Eyebrow>
            <h2 className="display-serif mt-4 text-[clamp(1.9rem,3.6vw,2.7rem)] text-ink-900">
              Built for PHI from day one.
            </h2>
            <Button href="/security" variant="ghost" iconRight={ArrowRight} className="mt-6 -ml-4">
              How we handle data
            </Button>
          </div>

          <ul className="space-y-5">
            {POINTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                  <Icon size={18} aria-hidden />
                </span>
                <p className="pt-1.5 text-[16px] leading-relaxed text-ink-700">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
