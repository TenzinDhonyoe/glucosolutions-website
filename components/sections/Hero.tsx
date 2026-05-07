"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { track } from "@/lib/analytics";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.5]);
  const bodyY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const bodyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);

  const stagger = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            delay: 0.18 + i * 0.08,
            ease: [0.2, 0.6, 0.2, 1] as const,
          },
        };

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-headline"
      className="relative min-h-[100svh] overflow-hidden text-paper flex flex-col"
    >
      {/* Full-bleed runner photo at golden hour */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className={reduce ? "absolute inset-0" : "absolute inset-0 ambient-zoom"}>
          <Image
            src="/photos/runner.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover cine-grade"
            style={{ objectPosition: "50% 40%" }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "rgba(28,28,28,0.42)" }}
        />
        {/* Soft left-to-right gradient — keeps type legible on the left,
            lets the runner photo breathe on the right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(15,15,14,0.45) 0%, rgba(15,15,14,0.15) 45%, rgba(15,15,14,0) 70%)",
          }}
        />
        <div className="vignette" />
        {/* Soft fade into the paper bg of the next section */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-14 sm:h-20"
          style={{
            background:
              "linear-gradient(180deg, rgba(246,241,230,0) 0%, rgba(246,241,230,0.04) 22%, rgba(246,241,230,0.16) 42%, rgba(246,241,230,0.42) 62%, rgba(246,241,230,0.78) 82%, rgba(246,241,230,1) 100%)",
          }}
        />
      </div>

      {/* Edge furniture */}
      <div
        aria-hidden
        className="hidden lg:flex absolute left-3 inset-y-0 z-10 flex-col justify-between py-10 caption text-paper/55"
      >
        <span className="tabular-nums">01</span>
        <span
          className="tabular-nums tracking-[0.32em] uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Gluco Solutions
        </span>
        <span aria-hidden />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-5 sm:px-8 pt-28 sm:pt-36 pb-20 sm:pb-28 flex-1 flex flex-col justify-center">
        {/* All hero content stacks on the left — right side stays empty
            so the runner photo carries the visual weight */}
        <div className="max-w-3xl">
          <motion.h1
            {...stagger(1)}
            id="hero-headline"
            style={reduce ? undefined : { y: titleY, opacity: titleOpacity }}
            className="display-serif text-balance text-[36px] sm:text-[52px] md:text-[64px] lg:text-[68px] xl:text-[76px] leading-[1.02] sm:leading-[1] tracking-[-0.02em] text-paper"
          >
            Catch{" "}
            <span className="display-serif-italic text-sage">
              prediabetes
            </span>
            <br className="hidden lg:block" /> before it catches you.
          </motion.h1>

          <motion.div
            style={reduce ? undefined : { y: bodyY, opacity: bodyOpacity }}
            className="mt-6 max-w-[560px]"
          >
            <p className="text-[15px] sm:text-[16px] leading-[1.55] text-paper/85">
              Whether you were just diagnosed or want to stay ahead of it,
              we pair a wellness wearable and AI coaching with a registered
              dietitian. Built for adults with prediabetes.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-4">
              <Link
                href="#waitlist"
                onClick={() =>
                  track("cta_click", { location: "hero-primary" })
                }
                className="shine group inline-flex items-center justify-center gap-2.5 rounded-full bg-sage px-6 sm:px-7 py-3.5 text-[15px] font-medium text-paper hover:bg-sage-2 transition-colors duration-220"
              >
                Join the waitlist
                <ArrowRight
                  size={17}
                  className="transition-transform duration-220 ease-out group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="#science"
                onClick={() =>
                  track("cta_click", { location: "hero-secondary" })
                }
                className="group inline-flex items-center gap-2 text-[15px] font-medium text-paper hover:text-seafoam transition-colors duration-220 border-b border-paper/30 hover:border-seafoam pb-[3px]"
              >
                See the science
                <ArrowRight
                  size={15}
                  className="opacity-80 transition-transform duration-220 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
