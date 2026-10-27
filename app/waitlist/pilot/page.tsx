import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "../../components/landing/PageShell";

export const metadata: Metadata = {
  title: "Luganda pilot",
  description: "How to take part in the Baby Steps Luganda pilot, try activities, and share feedback.",
};

export default function PilotPage() {
  return (
    <PageShell showPersonalization={false}>
      <section className="section pilot-section" aria-labelledby="pilot-heading">
        <div className="section-inner pilot-inner">
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span>
            <Link href="/waitlist">Waitlist</Link><span aria-hidden="true">/</span>
            <span aria-current="page">Pilot</span>
          </nav>
          <div className="pilot-intro">
            <h1 className="section-title" id="pilot-heading">Luganda pilot</h1>
            <p>Help us test Baby Steps before launch. Join the waitlist for updates; pilot dates and invitations are still to come.</p>
            <Link className="btn-primary" href="/waitlist">Join the waitlist <span aria-hidden="true">→</span></Link>
          </div>

          <div className="pilot-grid">
            <section className="pilot-card" aria-labelledby="pilot-testing">
              <h2 id="pilot-testing">When you’re invited</h2>
              <ol>
                <li>Follow the setup instructions in your invitation.</li>
                <li>Try a story or game with your child for 5–10 minutes.</li>
                <li>Note what felt easy, confusing, or didn’t work.</li>
                <li>Share your feedback with the team.</li>
              </ol>
              <Link className="inline-link" href="/languages#luganda-quiz">Try the website quiz now <span aria-hidden="true">→</span></Link>
            </section>

            <section className="pilot-card" aria-labelledby="pilot-feedback">
              <h2 id="pilot-feedback">Share feedback</h2>
              <p>Tell us which activity you tried, what happened, and what you expected. For a problem, include your device model and the steps that led to it.</p>
              <p>Leave out children’s names, photos, and other personal details. Remove them from any screenshots.</p>
              <a className="inline-link" href="mailto:hello@babystepslearn.com?subject=Baby%20Steps%20pilot%20feedback">Email feedback <span aria-hidden="true">→</span></a>
            </section>

            <section className="pilot-card" aria-labelledby="pilot-consent">
              <h2 id="pilot-consent">Privacy & consent</h2>
              <p>A parent or guardian must agree before a child takes part and stay with them while testing. Taking part is optional, and you can stop at any time.</p>
              <p>Joining the waitlist does not enrol your child in the pilot. Review the pilot details and privacy information in your invitation before deciding.</p>
              <Link className="inline-link" href="/privacy">Read the privacy policy <span aria-hidden="true">→</span></Link>
            </section>

            <section className="pilot-card" aria-labelledby="pilot-contact">
              <h2 id="pilot-contact">Contact the team</h2>
              <p>For testing help, accessibility needs, or questions about your information:</p>
              <a className="pilot-email" href="mailto:hello@babystepslearn.com">hello@babystepslearn.com</a>
            </section>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
