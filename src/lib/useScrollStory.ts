import { useEffect } from "react";

/**
 * Progressive scroll-motion layer:
 *  - staggered entrances for card/step/faq grids
 *  - the home hero content flows away as you scroll into the rest of the page
 *  - the ambient blue glow intensifies with scroll depth
 *
 * Everything is gated behind prefers-reduced-motion and cleaned up on unmount.
 * Animates transform / opacity only.
 *
 * GSAP is ~112 kB gzipped and was previously a STATIC import, so every route
 * (including the legal pages, which contain none of these elements) pulled it
 * onto the critical path. Loading it dynamically means the browser fetches it
 * only when a page actually has something to animate, and skips it entirely
 * under prefers-reduced-motion.
 */
export function useScrollStory() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Bail before importing GSAP if this page has nothing to animate.
    // Contact / privacy / terms have no grids, no hero, and no glow.
    const hasTarget = document.querySelector(
      ".services__grid, .feature-grid, .steps, .faq, .hero__content",
    );
    if (!hasTarget) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      // The effect may have been cleaned up while the chunk was in flight.
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        document
          .querySelectorAll<HTMLElement>(".services__grid, .feature-grid, .steps, .faq")
          .forEach((grid) => {
            const items = grid.querySelectorAll<HTMLElement>(
              ".service-card, .feature-card, .step, details",
            );
            if (!items.length) return;

            gsap.from(items, {
              autoAlpha: 0,
              y: 28,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: grid,
                start: "top 84%",
                once: true,
              },
            });
          });

        const heroContent = document.querySelector<HTMLElement>(".hero__content");
        if (heroContent) {
          gsap.to(heroContent, {
            autoAlpha: 0,
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: heroContent,
              start: "top top",
              end: "+=85%",
              scrub: 0.5,
            },
          });
        }

        const blueGlow = document.querySelector<HTMLElement>(".background__glow--blue");
        if (blueGlow) {
          gsap.fromTo(
            blueGlow,
            { opacity: 0.11 },
            {
              opacity: 0.24,
              ease: "none",
              scrollTrigger: { start: 0, end: "max", scrub: 0.8 },
            },
          );
        }
      });

      cleanup = () => {
        ctx.revert();
        ScrollTrigger.refresh();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);
}
