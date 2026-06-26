import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow, Button } from "@/components/ui";
import { Reveal, Parallax } from "@/components/motion";
import { PhoneFrame } from "./PhoneFrame";

export function ReduTeaser() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, var(--color-page) 0%, #EFF8FB 100%)" }}
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <Reveal variant="left">
            <Eyebrow slash>Redu</Eyebrow>
            <h2 className="display-serif mt-5 text-[clamp(2rem,4.4vw,3.2rem)] text-ink-900 text-balance">
              Redu is the patient&apos;s half of the system.
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-500">
              Redu is the app your patients actually use. Low-friction logging, a
              second-chance framing that keeps people coming back, and the
              engagement that makes everything above possible. Included with your
              subscription at no cost to your patients.
            </p>
            <Button href="/redu" variant="ghost" iconRight={ArrowRight} className="mt-7 -ml-4">
              More about Redu
            </Button>
          </Reveal>

          <Reveal variant="scale" className="order-first lg:order-last">
            <Parallax offset={36}>
              <PhoneFrame>
                <Image
                  src="/redu-app.png"
                  alt="The Redu patient app home screen: metabolic score, personalized tips, and daily logging."
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </PhoneFrame>
            </Parallax>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
