import { ArrowRight, ArrowDown } from "lucide-react";
import { Container, Button, Eyebrow } from "@/components/ui";
import { HeroDashboard } from "./HeroDashboard";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* soft tonal lift behind the hero, palette-matched (no AI glow) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "linear-gradient(180deg, #FBF7F0 0%, var(--color-page) 100%)",
        }}
      />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>For solo private-practice dietitians</Eyebrow>
            <h1 className="display-serif mt-5 text-[clamp(2.5rem,5.5vw,4rem)] text-ink-900 text-balance">
              Know what your patients do between sessions.
            </h1>
            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-ink-500">
              You see a patient once a month. Their behavior happens the other 29
              days. GlucoSolutions turns that daily behavior into sourced clinical
              insight — and cuts the admin around every appointment. Patients log
              in Redu; you see what matters in one dashboard.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/contact" size="lg" pill iconRight={ArrowRight}>
                Book a demo
              </Button>
              <Button href="/#how" size="lg" variant="ghost" iconRight={ArrowDown}>
                See how it works
              </Button>
            </div>
            {/* [CONFIRM] credibility line — safe singular phrasing per content.md */}
            <p className="mt-7 text-[14px] text-ink-500">
              Built with a practicing RD on real, de-identified client cases.
            </p>
          </div>

          <div className="lg:pl-4">
            <HeroDashboard />
          </div>
        </div>
      </Container>
    </section>
  );
}
