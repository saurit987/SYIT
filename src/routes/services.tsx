import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FinalCta } from "@/components/site/FinalCta";
import { useReveal } from "@/components/site/useReveal";
import { useScrollStory } from "@/lib/useScrollStory";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Security Audits, Data Privacy & Compliance | SYIT" },
      {
        name: "description",
        content:
          "Security audits, data privacy consulting, identity and access control, AI security, compliance readiness and incident support for startups and individuals.",
      },
      { property: "og:title", content: "Services — SYIT Security Consultancy" },
      {
        property: "og:description",
        content:
          "Audits, privacy programmes, identity hardening, compliance readiness and incident support.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    n: "01",
    title: "Startup security audit",
    body: "Infrastructure, cloud configuration, codebase and access review, delivered as a prioritised remediation plan with effort estimates.",
    includes: [
      "Cloud & network review",
      "Secrets and CI/CD hygiene",
      "Application logic testing",
      "Remediation walkthrough",
    ],
  },
  {
    n: "02",
    title: "Data privacy consulting",
    body: "Understand exactly what personal data you hold, why, where it lives and how long it stays — then reduce it.",
    includes: [
      "Data inventory & flow maps",
      "Retention & deletion rules",
      "Consent and notice drafting",
      "Vendor / processor review",
    ],
  },
  {
    n: "03",
    title: "Identity & access control",
    body: "Account takeover is the most common cause of loss. We make identity the strongest part of your stack.",
    includes: [
      "MFA & passkey rollout",
      "Privilege and role audit",
      "Offboarding process",
      "Zero-trust access policy",
    ],
  },
  {
    n: "04",
    title: "Compliance readiness",
    body: "Gap analysis and implementation support for GDPR, India's DPDP Act, ISO 27001 and SOC 2 style customer reviews.",
    includes: [
      "Gap assessment",
      "Policy set drafting",
      "Evidence collection",
      "Questionnaire support",
    ],
  },
  {
    n: "05",
    title: "AI & data pipeline security",
    body: "For teams building with LLMs: prompt injection testing, model access control and training-data governance.",
    includes: [
      "Adversarial testing",
      "Model & key access control",
      "PII in prompts review",
      "Pipeline hardening",
    ],
  },
  {
    n: "06",
    title: "Incident triage & recovery",
    body: "Something already happened. We contain it, clean up, restore access and document the timeline.",
    includes: ["Containment steps", "Malware removal", "Account recovery", "Post-incident report"],
  },
];

function ServicesPage() {
  useReveal();
  useScrollStory();

  return (
    <>
      <PageHero
        label="01 / SERVICES"
        title={
          <>
            Practical work, <em>ranked by risk.</em>
          </>
        }
        intro="Engagements are scoped to a clear outcome. Pick one, or start with a discovery call and we'll tell you what you actually need."
      />

      <section className="section">
        <div className="container">
          <div className="services__grid">
            {services.map((s) => (
              <article className="service-card reveal" key={s.n}>
                <div className="service-card__top">
                  <span className="service-card__number">{s.n}</span>
                  <div className="service-card__icon">
                    <svg viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                </div>
                <div className="service-card__content">
                  <h2>{s.title}</h2>
                  <p>{s.body}</p>
                  <ul style={{ marginTop: 16, paddingLeft: 18 }}>
                    {s.includes.map((i) => (
                      <li key={i} style={{ fontSize: ".9rem", opacity: 0.72, marginBottom: 4 }}>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
