import { MotionSection } from "@/components/MotionSection";

const ADVISORS = [
  {
    name: "Dr. Dansinger",
    credentials: "Endocrinology · Tufts University School of Medicine",
    initials: "MD",
  },
  {
    name: "Dr. Coe",
    credentials: "Internal medicine · Metabolic health research",
    initials: "DC",
  },
  {
    name: "Dr. Brauer",
    credentials: "Clinical research · Wearable validation",
    initials: "AB",
  },
];

function AdvisorAvatar({ initials }: { initials: string }) {
  return (
    <div className="relative h-[112px] w-[112px]">
      <div
        aria-hidden
        className="absolute inset-0 rounded-full p-px brand-gradient opacity-80"
      >
        <div className="h-full w-full rounded-full bg-ink-1" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[24px] font-bold tracking-tight text-white/85">
          {initials}
        </span>
      </div>
    </div>
  );
}

export function Advisors() {
  return (
    <MotionSection
      id="advisors"
      ariaLabelledBy="advisors-title"
      className="bg-ink-0 text-white border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-28 md:py-36">
        <div className="max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Advisors
          </div>
          <h2
            id="advisors-title"
            className="mt-5 text-[40px] sm:text-[52px] md:text-[64px] leading-[1.02] font-extrabold tracking-[-0.035em] text-white"
          >
            Clinically grounded.
          </h2>
        </div>

        <ul className="mt-20 grid gap-y-14 gap-x-10 sm:grid-cols-2 md:grid-cols-3">
          {ADVISORS.map((a) => (
            <li
              key={a.name}
              className="flex flex-col items-center text-center"
            >
              <AdvisorAvatar initials={a.initials} />
              <div className="mt-5 text-[17px] font-bold tracking-tight text-white">
                {a.name}
              </div>
              <div className="mt-2 max-w-[260px] text-[13px] leading-relaxed text-white/55">
                {a.credentials}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
