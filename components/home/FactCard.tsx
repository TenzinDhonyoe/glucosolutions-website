import { Link2, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui";

const STEPS = [
  {
    label: "Source",
    body: "14 days of glucose readings + step logs from Redu.",
  },
  {
    label: "Computation",
    body: "Afternoon average 138 mg/dL on no-walk days vs 116 on walk days.",
  },
  {
    label: "How it's used",
    body: "Flagged 3 of 4 no-walk days exceeded the 140 target. You can open every reading behind it.",
  },
];

/**
 * FactCard — the provenance artifact: a plain-English insight with its source,
 * computation, and usage exposed, so a clinician can trust, correct, and defend
 * it. `expanded` shows the full reasoning chain (used on /product).
 */
export function FactCard({ expanded = true }: { expanded?: boolean }) {
  return (
    <Card className="p-7" shadow="lg">
      <div className="mb-4 flex items-center justify-between">
        <span className="mono-label flex items-center gap-2 text-sky-700">
          <Link2 size={13} aria-hidden /> Sourced insight
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-good-bg px-2.5 py-1 text-[12px] font-semibold text-good">
          <ShieldCheck size={13} aria-hidden /> Traceable
        </span>
      </div>

      <p className="font-serif text-[22px] leading-snug text-ink-900 text-pretty">
        Maya&apos;s afternoons run higher on days she skips her morning walk.
      </p>

      {expanded ? (
        <div className="mt-6 space-y-px overflow-hidden rounded-lg border border-line bg-line">
          {STEPS.map((s) => (
            <div key={s.label} className="bg-card p-4">
              <div className="mono-label mb-1.5">{s.label}</div>
              <p className="tnum text-[14px] leading-relaxed text-ink-700">{s.body}</p>
            </div>
          ))}
        </div>
      ) : null}

      <p className="mt-5 text-[13px] text-ink-500">
        Every claim is a sourced fact, not a guess.
      </p>
    </Card>
  );
}
