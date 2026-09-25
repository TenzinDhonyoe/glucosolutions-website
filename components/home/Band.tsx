import Image from "next/image";

const SPECS = [
  { term: "How it reads", detail: "Near-infrared light at two wavelengths, through the skin of your wrist." },
  {
    term: "What it shows",
    detail: "The direction of your glucose: rising, steady or settling. Not an exact reading in mmol/L.",
  },
  {
    term: "Accuracy so far",
    detail: "About 80% of trends classified correctly in benchtop testing. We'll publish more as testing continues.",
  },
  { term: "Needles, patches, refills", detail: "None." },
  { term: "Charging", detail: "About once a week." },
  { term: "App", detail: "iPhone first. Android after." },
];

const COMPARE = [
  { row: "How it reads", band: "Light, from outside the skin", cgm: "A filament under the skin" },
  { row: "What you see", band: "Rising, steady or settling", cgm: "Exact glucose numbers" },
  { row: "Replacements", band: "None", cgm: "A new sensor every 10 to 15 days" },
];

export function Band() {
  return (
    <section id="band" aria-labelledby="band-title" className="bg-paper-2 py-24 md:py-36">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <h2 id="band-title" className="display h-section md:col-span-7">
            Light instead of needles.
          </h2>
          <p className="lede text-ink-soft md:col-span-5 md:pt-3">
            Continuous glucose monitors were built for managing diabetes. You don&rsquo;t need
            a sensor in your arm to learn that a walk after dinner helps. You need to see the
            direction, meal after meal, until the habits stick.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="grain relative overflow-hidden rounded-[28px] lg:col-span-7">
            <Image
              src="/images/band-still.jpg"
              alt="The GlucoSolutions band resting on a folded linen cloth in late-afternoon sun, its oval sensor window facing up."
              width={2000}
              height={1493}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>

          <dl className="lg:col-span-5 lg:pl-4">
            {SPECS.map((s) => (
              <div key={s.term} className="grid gap-1 border-t border-line py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="text-[15px] font-semibold">{s.term}</dt>
                <dd className="text-[16px] leading-relaxed text-ink-soft">{s.detail}</dd>
              </div>
            ))}
            <p className="border-t border-line pt-5 text-[14px] text-ink-faint">
              Status: in development. Details may change before the first invites go out.
            </p>
          </dl>
        </div>

        <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h3 className="text-[1.5rem] font-semibold leading-snug tracking-[-0.01em]">
              How it compares with a CGM
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
              If you need exact numbers to make treatment decisions, a CGM is the right tool.
              If you want to learn which habits move you, direction is what you act on.
            </p>
          </div>

          <div className="lg:col-span-8">
            <table className="w-full border-collapse text-left text-[15px] sm:text-[16px]">
              <thead>
                <tr className="text-[14px] text-ink-faint">
                  <th scope="col" className="w-[28%] pb-4 font-normal">
                    <span className="sr-only">Feature</span>
                  </th>
                  <th scope="col" className="pb-4 font-semibold text-ink">
                    GlucoSolutions band
                  </th>
                  <th scope="col" className="pb-4 font-normal">
                    Typical CGM
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((c) => (
                  <tr key={c.row} className="border-t border-line">
                    <th scope="row" className="py-4 pr-4 font-normal text-ink-faint">
                      {c.row}
                    </th>
                    <td className="py-4 pr-4 font-semibold">{c.band}</td>
                    <td className="py-4 text-ink-soft">{c.cgm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
