import Link from "next/link";
import { StoreAvailability } from "./StoreAvailability";

export function PersonalizationSection() {
  return (
    <section className="section cta-section" id="download" aria-labelledby="app-launch-heading">
      <div className="section-inner cta-card">
        <div className="cta-copy">
          <h2 id="app-launch-heading">Get notified at launch</h2>
          <Link className="btn-gold" href="/waitlist">Join the waitlist <span aria-hidden="true">→</span></Link>
        </div>
        <StoreAvailability />
      </div>
    </section>
  );
}
