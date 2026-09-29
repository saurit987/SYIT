import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { useReveal } from "@/components/site/useReveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SYIT Security Consultancy" },
      {
        name: "description",
        content:
          "How SYIT collects, uses, stores and protects personal data, your rights under GDPR and India's DPDP Act, and how to contact us.",
      },
      { property: "og:title", content: "Privacy Policy — SYIT" },
      {
        property: "og:description",
        content: "What data we collect, why, how long we keep it, and your rights.",
      },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  useReveal();

  return (
    <>
      <PageHero
        label="LEGAL / PRIVACY NOTICE"
        title="Privacy Policy"
        intro="We are a security and privacy consultancy, so we hold ourselves to the standard we ask of clients: collect little, protect it well, delete it on time."
        meta={<span className="legal-meta">Last updated: 5 September 2026</span>}
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="prose reveal">
            <h2>1. Who we are</h2>
            <p>
              SYIT ("we", "us") is a cybersecurity and data privacy consultancy serving startups and
              individuals. For any privacy question, write to{" "}
              <a href="mailto:privacy@syit.io" style={{ color: "var(--blue)" }}>
                privacy@syit.io
              </a>
              .
            </p>

            <h2>2. What we collect</h2>
            <ul>
              <li>
                <strong>Contact details you give us</strong> — name, email, company and the message
                you submit through our contact form or by email.
              </li>
              <li>
                <strong>Engagement information</strong> — information you share with us during an
                assessment, such as system descriptions, configurations and findings.
              </li>
              <li>
                <strong>Basic technical data</strong> — server logs such as IP address, browser type
                and pages requested, used to keep this website available and secure.
              </li>
            </ul>
            <p>We do not sell personal data, and we do not use it for advertising profiling.</p>

            <h2>3. Why we use it</h2>
            <ul>
              <li>To reply to your enquiry and provide the services you asked for.</li>
              <li>To perform a contract with you, including reporting and remediation support.</li>
              <li>To meet legal, accounting and security obligations.</li>
              <li>To protect this website against abuse and attacks (legitimate interest).</li>
            </ul>

            <h2>4. Cookies and analytics</h2>
            <p>
              This website uses only the cookies strictly necessary to serve pages. If we add
              analytics or any non-essential cookie in future, we will ask for consent first and
              update this notice.
            </p>

            <h2>5. How long we keep data</h2>
            <p>
              Enquiries that do not become engagements are deleted within 12 months. Engagement
              records, including technical findings, are retained for up to 3 years for legal and
              professional-liability reasons, then deleted or anonymised. Server logs are kept for
              up to 90 days.
            </p>

            <h2>6. Sharing and processors</h2>
            <p>
              We share personal data only with service providers needed to operate — for example
              email hosting, cloud hosting and accounting — under written agreements that restrict
              their use of it. We disclose information to authorities only where legally required.
            </p>

            <h2>7. Confidentiality of engagement data</h2>
            <p>
              Security findings are highly sensitive. They are stored encrypted, accessible only to
              the consultants working on your engagement, and are never used as public case studies
              without your written permission.
            </p>

            <h2>8. International transfers</h2>
            <p>
              Where data is processed outside your country, we rely on appropriate safeguards such
              as standard contractual clauses with our providers.
            </p>

            <h2>9. Your rights</h2>
            <p>
              Depending on where you live (including under the EU/UK GDPR and India's Digital
              Personal Data Protection Act), you may ask us to: access a copy of your data; correct
              it; delete it; restrict or object to processing; withdraw consent; or receive it in a
              portable format. You may also complain to your local data protection authority.
            </p>
            <p>
              To exercise any right, email{" "}
              <a href="mailto:privacy@syit.io" style={{ color: "var(--blue)" }}>
                privacy@syit.io
              </a>
              . We respond within 30 days.
            </p>

            <h2>10. Security</h2>
            <p>
              We use encryption in transit and at rest, multi-factor authentication, least-privilege
              access and endpoint hardening on every device that touches client data.
            </p>

            <h2>11. Children</h2>
            <p>
              Our services are not directed at children. We do not knowingly collect data from
              anyone under 18 without a parent or guardian's involvement.
            </p>

            <h2>12. Changes</h2>
            <p>
              We will update this page when our practices change and revise the date above. Material
              changes affecting existing clients are communicated by email.
            </p>

            <h2>13. Contact</h2>
            <p>
              Questions about this notice?{" "}
              <Link to="/contact" style={{ color: "var(--blue)" }}>
                Get in touch
              </Link>{" "}
              or read our{" "}
              <Link to="/terms" style={{ color: "var(--blue)" }}>
                terms &amp; conditions
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
