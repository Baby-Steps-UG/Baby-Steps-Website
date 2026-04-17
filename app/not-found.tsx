import Link from "next/link";

import { PageShell } from "./components/landing/PageShell";

export default function NotFound() {
  return (
    <PageShell showPersonalization={false}>
      <section className="section not-found-section" aria-labelledby="not-found-heading">
        <div className="section-inner">
          <div className="not-found-card">
            <p className="not-found-code">404</p>
            <h1 className="section-title centered" id="not-found-heading">
              Page not found
            </h1>
            <p className="section-subtitle centered not-found-subtitle">
              The page you are looking for does not exist or may have been moved.
            </p>

            <div className="not-found-actions">
              <Link className="btn-primary" href="/">
                Back to Home
              </Link>
              <Link className="not-found-link" href="/waitlist">
                Go to Waitlist
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
