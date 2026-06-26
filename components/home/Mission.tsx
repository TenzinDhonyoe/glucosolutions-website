"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container, Button } from "@/components/ui";

// A short mission statement in the Gluco voice. Split on spaces and revealed
// word by word as the line scrolls toward the centre of the viewport.
const STATEMENT =
  "Care happens in the session. Outcomes happen in the weeks between. We make those weeks visible, sourced, and yours to act on.";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // Each word fades up from a muted warm grey to full ink across its own slice
  // of the scroll. Adjacent slices overlap slightly, so the reveal reads as one
  // travelling wave rather than a row of switches.
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = useTransform(progress, range, ["#a79e90", "#2b2620"]);
  return (
    <motion.span style={{ opacity, color }}>
      {children}{" "}
    </motion.span>
  );
}

export function Mission() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });

  const words = STATEMENT.split(" ");

  return (
    <section className="bg-page py-32 md:py-48">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p
            ref={ref}
            id="mission-statement"
            className="display-serif text-[clamp(1.9rem,4.6vw,3.5rem)] leading-[1.16] text-balance"
          >
            {reduce ? (
              <span className="text-ink-900">{STATEMENT}</span>
            ) : (
              words.map((word, i) => {
                const start = i / words.length;
                const end = (i + 1.5) / words.length;
                return (
                  <Word
                    key={`${word}-${i}`}
                    progress={scrollYProgress}
                    range={[start, Math.min(end, 1)]}
                  >
                    {word}
                  </Word>
                );
              })
            )}
          </p>

          <div className="mt-14 flex flex-col items-center gap-5">
            <Button
              href="/contact"
              size="lg"
              pill
              iconRight={ArrowRight}
              className="bg-ink-900 px-10 py-5 text-[17px] text-page shadow-md hover:bg-ink-700"
            >
              Book a demo
            </Button>
            <p className="text-[14px] text-ink-500">
              A 20-minute walkthrough on a real, de-identified case. No slides.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
