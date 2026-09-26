"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { joinWaitlist, type WaitlistResult } from "@/app/waitlist/actions";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light";

/**
 * Email capture for the waitlist. Posts to the `joinWaitlist` server action
 * (Supabase insert + KV rate limit). `tone` is the surface it sits on.
 */
export function WaitlistForm({
  source,
  tone = "light",
  className,
}: {
  source: string;
  tone?: Tone;
  className?: string;
}) {
  const [state, action, pending] = useActionState<WaitlistResult | null, FormData>(
    joinWaitlist,
    null
  );
  const referrerRef = useRef<HTMLInputElement>(null);
  // Controlled so the address survives React's post-action form reset when
  // the server sends back an error.
  const [email, setEmail] = useState("");
  const id = useId();
  const errorId = `${id}-error`;
  const dark = tone === "dark";

  useEffect(() => {
    if (referrerRef.current) referrerRef.current.value = document.referrer.slice(0, 500);
  }, []);

  useEffect(() => {
    if (state?.ok) track("waitlist_submit", { source });
  }, [state, source]);

  if (state?.ok) {
    return (
      <p
        role="status"
        className={cn(
          "inline-flex items-center gap-2.5 text-[15px]",
          dark ? "text-white" : "text-ink-900",
          className
        )}
      >
        <span
          className={cn(
            "grid size-6 place-items-center rounded-full",
            dark ? "bg-white text-ink-900" : "bg-ink-900 text-on-ink"
          )}
        >
          <Check size={14} strokeWidth={2.5} aria-hidden />
        </span>
        You&rsquo;re on the list. We&rsquo;ll email you when your invite is ready.
      </p>
    );
  }

  const error = state && !state.ok ? state.error : null;

  return (
    <form action={action} className={cn("w-full max-w-md", className)} noValidate>
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="referrer" ref={referrerRef} />
      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="hp" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-full border p-1.5 transition-colors",
          dark
            ? "border-white/15 bg-white/[0.06] backdrop-blur-md focus-within:border-white/40"
            : "border-line bg-card shadow-sm focus-within:border-ink-400",
          error && (dark ? "border-red-400/70" : "border-signal/60")
        )}
      >
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "min-w-0 flex-1 bg-transparent pl-4 text-[15px] outline-none",
            dark ? "text-white placeholder:text-white/45" : "text-ink-900 placeholder:text-ink-400"
          )}
        />
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full px-5 py-2.5 text-[14px] font-semibold transition-colors disabled:cursor-progress disabled:opacity-70",
            dark ? "bg-white text-ink-900 hover:bg-white/85" : "bg-ink-900 text-on-ink hover:bg-ink-700"
          )}
        >
          {pending ? "Joining…" : "Join the waitlist"}
          {pending ? null : <ArrowRight size={15} aria-hidden />}
        </button>
      </div>
      {error ? (
        <p
          id={errorId}
          role="alert"
          className={cn("mt-2.5 pl-5 text-[13.5px]", dark ? "text-red-300" : "text-signal")}
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
