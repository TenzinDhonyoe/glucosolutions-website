"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Field, Input, Textarea, Button } from "@/components/ui";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const DEMO_EMAIL = "tenzin@glucosolutions.ca";

/**
 * ContactForm — the 4-field demo request (name, email, practice, headache).
 * The last field is qualifying + discovery data.
 *
 * Submission opens a prefilled email so the request reaches a real inbox until
 * a calendar/CRM backend is added.
 */
export function ContactForm({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={cn("rounded-xl border border-line bg-card p-8 text-center shadow-sm", className)}>
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
        const form = e.currentTarget;
        const data = new FormData(form);
        const name = data.get("name")?.toString().trim() || "Demo request";
        const email = data.get("email")?.toString().trim() || "";
        const practice = data.get("practice")?.toString().trim() || "";
        const headache = data.get("headache")?.toString().trim() || "";
        const subject = `Demo request from ${name}`;
        const body = [
          "New GlucoSolutions demo request",
          "",
          `Name: ${name}`,
          `Email: ${email}`,
          `Practice: ${practice || "Not provided"}`,
          "",
          "Between-session headache:",
          headache || "Not provided",
        ].join("\n");

        track("demo_request", { location: "contact" });
        window.location.href = `mailto:${DEMO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
      className={cn(
        "rounded-xl border border-line bg-card p-7 shadow-sm sm:p-8",
        compact && "p-5 shadow-lg sm:p-5",
        className,
      )}
    >
      <div className={compact ? "space-y-3" : "space-y-5"}>
        <Field label="Name" htmlFor="name">
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={compact ? "py-2" : undefined}
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@practice.ca"
            className={compact ? "py-2" : undefined}
          />
        </Field>
        <Field label="Practice name" htmlFor="practice">
          <Input
            id="practice"
            name="practice"
            placeholder="Your practice"
            className={compact ? "py-2" : undefined}
          />
        </Field>
        <Field
          label="What's your biggest between-session headache?"
          htmlFor="headache"
          hint={compact ? undefined : "Optional, but it helps us tailor the walkthrough to your caseload."}
        >
          <Textarea
            id="headache"
            name="headache"
            rows={compact ? 2 : 3}
            placeholder="e.g. I lose the thread on patients between monthly visits."
            className={compact ? "py-2" : undefined}
          />
        </Field>
      </div>
      <Button
        type="submit"
        size="lg"
        pill
        fullWidth
        iconRight={ArrowRight}
        className={compact ? "mt-4" : "mt-7"}
      >
        Request a demo
      </Button>
    </form>
  );
}
