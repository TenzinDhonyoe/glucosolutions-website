import { FAQS } from "@/lib/seo/faqs";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-paper py-24 md:py-36">
      <div className="mx-auto grid max-w-page gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="faq-title" className="display h-section">
              Questions, answered plainly.
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-ink-soft">
              Something we didn&rsquo;t cover? Email{" "}
              <a
                href="mailto:tenzin@glucosolutions.ca"
                className="text-ink underline decoration-teal/50 underline-offset-4 hover:decoration-teal-deep"
              >
                tenzin@glucosolutions.ca
              </a>
              . A founder reads every message.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 lg:pl-6">
          {FAQS.map((f) => (
            <details key={f.q} className="group border-t border-line last:border-b">
              <summary className="flex items-center justify-between gap-6 rounded-md py-6 text-[1.1875rem] font-semibold leading-snug tracking-[-0.005em] transition-colors hover:text-teal-deep">
                {f.q}
                <svg viewBox="0 0 20 20" aria-hidden className="faq-plus size-5 shrink-0 text-teal-deep transition-transform duration-300">
                  <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="max-w-[40rem] pb-7 pr-10 text-[17px] leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
