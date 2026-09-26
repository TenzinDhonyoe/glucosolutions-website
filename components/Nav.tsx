"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui";
import { ThemeToggle } from "@/components/ThemeToggle";

const LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav({
  transparentOverHero = false,
  revealUntilSelector,
}: {
  /** Homepage only: light text while the bar sits over the dark hero. */
  transparentOverHero?: boolean;
  /**
   * CSS selector for an element that must be fully read before the bar starts
   * hiding on scroll-down (e.g. the homepage mission statement). Until the user
   * scrolls past it, the bar always stays put. Omit for the default behavior,
   * where hide-on-scroll activates just past the top.
   */
  revealUntilSelector?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    lastYRef.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);

      // Point below which hide-on-scroll is suppressed: keep the bar visible
      // until the reveal target has been read (its bottom passes mid-viewport).
      let threshold = 120;
      if (revealUntilSelector) {
        const el = document.querySelector(revealUntilSelector);
        threshold = el
          ? el.getBoundingClientRect().bottom + y - window.innerHeight * 0.5
          : Infinity;
      }

      if (y <= threshold) {
        setHidden(false);
      } else {
        const dy = y - lastYRef.current;
        if (dy > 4) setHidden(true);
        else if (dy < -4) setHidden(false);
      }
      lastYRef.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealUntilSelector]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The bar keeps ONE fixed geometry — same size, position and padding always.
  // Scrolling only fades the pill *surface* (background, border, shadow) in, so
  // nothing reflows and the motion stays smooth. Light text only while the bar
  // is transparent over the dark hero image.
  const floating = scrolled || open;
  const light = transparentOverHero && !floating;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-5 will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        hidden && !open ? "-translate-y-[150%]" : "translate-y-0",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          // Only ONE layout property animates — max-width — so the side-shrink
          // stays smooth. Everything else is paint (surface) or constant.
          // At rest the bar uses the same measure and gutters as <Container>
          // (1320px, px-6 / md:px-10), so the wordmark lines up with the page
          // content. Floating, it narrows into a pill with a 16px inset.
          "mx-auto flex h-16 w-full items-center justify-between rounded-full border px-6 transition-[max-width,background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-10",
          floating
            ? "max-w-[min(1080px,calc(100%-2rem))] border-line bg-card/80 shadow-lg backdrop-blur-md"
            : "max-w-measure border-transparent bg-transparent shadow-none backdrop-blur-0",
        )}
      >
        <Wordmark
          href="/"
          size={22}
          className={cn("transition-[filter] duration-300", light && "brightness-0 invert")}
        />

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "text-[14px] font-medium transition-colors duration-300",
                  light
                    ? "text-white/75 hover:text-white"
                    : "text-ink-700 hover:text-ink-900",
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            href="/#waitlist"
            size="sm"
            pill
            iconRight={ArrowRight}
            className={cn(
              "hidden sm:inline-flex",
              light && "bg-white text-ink-900 hover:bg-white/85",
            )}
            onClick={() => track("cta_click", { location: "nav" })}
          >
            Join the waitlist
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex items-center justify-center rounded-md p-2 md:hidden",
              light ? "text-white" : "text-ink-700",
            )}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="mx-4 mt-2 overflow-hidden rounded-2xl border border-line bg-page/97 backdrop-blur-md md:hidden">
          <ul className="flex flex-col px-5 py-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[17px] font-medium text-ink-900"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Button
                href="/#waitlist"
                pill
                fullWidth
                iconRight={ArrowRight}
                onClick={() => {
                  track("cta_click", { location: "nav-mobile" });
                  setOpen(false);
                }}
              >
                Join the waitlist
              </Button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
