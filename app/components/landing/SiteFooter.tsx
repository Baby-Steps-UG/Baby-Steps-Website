import Image from "next/image";
import Link from "next/link";

import { BrandLogo } from "./BrandLogo";
import { CookieSettingsButton } from "./CookiePreferences";

const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "For parents", href: "/for-parents" },
      { label: "For schools", href: "/for-schools" },
      { label: "Luganda", href: "/languages" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Baby Steps",
    links: [
      { label: "About", href: "/about" },
      { label: "Join the waitlist", href: "/waitlist" },
      { label: "Luganda pilot", href: "/waitlist/pilot" },
      { label: "Contact", href: "mailto:hello@babystepslearn.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const socialLinks = [
  { label: "X", href: "https://x.com/babystepslearn", icon: "/social/x.png" },
  { label: "Instagram", href: "https://www.instagram.com/babystepslearn/", icon: "/social/instagram.png" },
  { label: "TikTok", href: "https://www.tiktok.com/@babystepslearn", icon: "/social/tiktok.png" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/baby-steps-learn/", icon: "/social/linkedin.png" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">

        <div className="footer-grid">
          <div className="footer-brand-block">
            <BrandLogo href="/" variant="main" className="footer-logo" />
            <a className="footer-email" href="mailto:hello@babystepslearn.com">hello@babystepslearn.com</a>
            <div className="social-row">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} className="social-btn" aria-label={`Baby Steps on ${social.label}`} target="_blank" rel="noreferrer">
                  <Image src={social.icon} alt="" width={16} height={16} unoptimized />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div className="footer-col" key={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? <Link href={link.href}>{link.label}</Link> : <a href={link.href}>{link.label}</a>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© 2026 Baby Steps</span>
          <CookieSettingsButton />
        </div>
      </div>
    </footer>
  );
}
