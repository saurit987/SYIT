import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { useReveal } from "@/components/site/useReveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SYIT — Talk to a security consultant" },
      {
        name: "description",
        content:
          "Tell us what you're building or what went wrong. A short, free first conversation about your security and privacy risks.",
      },
      { property: "og:title", content: "Contact SYIT" },
      {
        property: "og:description",
        content:
          "A useful first conversation about your security and privacy risks — no sales pitch.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  useReveal();
  const [status, setStatus] = useState<string | null>(null);

  return (
    <>
      <PageHero
        label="01 / CONTACT"
        title={
          <>
            Let's close the <em>gaps.</em>
          </>
        }
      />

      <section className="contact section" id="contact">
        <div className="container contact__layout">
          <div className="contact__intro reveal">
            <span className="section-number">HOW TO REACH US</span>
            <h2>
              Tell us what keeps you <em>up at night.</em>
            </h2>
            <p>
              Whether you're a founder preparing for a security review or an individual dealing with
              a compromised account, start here.
            </p>

            <div className="contact__details">
              <div className="contact-detail">
                <span>EMAIL</span>
                <a href="mailto:hello@syit.io">hello@syit.io</a>
              </div>
              <div className="contact-detail">
                <span>PHONE</span>
                <a href="tel:+910000000000">+91 XXXXX XXXXX</a>
              </div>
              <div className="contact-detail">
                <span>LOCATION</span>
                <strong>INDIA — REMOTE FIRST</strong>
              </div>
            </div>
          </div>

          <div className="contact__form-wrapper reveal">
            <form
              className="contact-form"
              onSubmit={(event) => {
                event.preventDefault();
                setStatus("Thanks — your message is noted. We'll reply within one business day.");
                (event.target as HTMLFormElement).reset();
              }}
            >
              <div className="contact-form__row">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="company">
                  Company <span>Optional</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Company name"
                  autoComplete="organization"
                />
              </div>

              <div className="field">
                <label htmlFor="message">What can we help with?</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us a little about your infrastructure or your situation..."
                  required
                />
              </div>

              <button type="submit" className="contact-form__submit">
                Send message
                <span>↗</span>
              </button>

              <p className="contact-form__note">
                No sales pitch. Just a useful first conversation.
              </p>
            </form>

            <div aria-live="polite" style={{ marginTop: 16, fontSize: ".9rem", opacity: 0.8 }}>
              {status}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
