import { Container, SectionHeader } from "@/components/ui";
import { ParticleFigure } from "@/components/stage/ParticleFigure";

// A soft pool of light behind each figure: no edges, no box.
const FIGURE_LIGHT =
  "radial-gradient(ellipse 62% 58% at 50% 52%, var(--stage-center) 0%, color-mix(in srgb, var(--stage-center) 60%, transparent) 52%, transparent 100%)";

const STEPS = [
  {
    shape: "band" as const,
    title: "Wear the band",
    body: "It reads your wrist through the skin. No needles, no patches, nothing to replace. Charge it about once a week.",
  },
  {
    shape: "meal" as const,
    title: "Live like you normally do",
    body: "Eat, move, work, sleep. The band follows your glucose in the background while you get on with your day.",
  },
  {
    shape: "trend" as const,
    title: "See what moved you",
    body: "After a meal, a walk or a rough night, see whether you rose, held steady or settled, with one plain-English suggestion for next time.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="scroll-mt-24 bg-page py-24 md:py-32">
      <Container>
        <SectionHeader
          id="how-title"
          kicker="How it works"
          title="It runs in the background of an ordinary day."
          lede="Three steps, and the first two are things you already do."
        />

        <ol className="mt-14 grid gap-x-8 gap-y-14 md:mt-20 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <div className="relative aspect-[5/4]" style={{ background: FIGURE_LIGHT }}>
                <ParticleFigure scene={s.shape} className="absolute inset-0" />
              </div>
              {/* The rule under each step fills in turn, so the three read as
                  one sequence. */}
              <div className="relative mt-6 pt-6">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
                <span
                  aria-hidden
                  className="step-rail absolute inset-x-0 top-0 h-px origin-left bg-ink-900"
                  style={{ animationDelay: `${i * 3}s` }}
                />
                <p className="tnum text-[13px] font-medium text-ink-400">Step {i + 1}</p>
                <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.02em] text-ink-900">{s.title}</h3>
                <p className="mt-2.5 max-w-[22rem] text-[15.5px] leading-relaxed text-ink-500">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
