"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

const LINKS = [
  { href: "#science", label: "Science" },
  { href: "#how", label: "How it works" },
  { href: "#team", label: "Team" },
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-ink-0/75 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 h-16 md:h-[72px]"
      >
        <Logo variant="light" size={28} />

        <ul className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[14px] font-medium text-white/65 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="#waitlist"
            onClick={() => track("cta_click", { location: "nav" })}
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[13px] font-semibold text-white hover:bg-white/[0.08] hover:border-white/25 transition-all"
          >
            Join waitlist
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-white/[0.06] bg-ink-0/95 backdrop-blur-xl"
        >
          <ul className="mx-auto max-w-7xl px-5 py-5 flex flex-col">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[18px] font-semibold text-white/85 hover:text-white"
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
                className="block w-full text-center rounded-full border border-white/15 bg-white/[0.06] px-4 py-3 text-[15px] font-semibold text-white"
              >
                Join the waitlist
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
