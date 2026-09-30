import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { useReveal } from "@/components/site/useReveal";

type SubmitState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

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
  const [state, setState] = useState<SubmitState>({ kind: "idle" });

  // The in-flight flag has to be a ref, not `state`: five clicks dispatched in
  // one tick all close over the same `idle` state, because React has not
  // re-rendered between them. A state guard let all five through (measured:
  // 5 POSTs to /api/contact). The ref flips synchronously on first submit.
  const inFlight = useRef(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Guard rather than rely on the disabled attribute: `disabled` on a
    // focused button makes Chromium drop focus to <body>, so a keyboard user
    // who submits gets thrown back to the top of the document with the
    // outcome only visible in a live region. aria-disabled keeps the button
    // focusable and announced, and this guard stops a double submit.
    if (inFlight.current) {
      event.preventDefault();
      return;
    }
    inFlight.current = true;

    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setState({
          kind: "error",
          message:
            body.error ??
            "We couldn't send that just now. Please email admin@sauritlab.xyz directly.",
        });
        return;
      }

      form.reset();
      setState({ kind: "sent" });
    } catch {
      setState({
        kind: "error",
        message:
          "We couldn't reach the server. Check your connection, or email admin@sauritlab.xyz directly.",
      });
    } finally {
      // Release on every path, including the early `return` on !res.ok.
      inFlight.current = false;
    }
  }

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
                <a href="mailto:admin@sauritlab.xyz">admin@sauritlab.xyz</a>
              </div>
              <div className="contact-detail">
                <span>PHONE</span>
                <span>+91 XXXXX XXXXX</span>
              </div>
              <div className="contact-detail">
                <span>LOCATION</span>
                <strong>INDIA — REMOTE FIRST</strong>
              </div>
            </div>
          </div>

          <div className="contact__form-wrapper reveal">
            <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
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

              {/* Honeypot — hidden from people, tempting to bots. */}
              <div aria-hidden="true" className="form-trap">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <button
                type="submit"
                className="contact-form__submit"
                aria-disabled={state.kind === "sending"}
              >
                {state.kind === "sending" ? "Sending…" : "Send message"}
                <span>↗</span>
              </button>

              <p className="contact-form__note">
                No sales pitch. Just a useful first conversation.
              </p>
            </form>

            <div aria-live="polite" className="contact-form__status">
              {state.kind === "sent" && (
                <p className="is-success">
                  Thanks — your message reached us. We&apos;ll reply within one business day.
                </p>
              )}
              {state.kind === "error" && (
                <p className="is-error">
                  {state.message}{" "}
                  <a href="mailto:admin@sauritlab.xyz">admin@sauritlab.xyz</a>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
