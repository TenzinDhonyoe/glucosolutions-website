import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
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
      <LegalPage
        path="/delete-account"
        title="Deleting your Redu account and data"
        updated={LEGAL_LAST_MODIFIED}
        updatedLabel="May 7, 2026"
      >
        <p>
          You can delete your account and all associated data at any
          time.
        </p>

        <section>
          <h2>
            In the app (fastest)
          </h2>
          <p>
            Open Redu &rarr; Settings &rarr; Account &amp; Privacy &rarr;
            Delete Account &amp; Data, then confirm. This permanently
            removes your account and all associated data.
          </p>
        </section>

        <section>
          <h2>
            By email
          </h2>
          <p>
            If you can&rsquo;t access the app, email{" "}
            <a
              href="mailto:tenzin@glucosolutions.ca?subject=Delete%20my%20account"
            >
              tenzin@glucosolutions.ca
            </a>{" "}
            from the email address on your account with the subject
            &ldquo;Delete my account.&rdquo; We&rsquo;ll verify and process
            the request.
          </p>
        </section>

        <section>
          <h2>
            What&rsquo;s deleted
          </h2>
          <p>
            Your profile, logged meals, glucose readings, activity entries,
            check-ins, and insights.
          </p>
        </section>

        <section>
          <h2>
            Timing &amp; retention
          </h2>
          <p>
            Requests are completed within 30 days, and removed from backups
            within 90 days. We retain only the minimal records we&rsquo;re
            legally required to keep (e.g., transaction/tax records), which
            are not used for any other purpose.
          </p>
        </section>
      
      </LegalPage>
    </>
  );
}
