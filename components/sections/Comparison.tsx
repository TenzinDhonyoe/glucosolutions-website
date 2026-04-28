"use client";

import { Check, Minus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MotionSection } from "@/components/MotionSection";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { label: "GlucoSolutions", primary: true },
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
        strokeWidth={2.5}
        className={cn(primary ? "text-brand-led" : "text-white/55")}
        aria-label="Yes"
      />
    );
  }
  return (
    <Minus
      size={20}
      strokeWidth={2.25}
      className="text-white/20"
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
      className="bg-ink-0 text-white border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-28 md:py-36">
        <div className="max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            How we&rsquo;re different
          </div>
          <h2
            id="compare-title"
            className="mt-5 text-[40px] sm:text-[52px] md:text-[64px] leading-[1.02] font-extrabold tracking-[-0.035em] text-white text-balance"
          >
            Not a CGM. Not a smartwatch.
          </h2>
        </div>

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
                      "px-5 py-5 text-left",
                      c.primary
                        ? "text-[14px] font-bold tracking-tight brand-text-gradient-sweep"
                        : "text-[12px] font-semibold uppercase tracking-[0.18em] text-white/35"
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
                  className="border-t border-white/[0.08] transition-colors duration-300 hover:bg-white/[0.025]"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.55,
                    delay: 0.1 + rowIdx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <th
                    scope="row"
                    className="px-5 py-5 text-left text-[15px] sm:text-[16px] font-medium text-white/85"
                  >
                    {row.label}
                  </th>
                  {row.cells.map((on, i) => (
                    <td key={i} className="px-5 py-5">
                      <motion.span
                        className="inline-flex"
                        initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                        whileInView={
                          reduce ? undefined : { scale: 1, opacity: 1 }
                        }
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
