"use client";

import Link from "next/link";
import Image from "next/image";
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
      {/* Single restrained ambient glow — anchors the device, no decorative scatter. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-15%] top-[18%] h-[680px] w-[680px] rounded-full opacity-50 blur-[140px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(45,190,108,0.32), rgba(19,139,146,0.18) 38%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-32 sm:pt-36 md:pt-44 pb-20 md:pb-28">
        <div className="grid gap-14 md:gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-center">
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
            className="relative mx-auto w-full max-w-[640px] lg:max-w-none"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/product/wearable.png"
                alt="GlucoSolutions wearable: a slim black band with embedded LED indicators"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 90vw"
                className="object-contain object-center drop-shadow-[0_40px_80px_rgba(0,0,0,0.65)]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee/divider — fades into the next section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="brand-rule" />
        </div>
      </div>
    </section>
  );
}
