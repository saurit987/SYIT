import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FinalCta } from "@/components/site/FinalCta";
import { useReveal } from "@/components/site/useReveal";
import { useScrollStory } from "@/lib/useScrollStory";

export const Route = createFileRoute("/why-us")({
  head: () => ({
    meta: [
      { title: "Why SYIT is useful — Security that reduces real risk" },
      {
        name: "description",
        content:
          "Why startups and individuals hire SYIT: prioritised findings, faster enterprise security reviews, privacy done properly and identity protection that holds.",
      },
      { property: "og:title", content: "Why SYIT is useful" },
      {
        property: "og:description",
        content:
          "Prioritised findings, faster security reviews, and privacy built in rather than bolted on.",
      },
    ],
  }),
  component: WhyUsPage,
});

const reasons = [
  {
    tag: "VALUE 01",
    title: "Close enterprise deals faster",
    body: "Security questionnaires, DPAs and vendor reviews stop being a blocker when your controls and documentation already exist.",
  },
  {
    tag: "VALUE 02",
    title: "Spend on the right risks",
    body: "Most teams over-invest in tooling and under-invest in access control. We tell you where the actual exposure is.",
  },
  {
    tag: "VALUE 03",
    title: "Privacy without guesswork",
    body: "GDPR and India's DPDP obligations translated into concrete steps: data maps, retention, consent, breach process.",
  },
  {
    tag: "VALUE 04",
    title: "Identity you can trust",
    body: "Account takeover is the most common way people and companies get hurt. We harden identity first, everywhere.",
  },
  {
    tag: "VALUE 05",
    title: "Senior work, small footprint",
    body: "You talk to the person doing the work. No layers of account management, no junior handover.",
  },
  {
    tag: "VALUE 06",
    title: "Help when it goes wrong",
    body: "Compromised account, leaked data or malware? We triage, contain, clean up and document what happened.",
  },
];

const faqs = [
  {
    q: "We're pre-revenue. Is security too early?",
    a: "No. The cheapest time to fix access control, secrets handling and data collection is before you have customers depending on them.",
  },
  {
    q: "Do you work with individuals, not just companies?",
    a: "Yes. Personal device clean-up, account recovery, 2FA setup and privacy reviews are a core part of what we do.",
  },
  {
    q: "How long does an audit take?",
    a: "A focused startup audit is typically one to two weeks, depending on the size of your infrastructure and codebase.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Always. Confidentiality is the baseline of this work, and findings are shared only with the people you name.",
  },
];

function WhyUsPage() {
  useReveal();
  useScrollStory();

  return (
    <>
      <PageHero
        label="01 / WHY WE ARE USEFUL"
        title={
          <>
            Fewer surprises. <em>Faster decisions.</em>
          </>
        }
        intro="Security work is only useful if it changes something. Here is what actually changes after working with us."
      />

      <section className="section">
        <div className="container">
          <div className="feature-grid">
            {reasons.map((r) => (
              <div className="feature-card reveal" key={r.tag}>
                <span className="feature-card__tag">{r.tag}</span>
                <h2>{r.title}</h2>
                <p>{r.body}</p>
              </div>
            ))}
          </div>

          <div className="section-heading reveal" style={{ marginTop: 90 }}>
            <div>
              <span className="section-number">02 / QUESTIONS</span>
              <h2>Common questions.</h2>
            </div>
          </div>

          <div className="faq reveal" style={{ marginTop: 28 }}>
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
