"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
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
      className="shine group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-ink-0 hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-all whitespace-nowrap"
    >
      {pending ? "Joining…" : "Join waitlist"}
      {!pending && (
        <ArrowRight
          size={15}
          className="transition-transform duration-500 ease-out group-hover:translate-x-1"
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
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
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
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-brand-led"
            style={{ boxShadow: "0 0 6px rgba(61, 219, 126, 0.7)" }}
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
  const reduce = useReducedMotion();

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
      className="relative overflow-hidden bg-ink-0 text-white border-t border-white/[0.06]"
    >
      {/* Layered ambient glow — slow breathing for atmospheric energy */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[680px] w-[680px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(45,190,108,0.45), rgba(19,139,146,0.2) 50%, transparent)",
        }}
        animate={
          reduce
            ? undefined
            : {
                opacity: [0.32, 0.5, 0.32],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
      {/* Counter-glow drift */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[15%] top-[30%] h-[320px] w-[320px] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(14,92,126,0.35), transparent 70%)",
        }}
        animate={
          reduce
            ? undefined
            : {
                opacity: [0.25, 0.42, 0.25],
                x: [0, 30, 0],
                y: [0, -18, 0],
              }
        }
        transition={{
          duration: 14,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      />

      <div className="relative mx-auto max-w-2xl px-5 sm:px-8 py-32 md:py-40 text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
          Early access
        </div>
        <h2
          id="waitlist-title"
          className="mt-5 text-[44px] sm:text-[56px] md:text-[68px] leading-[1.02] font-extrabold tracking-[-0.035em] text-balance"
        >
          Eat with confidence.
          <br />
          <span className="display-serif font-normal text-white/75">
            Starting soon.
          </span>
        </h2>
        <p className="mt-6 mx-auto max-w-md text-[16px] sm:text-[17px] leading-relaxed text-white/60">
          Join early access. iOS first. Limited beta cohort.
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
              <div className="relative inline-flex items-center gap-3 rounded-2xl border border-brand-led/30 bg-white/[0.03] px-6 py-5">
                <span className="grid place-items-center h-9 w-9 rounded-full brand-gradient text-white">
                  <Check size={18} strokeWidth={3} />
                </span>
                <div className="text-left">
                  <div className="text-[15px] font-bold text-white">
                    You&rsquo;re on the list.
                  </div>
                  <div className="text-[13px] text-white/55">
                    We&rsquo;ll be in touch when invites open.
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <form
              ref={formRef}
              action={formAction}
              className="mx-auto max-w-lg relative"
            >
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

              {/* Brand-gradient halo behind the input — appears only on focus */}
              <div
                aria-hidden
                className="absolute -inset-1 rounded-full opacity-0 blur-[18px] transition-opacity duration-500 brand-gradient"
                style={{ opacity: isFocused ? 0.45 : 0 }}
              />

              <div
                className={`relative flex flex-col sm:flex-row gap-2 rounded-full bg-white/[0.04] p-1.5 border transition-all duration-300 ${
                  isFocused
                    ? "border-brand-led/50 bg-white/[0.06]"
                    : "border-white/[0.08]"
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
                  className="flex-1 bg-transparent px-5 py-3 text-[15px] text-white placeholder:text-white/35 focus:outline-none focus:shadow-none"
                  style={{ boxShadow: "none" }}
                />
                <SubmitButton />
              </div>

              {state && !state.ok && (
                <p
                  role="alert"
                  className="mt-3 text-[13px] text-brand-led"
                >
                  {state.error}
                </p>
              )}

              <p className="mt-5 text-[12px] text-white/40">
                We&rsquo;ll only email you about early access. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
