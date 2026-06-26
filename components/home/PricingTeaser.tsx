import { ArrowRight } from "lucide-react";
import { Container, Eyebrow, Button, Card } from "@/components/ui";

export function PricingTeaser() {
  return (
    <section className="bg-sunken py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow number="07" className="justify-center">
            Pricing
          </Eyebrow>
          <h2 className="display-serif mt-4 text-[clamp(1.9rem,3.6vw,2.7rem)] text-ink-900">
            One plan. Everything included.
          </h2>

          <Card className="mt-8 p-8" shadow="md">
            {/* [CONFIRM] patient cap / per-seat math + pilot pricing — content.md open Q1, Q2 */}
            <div className="flex items-baseline justify-center gap-2">
              <span className="tnum text-5xl font-medium text-ink-900">$199</span>
              <span className="text-[16px] text-ink-500">/ month · per practice</span>
            </div>
            <p className="mt-4 text-[15px] text-ink-500">
              Redu included for your patients. Cancel anytime.
            </p>
            <div className="mt-7 flex justify-center">
              <Button href="/pricing" pill iconRight={ArrowRight}>
                See pricing
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
