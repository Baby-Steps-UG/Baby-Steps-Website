export function PersonalizationSection() {
  return (
    <section className="section cta-section" id="download">
      <div className="section-inner">
        <span className="section-label">Coming Soon</span>
        <h2 className="section-title centered">Be first to access Baby Steps</h2>
        <p className="section-subtitle centered cta-subtitle">
          We&apos;re in the final stretch. Join the waitlist to receive launch updates, plan details,
          and early onboarding for families and schools supporting learners ages 3-12.
          <span className="waitlist-trial-note">
            (Waitlist members get a 2-month Premium trial at launch.)
          </span>
        </p>

        <div className="waitlist-inline-wrap" id="schools">
          <iframe
            className="waitlist-embed"
            src="https://tally.so/embed/xXNZOy?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
            title="Baby Steps waitlist"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
