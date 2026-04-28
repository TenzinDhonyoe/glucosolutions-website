"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { track } from "@/lib/analytics";
import { CinematicBackground } from "@/components/interactive/CinematicBackground";
import { TrendPill } from "@/components/product/TrendPill";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const deviceY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const deviceScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const deviceRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const deviceOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.55]);

  const bodyY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const bodyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);

  const floorGlowOpacity = useTransform(scrollYProgress, [0, 0.6], [0.7, 0.2]);
  const pipOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

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
      ref={sectionRef}
      aria-labelledby="hero-headline"
      className="relative overflow-hidden bg-ink-0 text-white min-h-[100svh] flex flex-col"
    >
      {/* Cinematic atmospheric background — golden-hour blurred-photo aesthetic */}
      <CinematicBackground variant="hero" />

      {/* Floor-glow under the device — soft "podium" reflection */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[5%] bottom-[8%] h-[280px] w-[760px] rounded-[50%]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(61,219,126,0.28), transparent 70%)",
          filter: "blur(60px)",
          opacity: reduce ? 0.5 : floorGlowOpacity,
        }}
      />

      {/* Inner container fills available height and centres content
          vertically. This guarantees the entire hero fits within one
          viewport at any height (720, 800, 900, 1080, etc.) while keeping
          generous breathing room. */}
      <div className="relative mx-auto max-w-7xl w-full px-5 sm:px-8 pt-24 sm:pt-28 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 flex-1 flex flex-col justify-center">
        <div className="grid gap-8 md:gap-10 lg:gap-12 lg:grid-cols-[0.9fr_1.3fr] lg:items-center">
          <div className="relative z-10">
            <motion.h1
              {...stagger(1)}
              id="hero-headline"
              style={reduce ? undefined : { y: titleY, opacity: titleOpacity }}
              className="text-[42px] sm:text-[52px] md:text-[60px] lg:text-[60px] xl:text-[72px] leading-[1.02] font-extrabold tracking-[-0.04em] text-balance"
            >
              Know your
              <br />
              glucose trends.
              <span className="display-serif font-normal text-white/85 block mt-3 sm:mt-4 text-[30px] sm:text-[40px] md:text-[46px] lg:text-[50px] xl:text-[60px] leading-[1.05] tracking-[-0.015em]">
                No needles, no hassle.
              </span>
            </motion.h1>

            <motion.div
              style={reduce ? undefined : { y: bodyY, opacity: bodyOpacity }}
            >
              <motion.p
                {...stagger(2)}
                className="mt-4 sm:mt-5 max-w-[460px] text-[16px] sm:text-[17px] md:text-[19px] leading-[1.5] text-white/60"
              >
                A wearable and AI coach that learns how food moves your
                glucose, so you can eat with confidence.
              </motion.p>

              <motion.div
                {...stagger(3)}
                className="mt-8 sm:mt-9 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
              >
                <Link
                  href="#waitlist"
                  onClick={() =>
                    track("cta_click", { location: "hero-primary" })
                  }
                  className="shine group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-ink-0 hover:bg-white transition-colors"
                >
                  Join the waitlist
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-500 ease-out group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="#science"
                  onClick={() =>
                    track("cta_click", { location: "hero-secondary" })
                  }
                  className="group inline-flex items-center justify-center gap-2 px-2 py-3 text-[14px] font-medium text-white/65 hover:text-white transition-colors"
                >
                  See the science
                  <ArrowRight
                    size={13}
                    className="opacity-60 transition-transform duration-500 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </Link>
              </motion.div>

              <motion.p
                {...stagger(4)}
                className="mt-6 text-[11px] text-white/30 max-w-md leading-relaxed"
              >
                Wellness device. Not a substitute for medical-grade glucose
                measurement.
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            {...stagger(2)}
            className="relative mx-auto w-full lg:max-w-none lg:-mr-16 xl:-mr-28 aspect-[4/3]"
            style={{
              y: deviceY,
              scale: deviceScale,
              rotate: deviceRotate,
              opacity: deviceOpacity,
              perspective: 1600,
            }}
          >
            {/* LED-position bloom — back-lights the device's LED display */}
            <div
              aria-hidden
              className="ambient-breathe pointer-events-none absolute left-[26%] top-[28%] h-[40%] w-[40%] rounded-full blur-[70px]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(61,219,126,0.65), rgba(45,190,108,0.22) 50%, transparent 80%)",
              }}
            />

            <motion.img
              src="/product/wearable.svg"
              alt="GlucoSolutions wearable: a slim black band with embedded LED indicators"
              className="absolute inset-0 w-full h-full object-contain select-none"
              style={{
                filter:
                  "drop-shadow(0 60px 100px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 80px rgba(45, 190, 108, 0.14))",
                willChange: "transform",
              }}
              draggable={false}
              animate={
                reduce
                  ? undefined
                  : {
                      y: [0, -8, 0],
                    }
              }
              transition={{
                y: {
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                },
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* PIP "Live trend" card — anchored to the section bottom-right inside
          the safe-zone padding. */}
      <motion.div
        className="hidden md:block absolute right-5 sm:right-8 lg:right-10 bottom-12 lg:bottom-14 w-[230px] rounded-2xl border border-white/[0.08] bg-ink-1/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)] z-20"
        style={reduce ? undefined : { opacity: pipOpacity }}
        initial={reduce ? undefined : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.65,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
      >
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
          Live trend
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <TrendPill />
        </div>
        <div className="mt-2 text-[12px] text-white/55 leading-snug">
          Reads rising, stable, or falling at a glance.
        </div>
      </motion.div>

      {/* Brand-rule divider sits at the very bottom of the hero */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="brand-rule" />
        </div>
      </div>
    </section>
  );
}
