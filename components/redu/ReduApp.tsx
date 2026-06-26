import {
  Bell,
  Sparkles,
  Moon,
  Plus,
  Home,
  BookOpen,
  Target,
  ShoppingBasket,
  Flame,
  Wheat,
  Scale,
  Utensils,
  Droplet,
  Footprints,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ReduApp — a faithful, in-code recreation of the real Redu patient app (light
 * theme), built from DS primitives so it stays crisp at any size and animates
 * with the page. Drop a screen inside <PhoneFrame>. The home screen is the star;
 * the log screen gives a second surface for the app showcase.
 */

/* ---- shared chrome ---------------------------------------------------- */

function StatusBar({ time = "9:58" }: { time?: string }) {
  return (
    <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-semibold text-ink-900">
      <span className="tnum">{time}</span>
      <div className="flex items-center gap-1.5">
        {/* signal */}
        <svg width="16" height="11" viewBox="0 0 16 11" aria-hidden fill="currentColor">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 4} y={8 - i * 2.4} width="2.6" height={3 + i * 2.4} rx="0.6" />
          ))}
        </svg>
        {/* wifi */}
        <svg width="15" height="11" viewBox="0 0 15 11" aria-hidden fill="currentColor">
          <path d="M7.5 2.2c2.3 0 4.4.9 6 2.4l-1.3 1.3a6.6 6.6 0 0 0-9.4 0L1.5 4.6A8.5 8.5 0 0 1 7.5 2.2Zm0 3.2c1.4 0 2.7.5 3.7 1.5L9.9 8.2a3.4 3.4 0 0 0-4.8 0L3.8 6.9a5.2 5.2 0 0 1 3.7-1.5Zm0 3a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4Z" />
        </svg>
        {/* battery */}
        <div className="flex items-center gap-0.5">
          <span className="relative inline-flex h-[11px] w-[22px] items-center rounded-[3px] border border-ink-900/40 px-[1.5px]">
            <span className="h-[6px] w-[80%] rounded-[1px] bg-ink-900" />
          </span>
          <span className="h-[4px] w-[1.5px] rounded-r bg-ink-900/40" />
        </div>
      </div>
    </div>
  );
}

function AppHeader() {
  return (
    <div className="flex items-center justify-between px-4 pt-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-sky-100 text-[11px] font-bold text-sky-700">
        TD
      </span>
      <span className="text-gradient font-sans text-[15px] font-extrabold tracking-[0.14em]">
        REDU
      </span>
      <span className="relative grid h-8 w-8 place-items-center rounded-full bg-sunken text-ink-700">
        <Bell size={15} aria-hidden />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-high" />
      </span>
    </div>
  );
}

const TABS = [
  { icon: Home, label: "Home" },
  { icon: BookOpen, label: "Log" },
  { icon: Target, label: "Actions" },
  { icon: ShoppingBasket, label: "Pantry" },
];

function TabBar({ active = "Home" }: { active?: string }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-line bg-card/95 px-2 pb-4 pt-2 backdrop-blur">
      {TABS.map(({ icon: Icon, label }) => {
        const on = label === active;
        return (
          <span
            key={label}
            className={cn(
              "flex flex-col items-center gap-1 text-[9px] font-medium",
              on ? "text-sky-700" : "text-ink-400",
            )}
          >
            <Icon size={18} aria-hidden />
            {label}
          </span>
        );
      })}
    </div>
  );
}

/* score ring — single-value circular progress in the brand gradient */
function ScoreRing({ value, gradId }: { value: number; gradId: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const filled = (value / 100) * c;
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden className="shrink-0">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2bb0dc" />
          <stop offset="100%" stopColor="#4e9a6b" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r={r} fill="none" stroke="#EFEAE0" strokeWidth="7" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${c - filled}`}
        transform="rotate(-90 32 32)"
      />
    </svg>
  );
}

/* ---- screen 1: home / metabolic score -------------------------------- */

export function ReduHome() {
  return (
    <div className="flex h-full flex-col bg-[linear-gradient(180deg,#eaf6f3_0%,#f7f3ec_30%)]">
      <StatusBar />
      <AppHeader />

      <div className="flex-1 space-y-2.5 overflow-hidden px-3.5 pb-20 pt-3">
        {/* check-in banner */}
        <div className="flex items-center justify-between rounded-xl bg-warn-bg/70 px-3 py-2 text-[11px] font-medium text-ink-700">
          <span className="flex items-center gap-1.5">
            <span className="text-warn">☀</span> Today&apos;s check-in takes 15 seconds
          </span>
          <ChevronRight size={13} className="text-ink-400" aria-hidden />
        </div>

        {/* metabolic score */}
        <div className="rounded-2xl border border-line bg-card p-3.5 shadow-sm">
          <div className="mono-label mb-2 text-[9px]">Metabolic score</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="tnum text-[34px] font-semibold leading-none text-ink-900">61</span>
                <span className="tnum text-[13px] text-ink-400">/100</span>
              </div>
              <p className="mt-1.5 max-w-[150px] text-[10.5px] leading-snug text-ink-500">
                From sleep, activity, meals, and glucose.
              </p>
            </div>
            <ScoreRing value={61} gradId="redu-home-ring" />
          </div>
          <div className="mt-3 flex gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-warn-bg px-2 py-0.5 text-[10px] font-semibold text-warn">
              <Flame size={11} aria-hidden /> 1d streak
            </span>
            <span className="inline-flex items-center rounded-full bg-good-bg px-2 py-0.5 text-[10px] font-semibold text-good">
              3 of 5 logs this week
            </span>
          </div>
        </div>

        {/* personalized tips — dark card */}
        <div className="rounded-2xl bg-ink-900 p-3.5 text-page">
          <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-page/60">
            <Sparkles size={12} className="text-sky-500" aria-hidden /> Personalized tips
          </div>
          <p className="mt-2 text-[12.5px] leading-snug text-page/90">
            Experiment with a 10-minute easy walk after dinner.
          </p>
          <span className="mt-2.5 inline-flex items-center gap-1 text-[11.5px] font-semibold text-sky-500">
            Log activity →
          </span>
        </div>

        {/* stat row */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl border border-line bg-card p-3 shadow-sm">
            <div className="mono-label mb-1 flex items-center gap-1 text-[8.5px] text-sky-700">
              <Footprints size={11} aria-hidden /> Activity
            </div>
            <div className="tnum text-[19px] font-semibold leading-none text-ink-900">173</div>
            <div className="mt-0.5 text-[9px] text-ink-400">kcal · avg/day</div>
            <div className="mt-2 flex h-6 items-end gap-[3px]">
              {[5, 8, 4, 9, 6, 11, 7].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm bg-sky-500/45"
                  style={{ height: `${(h / 11) * 100}%` }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col rounded-2xl border border-line bg-card p-3 shadow-sm">
            <div className="mono-label mb-1 flex items-center gap-1 text-[8.5px] text-low">
              <Moon size={11} aria-hidden /> Sleep
            </div>
            <div className="text-[12px] font-semibold leading-tight text-ink-700">No sleep data yet</div>
            <p className="mt-1 text-[9px] leading-snug text-ink-400">Connect a tracker to start.</p>
            <span className="mt-auto inline-flex w-fit rounded-full border border-line-2 px-2.5 py-1 text-[9.5px] font-semibold text-sky-700">
              Connect
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl border border-line bg-card p-3 shadow-sm">
            <div className="mono-label mb-1 flex items-center gap-1 text-[8.5px] text-ink-500">
              <Scale size={11} aria-hidden /> Weight
            </div>
            <div className="tnum text-[19px] font-semibold leading-none text-ink-900">
              75.0 <span className="text-[11px] font-normal text-ink-400">kg</span>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-card p-3 shadow-sm">
            <div className="mono-label mb-1 flex items-center gap-1 text-[8.5px] text-good">
              <Wheat size={11} aria-hidden /> Fibre intake
            </div>
            <div className="tnum text-[19px] font-semibold leading-none text-ink-900">
              18.2 <span className="text-[11px] font-normal text-ink-400">g</span>
            </div>
          </div>
        </div>
      </div>

      {/* floating action button */}
      <span className="absolute bottom-[68px] right-4 z-20 grid h-12 w-12 place-items-center rounded-full bg-brand-gradient text-white shadow-lg">
        <Plus size={22} aria-hidden />
      </span>

      <TabBar active="Home" />
    </div>
  );
}

/* ---- screen 2: log / recent entries ---------------------------------- */

const LOGS = [
  { icon: Utensils, color: "text-good", title: "Orange chicken, stir-fried", meta: "Lunch · 12:53 PM" },
  { icon: Droplet, color: "text-sky-700", title: "Glucose · 102 mg/dL", meta: "In range · 1:20 PM" },
  { icon: Footprints, color: "text-warn", title: "Walk · 18 min", meta: "Activity · 2:05 PM" },
  { icon: Utensils, color: "text-good", title: "Greek yogurt + berries", meta: "Snack · 4:10 PM" },
];

export function ReduLog() {
  return (
    <div className="flex h-full flex-col bg-page">
      <StatusBar time="12:44" />
      <div className="px-4 pt-3">
        <h3 className="font-serif text-[19px] text-ink-900">Logs</h3>
      </div>

      <div className="flex-1 space-y-2.5 overflow-hidden px-3.5 pb-20 pt-3">
        {/* quick-log row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Utensils, label: "Meal" },
            { icon: Droplet, label: "Glucose" },
            { icon: Footprints, label: "Activity" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-line bg-card py-3 text-[10px] font-semibold text-ink-700 shadow-sm"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-sky-50 text-sky-700">
                <Icon size={15} aria-hidden />
              </span>
              {label}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="mono-label text-[9px]">Recent logs</span>
          <span className="text-[10px] font-medium text-sky-700">All ▾</span>
        </div>

        <div className="space-y-2">
          {LOGS.map((l) => (
            <div
              key={l.title}
              className="flex items-center gap-3 rounded-xl border border-line bg-card px-3 py-2.5 shadow-sm"
            >
              <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sunken", l.color)}>
                <l.icon size={15} aria-hidden />
              </span>
              <div className="min-w-0">
                <div className="truncate text-[12px] font-semibold text-ink-900">{l.title}</div>
                <div className="text-[9.5px] text-ink-400">{l.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <span className="absolute bottom-[68px] right-4 z-20 grid h-12 w-12 place-items-center rounded-full bg-brand-gradient text-white shadow-lg">
        <Plus size={22} aria-hidden />
      </span>
      <TabBar active="Log" />
    </div>
  );
}
