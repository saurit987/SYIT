import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const links = [
  { to: "/services", label: "Services" },
  { to: "/about", label: "What we are" },
  { to: "/why-us", label: "Why us" },
  { to: "/individuals", label: "For individuals" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  // Last scroll position, so direction can be derived without
  // re-rendering on every event.
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      // Hide on downward scroll past the header, reveal on any
      // upward movement. A threshold stops the bar flickering
      // when the pointer is near the top of the page.
      const delta = y - lastY.current;
      if (y > 120 && delta > 4) setHidden(true);
      else if (delta < -4) setHidden(false);
      lastY.current = y;
    };

    onScroll();
    lastY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  // Close on Escape — a drawer the keyboard cannot dismiss is a trap.
  // Focus returns to the toggle, or the next Tab lands mid-page with
  // no indication of where the user went.
  const menuBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`site-header${scrolled ? " scrolled" : ""}${hidden && !open ? " is-hidden" : ""}`}
      id="site-header"
    >
      <div className="container nav">
        <Link to="/" className="brand" aria-label="SYIT home">
          <span className="brand__mark">SYIT</span>
          <span className="brand__label">SECURITY</span>
        </Link>

        <nav className="nav__links" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.to} to={link.to} activeProps={{ className: "active" }}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link to="/contact" className="nav__button">
          Get secured
          <span>↗</span>
        </Link>

        <button
          className={`nav__menu${open ? " is-open" : ""}`}
          type="button"
          ref={menuBtn}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu${open ? " open" : ""}`}>
        {links.map((link, i) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${120 + i * 45}ms` : "0ms" }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/contact"
          className="mobile-menu__cta"
          onClick={() => setOpen(false)}
          style={{ transitionDelay: open ? `${120 + links.length * 45}ms` : "0ms" }}
        >
          Get secured ↗
        </Link>
      </div>
    </header>
  );
}
