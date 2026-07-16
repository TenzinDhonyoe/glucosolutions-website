"use client";

import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  FileText,
  LogOut,
  MessageSquare,
  Pencil,
  Settings,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
  Utensils,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion";

/* =========================================================================
   Showcase — the "all-in-one platform" band. A colorful gradient panel that
   sits directly under the hero (both read in one viewport). A dark pitch card
   floats a browser mockup of the real clinician dashboard; an honest
   capabilities card sits beside it; real credentials run along the foot.

   The mockup is built around the single claim the section has to earn:
   "every number traces to its source." So the visible screen is one client's
   Session Brief — a plain-language finding, the named rule that produced it,
   and the exact logged entries it drew from (Fact -> Rule -> Narration).
   ========================================================================= */

/* ---- Sidebar ---- */
function Sidebar() {
  const items = [
    { icon: Users, label: "Clients", badge: "2", active: true },
    { icon: MessageSquare, label: "Messages" },
    { icon: UserPlus, label: "Invite client" },
  ];
  return (
    <aside className="flex w-[240px] shrink-0 flex-col border-r border-[#e6e9ec] bg-[#f7f9fa] px-4 py-5">
      <div className="px-2 pb-6 text-[18px] font-bold tracking-tight text-[#1aabb3]">
        GlucoSolutions
      </div>
      <nav className="space-y-1">
        {items.map(({ icon: Icon, label, badge, active }) => (
          <div
            key={label}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] font-medium ${
              active
                ? "bg-white text-[#0e6b72] shadow-sm ring-1 ring-[#e6e9ec]"
                : "text-ink-500"
            }`}
          >
            <Icon size={17} strokeWidth={1.9} />
            <span className="flex-1">{label}</span>
            {badge ? (
              <span className="text-[12px] font-semibold text-[#e08a2e]">
                {badge}
              </span>
            ) : null}
          </div>
        ))}
      </nav>
      <div className="mt-auto space-y-3 pt-6">
        <div className="flex items-center gap-3 px-3 text-[14px] font-medium text-ink-500">
          <Settings size={17} strokeWidth={1.9} />
          Settings
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-[#e6e9ec]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dcecee] text-[12px] font-semibold text-[#0e6b72]">
            A
          </span>
          <div className="flex-1 leading-tight">
            <div className="text-[13px] font-semibold text-ink-900">A. Chen</div>
            <div className="text-[11px] text-ink-400">RD, LDN</div>
          </div>
          <LogOut size={15} className="text-ink-400" />
        </div>
      </div>
    </aside>
  );
}

/* ---- Main content: one client's provenance-first Session Brief ---- */
function MainPanel() {
  return (
    <div className="flex-1 bg-[#f1f3f4] p-6">
      <div className="mb-4 flex items-center gap-2 text-[13px] font-medium text-ink-500">
        <ArrowLeft size={15} /> All clients
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#eceef0]">
        {/* Client header (clearly a sample record) */}
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#dcecee] text-[16px] font-semibold text-[#0e6b72]">
            JM
          </span>
          <div className="flex-1">
            <div className="text-[11px] font-semibold tracking-[0.14em] text-[#0e6b72]">
              PREDIABETES MANAGEMENT
            </div>
            <div
              className="text-[26px] leading-tight text-ink-900"
              style={{ fontFamily: "var(--font-newsreader)", fontWeight: 500 }}
            >
              J. Martinez
            </div>
            <div className="mt-1 flex items-center gap-2 text-[13px] text-ink-500">
              <span>SAMPLE-0001</span>
              <span className="text-ink-400">·</span>
              <span>Since Dec 2025</span>
              <span className="text-ink-400">·</span>
              <span className="flex items-center gap-1">
                <span className="h-[7px] w-[7px] rounded-full bg-[#3f9a63]" />
                Active
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-[13px] font-medium text-ink-700 ring-1 ring-[#dfe2e5]">
              <FileText size={15} /> Session brief
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-[#0e6b72] px-3.5 py-2 text-[13px] font-medium text-white">
              <Pencil size={15} /> Edit care plan
            </span>
          </div>
        </div>

        <div className="my-6 h-px bg-[#eceef0]" />

        {/* Session Brief — the Fact -> Rule -> Narration provenance chain */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-ink-500">
            <FileText size={14} className="text-[#0e6b72]" />
            SESSION BRIEF
          </span>
          <span className="text-[12px] text-ink-400">Last 7 logged days</span>
        </div>

        {/* Narration — the plain-language finding an RD reads in three seconds */}
        <p className="mt-3 text-[18px] font-semibold leading-snug text-ink-900">
          Carb intake exceeded target on 4 of the last 7 logged days.
        </p>

        {/* Reasoning — the proof the number traces to its source */}
        <div className="mt-3 flex items-center gap-1.5 text-[13px] font-medium text-[#0e6b72]">
          <ChevronDown size={15} /> View reasoning
        </div>
        <div className="mt-2 rounded-xl bg-[#f7f9fa] p-4 ring-1 ring-[#e6e9ec]">
          <div className="text-[13px] text-ink-700">
            <span className="font-semibold text-ink-900">Rule applied:</span>{" "}
            Daily carb threshold
          </div>
          <div
            className="mt-2 inline-block rounded-md bg-[#eef2f4] px-2 py-1 text-[12px] text-ink-600"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            daily_carb_total &gt; goal_carb_max
          </div>

          <div className="mt-4 text-[11px] font-semibold tracking-[0.12em] text-ink-400">
            SOURCED FROM
          </div>
          <ul className="mt-2 space-y-2.5">
            <li className="flex gap-2.5">
              <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#7fc4d8]" />
              <span className="text-[13px] leading-snug text-ink-600">
                <span className="font-medium text-ink-800">Jan 12, 8:03 AM</span>{" "}
                — logged breakfast:{" "}
                <span className="text-ink-500">
                  &ldquo;oatmeal, banana, coffee&rdquo;
                </span>
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#7fc4d8]" />
              <span className="text-[13px] leading-snug text-ink-600">
                <span className="font-medium text-ink-800">Jan 14, 12:15 PM</span>{" "}
                — logged lunch:{" "}
                <span className="text-ink-500">
                  &ldquo;sandwich, chips, soda&rdquo;
                </span>
              </span>
            </li>
            <li className="pl-[16px] text-[13px] font-medium text-[#0e6b72]">
              + 2 more entries
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---- Workflow connector — a dotted "integration" motif that links the pitch
   card to the floating product mockup. A dotted workflow slot with a live
   connection node, and a marching-ants dotted line that flows toward the
   browser and tucks under its left edge (data wiring into the product). ---- */
/* The real inputs that feed a Session Brief. Each wires into the product with
   its own animated dotted line; together they read as "everything converges
   into one place." Labels map to features visible in the mockup (meal logs in
   the brief's sources, sessions, the Messages tab) so nothing is invented. */
const SOURCES = [
  {
    icon: Utensils,
    label: "Meal logs",
    top: "top-[44%]",
    d: "M6 70 C 78 70, 118 90, 190 104",
  },
  {
    icon: FileText,
    label: "Session notes",
    top: "top-[61%]",
    d: "M6 70 C 86 70, 126 64, 190 56",
  },
  {
    icon: Activity,
    label: "Activity",
    top: "top-[78%]",
    d: "M6 70 C 78 70, 118 48, 190 20",
  },
];

// Sequential "pipeline" timing — each source fires a packet in turn, then the
// whole loop pauses briefly before repeating.
const FIRE_DUR = 0.85; // time one packet takes to travel the line
const FIRE_STEP = 0.9; // stagger between one source firing and the next
const FIRE_CYCLE = 3.4; // full loop length (fire, fire, fire, pause)

function SourceNode({
  icon: Icon,
  label,
  top,
  d,
  index,
  reduce,
}: {
  icon: typeof Utensils;
  label: string;
  top: string;
  d: string;
  index: number;
  reduce: boolean;
}) {
  // Same timing drives the traveling packet and the node flash, so the node
  // lights up exactly as its packet launches. Each source is offset by one
  // step, so they fire in order rather than all at once.
  const fire = {
    duration: FIRE_DUR,
    ease: "easeInOut" as const,
    repeat: Infinity,
    repeatDelay: FIRE_CYCLE - FIRE_DUR,
    delay: index * FIRE_STEP,
  };
  return (
    <div className={`pointer-events-none absolute left-[7%] ${top} hidden md:block`}>
      <div className="relative flex items-center">
        <div className="flex items-center gap-2 rounded-xl bg-white/[0.07] px-2.5 py-2 ring-1 ring-white/10 backdrop-blur-sm">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#3fc6cf]/15 text-[#7fe0e6]">
            <Icon size={14} strokeWidth={2} />
          </span>
          <span className="whitespace-nowrap pr-0.5 text-[12px] font-semibold text-white/85">
            {label}
          </span>
        </div>

        {/* dotted line into the product, with a packet that fires in sequence */}
        <svg
          aria-hidden
          width="196"
          height="140"
          viewBox="0 0 196 140"
          fill="none"
          className="absolute left-full top-1/2 -ml-1 -translate-y-1/2"
        >
          {/* faint static base line — the connection always reads */}
          <path
            d={d}
            stroke="rgba(120,220,225,0.28)"
            strokeWidth="1.5"
            strokeDasharray="1.5 7"
            strokeLinecap="round"
          />
          {/* bright packet traveling from the source into the browser */}
          {!reduce && (
            <motion.path
              d={d}
              stroke="rgba(165,242,247,0.95)"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="16 160"
              initial={{ strokeDashoffset: 16 }}
              animate={{ strokeDashoffset: [16, -120] }}
              transition={fire}
            />
          )}
          {/* node flash — pulses as this source launches its packet */}
          {!reduce && (
            <motion.circle
              cx="6"
              cy="70"
              r="5"
              fill="none"
              stroke="rgba(165,242,247,0.9)"
              strokeWidth="1.5"
              initial={{ r: 5, opacity: 0 }}
              animate={{ r: [5, 15], opacity: [0.9, 0] }}
              transition={fire}
            />
          )}
          <circle cx="6" cy="70" r="7" fill="rgba(63,198,207,0.22)" />
          <circle cx="6" cy="70" r="4" fill="#3fc6cf" />
        </svg>
      </div>
    </div>
  );
}

function WorkflowConnector({ reduce }: { reduce: boolean }) {
  return (
    <>
      {SOURCES.map((s, i) => (
        <SourceNode key={s.label} index={i} reduce={reduce} {...s} />
      ))}
    </>
  );
}

/* ---- App window (browser chrome + dashboard) ---- */
function DashboardWindow() {
  return (
    <div className="w-[1080px] overflow-hidden rounded-2xl bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] ring-1 ring-black/10">
      <div className="flex items-center gap-2 border-b border-[#e6e9ec] bg-[#f7f9fa] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="mx-auto flex items-center rounded-md bg-white px-4 py-1 text-[12px] text-ink-400 ring-1 ring-[#e6e9ec]">
          app.glucosolutions.ca/clients/sample
        </span>
      </div>
      <div className="flex">
        <Sidebar />
        <MainPanel />
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: Sparkles,
    label: "Sourced interpretation",
    desc: "Every number traces to its source.",
  },
  {
    icon: CalendarDays,
    label: "Between-session logging",
    desc: "See the weeks between visits.",
  },
  {
    icon: ClipboardList,
    label: "Session briefs",
    desc: "Walk in already caught up.",
  },
  {
    icon: TrendingUp,
    label: "Outcomes reporting",
    desc: "Prove what changed.",
  },
];

export function Showcase() {
  const reduce = useReducedMotion() ?? false;
  return (
    <section className="w-full px-4 pb-8 md:px-6 md:pb-10" style={{ background: "#f6f6f4" }}>
      <div className="relative overflow-hidden rounded-[1.75rem] bg-[#127399]">
        {/* animated "liquid metal" background — generated metal texture that
            slowly pans, with a diagonal glint sweeping across for the shine */}
        <div className="showcase-bg" aria-hidden />
        <div className="showcase-glint" aria-hidden />

        <div className="relative px-5 pt-10 pb-8 md:px-9 md:pt-12 md:pb-10">
          <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
            {/* Left — dark pitch card with floating dashboard mockup */}
            <Reveal variant="up" immediate delay={0.15}>
              <div className="relative min-h-[460px] overflow-hidden rounded-2xl bg-[#101114] p-7 md:min-h-[400px] md:p-9">
                <div className="relative z-10 max-w-[260px]">
                  <span className="inline-flex rounded-md bg-white/10 px-2.5 py-1 text-[12px] font-semibold text-white/90 ring-1 ring-white/15">
                    Platform
                  </span>
                  <h3 className="mt-4 text-[26px] font-bold leading-[1.15] text-white md:text-[30px]">
                    All-in-One Clinical Platform
                  </h3>
                </div>

                {/* Dotted "integration" connector wiring the pitch into the product */}
                <WorkflowConnector reduce={reduce} />

                {/* Floating browser mockup — bleeds off the card, but framed so
                    the Session Brief and its sourced entries land in view (the
                    sourcing is the whole point of the shot). */}
                <div className="pointer-events-none absolute left-[26%] top-[42%] md:left-[42%] md:top-[9%]">
                  <div
                    aria-hidden
                    style={{ transform: "scale(0.62)", transformOrigin: "top left" }}
                  >
                    <DashboardWindow />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right — honest capabilities card, filling its full height */}
            <Reveal variant="up" immediate delay={0.3}>
              <div className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-xl ring-1 ring-black/5 md:p-8">
                <div className="flex items-center justify-between">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#127399]">
                    Inside the platform
                  </div>
                  <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-400">
                    One record
                  </span>
                </div>

                <div className="mt-1 flex flex-1 flex-col">
                  {FEATURES.map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <div
                        key={f.label}
                        className={`flex flex-1 items-center gap-4 ${
                          i > 0 ? "border-t border-[#eef1f2]" : ""
                        }`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1aabb3]/12 text-[#12868c]">
                          <Icon size={18} strokeWidth={2} />
                        </span>
                        <div>
                          <div className="text-[15px] font-semibold text-ink-900">
                            {f.label}
                          </div>
                          <div className="mt-0.5 text-[13px] leading-relaxed text-ink-500">
                            {f.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-2 border-t border-[#eef1f2] pt-5">
                  <Link
                    href="/product"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#127399] transition-colors hover:text-[#0e6b72]"
                  >
                    Explore the product
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
