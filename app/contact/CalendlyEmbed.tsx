"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

/**
 * CalendlyEmbed — inline scheduler that replaces the old mailto form. Booking
 * captures the invitee's name + email directly in Calendly (practice name and
 * the "between-session headache" live as custom invitee questions configured in
 * the Calendly event). On a completed booking we still fire the PostHog
 * `demo_request` event so analytics parity holds. Loads Calendly's widget
 * script lazily; no npm dependency.
 */
export function CalendlyEmbed({ url, className }: { url: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const init = () => {
      if (!window.Calendly || !el) return;
      el.innerHTML = ""; // guard against double-init on client navigation
      window.Calendly.initInlineWidget({ url, parentElement: el });
    };

    if (!document.querySelector("link[data-calendly]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = WIDGET_CSS;
      link.setAttribute("data-calendly", "true");
      document.head.appendChild(link);
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_JS}"]`);
    if (window.Calendly) {
      init();
    } else if (existing) {
      existing.addEventListener("load", init, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = WIDGET_JS;
      script.async = true;
      script.addEventListener("load", init, { once: true });
      document.body.appendChild(script);
    }

    // keep analytics parity: count completed bookings
    const onMessage = (e: MessageEvent) => {
      if (
        typeof e.data === "object" &&
        e.data?.event === "calendly.event_scheduled"
      ) {
        track("demo_request", { location: "contact", source: "calendly" });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [url]);

  return <div ref={ref} className={cn("h-[680px] w-full", className)} style={{ minWidth: 320 }} />;
}
