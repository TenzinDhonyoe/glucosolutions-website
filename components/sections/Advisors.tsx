"use client";

import { motion, useReducedMotion } from "framer-motion";
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
    <div className="relative h-[112px] w-[112px] transition-transform duration-500 ease-out group-hover:scale-[1.06]">
      <div
        aria-hidden
        className="absolute inset-0 rounded-full p-px brand-gradient opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      >
        <div className="h-full w-full rounded-full bg-ink-1" />
      </div>
      <div
        aria-hidden
        className="absolute -inset-2 rounded-full opacity-0 blur-[16px] transition-opacity duration-500 group-hover:opacity-45"
        style={{
          background:
            "radial-gradient(closest-side, rgba(61,219,126,0.4), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[24px] font-bold tracking-tight text-white/85 transition-colors duration-500 group-hover:text-white">
          {initials}
        </span>
      </div>
    </div>
  );
}

export function Advisors() {
  const reduce = useReducedMotion();

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
            className="mt-5 text-[40px] sm:text-[52px] md:text-[64px] leading-[1.02] font-extrabold tracking-[-0.035em] text-white text-balance"
          >
            Clinically grounded.
          </h2>
        </div>

        <ul className="mt-20 grid gap-y-14 gap-x-10 sm:grid-cols-2 md:grid-cols-3">
          {ADVISORS.map((a, i) => (
            <motion.li
              key={a.name}
              className="group flex flex-col items-center text-center cursor-default"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <AdvisorAvatar initials={a.initials} />
              <div className="mt-5 text-[17px] font-bold tracking-tight text-white">
                {a.name}
              </div>
              <div className="mt-2 max-w-[260px] text-[13px] leading-relaxed text-white/55 transition-colors duration-500 group-hover:text-white/75">
                {a.credentials}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
