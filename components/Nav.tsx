"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/#band", label: "The band" },
  { href: "/#faq", label: "Questions" },
];

/**
 * Site header. With `overHero`, it starts transparent on top of the hero
 * photograph and turns solid as soon as the page scrolls. The waitlist button
 * waits until the hero has scrolled away, because while the hero is visible
 * its own form is the ask.
 */
export function Nav({ overHero = false }: { overHero?: boolean }) {
  const [solid, setSolid] = useState(!overHero);
  const [heroGone, setHeroGone] = useState(!overHero);

  useEffect(() => {
    if (!overHero) return;
    const hero = document.getElementById("top");
    const onScroll = () => {
      setSolid(window.scrollY > 24);
      setHeroGone(hero ? window.scrollY > hero.offsetHeight - 160 : true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [overHero]);

  const showCta = heroGone;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300",
        solid
          ? "bg-paper/90 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
          : "bg-transparent text-white"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-page items-center justify-between gap-6 px-5 sm:px-8">
        <Logo tone={solid ? "dark" : "light"} />

        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[15px] transition-colors",
                    solid ? "text-ink-soft hover:text-ink" : "text-white/80 hover:text-white"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#join"
            tabIndex={showCta ? 0 : -1}
            aria-hidden={!showCta}
            className={cn(
              "ml-2 rounded-full bg-gold px-4 py-2 text-[15px] font-bold text-pine transition-[opacity,transform,background-color] duration-300 hover:bg-gold-soft",
              showCta ? "opacity-100" : "pointer-events-none translate-y-1 opacity-0"
            )}
          >
            Join the waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
