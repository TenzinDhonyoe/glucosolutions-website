import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Science } from "@/components/sections/Science";
import { Comparison } from "@/components/sections/Comparison";
import { Team } from "@/components/sections/Team";
import { Advisors } from "@/components/sections/Advisors";
import { Waitlist } from "@/components/sections/Waitlist";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Marquee } from "@/components/interactive/Marquee";

const MARQUEE_ITEMS = [
  "Know your blood sugar",
  "No needles",
  "AI coach included",
  "No prescription",
  "Charge once a week",
  "Trends, not pricks",
  "iOS first",
];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Marquee items={MARQUEE_ITEMS} duration={42} />
        <Problem />
        <Science />
        <Solution />
        <HowItWorks />
        <Comparison />
        <Team />
        <Advisors />
        <Waitlist />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
