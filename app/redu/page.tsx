import type { Metadata } from "next";
import { Zap, LineChart, HeartHandshake, Stethoscope } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { ReduScreen } from "@/components/redu/ReduScreen";
import { Container, Section, Card, Eyebrow } from "@/components/ui";
import { Reveal, Parallax } from "@/components/motion";
import type { IconType } from "@/components/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Redu: a second chance with your health",
  description:
    "Log meals and glucose in seconds, see what's actually working, and stay connected to your dietitian between visits. Redu is the patient app from GlucoSolutions.",
};

const BENEFITS: { icon: IconType; title: string; body: string }[] = [
  { icon: Zap, title: "Log in seconds", body: "Snap a meal, tap a glucose reading. Done before you overthink it." },
  { icon: LineChart, title: "See what's working", body: "Your patterns in plain language. Watch the small changes add up." },
  { icon: HeartHandshake, title: "Stay on track", body: "Gentle nudges and streaks that keep you coming back, not guilt." },
  { icon: Stethoscope, title: "Work with your dietitian", body: "Your RD sees the same picture, so every session starts where you are." },
];

const SCREENS: { src: string; alt: string; offset: number; topLine: string; body: string }[] = [
  {
    src: "/screens/redu-home.png",
    alt: "Redu home screen: metabolic score, personalized tips, activity, sleep, weight, and fibre.",
    offset: 22,
    topLine: "Your day at a glance.",
    body: "Score, streak, and one tip worth acting on.",
  },
  {
    src: "/screens/redu-log.png",
    alt: "Redu log screen: quick log for meals, glucose, and activity, plus recent entries.",
    offset: 40,
    topLine: "Log in seconds.",
    body: "Meals, glucose, and activity, then back to your day.",
  },
  {
    src: "/screens/redu-actions.png",
    alt: "Redu action plan: a glucose plan and personalized experiments to try.",
    offset: 22,
    topLine: "A plan that fits real life.",
    body: "Small experiments matched to your own readings.",
  },
  {
    src: "/screens/redu-pantry.png",
    alt: "Redu cheapest cart: savings across nearby stores with a mapped shopping route.",
    offset: 40,
    topLine: "Shop the smart way.",
    body: "The cheapest cart across nearby stores, mapped.",
  },
];

/* Real Apple mark — lucide ships no trademarked logos, so this is the actual
   Apple glyph (correct geometry, monochrome). Google Play omitted: Redu is
   iOS-only for now. */
function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.05 12.54c-.03-2.75 2.24-4.07 2.34-4.13-1.28-1.87-3.27-2.12-3.97-2.15-1.69-.17-3.3.99-4.15.99-.86 0-2.18-.97-3.58-.94-1.84.03-3.54 1.07-4.49 2.72-1.91 3.32-.49 8.23 1.37 10.92.91 1.32 1.99 2.79 3.41 2.74 1.37-.05 1.89-.88 3.54-.88 1.64 0 2.11.88 3.55.85 1.47-.02 2.4-1.34 3.3-2.66 1.04-1.53 1.47-3.01 1.49-3.09-.03-.01-2.86-1.1-2.89-4.36zM14.28 4.6c.76-.92 1.27-2.2 1.13-3.47-1.09.04-2.42.73-3.2 1.64-.7.81-1.31 2.11-1.15 3.35 1.22.1 2.46-.62 3.22-1.52z" />
    </svg>
  );
}

const STORE_BUTTONS = (
  <div className="flex flex-wrap gap-3">
    {/* [CONFIRM] real App Store link */}
    <a
      href="#"
      className="inline-flex items-center gap-2.5 rounded-xl bg-ink-900 px-5 py-3 text-[15px] font-semibold text-page transition-opacity hover:opacity-90"
    >
      <AppleGlyph className="h-[19px] w-[19px]" /> Download on the App Store
    </a>
  </div>
);

export default function ReduPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero — warm split, the real app UI as the star */}
        <section
          className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
          style={{ background: "linear-gradient(165deg, #FBF7F0 0%, #EAF6F3 55%, #EFF8FB 100%)" }}
        >
          {/* soft brand glow behind the phone */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-6%] top-1/3 h-[460px] w-[460px] rounded-full opacity-25 blur-3xl"
            style={{ background: "var(--brand-gradient)" }}
          />
          <Container className="relative">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
              <div>
                <Reveal>
                  <span className="text-gradient font-sans text-xl font-extrabold tracking-[0.08em]">REDU</span>
                </Reveal>
                <Reveal delay={0.05}>
                  <h1 className="display-serif mt-4 text-[clamp(2.25rem,5vw,3.6rem)] text-ink-900 text-balance">
                    A second chance with your health, one day at a time.
                  </h1>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-xl text-[19px] leading-relaxed text-ink-500">
                    Log meals and glucose in seconds, see what&apos;s actually
                    working, and stay connected to your dietitian between visits.
                  </p>
                </Reveal>
                <Reveal delay={0.15} className="mt-8">
                  {STORE_BUTTONS}
                </Reveal>
              </div>

              <Reveal variant="scale" className="order-first lg:order-last">
                <Parallax offset={28}>
                  <PhoneFrame>
                    <ReduScreen src="/screens/redu-home.png" alt="The Redu home screen: metabolic score, personalized tips, and daily stats." />
                  </PhoneFrame>
                </Parallax>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* App showcase — both main tabs, the proper in-app UI */}
        <Section tone="sunken">
          <Reveal>
            <Eyebrow slash>The app</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-serif mt-4 max-w-2xl text-[clamp(1.7rem,3vw,2.4rem)] text-ink-900 text-balance">
              The app your patients actually open.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-500">
              Calm, fast, and built for daily use. A metabolic score that makes
              sense, tips that fit real life, and logging that takes seconds.
            </p>
          </Reveal>

          <div className="mt-14 flex flex-wrap items-start justify-center gap-10 sm:gap-14">
            {SCREENS.map(({ src, alt, offset, topLine, body }, i) => (
              <Reveal
                key={src}
                variant="up"
                delay={i * 0.08}
                className={cn("w-full max-w-[264px]", i % 2 === 1 && "sm:mt-12")}
              >
                <Parallax offset={offset}>
                  <PhoneFrame>
                    <ReduScreen src={src} alt={alt} />
                  </PhoneFrame>
                </Parallax>
                <p className="mt-5 text-center text-[14px] text-ink-500">
                  <span className="font-semibold text-ink-900">{topLine}</span> {body}
                </p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* What you can do — editorial recap paired with a download CTA */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <Eyebrow slash>Everyday</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="display-serif mt-4 text-[clamp(1.8rem,3.2vw,2.6rem)] text-ink-900 text-balance">
                  What you can do with Redu.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-500">
                  Four small things, done well, every day. Nothing to learn, no
                  guilt when you miss one, and your dietitian always in the loop.
                </p>
              </Reveal>
              <Reveal delay={0.15} className="mt-8">
                {STORE_BUTTONS}
              </Reveal>
            </div>

            <Reveal variant="up" delay={0.1}>
              <Card warm shadow="md" className="divide-y divide-line px-7 sm:px-9">
                {BENEFITS.map(({ icon: Icon, title, body }, i) => (
                  <div
                    key={title}
                    className="flex items-start gap-5 py-6 first:pt-8 last:pb-8"
                  >
                    <span className="mt-0.5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                      <Icon size={22} aria-hidden />
                    </span>
                    <div>
                      <div className="flex items-baseline gap-2.5">
                        <span className="tnum text-[13px] font-semibold text-sky-700/70">
                          0{i + 1}
                        </span>
                        <h3 className="font-serif text-xl text-ink-900">{title}</h3>
                      </div>
                      <p className="mt-1.5 text-[16px] leading-relaxed text-ink-500">
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </Card>
            </Reveal>
          </div>
        </Section>
      </main>
      {/* Redu closes on its own note — the "Why Redu?" story, not the demo pitch */}
      <Footer
        eyebrow={`Why "Redu"?`}
        headline="Every day is a fresh chance to do the small thing well."
        blurb="It's the re-do. Health isn't a streak you can't break, it's one you can always restart."
        ctaLabel="Download on the App Store"
        ctaHref="#"
      />
    </>
  );
}
