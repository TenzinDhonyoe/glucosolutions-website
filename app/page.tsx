import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Science } from "@/components/sections/Science";
import { Comparison } from "@/components/sections/Comparison";
import { Waitlist } from "@/components/sections/Waitlist";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  faqPage,
  product,
  service,
  softwareApplication,
} from "@/lib/seo/jsonLd";
import { FAQS } from "@/lib/seo/faqs";

export default function Home() {
  return (
    <>
      <JsonLd
        nodes={[
          product(),
          softwareApplication(),
          service(),
          faqPage(FAQS),
        ]}
      />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Problem />
        <Science />
        <Solution />
        <Comparison />
        <Waitlist />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
