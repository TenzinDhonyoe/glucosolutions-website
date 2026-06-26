"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Field, Input, Textarea, Button } from "@/components/ui";
import { track } from "@/lib/analytics";

/**
 * ContactForm — the 4-field demo request (name, email, practice, headache).
 * The last field is qualifying + discovery data.
 *
 * NOTE: submission is client-side only for now (shows a success state).
 * [CONFIRM] wire to Calendly or a real backend/CRM before launch.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-xl border border-line bg-card p-8 text-center shadow-sm">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-good-bg text-good">
          <Check size={24} aria-hidden />
        </span>
        <h2 className="display-serif mt-4 text-2xl text-ink-900">Thanks, you&apos;re on the list.</h2>
        <p className="mt-3 text-[16px] text-ink-500">
          We&apos;ll be in touch within one business day to find a time.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        track("demo_request", { location: "contact" });
        setSent(true);
      }}
      className="rounded-xl border border-line bg-card p-7 shadow-sm sm:p-8"
    >
      <div className="space-y-5">
        <Field label="Name" htmlFor="name">
          <Input id="name" name="name" required autoComplete="name" placeholder="Your name" />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@practice.ca" />
        </Field>
        <Field label="Practice name" htmlFor="practice">
          <Input id="practice" name="practice" placeholder="Your practice" />
        </Field>
        <Field
          label="What's your biggest between-session headache?"
          htmlFor="headache"
          hint="Optional, but it helps us tailor the walkthrough to your caseload."
        >
          <Textarea id="headache" name="headache" rows={3} placeholder="e.g. I lose the thread on patients between monthly visits." />
        </Field>
      </div>
      <Button type="submit" size="lg" pill fullWidth iconRight={ArrowRight} className="mt-7">
        Request a demo
      </Button>
    </form>
  );
}
