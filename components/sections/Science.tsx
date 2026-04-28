"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { CounterStat } from "@/components/interactive/CounterStat";
import { GlucoseChart } from "@/components/product/GlucoseChart";

export function Science() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const chartProgress = useTransform(scrollYProgress, [0.05, 0.7], [0, 1]);

  const card1Y = useTransform(scrollYProgress, [0.15, 0.32], [40, 0]);
  const card1Opacity = useTransform(scrollYProgress, [0.15, 0.32], [0, 1]);
  const card2Y = useTransform(scrollYProgress, [0.42, 0.58], [40, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.42, 0.58], [0, 1]);

  const trendLabelOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.1, 0.7, 0.8],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="science"
      aria-labelledby="science-title"
      className="relative bg-ink-0 text-white border-t border-white/[0.06]"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="lg:grid lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Left column — sticky heading + chart */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] flex flex-col justify-center py-20 lg:py-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              How it works inside
            </div>
            <h2
              id="science-title"
              className="mt-5 text-[40px] sm:text-[52px] md:text-[64px] leading-[1.02] font-extrabold tracking-[-0.035em] text-white text-balance"
            >
              See your day, before it happens.
            </h2>
            <p className="mt-5 max-w-md text-[16px] sm:text-[17px] leading-[1.6] text-white/60">
              The wearable reads how your body is responding in real time.
              You learn what spikes you, what calms you, and how to eat
              with confidence.
            </p>

            {/* Chart pinned with scroll-bound progress */}
            <div className="mt-8 rounded-2xl border border-white/[0.06] bg-ink-1 p-5 sm:p-6">
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-led/80">
                    A typical day
                  </div>
                  <motion.div
                    className="mt-1 text-[13px] text-white/55"
                    style={{ opacity: trendLabelOpacity }}
                  >
                    Three meals, three trends, one clear story
                  </motion.div>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-[11px] text-white/45">
                  <span className="flex items-center gap-1.5">
                    <span className="block h-1.5 w-1.5 rounded-full bg-brand-led/40" />
                    healthy range
                  </span>
                </div>
              </div>
              <GlucoseChart scrollProgress={reduce ? undefined : chartProgress} />
            </div>
          </div>

          {/* Right column — scrolling cards */}
          <div className="py-32 lg:py-40 space-y-[60vh]">
            <motion.article
              className="rounded-2xl border border-white/[0.06] bg-ink-1 p-8 sm:p-10 lift hover:bg-ink-2"
              style={
                reduce
                  ? undefined
                  : { y: card1Y, opacity: card1Opacity }
              }
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-led/80">
                The wearable
              </div>
              <h3 className="mt-4 text-[26px] sm:text-[28px] font-bold tracking-tight text-white">
                Reads through your skin.
              </h3>
              <p className="mt-4 text-[16px] leading-[1.7] text-white/65">
                A safe, low-power light shines into your skin and reads how
                glucose is moving in your body. No needles. No patches. No
                consumables.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/40">
                <span>· Non-invasive</span>
                <span>· Charge once a week</span>
                <span>· Wear daily</span>
              </div>
            </motion.article>

            <motion.article
              className="rounded-2xl border border-white/[0.06] bg-ink-1 p-8 sm:p-10 lift hover:bg-ink-2"
              style={
                reduce
                  ? undefined
                  : { y: card2Y, opacity: card2Opacity }
              }
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-led/80">
                The AI coach
              </div>
              <h3 className="mt-4 text-[26px] sm:text-[28px] font-bold tracking-tight text-white">
                Learns YOUR body.
              </h3>
              <p className="mt-4 text-[16px] leading-[1.7] text-white/65">
                Instead of one-size-fits-all rules, the app learns how
                food, sleep, and stress affect <em>you</em>. It nudges you
                in plain language: eat this, walk now, sleep earlier.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/40">
                <span>· Personalized</span>
                <span>· In plain English</span>
                <span>· No charts to read</span>
              </div>
            </motion.article>
          </div>
        </div>
      </div>

      {/* Stat strip — customer-friendly numbers */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pb-28 md:pb-36">
        <div className="border-t border-white/[0.08] pt-12 flex flex-wrap items-baseline gap-x-12 gap-y-6">
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

        <p className="mt-12 text-[12px] italic text-white/35 max-w-2xl">
          Wellness device. Not a substitute for medical-grade glucose
          measurement.
        </p>
      </div>
    </section>
  );
}
