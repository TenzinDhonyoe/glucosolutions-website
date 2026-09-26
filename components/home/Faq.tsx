import { Accordion, Container } from "@/components/ui";
import { FAQS } from "@/lib/seo/faqs";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24 bg-page py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="text-[13px] font-medium text-ink-400">Questions</p>
            <h2
              id="faq-title"
              className="mt-3 text-[clamp(1.75rem,1.3rem+1.6vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink-900"
            >
              Answered plainly.
            </h2>
            <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-ink-500">
              Anything else, email{" "}
              <a
                href="mailto:tenzin@glucosolutions.ca"
                className="text-ink-900 underline decoration-line-2 underline-offset-4 hover:decoration-ink-900"
              >
                tenzin@glucosolutions.ca
              </a>
              .
            </p>
          </div>
          <Accordion className="lg:col-span-8" items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </Container>
    </section>
  );
}
