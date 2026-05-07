import { MotionSection } from "@/components/MotionSection";
import { CounterStat } from "@/components/interactive/CounterStat";
import { PhotoCard } from "@/components/interactive/PhotoCard";
import { SectionLabel } from "@/components/interactive/SectionLabel";

export function Problem() {
  return (
    <MotionSection
      id="problem"
      ariaLabelledBy="problem-title"
      className="relative bg-paper text-charcoal"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-24 md:py-36">
        <SectionLabel index={1} label="The problem" />

        {/* Editorial intro: oversize Canela headline left, photo right */}
        <div className="mt-10 grid gap-12 lg:gap-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <h2
              id="problem-title"
              className="display-serif text-[38px] sm:text-[56px] md:text-[68px] lg:text-[76px] leading-[1.02] tracking-[-0.02em] text-charcoal text-balance"
            >
              The biggest health crisis nobody is{" "}
              <span className="display-serif-italic text-sage">watching</span>.
            </h2>
            <p className="mt-6 max-w-md text-[16px] sm:text-[17px] leading-[1.6] text-charcoal/75">
              Prediabetes hides inside ordinary days. A smoothie at
              breakfast, a sandwich at lunch, dessert with friends. The body
              keeps score long before anyone notices.
            </p>
          </div>

          <PhotoCard
            src="/photos/problem.png"
            alt="Woman pausing at her kitchen table with a coffee mug, beside a Gluco Solutions risk-factors card showing blood sugar, weight, activity, and sleep"
            caption="fig. 01 — the body keeps score."
            ratio="3 / 4"
          />
        </div>

        {/* Stat hierarchy + serif pull-quote */}
        <div className="mt-20 md:mt-28 grid gap-14 lg:gap-20 lg:grid-cols-[1.35fr_1fr] border-t border-stone pt-14 md:pt-16">
          <ul className="space-y-12 sm:space-y-14">
            {/* Anchor stat */}
            <li className="grid sm:grid-cols-[auto_1fr] gap-x-8 sm:gap-x-10 gap-y-4 items-baseline">
              <div className="display-serif text-[96px] sm:text-[136px] md:text-[160px] leading-[0.85] tracking-[-0.04em] text-sage tabular-nums">
                1<span className="text-charcoal/80">/</span>3
              </div>
              <div className="sm:pt-3 max-w-[28ch]">
                <div className="text-[17px] sm:text-[18px] leading-[1.45] text-charcoal font-medium">
                  US adults has prediabetes.
                </div>
                <cite className="caption not-italic mt-2 block">
                  <a
                    href="https://www.cdc.gov/diabetes/php/data-research/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-stone-2 underline-offset-2 hover:decoration-sage hover:text-charcoal/90 transition-colors duration-220"
                  >
                    CDC, National Diabetes Statistics Report (2024)
                  </a>
                </cite>
              </div>
            </li>

            {/* Follow-up stats */}
            <li className="grid sm:grid-cols-[auto_1fr] gap-x-8 sm:gap-x-10 gap-y-3 items-baseline">
              <div className="display-serif text-[60px] sm:text-[78px] md:text-[88px] leading-none tracking-[-0.025em] text-charcoal tabular-nums sm:min-w-[2.6ch]">
                <CounterStat to={80} suffix="%" duration={1600} />
              </div>
              <div className="sm:pt-2 max-w-[32ch]">
                <div className="text-[16px] sm:text-[17px] leading-[1.5] text-charcoal/85">
                  don&rsquo;t know they have it.
                </div>
                <cite className="caption not-italic mt-2 block">
                  <a
                    href="https://www.cdc.gov/diabetes/prevention-type-2/prediabetes-prevalence.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-stone-2 underline-offset-2 hover:decoration-sage hover:text-charcoal/90 transition-colors duration-220"
                  >
                    CDC Prediabetes Surveillance (2024)
                  </a>
                </cite>
              </div>
            </li>

            <li className="grid sm:grid-cols-[auto_1fr] gap-x-8 sm:gap-x-10 gap-y-3 items-baseline">
              <div className="display-serif text-[60px] sm:text-[78px] md:text-[88px] leading-none tracking-[-0.025em] text-charcoal tabular-nums sm:min-w-[2.6ch]">
                <CounterStat to={70} suffix="%" duration={1800} />
              </div>
              <div className="sm:pt-2 max-w-[32ch]">
                <div className="text-[16px] sm:text-[17px] leading-[1.5] text-charcoal/85">
                  progress to type 2 within a decade.
                </div>
                <cite className="caption not-italic mt-2 block">
                  <a
                    href="https://diabetes.org/about-diabetes/prediabetes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-stone-2 underline-offset-2 hover:decoration-sage hover:text-charcoal/90 transition-colors duration-220"
                  >
                    American Diabetes Association
                  </a>
                </cite>
              </div>
            </li>
          </ul>

          {/* Serif pull-quote — vertically centered on desktop so the column reads as paired */}
          <aside className="lg:self-center lg:border-l lg:border-stone lg:pl-12">
            <p className="display-serif text-[28px] sm:text-[36px] md:text-[44px] leading-[1.1] tracking-[-0.015em] text-charcoal/90 max-w-[18ch]">
              Prediabetes is{" "}
              <span className="display-serif-italic text-sage">silent</span>.
              <br />
              Until it isn&rsquo;t.
            </p>
            <div className="mt-6 h-px w-12 bg-sage" />
            <p className="caption mt-5 max-w-[30ch]">
              By the time symptoms surface, type 2 has often already begun.
              The window to course-correct is the one most people miss.
            </p>
          </aside>
        </div>
      </div>
    </MotionSection>
  );
}
