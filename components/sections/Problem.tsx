import { MotionSection } from "@/components/MotionSection";

const HEADLINE_STAT = {
  big: "1 in 3",
  label: "US adults has prediabetes",
  source: "CDC, National Diabetes Statistics Report (2024)",
};

const SUPPORTING = [
  {
    big: "80%",
    label: "don't know they have it",
    source: "CDC Prediabetes Surveillance",
  },
  {
    big: "70%",
    label: "progress to type 2 within a decade",
    source: "American Diabetes Association",
  },
];

export function Problem() {
  return (
    <MotionSection
      id="problem"
      ariaLabelledBy="problem-title"
      className="relative bg-ink-0 text-white"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-28 md:py-36">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              The problem
            </div>
            <h2
              id="problem-title"
              className="mt-5 text-[40px] sm:text-[52px] md:text-[64px] leading-[1.02] font-extrabold tracking-[-0.03em] text-white"
            >
              The biggest health crisis nobody is watching.
            </h2>
          </div>

          <div>
            <div className="text-[120px] sm:text-[160px] md:text-[200px] leading-[0.85] font-extrabold tracking-[-0.05em] brand-text-gradient">
              {HEADLINE_STAT.big}
            </div>
            <div className="mt-6 max-w-sm text-[18px] sm:text-[20px] text-white/85 font-medium">
              {HEADLINE_STAT.label}.
            </div>
            <div className="mt-3 text-[12px] text-white/40">
              {HEADLINE_STAT.source}
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-12 sm:grid-cols-2 sm:gap-16 border-t border-white/[0.08] pt-12">
          {SUPPORTING.map((s) => (
            <div key={s.big}>
              <div className="text-[56px] sm:text-[72px] leading-none font-extrabold tracking-[-0.03em] text-white">
                {s.big}
              </div>
              <div className="mt-4 text-[17px] text-white/75">{s.label}</div>
              <div className="mt-2 text-[12px] text-white/40">{s.source}</div>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
