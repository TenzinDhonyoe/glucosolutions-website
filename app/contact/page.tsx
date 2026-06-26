import type { Metadata } from "next";
import { CheckCircle2, Clock, UserRound } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, MediaHero } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Book a 20-minute demo. We'll walk through GlucoSolutions on a real, de-identified case, yours if you have one. No slides.",
};

const EXPECT = [
  { icon: CheckCircle2, text: "A walk through GlucoSolutions on a real, de-identified case, yours if you have one." },
  { icon: Clock, text: "20 minutes. No slides." },
  { icon: UserRound, text: "You'll talk to a founder, not a sales rep." },
];

export default function ContactPage() {
  return (
    <>
      <Nav transparentOverHero />
      <main className="flex-1">
        <MediaHero
          image="/photos/abstract-warm.jpg"
          eyebrow="Contact"
          title="Book a 20-minute demo."
          lead="We'll walk through GlucoSolutions on a real, de-identified case, yours if you have one. No slides."
          objectPosition="center"
          wash="left"
          size="compact"
        />

        <section className="py-20 md:py-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <Reveal variant="left">
                <ContactForm />
              </Reveal>

              <Reveal variant="right" className="lg:pt-2">
                <h2 className="mono-label">What to expect</h2>
                <Stagger as="ul" className="mt-5 space-y-5" stagger={0.1}>
                  {EXPECT.map(({ icon: Icon, text }) => (
                    <StaggerItem as="li" key={text} className="flex gap-3.5">
                      <Icon size={20} className="mt-0.5 shrink-0 text-sky-700" aria-hidden />
                      <span className="text-[16px] leading-relaxed text-ink-700">{text}</span>
                    </StaggerItem>
                  ))}
                </Stagger>

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
              </Reveal>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
