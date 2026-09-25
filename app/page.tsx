import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/home/Hero";
import { Window } from "@/components/home/Window";
import { SameMeal } from "@/components/home/SameMeal";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Band } from "@/components/home/Band";
import { Faq } from "@/components/home/Faq";
import { Closing } from "@/components/home/Closing";
import { FAQS } from "@/lib/seo/faqs";
import { faqPage, product, softwareApplication } from "@/lib/seo/jsonLd";

export default function Home() {
  return (
    <>
      <JsonLd nodes={[product(), softwareApplication(), faqPage(FAQS)]} />
      <Nav overHero />
      <main className="flex-1">
        <Hero />
        <Window />
        <SameMeal />
        <HowItWorks />
        <Band />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
