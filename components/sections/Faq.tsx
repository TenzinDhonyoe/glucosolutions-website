"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MotionSection } from "@/components/MotionSection";
import { SectionLabel } from "@/components/interactive/SectionLabel";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Is this a medical device?",
    a: "No. Gluco Solutions is a wellness product. It is not intended to diagnose, treat, cure, or prevent any disease, and it is not a substitute for medical-grade glucose monitoring.",
  },
  {
    q: "Do I need a prescription?",
    a: "No. The wearable and app are available without a prescription as wellness tools for glycemic trend awareness.",
  },
  {
    q: "How accurate is it?",
    a: "Roughly 80% trend classification accuracy in benchtop testing. We classify glycemic trends — rising, stable, falling — rather than reporting absolute mg/dL values.",
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
      className="bg-oat text-charcoal border-t border-stone"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-28 md:py-36">
        <SectionLabel index={6} label="FAQ" />

        <h2
          id="faq-title"
          className="mt-8 display-serif text-[44px] sm:text-[60px] md:text-[72px] leading-[1] tracking-[-0.02em] text-charcoal text-balance"
        >
          Questions,{" "}
          <span className="display-serif-italic text-sage">answered</span>.
        </h2>

        <ul className="mt-14 border-t border-stone">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-stone">
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
                      "text-[18px] sm:text-[20px] font-medium tracking-[-0.005em] transition-colors duration-220",
                      isOpen
                        ? "text-charcoal"
                        : "text-charcoal/85 group-hover:text-charcoal"
                    )}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    aria-hidden
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    className={cn(
                      "shrink-0 h-9 w-9 grid place-items-center rounded-full transition-colors duration-220",
                      isOpen
                        ? "bg-sage text-paper"
                        : "border border-stone text-charcoal/70 group-hover:border-sage group-hover:text-sage"
                    )}
                  >
                    <Plus size={16} strokeWidth={2} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.42, ease: [0.2, 0.6, 0.2, 1] },
                        opacity: { duration: 0.32 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pr-12 text-[16px] sm:text-[17px] leading-[1.7] text-charcoal/75">
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
