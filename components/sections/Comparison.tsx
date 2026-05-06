"use client";

import { Check, Minus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MotionSection } from "@/components/MotionSection";
import { SectionLabel } from "@/components/interactive/SectionLabel";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { label: "Gluco Solutions", primary: true },
  { label: "CGM (Dexcom, Libre)", primary: false },
  { label: "Smartwatches", primary: false },
];

const ROWS: { label: string; cells: boolean[] }[] = [
  { label: "No needles", cells: [true, false, true] },
  { label: "Tracks your blood sugar", cells: [true, true, false] },
  { label: "AI coach included", cells: [true, false, false] },
  { label: "No prescription needed", cells: [true, false, true] },
  { label: "No throwaway sensors", cells: [true, false, true] },
];

function Cell({ on, primary }: { on: boolean; primary: boolean }) {
  if (on) {
    return (
      <Check
        size={20}
        strokeWidth={2}
        className={cn(primary ? "text-sage" : "text-charcoal/55")}
        aria-label="Yes"
      />
    );
  }
  return (
    <Minus
      size={20}
      strokeWidth={1.75}
      className="text-charcoal/25"
      aria-label="No"
    />
  );
}

export function Comparison() {
  const reduce = useReducedMotion();

  return (
    <MotionSection
      id="compare"
      ariaLabelledBy="compare-title"
      className="bg-oat text-charcoal border-t border-stone"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-28 md:py-36">
        <SectionLabel index={4} label="How we're different" />

        <h2
          id="compare-title"
          className="mt-8 max-w-3xl display-serif text-[44px] sm:text-[60px] md:text-[76px] leading-[1] tracking-[-0.02em] text-charcoal text-balance"
        >
          Not a CGM. Not a{" "}
          <span className="display-serif-italic text-sage">smartwatch</span>.
        </h2>

        <div className="mt-16 overflow-x-auto -mx-5 sm:mx-0">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="sr-only">Capability</th>
                {COLUMNS.map((c) => (
                  <th
                    key={c.label}
                    scope="col"
                    className={cn(
                      "px-5 py-5 text-left align-bottom whitespace-nowrap",
                      c.primary
                        ? "display-serif text-[24px] sm:text-[28px] text-sage"
                        : "eyebrow text-charcoal"
                    )}
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, rowIdx) => (
                <motion.tr
                  key={row.label}
                  className="border-t border-stone transition-colors duration-220 hover:bg-paper/50"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.55,
                    delay: 0.1 + rowIdx * 0.08,
                    ease: [0.2, 0.6, 0.2, 1],
                  }}
                >
                  <th
                    scope="row"
                    className="px-5 py-6 text-left text-[16px] font-medium text-charcoal/90"
                  >
                    {row.label}
                  </th>
                  {row.cells.map((on, i) => (
                    <td key={i} className="px-5 py-6">
                      <motion.span
                        className="inline-flex"
                        initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                        whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 22,
                          delay: 0.25 + rowIdx * 0.08 + i * 0.06,
                        }}
                      >
                        <Cell on={on} primary={i === 0} />
                      </motion.span>
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MotionSection>
  );
}
