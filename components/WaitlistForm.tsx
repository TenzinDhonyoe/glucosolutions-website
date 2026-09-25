"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { joinWaitlist, type WaitlistResult } from "@/app/waitlist/actions";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Email capture used by the hero and the closing section. Posts to the
 * `joinWaitlist` server action (Supabase + KV rate limit). Designed for dark
 * photographic backgrounds.
 */
export function WaitlistForm({
  source,
  className,
}: {
  source: string;
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

  useEffect(() => {
    if (referrerRef.current) referrerRef.current.value = document.referrer.slice(0, 500);
  }, []);

  useEffect(() => {
    if (state?.ok) track("waitlist_submit", { source });
  }, [state, source]);

  if (state?.ok) {
    return (
      <div role="status" className={cn("max-w-[34rem]", className)}>
        <p className="flex items-start gap-3 text-[1.125rem] leading-snug text-white">
          <svg viewBox="0 0 20 20" aria-hidden className="mt-1 size-5 shrink-0 text-leaf">
            <circle cx="10" cy="10" r="9" fill="currentColor" />
            <path d="M6 10.4 8.6 13 14 7.5" fill="none" stroke="#0f2b2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>
            You&rsquo;re on the list. We&rsquo;ll email you when your invite is ready.
          </span>
        </p>
      </div>
    );
  }

  const error = state && !state.ok ? state.error : null;

  return (
    <form action={action} className={cn("max-w-[34rem]", className)} noValidate>
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
          "flex flex-col gap-2 rounded-[22px] bg-white/12 p-1.5 ring-1 backdrop-blur-md transition-shadow sm:flex-row sm:rounded-full",
          error ? "ring-gold" : "ring-white/25 focus-within:ring-white/60"
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
          placeholder="you@example.com"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[1.0625rem] text-white outline-none placeholder:text-white/55"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-full bg-gold px-6 py-3 text-[1.0625rem] font-bold text-pine transition-colors hover:bg-gold-soft disabled:cursor-progress disabled:opacity-80"
        >
          {pending ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-3 pl-4 text-[0.9375rem] text-gold-soft">
          {error}
        </p>
      ) : null}
    </form>
  );
}
