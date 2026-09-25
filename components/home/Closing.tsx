import Image from "next/image";
import { WaitlistForm } from "@/components/WaitlistForm";

export function Closing() {
  return (
    <section id="join" aria-labelledby="join-title" className="grain relative isolate overflow-hidden bg-pine text-white">
      <Image
        src="/images/evening-leaves.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[70%_50%]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(15_43_46/0.8)_0%,rgb(15_43_46/0.45)_55%,rgb(15_43_46/0.1)_100%)]" />

      <div className="mx-auto max-w-page px-5 py-28 sm:px-8 md:py-40">
        <h2 id="join-title" className="display text-[clamp(2.6rem,1.4rem+4.8vw,5.4rem)]">
          <span className="block">Prediabetes is silent.</span>
          <span className="block">Until it isn&rsquo;t.</span>
        </h2>
        <p className="lede mt-7 max-w-[32rem] text-white/80">
          Join the waitlist and we&rsquo;ll email you when it&rsquo;s your turn. The earlier
          you can see your patterns, the earlier they can change.
        </p>
        <WaitlistForm source="closing" className="mt-10" />
      </div>
    </section>
  );
}
