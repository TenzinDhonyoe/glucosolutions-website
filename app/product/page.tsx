import type { Metadata } from "next";
import { ArrowRight, Cpu, PenLine, Utensils, Droplet, Footprints, Moon, CalendarCheck, MessageSquareText, TrendingUp, ClipboardList } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FactCard } from "@/components/home/FactCard";
import { DataFunnel } from "@/components/home/DataFunnel";
import { Section, Eyebrow, Button, Card, FeatureStatus, MediaHero } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, DrawLine } from "@/components/motion";
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
    body: "Pre-session summaries and auto-organized logs cut the admin around every appointment. You walk in already knowing what changed, so chart review stops eating your unpaid hours.",
  },
  {
    status: "available" as const,
    title: "Between-session continuity",
    body: "A live, day-to-day view of patient behavior. Message in-app, answer questions in context, and catch drift in week two instead of week four.",
  },
  {
    status: "in-development" as const,
    title: "Outcomes reporting",
    body: "One-click, physician-ready reports covering A1c trends, adherence, and behavior change, formatted to win the next referral. Building this now with our launch RD.",
  },
];

const ROADMAP = [
  { when: "Next", what: "Physician-ready outcome exports" },
  { when: "Next", what: "Deeper drift detection across meals and activity" },
  { when: "Later", what: "Templated referral summaries by specialty" },
];

export default function ProductPage() {
  return (
    <>
      <Nav transparentOverHero />
      <main className="flex-1">
        <MediaHero
          image="/photos/food.jpg"
          eyebrow="Product"
          title="One dashboard for the patient you only see monthly."
          lead="Patients log in Redu. GlucoSolutions turns that raw behavior into sourced interpretation. You act on it, prepped for every session, connected between them."
          objectPosition="65% center"
          wash="left"
        >
          <Button href="/contact" size="lg" pill iconRight={ArrowRight}>
            Book a demo
          </Button>
          <Button
            href="#engine"
            size="lg"
            variant="ghost"
            className="text-page hover:bg-page/10"
          >
            See how it works
          </Button>
        </MediaHero>

        {/* The interpretation engine — the moat */}
        <Section id="engine" tone="card">
          <Reveal>
            <Eyebrow number="01">The interpretation engine</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-serif mt-4 max-w-3xl text-[clamp(1.9rem,3.6vw,2.7rem)] text-ink-900 text-balance">
              How we turn raw logs into something you can trust.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-500">
              Two layers, kept deliberately separate. The result: no invented
              numbers, no hallucinated trends.
            </p>
          </Reveal>
          <DrawLine className="mt-8 h-px w-full origin-left bg-line" />

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Stagger className="space-y-5" stagger={0.12}>
              <StaggerItem variant="left">
                <Card className="p-7" lift>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                    <Cpu size={20} aria-hidden />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-ink-900">
                    Layer 1: Facts, computed and tagged
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                    A deterministic layer computes facts directly from the data and
                    tags each one with the exact readings behind it. Numbers come
                    from arithmetic, not a language model.
                  </p>
                </Card>
              </StaggerItem>
              <StaggerItem variant="left">
                <Card className="p-7" lift>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                    <PenLine size={20} aria-hidden />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-ink-900">
                    Layer 2: Narration, constrained to the facts
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                    A separate layer writes the plain-English summary, constrained
                    to only say what the facts support. It explains; it never
                    invents.
                  </p>
                </Card>
              </StaggerItem>
            </Stagger>
            <Reveal variant="right" className="lg:pl-4">
              <FactCard />
            </Reveal>
          </div>
        </Section>

        {/* Redu in → dashboard out */}
        <Section>
          <Reveal>
            <Eyebrow number="02">The loop</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-serif mt-4 max-w-3xl text-[clamp(1.9rem,3.6vw,2.7rem)] text-ink-900 text-balance">
              Patients log. You see what matters.
            </h2>
          </Reveal>

          {/* the funnel: everything a patient logs streams into one read */}
          <Reveal delay={0.1} variant="scale" className="mt-12 md:mt-16">
            <DataFunnel />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal variant="left">
              <Card className="p-7">
                <div className="mono-label mb-5">What patients log · Redu</div>
                <Stagger as="ul" className="space-y-4" stagger={0.08}>
                  {PATIENT_LOGS.map(({ icon: Icon, label, note }) => (
                    <StaggerItem as="li" key={label} className="flex items-center gap-4">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                        <Icon size={18} aria-hidden />
                      </span>
                      <div>
                        <div className="text-[15px] font-semibold text-ink-900">{label}</div>
                        <div className="text-[13px] text-ink-500">{note}</div>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
                <p className="mt-5 border-t border-line pt-4 text-[14px] text-ink-500">
                  Most patients aren&apos;t on a CGM, so manual glucose entry is fully
                  supported, and logging consistency is tracked so you know how much
                  to trust the picture.
                </p>
              </Card>
            </Reveal>

            <Reveal variant="right">
              <Card className="p-7" warm>
                <div className="mono-label mb-5">What you see · Dashboard</div>
                <Stagger as="ul" className="space-y-4" stagger={0.08}>
                  {DASHBOARD_VIEWS.map(({ icon: Icon, label, note }) => (
                    <StaggerItem as="li" key={label} className="flex items-center gap-4">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
                        <Icon size={18} aria-hidden />
                      </span>
                      <div>
                        <div className="text-[15px] font-semibold text-ink-900">{label}</div>
                        <div className="text-[13px] text-ink-500">{note}</div>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </Card>
            </Reveal>
          </div>
        </Section>

        {/* Three value props expanded */}
        <Section tone="sunken">
          <Reveal>
            <Eyebrow number="03">What it does for you</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-serif mt-4 text-[clamp(1.9rem,3.6vw,2.7rem)] text-ink-900">
              Three jobs, honestly labeled.
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-6 md:grid-cols-3" stagger={0.12}>
            {VALUE_PROPS.map((v) => (
              <StaggerItem key={v.title} variant="up">
                <Card className="flex h-full flex-col p-7" lift>
                  <FeatureStatus status={v.status} />
                  <h3 className="mt-4 font-serif text-xl text-ink-900">{v.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{v.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* Roadmap — honest, undated */}
        <Section>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal variant="left">
              <Eyebrow number="04">Roadmap</Eyebrow>
              <h2 className="display-serif mt-4 text-[clamp(1.9rem,3.6vw,2.7rem)] text-ink-900">
                Where this is going.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-500">
                We build in the open with our launch RD. No public dates, just
                the honest order of things.
              </p>
            </Reveal>
            <Stagger as="ul" className="space-y-px overflow-hidden rounded-xl border border-line bg-line" stagger={0.1}>
              {ROADMAP.map((r, i) => (
                <StaggerItem as="li" key={i} variant="right" className="flex items-center gap-5 bg-card p-5">
                  <span className="mono-label w-14 shrink-0">{r.when}</span>
                  <span className="text-[16px] text-ink-700">{r.what}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
