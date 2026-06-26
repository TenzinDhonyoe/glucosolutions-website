import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPage, SITE_URL } from "@/lib/seo/jsonLd";
import { LEGAL_LAST_MODIFIED } from "@/lib/seo/buildInfo";

const TITLE = "Redu: Account & Data Deletion";
const DESCRIPTION =
  "How to permanently delete your Redu account and all associated data, in the app or by email.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/delete-account` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/delete-account`,
    title: `${TITLE} | Gluco Solutions`,
    description: DESCRIPTION,
  },
};

export default function DeleteAccountPage() {
  return (
    <>
      <Nav />
      <JsonLd
        nodes={[
          webPage({
            path: "/delete-account",
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
            Deleting your Redu account{" "}
            <span className="display-serif-italic text-sky-700">and data</span>.
          </h1>

          <div className="mt-12 space-y-10 text-[16px] sm:text-[17px] leading-[1.7] text-ink-700">
            <p>
              You can delete your account and all associated data at any
              time.
            </p>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                In the app (fastest)
              </h2>
              <p className="mt-4">
                Open Redu &rarr; Settings &rarr; Account &amp; Privacy &rarr;
                Delete Account &amp; Data, then confirm. This permanently
                removes your account and all associated data.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                By email
              </h2>
              <p className="mt-4">
                If you can&rsquo;t access the app, email{" "}
                <a
                  href="mailto:tenzin@glucosolutions.ca?subject=Delete%20my%20account"
                  className="underline decoration-sky-700/30 underline-offset-4 hover:text-ink-900"
                >
                  tenzin@glucosolutions.ca
                </a>{" "}
                from the email address on your account with the subject
                &ldquo;Delete my account.&rdquo; We&rsquo;ll verify and process
                the request.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                What&rsquo;s deleted
              </h2>
              <p className="mt-4">
                Your profile, logged meals, glucose readings, activity entries,
                check-ins, and insights.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                Timing &amp; retention
              </h2>
              <p className="mt-4">
                Requests are completed within 30 days, and removed from backups
                within 90 days. We retain only the minimal records we&rsquo;re
                legally required to keep (e.g., transaction/tax records), which
                are not used for any other purpose.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
