import {
  ArrowLeft,
  ArrowUp,
  Check,
  FileText,
  LayoutGrid,
  LogOut,
  MessageSquare,
  Settings,
  Sparkles,
  SquarePen,
  UserPlus,
  Users,
} from "lucide-react";
import {
  C,
  mono,
  display,
  InterpretationPanel,
  SignalRow,
  LoggingHeatmap,
} from "./product-ui";

/* =============================================================================
   ProductDashboard — a faithful, presentational 1:1 recreation of the real
   GlucoSolutions clinician client-detail view (the `dashboard_gluco`
   client-dashboard), built from the product's own shared UI primitives so it
   renders crisp and responsive rather than as a screenshot.

   Top to bottom, exactly what the real page shows:
     · the client masthead (identity + program + status + actions)
     · Session continuity — agreed actions with progress + the logging heatmap
     · the dark "Data Interpretation" panel — signal ledger with delta chips
     · the pinned "Ask about {client}" chat dock

   Sample data is a clean, demo-friendly record (Tenzin Dhonyoe · prediabetes
   reversal), the same fixture the product's demo route uses.
   ========================================================================== */

/* ---- Sidebar — clinician nav ------------------------------------------- */
function Sidebar() {
  const nav = [
    { icon: Users, label: "Clients", badge: "2", active: true },
    { icon: MessageSquare, label: "Messages" },
    { icon: UserPlus, label: "Invite client" },
    { icon: LayoutGrid, label: "Pantry lists" },
  ];
  return (
    <aside
      className="flex w-[236px] shrink-0 flex-col px-4 py-6"
      style={{ background: C.raised, borderRight: `1px solid ${C.border}` }}
    >
      <div className="px-2 pb-8 text-[19px] font-bold tracking-[-0.02em]" style={{ color: C.primary }}>
        GlucoSolutions
      </div>
      <nav className="space-y-1">
        {nav.map(({ icon: Icon, label, badge, active }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[14px] font-medium"
            style={
              active
                ? { background: C.surface, color: C.primary, boxShadow: `0 1px 2px rgba(27,31,38,0.05)`, border: `1px solid ${C.border}` }
                : { color: C.text2 }
            }
          >
            <Icon size={18} strokeWidth={1.9} />
            <span className="flex-1">{label}</span>
            {badge ? (
              <span
                className="grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold"
                style={{ background: C.sky100, color: C.primary }}
              >
                {badge}
              </span>
            ) : null}
          </div>
        ))}
      </nav>
      <div className="mt-auto space-y-3 pt-6">
        <div className="flex items-center gap-3 px-3 text-[14px] font-medium" style={{ color: C.text2 }}>
          <Settings size={18} strokeWidth={1.9} />
          Settings
        </div>
        <div
          className="flex items-center gap-2.5 rounded-[12px] px-3 py-2.5"
          style={{ background: C.surface, border: `1px solid ${C.border}` }}
        >
          <span
            className="grid h-8 w-8 place-items-center rounded-full text-[12px] font-bold"
            style={{ background: C.sky100, color: C.primary }}
          >
            T
          </span>
          <div className="flex-1 leading-tight">
            <div className="text-[13px] font-semibold" style={{ color: C.text }}>
              Tenzin
            </div>
            <div className="text-[11px]" style={{ color: C.textLight }}>
              RD, LDN
            </div>
          </div>
          <LogOut size={15} style={{ color: C.textLight }} />
        </div>
      </div>
    </aside>
  );
}

/* ---- Masthead — client identity + actions ------------------------------ */
function Masthead() {
  return (
    <section className="flex flex-wrap items-start justify-between gap-6 p-6">
      <div className="flex items-center gap-[18px]">
        <div
          className="grid h-[58px] w-[58px] flex-none place-items-center rounded-full text-[19px] font-bold"
          style={{ background: C.sky100, color: C.primary }}
        >
          TD
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ ...mono, color: C.primary }}>
            Prediabetes Reversal
          </div>
          <h1
            className="mt-[7px] text-[34px] font-medium leading-[1.04] tracking-[-0.02em]"
            style={{ ...display, color: C.text }}
          >
            Tenzin Dhonyoe
          </h1>
          <div className="mt-[11px] flex flex-wrap items-center gap-[13px] text-[13px]" style={{ color: C.text2 }}>
            <span className="text-[12px]" style={mono}>
              RDU-7AEF54
            </span>
            <span style={{ color: C.textLight }}>&middot;</span>
            <span>Since Dec 2025</span>
            <span style={{ color: C.textLight }}>&middot;</span>
            <span className="inline-flex items-center gap-[7px]">
              <span className="h-2 w-2 rounded-full" style={{ background: C.good }} />
              <span className="font-semibold" style={{ color: C.goodInk }}>
                Active
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-none items-center gap-2.5">
        <span
          className="inline-flex items-center gap-2 rounded-[12px] px-3.5 py-2.5 text-[13px] font-semibold"
          style={{ background: C.surface, color: C.text2, border: `1px solid ${C.border}` }}
        >
          <FileText size={16} strokeWidth={2} /> Session brief
        </span>
        <span
          className="inline-flex items-center gap-2 rounded-[12px] px-3.5 py-2.5 text-[13px] font-semibold text-white"
          style={{ background: C.primary }}
        >
          <SquarePen size={17} strokeWidth={2} /> Edit care plan
        </span>
      </div>
    </section>
  );
}

/* ---- Session continuity: agreed actions -------------------------------- */
function ActionRow({ title, detail, done }: { title: string; detail: string; done?: boolean }) {
  return (
    <li className="flex items-start gap-3 rounded-[10px] p-3" style={{ border: `1px solid ${C.border}` }}>
      <span
        className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-[6px]"
        style={done ? { background: C.good } : { border: `1.5px solid ${C.watch}` }}
      >
        {done && <Check size={13} strokeWidth={3} className="text-white" />}
      </span>
      <div className="min-w-0">
        <div className="text-[14px] font-semibold leading-snug" style={{ color: done ? C.text2 : C.text }}>
          {title}
        </div>
        <div className="mt-0.5 truncate text-[12px] leading-snug" style={{ color: C.text2 }}>
          <span className="font-semibold" style={{ color: done ? C.goodInk : C.watch }}>
            {done ? "Completed" : "In progress"}
          </span>
          {` · ${detail}`}
        </div>
      </div>
    </li>
  );
}

function SessionContinuity() {
  return (
    <section className="p-6">
      <h2 className="mb-4 text-[19px] font-semibold tracking-[-0.01em]" style={{ color: C.text }}>
        Session continuity
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Agreed actions */}
        <div className="lg:pr-6">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-[13px] font-semibold" style={{ color: C.text2 }}>
              Agreed actions
            </p>
            <p className="text-[13px] font-semibold" style={{ color: C.primary }}>
              <span style={mono}>1</span> / 2 done
            </p>
          </div>
          <div className="h-[6px] w-full overflow-hidden rounded-full" style={{ background: C.sunk }}>
            <div className="h-full rounded-full" style={{ width: "50%", background: C.good }} />
          </div>
          <ul className="mt-4 space-y-2.5">
            <ActionRow title="12g+ for Breakfast" detail="12g+ for Breakfast" />
            <ActionRow title="Walk after eating" detail="10 min walk after eating" done />
          </ul>
        </div>
        {/* Logging consistency */}
        <div className="lg:border-l lg:pl-6" style={{ borderColor: C.border }}>
          <p className="mb-3 text-[13px] font-semibold" style={{ color: C.text2 }}>
            Logging consistency
          </p>
          <LoggingHeatmap />
        </div>
      </div>
    </section>
  );
}

/* ---- Data Interpretation — the dark AI read panel ---------------------- */
function DataInterpretation() {
  const meta = (
    <div className="flex flex-col items-end gap-0.5 text-right">
      <span className="text-[10px] uppercase tracking-[0.12em] text-white/55" style={mono}>
        4 signals <span className="text-white/30">·</span> <span style={{ color: "#F0847A" }}>3 need attention</span>
      </span>
      <span className="text-[10px] uppercase tracking-[0.12em] text-white/45" style={mono}>
        data through 2026-07-15
      </span>
    </div>
  );
  return (
    <InterpretationPanel meta={meta} className="md:p-6">
      <SignalRow first label="Logging consistency" sub="last 7 days · n=6" value="85.7" unit="%" delta={{ was: "100", dir: "worsening" }} />
      <SignalRow label="Active energy (mean daily)" sub="last 7 days · n=6" value="160" unit="kcal" delta={{ was: "182", dir: "worsening" }} />
      <SignalRow label="Active minutes (mean daily)" sub="last 7 days · n=5" value="40" unit="min" delta={{ was: "45", dir: "worsening" }} />
    </InterpretationPanel>
  );
}

/* ---- Chat dock — the always-on "Ask about {client}" surface ------------ */
function ChatDock() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-6 pb-6">
      <div
        className="flex w-full max-w-[560px] items-center gap-3 rounded-[16px] px-4 py-3 shadow-lg"
        style={{ background: C.surface, border: `1px solid ${C.border}` }}
      >
        <Sparkles size={18} strokeWidth={2} style={{ color: C.sky500 }} />
        <span className="flex-1 text-[14px]" style={{ color: C.textLight }}>
          Ask about Tenzin…
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: C.sunk }}>
          <ArrowUp size={17} strokeWidth={2.2} style={{ color: C.textLight }} />
        </span>
      </div>
    </div>
  );
}

/* ---- Full client-detail view ------------------------------------------- */
export function ProductDashboard() {
  return (
    <div className="flex" style={{ background: C.surface, ...display }}>
      <Sidebar />
      <div className="relative min-w-0 flex-1" style={{ background: C.canvas }}>
        <div className="p-6">
          <div className="mb-4 flex items-center gap-2 text-[13px] font-medium" style={{ color: C.text2 }}>
            <ArrowLeft size={15} /> All clients
          </div>

          {/* Identity + session-continuity bubble */}
          <div
            className="overflow-hidden rounded-[20px] shadow-sm"
            style={{ background: C.surface, border: `1px solid ${C.border}` }}
          >
            <Masthead />
            <div style={{ borderTop: `1px solid ${C.borderLight}` }} />
            <SessionContinuity />
          </div>

          {/* Dark AI read */}
          <div className="mt-5">
            <DataInterpretation />
          </div>
          {/* spacer so content clears the pinned dock */}
          <div aria-hidden className="h-24" />
        </div>
        <ChatDock />
      </div>
    </div>
  );
}
