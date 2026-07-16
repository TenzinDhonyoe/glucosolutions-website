"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — momentum scrolling via Lenis. This is the single biggest lever
 * on how "premium" the page feels: the wheel/trackpad eases into position rather
 * than jumping 1:1. Native `scroll-behavior: smooth` only covers anchor jumps;
 * Lenis covers every wheel tick.
 *
 * - Disabled entirely for `prefers-reduced-motion` (we never hijack scroll then).
 * - Disabled on coarse pointers (touch) so phones keep their native fling.
 * - Same-page hash links are routed through `lenis.scrollTo` so "See how it
 *   works" eases down instead of teleporting.
 *
 * framer-motion's `useScroll` / `whileInView` keep working unchanged — Lenis
 * drives the real window scroll position and fires native scroll events.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("nolenis")) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isTouch) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Route in-page hash links through Lenis for an eased scroll.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href*="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      const samePage =
        url.pathname === window.location.pathname &&
        url.search === window.location.search;
      if (!samePage || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -90 });
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
