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
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { TrendPill } from "@/components/product/TrendPill";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress through the hero. Each layer translates by a
  // different amount, creating real depth as the user scrolls past.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Device — moves the most (foreground), recedes as user scrolls past.
  const deviceY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const deviceScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const deviceRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const deviceOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  // Title — moves at a moderate rate (mid layer).
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.55]);

  // Body, CTAs, disclaimer — slower than title (creates depth contrast).
  const bodyY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const bodyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);

  // Badge — slowest of the text elements (deepest text layer).
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -10]);

  // Ambient glow — subtle vertical drift creates atmospheric parallax.
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const counterGlowX = useTransform(scrollYProgress, [0, 1], [0, 40]);
  // Floor-glow drifts subtly with scroll for the "showcase surface" feel.
  const floorGlowOpacity = useTransform(scrollYProgress, [0, 0.6], [0.7, 0.2]);

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
      className="relative overflow-hidden bg-ink-0 text-white"
    >
      {/* Layer 1: vertical gradient from pure ink at top to a slightly warmer,
          richer dark at the bottom. Creates depth and gives the device a
          "ground" to sit on, like Oura's beige gradient does for the ring. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #07090A 0%, #07090A 38%, #0A1115 78%, #0C1518 100%)",
        }}
      />

      {/* Layer 2: subtle film grain so flat dark areas have texture (Oura's
          gradient is photographed with lens grain, ours fakes it). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Layer 3: primary teal/green ambient glow behind the device,
          parallax-drifting */}
      <motion.div
        aria-hidden
        className="ambient-breathe pointer-events-none absolute right-[-12%] top-[8%] h-[940px] w-[940px] rounded-full blur-[180px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(45,190,108,0.42), rgba(19,139,146,0.22) 38%, transparent 72%)",
          y: reduce ? 0 : glowY,
        }}
      />

      {/* Layer 4: deep blue counter-glow on the lower left for atmospheric
          weight, drifts laterally with scroll */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-44 -left-44 h-[640px] w-[640px] rounded-full opacity-50 blur-[160px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(14,92,126,0.55), rgba(0,0,0,0) 70%)",
          x: reduce ? 0 : counterGlowX,
        }}
      />

      {/* Layer 5: floor-glow under the device (acts as a soft cast light /
          surface reflection) — sells the "product on a podium" feel. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[5%] bottom-[8%] h-[280px] w-[760px] rounded-[50%] blur-[80px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(61,219,126,0.22), transparent 70%)",
          opacity: reduce ? 0.5 : floorGlowOpacity,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-32 sm:pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="grid gap-12 md:gap-14 lg:grid-cols-[0.85fr_1.4fr] lg:items-center">
          <div className="relative z-10">
            <motion.div
              {...stagger(0)}
              style={reduce ? undefined : { y: badgeY }}
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
              style={reduce ? undefined : { y: titleY, opacity: titleOpacity }}
              className="mt-7 text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-[0.95] font-extrabold tracking-[-0.04em] text-balance"
            >
              Prediabetes
              <br />
              is silent.
              <br />
              <span className="display-serif font-normal text-white/85 text-[52px] sm:text-[68px] md:text-[84px] lg:text-[104px]">
                Until it isn&rsquo;t.
              </span>
            </motion.h1>

            <motion.div
              style={reduce ? undefined : { y: bodyY, opacity: bodyOpacity }}
            >
              <motion.p
                {...stagger(2)}
                className="mt-8 max-w-[460px] text-[16px] sm:text-[17px] leading-[1.55] text-white/55"
              >
                A non-invasive wearable and AI coach for glycemic trend
                awareness. Eat with confidence.
              </motion.p>

              <motion.div
                {...stagger(3)}
                className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
              >
                <MagneticButton
                  href="#waitlist"
                  onClick={() =>
                    track("cta_click", { location: "hero-primary" })
                  }
                  strength={10}
                  range={140}
                  className="shine group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-ink-0 hover:bg-white transition-colors"
                >
                  Join the waitlist
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-500 ease-out group-hover:translate-x-1"
                  />
                </MagneticButton>
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
                className="mt-10 text-[11px] text-white/30 max-w-md leading-relaxed"
              >
                Wellness device. Not a substitute for medical-grade glucose
                measurement.
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            {...stagger(2)}
            className="relative mx-auto w-full lg:max-w-none lg:-mr-16 xl:-mr-32"
            style={{
              y: deviceY,
              scale: deviceScale,
              rotate: deviceRotate,
              opacity: deviceOpacity,
              perspective: 1600,
            }}
          >
            {/* LED-position bloom — back-lights the device's LED display.
                Strengthened so the green LEDs feel emissive against the
                richer canvas. */}
            <div
              aria-hidden
              className="ambient-breathe pointer-events-none absolute left-[26%] top-[32%] h-[220px] w-[300px] rounded-full blur-[70px]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(61,219,126,0.65), rgba(45,190,108,0.22) 50%, transparent 80%)",
              }}
            />

            {/* Perpetual product-turntable motion. Slower and gentler than
                before — Oura's hero is calm. The device drifts like a
                premium display, not a spinning toy. */}
            <motion.img
              src="/product/wearable.svg"
              alt="GlucoSolutions wearable: a slim black band with embedded LED indicators"
              className="relative w-full h-auto select-none"
              style={{
                transformStyle: "preserve-3d",
                filter:
                  "drop-shadow(0 60px 100px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 80px rgba(45, 190, 108, 0.14))",
              }}
              draggable={false}
              animate={
                reduce
                  ? undefined
                  : {
                      y: [0, -8, 0, -4, 0],
                      rotateY: [-6, 6, -6],
                      rotateX: [-2, 2, -2],
                    }
              }
              transition={{
                y: {
                  duration: 9,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                },
                rotateY: {
                  duration: 22,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                },
                rotateX: {
                  duration: 17,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            />

            {/* Floating supplemental card — bottom-right of device area, like
                Oura's "Charging Case" PIP. Tiny, always-visible product
                reinforcement that fills negative space in the hero. */}
            <motion.div
              {...stagger(4)}
              className="hidden md:block absolute bottom-[3%] right-[4%] w-[230px] rounded-2xl border border-white/[0.08] bg-ink-1/85 backdrop-blur-md p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
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
          </motion.div>
        </div>
      </div>

      <div className="relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="brand-rule" />
        </div>
      </div>
    </section>
  );
}
