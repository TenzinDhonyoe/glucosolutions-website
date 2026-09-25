const FACTS = [
  {
    figure: "6.4 million",
    body: "Canadians were estimated to be living with prediabetes in 2025.",
    source: "Diabetes Canada",
    href: "https://www.diabetes.ca/advocacy-policies/advocacy-reports/national-and-provincial-backgrounders/diabetes-in-canada",
  },
  {
    figure: "More than half",
    body: "of people with prediabetes go on to develop type 2 within 8 to 10 years if nothing changes.",
    source: "Diabetes Canada",
    href: "https://www.diabetes.ca/advocacy-policies/advocacy-reports/national-and-provincial-backgrounders/diabetes-in-canada",
  },
  {
    figure: "58% lower",
    body: "risk of type 2 for people who changed how they ate and moved, in the Diabetes Prevention Program.",
    source: "New England Journal of Medicine, 2002",
    href: "https://www.nejm.org/doi/full/10.1056/NEJMoa012512",
  },
];

/**
 * Where prediabetes sits: between normal and type 2, and still reversible.
 * The scale is a diagram, not decoration: the marker and the segment captions
 * carry the section's argument.
 */
export function Window() {
  return (
    <section aria-labelledby="window-title" className="bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <h2 id="window-title" className="display h-section md:col-span-7">
            Prediabetes is the stage you can still turn around.
          </h2>
          <p className="lede text-ink-soft md:col-span-5 md:pt-3">
            Your blood sugar is higher than it should be, but it isn&rsquo;t type 2. Most
            people leave that appointment with the advice to eat better, move more and
            check back in a few months. The advice is sound. What&rsquo;s missing is a way
            to tell which changes are working for you.
          </p>
        </div>

        <figure className="mt-16 md:mt-24">
          <div className="relative pt-14">
            {/* Marker above the prediabetes segment */}
            <div className="absolute left-[46%] top-0 -translate-x-1/2 text-center md:left-[47%]">
              <p className="whitespace-nowrap text-[14px] font-semibold text-ink">A diagnosis puts you here</p>
              <svg viewBox="0 0 12 22" aria-hidden className="mx-auto mt-1 h-[22px] w-3 text-ink">
                <path d="M6 0v19M1.5 14.5 6 19l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="flex h-4 gap-1.5 overflow-hidden rounded-full" aria-hidden>
              <div className="w-[34%] bg-leaf" />
              <div className="w-[26%] bg-gold" />
              <div className="flex-1 bg-pine-2/80" />
            </div>

            <div className="mt-4 grid grid-cols-[34%_26%_1fr] gap-1.5 text-[14px] sm:text-[15px]">
              <p>
                <span className="block font-semibold">Normal</span>
                <span className="text-ink-faint">Where you&rsquo;re heading back to</span>
              </p>
              <p>
                <span className="block font-semibold">Prediabetes</span>
                <span className="text-ink-faint">Still reversible</span>
              </p>
              <p>
                <span className="block font-semibold">Type 2 diabetes</span>
                <span className="text-ink-faint">Harder to undo</span>
              </p>
            </div>

          </div>
          <figcaption className="sr-only">
            A scale from normal blood sugar, through prediabetes, to type 2 diabetes. A
            prediabetes diagnosis sits in the middle segment, which is still reversible,
            and normal is where you can head back to.
          </figcaption>
        </figure>

        <dl className="mt-20 grid gap-10 border-t border-line pt-10 md:mt-28 md:grid-cols-3 md:gap-12">
          {FACTS.map((f) => (
            <div key={f.figure}>
              <dt className="text-[clamp(1.75rem,1.4rem+1.2vw,2.4rem)] font-light leading-none tracking-[-0.02em] text-teal-deep [font-variation-settings:'wdth'_112]">
                {f.figure}
              </dt>
              <dd className="mt-3 text-[16px] leading-relaxed text-ink-soft">
                {f.body}{" "}
                <a
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap text-[13.5px] text-ink-faint underline decoration-line underline-offset-4 hover:text-ink"
                >
                  ({f.source})
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
