"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { CounterStat } from "@/components/interactive/CounterStat";
import { GlucoseChart } from "@/components/product/GlucoseChart";

export function Science() {
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Progress from 0 (scroller top hits viewport top) to 1 (scroller bottom
  // hits viewport bottom). Manual scroll listener — sidesteps any quirks
  // with useScroll's measurement of sticky children.
  const progress = useMotionValue(0);

  useEffect(() => {
    function update() {
      const el = scrollerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const range = rect.height - vh;
      if (range <= 0) {
        progress.set(0);
        return;
      }
      // rect.top: 0 = scroller top at viewport top, negative once scrolled past
      const p = Math.max(0, Math.min(1, -rect.top / range));
      progress.set(p);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress]);

  // Chart progress — finishes drawing by 70% scroll
  const chartProgress = useTransform(progress, [0.05, 0.7], [0, 1]);

  // Cards crossfade in the SAME on-screen position
  const card1Opacity = useTransform(
    progress,
    [0, 0.05, 0.4, 0.55],
    [1, 1, 1, 0]
  );
  const card2Opacity = useTransform(progress, [0.4, 0.55], [0, 1]);
  const card1Y = useTransform(progress, [0.4, 0.55], [0, -10]);
  const card2Y = useTransform(progress, [0.4, 0.55], [10, 0]);

  // Step dot indicators
  const step1Opacity = useTransform(progress, [0.4, 0.55], [1, 0.3]);
  const step2Opacity = useTransform(progress, [0.4, 0.55], [0.3, 1]);
  const step1Width = useTransform(progress, [0.4, 0.55], [40, 16]);
  const step2Width = useTransform(progress, [0.4, 0.55], [16, 40]);

  return (
    <section
      id="science"
      aria-labelledby="science-title"
      className="relative bg-ink-0 text-white border-t border-white/[0.06]"
    >
      {/* DESKTOP scroll story — pinned scroll with crossfading cards */}
      <div
        ref={scrollerRef}
        className="hidden lg:block relative"
        style={{ height: "220vh" }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="mx-auto max-w-7xl w-full px-5 sm:px-8">
            <div className="grid grid-cols-[1.05fr_1fr] gap-12 xl:gap-16 items-center">
              {/* Left: heading + chart */}
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                  How it works inside
                </div>
                <h2
                  id="science-title"
                  className="mt-4 text-[44px] xl:text-[56px] leading-[1.02] font-extrabold tracking-[-0.035em] text-white text-balance"
                >
                  See your day, before it happens.
                </h2>
                <p className="mt-4 max-w-md text-[16px] leading-[1.6] text-white/60">
                  The wearable reads how your body is responding in real
                  time. You learn what spikes you, what calms you.
                </p>

                <div className="mt-6 rounded-2xl border border-white/[0.06] bg-ink-1 p-5">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-led/80">
                        A typical day
                      </div>
                      <div className="mt-1 text-[12px] text-white/55">
                        Three meals, three trends
                      </div>
                    </div>
                    <span className="hidden xl:flex items-center gap-1.5 text-[11px] text-white/45">
                      <span className="block h-1.5 w-1.5 rounded-full bg-brand-led/40" />
                      healthy range
                    </span>
                  </div>
                  <GlucoseChart
                    scrollProgress={reduce ? undefined : chartProgress}
                  />
                </div>
              </div>

              {/* Right: cards stacked, crossfade */}
              <div className="relative h-[400px] xl:h-[420px]">
                <motion.article
                  className="absolute inset-0 rounded-2xl border border-white/[0.06] bg-ink-1 p-8 xl:p-9 flex flex-col justify-center"
                  style={
                    reduce
                      ? undefined
                      : { opacity: card1Opacity, y: card1Y }
                  }
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-led/80">
                    The wearable
                  </div>
                  <h3 className="mt-3 text-[28px] xl:text-[32px] font-bold tracking-tight text-white">
                    Reads through your skin.
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.65] text-white/65">
                    A safe, low-power light shines into your skin and
                    reads how glucose is moving in your body. No needles.
                    No patches. No consumables.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-white/40">
                    <span>· Non-invasive</span>
                    <span>· Charge once a week</span>
                    <span>· Wear daily</span>
                  </div>
                </motion.article>

                <motion.article
                  className="absolute inset-0 rounded-2xl border border-white/[0.06] bg-ink-1 p-8 xl:p-9 flex flex-col justify-center"
                  style={
                    reduce
                      ? undefined
                      : { opacity: card2Opacity, y: card2Y }
                  }
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-led/80">
                    The AI coach
                  </div>
                  <h3 className="mt-3 text-[28px] xl:text-[32px] font-bold tracking-tight text-white">
                    Learns YOUR body.
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.65] text-white/65">
                    Instead of one-size-fits-all rules, the app learns
                    how food, sleep, and stress affect <em>you</em>. It
                    nudges you in plain language: eat this, walk now,
                    sleep earlier.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-white/40">
                    <span>· Personalized</span>
                    <span>· In plain English</span>
                    <span>· No charts to read</span>
                  </div>
                </motion.article>

                {/* Step indicator dots */}
                <div className="absolute -bottom-9 left-0 flex items-center gap-2">
                  <motion.div
                    className="h-1.5 rounded-full bg-white"
                    style={
                      reduce
                        ? { opacity: 1, width: 40 }
                        : { opacity: step1Opacity, width: step1Width }
                    }
                  />
                  <motion.div
                    className="h-1.5 rounded-full bg-white"
                    style={
                      reduce
                        ? { opacity: 0.3, width: 16 }
                        : { opacity: step2Opacity, width: step2Width }
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET — plain stack, no scroll story */}
      <div className="lg:hidden mx-auto max-w-7xl px-5 sm:px-8 py-24 md:py-28">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
          How it works inside
        </div>
        <h2 className="mt-4 text-[36px] sm:text-[44px] leading-[1.02] font-extrabold tracking-[-0.035em] text-white text-balance">
          See your day, before it happens.
        </h2>
        <p className="mt-4 max-w-md text-[15px] sm:text-[16px] leading-[1.6] text-white/60">
          The wearable reads how your body is responding in real time.
          You learn what spikes you, what calms you.
        </p>

        <div className="mt-8 rounded-2xl border border-white/[0.06] bg-ink-1 p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-led/80">
                A typical day
              </div>
              <div className="mt-1 text-[12px] text-white/55">
                Three meals, three trends
              </div>
            </div>
          </div>
          <GlucoseChart />
        </div>

        <div className="mt-8 grid gap-6">
          <article className="rounded-2xl border border-white/[0.06] bg-ink-1 p-7">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-led/80">
              The wearable
            </div>
            <h3 className="mt-3 text-[24px] font-bold tracking-tight text-white">
              Reads through your skin.
            </h3>
            <p className="mt-3 text-[15px] leading-[1.65] text-white/65">
              A safe, low-power light shines into your skin and reads how
              glucose is moving in your body. No needles. No patches. No
              consumables.
            </p>
          </article>

          <article className="rounded-2xl border border-white/[0.06] bg-ink-1 p-7">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-led/80">
              The AI coach
            </div>
            <h3 className="mt-3 text-[24px] font-bold tracking-tight text-white">
              Learns YOUR body.
            </h3>
            <p className="mt-3 text-[15px] leading-[1.65] text-white/65">
              Instead of one-size-fits-all rules, the app learns how food,
              sleep, and stress affect <em>you</em>. It nudges you in
              plain language: eat this, walk now, sleep earlier.
            </p>
          </article>
        </div>
      </div>

      {/* Stat strip */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pb-24 md:pb-32">
        <div className="border-t border-white/[0.08] pt-10 flex flex-wrap items-baseline gap-x-12 gap-y-6">
          <div className="flex items-baseline gap-3">
            <span className="text-[28px] sm:text-[36px] font-extrabold tracking-[-0.03em] brand-text-gradient tabular-nums">
              <CounterStat to={0} duration={1100} />
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
