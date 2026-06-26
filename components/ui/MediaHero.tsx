"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/* Same house easing + reveal as the scroll-motion toolkit, so the hero opens
   with the page's signature choreography. */
const EASE = [0.22, 0.61, 0.21, 1] as const;

type Wash = "left" | "bottom" | "center";
type Size = "tall" | "compact";

const SIZES: Record<Size, string> = {
  tall: "min-h-[clamp(560px,86svh,920px)]",
  compact: "min-h-[clamp(440px,62svh,640px)]",
};

/* Warm ink-900 legibility washes — heavier where the text sits. */
const WASHES: Record<Wash, string> = {
  left: "linear-gradient(95deg, rgba(43,38,32,0.92) 0%, rgba(43,38,32,0.74) 38%, rgba(43,38,32,0.30) 72%, rgba(43,38,32,0.08) 100%)",
  bottom:
    "linear-gradient(180deg, rgba(43,38,32,0.55) 0%, rgba(43,38,32,0.22) 36%, rgba(43,38,32,0.66) 100%)",
  center:
    "radial-gradient(120% 90% at 50% 50%, rgba(43,38,32,0.30) 0%, rgba(43,38,32,0.66) 100%)",
};

/**
 * MediaHero — the cinematic subpage opening. Mirrors the homepage Hero: a
 * full-bleed warm photo inside a rounded bezel with an even cream margin, a warm
 * ink wash for legibility, and light editorial type that reveals on load with
 * the site's house easing. Pair the page's <Nav> with `transparentOverHero` so
 * the bar floats in light over the image.
 */
export function MediaHero({
  image,
  imageAlt = "",
  eyebrow,
  title,
  lead,
  children,
  objectPosition = "center",
  wash = "left",
  size = "tall",
  align = "left",
  priority = true,
}: {
  image: string;
  imageAlt?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  objectPosition?: string;
  wash?: Wash;
  size?: Size;
  align?: "left" | "center";
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const centered = align === "center";

  // Staggered reveal: eyebrow → title → lead → CTA. A soft rise + fade.
  const item = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.3 : 0.8, ease: EASE, delay: 0.15 + i * 0.12 },
  });

  return (
    <section className={cn("flex flex-col px-4 pt-4", SIZES[size])}>
      <div className="relative mx-auto flex w-full max-w-[1600px] grow overflow-hidden rounded-[1.75rem] ring-1 ring-ink-900/10">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 1600px) 100vw, 1600px"
          className="object-cover"
          style={{ objectPosition }}
        />
        <div aria-hidden className="absolute inset-0" style={{ background: WASHES[wash] }} />

        <div
          className={cn(
            "relative z-10 flex h-full w-full flex-col justify-center px-8 py-16 sm:px-12 md:px-16",
            centered && "items-center text-center",
          )}
        >
          <div className={cn("w-full", centered ? "max-w-2xl" : "max-w-2xl")}>
            {eyebrow ? (
              <motion.p
                {...item(0)}
                className={cn(
                  "font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-page/70",
                  centered && "mx-auto",
                )}
              >
                <span className="mr-2 text-page/40">~</span>
                {eyebrow}
              </motion.p>
            ) : null}

            <motion.h1
              {...item(1)}
              className="display-serif mt-5 text-[clamp(2.4rem,5vw,3.9rem)] text-page text-balance"
            >
              {title}
            </motion.h1>

            {lead ? (
              <motion.p
                {...item(2)}
                className={cn(
                  "mt-6 max-w-xl text-[18px] leading-relaxed text-page/80",
                  centered && "mx-auto",
                )}
              >
                {lead}
              </motion.p>
            ) : null}

            {children ? (
              <motion.div
                {...item(3)}
                className={cn(
                  "mt-8 flex flex-wrap items-center gap-3",
                  centered && "justify-center",
                )}
              >
                {children}
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
