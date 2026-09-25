import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
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
      <LegalPage
        path="/privacy"
        title="Privacy policy"
        updated={LEGAL_LAST_MODIFIED}
        updatedLabel="July 15, 2026"
      >
        <section>
          <h2>
            Who we are
          </h2>
          <p>
            Gluco Solutions (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;) operates this website at{" "}
            <a
              href={SITE_URL}
            >
              glucosolutionsinc.com
            </a>
            . This policy describes what personal information we collect
            from you, why we collect it, and how we keep it safe.
          </p>
        </section>

        <section>
          <h2>
            What we collect
          </h2>
          <p>
            We collect only what we need to operate the waitlist and
            improve the site:
          </p>
          <ul>
            <li>
              <strong>Email address</strong>{" "}&mdash; provided by you when
              you join the waitlist.
            </li>
            <li>
              <strong>Referrer and source</strong>{" "}&mdash; the page you
              came from (e.g.,{" "}
              <code>
                referrer
              </code>{" "}
              and{" "}
              <code>
                source
              </code>
              ) so we can understand which channels reach the right people.
            </li>
            <li>
              <strong>Anonymous usage data</strong>{" "}&mdash; page views,
              clicks, performance metrics, and approximate location, via
              Vercel Analytics, Vercel Speed Insights, and PostHog. We do
              not link this data to your email unless you have signed up.
            </li>
            <li>
              <strong>IP address (transient)</strong>{" "}&mdash; used by
              Vercel KV to rate-limit waitlist submissions. Not retained
              alongside your email record.
            </li>
          </ul>
        </section>

        <section>
          <h2>
            How we use it
          </h2>
          <ul>
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
          <p>
            We do not sell your information. We do not share your email
            with advertisers or data brokers.
          </p>
        </section>

        <section>
          <h2>
            Text messaging (SMS)
          </h2>
          <p>
            Patients of participating registered dietitians can enroll in
            our text-message logging program. For enrolled patients we
            collect the mobile phone number provided at enrollment and the
            content of text messages sent to our number, so the patient&rsquo;s
            dietitian can review them and keep their record current.
            Enrollment is confirmed by double opt-in: after your dietitian
            enters your number, you receive a single confirmation text and
            are enrolled only if you reply YES.
          </p>
          <ul>
            <li>
              <strong>
                No mobile information will be shared with third parties or
                affiliates for marketing or promotional purposes.
              </strong>{" "}
              Text messaging originator opt-in data and consent will not
              be shared with any third parties.
            </li>
            <li>
              Message frequency varies; at most one reminder per day.
              Message and data rates may apply.
            </li>
            <li>
              Reply STOP at any time to opt out, or HELP for help. You can
              also ask your clinic to withdraw you from the program.
            </li>
          </ul>
          <p>
            The full program description lives at{" "}
            <a
              href="/sms"
            >
              glucosolutionsinc.com/sms
            </a>
            .
          </p>
        </section>

        <section>
          <h2>
            Where it lives
          </h2>
          <p>
            Waitlist emails are stored in Supabase (PostgreSQL) on
            infrastructure operated by Supabase Inc. The site is hosted on
            Vercel, which also provides the analytics described above.
            PostHog provides product analytics. Each of these processors
            has its own privacy and security commitments. Data is
            encrypted in transit (TLS) and at rest.
          </p>
        </section>

        <section>
          <h2>
            How long we keep it
          </h2>
          <p>
            Waitlist emails are retained until you ask us to delete them
            or until we close the waitlist program, whichever comes first.
            Aggregate analytics are retained per the default retention of
            each provider.
          </p>
        </section>

        <section>
          <h2>
            Your rights
          </h2>
          <p>
            You can ask us, at any time, to:
          </p>
          <ul>
            <li>Confirm what information we hold about you.</li>
            <li>Correct or update it.</li>
            <li>Delete your record entirely.</li>
            <li>
              Withdraw consent to be contacted (unsubscribe). Withdrawal
              is effective going forward and does not undo prior
              processing.
            </li>
          </ul>
          <p>
            Email{" "}
            <a
              href="mailto:tenzin@glucosolutions.ca"
            >
              tenzin@glucosolutions.ca
            </a>{" "}
            from the address you signed up with and we will action the
            request promptly. These rights are recognized by Canadian
            privacy law (PIPEDA), CASL, GDPR for EU/UK residents, and the
            CCPA for California residents.
          </p>
        </section>

        <section>
          <h2>
            Cookies
          </h2>
          <p>
            We use a small number of first-party cookies and
            privacy-respecting third-party scripts (Vercel Analytics,
            Vercel Speed Insights, PostHog) to measure site performance
            and anonymous engagement. We do not use advertising cookies.
          </p>
        </section>

        <section>
          <h2>
            Changes
          </h2>
          <p>
            We may update this policy as the product evolves. Material
            changes will be reflected in the &ldquo;Last updated&rdquo;
            date above. If you have an active waitlist record, we will
            send you a note when changes are significant.
          </p>
        </section>

        <section>
          <h2>
            Contact
          </h2>
          <p>
            Questions about privacy can be sent to{" "}
            <a
              href="mailto:tenzin@glucosolutions.ca"
            >
              tenzin@glucosolutions.ca
            </a>
            .
          </p>
        </section>
      
      </LegalPage>
    </>
  );
}
