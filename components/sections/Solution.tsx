import { MotionSection } from "@/components/MotionSection";

const FEATURES = [
  {
    label: "Wearable",
    title: "Non-invasive sensing.",
    body: "Multi-wavelength near-infrared optics on a slim band. No needles, no skin patches, no consumables.",
  },
  {
    label: "AI Coach",
    title: "Context-aware nudges.",
    body: "A chat-native app that translates glycemic trends into eat-this-not-that, walk-now, sleep-earlier guidance.",
  },
  {
    label: "Daily Wear",
    title: "Designed to fade in.",
    body: "Charge once. Wear daily. Metabolic awareness without the friction of a medical device.",
  },
];

export function Solution() {
  return (
    <MotionSection
      id="solution"
      ariaLabelledBy="solution-title"
      className="relative bg-ink-0 text-white border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-28 md:py-36">
        <div className="max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            The solution
          </div>
          <h2
            id="solution-title"
            className="mt-5 text-[44px] sm:text-[56px] md:text-[68px] leading-[1.02] font-extrabold tracking-[-0.035em] text-white"
          >
            Trends, not pricks.
          </h2>
          <p className="mt-6 max-w-xl text-[17px] sm:text-[18px] leading-relaxed text-white/60">
            Glycemic trend awareness designed to fit a real life — at your
            desk, at the dinner table, on the trail.
          </p>
        </div>

        <ul className="mt-20 grid gap-x-12 gap-y-14 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <li key={f.title} className="relative">
              <div className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                <span className="text-brand-led/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{f.label}</span>
              </div>
              <h3 className="mt-5 text-[24px] sm:text-[26px] font-bold tracking-[-0.02em] text-white">
                {f.title}
              </h3>
              <p className="mt-3 text-[16px] leading-[1.6] text-white/60">
                {f.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
