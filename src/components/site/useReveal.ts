import { useEffect, useRef } from "react";

/**
 * Adds the `visible` class to `.reveal` / `.reveal-scale` elements as they
 * enter view.
 *
 * The hidden starting state is OPT-IN: `.reveal` is visible by default and
 * only becomes opacity:0 once `js-reveal` is on <html>. That guarantees the
 * site still renders if hydration fails, a script is blocked, or a crawler
 * does not execute JS — otherwise every section below the hero would stay
 * invisible forever.
 *
 * The watchdog is a last resort only: if the observer genuinely never
 * reports, it force-reveals rather than leaving gaps in the page. It is
 * armed on setup and disarmed the moment the observer fires, so a healthy
 * page never reaches it and the entrance animation still plays.
 *
 * The handle lives in a ref rather than a local `let`: TypeScript's control
 * flow analysis does not see the assignment inside the observer callback, so
 * a local narrows to `never` by the time the cleanup runs and
 * `clearTimeout(watchdog)` fails to compile (TS2339).
 */
export function useReveal(deps: unknown[] = []) {
  const watchdog = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-reveal");

    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .reveal-scale"));

    const reveal = (el: HTMLElement) => el.classList.add("visible");

    const disarm = () => {
      if (watchdog.current !== null) {
        clearTimeout(watchdog.current);
        watchdog.current = null;
      }
    };

    // No IntersectionObserver → just show everything.
    if (!("IntersectionObserver" in window)) {
      elements.forEach(reveal);
      return () => root.classList.remove("js-reveal");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((entry) => entry.isIntersecting);
        if (!hit.length) return;

        hit.forEach((entry, index) => {
          const target = entry.target as HTMLElement;
          window.setTimeout(() => {
            target.classList.add("visible");
            observer.unobserve(target);
          }, index * 70);
        });

        // The observer is demonstrably working; the net is no longer needed.
        disarm();
      },
      { threshold: 0.01, rootMargin: "0px 0px 150px 0px" },
    );

    watchdog.current = setTimeout(() => {
      if (elements.some((el) => !el.classList.contains("visible"))) {
        root.classList.add("no-motion");
        elements.forEach(reveal);
      }
    }, 4000);

    // Fallback for fast jumps (keyboard End, anchor links): reveal anything
    // that has already passed through (or into) the viewport.
    const revealPassed = () => {
      const pending = elements.filter((el) => !el.classList.contains("visible"));
      if (!pending.length) {
        window.removeEventListener("scroll", onScroll);
        return;
      }
      for (const el of pending) {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.9) {
          reveal(el);
          observer.unobserve(el);
        }
      }
    };
    const onScroll = () => requestAnimationFrame(revealPassed);

    elements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    revealPassed();

    return () => {
      disarm();
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("js-reveal");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
