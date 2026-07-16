"use client";

import { useRef, useState } from "react";
import {
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";
import { PhoneStage, EngineStage, BriefStage, Connector } from "./relay";

/* =============================================================================
   HowItWorks — the record's journey across three real product surfaces. Instead
   of dimming one dashboard three ways, we show the actual relay: the patient's
   phone hands a log to the interpretation engine, which hands two signals to the
   clinician's session brief. On desktop the section pins and the relay assembles
   as you scroll, connectors firing left to right. On mobile / reduced-motion it
   stacks vertically, fully lit.
   ========================================================================== */

type Step = { n: string; title: string; body: string };

const STEPS: Step[] = [
  {
    n: "01",
    title: "Your patient logs",
    body: "Meals, glucose, activity, and sleep, captured in seconds in Redu. It reaches your dashboard the moment they save.",
  },
  {
    n: "02",
    title: "GlucoSolutions interprets",
    body: "Each entry becomes a signal you can trust, traced to the exact readings behind it. The math stays in plain sight.",
  },
  {
    n: "03",
    title: "You walk in ready",
    body: "A brief assembles from those signals. Open with what changed, message between visits, export outcomes referrers trust.",
  },
];

const EYEBROW = "How it works";
const HEADING = "Three surfaces. One record.";
const SUBHEAD =
  "The entry your patient logs on their phone becomes a sourced read, then the brief you open the session with. One record, handed along, never re-keyed.";

const STAGES = [PhoneStage, EngineStage, BriefStage] as const;

/* ---- The relay board: three captioned surfaces wired in sequence. `active`
   is the furthest-reached stage (0–2); stages at or before it are revealed and
   the connectors up to it are lit. Shared by the pinned and static layouts. --- */

function StepCaption({
  step,
  reached,
  current,
}: {
  step: Step;
  reached: boolean;
  current: boolean;
}) {
  return (
    <div>
      <span
        className={cn(
          "tnum text-[13px] font-semibold transition-colors duration-500",
          current ? "text-sky-700" : reached ? "text-ink-500" : "text-ink-400",
        )}
      >
        {step.n}
      </span>
      <h3
        className={cn(
          "mt-1.5 text-[17px] font-semibold tracking-[-0.01em] transition-colors duration-500",
          reached ? "text-ink-900" : "text-ink-400",
        )}
      >
        {step.title}
      </h3>
      <p
        className={cn(
          "mt-2 text-[13.5px] leading-relaxed transition-colors duration-500",
          reached ? "text-ink-500" : "text-ink-400/70",
        )}
      >
        {step.body}
      </p>
    </div>
  );
}

export function RelayBoard({ active, reduce }: { active: number; reduce: boolean }) {
  return (
    <div
      className="mx-auto grid w-full max-w-[60rem] items-stretch gap-x-3"
      style={{
        gridTemplateColumns:
          "minmax(0,10.5rem) minmax(2.5rem,4rem) minmax(0,24rem) minmax(2.5rem,4rem) minmax(0,21rem)",
        gridTemplateRows: "21rem auto",
      }}
    >
      {STEPS.map((step, i) => {
        const Stage = STAGES[i];
        const reached = i <= active;
        const col = i * 2 + 1;
        return (
          <div key={step.n} style={{ display: "contents" }}>
            {/* the surface itself, vertically centered so connectors align */}
            <div
              className={cn(
                "flex items-center justify-center transition-all duration-700 ease-out",
                reached
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 translate-y-4 blur-[2px]",
              )}
              style={{ gridColumn: col, gridRow: 1 }}
            >
              <Stage />
            </div>
            {/* its caption, beneath */}
            <div
              className={cn(
                "pt-5 transition-all duration-700 ease-out",
                reached ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
              )}
              style={{ gridColumn: col, gridRow: 2 }}
            >
              <StepCaption step={step} reached={reached} current={i === active} />
            </div>
            {/* the connector into the next surface */}
            {i < STEPS.length - 1 ? (
              <div style={{ gridColumn: col + 1, gridRow: 1 }}>
                <Connector lit={active > i} reduce={reduce} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/* ---- desktop: pinned section, relay assembles on scroll -------------------- */

function PinnedRelay({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Assemble one surface per third of the pinned track, so each stage gets an
    // equal dwell and the relay completes just before the section releases.
    const next = v < 0.34 ? 0 : v < 0.67 ? 1 : 2;
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
    <div ref={ref} className={cn("relative h-[300vh]", className)}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-20">
        <Container className="w-full">
          <div className="mx-auto mb-10 max-w-2xl text-center 2xl:mb-14">
            <Eyebrow slash className="justify-center">
              {EYEBROW}
            </Eyebrow>
            <h2 className="display-serif mt-5 text-[clamp(2rem,3.4vw,2.9rem)] text-ink-900 text-balance">
              {HEADING}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-500 text-pretty">
              {SUBHEAD}
            </p>
          </div>
          <RelayBoard active={active} reduce={false} />
        </Container>
      </div>
    </div>
  );
}

/* ---- mobile + reduced-motion: stacked, fully lit --------------------------- */

export function StaticRelay({ className }: { className?: string }) {
  return (
    <div className={cn("py-20 md:py-28", className)}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow slash className="justify-center">
              {EYEBROW}
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-serif mt-5 text-[clamp(2rem,7vw,2.6rem)] text-ink-900 text-balance">
              {HEADING}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ink-500 text-pretty">
              {SUBHEAD}
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 flex max-w-md flex-col items-stretch">
          {STEPS.map((step, i) => {
            const Stage = STAGES[i];
            return (
              <div key={step.n}>
                <Reveal variant="up" delay={0.05}>
                  <div className="flex items-baseline gap-3">
                    <span className="tnum text-[13px] font-semibold text-sky-700">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-ink-900">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">
                        {step.body}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-center">
                    <Stage />
                  </div>
                </Reveal>
                {i < STEPS.length - 1 ? (
                  <div className="my-3 flex justify-center">
                    <div className="w-10">
                      <Connector lit reduce vertical />
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
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
      {pinnedAllowed ? <PinnedRelay className="hidden lg:block" /> : null}
      <StaticRelay className={pinnedAllowed ? "lg:hidden" : ""} />
    </section>
  );
}
