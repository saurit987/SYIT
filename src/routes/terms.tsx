import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { useReveal } from "@/components/site/useReveal";
import { twitterCard } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — SYIT Security Consultancy" },
      {
        name: "description",
        content:
          "The terms governing use of the SYIT website and our cybersecurity consulting engagements: scope, authorisation, confidentiality, fees and liability.",
      },
      { property: "og:title", content: "Terms & Conditions — SYIT" },
      {
        property: "og:description",
        content: "Terms for using this website and engaging SYIT for security work.",
      },
      ...twitterCard(
        "Terms & Conditions — SYIT",
        "Terms for using this website and engaging SYIT for security work.",
      ),
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  useReveal();

  return (
    <>
      <PageHero
        label="LEGAL / TERMS"
        title="Terms & Conditions"
        intro="These terms apply to your use of this website and, unless a signed engagement letter says otherwise, to any consulting work we do for you."
        meta={<span className="legal-meta">Last updated: 5 September 2026</span>}
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="prose reveal">
            <h2>1. Acceptance</h2>
            <p>
              By using this website or engaging our services, you agree to these terms. If you do
              not agree, please do not use the site or our services.
            </p>

            <h2>2. Nature of our services</h2>
            <p>
              We provide security assessments, data privacy consulting, identity and access advice,
              compliance readiness support and incident assistance. Our work is advisory. We do not
              guarantee that any system can be made immune to attack, and no assessment can identify
              every possible vulnerability.
            </p>

            <h2>3. Authorisation for testing</h2>
            <p>
              You must own the systems we test or hold written authority to allow testing. You agree
              to provide that authorisation in writing before any technical work begins, and to
              inform relevant hosting or third-party providers where their terms require it.
              Unauthorised testing requests will be refused.
            </p>

            <h2>4. Scope and changes</h2>
            <p>
              Each engagement has a written scope, timeline and deliverable. Work outside that scope
              is quoted separately. Either party may request a change; changes take effect once
              agreed in writing.
            </p>

            <h2>5. Your responsibilities</h2>
            <ul>
              <li>Give accurate information about your systems, data and constraints.</li>
              <li>Maintain working backups before any remediation work.</li>
              <li>Provide timely access, credentials and points of contact.</li>
              <li>Decide on and implement (or ask us to implement) recommended fixes.</li>
            </ul>

            <h2>6. Confidentiality</h2>
            <p>
              Both parties keep the other's confidential information secret and use it only for the
              engagement. Findings are shared only with the people you nominate. This obligation
              survives the end of the engagement.
            </p>

            <h2>7. Fees and payment</h2>
            <p>
              Fees, milestones and currency are set out in the engagement letter or quote. Invoices
              are payable within 14 days unless stated otherwise. Late payment may pause work.
            </p>

            <h2>8. Intellectual property</h2>
            <p>
              You own the reports and documentation we deliver for your engagement. We retain
              ownership of our methodologies, tooling, templates and general know-how, and may reuse
              anonymised, non-identifying learnings.
            </p>

            <h2>9. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, our total liability arising from an engagement
              is limited to the fees paid for that engagement. We are not liable for indirect or
              consequential loss, including lost profits, lost data or business interruption, or for
              incidents arising from recommendations you chose not to implement.
            </p>

            <h2>10. No legal advice</h2>
            <p>
              Compliance guidance is technical and organisational advice, not legal advice. For
              binding interpretation of GDPR, the DPDP Act or any regulation, consult a qualified
              lawyer.
            </p>

            <h2>11. Website use</h2>
            <p>
              Do not attempt to disrupt, scan or gain unauthorised access to this website, scrape it
              at scale, or misrepresent an association with SYIT. Content on this site is provided
              for information only.
            </p>

            <h2>12. Termination</h2>
            <p>
              Either party may end an engagement with 14 days' written notice. You pay for work
              performed up to termination; we hand over completed deliverables and delete or return
              your data as agreed.
            </p>

            <h2>13. Governing law</h2>
            <p>
              These terms are governed by the laws of India, and the courts of India have exclusive
              jurisdiction, unless your engagement letter states otherwise.
            </p>

            <h2>14. Contact</h2>
            <p>
              Questions about these terms?{" "}
              <Link to="/contact" style={{ color: "var(--blue)" }}>
                Contact us
              </Link>{" "}
              or read our{" "}
              <Link to="/privacy" style={{ color: "var(--blue)" }}>
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
