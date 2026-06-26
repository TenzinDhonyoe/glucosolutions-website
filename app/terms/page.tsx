import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPage, SITE_URL } from "@/lib/seo/jsonLd";
import { LEGAL_LAST_MODIFIED } from "@/lib/seo/buildInfo";

const TITLE = "Terms of Use";
const DESCRIPTION =
  "Terms governing use of the Gluco Solutions website and waitlist while the product is in pre-launch.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/terms`,
    title: `${TITLE} | Gluco Solutions`,
    description: DESCRIPTION,
  },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <JsonLd
        nodes={[
          webPage({
            path: "/terms",
            name: `${TITLE} | Gluco Solutions`,
            description: DESCRIPTION,
            datePublished: LEGAL_LAST_MODIFIED,
            dateModified: LEGAL_LAST_MODIFIED,
          }),
        ]}
      />
      <main className="flex-1 bg-page text-ink-900">
        <article className="mx-auto max-w-3xl px-5 sm:px-8 pt-32 md:pt-40 pb-24 md:pb-32">
          <p className="mono-label text-ink-500">
            Last updated{" "}
            <time dateTime={LEGAL_LAST_MODIFIED}>May 7, 2026</time>
          </p>

          <h1 className="mt-3 display-serif text-[44px] sm:text-[60px] md:text-[72px] leading-[1] tracking-[-0.02em] text-ink-900 text-balance">
            Terms of{" "}
            <span className="display-serif-italic text-sky-700">use</span>.
          </h1>

          <div className="mt-12 space-y-10 text-[16px] sm:text-[17px] leading-[1.7] text-ink-700">
            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                Acceptance
              </h2>
              <p className="mt-4">
                By visiting{" "}
                <a
                  href={SITE_URL}
                  className="underline decoration-sky-700/30 underline-offset-4 hover:text-ink-900"
                >
                  glucosolutions.ca
                </a>{" "}
                or joining the waitlist, you agree to these terms. If you do
                not agree, please do not use the site.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                Pre-launch nature
              </h2>
              <p className="mt-4">
                Gluco Solutions is currently in pre-launch. The product
                described on this site is in active development and details
                may change. The waitlist gives us a way to invite people to
                early access in waves. Joining the waitlist is not a
                purchase, an order, a contract for goods or services, or a
                guarantee of future availability.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                Not medical advice
              </h2>
              <p className="mt-4">
                Gluco Solutions is a wellness product. It is not a medical
                device. It is not intended to diagnose, treat, cure, or
                prevent any disease, and it is not a substitute for
                medical-grade glucose monitoring or professional medical
                advice. Always consult a qualified clinician for medical
                decisions, especially if you have prediabetes, diabetes, or
                another condition that affects glucose.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                Acceptable use
              </h2>
              <p className="mt-4">
                You agree not to:
              </p>
              <ul className="mt-4 space-y-2 list-disc pl-6">
                <li>
                  Submit waitlist signups using an email address you do not
                  control.
                </li>
                <li>
                  Probe, scan, or test the vulnerability of the site, or
                  attempt to bypass rate limits or other protections.
                </li>
                <li>
                  Scrape, crawl, or otherwise extract content in ways that
                  burden the service or violate the{" "}
                  <code className="font-mono text-[14px] text-ink-500">
                    robots.txt
                  </code>{" "}
                  policy. AI training and answer-engine crawlers operating in
                  good faith are explicitly welcome.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                Intellectual property
              </h2>
              <p className="mt-4">
                The content on this site &mdash; copy, photography,
                illustrations, the wordmark, and the hexagon mark &mdash; is
                owned by Gluco Solutions or its licensors. You may share
                links to pages and quote short excerpts with attribution.
                Anything beyond that needs written permission.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                Third-party links
              </h2>
              <p className="mt-4">
                Some pages link out to other sites for sourcing or context.
                We do not control and are not responsible for the content of
                third-party sites.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                Disclaimers and liability
              </h2>
              <p className="mt-4">
                The site is provided on an &ldquo;as-is&rdquo; basis. To the
                fullest extent permitted by law, Gluco Solutions disclaims
                all warranties, express or implied, and is not liable for
                indirect, incidental, special, or consequential damages
                arising from use of the site.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                Changes
              </h2>
              <p className="mt-4">
                We may update these terms as the product develops. Material
                changes will be reflected in the &ldquo;Last updated&rdquo;
                date above. Continued use after changes are posted means you
                accept the updated terms.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                Governing law
              </h2>
              <p className="mt-4">
                These terms are governed by the laws of Canada. Disputes
                that cannot be resolved informally will be heard by the
                courts of the province where Gluco Solutions is registered,
                except where local consumer-protection law gives you the
                right to choose otherwise.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                Contact
              </h2>
              <p className="mt-4">
                Questions about these terms can be sent to{" "}
                <a
                  href="mailto:tenzin@glucosolutions.ca"
                  className="underline decoration-sky-700/30 underline-offset-4 hover:text-ink-900"
                >
                  tenzin@glucosolutions.ca
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
