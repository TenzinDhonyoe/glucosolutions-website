import { ArrowRight } from "lucide-react";
import { Container, Button } from "@/components/ui";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-24 md:py-32">
      {/* palette-matched brand accent, kept subtle — no neon glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--brand-gradient)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-80 w-80 rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "var(--brand-gradient)" }}
      />
      <Container className="relative text-center">
        <h2 className="display-serif mx-auto max-w-2xl text-[clamp(2rem,4vw,3rem)] text-page text-balance">
          See it on your own caseload.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[18px] leading-relaxed text-page/70">
          A 20-minute walkthrough on a real, de-identified case. No slides.
        </p>
        <div className="mt-9 flex justify-center">
          <Button href="/contact" size="lg" pill variant="secondary" iconRight={ArrowRight}>
            Book a demo
          </Button>
        </div>
      </Container>
    </section>
  );
}
