import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 items-center bg-paper">
        <div className="mx-auto w-full max-w-page px-5 pb-24 pt-40 sm:px-8 md:pb-32 md:pt-48">
          <h1 className="display max-w-[18ch] text-[clamp(2.4rem,1.4rem+3.6vw,4.4rem)]">
            This page doesn&rsquo;t exist anymore.
          </h1>
          <p className="lede mt-6 max-w-[32rem] text-ink-soft">
            We&rsquo;ve rebuilt the site around our glucose band for people with prediabetes.
            Everything worth reading is on the home page.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex rounded-full bg-pine px-6 py-3 text-[1.0625rem] font-bold text-white transition-colors hover:bg-pine-2"
          >
            Go to the home page
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
