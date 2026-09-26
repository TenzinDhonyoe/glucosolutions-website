import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the founders behind GlucoSolutions: Justin Allen, CEO, and Tenzin Dhonyoe, CTO.",
  alternates: { canonical: "/team" },
};

const TEAM: { name: string; role: string; photo: string; linkedin: string }[] = [
  {
    name: "Justin Allen",
    role: "Co-founder, CEO",
    photo: "/photos/team/justin-allen.png",
    linkedin: "https://www.linkedin.com/in/justin-allen-glucosolutions/",
  },
  {
    name: "Tenzin Dhonyoe",
    role: "Co-founder, CTO",
    photo: "/photos/team/tenzin-dhonyoe.png",
    linkedin: "https://www.linkedin.com/in/tenzindhonyoe/",
  },
];

export default function TeamPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-page">
        <Container className="pb-24 pt-36 md:pb-32 md:pt-44">
          <div className="max-w-[40rem]">
            <p className="text-[13px] font-medium text-ink-400">Team</p>
            <h1 className="mt-3 text-[clamp(2.2rem,1.6rem+2.2vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink-900 text-balance">
              The people behind GlucoSolutions.
            </h1>
            <p className="mt-5 max-w-[32rem] text-[17px] leading-relaxed text-ink-500">
              A team of biomedical specialists building in the prediabetic space, so people can
              see what moves their blood sugar and reverse it sooner.
            </p>
          </div>

          <ul className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 md:mt-20">
            {TEAM.map((person) => (
              <li key={person.name}>
                <div className="relative aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-[20px] bg-sunken">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    sizes="(min-width: 640px) 26rem, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-6 max-w-[26rem] border-t border-line pt-5">
                  <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-ink-900">{person.name}</h2>
                  <p className="mt-1 text-[15px] text-ink-500">{person.role}</p>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink-700 underline decoration-line-2 underline-offset-4 transition-colors hover:text-ink-900 hover:decoration-ink-900"
                  >
                    LinkedIn
                    <ArrowUpRight size={14} aria-hidden />
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-24 flex flex-col items-start gap-6 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[30rem] text-[17px] leading-relaxed text-ink-500">
              Want to talk? Email{" "}
              <a
                href="mailto:justin@glucosolutions.ca,tenzin@glucosolutions.ca"
                className="font-medium text-ink-900 underline decoration-line-2 underline-offset-4 hover:decoration-ink-900"
              >
                the founders
              </a>
              , or join the waitlist to hear when the band is ready.
            </p>
            <Button href="/#waitlist" size="lg" pill iconRight={ArrowRight}>
              Join the waitlist
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
