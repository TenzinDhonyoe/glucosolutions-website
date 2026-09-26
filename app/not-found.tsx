import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 items-center bg-page">
        <Container className="pb-24 pt-40 md:pb-32 md:pt-48">
          <h1 className="display-serif max-w-[18ch] text-[clamp(2.4rem,1.4rem+3.6vw,4.25rem)]">
            This page doesn&rsquo;t exist anymore.
          </h1>
          <p className="mt-6 max-w-[32rem] text-[17px] leading-relaxed text-ink-500">
            We&rsquo;ve rebuilt the site around our glucose band for people with prediabetes.
            Everything worth reading is on the home page.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex rounded-full bg-ink-900 px-6 py-3 text-[15px] font-semibold text-on-ink transition-colors hover:bg-ink-700"
          >
            Go to the home page
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
