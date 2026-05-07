import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPage, SITE_URL } from "@/lib/seo/jsonLd";
import { LEGAL_LAST_MODIFIED } from "@/lib/seo/buildInfo";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Gluco Solutions collects, stores, and protects information collected from waitlist signups and website analytics.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/privacy`,
    title: `${TITLE} | Gluco Solutions`,
    description: DESCRIPTION,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <JsonLd
        nodes={[
          webPage({
            path: "/privacy",
            name: `${TITLE} | Gluco Solutions`,
            description: DESCRIPTION,
            datePublished: LEGAL_LAST_MODIFIED,
            dateModified: LEGAL_LAST_MODIFIED,
          }),
        ]}
      />
      <main className="flex-1 bg-paper text-charcoal">
        <article className="mx-auto max-w-3xl px-5 sm:px-8 pt-32 md:pt-40 pb-24 md:pb-32">
          <p className="caption text-charcoal/55">
            Last updated{" "}
            <time dateTime={LEGAL_LAST_MODIFIED}>May 7, 2026</time>
          </p>

          <h1 className="mt-3 display-serif text-[44px] sm:text-[60px] md:text-[72px] leading-[1] tracking-[-0.02em] text-charcoal text-balance">
            Privacy{" "}
            <span className="display-serif-italic text-sage">policy</span>.
          </h1>

          <div className="mt-12 space-y-10 text-[16px] sm:text-[17px] leading-[1.7] text-charcoal/85">
            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-charcoal">
                Who we are
              </h2>
              <p className="mt-4">
                Gluco Solutions (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                &ldquo;our&rdquo;) operates this website at{" "}
                <a
                  href={SITE_URL}
                  className="underline decoration-sage/40 underline-offset-4 hover:text-charcoal"
                >
                  glucosolutions.ca
                </a>
                . This policy describes what personal information we collect
                from you, why we collect it, and how we keep it safe.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-charcoal">
                What we collect
              </h2>
              <p className="mt-4">
                We collect only what we need to operate the waitlist and
                improve the site:
              </p>
              <ul className="mt-4 space-y-2 list-disc pl-6">
                <li>
                  <strong>Email address</strong> &mdash; provided by you when
                  you join the waitlist.
                </li>
                <li>
                  <strong>Referrer and source</strong> &mdash; the page you
                  came from (e.g.,{" "}
                  <code className="font-mono text-[14px] text-charcoal/75">
                    referrer
                  </code>{" "}
                  and{" "}
                  <code className="font-mono text-[14px] text-charcoal/75">
                    source
                  </code>
                  ) so we can understand which channels reach the right people.
                </li>
                <li>
                  <strong>Anonymous usage data</strong> &mdash; page views,
                  clicks, performance metrics, and approximate location, via
                  Vercel Analytics, Vercel Speed Insights, and PostHog. We do
                  not link this data to your email unless you have signed up.
                </li>
                <li>
                  <strong>IP address (transient)</strong> &mdash; used by
                  Vercel KV to rate-limit waitlist submissions. Not retained
                  alongside your email record.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-charcoal">
                How we use it
              </h2>
              <ul className="mt-4 space-y-2 list-disc pl-6">
                <li>
                  To contact you when early access opens, and only for that
                  purpose unless you opt in to other updates.
                </li>
                <li>
                  To prevent abuse of the waitlist form (rate limiting).
                </li>
                <li>
                  To understand how the site is used, in aggregate, so we can
                  improve it.
                </li>
              </ul>
              <p className="mt-4">
                We do not sell your information. We do not share your email
                with advertisers or data brokers.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-charcoal">
                Where it lives
              </h2>
              <p className="mt-4">
                Waitlist emails are stored in Supabase (PostgreSQL) on
                infrastructure operated by Supabase Inc. The site is hosted on
                Vercel, which also provides the analytics described above.
                PostHog provides product analytics. Each of these processors
                has its own privacy and security commitments. Data is
                encrypted in transit (TLS) and at rest.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-charcoal">
                How long we keep it
              </h2>
              <p className="mt-4">
                Waitlist emails are retained until you ask us to delete them
                or until we close the waitlist program, whichever comes first.
                Aggregate analytics are retained per the default retention of
                each provider.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-charcoal">
                Your rights
              </h2>
              <p className="mt-4">
                You can ask us, at any time, to:
              </p>
              <ul className="mt-4 space-y-2 list-disc pl-6">
                <li>Confirm what information we hold about you.</li>
                <li>Correct or update it.</li>
                <li>Delete your record entirely.</li>
                <li>
                  Withdraw consent to be contacted (unsubscribe). Withdrawal
                  is effective going forward and does not undo prior
                  processing.
                </li>
              </ul>
              <p className="mt-4">
                Email{" "}
                <a
                  href="mailto:hello@glucosolutions.ca"
                  className="underline decoration-sage/40 underline-offset-4 hover:text-charcoal"
                >
                  hello@glucosolutions.ca
                </a>{" "}
                from the address you signed up with and we will action the
                request promptly. These rights are recognized by Canadian
                privacy law (PIPEDA), CASL, GDPR for EU/UK residents, and the
                CCPA for California residents.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-charcoal">
                Cookies
              </h2>
              <p className="mt-4">
                We use a small number of first-party cookies and
                privacy-respecting third-party scripts (Vercel Analytics,
                Vercel Speed Insights, PostHog) to measure site performance
                and anonymous engagement. We do not use advertising cookies.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-charcoal">
                Changes
              </h2>
              <p className="mt-4">
                We may update this policy as the product evolves. Material
                changes will be reflected in the &ldquo;Last updated&rdquo;
                date above. If you have an active waitlist record, we will
                send you a note when changes are significant.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-charcoal">
                Contact
              </h2>
              <p className="mt-4">
                Questions about privacy can be sent to{" "}
                <a
                  href="mailto:hello@glucosolutions.ca"
                  className="underline decoration-sage/40 underline-offset-4 hover:text-charcoal"
                >
                  hello@glucosolutions.ca
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
