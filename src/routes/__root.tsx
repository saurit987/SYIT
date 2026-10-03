import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { AnyRouteMatch } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { canonicalUrl } from "../lib/seo";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { Background } from "../components/site/Background";
import { ScrollProgress } from "../components/site/ScrollProgress";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: ({ matches }) => {
    // Deepest match wins: the leaf route knows its own path, and the root's
    // fullPath is always "/". Falls back to "/" when there is nothing better.
    const leaf = matches[matches.length - 1];
    // A not-found render still resolves a match list (the leaf is the global
    // not-found route, whose fullPath is "/"), so the fallback above would
    // otherwise point every 404's canonical at the homepage — telling search
    // engines an unknown URL is a duplicate of "/". Detect it and emit noindex
    // with no canonical at all.
    const isNotFound = matches.some(
      (m) => m.status === "notFound" || m.globalNotFound,
    );
    const path = leaf?.fullPath ?? "/";
    const meta = [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#1c1f26" },
        { title: "SYIT — Secure Your Infrastructure" },
        {
          name: "description",
          content: "SYIT — security and data privacy consultancy for startups and individuals.",
        },
        { name: "author", content: "SYIT" },
        { property: "og:title", content: "SYIT — Secure Your Infrastructure" },
        {
          property: "og:description",
          content: "Security and data privacy consultancy for startups and individuals.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl(path) },
        { property: "og:image", content: "https://syit.sauritlab.xyz/og-default.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "SYIT — Secure Your Infrastructure" },
        { property: "og:site_name", content: "SYIT" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: "https://syit.sauritlab.xyz/og-default.png",
        },
        // Defaults for any route that has not set its own twitter:* pair. Every
        // current route overrides both via twitterCard() in lib/seo.
        { name: "twitter:title", content: "SYIT — Secure Your Infrastructure" },
        {
          name: "twitter:description",
          content:
            "Security and data privacy consultancy for startups and individuals.",
        },
        // Keep 404s out of the index instead of letting them be crawled and
        // indexed as duplicates of the homepage.
        ...(isNotFound
          ? [{ name: "robots", content: "noindex, nofollow" } as const]
          : []),
    ];

    const links: AnyRouteMatch["links"] = [
        {
          rel: "stylesheet",
          href: appCss,
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&display=swap",
        },
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
        { rel: "icon", href: "/favicon-128.png", type: "image/png", sizes: "128x128" },
        { rel: "apple-touch-icon", href: "/favicon-128.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
    ];

    // No canonical on a 404: the URL does not exist, so there is nothing to
    // declare a preferred version of. Emitting one would consolidate the 404
    // into the homepage.
    if (!isNotFound) {
      links.push({ rel: "canonical", href: canonicalUrl(path) });
    }

    // Organization structured data. Every value here is already published on
    // the site (name, url, the admin@ address on /contact, the logo); nothing
    // is invented. Deliberately omitted: telephone (still masked), address,
    // foundingDate, sameAs social profiles and aggregateRating — none are
    // stated publicly, and asserting unverified schema.org properties is worse
    // than omitting them. Skipped on 404s, which should not describe the org.
    const jsonLd = isNotFound
      ? []
      : [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "SYIT",
              url: canonicalUrl("/"),
              logo: `${canonicalUrl("/")}favicon-256.png`,
              image: `${canonicalUrl("/")}og-default.png`,
              description:
                "Security and data privacy consultancy for startups and individuals.",
              email: "admin@sauritlab.xyz",
              areaServed: "Worldwide",
            }),
          } as const,
        ];

    return {
      meta,
      links,
      scripts: [{ src: "/track.js", defer: true }, ...jsonLd],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Background />
      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
