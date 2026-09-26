"use client";

import { useRef } from "react";
import { Container } from "@/components/ui";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ParticleFigure } from "@/components/stage/ParticleFigure";
import { STAGE_BACKGROUND, FloorGrid, ContactShadow } from "@/components/stage/Stage";

/**
 * Closing stage: the band, live and slowly turning in a field of drifting
 * dots that answer the pointer anywhere in the section; the ask bottom-left.
 */
export function Waitlist() {
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section
      ref={sectionRef}
      id="waitlist"
      aria-labelledby="waitlist-title"
      className="relative h-[max(640px,min(100svh,860px))] scroll-mt-0 overflow-hidden"
      style={{ background: STAGE_BACKGROUND }}
    >
      <FloorGrid />
      <ContactShadow className="left-1/2 top-[52%] h-10 w-[60%] -translate-x-1/2 lg:left-[63%] lg:top-[70%] lg:w-[34%]" />
      <ParticleFigure scene="closing" pointerArea={sectionRef} className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <Container className="pb-12 md:pb-16">
          <div className="pointer-events-auto max-w-[34rem]">
            <p className="text-[13px] font-medium text-ink-400">Join the waitlist</p>
            <h2
              id="waitlist-title"
              className="mt-3 text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ink-900"
            >
              <span className="block">Prediabetes is silent.</span>
              <span className="block">Until it isn&rsquo;t.</span>
            </h2>
            <p className="mt-4 max-w-[26rem] text-[16px] leading-relaxed text-ink-500">
              We&rsquo;ll email you when it&rsquo;s your turn. Invites go out in small groups,
              starting in Canada.
            </p>
            <div className="mt-7">
              <WaitlistForm source="closing" />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
