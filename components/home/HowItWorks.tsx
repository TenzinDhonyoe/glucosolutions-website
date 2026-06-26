import { Smartphone, Workflow, ClipboardCheck } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui";
import type { IconType } from "@/components/ui";

const STEPS: { n: string; icon: IconType; title: string; body: React.ReactNode }[] = [
  {
    n: "1",
    icon: Smartphone,
    title: "Patients log in Redu",
    body: "Meals, glucose (finger-prick or CGM), steps, sleep — in seconds, on their phone.",
  },
  {
    n: "2",
    icon: Workflow,
    title: "GlucoSolutions interprets the behavior",
    body: "Every insight is tied to the exact data point behind it — no black box.",
  },
  {
    n: "3",
    icon: ClipboardCheck,
    title: "You act with confidence",
    body: "Walk into each session prepped, message patients between visits, and export outcomes for referrers.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 bg-sunken py-20 md:py-28">
      <Container>
        <Eyebrow number="02">How it works</Eyebrow>
        <h2 className="display-serif mt-4 text-[clamp(1.9rem,3.6vw,2.7rem)] text-ink-900">
          Three steps. One source of truth.
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {STEPS.map(({ n, icon: Icon, title, body }) => (
            <div key={n} className="bg-card p-7">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                  <Icon size={20} aria-hidden />
                </span>
                <span className="tnum text-4xl font-medium text-line-2">{n}</span>
              </div>
              <h3 className="mt-5 font-serif text-xl text-ink-900">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
