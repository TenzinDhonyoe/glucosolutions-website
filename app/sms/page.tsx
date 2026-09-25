import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPage, SITE_URL } from "@/lib/seo/jsonLd";
import { LEGAL_LAST_MODIFIED } from "@/lib/seo/buildInfo";

const TITLE = "Text Messaging Program";
const DESCRIPTION =
  "How the GlucoSolutions SMS logging program works: dietitian-assisted enrollment, double opt-in by YES reply, message frequency, and STOP/HELP keywords.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/sms` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/sms`,
    title: `${TITLE} | Gluco Solutions`,
    description: DESCRIPTION,
  },
};

export default function SmsProgramPage() {
  return (
    <>
      <JsonLd
        nodes={[
          webPage({
            path: "/sms",
            name: `${TITLE} | Gluco Solutions`,
            description: DESCRIPTION,
            datePublished: LEGAL_LAST_MODIFIED,
            dateModified: LEGAL_LAST_MODIFIED,
          }),
        ]}
      />
      <LegalPage
        path="/sms"
        title="Text messaging program"
        updated={LEGAL_LAST_MODIFIED}
        updatedLabel="July 15, 2026"
      >
        <section>
          <h2>
            What it is
          </h2>
          <p>
            GlucoSolutions lets patients of participating registered
            dietitians log meals, glucose readings, weight, and activity
            by sending ordinary text messages to the clinic&rsquo;s
            GlucoSolutions number. Messages the patient sends are
            delivered to their own dietitian&rsquo;s dashboard for review.
            The service also sends a small number of messages to the
            patient: a one-time enrollment confirmation request,
            occasional reminders to log entries, replies to HELP, and
            occasional secure links the patient can use to view their own
            recent entries.
          </p>
        </section>

        <section>
          <h2>
            How consent works
          </h2>
          <p>
            Enrollment uses a two-step, double opt-in process. No messages
            are ever sent to a patient who has not completed both steps,
            and phone numbers are never purchased, scraped, or obtained
            from third parties.
          </p>
          <ol className="legal-ol">
            <li>
              <strong>Dietitian-assisted enrollment.</strong> During an
              in-person or virtual appointment, the patient&rsquo;s
              registered dietitian describes the program, including what
              can be texted, who reads the messages, message frequency,
              and that message and data rates may apply. With the
              patient&rsquo;s agreement, the dietitian enters the
              patient&rsquo;s mobile number into the secure GlucoSolutions
              dashboard.
            </li>
            <li>
              <strong>Confirmation by YES reply.</strong> The system then
              sends the patient a single opt-in request. The exact message
              is:
            </li>
          </ol>
          <blockquote className="legal-sample">
            GlucoSolutions: your dietitian invited you to log meals and
            readings by text. Replies may be read by your dietitian and
            processed by AI to update your record. Standard SMS is not
            encrypted; do not text anything you want kept off your record.
            Reply YES to confirm, STOP to opt out, HELP for info. Msg and
            data rates may apply.
          </blockquote>
          <p>
            Only if the patient replies YES does enrollment complete and
            two-way messaging begin. If the patient does not reply, or
            replies STOP, no further messages are sent.
          </p>
        </section>

        <section>
          <h2>
            Keywords
          </h2>
          <ul>
            <li>
              <strong>YES</strong>{" "}&mdash; confirms enrollment after the
              opt-in request above.
            </li>
            <li>
              <strong>STOP</strong>{" "}&mdash; opts out at any time. The
              patient receives a final confirmation that no further
              messages will be sent, and messaging stops.
            </li>
            <li>
              <strong>HELP</strong>{" "}&mdash; returns support information:
              &ldquo;GlucoSolutions: your texts go to your
              dietitian&rsquo;s dashboard to help track your care. Reply
              STOP to opt out at any time. For help, contact your
              clinic.&rdquo;
            </li>
          </ul>
        </section>

        <section>
          <h2>
            Disclosures
          </h2>
          <ul>
            <li>
              Message frequency varies; at most one reminder per day, plus
              replies to messages the patient sends.
            </li>
            <li>Message and data rates may apply.</li>
            <li>
              Mobile information is never shared with third parties or
              affiliates for marketing or promotional purposes. Text
              messaging originator opt-in data and consent are not shared
              with any third parties.
            </li>
            <li>Carriers are not liable for delayed or undelivered messages.</li>
          </ul>
          <p>
            See our{" "}
            <a
              href="/terms"
            >
              Terms of Use
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
            >
              Privacy Policy
            </a>
            . Questions can be sent to{" "}
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
