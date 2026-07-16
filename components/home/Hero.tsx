"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * WritingLoop — a flipbook of the dietitian illustration. Every frame is
 * pixel-identical except the pen/hand position (frames generated with Gemini),
 * so cycling them reads as her writing a meal plan. All frames are stacked and
 * cross-toggled by opacity (no reflow, no flash). Static on reduced-motion.
 */
const WRITE_FRAMES = [
  "/dietitian-0.png",
  "/dietitian-1.png",
  "/dietitian-3.png",
  "/dietitian-2.png",
  "/dietitian-4.png",
];

function WritingLoop({
  reduce,
  className,
}: {
  reduce: boolean;
  className: string;
}) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setFrame((f) => (f + 1) % WRITE_FRAMES.length),
      300,
    );
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <span className="relative inline-block align-middle">
      {WRITE_FRAMES.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={874}
          height={850}
          priority
          className={`${idx === 0 ? "block" : "absolute left-0 top-0 block"} ${className}`}
          style={{ opacity: frame === idx ? 1 : 0 }}
        />
      ))}
    </span>
  );
}

// 2026 hero direction — compact centered block on a near-white ground,
// matching the supplied reference. Typeface: Nunito Sans (--font-nunito-sans),
// dialed to 700 with tight tracking so it reads clean rather than bubbly.

const WORD_EASE = [0.25, 1, 0.5, 1] as const;

/**
 * Words — renders a phrase word-by-word. Each word rises out of a clipped
 * wrapper (masked reveal) with a 50ms stagger from `baseDelay`.
 */
function Words({
  words,
  baseDelay,
  color,
  reduce,
}: {
  words: string[];
  baseDelay: number;
  color: string;
  reduce: boolean;
}) {
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              style={{ color }}
              initial={reduce ? { opacity: 0 } : { y: "110%", opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { y: "0%", opacity: 1 }}
              transition={{
                duration: reduce ? 0.4 : 0.6,
                ease: WORD_EASE,
                delay: reduce ? 0 : baseDelay + i * 0.05,
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const reduce = useReducedMotion() ?? false;

  const rise = (delay: number, duration: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.4 : duration, ease: "easeOut" as const, delay: reduce ? 0 : delay },
  });

  const pop = (delay: number, duration = 0.5) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: reduce ? 0.4 : duration, ease: "backOut" as const, delay: reduce ? 0 : delay },
  });

  return (
    <section
      className="relative flex flex-col items-center overflow-hidden px-6 pt-24 pb-12 text-center md:px-10 md:pt-32 md:pb-16"
      style={{ fontFamily: "var(--font-nunito-sans)", background: "#f6f6f4" }}
    >
      {/* Ambient life — slow-drifting brand-tinted glows behind the content */}
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute rounded-full blur-3xl"
            style={{
              width: 560,
              height: 560,
              left: "4%",
              top: "8%",
              background:
                "radial-gradient(circle, rgba(26,171,179,0.20), transparent 70%)",
            }}
            animate={{ x: [0, 44, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute rounded-full blur-3xl"
            style={{
              width: 480,
              height: 480,
              right: "3%",
              top: "18%",
              background:
                "radial-gradient(circle, rgba(245,166,35,0.16), transparent 70%)",
            }}
            animate={{ x: [0, -40, 0], y: [0, 26, 0], scale: [1.05, 1, 1.05] }}
            transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-[880px] flex-col items-center">
        {/* 1 — Eyebrow pill (restrained, monochrome) */}
        <motion.div
          {...rise(0.1, 0.6)}
          className="inline-flex items-center"
          style={{
            gap: "8px",
            padding: "4px 10px 4px 4px",
            borderRadius: "9px",
            background: "#efeeea",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <span
            className="inline-flex items-center justify-center"
            style={{
              width: "26px",
              height: "20px",
              borderRadius: "5px",
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 1px 1px rgba(0,0,0,0.04)",
              color: "#374151",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            AI
          </span>
          <span style={{ fontSize: "13px", fontWeight: 500, color: "#6b7280" }}>
            Continuity between sessions &amp; outcomes reporting
          </span>
        </motion.div>

        {/* 2 — H1 (compact, tight tracking, Bold not ExtraBold) */}
        <h1
          className="mt-6 text-[clamp(35px,4.5vw,56px)]"
          style={{ fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em" }}
        >
          <span className="block">
            <Words
              words={["AI", "that", "retains", "patients"]}
              baseDelay={0.3}
              color="#0a0a0a"
              reduce={reduce}
            />
          </span>
          <span className="block">
            <Words
              words={["for", "your"]}
              baseDelay={0.55}
              color="#0a0a0a"
              reduce={reduce}
            />{" "}
            <span className="relative mx-1 my-[-8px] inline-flex items-center justify-center align-middle md:mx-2 md:my-[-12px]">
              {/* soft breathing glow behind the illustration */}
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full blur-xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(26,171,179,0.28), transparent 70%)",
                  }}
                  animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.85, 0.45] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              {/* entrance scale-in + the writing animation (no up/down float) */}
              <motion.span {...pop(0.75, 0.6)} className="relative inline-block" aria-hidden>
                <WritingLoop reduce={reduce} className="h-[60px] w-auto md:h-[88px]" />
              </motion.span>
            </span>{" "}
            <Words
              words={["Dietitian", "Practice"]}
              baseDelay={0.7}
              color="#b7b6b0"
              reduce={reduce}
            />
          </span>
        </h1>

        {/* 3 — Subheading (light gray, narrow measure) */}
        <motion.p
          {...rise(1.0, 0.8)}
          className="mt-6 max-w-[600px]"
          style={{ fontSize: "17px", fontWeight: 400, lineHeight: 1.55, color: "#9aa0a6" }}
        >
          Half your patients go quiet between sessions and never come back.
          GlucoSolutions tracks the gap and briefs you before every visit, so you
          catch the drop-off before it happens.
        </motion.p>

        {/* 4 — CTA row (soft rounded rectangles, yellow accent) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <motion.div {...pop(1.2)}>
            <Link
              href="/#how"
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 transition-transform"
              style={{
                background: "#ffffff",
                border: "1px solid var(--color-line)",
                boxShadow: "0 1px 2px rgba(60,50,40,0.06)",
                color: "#0a0a0a",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              Let&apos;s Talk
            </Link>
          </motion.div>
          <motion.div {...pop(1.3)}>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 shadow-md transition-transform hover:scale-[1.02]"
              style={{
                background: "var(--color-ink-900)",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: 700,
              }}
            >
              Book a Demo
              <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
