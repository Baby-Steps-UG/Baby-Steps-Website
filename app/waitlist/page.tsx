import Script from "next/script";

import { PageShell } from "../components/landing/PageShell";

export default function WaitlistPage() {
  return (
    <PageShell showPersonalization={false}>
      <section className="section waitlist-page-section" aria-labelledby="waitlist-page-heading">
        <div className="section-inner waitlist-page-inner">
          <div className="section-heading centered">
            <span className="section-label">Waitlist</span>
            <h1 className="section-title centered" id="waitlist-page-heading">
              Join the Baby Steps Waitlist
            </h1>
            <p className="section-subtitle centered waitlist-page-subtitle">
              Be first to hear launch updates, early onboarding details, and premium trial access.
            </p>
          </div>

          <div className="waitlist-page-frame-wrap">
            <iframe
              className="waitlist-page-embed"
              data-tally-src="https://tally.so/r/xXNZOy?transparentBackground=1"
              title="Baby Steps Waitlist"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
    </PageShell>
  );
}
