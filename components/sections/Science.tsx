"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { GlucoseChart } from "@/components/product/GlucoseChart";
import { SectionLabel } from "@/components/interactive/SectionLabel";

export function Science() {
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);

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

  const chartProgress = useTransform(progress, [0.05, 0.7], [0, 1]);

  const card1Opacity = useTransform(progress, [0, 0.05, 0.4, 0.55], [1, 1, 1, 0]);
  const card2Opacity = useTransform(progress, [0.4, 0.55], [0, 1]);
  const card1Y = useTransform(progress, [0.4, 0.55], [0, -10]);
  const card2Y = useTransform(progress, [0.4, 0.55], [10, 0]);

  const step1Opacity = useTransform(progress, [0.4, 0.55], [1, 0.3]);
  const step2Opacity = useTransform(progress, [0.4, 0.55], [0.3, 1]);
  const step1Width = useTransform(progress, [0.4, 0.55], [40, 16]);
  const step2Width = useTransform(progress, [0.4, 0.55], [16, 40]);

  return (
    <section
      id="science"
      aria-labelledby="science-title"
      className="relative bg-oat text-charcoal border-t border-stone"
    >
      {/* DESKTOP scroll story */}
      <div ref={scrollerRef} className="hidden lg:block relative" style={{ height: "220vh" }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="mx-auto max-w-7xl w-full px-5 sm:px-8">
            <SectionLabel index={2} label="How it works" />

            <div className="mt-8 grid grid-cols-[1fr_1.05fr] gap-12 xl:gap-16 items-center">
              <div className="relative h-[300px] xl:h-[320px]">
                <motion.article
                  className="absolute inset-0 rounded-md border border-stone bg-paper p-7 xl:p-8 flex flex-col justify-center"
                  style={reduce ? undefined : { opacity: card1Opacity, y: card1Y }}
                >
                  <div className="eyebrow text-sage">The wearable</div>
                  <h3 className="mt-3 display-serif text-[34px] xl:text-[40px] leading-[1.05] tracking-[-0.015em] text-charcoal">
                    Reads through your skin.
                  </h3>
                  <p className="mt-4 text-[16px] leading-[1.65] text-charcoal/75">
                    A safe, low-power light shines into your skin and reads
                    how glucose is moving in your body. No needles. No patches.
                    No consumables.
                  </p>
                  <div className="caption mt-5 flex flex-wrap gap-x-6 gap-y-1">
                    <span>· Non-invasive</span>
                    <span>· Charge once a week</span>
                    <span>· Wear daily</span>
                  </div>
                </motion.article>

                <motion.article
                  className="absolute inset-0 rounded-md border border-stone bg-paper p-7 xl:p-8 flex flex-col justify-center"
                  style={reduce ? undefined : { opacity: card2Opacity, y: card2Y }}
                >
                  <div className="eyebrow text-sage">The AI coach</div>
                  <h3 className="mt-3 display-serif text-[34px] xl:text-[40px] leading-[1.05] tracking-[-0.015em] text-charcoal">
                    Learns{" "}
                    <span className="display-serif-italic text-sage">your</span>{" "}
                    body.
                  </h3>
                  <p className="mt-4 text-[16px] leading-[1.65] text-charcoal/75">
                    Instead of one-size-fits-all rules, the app learns how
                    food, sleep, and stress affect <em>you</em>. It nudges you
                    in plain language: eat this, walk now, sleep earlier.
                  </p>
                  <div className="caption mt-5 flex flex-wrap gap-x-6 gap-y-1">
                    <span>· Personalized</span>
                    <span>· In plain English</span>
                    <span>· No charts to read</span>
                  </div>
                </motion.article>

                <div className="absolute -bottom-9 left-0 flex items-center gap-2">
                  <motion.div
                    className="h-1.5 rounded-full bg-sage"
                    style={
                      reduce
                        ? { opacity: 1, width: 40 }
                        : { opacity: step1Opacity, width: step1Width }
                    }
                  />
                  <motion.div
                    className="h-1.5 rounded-full bg-sage"
                    style={
                      reduce
                        ? { opacity: 0.3, width: 16 }
                        : { opacity: step2Opacity, width: step2Width }
                    }
                  />
                </div>
              </div>

              <div>
                <h2
                  id="science-title"
                  className="display-serif text-[48px] xl:text-[64px] leading-[1.02] tracking-[-0.02em] text-charcoal text-balance"
                >
                  See your day, before it{" "}
                  <span className="display-serif-italic text-sage">happens</span>.
                </h2>
                <p className="mt-5 max-w-md text-[16px] leading-[1.6] text-charcoal/75">
                  The wearable reads how your body is responding in real time.
                  You learn what spikes you, what calms you.
                </p>

                <figure className="mt-8 rounded-md border border-stone bg-paper p-6">
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <div>
                      <div className="eyebrow text-charcoal">a typical day</div>
                      <div className="caption mt-1">three meals — three trends</div>
                    </div>
                  </div>
                  <GlucoseChart scrollProgress={reduce ? undefined : chartProgress} />
                  <figcaption className="caption mt-4 italic">
                    fig. 02 — illustrative 24-hour glycemic trace.
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET stack */}
      <div className="lg:hidden mx-auto max-w-7xl px-5 sm:px-8 py-24 md:py-28">
        <SectionLabel index={2} label="How it works" />
        <h2 className="mt-6 display-serif text-[40px] sm:text-[52px] leading-[1.02] tracking-[-0.02em] text-charcoal text-balance">
          See your day, before it{" "}
          <span className="display-serif-italic text-sage">happens</span>.
        </h2>
        <p className="mt-4 max-w-md text-[15px] sm:text-[16px] leading-[1.6] text-charcoal/75">
          The wearable reads how your body is responding in real time. You
          learn what spikes you, what calms you.
        </p>

        <figure className="mt-8 rounded-md border border-stone bg-paper p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <div>
              <div className="eyebrow text-charcoal">a typical day</div>
              <div className="caption mt-1">three trends</div>
            </div>
          </div>
          <GlucoseChart />
          <figcaption className="caption mt-4 italic">
            fig. 02 — illustrative 24-hour glycemic trace.
          </figcaption>
        </figure>

        <div className="mt-8 grid gap-6">
          <article className="rounded-md border border-stone bg-paper p-7">
            <div className="eyebrow text-sage">The wearable</div>
            <h3 className="mt-3 display-serif text-[28px] leading-[1.1] tracking-[-0.015em] text-charcoal">
              Reads through your skin.
            </h3>
            <p className="mt-3 text-[15px] leading-[1.65] text-charcoal/75">
              A safe, low-power light shines into your skin and reads how
              glucose is moving in your body. No needles. No patches. No
              consumables.
            </p>
          </article>

          <article className="rounded-md border border-stone bg-paper p-7">
            <div className="eyebrow text-sage">The AI coach</div>
            <h3 className="mt-3 display-serif text-[28px] leading-[1.1] tracking-[-0.015em] text-charcoal">
              Learns{" "}
              <span className="display-serif-italic text-sage">your</span>{" "}
              body.
            </h3>
            <p className="mt-3 text-[15px] leading-[1.65] text-charcoal/75">
              Instead of one-size-fits-all rules, the app learns how food,
              sleep, and stress affect <em>you</em>. It nudges you in plain
              language: eat this, walk now, sleep earlier.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
