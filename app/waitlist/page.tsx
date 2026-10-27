import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "../components/landing/PageShell";
import { StoreAvailability } from "../components/landing/StoreAvailability";

export const metadata: Metadata = { title: "Join the waitlist" };

export default function WaitlistPage() {
  return (
    <PageShell showPersonalization={false}>
      <section className="section waitlist-page-section" aria-labelledby="waitlist-page-heading">
        <div className="section-inner waitlist-page-inner">
          <div className="section-heading centered">
            <h1 className="section-title" id="waitlist-page-heading">Join the waitlist</h1>
          </div>
          <StoreAvailability />
          <nav className="waitlist-page-links" aria-label="Waitlist information">
            <Link href="/waitlist/pilot">Pilot details</Link>
            <Link href="/privacy">Privacy policy</Link>
          </nav>
          <div className="waitlist-page-frame-wrap">
            <iframe
              className="waitlist-page-embed"
              src="https://tally.so/embed/xXNZOy?alignLeft=1&hideTitle=1&transparentBackground=1"
              title="Baby Steps waitlist form"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <p className="waitlist-form-link"><a href="https://tally.so/r/xXNZOy" target="_blank" rel="noopener noreferrer">Open form in a new tab ↗</a></p>
        </div>
      </section>
    </PageShell>
  );
}
