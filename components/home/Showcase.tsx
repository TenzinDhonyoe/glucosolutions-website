"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "@/components/motion";
import { ProductDashboard } from "./ProductDashboard";

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

/* ---- App window (browser chrome + real client-detail dashboard) ---- */
function DashboardWindow() {
  return (
    <div className="w-[1120px] overflow-hidden rounded-2xl bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] ring-1 ring-black/10">
      <div className="flex items-center gap-2 border-b border-[#e6e9ec] bg-[#f7f9fa] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="mx-auto flex items-center rounded-md bg-white px-4 py-1 text-[12px] text-ink-400 ring-1 ring-[#e6e9ec]">
          app.glucosolutions.ca/roster/tenzin-dhonyoe
        </span>
      </div>
      <ProductDashboard />
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
  return (
    <section className="w-full px-4 pb-8 md:px-6 md:pb-10" style={{ background: "#f6f6f4" }}>
      <div className="relative overflow-hidden rounded-[1.75rem] bg-[#127399]">
        {/* animated "liquid metal" background — generated metal texture that
            slowly pans, with a diagonal glint sweeping across for the shine */}
        <div className="showcase-bg" aria-hidden />
        <div className="showcase-glint" aria-hidden />

        <div className="relative px-5 pt-10 pb-8 md:px-9 md:pt-12 md:pb-10">
          <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
            {/* Left — dark pitch card with the real client-detail view. The
                browser is anchored to fill the card at full width and bleeds off
                the bottom, so the masthead, logging heatmap, and the dark "Data
                Interpretation" read all land in the shot (the signature screen). */}
            <Reveal variant="up" immediate delay={0.15}>
              <div className="relative min-h-[560px] overflow-hidden rounded-2xl bg-[#101114] p-7 md:min-h-[672px] md:p-9">
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex rounded-md bg-white/10 px-2.5 py-1 text-[12px] font-semibold text-white/90 ring-1 ring-white/15">
                      Platform
                    </span>
                    <h3 className="text-[24px] font-bold leading-[1.15] text-white md:text-[28px]">
                      All-in-One Clinical Platform
                    </h3>
                  </div>
                  <p className="mt-2.5 max-w-[440px] text-[14px] leading-relaxed text-white/55">
                    One client record: between-session logging, a fully sourced
                    read of the week, and outcomes, in a single view.
                  </p>
                </div>

                {/* Full product shot — the browser scaled to the card's width,
                    centered, bleeding off the bottom edge. */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[132px] overflow-hidden md:top-[148px]">
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-4 origin-top -translate-x-1/2 scale-[0.42] sm:scale-[0.5] lg:scale-[0.58] xl:scale-[0.66]"
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
