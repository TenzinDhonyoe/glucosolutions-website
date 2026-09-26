import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
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
      <LegalPage
        path="/terms"
        title="Terms of use"
        updated={LEGAL_LAST_MODIFIED}
        updatedLabel="July 15, 2026"
      >
        <section>
          <h2>
            Acceptance
          </h2>
          <p>
            By visiting{" "}
            <a
              href={SITE_URL}
            >
              glucosolutionsinc.com
            </a>{" "}
            or joining the waitlist, you agree to these terms. If you do
            not agree, please do not use the site.
          </p>
        </section>

        <section>
          <h2>
            Pre-launch nature
          </h2>
          <p>
            Gluco Solutions is currently in pre-launch. The product
            described on this site is in active development and details
            may change. The waitlist gives us a way to invite people to
            early access in waves. Joining the waitlist is not a
            purchase, an order, a contract for goods or services, or a
            guarantee of future availability.
          </p>
        </section>

        <section>
          <h2>
            Not medical advice
          </h2>
          <p>
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
          <h2>
            Acceptable use
          </h2>
          <p>
            You agree not to:
          </p>
          <ul>
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
              <code>
                robots.txt
              </code>{" "}
              policy. AI training and answer-engine crawlers operating in
              good faith are explicitly welcome.
            </li>
          </ul>
        </section>

        <section>
          <h2>
            Text messaging (SMS) program
          </h2>
          <p>
            GlucoSolutions offers an optional text-message logging program
            for patients of participating registered dietitians.
            Enrollment happens with your dietitian, who reviews the
            program with you during an appointment and enters your mobile
            number. You then receive a single confirmation text and are
            enrolled only if you reply YES; no other messages are sent
            unless you confirm.
          </p>
          <ul>
            <li>
              Message frequency varies, up to one reminder per day.
              Message and data rates may apply.
            </li>
            <li>
              Reply STOP to cancel at any time and HELP for help, or
              contact your clinic.
            </li>
            <li>
              Carriers are not liable for delayed or undelivered
              messages.
            </li>
          </ul>
          <p>
            The full program description is at{" "}
            <a
              href="/sms"
            >
              glucosolutionsinc.com/sms
            </a>
            . See our{" "}
            <a
              href="/privacy"
            >
              Privacy Policy
            </a>{" "}
            for how SMS data is handled; mobile information is never
            shared with third parties for marketing.
          </p>
        </section>

        <section>
          <h2>
            Intellectual property
          </h2>
          <p>
            The content on this site &mdash; copy, photography,
            illustrations, the wordmark, and the hexagon mark &mdash; is
            owned by Gluco Solutions or its licensors. You may share
            links to pages and quote short excerpts with attribution.
            Anything beyond that needs written permission.
          </p>
        </section>

        <section>
          <h2>
            Third-party links
          </h2>
          <p>
            Some pages link out to other sites for sourcing or context.
            We do not control and are not responsible for the content of
            third-party sites.
          </p>
        </section>

        <section>
          <h2>
            Disclaimers and liability
          </h2>
          <p>
            The site is provided on an &ldquo;as-is&rdquo; basis. To the
            fullest extent permitted by law, Gluco Solutions disclaims
            all warranties, express or implied, and is not liable for
            indirect, incidental, special, or consequential damages
            arising from use of the site.
          </p>
        </section>

        <section>
          <h2>
            Changes
          </h2>
          <p>
            We may update these terms as the product develops. Material
            changes will be reflected in the &ldquo;Last updated&rdquo;
            date above. Continued use after changes are posted means you
            accept the updated terms.
          </p>
        </section>

        <section>
          <h2>
            Governing law
          </h2>
          <p>
            These terms are governed by the laws of Canada. Disputes
            that cannot be resolved informally will be heard by the
            courts of the province where Gluco Solutions is registered,
            except where local consumer-protection law gives you the
            right to choose otherwise.
          </p>
        </section>

        <section>
          <h2>
            Contact
          </h2>
          <p>
            Questions about these terms can be sent to{" "}
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
