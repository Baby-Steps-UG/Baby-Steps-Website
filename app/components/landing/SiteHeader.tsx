"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { BrandLogo } from "./BrandLogo";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "For parents", href: "/for-parents" },
  { label: "For schools", href: "/for-schools" },
  { label: "Languages", href: "/languages" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuId = useId();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButton.current?.focus();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <BrandLogo href="/" variant="main" className="header-logo" />

        <nav className="site-nav-desktop" aria-label="Primary">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  className={pathname === item.href ? "active" : ""}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="nav-cta" href="/waitlist">
                Join the waitlist <span aria-hidden="true">↗</span>
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          ref={menuButton}
          aria-expanded={isMenuOpen}
          aria-controls={mobileMenuId}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="menu-toggle-text">Menu</span>
          <span className="menu-toggle-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <nav
        id={mobileMenuId}
        hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className={`mobile-nav ${isMenuOpen ? "open" : ""}`}
        aria-label="Primary mobile"
      >
        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                className={pathname === item.href ? "active" : ""}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link className="nav-cta mobile-nav-cta" href="/waitlist" onClick={() => setIsMenuOpen(false)}>
              Join the waitlist <span aria-hidden="true">↗</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
