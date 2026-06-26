"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui";

const LINKS = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/security", label: "Security" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-colors duration-300",
          scrolled || open
            ? "border-b border-line bg-page/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6 md:px-10"
        >
          <Wordmark href="/" size={30} />

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[14px] font-medium text-ink-700 transition-colors hover:text-ink-900"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              href="/contact"
              size="sm"
              pill
              iconRight={ArrowRight}
              className="hidden sm:inline-flex"
              onClick={() => track("cta_click", { location: "nav" })}
            >
              Book a demo
            </Button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-md p-2 text-ink-700 md:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {open ? (
        <div className="border-b border-line bg-page/97 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex max-w-[1120px] flex-col px-6 py-4">
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
                href="/contact"
                pill
                fullWidth
                iconRight={ArrowRight}
                onClick={() => {
                  track("cta_click", { location: "nav-mobile" });
                  setOpen(false);
                }}
              >
                Book a demo
              </Button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
