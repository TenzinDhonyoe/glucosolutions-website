import { EyeOff, Clock, LineChart } from "lucide-react";
import { Container, Card, Eyebrow } from "@/components/ui";
import type { IconType } from "@/components/ui";

const PAINS: { icon: IconType; title: string; body: string }[] = [
  {
    icon: EyeOff,
    title: "Blind between visits",
    body: "Behavior, glucose, and adherence drift the moment the session ends. You find out a month later.",
  },
  {
    icon: Clock,
    title: "Admin eats billable time",
    body: "Chart review, log-scraping, and session prep happen on unpaid hours.",
  },
  {
    icon: LineChart,
    title: "Outcomes you can't show",
    body: "Referring physicians send patients on faith. Without clean outcome data, you can't earn the next referral.",
  },
];

export function Problem() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Eyebrow number="01">The gap</Eyebrow>
        <h2 className="display-serif mt-4 max-w-3xl text-[clamp(1.9rem,3.6vw,2.7rem)] text-ink-900 text-balance">
          The gap isn't your skill. It's the 29 days you can't see.
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PAINS.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                <Icon size={20} aria-hidden />
              </span>
              <h3 className="mt-5 font-serif text-xl text-ink-900">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
