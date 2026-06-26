import type { Metadata } from "next";
import { CheckCircle2, Clock, UserRound } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/ui";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Book a 20-minute demo. We'll walk through GlucoSolutions on a real, de-identified case — yours if you have one. No slides.",
};

const EXPECT = [
  { icon: CheckCircle2, text: "A walk through GlucoSolutions on a real, de-identified case — yours if you have one." },
  { icon: Clock, text: "20 minutes. No slides." },
  { icon: UserRound, text: "You'll talk to a founder, not a sales rep." },
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[320px]"
            style={{ background: "linear-gradient(180deg, #FBF7F0 0%, var(--color-page) 100%)" }}
          />
          <Container className="relative">
            <div className="max-w-3xl">
              <Eyebrow>Contact</Eyebrow>
              <h1 className="display-serif mt-5 text-[clamp(2.25rem,5vw,3.5rem)] text-ink-900 text-balance">
                Book a 20-minute demo.
              </h1>
              <p className="mt-6 text-[19px] leading-relaxed text-ink-500">
                We&apos;ll walk through GlucoSolutions on a real, de-identified case
                — yours if you have one.
              </p>
            </div>
          </Container>
        </section>

        <section className="pb-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <ContactForm />

              <div className="lg:pt-2">
                <h2 className="mono-label">What to expect</h2>
                <ul className="mt-5 space-y-5">
                  {EXPECT.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex gap-3.5">
                      <Icon size={20} className="mt-0.5 shrink-0 text-sky-700" aria-hidden />
                      <span className="text-[16px] leading-relaxed text-ink-700">{text}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-line pt-6">
                  {/* [CONFIRM] contact email + SPF/DKIM on glucosolutions.ca */}
                  <p className="text-[15px] text-ink-500">
                    Prefer email?{" "}
                    <a
                      href="mailto:hello@glucosolutions.ca"
                      className="font-medium text-sky-700 underline decoration-sky-700/40 underline-offset-2 transition-colors hover:decoration-sky-700"
                    >
                      hello@glucosolutions.ca
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
