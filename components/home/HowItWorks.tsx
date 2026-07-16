"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";
import { DashboardMock } from "./DashboardMock";

type Step = { n: string; title: string; body: string };

const STEPS: Step[] = [
  {
    n: "01",
    title: "Patients log in Redu",
    body: "Meals, glucose, steps, and sleep, logged in seconds on their phone. It lands on your dashboard automatically.",
  },
  {
    n: "02",
    title: "GlucoSolutions interprets the behavior",
    body: "Every insight traces to the exact readings behind it, with the computation in plain sight. No black box.",
  },
  {
    n: "03",
    title: "You act with confidence",
    body: "Walk into each session prepped, message patients between visits, and export outcomes your referrers trust.",
  },
];

const HEADING = "Three steps. One source of truth.";
const EASE = [0.22, 0.61, 0.21, 1] as const;

/* ---- desktop: pinned dashboard with a scroll-scrubbed spotlight tour ---- */

function PinnedSteps({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)));
    setActive((prev) => (prev === i ? prev : i));
  });

  return (
    <div ref={ref} className={cn("relative h-[300vh]", className)}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-20">
        <Container className="w-full">
          <div className="grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            {/* left — header + rail-tracked step list */}
            <div>
              <Eyebrow slash>How it works</Eyebrow>
              <h2 className="display-serif mt-5 text-[clamp(2rem,3.4vw,2.9rem)] text-ink-900 text-balance">
                {HEADING}
              </h2>

              <ol className="relative mt-11 space-y-8 pl-12">
                {/* rail track + animated fill */}
                <span
                  aria-hidden
                  className="absolute bottom-2 left-[13px] top-2 w-[2px] -translate-x-1/2 bg-line-2"
                />
                <motion.span
                  aria-hidden
                  className="absolute bottom-2 left-[13px] top-2 w-[2px] origin-top -translate-x-1/2 bg-sky-600"
                  style={{ scaleY: fill }}
                />
                {STEPS.map((s, i) => {
                  const reached = i <= active;
                  const current = i === active;
                  return (
                    <li key={s.n} className="relative">
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -left-12 top-0.5 grid h-[26px] w-[26px] place-items-center rounded-full border-2 transition-colors duration-500",
                          reached ? "border-sky-600 bg-sky-600" : "border-line-2 bg-card",
                        )}
                      >
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full transition-colors duration-500",
                            current ? "bg-card" : reached ? "bg-card/70" : "bg-line-2",
                          )}
                        />
                      </span>
                      <span
                        className={cn(
                          "tnum text-[13px] font-medium transition-colors duration-500",
                          current ? "text-sky-700" : "text-ink-400",
                        )}
                      >
                        {s.n}
                      </span>
                      <h3
                        className={cn(
                          "mt-1 font-serif text-[22px] transition-colors duration-500",
                          reached ? "text-ink-900" : "text-ink-400",
                        )}
                      >
                        {s.title}
                      </h3>
                      <AnimatePresence initial={false}>
                        {current ? (
                          <motion.p
                            key="body"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="overflow-hidden text-[15px] leading-relaxed text-ink-500"
                          >
                            <span className="block pt-2.5">{s.body}</span>
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* right — the real dashboard, with the active part spotlit. Scaled
                to fit inside the pinned viewport (clears the nav, keeps the
                outcomes row in view) at common laptop heights. */}
            <div className="origin-center [transform:scale(0.9)] 2xl:[transform:scale(0.98)]">
              <DashboardMock highlight={active} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

/* ---- mobile + reduced-motion: stacked stepper + the dashboard at rest ---- */

function StaticSteps({ className }: { className?: string }) {
  return (
    <div className={cn("py-20 md:py-28", className)}>
      <Container>
        <Reveal>
          <Eyebrow slash>How it works</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-serif mt-5 max-w-3xl text-[clamp(2rem,4.4vw,3.2rem)] text-ink-900 text-balance">
            {HEADING}
          </h2>
        </Reveal>

        <div className="mt-12 space-y-5">
          {STEPS.map(({ n, title, body }) => (
            <Reveal key={n} className="flex gap-5 rounded-xl border border-line bg-card p-6 shadow-sm">
              <span className="tnum text-[2rem] font-medium leading-none text-sky-600">
                {n}
              </span>
              <div>
                <h3 className="font-serif text-xl text-ink-900">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal variant="scale" className="mt-12">
          <DashboardMock />
          <p className="mt-4 text-center text-[13px] text-ink-500">
            Your clinician dashboard, built from what your patients log.
          </p>
        </Reveal>
      </Container>
    </div>
  );
}

export function HowItWorks() {
  const reduce = useReducedMotion();

  const pinnedAllowed = reduce !== true;

  return (
    <section
      id="how"
      className="relative z-10 -mt-[100vh] scroll-mt-24 rounded-t-[2rem] bg-sunken shadow-[0_-30px_60px_-40px_rgba(43,38,32,0.45)] md:rounded-t-[2.5rem]"
    >
      {pinnedAllowed ? <PinnedSteps className="hidden lg:block" /> : null}
      <StaticSteps className={pinnedAllowed ? "lg:hidden" : ""} />
    </section>
  );
}
