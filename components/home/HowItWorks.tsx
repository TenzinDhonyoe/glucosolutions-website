import Image from "next/image";
import { ResponseCard } from "@/components/home/ResponseCard";

const STEPS = [
  {
    title: "Put it on.",
    body: "A soft band that reads your wrist with near-infrared light. No needles, no patches, nothing to replace. Charge it about once a week.",
  },
  {
    title: "Eat and move the way you normally do.",
    body: "Snap a photo of your meals. The band follows your glucose in the background while you get on with your day.",
  },
  {
    title: "See what moved you, and what to try next.",
    body: "After each meal the app shows whether you rose, held steady or settled, then gives you one plain-English suggestion at a time: walk now, start with the vegetables, get to bed earlier.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="grain relative overflow-hidden rounded-[28px] lg:sticky lg:top-28">
              <Image
                src="/images/evening-walk.jpg"
                alt="A man in his fifties on an evening walk down a tree-lined street, the band on his wrist."
                width={1450}
                height={1800}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/5] h-auto w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-10">
            <h2 id="how-title" className="display h-section">
              It works in the background of an ordinary day.
            </h2>

            <ol className="mt-14 space-y-12">
              {STEPS.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-line pt-8">
                  <span className="tnum pt-0.5 text-[15px] font-semibold text-teal-deep">{i + 1}</span>
                  <div>
                    <h3 className="text-[1.375rem] font-semibold leading-snug tracking-[-0.01em]">{s.title}</h3>
                    <p className="mt-3 max-w-[34rem] text-[17px] leading-relaxed text-ink-soft">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-14 rounded-[28px] bg-pine p-4 sm:ml-16 sm:w-fit sm:p-5 xl:hidden">
              <ResponseCard className="bg-transparent p-2 shadow-none ring-0 backdrop-blur-none" />
            </div>
            <p className="mt-3 text-[13px] text-ink-faint sm:ml-16 xl:hidden">What a meal looks like in the app. The band is in development.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
