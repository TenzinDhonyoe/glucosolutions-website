"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MotionSection } from "@/components/MotionSection";
import { SectionLabel } from "@/components/interactive/SectionLabel";

type Slide = {
  image: string;
  alt: string;
  label: string;
  title: string;
  body: string;
};

const SLIDES: Slide[] = [
  {
    image: "/photos/solution/baseline.png",
    alt: "Hand holding a phone showing the metabolic-health onboarding screen",
    label: "Day one",
    title: "See what shapes your metabolic health.",
    body:
      "Start with a quick intake — medications, family history, sleep, activity. Every recommendation begins from your real baseline, not an average.",
  },
  {
    image: "/photos/solution/meal.png",
    alt: "Plate of eggs and tomatoes next to a phone showing meal review with macros and a metabolic score",
    label: "Meals",
    title: "Snap a meal. See the score.",
    body:
      "A photo is enough. Get an instant metabolic score, macro breakdown, and a one-line note on how this plate tends to move your glucose.",
  },
  {
    image: "/photos/solution/coach.png",
    alt: "A runner tying their shoes with floating activity, sleep, weight, and tip cards",
    label: "Coach",
    title: "Activity, sleep, and the next small move.",
    body:
      "Your wearable folds steps, sleep, and weight into one metabolic score, then surfaces one plain-English nudge — like a ten-minute post-meal walk.",
  },
];

const AUTOPLAY_MS = 1500;

export function Solution() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slide = SLIDES[index];
  const total = SLIDES.length;

  // Autoplay — only when the slideshow is on screen, not hovered/focused,
  // and the user hasn't requested reduced motion.
  useEffect(() => {
    if (reduce || paused) return;
    const node = containerRef.current;
    if (!node) return;

    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (timer) return;
      timer = setInterval(() => {
        setIndex((i) => (i + 1) % total);
      }, AUTOPLAY_MS);
    };
    const stop = () => {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.35 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [reduce, paused, total]);

  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <MotionSection
      id="solution"
      ariaLabelledBy="solution-title"
      className="relative bg-paper text-charcoal border-t border-stone"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-20">
        <SectionLabel index={3} label="The solution" />

        <div className="mt-6 md:mt-8 grid gap-4 md:gap-12 md:grid-cols-[1.1fr_1fr] md:items-end">
          <h2
            id="solution-title"
            className="display-serif text-[36px] sm:text-[48px] md:text-[60px] leading-[1.02] md:leading-[1] tracking-[-0.02em] text-charcoal text-balance"
          >
            Trends, not{" "}
            <span className="display-serif-italic text-sage">pricks</span>.
          </h2>
          <p className="md:pb-2 max-w-xl text-[16px] sm:text-[17px] leading-[1.55] text-charcoal/75">
            Glycemic awareness designed to fit a real life. At your desk, at
            the dinner table, on the trail.
          </p>
        </div>

        {/* Slideshow — open layout, no card frame */}
        <div
          ref={containerRef}
          className="mt-8 md:mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="grid gap-6 md:gap-14 md:grid-cols-2 md:items-center">
            {/* Left: feature photo */}
            <div className="relative overflow-hidden rounded-2xl aspect-square sm:aspect-[5/4] md:aspect-auto md:h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`photo-${index}`}
                  {...fade}
                  className="absolute inset-0"
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: content */}
            <div className="md:max-w-lg">
              <AnimatePresence mode="wait">
                <motion.div key={`text-${index}`} {...fade} aria-live="polite">
                  <div className="flex items-baseline gap-3 text-[12px] font-medium uppercase tracking-[0.18em] text-charcoal/85">
                    <span className="text-sage tabular-nums">
                      0{index + 1}
                    </span>
                    <span className="h-px w-8 bg-stone-2" />
                    <span>{slide.label}</span>
                  </div>
                  <h3 className="mt-4 display-serif text-[26px] sm:text-[34px] md:text-[40px] leading-[1.1] sm:leading-[1.05] tracking-[-0.02em] text-charcoal">
                    {slide.title}
                  </h3>
                  <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.55] text-charcoal/75">
                    {slide.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Pagination row */}
          <div className="mt-6 md:mt-8 flex items-center justify-between border-t border-stone pt-4 md:pt-5">
            <div className="flex items-center gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  aria-label={`Go to slide ${i + 1}: ${s.label}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-10 bg-sage"
                      : "w-4 bg-sage/30 hover:bg-sage/50"
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-[12px] tracking-[0.08em] text-charcoal/60 tabular-nums">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
