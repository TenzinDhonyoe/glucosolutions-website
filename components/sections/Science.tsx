import { MotionSection } from "@/components/MotionSection";
import { CounterStat } from "@/components/interactive/CounterStat";
import { GlucoseChart } from "@/components/product/GlucoseChart";

export function Science() {
  return (
    <MotionSection
      id="science"
      ariaLabelledBy="science-title"
      className="relative bg-ink-0 text-white border-t border-white/[0.06]"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-28 md:py-36">
        <div className="grid gap-10 md:gap-16 md:grid-cols-[1.1fr_1fr] md:items-end">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              The science
            </div>
            <h2
              id="science-title"
              className="mt-5 text-[40px] sm:text-[52px] md:text-[64px] leading-[1.02] font-extrabold tracking-[-0.035em] text-white text-balance"
            >
              Built on real signal.
            </h2>
          </div>
          <p className="md:pb-3 max-w-xl text-[17px] sm:text-[18px] leading-[1.6] text-white/60">
            Years of optics, electronics, and ML research distilled into a
            wearable form factor.
          </p>
        </div>

        {/* Animated illustrative trend chart — communicates "live data" without
            implying these are real readings. Used as the visual lead-in to the
            hardware/ML detail cards below. */}
        <div className="mt-20 rounded-2xl border border-white/[0.06] bg-ink-1 p-6 sm:p-8">
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-led/80">
                Illustrative trend
              </div>
              <div className="mt-1 text-[14px] text-white/55">
                What the wearable sees over a typical day
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[12px] text-white/50">
              <span className="flex items-center gap-2">
                <span className="block h-2 w-2 rounded-full bg-brand-led/40" />
                target band
              </span>
              <span className="flex items-center gap-2">
                <span className="block h-2 w-6 rounded-full brand-gradient" />
                trend
              </span>
            </div>
          </div>
          <GlucoseChart />
        </div>

        <div className="mt-12 grid gap-px bg-white/[0.06] rounded-2xl overflow-hidden lg:grid-cols-2">
          <article className="bg-ink-1 p-8 sm:p-10 lift hover:bg-ink-2 hover:border-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-led/80">
              Hardware
            </div>
            <h3 className="mt-4 text-[22px] font-bold tracking-tight text-white">
              Multi-wavelength NIR optics
            </h3>
            <p className="mt-4 text-[16px] leading-[1.7] text-white/65">
              940&nbsp;nm primary and 1650&nbsp;nm secondary detection on a
              custom PCB targeting a ~$20 BOM. ESP32-S3 MCU. Benchtop-validated
              against reference glucose phantoms across nine concentrations.
            </p>
          </article>

          <article className="bg-ink-1 p-8 sm:p-10 lift hover:bg-ink-2">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-led/80">
              Machine learning
            </div>
            <h3 className="mt-4 text-[22px] font-bold tracking-tight text-white">
              Ensemble + domain adaptation
            </h3>
            <p className="mt-4 text-[16px] leading-[1.7] text-white/65">
              Random Forest, XGBoost, and LightGBM classifiers under a
              meta-learner. CORAL domain adaptation for cross-subject
              generalization. ~80% trend classification accuracy in benchtop
              testing.
            </p>
          </article>
        </div>

        <div className="mt-12 flex flex-wrap items-baseline gap-x-12 gap-y-6">
          <div className="flex items-baseline gap-3">
            <span className="text-[28px] sm:text-[32px] font-extrabold tracking-[-0.03em] brand-text-gradient tabular-nums">
              <CounterStat to={4} duration={1100} />
            </span>
            <span className="text-[14px] text-white/55">wavelengths</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-[28px] sm:text-[32px] font-extrabold tracking-[-0.03em] brand-text-gradient tabular-nums">
              <CounterStat to={9} duration={1100} />
            </span>
            <span className="text-[14px] text-white/55">
              glucose concentrations
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-[28px] sm:text-[32px] font-extrabold tracking-[-0.03em] brand-text-gradient tabular-nums">
              <CounterStat to={80} prefix="~" suffix="%" duration={1500} />
            </span>
            <span className="text-[14px] text-white/55">
              trend accuracy (benchtop)
            </span>
          </div>
        </div>

        <p className="mt-12 text-[12px] italic text-white/35 max-w-2xl">
          Wellness device. Not a substitute for medical-grade glucose
          measurement.
        </p>
      </div>
    </MotionSection>
  );
}
