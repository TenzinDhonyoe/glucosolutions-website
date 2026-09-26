import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/home/Hero";
import { Mission } from "@/components/home/Mission";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Faq } from "@/components/home/Faq";
import { Waitlist } from "@/components/home/Waitlist";
import { FAQS } from "@/lib/seo/faqs";
import { faqPage, product, softwareApplication } from "@/lib/seo/jsonLd";

export default function Home() {
  return (
    <>
      <JsonLd nodes={[product(), softwareApplication(), faqPage(FAQS)]} />
      <Nav revealUntilSelector="#mission-statement" />
      <main className="flex-1">
        <Hero />
        <Mission />
        <HowItWorks />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
