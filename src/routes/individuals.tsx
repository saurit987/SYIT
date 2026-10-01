import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FinalCta } from "@/components/site/FinalCta";
import { useReveal } from "@/components/site/useReveal";
import { useScrollStory } from "@/lib/useScrollStory";

export const Route = createFileRoute("/individuals")({
  head: () => ({
    meta: [
      { title: "For Individuals — Identity Protection & Device Security | SYIT" },
      {
        name: "description",
        content:
          "Personal cybersecurity help: malware removal, account recovery, identity protection, 2FA setup and privacy clean-up for individuals and families.",
      },
      { property: "og:title", content: "For Individuals — SYIT" },
      {
        property: "og:description",
        content: "Clean devices, protected accounts and a smaller digital footprint.",
      },
    ],
  }),
  component: IndividualsPage,
});

const helps = [
  {
    tag: "PERSONAL 01",
    title: "Device clean-up",
    body: "Malware, adware and stalkerware removal on phones and laptops, plus a hardened configuration afterwards.",
  },
  {
    tag: "PERSONAL 02",
    title: "Account recovery",
    body: "Locked out or hacked email, social or banking accounts — recovery, clean-up of attacker access, and lock-down.",
  },
  {
    tag: "PERSONAL 03",
    title: "Identity protection",
    body: "Passkeys, password manager setup, breach monitoring, SIM-swap defence and safe recovery options.",
  },
  {
    tag: "PERSONAL 04",
    title: "Privacy clean-up",
    body: "Reduce your exposed data: old accounts, data brokers, oversharing apps, and public profile hygiene.",
  },
  {
    tag: "PERSONAL 05",
    title: "Family safety",
    body: "Sensible protections for kids and parents — device settings, scam awareness and shared account hygiene.",
  },
  {
    tag: "PERSONAL 06",
    title: "Scam & fraud triage",
    body: "Suspicious message, fake job offer or payment fraud — we assess quickly and tell you what to do next.",
  },
];

function IndividualsPage() {
  useReveal();
  useScrollStory();

  return (
    <>
      <PageHero
        label="01 / FOR INDIVIDUALS"
        title={
          <>
            Your accounts, devices and data — <em>back under your control.</em>
          </>
        }
        intro="You don't need a security team to be safe. You need the right settings, the right habits and someone to call when something feels wrong."
      />

      <section className="section">
        <div className="container">
          <div className="feature-grid">
            {helps.map((h) => (
              <div className="feature-card reveal" key={h.tag}>
                <span className="feature-card__tag">{h.tag}</span>
                <h2>{h.title}</h2>
                <p>{h.body}</p>
              </div>
            ))}
          </div>

          <div className="systems__note reveal" style={{ marginTop: 60 }}>
            <span>01</span>
            <p>
              If you think you are being targeted right now, contact us first and change passwords
              from a different, trusted device.
            </p>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
