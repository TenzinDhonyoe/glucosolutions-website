import { ArrowRight, Utensils, Droplet, Footprints, Flame } from "lucide-react";
import { Container, Eyebrow, Button, StatusPill } from "@/components/ui";
import { PhoneFrame } from "./PhoneFrame";

function ReduScreen() {
  return (
    <div className="px-5 pb-6 pt-9">
      <div className="flex items-center justify-between">
        <span className="text-gradient font-sans text-lg font-bold tracking-[-0.02em]">
          Redu
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-warn-bg px-2.5 py-1 text-[11px] font-semibold text-warn">
          <Flame size={12} aria-hidden /> 6-day streak
        </span>
      </div>

      <p className="mt-5 font-serif text-[20px] text-ink-900">Good afternoon, Maya.</p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { icon: Droplet, label: "Glucose" },
          { icon: Utensils, label: "Meal" },
          { icon: Footprints, label: "Steps" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1.5 rounded-lg border border-line bg-card py-3 text-ink-700"
          >
            <Icon size={18} className="text-sky-700" aria-hidden />
            <span className="text-[12px] font-medium">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-line bg-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-ink-500">After lunch</span>
          <StatusPill state="good" dot={false} className="px-2 py-0.5 text-[11px]">
            In range
          </StatusPill>
        </div>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="tnum text-3xl font-medium text-ink-900">124</span>
          <span className="tnum text-[13px] text-ink-500">mg/dL</span>
        </div>
      </div>

      <div className="mt-3 rounded-lg bg-sky-50 p-3.5 text-[13px] text-ink-700">
        From your dietitian: “Lovely flat afternoon — the walk is working.”
      </div>
    </div>
  );
}

export function ReduTeaser() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, var(--color-page) 0%, #EFF8FB 100%)" }}
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <Eyebrow number="05">Redu</Eyebrow>
            <h2 className="display-serif mt-4 text-[clamp(1.9rem,3.6vw,2.7rem)] text-ink-900 text-balance">
              Redu — the patient's half of the system.
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-500">
              Redu is the app your patients actually use. Low-friction logging, a
              second-chance framing that keeps people coming back, and the
              engagement that makes everything above possible. Included with your
              subscription at no cost to your patients.
            </p>
            <Button href="/redu" variant="ghost" iconRight={ArrowRight} className="mt-7 -ml-4">
              More about Redu
            </Button>
          </div>

          <div className="order-first lg:order-last">
            <PhoneFrame>
              <ReduScreen />
            </PhoneFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}
