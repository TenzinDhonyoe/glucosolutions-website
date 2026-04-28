"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

const LINKS = [
  { href: "#science", label: "How it works" },
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
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <nav
        aria-label="Primary"
        className={cn(
          "pointer-events-auto relative mx-auto grid grid-cols-[1fr_auto_1fr] items-center transition-[max-width,height,margin,padding,background-color,border-color,border-radius,box-shadow] duration-200 ease-out",
          scrolled || open
            ? "mt-3 max-w-3xl rounded-full border border-white/10 bg-ink-0/70 backdrop-blur-xl px-4 sm:px-5 h-14 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
            : "mt-0 max-w-7xl rounded-none border border-transparent bg-transparent px-5 sm:px-8 h-20 md:h-24"
        )}
      >
        {/* Left: links */}
        <ul className="hidden md:flex items-center gap-9 justify-self-start">
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

        {/* Mobile: empty left slot to keep grid balanced */}
        <div className="md:hidden" />

        {/* Center: wordmark */}
        <Link
          href="/"
          aria-label="GlucoSolutions home"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="justify-self-center inline-flex items-center hover:opacity-90 transition-opacity"
        >
          <Image
            src="/wordmark.png"
            alt="GlucoSolutions"
            width={1920}
            height={300}
            priority
            className="h-5 sm:h-6 w-auto"
          />
        </Link>

        {/* Right: CTA + mobile menu button */}
        <div className="flex items-center gap-3 justify-self-end">
          <Link
            href="#waitlist"
            onClick={() => track("cta_click", { location: "nav" })}
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-white/30 bg-white/[0.12] px-4 py-2 text-[13px] font-semibold text-white hover:bg-white hover:text-ink-0 hover:border-white transition-all"
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
          className="pointer-events-auto md:hidden mt-2 mx-3 rounded-2xl border border-white/10 bg-ink-0/90 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
        >
          <ul className="px-5 py-5 flex flex-col">
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
