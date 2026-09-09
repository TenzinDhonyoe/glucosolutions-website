import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Section, Button, Card, Eyebrow, MediaHero, Badge } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, DrawLine } from "@/components/motion";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the founders behind GlucoSolutions: Justin Allen, CEO, and Tenzin Dhonyoe, CTO.",
};

const TEAM: { name: string; role: string; photo: string; linkedin: string }[] = [
  {
    name: "Justin Allen",
    role: "CEO",
    photo: "/photos/team/justin-allen.png",
    linkedin: "https://www.linkedin.com/in/justin-allen-glucosolutions/",
  },
  {
    name: "Tenzin Dhonyoe",
    role: "CTO",
    photo: "/photos/team/tenzin-dhonyoe.png",
    linkedin: "https://www.linkedin.com/in/tenzindhonyoe/",
  },
];

export default function TeamPage() {
  return (
    <>
      <Nav transparentOverHero />
      <main className="flex-1">
        <MediaHero
          image="/photos/city.jpg"
          eyebrow="Team"
          title="The people behind GlucoSolutions."
          lead="A team of biomedical specialists building in the prediabetic space."
          objectPosition="center"
          wash="left"
        >
          <Button href="/contact" size="lg" pill iconRight={ArrowRight}>
            Talk to a founder
          </Button>
        </MediaHero>

        <Section tone="card">
          <Reveal>
            <Eyebrow number="01">Leadership</Eyebrow>
          </Reveal>
          <DrawLine className="mt-8 h-px w-full origin-left bg-line" />

          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2" stagger={0.1}>
            {TEAM.map((person) => (
              <StaggerItem key={person.name} variant="up">
                <Card className="h-full p-7" lift>
                  <div className="flex items-start gap-5">
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on LinkedIn`}
                      className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-1 ring-ink-900/10 transition-shadow hover:ring-2 hover:ring-sky-700/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
                    >
                      <Image
                        src={person.photo}
                        alt={person.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </a>
                    <div>
                      <h3 className="font-serif text-xl text-ink-900">{person.name}</h3>
                      <Badge tone="brand" className="mt-2">
                        {person.role}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      </main>
      <Footer
        eyebrow=""
        headline="See it on your own caseload."
        blurb="A 20-minute walkthrough on a real, de-identified case. No slides."
        ctaLabel="Book a demo"
        ctaHref="/contact"
        tagline=""
      />
    </>
  );
}
