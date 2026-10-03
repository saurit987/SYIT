import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/components/site/useReveal";
import { useScrollStory } from "@/lib/useScrollStory";
import { FinalCta } from "@/components/site/FinalCta";
import { twitterCard } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SYIT — Cybersecurity & Data Privacy Consultancy" },
      {
        name: "description",
        content:
          "SYIT helps startups and individuals with security audits, data privacy, identity protection and compliance readiness.",
      },
      { property: "og:title", content: "SYIT — Cybersecurity & Data Privacy Consultancy" },
      {
        property: "og:description",
        content:
          "Security audits, data protection, identity hardening and compliance readiness for startups and individuals.",
      },
      ...twitterCard(
        "SYIT — Cybersecurity & Data Privacy Consultancy",
        "Security audits, data protection, identity hardening and compliance readiness for startups and individuals.",
      ),
    ],
  }),
  component: Index,
});

const services = [
  {
    n: "01",
    title: "Startup security audits",
    body: "Full-spectrum assessment of your infrastructure, codebase and access controls, delivered as a prioritized remediation plan.",
  },
  {
    n: "02",
    title: "Data privacy consulting",
    body: "Data mapping, retention rules, consent flows and privacy notices, so personal data is handled lawfully and deliberately.",
  },
  {
    n: "03",
    title: "Compliance readiness",
    body: "GDPR, ISO 27001 and DPDP gap analysis and implementation support, from policy drafts to audit preparation.",
  },
  {
    n: "04",
    title: "Identity & access control",
    body: "MFA enforcement, privilege auditing, credential-stuffing defence and zero-trust access policies for growing teams.",
  },
  {
    n: "05",
    title: "AI security",
    body: "Adversarial testing, model access control and data pipeline hardening for teams building with LLMs and ML systems.",
  },
  {
    n: "06",
    title: "Personal digital safety",
    body: "Device clean-up, malware removal, password and 2FA setup, and takedown help for individuals facing exposure.",
  },
];

function Index() {
  useReveal();
  useScrollStory();

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="eyebrow reveal">
              <span className="eyebrow__indicator" />
              SECURITY / PRIVACY / IDENTITY
            </div>

            <h1 className="hero__title reveal">
              Infrastructure
              <span>that doesn't leak.</span>
            </h1>

            <div className="hero__description reveal">
              <span className="hero__line" />
              <p>
                Security audits, data protection, compliance readiness and architecture hardening —
                built for startups.
              </p>
              <p>
                And for individuals: clean devices, protected identities, and a malware-free digital
                life.
              </p>
            </div>

            <div className="hero__actions reveal">
              <Link to="/contact" className="button button--primary">
                Talk to us
                <span>→</span>
              </Link>
              <Link to="/services" className="button button--secondary">
                Explore services
              </Link>
            </div>

            <div className="hero__meta reveal">
              <div>
                <span className="hero__meta-label">FOCUS</span>
                <span>Security &amp; data privacy</span>
              </div>
              <div>
                <span className="hero__meta-label">APPROACH</span>
                <span>Practical &amp; measurable</span>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal-scale">
            <div className="hero-visual__top">
              <span>INFRASTRUCTURE</span>
              <span className="hero-visual__status">
                <i />
                ACTIVE
              </span>
            </div>

            <div className="hero-visual__core">
              <div className="hero-visual__rings" />
              <div className="hero-visual__circle">
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <path d="M50 8 L82 20 V46 C82 67 69 82 50 92 C31 82 18 67 18 46 V20 Z" />
                  <path d="M34 49 L45 60 L67 37" />
                </svg>
              </div>
            </div>

            <div className="hero-visual__data">
              <div>
                <span>NETWORK</span>
                <strong>SECURE</strong>
              </div>
              <div>
                <span>IDENTITY</span>
                <strong>VERIFIED</strong>
              </div>
              <div>
                <span>DATA</span>
                <strong>PROTECTED</strong>
              </div>
            </div>

            <div className="hero-visual__footer">
              <span>SYIT / SECURITY NODE</span>
              <span>01</span>
            </div>
          </div>
        </div>

        <div className="hero__bottom">
          <div className="container hero__bottom-inner">
            <span>01 — INTRODUCTION</span>
            <span className="scroll-hint">
              Scroll to explore
              <i>↓</i>
            </span>
          </div>
        </div>
      </section>

      <section className="trust">
        <div className="container trust__inner">
          <div className="trust__statement reveal">
            <span className="section-label">SECURITY, WITHOUT THE THEATRE.</span>
            <p>
              We focus on the parts of security that actually reduce risk — infrastructure,
              identity, data, privacy, compliance, and the systems connecting them.
            </p>
          </div>

          <div className="trust__items">
            <div className="trust__item reveal">
              <strong>06</strong>
              <span>Core security disciplines</span>
            </div>
            <div className="trust__item reveal">
              <strong>24/7</strong>
              <span>Infrastructure mindset</span>
            </div>
            <div className="trust__item reveal">
              <strong>01</strong>
              <span>Goal: reduce exposure</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="container">
          <div className="section-heading reveal">
            <div>
              <span className="section-number">02 / SERVICES</span>
              <h2>
                Security that works <em>with</em> your business.
              </h2>
            </div>
            <p>
              No security theatre. No giant reports nobody reads. Just practical work designed
              around how your infrastructure — or your personal setup — actually operates.
            </p>
          </div>

          <div className="services__grid">
            {services.map((s) => (
              <article className="service-card reveal" key={s.n}>
                <div className="service-card__top">
                  <span className="service-card__number">{s.n}</span>
                  <div className="service-card__icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3 19 6v6c0 5-3.2 7.6-7 9-3.8-1.4-7-4-7-9V6Z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                </div>
                <div className="service-card__content">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
                <span className="service-card__arrow">↗</span>
              </article>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: 40 }}>
            <Link to="/services" className="button button--secondary">
              See how we work
            </Link>
          </div>
        </div>
      </section>

      <section className="systems section" id="systems">
        <div className="container">
          <div className="section-heading section-heading--systems reveal">
            <div>
              <span className="section-number">03 / OBSERVABILITY</span>
              <h2>Know what your infrastructure sees.</h2>
            </div>
            <div className="live-indicator">
              <span />
              LIVE SYSTEM
            </div>
          </div>

          <div className="terminal reveal-scale">
            <div className="terminal__header">
              <div className="terminal__dots">
                <span />
                <span />
                <span />
              </div>
              <span className="terminal__title">system_monitor.sh</span>
              <span className="terminal__status">RUNNING</span>
            </div>

            <div className="terminal__body">
              <div className="terminal__command">
                <span className="terminal__prompt">$</span>
                syit scan --all
              </div>
              <div className="terminal__line terminal__muted">Initializing security daemon...</div>
              <div className="terminal__line terminal__success">
                <b>[OK]</b> endpoint verified — api.syit.io
              </div>
              <div className="terminal__line terminal__success">
                <b>[OK]</b> encryption-at-rest confirmed
              </div>
              <div className="terminal__line terminal__warning">
                <b>[WARN]</b> outdated TLS cert — vendor-api.io
              </div>
              <div className="terminal__line terminal__info">
                <b>[INFO]</b> DPDP compliance check passed
              </div>
              <div className="terminal__cursor" />
            </div>

            <div className="terminal__footer">
              <span>06 checks completed</span>
              <span>last scan: just now</span>
            </div>
          </div>

          <div className="systems__note reveal">
            <span>01</span>
            <p>Security should give your team more visibility, not more noise.</p>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
