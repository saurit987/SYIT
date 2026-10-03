import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FinalCta } from "@/components/site/FinalCta";
import { useReveal } from "@/components/site/useReveal";
import { useScrollStory } from "@/lib/useScrollStory";
import { twitterCard } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "What we are — SYIT Security Consultancy" },
      {
        name: "description",
        content:
          "SYIT is a cybersecurity and data privacy consultancy for startups and individuals: audits, identity protection, privacy and compliance.",
      },
      { property: "og:title", content: "What we are — SYIT Security Consultancy" },
      {
        property: "og:description",
        content: "A small, senior security practice built around practical risk reduction.",
      },
      ...twitterCard(
        "What we are — SYIT Security Consultancy",
        "A small, senior security practice built around practical risk reduction.",
      ),
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    tag: "PRINCIPLE 01",
    title: "Findings, not fear",
    body: "Every engagement ends with a ranked list of fixes and the reasoning behind them — never a scare-driven sales pitch.",
  },
  {
    tag: "PRINCIPLE 02",
    title: "Fit the way you build",
    body: "Controls that break your release flow get abandoned. We design guardrails that survive contact with a shipping team.",
  },
  {
    tag: "PRINCIPLE 03",
    title: "Privacy is a design choice",
    body: "Data minimisation, retention limits and clear consent are cheaper to build early than to retrofit after an incident.",
  },
  {
    tag: "PRINCIPLE 04",
    title: "Plain language",
    body: "Reports a founder can act on and a non-technical person can understand. No jargon used as a moat.",
  },
];

function AboutPage() {
  useReveal();
  useScrollStory();

  return (
    <>
      <PageHero
        label="01 / WHAT WE ARE"
        title={
          <>
            A security practice for teams and people who <em>can't afford a breach.</em>
          </>
        }
        intro="SYIT is an independent cybersecurity and data privacy consultancy. We work with early-stage startups that need real security without an in-house team, and with individuals who want their devices, accounts and personal data under control."
      />

      <section className="section">
        <div className="container">
          <div className="prose reveal">
            <h2>Who we work with</h2>
            <p>
              <strong>Startups and small teams</strong> — founders shipping quickly who need audits,
              cloud and identity hardening, privacy documentation, and answers for enterprise
              security questionnaires.
            </p>
            <p>
              <strong>Individuals and families</strong> — people dealing with compromised accounts,
              malware, stalkerware, data leaks, identity theft risk, or simply wanting a safer setup
              across phone, laptop and cloud storage.
            </p>

            <h2>How we work</h2>
          </div>

          <div className="steps reveal" style={{ marginTop: 24 }}>
            <div className="step">
              <strong>01</strong>
              <div>
                <h3>Discovery call</h3>
                <p>
                  A short, free conversation to understand your setup, your risks and your
                  deadlines.
                </p>
              </div>
            </div>
            <div className="step">
              <strong>02</strong>
              <div>
                <h3>Assessment</h3>
                <p>
                  We review infrastructure, accounts, data flows and policies, and reproduce real
                  issues.
                </p>
              </div>
            </div>
            <div className="step">
              <strong>03</strong>
              <div>
                <h3>Prioritised plan</h3>
                <p>
                  Every finding gets an impact rating, a fix, and an effort estimate — ordered by
                  what matters.
                </p>
              </div>
            </div>
            <div className="step">
              <strong>04</strong>
              <div>
                <h3>Fix &amp; verify</h3>
                <p>
                  We support remediation, then re-test to confirm each issue is genuinely closed.
                </p>
              </div>
            </div>
          </div>

          <div className="section-heading reveal" style={{ marginTop: 90 }}>
            <div>
              <span className="section-number">02 / PRINCIPLES</span>
              <h2>
                What we <em>refuse</em> to do.
              </h2>
            </div>
            <p>
              We don't sell tools, we don't resell licences, and we don't hand over a PDF and
              disappear. Our incentive is the same as yours: less exposure.
            </p>
          </div>

          <div className="feature-grid" style={{ marginTop: 34 }}>
            {values.map((v) => (
              <div className="feature-card reveal" key={v.tag}>
                <span className="feature-card__tag">{v.tag}</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
