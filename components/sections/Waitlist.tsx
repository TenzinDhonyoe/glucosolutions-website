"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { joinWaitlist, type WaitlistResult } from "@/app/waitlist/actions";
import { track } from "@/lib/analytics";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="shine group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-sage px-6 py-3 text-[14px] font-medium text-paper hover:bg-sage-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-220 whitespace-nowrap"
    >
      {pending ? "Joining…" : "Join the waitlist"}
      {!pending && (
        <ArrowRight
          size={15}
          className="transition-transform duration-220 ease-out group-hover:translate-x-0.5"
        />
      )}
    </button>
  );
}

function SuccessBurst() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  const dots = Array.from({ length: 18 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const angle = (i / dots.length) * Math.PI * 2;
        const dist = 130 + (i % 3) * 28;
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
            animate={{ x, y, opacity: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.2, 0.6, 0.2, 1] }}
            className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-sunlit"
          />
        );
      })}
    </div>
  );
}

export function Waitlist() {
  const [state, formAction] = useActionState<WaitlistResult | null, FormData>(
    joinWaitlist,
    null
  );
  const [isFocused, setIsFocused] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const referrerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (referrerRef.current && typeof document !== "undefined") {
      referrerRef.current.value = document.referrer;
    }
  }, []);

  useEffect(() => {
    if (state?.ok) {
      track("waitlist_submit", { ok: true });
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-title"
      className="relative overflow-hidden text-paper border-t border-stone"
    >
      {/* Full-bleed sunflowers backdrop */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <Image
          src="/photos/sunflowers.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover cine-grade"
          style={{ objectPosition: "50% 60%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(28,28,28,0.55)" }}
        />
        <div className="vignette" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8 py-24 md:py-44 text-center">
        <div className="flex items-center justify-center gap-3 text-[12px] font-medium uppercase tracking-[0.18em]">
          <span className="text-sunlit tabular-nums">05</span>
          <span className="h-px w-10 bg-paper/60" />
          <span className="text-paper/90">Early access</span>
        </div>

        <h2
          id="waitlist-title"
          className="mt-8 mx-auto max-w-2xl display-serif text-[36px] sm:text-[52px] md:text-[68px] leading-[1.06] sm:leading-[1.04] tracking-[-0.02em] text-paper text-balance"
        >
          The next{" "}
          <span className="display-serif-italic text-seafoam">10 years</span>{" "}
          of your metabolic health start now.
        </h2>

        <p className="mt-6 mx-auto max-w-md text-[15px] sm:text-[17px] leading-[1.65] text-paper/80">
          Small choices compound into decades.
          <br className="hidden sm:block" />
          {" "}Join the waitlist for early access.
        </p>

        <div className="relative mt-12">
          {state?.ok ? (
            <motion.div
              className="relative mx-auto inline-flex"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <SuccessBurst />
              <div className="relative inline-flex items-center gap-3 rounded-md border border-stone bg-oat px-6 py-5">
                <span className="grid place-items-center h-9 w-9 rounded-full bg-sage text-paper">
                  <Check size={18} strokeWidth={3} />
                </span>
                <div className="text-left">
                  <div className="display-serif text-[20px] text-charcoal">
                    You&rsquo;re on the list.
                  </div>
                  <div className="caption mt-1">
                    we&rsquo;ll be in touch when invites open.
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <form ref={formRef} action={formAction} className="mx-auto max-w-lg">
              <input type="hidden" name="source" value="website" />
              <input
                ref={referrerRef}
                type="hidden"
                name="referrer"
                defaultValue=""
              />
              <input
                type="text"
                name="hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div
                className={`flex flex-col sm:flex-row gap-2 rounded-full bg-oat p-1.5 border transition-colors duration-220 ${
                  isFocused ? "border-seafoam" : "border-stone"
                }`}
              >
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="flex-1 bg-transparent px-5 py-3 text-[15px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:shadow-none"
                  style={{ boxShadow: "none" }}
                />
                <SubmitButton />
              </div>

              {state && !state.ok && (
                <p
                  role="alert"
                  className="mt-3 text-[13px] text-sunlit"
                >
                  {state.error}
                </p>
              )}

              <p className="mt-5 font-mono text-[11px] tracking-[0.04em] text-paper/70">
                we&rsquo;ll only email about early access. no spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
