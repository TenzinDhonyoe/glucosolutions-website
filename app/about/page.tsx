import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FinalCta } from "@/components/home/FinalCta";
import { Container, Section, PageHero, Card, Avatar } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "We build for the dietitian, so the dietitian can build the patient. Founded by Tenzin Dhonyoe and Justin Allen, built for solo private-practice RDs.",
};

const FOUNDERS = [
  {
    initials: "TD",
    tone: "sky" as const,
    name: "Tenzin Dhonyoe",
    role: "Co-founder & CTO",
    // [Tenz CONFIRM] pick one public credibility line; keep the full CV off the site
    bio: "Biomedical engineer (Toronto Metropolitan University). Built the product end to end — interpretation engine, dashboard, and Redu. Owns product and engineering.",
  },
  {
    initials: "JA",
    tone: "green" as const,
    name: "Justin Allen",
    role: "Co-founder & CEO",
    // [CONFIRM] add one credibility line — background / why he's credible to RDs and investors
    bio: "Owns sales, partnerships, and fundraising.",
  },
];

// [CONFIRM which to make public] — true, ownable recognitions only. YC omitted by design.
const RECOGNITION = ["DMZ Basecamp", "Norman Esch Award", "Hult Prize Canada Nationals · Top 8"];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PageHero
          eyebrow="About"
          title="We build for the dietitian, so the dietitian can build the patient."
          lead="The between-session gap is where outcomes are won and lost — and solo private-practice RDs are the ones underserved by enterprise tools. So we built for them."
        />

        {/* Origin story */}
        <Section tone="card">
          <div className="max-w-3xl">
            <h2 className="display-serif text-[clamp(1.7rem,3vw,2.3rem)] text-ink-900">
              The short version.
            </h2>
            {/* [Tenz CONFIRM] hardware origin on the public site */}
            <div className="mt-6 space-y-4 text-[18px] leading-relaxed text-ink-500">
              <p>
                We started on glucose hardware. Building it, we kept hitting the
                same wall: the sensor was never the real bottleneck — the
                dietitian&apos;s workflow was.
              </p>
              <p>
                A clinician sees a patient once a month and then loses the thread
                for 29 days. No tool gave them that time back, or made the data
                trustworthy enough to act on. So we pivoted: from hardware to
                software, built around the clinician. The name stuck.
              </p>
            </div>
          </div>
        </Section>

        {/* Founders */}
        <Section>
          <h2 className="display-serif text-[clamp(1.7rem,3vw,2.3rem)] text-ink-900">
            Two founders. No advisors to dress it up.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {FOUNDERS.map((f) => (
              <Card key={f.name} className="p-7">
                <div className="flex items-center gap-4">
                  <Avatar initials={f.initials} tone={f.tone} size={56} />
                  <div>
                    <div className="font-serif text-xl text-ink-900">{f.name}</div>
                    <div className="text-[14px] text-sky-700">{f.role}</div>
                  </div>
                </div>
                <p className="mt-5 text-[16px] leading-relaxed text-ink-500">{f.bio}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* Recognition */}
        <Section tone="sunken">
          <div className="max-w-3xl">
            <h2 className="display-serif text-[clamp(1.7rem,3vw,2.3rem)] text-ink-900">
              Recognition.
            </h2>
            <p className="mt-4 text-[16px] text-ink-500">
              A few programs and awards we&apos;re proud of — the ones we can stand
              behind.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {RECOGNITION.map((r) => (
              <span
                key={r}
                className="rounded-full border border-line bg-card px-5 py-2.5 text-[15px] font-medium text-ink-700"
              >
                {r}
              </span>
            ))}
          </div>
        </Section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
