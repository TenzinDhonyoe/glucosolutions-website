"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

// Every path shares the same command structure (M C S S S) so CSS can morph
// between them. x: 40 = meal, 233 = 1 hr, 427 = 2 hr, 620 = 3 hr.
const OPTIONS = [
  {
    key: "alone",
    label: "Rice bowl on its own",
    path: "M40 200 C 80 200 100 196 130 140 S 170 46 190 46 S 285 112 345 162 S 440 200 620 200",
    caption: "Rises quickly and takes a little over two hours to settle.",
  },
  {
    key: "veg",
    label: "Vegetables first, then the rice",
    path: "M40 200 C 80 200 112 198 142 166 S 182 112 206 112 S 282 152 330 182 S 400 200 620 200",
    caption:
      "Eating vegetables and protein before the rice slows how fast it reaches your blood. The rise is smaller and gentler.",
  },
  {
    key: "walk",
    label: "Rice bowl, then a 15-minute walk",
    path: "M40 200 C 80 200 100 196 128 145 S 165 76 182 76 S 232 152 272 186 S 322 200 620 200",
    caption: "Working muscles use glucose for fuel, so an easy walk after eating brings you back to steady sooner.",
  },
] as const;

type Key = (typeof OPTIONS)[number]["key"];

export function SameMeal() {
  const [selected, setSelected] = useState<Key>("alone");
  const id = useId();
  const current = OPTIONS.find((o) => o.key === selected)!;

  return (
    <section aria-labelledby="same-title" className="relative bg-pine py-24 text-white md:py-36">
      {/* Phones: text, chart, options, so a tap changes something in view.
          Desktop: text and options on the left, chart spanning the right. */}
      <div className="mx-auto grid max-w-page gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-10">
        <div className="lg:col-span-5 lg:row-start-1">
          <h2 id="same-title" className="display h-section">
            The advice is right. It just isn&rsquo;t specific to you.
          </h2>
          <p className="lede mt-6 text-white/75">
            The same bowl of rice can send one person&rsquo;s glucose climbing and barely
            move another&rsquo;s. What you eat first, a short walk, last night&rsquo;s
            sleep: each one changes the shape. Try it with one meal.
          </p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:pl-6">
          <div className="rounded-[28px] bg-pine-2/70 p-5 ring-1 ring-white/10 sm:p-8">
            <svg viewBox="0 0 640 262" className="block h-auto w-full [&_text]:text-[22px] sm:[&_text]:text-[15px] lg:[&_text]:text-[13px]" role="img" aria-labelledby={`${id}-chart`}>
              <title id={`${id}-chart`}>{`Illustrative glucose response over three hours: ${current.label}. ${current.caption}`}</title>

              {/* steady range */}
              <rect x="40" y="188" width="580" height="24" rx="12" fill="white" fillOpacity="0.06" />
              <text x="612" y="180" textAnchor="end" fill="white" fillOpacity="0.5" fontSize="13">
                Steady
              </text>
              <text x="40" y="22" fill="white" fillOpacity="0.5" fontSize="13">
                Higher
              </text>

              {/* time axis */}
              {[
                [40, "Meal"],
                [233, "1 hr"],
                [427, "2 hr"],
                [620, "3 hr"],
              ].map(([x, t]) => (
                <g key={t}>
                  <line x1={x} x2={x} y1="220" y2="228" stroke="white" strokeOpacity="0.3" />
                  <text x={x} y="250" textAnchor={x === 40 ? "start" : x === 620 ? "end" : "middle"} fill="white" fillOpacity="0.55" fontSize="13">
                    {t}
                  </text>
                </g>
              ))}

              {/* the "on its own" curve stays as a reference once you change the meal */}
              <path
                d={OPTIONS[0].path}
                fill="none"
                stroke="white"
                strokeOpacity={selected === "alone" ? 0 : 0.35}
                strokeWidth="1.5"
                strokeDasharray="4 6"
                style={{ transition: "stroke-opacity 0.4s" }}
              />
              <text
                x="198"
                y="40"
                fill="white"
                fillOpacity={selected === "alone" ? 0 : 0.5}
                fontSize="12.5"
                style={{ transition: "fill-opacity 0.4s" }}
              >
                On its own
              </text>

              <path
                d={current.path}
                style={{ d: `path("${current.path}")` } as React.CSSProperties}
                className="curve-morph"
                fill="none"
                stroke="#f5a623"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>

            <p aria-live="polite" className="mt-6 min-h-[3.2em] max-w-[34rem] text-[16.5px] leading-snug text-white/85">
              {current.caption}
            </p>
          </div>

          <p className="mt-5 max-w-[40rem] text-[13px] leading-relaxed text-white/50">
            Illustrative curves. The patterns come from published studies on eating
            vegetables before carbohydrates (Shukla et al., <i>Diabetes Care</i>, 2015) and
            walking after meals (Buffey et al., <i>Sports Medicine</i>, 2022). Your own
            response will differ, which is the point.
          </p>
        </div>

        <fieldset className="lg:col-span-5 lg:row-start-2">
          <legend className="sr-only">Choose how the meal is eaten</legend>
          <div className="flex flex-col gap-2">
            {OPTIONS.map((o) => (
              <label
                key={o.key}
                className={cn(
                  "group flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3.5 text-[16.5px] ring-1 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal",
                  selected === o.key
                    ? "bg-white/10 ring-white/35"
                    : "ring-white/10 hover:bg-white/5 hover:ring-white/20"
                )}
              >
                <input
                  type="radio"
                  name={`${id}-meal`}
                  value={o.key}
                  checked={selected === o.key}
                  onChange={() => setSelected(o.key)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-full ring-1 transition-colors",
                    selected === o.key ? "bg-gold ring-gold" : "ring-white/40"
                  )}
                >
                  <span className={cn("size-2 rounded-full bg-pine", selected !== o.key && "hidden")} />
                </span>
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </section>
  );
}
