import { MotionSection } from "@/components/MotionSection";

const STEPS = [
  {
    n: "01",
    title: "Wear",
    body: "A slim wearable with custom PCB, ESP32-S3, and multi-wavelength NIR optics. Charge once, wear daily.",
  },
  {
    n: "02",
    title: "Sense",
    body: "Proprietary multi-wavelength NIR plus an ML classifier reads glycemic trend — rising, stable, or falling.",
  },
  {
    n: "03",
    title: "Coach",
    body: "The AI app turns trends into eat-this-not-that, walk-now, sleep-earlier guidance — in plain language.",
  },
];

export function HowItWorks() {
  return (
    <MotionSection
      id="how"
      ariaLabelledBy="how-title"
      className="relative bg-ink-1 text-white border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-28 md:py-36">
        <div className="max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            How it works
          </div>
          <h2
            id="how-title"
            className="mt-5 text-[40px] sm:text-[52px] md:text-[64px] leading-[1.02] font-extrabold tracking-[-0.035em] text-white"
          >
            Three steps. No needles.
          </h2>
        </div>

        <ol className="mt-20 grid gap-y-14 gap-x-12 md:grid-cols-3 relative">
          {STEPS.map((step) => (
            <li key={step.n} className="relative">
              <span className="block text-[68px] sm:text-[80px] leading-none font-extrabold tracking-[-0.04em] brand-text-gradient">
                {step.n}
              </span>
              <h3 className="mt-7 text-[26px] sm:text-[30px] font-bold tracking-[-0.02em] text-white">
                {step.title}
              </h3>
              <p className="mt-3 max-w-sm text-[16px] leading-[1.6] text-white/60">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </MotionSection>
  );
}
