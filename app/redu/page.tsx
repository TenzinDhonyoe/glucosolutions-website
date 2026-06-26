import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Apple, Play, Zap, LineChart, HeartHandshake, Stethoscope, ShieldCheck } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { ReduHome, ReduLog } from "@/components/redu/ReduApp";
import { Container, Section, Card, Eyebrow } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, Parallax } from "@/components/motion";
import type { IconType } from "@/components/ui";

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

const STORE_BUTTONS = (
  <div className="flex flex-wrap gap-3">
    {/* [CONFIRM] real App Store / Google Play links */}
    <a
      href="#"
      className="inline-flex items-center gap-2.5 rounded-xl bg-ink-900 px-5 py-3 text-[15px] font-semibold text-page transition-opacity hover:opacity-90"
    >
      <Apple size={20} aria-hidden /> Download on the App Store
    </a>
    <a
      href="#"
      className="inline-flex items-center gap-2.5 rounded-xl border border-line-2 bg-card px-5 py-3 text-[15px] font-semibold text-ink-900 transition-colors hover:bg-sunken"
    >
      <Play size={18} aria-hidden /> Get it on Google Play
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
                    <ReduHome />
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
            <Reveal variant="up" className="w-full max-w-[300px]">
              <Parallax offset={22}>
                <PhoneFrame>
                  <ReduHome />
                </PhoneFrame>
              </Parallax>
              <p className="mt-5 text-center text-[14px] text-ink-500">
                <span className="font-semibold text-ink-900">Your day at a glance.</span>{" "}
                Score, streak, and one tip worth acting on.
              </p>
            </Reveal>
            <Reveal variant="up" delay={0.12} className="w-full max-w-[300px] sm:mt-12">
              <Parallax offset={40}>
                <PhoneFrame>
                  <ReduLog />
                </PhoneFrame>
              </Parallax>
              <p className="mt-5 text-center text-[14px] text-ink-500">
                <span className="font-semibold text-ink-900">Log in seconds.</span>{" "}
                Meals, glucose, and activity, then back to your day.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* What you can do */}
        <Section>
          <Reveal>
            <h2 className="display-serif text-[clamp(1.7rem,3vw,2.3rem)] text-ink-900">
              What you can do with Redu.
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2" stagger={0.1}>
            {BENEFITS.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title} variant="up">
                <Card className="h-full p-7" lift>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                    <Icon size={20} aria-hidden />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-ink-900">{title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink-500">{body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* "Redu" meaning — warm full-bleed photo band */}
        <section className="px-4">
          <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[1.75rem] ring-1 ring-ink-900/10">
            <Image
              src="/photos/leaves.jpg"
              alt=""
              fill
              sizes="(max-width: 1600px) 100vw, 1600px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(43,38,32,0.42) 0%, rgba(43,38,32,0.30) 45%, rgba(43,38,32,0.62) 100%)",
              }}
            />
            <div className="relative z-10 mx-auto max-w-2xl px-6 py-24 text-center md:py-32">
              <Reveal>
                <h2 className="display-serif text-[clamp(1.9rem,3.6vw,2.8rem)] text-page text-balance">
                  Why &ldquo;Redu&rdquo;?
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mt-5 text-[19px] leading-relaxed text-page/85">
                  It&apos;s the re-do. Health isn&apos;t a streak you can&apos;t
                  break, it&apos;s one you can always restart. Every day is a fresh
                  chance to do the small thing well.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* For dietitians strip */}
        <Section>
          <Reveal variant="scale">
            <Card className="flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between" warm shadow="md">
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
          </Reveal>
        </Section>

        {/* Privacy reassurance */}
        <Section tone="card" className="border-t border-line">
          <Reveal>
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
          </Reveal>
        </Section>
      </main>
      <Footer />
    </>
  );
}
