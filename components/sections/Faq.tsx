"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MotionSection } from "@/components/MotionSection";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Is this a medical device?",
    a: "No. GlucoSolutions is a wellness product. It is not intended to diagnose, treat, cure, or prevent any disease, and it is not a substitute for medical-grade glucose monitoring.",
  },
  {
    q: "Do I need a prescription?",
    a: "No. The wearable and app are available without a prescription as wellness tools for glycemic trend awareness.",
  },
  {
    q: "How accurate is it?",
    a: "Roughly 80% trend classification accuracy in benchtop testing. We classify glycemic trends, rising, stable, falling, rather than reporting absolute mg/dL values.",
  },
  {
    q: "iOS or Android?",
    a: "iOS first. Android is on the roadmap and will follow once the iOS beta cohort matures.",
  },
  {
    q: "When can I get one?",
    a: "Early access is rolling out to a limited beta cohort now. Broader rollout dates will be announced as we expand. Join the waitlist for invites.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Your data is encrypted at rest and in transit, and we never sell it. You own your data and can delete it at any time.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <MotionSection
      id="faq"
      ariaLabelledBy="faq-title"
      className="bg-ink-1 text-white border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-28 md:py-36">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            FAQ
          </div>
          <h2
            id="faq-title"
            className="mt-5 text-[40px] sm:text-[52px] md:text-[60px] leading-[1.02] font-extrabold tracking-[-0.035em] text-white text-balance"
          >
            Questions, answered.
          </h2>
        </div>

        <ul className="mt-14 border-t border-white/[0.08]">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-white/[0.08]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span
                    className={cn(
                      "text-[17px] sm:text-[18px] font-medium tracking-tight transition-colors duration-300",
                      isOpen
                        ? "text-white"
                        : "text-white/85 group-hover:text-white"
                    )}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    aria-hidden
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 18,
                    }}
                    className={cn(
                      "shrink-0 h-8 w-8 rounded-full grid place-items-center transition-colors duration-300",
                      isOpen
                        ? "bg-white text-ink-0"
                        : "bg-white/[0.06] text-white/70 group-hover:bg-white/10 group-hover:text-white"
                    )}
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={
                        reduce ? false : { height: 0, opacity: 0, y: -4 }
                      }
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0, y: -4 }}
                      transition={{
                        height: {
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        opacity: { duration: 0.35 },
                        y: { duration: 0.4 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pr-12 text-[15px] sm:text-[16px] leading-[1.7] text-white/65">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </MotionSection>
  );
}
