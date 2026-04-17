import Link from "next/link";

import { BrandLogo } from "./BrandLogo";

const navItems = [
  { label: "For Parents", href: "/for-parents" },
  { label: "Pricing", href: "/pricing" },
  { label: "For Schools", href: "/for-schools" },
  { label: "Languages", href: "/languages" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <BrandLogo href="/" variant="main" className="header-logo" />

        <nav aria-label="Primary">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link className="nav-cta" href="/waitlist">
                Join Waitlist -&gt;
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
