import { ClipboardList, MessageSquareText, FileText } from "lucide-react";
import { Container, Card, Eyebrow, FeatureStatus, StatusPill, PlusTag } from "@/components/ui";
import { GlucoseChart } from "@/components/ui/GlucoseChart";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { DataFunnel } from "./DataFunnel";
import { cn } from "@/lib/utils";

/* ---- per-block visuals, built from primitives ---- */

function SummaryVisual() {
  return (
    <Card className="p-6" shadow="md">
      <div className="mono-label mb-4 flex items-center gap-2">
        <ClipboardList size={13} aria-hidden /> Pre-session summary
      </div>
      <ul className="space-y-3 text-[14px] text-ink-700">
        {[
          "Glucose steadier on weekdays than weekends",
          "Logging consistency up to 6 of 7 days",
          "Two post-dinner spikes flagged for review",
        ].map((t) => (
          <li key={t} className="flex gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600" />
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t border-line pt-4">
        <StatusPill state="good">Session prep ready</StatusPill>
      </div>
    </Card>
  );
}

function ContinuityVisual() {
  return (
    <Card className="p-6" shadow="md">
      <GlucoseChart className="border-0 p-0 shadow-none" title="This week · day to day" />
      <div className="mt-5 flex items-start gap-3 rounded-lg bg-sky-50 p-3.5">
        <MessageSquareText size={18} className="mt-0.5 shrink-0 text-sky-700" aria-hidden />
        <p className="text-[14px] text-ink-700">
          “Nice work pairing carbs with protein at lunch. That flattened your
          afternoon. Let&apos;s keep it going this week.”
        </p>
      </div>
    </Card>
  );
}

function OutcomesVisual() {
  return (
    <Card className="p-6" shadow="md" warm>
      <div className="mono-label mb-4 flex items-center gap-2">
        <FileText size={13} aria-hidden /> Outcomes report · preview
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { k: "Fibre intake", v: "27g" },
          { k: "Active days", v: "5/7" },
          { k: "Avg sleep", v: "7.2h" },
        ].map((s) => (
          <div key={s.k} className="rounded-lg border border-line bg-card p-3">
            <div className="text-[12px] text-ink-500">{s.k}</div>
            <div className="tnum mt-1 text-xl font-medium text-ink-900">{s.v}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13px] text-ink-500">
        Physician-ready summary · building this now with our launch RD.
      </p>
    </Card>
  );
}

const BLOCKS = [
  {
    status: "available" as const,
    title: "Workflow automation",
    body: "Pre-session summaries, auto-organized logs, and less time charting. Walk in already knowing what changed.",
    tags: ["Pre-session summaries", "Auto-organized logs", "Less charting"],
    visual: <SummaryVisual />,
  },
  {
    status: "available" as const,
    title: "Between-session continuity",
    body: "A live view of patient behavior, day to day. Message in-app, catch drift in week two instead of week four.",
    tags: ["Live behavior view", "In-app messaging", "Drift alerts"],
    visual: <ContinuityVisual />,
  },
  {
    status: "in-development" as const,
    title: "Outcomes reporting",
    body: "One-click reports for referring physicians, covering glucose trends, habits, and behavior change, formatted to win the next referral.",
    tags: ["Glucose trends", "Habits", "Physician-ready"],
    visual: <OutcomesVisual />,
  },
];

export function Capabilities() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <Eyebrow slash>Capabilities</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-serif mt-5 max-w-3xl text-[clamp(2rem,4.4vw,3.2rem)] text-ink-900 text-balance">
            Every signal they log, in one personalized view.
          </h2>
        </Reveal>

        {/* the data-funnel animation: everything a patient logs streams into one
            personalized dashboard */}
        <Reveal delay={0.1} className="mt-10 md:mt-14">
          <DataFunnel />
          <p className="mx-auto mt-4 max-w-md text-center text-[15px] leading-relaxed text-ink-500">
            Meals, glucose, movement, sleep, and more, organized into one read on
            the weeks between sessions.
          </p>
        </Reveal>

        <div className="mt-20 space-y-20 md:mt-28 md:space-y-28">
          {BLOCKS.map((b, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={b.title}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal variant={flip ? "right" : "left"} className={cn(flip && "lg:order-2")}>
                  <FeatureStatus status={b.status} />
                  <h3 className="display-serif mt-4 text-[clamp(1.6rem,2.8vw,2.2rem)] text-ink-900">
                    {b.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ink-500">
                    {b.body}
                  </p>
                  <Stagger className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-line pt-5" stagger={0.08}>
                    {b.tags.map((t) => (
                      <StaggerItem key={t}>
                        <PlusTag>{t}</PlusTag>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </Reveal>
                <Reveal variant={flip ? "left" : "right"} className={cn(flip && "lg:order-1")}>
                  {b.visual}
                </Reveal>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
