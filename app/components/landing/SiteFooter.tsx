import Image from "next/image";
import Link from "next/link";

import { BrandLogo } from "./BrandLogo";

const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "For Parents", href: "/for-parents" },
      { label: "For Schools", href: "/for-schools" },
      { label: "Languages", href: "/languages" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Baby Steps",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Join the Waitlist", href: "/waitlist" },
      { label: "Contact Us", href: "mailto:hello@babystepslearn.com" },
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
        <div className="footer-topline"><span>Learn it.</span><span>Love it.</span><strong>Keep it alive.</strong></div>

        <div className="footer-grid">
          <div className="footer-brand-block">
            <BrandLogo href="/" variant="main" className="footer-logo" />
            <p>
              Helping Ugandan children grow in language, identity, and confidence—one joyful step
              at a time.
            </p>
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
              <h4>{column.title}</h4>
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
          <span>© 2026 Baby Steps. All rights reserved.</span>
          <span className="footer-credit">Made with care in Uganda</span>
        </div>
      </div>
    </footer>
  );
}
