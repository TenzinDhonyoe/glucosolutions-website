import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { FactCard } from "./FactCard";

export function Provenance() {
  return (
    <section className="bg-card py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="left">
            <Eyebrow slash>Provenance</Eyebrow>
            <h2 className="display-serif mt-5 text-[clamp(2rem,4.4vw,3.2rem)] text-ink-900 text-balance">
              AI insight that shows its work.
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-500">
              Most AI tools hand you a conclusion and hide the math. GlucoSolutions
              does the opposite. Every interpretation traces to the exact data it
              came from, shows the reasoning steps, and shows how each data point
              was used, so you can trust it, correct it, and defend it to a
              physician.
            </p>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-700">
              You stay the clinician. The software just stops hiding its evidence.
            </p>
          </Reveal>

          <Reveal variant="right" className="lg:pl-4">
            <FactCard />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
