import Link from "next/link";

export function PersonalizationSection() {
  return (
    <section className="section cta-section" id="download">
      <div className="section-inner cta-card">
        <div className="cta-doodle" aria-hidden="true">∿</div>
        <div className="cta-copy">
          <span className="section-label section-label-light">Coming soon</span>
          <h2>Ready for their next little step?</h2>
          <p>
            Join families waiting to bring joyful Luganda learning into every day.
            Early explorers receive a 2-month Premium trial at launch.
          </p>
          <Link className="btn-gold" href="/waitlist">
            Save my early spot <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="cta-word-stack" aria-hidden="true">
          <span>one word</span><span>one game</span><strong>one brave step.</strong>
        </div>
      </div>
    </section>
  );
}
