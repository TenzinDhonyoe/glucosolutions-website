"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { Wordmark } from "@/components/brand/Wordmark";

const LINKS = [
  { href: "#science", label: "How it works" },
  { href: "#problem", label: "Why it matters" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Top of page: nav rests over the dark hero photo (paper-tinted type, knockout wordmark).
  // Once scrolled past 24px, it collapses into a centered pill on paper bg.
  const onPhoto = !scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <nav
        aria-label="Primary"
        className={cn(
          "pointer-events-auto relative mx-auto grid grid-cols-[1fr_auto_1fr] items-center transition-[max-width,height,margin,padding,background-color,border-color,border-radius,box-shadow,color] duration-300 ease-out",
          scrolled || open
            ? "mt-3 max-w-4xl rounded-full border border-stone bg-paper/90 backdrop-blur-md px-4 sm:px-5 h-14 shadow-[0_10px_36px_-14px_rgba(28,28,28,0.20)] text-charcoal"
            : "mt-0 max-w-7xl rounded-none border border-transparent bg-transparent px-5 sm:px-8 h-20 md:h-24 text-paper"
        )}
      >
        {/* Left: links — slot is grid-balanced so the wordmark stays centered */}
        <ul className="hidden md:flex items-center gap-8 justify-self-start">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "text-[14px] font-medium transition-colors duration-220",
                  onPhoto
                    ? "text-paper/80 hover:text-paper"
                    : "text-charcoal/75 hover:text-charcoal"
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile spacer */}
        <div className="md:hidden" />

        {/* Center: wordmark — knockout over photo, default in pill */}
        <Link
          href="/"
          aria-label="Gluco Solutions home"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="justify-self-center inline-flex items-center hover:opacity-90 transition-opacity duration-220"
        >
          <Wordmark
            href={null}
            variant={onPhoto ? "knockout" : "default"}
            size={onPhoto ? 22 : 18}
            showMark={false}
          />
        </Link>

        {/* Right: CTA + mobile burger */}
        <div className="flex items-center gap-3 justify-self-end">
          <Link
            href="#waitlist"
            onClick={() => track("cta_click", { location: "nav" })}
            className={cn(
              "shine group hidden sm:inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[13px] font-medium transition-colors duration-220",
              onPhoto
                ? "border border-paper/35 bg-paper/10 text-paper hover:bg-paper hover:text-charcoal hover:border-paper"
                : "bg-sage text-paper hover:bg-sage-2"
            )}
          >
            Join the waitlist
            <ArrowRight
              size={14}
              className="transition-transform duration-220 ease-out group-hover:translate-x-0.5"
            />
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "md:hidden inline-flex items-center justify-center rounded-md p-2",
              onPhoto ? "text-paper" : "text-charcoal"
            )}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="pointer-events-auto md:hidden mt-2 mx-3 rounded-2xl border border-stone bg-paper/97 backdrop-blur-md shadow-[0_10px_40px_-12px_rgba(28,28,28,0.22)]"
        >
          <ul className="px-5 py-5 flex flex-col">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[18px] font-medium text-charcoal/85 hover:text-charcoal"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href="#waitlist"
                onClick={() => {
                  track("cta_click", { location: "nav-mobile" });
                  setOpen(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-sage text-paper px-5 py-3 text-[15px] font-medium"
              >
                Join the waitlist
                <ArrowRight size={15} />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
