"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const reduce = useReducedMotion();

  return (
    <MotionSection
      id="solution"
      ariaLabelledBy="solution-title"
      className="relative bg-ink-0 text-white border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-28 md:py-36">
        <div className="grid gap-10 md:gap-16 md:grid-cols-[1.1fr_1fr] md:items-end">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              The solution
            </div>
            <h2
              id="solution-title"
              className="mt-5 text-[44px] sm:text-[56px] md:text-[68px] leading-[1.02] font-extrabold tracking-[-0.035em] text-white text-balance"
            >
              Trends, not pricks.
            </h2>
          </div>
          <p className="md:pb-4 max-w-xl text-[17px] sm:text-[18px] leading-[1.6] text-white/60">
            Glycemic trend awareness designed to fit a real life. At your desk,
            at the dinner table, on the trail.
          </p>
        </div>

        <ul className="mt-20 grid gap-x-12 gap-y-14 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.li
              key={f.title}
              className="relative group cursor-default"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Hairline that draws on hover beneath the label row */}
              <div className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                <span className="text-brand-led/80 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{f.label}</span>
              </div>
              <div className="mt-2 h-px w-full bg-white/[0.06] relative overflow-hidden">
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-0 brand-gradient transition-[width] duration-700 ease-out group-hover:w-full"
                />
              </div>
              <h3 className="mt-5 text-[24px] sm:text-[26px] font-bold tracking-[-0.02em] text-white transition-colors duration-500 group-hover:brand-text-gradient">
                {f.title}
              </h3>
              <p className="mt-3 text-[16px] leading-[1.6] text-white/60 transition-colors duration-500 group-hover:text-white/75">
                {f.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
