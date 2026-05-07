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

// Confirmation moment: a calm breathing animation. Three concentric rings
// expand and fade in a slow 5.4s cycle, anchored by a sage check disc with a
// soft seafoam halo. Pairs with crossfading "inhale / exhale" microcopy so
// the metaphor reads even at a glance.
const BREATH_CYCLE_S = 5.4;
const RING_DELAYS = [0, 1.8, 3.6] as const;

function BreathingSuccess() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto flex flex-col items-center">
      <div className="relative h-44 w-44 sm:h-52 sm:w-52 grid place-items-center">
        {!reduce &&
          RING_DELAYS.map((delay) => (
            <motion.span
              key={delay}
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full border border-seafoam/55"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1.5, opacity: [0, 0.7, 0] }}
              transition={{
                duration: BREATH_CYCLE_S,
                delay,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
                times: [0, 0.35, 1],
              }}
            />
          ))}

        <motion.span
          aria-hidden
          className="absolute h-24 w-24 rounded-full bg-seafoam/45 blur-2xl"
          animate={
            reduce
              ? { opacity: 0.4 }
              : { opacity: [0.25, 0.6, 0.25] }
          }
          transition={
            reduce
              ? undefined
              : { duration: BREATH_CYCLE_S, repeat: Infinity, ease: "easeInOut" }
          }
        />

        <motion.span
          className="relative z-10 grid place-items-center h-16 w-16 rounded-full bg-sage text-paper shadow-[0_8px_28px_-8px_rgba(28,28,28,0.5)]"
          initial={
            reduce ? { scale: 1, opacity: 1 } : { scale: 0.55, opacity: 0 }
          }
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 22,
            delay: 0.05,
          }}
        >
          <Check size={26} strokeWidth={3} />
        </motion.span>
      </div>

      {!reduce && (
        <div
          aria-hidden
          className="relative mt-8 h-4 w-40 text-center"
        >
          <motion.span
            className="absolute inset-0 font-mono text-[11px] uppercase tracking-[0.24em] text-paper/65"
            animate={{ opacity: [0, 1, 1, 0, 0] }}
            transition={{
              duration: BREATH_CYCLE_S,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.15, 0.4, 0.5, 1],
            }}
          >
            inhale
          </motion.span>
          <motion.span
            className="absolute inset-0 font-mono text-[11px] uppercase tracking-[0.24em] text-paper/65"
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{
              duration: BREATH_CYCLE_S,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 0.65, 0.9, 1],
            }}
          >
            exhale
          </motion.span>
        </div>
      )}

      <motion.div
        className="mt-8 sm:mt-10 text-center"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="display-serif text-[28px] sm:text-[36px] md:text-[42px] leading-[1.05] tracking-[-0.015em] text-paper">
          You&rsquo;re on the list.
        </h3>
        <p className="mt-3 text-[15px] sm:text-[16px] text-paper/80">
          We&rsquo;ll be in touch when invites open.
        </p>
      </motion.div>
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

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 py-24 md:py-44 text-center">
        <div className="flex items-center justify-center gap-3 text-[12px] font-medium uppercase tracking-[0.18em]">
          <span className="text-sunlit tabular-nums">05</span>
          <span className="h-px w-10 bg-paper/60" />
          <span className="text-paper/90">Early access</span>
        </div>

        <h2
          id="waitlist-title"
          className="mt-8 mx-auto max-w-5xl display-serif text-[36px] sm:text-[52px] md:text-[68px] leading-[1.06] sm:leading-[1.04] tracking-[-0.02em] text-paper text-balance sm:text-pretty"
        >
          The next{" "}
          <span className="display-serif-italic text-seafoam">10 years</span>{" "}
          <br className="hidden sm:block" />
          of your metabolic health{" "}
          <br className="hidden sm:block" />
          starts now.
        </h2>

        <p className="mt-6 mx-auto max-w-md text-[15px] sm:text-[17px] leading-[1.65] text-paper/80">
          Small choices compound into decades.
          <br className="hidden sm:block" />
          {" "}Join the waitlist for early access.
        </p>

        <div className="relative mt-12">
          {state?.ok ? (
            <BreathingSuccess />
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
