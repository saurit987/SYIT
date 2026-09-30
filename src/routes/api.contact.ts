import { createFileRoute } from "@tanstack/react-router";

/**
 * Contact form endpoint.
 *
 * Forwards submissions to the SYIT inbox by email. Uses the Resend HTTP API
 * directly rather than an SDK so the app gains no new runtime dependency.
 *
 * Requires the RESEND_API_KEY environment variable. If it is not configured
 * the endpoint returns 503 and an honest message — it never pretends to have
 * delivered a message it silently dropped.
 */

const TO_EMAIL = "admin@sauritlab.xyz";
const FROM_EMAIL = "contact@syit.sauritlab.xyz";

interface LeadPayload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  // Honeypot: real users never fill this hidden field.
  website?: unknown;
}

function asString(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: LeadPayload;
        try {
          body = (await request.json()) as LeadPayload;
        } catch {
          return new Response(JSON.stringify({ error: "Invalid request body." }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        // Silently accept honeypot hits so bots do not learn they were caught.
        if (asString(body.website, 200)) {
          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        }

        const name = asString(body.name, 120);
        const email = asString(body.email, 200);
        const company = asString(body.company, 160);
        const message = asString(body.message, 5000);

        const errors: string[] = [];
        if (!name) errors.push("name is required");
        if (!message) errors.push("message is required");
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
          errors.push("a valid email is required");
        }
        if (errors.length) {
          return new Response(JSON.stringify({ error: errors.join("; ") }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const apiKey = process.env["RESEND_API_KEY"];
        if (!apiKey) {
          // Honest failure: the visitor must be told it did not send.
          console.error("[contact] RESEND_API_KEY is not configured — message not delivered");
          return new Response(
            JSON.stringify({
              error:
                "The contact form is not configured yet. Please email admin@sauritlab.xyz directly.",
            }),
            { status: 503, headers: { "content-type": "application/json" } },
          );
        }

        const esc = (s: string) =>
          s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        const textBody = [
          `Name:    ${name}`,
          `Email:   ${email}`,
          company ? `Company: ${company}` : null,
          "",
          "Message:",
          message,
        ]
          .filter((l): l is string => l !== null)
          .join("\n");

        const htmlBody = `<div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.6;color:#1c1f26">
  <h2 style="margin:0 0 12px;font-size:16px">New contact submission</h2>
  <table cellpadding="4" style="border-collapse:collapse">
    <tr><td style="color:#6b7280"><b>Name</b></td><td>${esc(name)}</td></tr>
    <tr><td style="color:#6b7280"><b>Email</b></td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
    ${
      company
        ? `<tr><td style="color:#6b7280"><b>Company</b></td><td>${esc(company)}</td></tr>`
        : ""
    }
  </table>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
  <p style="white-space:pre-wrap;margin:0">${esc(message)}</p>
</div>`;

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: FROM_EMAIL,
              to: [TO_EMAIL],
              reply_to: email,
              subject: `New contact submission — ${name}${company ? ` (${company})` : ""}`,
              text: textBody,
              html: htmlBody,
            }),
          });

          if (!res.ok) {
            const detail = await res.text().catch(() => "");
            console.error(`[contact] Resend rejected the message: ${res.status} ${detail}`);
            return new Response(
              JSON.stringify({ error: "We couldn't send that. Please email us directly." }),
              { status: 502, headers: { "content-type": "application/json" } },
            );
          }

          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        } catch (error) {
          console.error("[contact] failed to reach the mail provider", error);
          return new Response(
            JSON.stringify({ error: "We couldn't send that. Please email us directly." }),
            { status: 502, headers: { "content-type": "application/json" } },
          );
        }
      },
    },
  },
});
