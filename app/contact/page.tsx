import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Clock, UserRound } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { CalendlyEmbed } from "./CalendlyEmbed";

const CALENDLY_URL =
  "https://calendly.com/tenzin-glucosolutions/30min?hide_gdpr_banner=1&primary_color=1690c2";

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
        <section className="flex min-h-[100svh] flex-col p-4">
          <div className="relative mx-auto flex w-full max-w-[1600px] grow overflow-hidden rounded-[1.75rem] ring-1 ring-ink-900/10">
            <Image
              src="/photos/abstract-warm.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 1600px) 100vw, 1600px"
              className="object-cover"
              style={{ objectPosition: "center" }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(95deg, rgba(43,38,32,0.94) 0%, rgba(43,38,32,0.80) 42%, rgba(43,38,32,0.46) 72%, rgba(43,38,32,0.16) 100%)",
              }}
            />

            <div className="relative z-10 grid w-full gap-8 px-8 pb-8 pt-24 sm:px-12 sm:pb-10 md:px-16 lg:grid-cols-[minmax(0,1fr)_minmax(360px,500px)] lg:items-center lg:gap-14 lg:pb-10 lg:pt-28 xl:gap-20">
              <Reveal variant="left">
                <p className="font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-page/70">
                  <span className="mr-2 text-page/40">~</span>
                  Contact
                </p>
                <h1 className="display-serif mt-4 max-w-3xl text-[clamp(2.35rem,5vw,4.4rem)] leading-[0.98] text-page text-balance">
                  Book a 20-minute demo.
                </h1>
                <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-page/78">
                  We&apos;ll walk through GlucoSolutions on a real, de-identified
                  case, yours if you have one. No slides.
                </p>

                <Stagger as="ul" className="mt-7 grid max-w-2xl gap-3 text-page/80 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3" stagger={0.08}>
                  {EXPECT.map(({ icon: Icon, text }) => (
                    <StaggerItem as="li" key={text} className="flex gap-3 rounded-xl bg-page/8 p-3 ring-1 ring-page/10">
                      <Icon size={18} className="mt-0.5 shrink-0 text-sky-400" aria-hidden />
                      <span className="text-[13px] leading-relaxed">{text}</span>
                    </StaggerItem>
                  ))}
                </Stagger>

                <p className="mt-5 text-[14px] text-page/62">
                  Prefer email?{" "}
                  <a
                    href="mailto:tenzin@glucosolutions.ca"
                    className="font-medium text-page underline decoration-page/35 underline-offset-4 transition-colors hover:decoration-page"
                  >
                    tenzin@glucosolutions.ca
                  </a>
                </p>
              </Reveal>

              <Reveal variant="right">
                <div className="overflow-hidden rounded-[1.5rem] bg-page p-1.5 shadow-2xl ring-1 ring-page/14">
                  <CalendlyEmbed url={CALENDLY_URL} className="rounded-[1.1rem]" />
                </div>
                <Button href="/" variant="ghost" className="mt-3 text-page/70 hover:bg-page/10 hover:text-page">
                  Not ready yet? Back to overview
                </Button>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
