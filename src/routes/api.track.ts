import { createFileRoute } from "@tanstack/react-router";

/**
 * First-party traffic beacon.
 *
 * Privacy posture: no cookies, no localStorage, no persistent identifier, no
 * IP retention. Each hit is a single aggregate row in the Vercel function
 * log. There is deliberately no way to reconstruct who visited.
 *
 * The point is availability, not attribution. Vercel Web Analytics is the
 * better product if you enable it in the dashboard; this exists so traffic
 * is observable without it.
 */

interface HitPayload {
  path?: unknown;
  ref?: unknown;
  // Screen class, not dimensions — enough to spot a mobile-only regression
  // without recording anything device-specific.
  vp?: unknown;
}

const VALID_PREFIXES = [
  "/",
  "/about",
  "/services",
  "/why-us",
  "/individuals",
  "/contact",
  "/privacy",
  "/terms",
];

function normalise(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export const Route = createFileRoute("/api/track")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: HitPayload = {};
        try {
          body = (await request.json()) as HitPayload;
        } catch {
          body = {};
        }

        const path = normalise(body.path, 200) || "/";
        const ref = normalise(body.ref, 200);
        const vp = ["mobile", "tablet", "desktop"].includes(String(body.vp))
          ? String(body.vp)
          : "unknown";

        // Only canonical routes are recorded, so noise and probe traffic
        // cannot pollute the numbers.
        if (!VALID_PREFIXES.some((p) => path === p || path.startsWith(p + "/"))) {
          return new Response(null, { status: 204 });
        }

        // One line per hit: the shape a `vercel logs` grep can count.
        console.log(
          `[track] path=${path} vp=${vp} ref=${ref || "direct"} ua=${request.headers.get("user-agent")?.slice(0, 60) ?? "none"}`,
        );

        return new Response(null, { status: 204 });
      },
    },
  },
});
