import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Apple, Play, Zap, LineChart, HeartHandshake, Stethoscope, ShieldCheck } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { Container, Section, Card, StatusPill } from "@/components/ui";
import type { IconType } from "@/components/ui";

export const metadata: Metadata = {
  title: "Redu — a second chance with your health",
  description:
    "Log meals and glucose in seconds, see what's actually working, and stay connected to your dietitian between visits. Redu is the patient app from GlucoSolutions.",
};

const BENEFITS: { icon: IconType; title: string; body: string }[] = [
  { icon: Zap, title: "Log in seconds", body: "Snap a meal, tap a glucose reading. Done before you overthink it." },
  { icon: LineChart, title: "See what's working", body: "Your patterns in plain language. Watch the small changes add up." },
  { icon: HeartHandshake, title: "Stay on track", body: "Gentle nudges and streaks that keep you coming back — not guilt." },
  { icon: Stethoscope, title: "Work with your dietitian", body: "Your RD sees the same picture, so every session starts where you are." },
];

function ReduHeroScreen() {
  return (
    <div className="px-5 pb-6 pt-9">
      <div className="flex items-center justify-between">
        <span className="text-gradient font-sans text-lg font-bold tracking-[-0.02em]">Redu</span>
        <span className="rounded-full bg-warn-bg px-2.5 py-1 text-[11px] font-semibold text-warn">
          6-day streak
        </span>
      </div>
      <p className="mt-5 font-serif text-[20px] text-ink-900">Today is a good day to redo.</p>
      <div className="mt-4 rounded-lg border border-line bg-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-ink-500">Breakfast</span>
          <StatusPill state="good" dot={false} className="px-2 py-0.5 text-[11px]">
            In range
          </StatusPill>
        </div>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="tnum text-3xl font-medium text-ink-900">102</span>
          <span className="tnum text-[13px] text-ink-500">mg/dL</span>
        </div>
      </div>
      <div className="mt-3 rounded-lg bg-sky-50 p-3.5 text-[13px] text-ink-700">
        “One walk after lunch today — that&apos;s the whole goal. You&apos;ve got it.”
      </div>
    </div>
  );
}

export default function ReduPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
          style={{ background: "linear-gradient(180deg, #FBF7F0 0%, #EFF8FB 100%)" }}
        >
          <Container className="relative">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
              <div>
                <span className="text-gradient font-sans text-xl font-bold tracking-[-0.02em]">Redu</span>
                <h1 className="display-serif mt-4 text-[clamp(2.25rem,5vw,3.5rem)] text-ink-900 text-balance">
                  A second chance with your health, one day at a time.
                </h1>
                <p className="mt-6 max-w-xl text-[19px] leading-relaxed text-ink-500">
                  Log meals and glucose in seconds, see what&apos;s actually
                  working, and stay connected to your dietitian between visits.
                </p>
                {/* [CONFIRM] real App Store / Google Play links */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2.5 rounded-md bg-ink-900 px-5 py-3 text-[15px] font-semibold text-page transition-opacity hover:opacity-90"
                  >
                    <Apple size={20} aria-hidden /> Download on the App Store
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2.5 rounded-md border border-line-2 bg-card px-5 py-3 text-[15px] font-semibold text-ink-900 transition-colors hover:bg-sunken"
                  >
                    <Play size={18} aria-hidden /> Get it on Google Play
                  </a>
                </div>
              </div>
              <div className="order-first lg:order-last">
                <PhoneFrame>
                  <ReduHeroScreen />
                </PhoneFrame>
              </div>
            </div>
          </Container>
        </section>

        {/* What you can do */}
        <Section>
          <h2 className="display-serif text-[clamp(1.7rem,3vw,2.3rem)] text-ink-900">
            What you can do with Redu.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {BENEFITS.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                  <Icon size={20} aria-hidden />
                </span>
                <h3 className="mt-5 font-serif text-xl text-ink-900">{title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-ink-500">{body}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* "Redu" meaning */}
        <Section tone="sunken">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="display-serif text-[clamp(1.7rem,3vw,2.3rem)] text-ink-900">
              Why &ldquo;Redu&rdquo;?
            </h2>
            <p className="mt-5 text-[19px] leading-relaxed text-ink-500">
              It&apos;s the re-do. Health isn&apos;t a streak you can&apos;t break —
              it&apos;s one you can always restart. Every day is a fresh chance to
              do the small thing well.
            </p>
          </div>
        </Section>

        {/* For dietitians strip */}
        <Section>
          <Card className="flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between" warm>
            <div>
              <h3 className="font-serif text-xl text-ink-900">Are you a dietitian?</h3>
              <p className="mt-1.5 text-[16px] text-ink-500">
                Redu comes with the GlucoSolutions clinical dashboard.
              </p>
            </div>
            <Link
              href="/product"
              className="inline-flex shrink-0 items-center gap-2 font-semibold text-sky-700 hover:underline"
            >
              See the dashboard <ArrowRight size={17} aria-hidden />
            </Link>
          </Card>
        </Section>

        {/* Privacy reassurance */}
        <Section tone="card" className="border-t border-line">
          <div className="mx-auto flex max-w-2xl items-start gap-4 text-center sm:text-left">
            <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-good-bg text-good sm:inline-flex">
              <ShieldCheck size={20} aria-hidden />
            </span>
            <p className="text-[16px] leading-relaxed text-ink-500">
              Your data is yours. It&apos;s de-identified before any AI ever sees it,
              and shared only with the dietitian you choose to work with.{" "}
              <Link href="/security" className="font-medium text-sky-700 underline decoration-sky-700/40 underline-offset-2 transition-colors hover:decoration-sky-700">
                How we protect it →
              </Link>
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
