"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MotionSection } from "@/components/MotionSection";
import { TrendPill } from "@/components/product/TrendPill";

type Step = {
  n: string;
  title: string;
  body: string;
  extra?: React.ReactNode;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Wear",
    body: "Slip on the slim band in the morning. Forget it's there. Charge once a week.",
  },
  {
    n: "02",
    title: "Sense",
    body: "It reads how your blood sugar is moving in real time. No needles, no skin patches.",
    extra: <TrendPill />,
  },
  {
    n: "03",
    title: "Coach",
    body: "The app tells you what to eat, when to walk, when to sleep. In plain English.",
  },
];

export function HowItWorks() {
  const reduce = useReducedMotion();

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
            className="mt-5 text-[40px] sm:text-[52px] md:text-[64px] leading-[1.02] font-extrabold tracking-[-0.035em] text-white text-balance"
          >
            Three steps. No needles.
          </h2>
        </div>

        <ol className="mt-20 relative grid gap-y-14 gap-x-12 md:grid-cols-3">
          {/* Hairline that draws across the steps as the section enters view */}
          <motion.div
            aria-hidden
            className="absolute hidden md:block left-[8%] right-[8%] top-[40px] h-px bg-gradient-to-r from-transparent via-brand-led/40 to-transparent origin-left"
            initial={reduce ? false : { scaleX: 0, opacity: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
          {STEPS.map((step, i) => (
            <motion.li
              key={step.n}
              className="relative group"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.7,
                delay: 0.4 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="block text-[68px] sm:text-[80px] leading-none font-extrabold tracking-[-0.04em] brand-text-gradient transition-all duration-500 group-hover:scale-[1.04] origin-left">
                {step.n}
              </span>
              <h3 className="mt-7 text-[26px] sm:text-[30px] font-bold tracking-[-0.02em] text-white">
                {step.title}
              </h3>
              <p className="mt-3 max-w-sm text-[16px] leading-[1.6] text-white/60">
                {step.body}
              </p>
              {step.extra && <div className="mt-4">{step.extra}</div>}
            </motion.li>
          ))}
        </ol>
      </div>
    </MotionSection>
  );
}
