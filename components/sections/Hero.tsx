"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";

export function Hero() {
  const reduce = useReducedMotion();
  const stagger = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.8,
            delay: 0.15 + i * 0.08,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section
      id="hero"
      aria-labelledby="hero-headline"
      className="relative overflow-hidden bg-ink-0 text-white"
    >
      {/* Primary ambient glow — bigger and more saturated since the device is the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[10%] h-[820px] w-[820px] rounded-full opacity-55 blur-[160px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(45,190,108,0.36), rgba(19,139,146,0.18) 40%, transparent 72%)",
        }}
      />
      {/* Counter-glow on the lower left for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[560px] w-[560px] rounded-full opacity-40 blur-[140px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(14,92,126,0.45), rgba(0,0,0,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-32 sm:pt-36 md:pt-44 pb-20 md:pb-28">
        <div className="grid gap-14 md:gap-16 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <motion.div
              {...stagger(0)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-led opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-led" />
              </span>
              iOS beta · App Store review
            </motion.div>

            <motion.h1
              {...stagger(1)}
              id="hero-headline"
              className="mt-7 text-[44px] sm:text-[58px] md:text-[72px] lg:text-[84px] leading-[0.98] font-extrabold tracking-[-0.035em] text-balance"
            >
              Prediabetes is silent.
              <br />
              <span className="display-serif font-normal text-white/85">
                Until it isn&rsquo;t.
              </span>
            </motion.h1>

            <motion.p
              {...stagger(2)}
              className="mt-7 max-w-[520px] text-[17px] sm:text-[18px] leading-[1.55] text-white/60"
            >
              A non-invasive wearable and AI coach that help you eat with
              confidence and reverse glycemic trends, before they become
              disease.
            </motion.p>

            <motion.div
              {...stagger(3)}
              className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <Link
                href="#waitlist"
                onClick={() => track("cta_click", { location: "hero-primary" })}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-ink-0 hover:bg-white/90 transition-all"
              >
                Join the waitlist
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="#science"
                onClick={() =>
                  track("cta_click", { location: "hero-secondary" })
                }
                className="inline-flex items-center justify-center gap-2 px-2 py-3.5 text-[15px] font-medium text-white/70 hover:text-white transition-colors"
              >
                See the science
                <ArrowRight size={14} className="opacity-60" />
              </Link>
            </motion.div>

            <motion.p
              {...stagger(4)}
              className="mt-10 text-[12px] text-white/35 max-w-md leading-relaxed"
            >
              Wellness device. Not a substitute for medical-grade glucose
              measurement.
            </motion.p>
          </div>

          <motion.div
            {...stagger(2)}
            className="relative mx-auto w-full lg:max-w-none lg:-mr-8 xl:-mr-16"
          >
            {/* LED-position bloom — positioned to back-light the LED display */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-[28%] top-[34%] h-[180px] w-[260px] rounded-full opacity-60 blur-[60px]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(61,219,126,0.55), rgba(45,190,108,0.18) 50%, transparent 80%)",
              }}
            />

            <motion.img
              src="/product/wearable.svg"
              alt="GlucoSolutions wearable: a slim black band with embedded LED indicators"
              className="relative w-full h-auto select-none"
              style={{
                filter:
                  "drop-shadow(0 50px 90px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 60px rgba(45, 190, 108, 0.12))",
              }}
              draggable={false}
              animate={
                reduce
                  ? undefined
                  : {
                      y: [0, -10, 0],
                      rotate: [0, 0.4, 0],
                    }
              }
              transition={{
                duration: 7,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Hairline brand-gradient divider into the next section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="brand-rule" />
        </div>
      </div>
    </section>
  );
}
