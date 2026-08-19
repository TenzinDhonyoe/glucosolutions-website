import { Stethoscope, HeartPulse } from "lucide-react";
import { Container, Eyebrow, Card, type IconType } from "@/components/ui";
import { Reveal } from "@/components/motion";

const AUDIENCES: { icon: IconType; title: string; body: string }[] = [
  {
    icon: Stethoscope,
    title: "For healthcare providers",
    body: "A dashboard that briefs you before every session — what your patient actually did between visits, interpreted into sourced facts you can check and act on in minutes, not chart-review hours.",
  },
  {
    icon: HeartPulse,
    title: "For their patients",
    body: "Redu, the companion app patients actually keep using. Meals, glucose, and activity logged in seconds, with a second-chance framing that keeps them engaged between appointments — at no cost to them.",
  },
];

/**
 * BuiltFor — the "who it's for" band: GlucoSolutions is one system with two
 * halves, built for the clinic on one side and the patient on the other. Same
 * framed-card treatment as the hero/footer bezel.
 */
export function BuiltFor() {
  return (
    <section className="pt-20 pb-0 md:pt-28">
      <div className="px-4">
        <div className="mx-auto max-w-[1600px] rounded-[1.75rem] bg-card ring-1 ring-ink-900/10">
          <Container className="py-14 md:py-20">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal variant="left">
                <Eyebrow slash>Who it&apos;s for</Eyebrow>
                <h2 className="display-serif mt-5 text-[clamp(2rem,4.4vw,3.2rem)] text-ink-900 text-balance">
                  Built for healthcare providers and their patients.
                </h2>
                <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-500">
                  Prediabetes care happens on two sides of the clinic door.
                  GlucoSolutions is built for both: providers get the between-visit
                  picture they never had, and patients get an app that makes the
                  daily work of reversal feel doable.
                </p>
                <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-700">
                  One connected system, so nobody manages prediabetes alone.
                </p>
              </Reveal>

              <Reveal variant="right" className="lg:pl-4">
                <div className="space-y-5">
                  {AUDIENCES.map(({ icon: Icon, title, body }) => (
                    <Card key={title} className="p-7" shadow="lg">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-good-bg text-sky-700">
                          <Icon size={19} aria-hidden />
                        </span>
                        <h3 className="font-serif text-[22px] leading-snug text-ink-900">
                          {title}
                        </h3>
                      </div>
                      <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
                        {body}
                      </p>
                    </Card>
                  ))}
                </div>
              </Reveal>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
