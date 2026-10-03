/**
 * Per-route canonical URL helpers.
 *
 * The root route previously hard-coded `og:url` as the bare site origin with no
 * path, so every social card for a subpage claimed the homepage URL — a
 * Facebook/LinkedIn share of /privacy rendered the home page's permalink. There
 * was no `rel=canonical` at all either, which let any mirror (e.g. the
 * *.vercel.app deployment host) compete with the canonical domain in search.
 *
 * TanStack Start resolves head meta by attribute, with a child route's value
 * overriding the root's, so routes spread these in and the root value acts as
 * the default for any route that has not been updated yet.
 */
const SITE = "https://syit.sauritlab.xyz";

/** The site's real, indexable routes. Anything else (404s, typos) falls back
 *  to the homepage rather than emitting a canonical URL for a dead page. */
const CANONICAL_ROUTES: readonly string[] = [
  "/",
  "/about",
  "/services",
  "/why-us",
  "/individuals",
  "/contact",
  "/privacy",
  "/terms",
] as const;

/** Absolute, normalised, non-trailing-slash URL for a route path. */
export function canonicalUrl(path: string): string {
  const clean = (path.split("?")[0] ?? "").split("#")[0]?.replace(/\/+$/, "") ?? "";
  return clean && CANONICAL_ROUTES.includes(clean) ? `${SITE}${clean}` : SITE;
}

/** `og:url` for a route. */
export function ogUrl(path: string) {
  return { property: "og:url", content: canonicalUrl(path) } as const;
}

/** `rel=canonical` link for a route. */
export function canonicalLink(path: string) {
  return { rel: "canonical", href: canonicalUrl(path) } as const;
}

/**
 * `twitter:title` / `twitter:description` for a route.
 *
 * X/Twitter falls back to the Open Graph tags when these are absent, so the
 * cards rendered fine — but the fallback is not guaranteed: some scrapers read
 * only the twitter:* namespace. Each route sets these explicitly, mirroring its
 * own og:title/og:description. The root route supplies the same pair as
 * defaults for any route that has not been updated.
 */
export function twitterCard(title: string, description: string) {
  return [
    { name: "twitter:title", content: title } as const,
    { name: "twitter:description", content: description } as const,
  ];
}
