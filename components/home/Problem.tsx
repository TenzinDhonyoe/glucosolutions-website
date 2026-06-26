import { Container, Eyebrow } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, DrawLine, CountUp } from "@/components/motion";

const PAINS: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Blind between visits",
    body: "Behavior, glucose, and adherence drift the moment the session ends. You find out a month later.",
  },
  {
    n: "02",
    title: "Admin eats billable time",
    body: "Chart review, log-scraping, and session prep happen on unpaid hours.",
  },
  {
    n: "03",
    title: "Outcomes you can't show",
    body: "Referring physicians send patients on faith. Without clean outcome data, you can't earn the next referral.",
  },
];

export function Problem() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <Eyebrow slash>The gap</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-serif mt-5 max-w-4xl text-[clamp(2rem,4.4vw,3.2rem)] text-ink-900 text-balance">
            The gap isn&apos;t your skill. It&apos;s the{" "}
            <CountUp to={29} className="tnum text-sky-600" /> days you can&apos;t see.
          </h2>
        </Reveal>

        <DrawLine className="mt-14 h-px w-full bg-line" />
        <Stagger className="grid gap-px md:grid-cols-3" stagger={0.12}>
          {PAINS.map(({ n, title, body }) => (
            <StaggerItem
              key={n}
              className="border-line pt-7 md:border-l md:pl-8 md:first:border-l-0 md:first:pl-0"
            >
              <div className="tnum text-[15px] font-medium text-sky-600">{n}</div>
              <h3 className="mt-4 font-serif text-[22px] text-ink-900">{title}</h3>
              <p className="mt-2.5 max-w-xs text-[15px] leading-relaxed text-ink-500">
                {body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
