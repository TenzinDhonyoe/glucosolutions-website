"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: React.ReactNode };

/** Accordion — quiet FAQ list with hairline dividers and a rotating chevron. */
export function Accordion({ items, className }: { items: Item[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-[17px] font-semibold text-ink-900">{item.q}</span>
              <ChevronDown
                size={20}
                className={cn(
                  "shrink-0 text-ink-400 transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
                aria-hidden
              />
            </button>
            {isOpen ? (
              <div className="pb-5 pr-10 text-[16px] leading-relaxed text-ink-500">
                {item.a}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
