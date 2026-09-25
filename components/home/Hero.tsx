import { getImageProps } from "next/image";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ResponseCard } from "@/components/home/ResponseCard";

const ALT =
  "Morning light across a kitchen table: a forearm wearing a slim black band rests beside a bowl of oatmeal and berries.";

export function Hero() {
  // Art direction: a wide frame with negative space on the left for desktop,
  // a portrait frame with negative space on top for phones.
  const common = { alt: ALT, sizes: "100vw" };
  const {
    props: { srcSet: wide },
  } = getImageProps({ ...common, src: "/images/hero-breakfast.jpg", width: 2560, height: 1429 });
  const {
    props: { srcSet: tall, ...rest },
  } = getImageProps({
    ...common,
    src: "/images/hero-breakfast-portrait.jpg",
    width: 1450,
    height: 1800,
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-[max(100svh,640px)] overflow-hidden bg-pine text-white"
    >
      <picture className="absolute inset-x-0 bottom-0 top-[26%] -z-20 md:inset-0">
        <source media="(min-width: 768px)" srcSet={wide} />
        <source srcSet={tall} />
        <img
          {...rest}
          alt={ALT}
          className="h-full w-full object-cover object-[50%_30%] md:object-[62%_50%]"
        />
      </picture>
      {/* Legibility wash. Phones: solid pine up top, fading into the photo's dark
          upper half. Desktop: from the left, where the photo leaves room. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(15_43_46)_0%,rgb(15_43_46)_26%,rgb(15_43_46/0.55)_42%,rgb(15_43_46/0.12)_72%,rgb(15_43_46/0.3)_100%)] md:bg-[linear-gradient(180deg,rgb(15_43_46/0.55)_0%,rgb(15_43_46/0)_16%),linear-gradient(90deg,rgb(15_43_46/0.82)_0%,rgb(15_43_46/0.5)_34%,rgb(15_43_46/0)_60%),linear-gradient(0deg,rgb(15_43_46/0.55)_0%,rgb(15_43_46/0)_40%)]"
      />

      <div className="relative mx-auto flex w-full max-w-page flex-col justify-start px-5 pb-12 pt-28 sm:px-8 md:justify-end md:pb-16">
        <div className="max-w-[44rem]">
          <h1 id="hero-title" className="display text-[clamp(2.6rem,1.2rem+4.4vw,5.1rem)]">
            See how your body answers every meal.
          </h1>
          <p className="lede mt-5 max-w-[33rem] text-white/85">
            A needle-free band for people with prediabetes. It follows your glucose
            through the skin and shows you which meals, walks and nights of sleep are
            moving you back toward normal.
          </p>
          <WaitlistForm source="hero" className="mt-8" />
          <p className="mt-4 pl-1 text-[14.5px] text-white/65">
            We&rsquo;re inviting people in small groups, starting in Canada. iPhone first.
          </p>
        </div>

        <div className="absolute left-[54%] top-[18%] hidden w-[19.5rem] xl:block">
          <ResponseCard animate note="App preview. The band is in development." />
        </div>
      </div>
    </section>
  );
}
