import Image from "next/image";

import { BrandLogo } from "./BrandLogo";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "For Parents", href: "/for-parents" },
      { label: "For Schools", href: "/for-schools" },
      { label: "Pricing", href: "/pricing" },
      { label: "Languages", href: "/languages" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Help Centre", href: "#" },
      { label: "Webinars", href: "#" },
      { label: "Research", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
    ],
  },
];

const socialLinks = [
  { label: "X", href: "https://x.com/babystepslearn", icon: "/social/x.png" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/babystepslearn/",
    icon: "/social/instagram.png",
  },
  { label: "TikTok", href: "https://www.tiktok.com/@babystepslearn", icon: "/social/tiktok.png" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/baby-steps-learn/",
    icon: "/social/linkedin.png",
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <BrandLogo href="/" variant="main" className="footer-logo" showFace={false} />
            <p>
              Helping every Ugandan child take their first steps into their mother tongue, one
              word, one game, one moment at a time.
            </p>
            <a className="footer-email" href="mailto:hello@babystepslearn.com">
              hello@babystepslearn.com
            </a>

            <div className="social-row">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="social-btn"
                  aria-label={`Baby Steps Learn on ${social.label}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={social.icon}
                    alt=""
                    className="social-btn-image"
                    width={16}
                    height={16}
                    unoptimized
                  />
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
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© 2026 Baby Steps. All rights reserved.</span>
          <span className="footer-credit">Made with love in Uganda</span>
        </div>
      </div>
    </footer>
  );
}
