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
  "Prediabetes can be reversed. The hard part is knowing what's working. We show you how your body responds to your day, so you know exactly what to change.";

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
  const opacity = useTransform(progress, range, [0.3, 1]);
  return (
    <motion.span style={{ opacity }} className="text-ink-900">
      {children}{" "}
    </motion.span>
  );
}

export function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Track scroll against the tall *track*, not the paragraph. While the panel
  // is pinned the paragraph is frozen in the viewport, so its own progress
  // would never advance. The track keeps moving, so 0 -> 1 maps cleanly across
  // the pinned dwell: 0 the instant the panel locks centre-screen, 1 as it
  // releases.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Reveal across most of the pin, then hold the finished sentence for a beat
  // before the panel releases.
  const reveal = useTransform(scrollYProgress, [0.05, 0.7], [0, 1]);

  const words = STATEMENT.split(" ");

  // The statement pins inside a tall track. The generous height is the "dwell"
  // the reader scrubs the reveal across before the panel releases.
  return (
    <section className="relative bg-page">
      <div ref={ref} className="h-[220vh]">
        <div className="sticky top-0 z-0 flex h-screen items-center">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <p
                id="mission-statement"
                className="display-serif text-[clamp(1.6rem,1.15rem+1.7vw,2.5rem)] leading-[1.2]"
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
                        progress={reveal}
                        range={[start, Math.min(end, 1)]}
                      >
                        {word}
                      </Word>
                    );
                  })
                )}
              </p>

              <div className="mt-14 flex flex-col items-center gap-5">
                <Button href="/#waitlist" size="lg" pill variant="primary" iconRight={ArrowRight}>
                  Join the waitlist
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
