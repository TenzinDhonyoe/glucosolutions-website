import type { Metadata } from "next";
import { ArrowRight, Cpu, PenLine, Utensils, Droplet, Footprints, Moon, CalendarCheck, MessageSquareText, TrendingUp, ClipboardList } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FinalCta } from "@/components/home/FinalCta";
import { FactCard } from "@/components/home/FactCard";
import { Container, Section, Eyebrow, Button, Card, FeatureStatus } from "@/components/ui";
import type { IconType } from "@/components/ui";

export const metadata: Metadata = {
  title: "Product",
  description:
    "One dashboard for the patient you only see monthly. Patients log in Redu; GlucoSolutions interprets the behavior with sourced facts; you act with confidence.",
};

const PATIENT_LOGS: { icon: IconType; label: string; note: string }[] = [
  { icon: Utensils, label: "Meals", note: "Photo or quick entry" },
  { icon: Droplet, label: "Glucose", note: "Finger-prick or CGM" },
  { icon: Footprints, label: "Steps", note: "Auto from phone" },
  { icon: Moon, label: "Sleep", note: "Nightly summary" },
];

const DASHBOARD_VIEWS: { icon: IconType; label: string; note: string }[] = [
  { icon: TrendingUp, label: "Behavior timeline", note: "Glucose overlaid on meals, steps, sleep" },
  { icon: ClipboardList, label: "Drift flags", note: "Surfaced before they become setbacks" },
  { icon: CalendarCheck, label: "Session-prep summary", note: "What changed since last visit" },
  { icon: MessageSquareText, label: "In-app messaging", note: "Stay in touch between visits" },
];

const VALUE_PROPS = [
  {
    status: "available" as const,
    title: "Workflow automation",
    body: "Pre-session summaries and auto-organized logs cut the admin around every appointment. You walk in already knowing what changed — chart review stops eating your unpaid hours.",
  },
  {
    status: "available" as const,
    title: "Between-session continuity",
    body: "A live, day-to-day view of patient behavior. Message in-app, answer questions in context, and catch drift in week two instead of week four.",
  },
  {
    status: "in-development" as const,
    title: "Outcomes reporting",
    body: "One-click, physician-ready reports — A1c trends, adherence, behavior change — formatted to win the next referral. Building this now with our launch RD.",
  },
];

export default function ProductPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[360px]"
            style={{ background: "linear-gradient(180deg, #FBF7F0 0%, var(--color-page) 100%)" }}
          />
          <Container className="relative">
            <div className="max-w-3xl">
              <Eyebrow>Product</Eyebrow>
              <h1 className="display-serif mt-5 text-[clamp(2.25rem,5vw,3.5rem)] text-ink-900 text-balance">
                One dashboard for the patient you only see monthly.
              </h1>
              <p className="mt-6 text-[19px] leading-relaxed text-ink-500">
                Patients log in Redu. GlucoSolutions turns that raw behavior into
                sourced interpretation. You act on it — prepped for every session,
                connected between them.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" size="lg" pill iconRight={ArrowRight}>
                  Book a demo
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* The interpretation engine — the moat */}
        <Section tone="card">
          <Eyebrow number="01">The interpretation engine</Eyebrow>
          <h2 className="display-serif mt-4 max-w-3xl text-[clamp(1.9rem,3.6vw,2.7rem)] text-ink-900 text-balance">
            How we turn raw logs into something you can trust.
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-500">
            Two layers, kept deliberately separate. The result: no invented
            numbers, no hallucinated trends.
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-5">
              <Card className="p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                  <Cpu size={20} aria-hidden />
                </span>
                <h3 className="mt-5 font-serif text-xl text-ink-900">
                  Layer 1 — Facts, computed and tagged
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                  A deterministic layer computes facts directly from the data and
                  tags each one with the exact readings behind it. Numbers come
                  from arithmetic, not a language model.
                </p>
              </Card>
              <Card className="p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                  <PenLine size={20} aria-hidden />
                </span>
                <h3 className="mt-5 font-serif text-xl text-ink-900">
                  Layer 2 — Narration, constrained to the facts
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                  A separate layer writes the plain-English summary — constrained
                  to only say what the facts support. It explains; it never
                  invents.
                </p>
              </Card>
            </div>
            <div className="lg:pl-4">
              <FactCard />
            </div>
          </div>
        </Section>

        {/* Redu in → dashboard out */}
        <Section>
          <Eyebrow number="02">The loop</Eyebrow>
          <h2 className="display-serif mt-4 text-[clamp(1.9rem,3.6vw,2.7rem)] text-ink-900">
            Patients log. You see what matters.
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className="p-7">
              <div className="mono-label mb-5">What patients log · Redu</div>
              <ul className="space-y-4">
                {PATIENT_LOGS.map(({ icon: Icon, label, note }) => (
                  <li key={label} className="flex items-center gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                      <Icon size={18} aria-hidden />
                    </span>
                    <div>
                      <div className="text-[15px] font-semibold text-ink-900">{label}</div>
                      <div className="text-[13px] text-ink-500">{note}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-line pt-4 text-[14px] text-ink-500">
                Most patients aren't on a CGM — manual glucose entry is fully
                supported, and logging consistency is tracked so you know how much
                to trust the picture.
              </p>
            </Card>

            <Card className="p-7" warm>
              <div className="mono-label mb-5">What you see · Dashboard</div>
              <ul className="space-y-4">
                {DASHBOARD_VIEWS.map(({ icon: Icon, label, note }) => (
                  <li key={label} className="flex items-center gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
                      <Icon size={18} aria-hidden />
                    </span>
                    <div>
                      <div className="text-[15px] font-semibold text-ink-900">{label}</div>
                      <div className="text-[13px] text-ink-500">{note}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>

        {/* Three value props expanded */}
        <Section tone="sunken">
          <Eyebrow number="03">What it does for you</Eyebrow>
          <h2 className="display-serif mt-4 text-[clamp(1.9rem,3.6vw,2.7rem)] text-ink-900">
            Three jobs, honestly labeled.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {VALUE_PROPS.map((v) => (
              <Card key={v.title} className="flex flex-col p-7">
                <FeatureStatus status={v.status} />
                <h3 className="mt-4 font-serif text-xl text-ink-900">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{v.body}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* Roadmap — honest, undated */}
        <Section>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow number="04">Roadmap</Eyebrow>
              <h2 className="display-serif mt-4 text-[clamp(1.9rem,3.6vw,2.7rem)] text-ink-900">
                Where this is going.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-500">
                We build in the open with our launch RD. No public dates — just
                the honest order of things.
              </p>
            </div>
            <ul className="space-y-px overflow-hidden rounded-xl border border-line bg-line">
              {[
                { when: "Next", what: "Physician-ready outcome exports" },
                { when: "Next", what: "Deeper drift detection across meals and activity" },
                { when: "Later", what: "Templated referral summaries by specialty" },
              ].map((r, i) => (
                <li key={i} className="flex items-center gap-5 bg-card p-5">
                  <span className="mono-label w-14 shrink-0">{r.when}</span>
                  <span className="text-[16px] text-ink-700">{r.what}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
