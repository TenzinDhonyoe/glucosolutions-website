"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CounterStat } from "@/components/interactive/CounterStat";
import { GlucoseChart } from "@/components/product/GlucoseChart";

export function Science() {
  const reduce = useReducedMotion();

  return (
    <section
      id="science"
      aria-labelledby="science-title"
      className="relative bg-ink-0 text-white border-t border-white/[0.06]"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-28 md:py-36">
        {/* Heading row */}
        <div className="grid gap-8 md:gap-12 md:grid-cols-[1.1fr_1fr] md:items-end">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              How it works inside
            </div>
            <h2
              id="science-title"
              className="mt-5 text-[40px] sm:text-[52px] md:text-[64px] leading-[1.02] font-extrabold tracking-[-0.035em] text-white text-balance"
            >
              See your day, before it happens.
            </h2>
          </div>
          <p className="md:pb-3 max-w-xl text-[16px] sm:text-[17px] leading-[1.6] text-white/60">
            The wearable reads how your body is responding in real time.
            You learn what spikes you, what calms you, and how to eat
            with confidence.
          </p>
        </div>

        {/* Live chart card — full width */}
        <motion.div
          className="mt-14 rounded-2xl border border-white/[0.06] bg-ink-1 p-6 sm:p-8"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-led/80">
                A typical day
              </div>
              <div className="mt-1 text-[13px] text-white/55">
                Three meals. Three trends. One clear story.
              </div>
            </div>
            <span className="hidden sm:flex items-center gap-2 text-[12px] text-white/50">
              <span className="block h-2 w-2 rounded-full bg-brand-led/40" />
              healthy range
            </span>
          </div>
          <GlucoseChart />
        </motion.div>

        {/* Two cards in a clean grid — stagger reveal on scroll */}
        <div className="mt-12 grid gap-6 md:gap-8 md:grid-cols-2">
          <motion.article
            className="rounded-2xl border border-white/[0.06] bg-ink-1 p-7 sm:p-9 lift hover:bg-ink-2"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-led/80">
              The wearable
            </div>
            <h3 className="mt-4 text-[24px] sm:text-[26px] font-bold tracking-tight text-white">
              Reads through your skin.
            </h3>
            <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.7] text-white/65">
              A safe, low-power light shines into your skin and reads how
              glucose is moving in your body. No needles. No patches. No
              consumables.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-white/40">
              <span>· Non-invasive</span>
              <span>· Charge once a week</span>
              <span>· Wear daily</span>
            </div>
          </motion.article>

          <motion.article
            className="rounded-2xl border border-white/[0.06] bg-ink-1 p-7 sm:p-9 lift hover:bg-ink-2"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-led/80">
              The AI coach
            </div>
            <h3 className="mt-4 text-[24px] sm:text-[26px] font-bold tracking-tight text-white">
              Learns YOUR body.
            </h3>
            <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.7] text-white/65">
              Instead of one-size-fits-all rules, the app learns how
              food, sleep, and stress affect <em>you</em>. It nudges you
              in plain language: eat this, walk now, sleep earlier.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-white/40">
              <span>· Personalized</span>
              <span>· In plain English</span>
              <span>· No charts to read</span>
            </div>
          </motion.article>
        </div>

        {/* Stat strip */}
        <div className="mt-16 border-t border-white/[0.08] pt-10 flex flex-wrap items-baseline gap-x-12 gap-y-6">
          <div className="flex items-baseline gap-3">
            <span className="text-[28px] sm:text-[36px] font-extrabold tracking-[-0.03em] brand-text-gradient tabular-nums">
              <CounterStat to={0} suffix="" duration={1100} />
            </span>
            <span className="text-[14px] text-white/55">needles</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-[28px] sm:text-[36px] font-extrabold tracking-[-0.03em] brand-text-gradient tabular-nums">
              <CounterStat to={24} suffix="/7" duration={1100} />
            </span>
            <span className="text-[14px] text-white/55">awareness</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-[28px] sm:text-[36px] font-extrabold tracking-[-0.03em] brand-text-gradient tabular-nums">
              <CounterStat to={80} prefix="~" suffix="%" duration={1500} />
            </span>
            <span className="text-[14px] text-white/55">
              trend accuracy in lab testing
            </span>
          </div>
        </div>

        <p className="mt-10 text-[12px] italic text-white/35 max-w-2xl">
          Wellness device. Not a substitute for medical-grade glucose
          measurement.
        </p>
      </div>
    </section>
  );
}
