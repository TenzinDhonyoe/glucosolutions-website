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

  // The next section (HowItWorks) rises over this panel via -mt-[100vh] + z-10,
  // and starts entering the viewport at ~0.44 of this track's progress. So the
  // whole sentence must finish revealing *before* then. Run the reveal across
  // the front of the pin, complete it by ~0.36, and hold the finished sentence
  // legible for a beat before the cover begins. The page stays put the entire
  // time the reader scrubs through the words.
  const reveal = useTransform(scrollYProgress, [0.04, 0.36], [0, 1]);

  const words = STATEMENT.split(" ");

  // The statement pins inside a tall track. The generous height is the "dwell"
  // the reader scrubs the reveal across before the panel releases.
  return (
    <section className="relative bg-page">
      <div ref={ref} className="h-[280vh]">
        <div className="sticky top-0 z-0 flex h-screen items-center">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <p
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
        </div>
      </div>
    </section>
  );
}
