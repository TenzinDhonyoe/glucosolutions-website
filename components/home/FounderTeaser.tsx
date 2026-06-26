import { ArrowRight } from "lucide-react";
import { Container, Eyebrow, Button } from "@/components/ui";

export function FounderTeaser() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow number="08">Why us</Eyebrow>
          <h2 className="display-serif mt-4 text-[clamp(1.9rem,3.6vw,2.7rem)] text-ink-900">
            Why we built this.
          </h2>
          {/* [Tenz CONFIRM] hardware origin story on the public site — content.md §10 */}
          <p className="mt-6 text-[18px] leading-relaxed text-ink-500">
            We started building hardware to track glucose and learned the real
            bottleneck wasn't the sensor — it was the dietitian's workflow. So we
            built for the clinician.
          </p>
          <Button href="/about" variant="ghost" iconRight={ArrowRight} className="mt-6 -ml-4">
            Meet the team
          </Button>
        </div>
      </Container>
    </section>
  );
}
