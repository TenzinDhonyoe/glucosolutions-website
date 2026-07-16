import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { Showcase } from "@/components/home/Showcase";
import { Mission } from "@/components/home/Mission";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Capabilities } from "@/components/home/Capabilities";
import { Provenance } from "@/components/home/Provenance";
import { ReduTeaser } from "@/components/home/ReduTeaser";
import { SecurityTeaser } from "@/components/home/SecurityTeaser";

export default function Home() {
  return (
    <>
      <Nav revealUntilSelector="#mission-statement" />
      <main className="flex-1">
        <Hero />
        <Showcase />
        <Mission />
        <HowItWorks />
        <Capabilities />
        <Provenance />
        <ReduTeaser />
        <SecurityTeaser />
      </main>
      <Footer />
    </>
  );
}
