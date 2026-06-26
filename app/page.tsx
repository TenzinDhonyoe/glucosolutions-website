import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Capabilities } from "@/components/home/Capabilities";
import { Provenance } from "@/components/home/Provenance";
import { ReduTeaser } from "@/components/home/ReduTeaser";
import { SecurityTeaser } from "@/components/home/SecurityTeaser";
import { PricingTeaser } from "@/components/home/PricingTeaser";
import { FounderTeaser } from "@/components/home/FounderTeaser";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <Capabilities />
        <Provenance />
        <ReduTeaser />
        <SecurityTeaser />
        <PricingTeaser />
        <FounderTeaser />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
