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

  // The whole section becomes a scroll story. We track scroll progress from
  // when the section's top hits the viewport top to when its bottom leaves.
  // Scrolling through the section drives the chart's draw + cursor scrub.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // The chart's progress only fills 0..0.7 of the section so the cursor
  // arrives at the right edge before the user reaches the bottom — leaves
  // breathing room for the stat strip to land.
  const chartProgress = useTransform(scrollYProgress, [0.05, 0.7], [0, 1]);

  // Cards reveal at distinct scroll thresholds.
  const card1Y = useTransform(scrollYProgress, [0.15, 0.32], [40, 0]);
  const card1Opacity = useTransform(scrollYProgress, [0.15, 0.32], [0, 1]);
  const card2Y = useTransform(scrollYProgress, [0.42, 0.58], [40, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.42, 0.58], [0, 1]);

  // The trend-label cycle (rising / stable / falling) flips based on local
  // slope of the curve at the cursor's position. We approximate this from
  // scrollYProgress: ~0.05-0.30 = rising, 0.30-0.55 = mixed, 0.55-0.85 = both.
  // For simplicity, just toggle a label string.
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
          {/* Left column — STICKY: heading + chart pin to viewport.
              The user scrolls past the right column while this stays put. */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] flex flex-col justify-center py-20 lg:py-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              The science
            </div>
            <h2
              id="science-title"
              className="mt-5 text-[40px] sm:text-[52px] md:text-[64px] leading-[1.02] font-extrabold tracking-[-0.035em] text-white text-balance"
            >
              Built on real signal.
            </h2>
            <p className="mt-5 max-w-md text-[16px] sm:text-[17px] leading-[1.6] text-white/60">
              Years of optics, electronics, and ML research distilled into a
              wearable form factor.
            </p>

            {/* Chart pinned with scroll-bound progress */}
            <div className="mt-8 rounded-2xl border border-white/[0.06] bg-ink-1 p-5 sm:p-6">
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-led/80">
                    Illustrative trend
                  </div>
                  <motion.div
                    className="mt-1 text-[13px] text-white/55"
                    style={{ opacity: trendLabelOpacity }}
                  >
                    What the wearable sees over a typical day
                  </motion.div>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-[11px] text-white/45">
                  <span className="flex items-center gap-1.5">
                    <span className="block h-1.5 w-1.5 rounded-full bg-brand-led/40" />
                    target band
                  </span>
                </div>
              </div>
              <GlucoseChart scrollProgress={reduce ? undefined : chartProgress} />
            </div>
          </div>

          {/* Right column — scrolling cards. This column is taller than 1
              viewport so the section becomes a scroll story. */}
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
                Hardware
              </div>
              <h3 className="mt-4 text-[26px] sm:text-[28px] font-bold tracking-tight text-white">
                Multi-wavelength NIR optics
              </h3>
              <p className="mt-4 text-[16px] leading-[1.7] text-white/65">
                940&nbsp;nm primary and 1650&nbsp;nm secondary detection on a
                custom PCB targeting a ~$20 BOM. ESP32-S3 MCU.
                Benchtop-validated against reference glucose phantoms across
                nine concentrations.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/40">
                <span>· Custom PCB</span>
                <span>· ESP32-S3</span>
                <span>· 940&nbsp;nm + 1650&nbsp;nm</span>
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
                Machine learning
              </div>
              <h3 className="mt-4 text-[26px] sm:text-[28px] font-bold tracking-tight text-white">
                Ensemble + domain adaptation
              </h3>
              <p className="mt-4 text-[16px] leading-[1.7] text-white/65">
                Random Forest, XGBoost, and LightGBM classifiers under a
                meta-learner. CORAL domain adaptation for cross-subject
                generalization. ~80% trend classification accuracy in benchtop
                testing.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/40">
                <span>· Random Forest</span>
                <span>· XGBoost</span>
                <span>· LightGBM</span>
                <span>· CORAL</span>
              </div>
            </motion.article>
          </div>
        </div>
      </div>

      {/* Stat strip — full width below the pinned story */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pb-28 md:pb-36">
        <div className="border-t border-white/[0.08] pt-12 flex flex-wrap items-baseline gap-x-12 gap-y-6">
          <div className="flex items-baseline gap-3">
            <span className="text-[28px] sm:text-[36px] font-extrabold tracking-[-0.03em] brand-text-gradient tabular-nums">
              <CounterStat to={4} duration={1100} />
            </span>
            <span className="text-[14px] text-white/55">wavelengths</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-[28px] sm:text-[36px] font-extrabold tracking-[-0.03em] brand-text-gradient tabular-nums">
              <CounterStat to={9} duration={1100} />
            </span>
            <span className="text-[14px] text-white/55">
              glucose concentrations
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-[28px] sm:text-[36px] font-extrabold tracking-[-0.03em] brand-text-gradient tabular-nums">
              <CounterStat to={80} prefix="~" suffix="%" duration={1500} />
            </span>
            <span className="text-[14px] text-white/55">
              trend accuracy (benchtop)
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
