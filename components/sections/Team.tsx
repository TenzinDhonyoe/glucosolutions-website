"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MotionSection } from "@/components/MotionSection";

const TEAM = [
  { name: "Justin Allen", role: "Co-founder & CEO", initials: "JA" },
  { name: "Tenzin Dhonyoe", role: "Co-founder & CTO", initials: "TD" },
  { name: "Gleb Levashov", role: "Founding Engineer", initials: "GL" },
  { name: "Omar Ali-Yare", role: "Founding Engineer", initials: "OA" },
  { name: "Raphael Mancini", role: "Founding Engineer", initials: "RM" },
];

const BACKED_BY = [
  "DMZ Basecamp",
  "Norman Esch Award",
  "Hult Prize · National Finalist 2026",
];

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="relative h-[120px] w-[120px] transition-transform duration-500 ease-out group-hover:scale-[1.06]">
      {/* Outer rotating ring with brand gradient */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full p-px brand-gradient opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      >
        <div className="h-full w-full rounded-full bg-ink-1" />
      </div>
      {/* Brand-LED halo that intensifies on hover */}
      <div
        aria-hidden
        className="absolute -inset-2 rounded-full opacity-0 blur-[18px] transition-opacity duration-500 group-hover:opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(61,219,126,0.45), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[28px] font-bold tracking-tight text-white/90 transition-colors duration-500 group-hover:text-white">
          {initials}
        </span>
      </div>
    </div>
  );
}

export function Team() {
  const reduce = useReducedMotion();

  return (
    <MotionSection
      id="team"
      ariaLabelledBy="team-title"
      className="bg-ink-1 text-white border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-28 md:py-36">
        <div className="max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Team
          </div>
          <h2
            id="team-title"
            className="mt-5 text-[40px] sm:text-[52px] md:text-[64px] leading-[1.02] font-extrabold tracking-[-0.035em] text-white text-balance"
          >
            Founders building from the silicon up.
          </h2>
        </div>

        <ul className="mt-20 grid gap-y-12 gap-x-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {TEAM.map((person, i) => (
            <motion.li
              key={person.name}
              className="group flex flex-col items-center text-center cursor-default"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.55,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Avatar initials={person.initials} />
              <div className="mt-5 text-[15px] font-bold tracking-tight text-white">
                {person.name}
              </div>
              <div className="mt-1 text-[12px] uppercase tracking-[0.12em] text-white/45 transition-colors duration-500 group-hover:text-brand-led/80">
                {person.role}
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-24 border-t border-white/[0.08] pt-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
            Backed by
          </div>
          <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
            {BACKED_BY.map((b) => (
              <li
                key={b}
                className="text-[15px] sm:text-[16px] font-medium tracking-tight text-white/70 transition-colors hover:text-white"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MotionSection>
  );
}
