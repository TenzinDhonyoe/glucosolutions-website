import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button, PlusTag } from "@/components/ui";

const BENEFITS = ["See the weeks between", "Cut the admin", "Prove outcomes"];

export function Hero() {
  return (
    // Framed hero — fills one screen with an even cream bezel on all four
    // sides. The fixed nav floats in front of this image (transparentOverHero).
    <section className="flex h-[100svh] min-h-[640px] flex-col p-4">
        <div className="relative mx-auto flex w-full max-w-[1600px] grow overflow-hidden rounded-[1.75rem] ring-1 ring-ink-900/10">
          <Image
            src="/hero-runner.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 1600px) 100vw, 1600px"
            className="object-cover object-[60%_center]"
          />
          {/* legibility gradient — warm ink-900, heavy left, clears to the sunset */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(95deg, rgba(43,38,32,0.92) 0%, rgba(43,38,32,0.74) 38%, rgba(43,38,32,0.30) 72%, rgba(43,38,32,0.10) 100%)",
            }}
          />

          {/* content — main block vertically centered, chips pinned to the base */}
          <div className="relative z-10 flex h-full w-full flex-col px-8 py-10 sm:px-12 sm:py-12 md:px-16 md:py-14">
            <div className="flex flex-1 flex-col justify-center">
              <div className="max-w-2xl">
                <h1 className="display-serif text-[clamp(2.4rem,4.8vw,3.9rem)] text-page text-balance">
                  Know what your patients do between sessions.
                </h1>
                <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-page/80">
                  A session lasts an hour. The behavior that decides the outcome
                  happens in the weeks between. We turn what your clients actually
                  log into a read on those weeks, and show the source of every
                  number.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href="/contact" size="lg" pill iconRight={ArrowRight}>
                    Book a demo
                  </Button>
                  <Button
                    href="/#how"
                    size="lg"
                    variant="ghost"
                    iconRight={ArrowDown}
                    className="text-page hover:bg-page/10"
                  >
                    See how it works
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {BENEFITS.map((b) => (
                <PlusTag key={b} tone="light">
                  {b}
                </PlusTag>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}
