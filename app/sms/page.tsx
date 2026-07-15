import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
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
      <Nav />
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
      <main className="flex-1 bg-page text-ink-900">
        <article className="mx-auto max-w-3xl px-5 sm:px-8 pt-32 md:pt-40 pb-24 md:pb-32">
          <p className="mono-label text-ink-500">
            Last updated{" "}
            <time dateTime={LEGAL_LAST_MODIFIED}>July 15, 2026</time>
          </p>

          <h1 className="mt-3 display-serif text-[44px] sm:text-[60px] md:text-[72px] leading-[1] tracking-[-0.02em] text-ink-900 text-balance">
            Text messaging{" "}
            <span className="display-serif-italic text-sky-700">program</span>.
          </h1>

          <div className="mt-12 space-y-10 text-[16px] sm:text-[17px] leading-[1.7] text-ink-700">
            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                What it is
              </h2>
              <p className="mt-4">
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
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                How consent works
              </h2>
              <p className="mt-4">
                Enrollment uses a two-step, double opt-in process. No messages
                are ever sent to a patient who has not completed both steps,
                and phone numbers are never purchased, scraped, or obtained
                from third parties.
              </p>
              <ol className="mt-4 space-y-3 list-decimal pl-6">
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
              <blockquote className="mt-4 rounded-[10px] border border-ink-900/10 bg-white/60 p-4 font-mono text-[14px] leading-[1.6] text-ink-700">
                GlucoSolutions: your dietitian invited you to log meals and
                readings by text. Replies may be read by your dietitian and
                processed by AI to update your record. Standard SMS is not
                encrypted; do not text anything you want kept off your record.
                Reply YES to confirm, STOP to opt out, HELP for info. Msg and
                data rates may apply.
              </blockquote>
              <p className="mt-4">
                Only if the patient replies YES does enrollment complete and
                two-way messaging begin. If the patient does not reply, or
                replies STOP, no further messages are sent.
              </p>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                Keywords
              </h2>
              <ul className="mt-4 space-y-2 list-disc pl-6">
                <li>
                  <strong>YES</strong> &mdash; confirms enrollment after the
                  opt-in request above.
                </li>
                <li>
                  <strong>STOP</strong> &mdash; opts out at any time. The
                  patient receives a final confirmation that no further
                  messages will be sent, and messaging stops.
                </li>
                <li>
                  <strong>HELP</strong> &mdash; returns support information:
                  &ldquo;GlucoSolutions: your texts go to your
                  dietitian&rsquo;s dashboard to help track your care. Reply
                  STOP to opt out at any time. For help, contact your
                  clinic.&rdquo;
                </li>
              </ul>
            </section>

            <section>
              <h2 className="display-serif text-[24px] sm:text-[28px] leading-[1.2] text-ink-900">
                Disclosures
              </h2>
              <ul className="mt-4 space-y-2 list-disc pl-6">
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
              <p className="mt-4">
                See our{" "}
                <a
                  href="/terms"
                  className="underline decoration-sky-700/30 underline-offset-4 hover:text-ink-900"
                >
                  Terms of Use
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="underline decoration-sky-700/30 underline-offset-4 hover:text-ink-900"
                >
                  Privacy Policy
                </a>
                . Questions can be sent to{" "}
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
