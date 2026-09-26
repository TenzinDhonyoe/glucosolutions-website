"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import { WaitlistForm } from "@/components/WaitlistForm";
import { HeroParticles, HERO_TIMELINE } from "@/components/home/HeroParticles";
import { STAGE_BACKGROUND } from "@/components/stage/Stage";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = ([a, b]: readonly [number, number], v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/**
 * The hero is a scroll track with a pinned stage. The band comes apart into
 * glucose molecules, it "locks on" to one and scans it, and the left column swaps the
 * pitch for an explanation of what you're seeing. Timings come from
 * HERO_TIMELINE so the copy and the canvas stay in step. Styles are written
 * straight to the DOM on scroll so nothing re-renders.
 */
export function Hero() {
  const trackRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const scatterRef = useRef<HTMLDivElement>(null);
  const [scattered, setScattered] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? clamp01(-rect.top / span) : 0;

      const out = smooth(HERO_TIMELINE.copyOut, p);
      if (copyRef.current) {
        copyRef.current.style.opacity = String(1 - out);
        copyRef.current.style.transform = `translateY(${-out * 24}px)`;
        copyRef.current.style.visibility = out > 0.98 ? "hidden" : "visible";
      }
      const idle = 1 - smooth([0, 0.05], p);
      if (hintRef.current) hintRef.current.style.opacity = String(idle);
      if (scatterRef.current) {
        scatterRef.current.style.opacity = String(idle);
        scatterRef.current.style.visibility = idle < 0.02 ? "hidden" : "visible";
      }
      const cap = smooth(HERO_TIMELINE.captionIn, p);
      if (captionRef.current) {
        captionRef.current.style.opacity = String(cap);
        captionRef.current.style.transform = `translateY(${(1 - cap) * 20}px)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Phones: the words sit under the band. Desktop: vertically centred on the
  // band, in the left column.
  const slot =
    "pointer-events-none absolute inset-x-0 bottom-0 lg:bottom-auto lg:top-1/2 lg:-translate-y-[42%]";

  return (
    <section ref={trackRef} id="top" aria-labelledby="hero-title" className="relative h-[190vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden" style={{ background: STAGE_BACKGROUND }}>
        <HeroParticles trackRef={trackRef} scattered={scattered} className="absolute inset-0" />

        {/* Copy ignores the pointer so hovering anywhere stirs the particles;
            only the form takes input. */}
        <div className={slot}>
          <div ref={copyRef} className="will-change-transform">
            <Container className="pb-10 lg:pb-0">
              <div className="max-w-[26rem]">
                <h1
                  id="hero-title"
                  className="text-[clamp(2rem,1.3rem+2.2vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.038em] text-ink-900 text-balance"
                >
                  See what moves your blood sugar.
                </h1>
                <p className="mt-4 text-[16px] leading-relaxed text-ink-500">
                  A needle-free wristband for people with prediabetes that shows how meals,
                  movement, sleep and stress affect your glucose.
                </p>
                <div className="pointer-events-auto mt-7">
                  <WaitlistForm source="hero" />
                </div>
              </div>
            </Container>
          </div>
        </div>

        <div className={slot}>
          <div ref={captionRef} className="opacity-0">
            <Container className="pb-10 lg:pb-0">
              <div className="max-w-[26rem]">
                <p className="text-[13px] font-medium text-ink-400">What the band reads</p>
                <p className="mt-3 text-[clamp(1.75rem,1.2rem+1.8vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink-900">
                  Glucose, C<sub className="text-[0.55em]">6</sub>H<sub className="text-[0.55em]">12</sub>O
                  <sub className="text-[0.55em]">6</sub>
                </p>
                <p className="mt-4 text-[16px] leading-relaxed text-ink-500">
                  Everything in your day, from meals and walks to sleep and stress, shows
                  up in the glucose in your blood. The band reads it through your skin and
                  tells you whether it&rsquo;s rising, steady or settling.
                </p>
              </div>
            </Container>
          </div>
        </div>

        <div
          ref={hintRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-10 hidden lg:block"
        >
          <Container className="text-[12px] text-ink-400">Scroll to see how it works</Container>
        </div>

        {/* A small toy: scatter the dots into a spectroscope (a beam of light
            split by a prism into a spectrum), then gather them back into the
            hand. Top right on phones (the copy owns the bottom), bottom right
            on desktop. */}
        <div
          ref={scatterRef}
          className="pointer-events-none absolute inset-x-0 top-[4.75rem] lg:bottom-9 lg:top-auto"
        >
          <Container className="flex justify-end">
            <button
              type="button"
              aria-pressed={scattered}
              onClick={() => setScattered((v) => !v)}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-3.5 py-1.5 text-[13px] font-medium text-ink-700 backdrop-blur transition-colors duration-300 hover:border-line-2 hover:text-ink-900"
            >
              <span aria-hidden className={cn("size-1.5 rounded-full bg-signal", scattered && "animate-pulse")} />
              {scattered ? "Gather" : "Scatter"}
            </button>
          </Container>
        </div>
      </div>
    </section>
  );
}
