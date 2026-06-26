import { ClipboardList, MessageSquareText, FileText } from "lucide-react";
import { Container, Card, Eyebrow, FeatureStatus, StatusPill } from "@/components/ui";
import { GlucoseChart } from "@/components/ui/GlucoseChart";
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
          “Nice work pairing carbs with protein at lunch — that flattened your
          afternoon. Let's keep it going this week.”
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
          { k: "Time in range", v: "78%" },
          { k: "Avg glucose", v: "112" },
          { k: "Est. A1c", v: "5.5%" },
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
    visual: <SummaryVisual />,
  },
  {
    status: "available" as const,
    title: "Between-session continuity",
    body: "A live view of patient behavior, day to day. Message in-app, catch drift in week two instead of week four.",
    visual: <ContinuityVisual />,
  },
  {
    status: "in-development" as const,
    title: "Outcomes reporting",
    body: "One-click reports for referring physicians — A1c trends, adherence, behavior change — formatted to win the next referral.",
    visual: <OutcomesVisual />,
  },
];

export function Capabilities() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Eyebrow number="03">Capabilities</Eyebrow>
        <h2 className="display-serif mt-4 max-w-3xl text-[clamp(1.9rem,3.6vw,2.7rem)] text-ink-900 text-balance">
          Built around how solo practice actually works.
        </h2>

        <div className="mt-16 space-y-20 md:space-y-24">
          {BLOCKS.map((b, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={b.title}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={cn(flip && "lg:order-2")}>
                  <FeatureStatus status={b.status} />
                  <h3 className="display-serif mt-4 text-[clamp(1.5rem,2.6vw,2rem)] text-ink-900">
                    {b.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ink-500">
                    {b.body}
                  </p>
                </div>
                <div className={cn(flip && "lg:order-1")}>{b.visual}</div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
