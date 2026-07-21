import Link from "next/link";

export function SubjectsSection() {
  return (
    <section className="section languages-section" id="languages">
      <div className="section-inner language-home-layout luganda-home-layout">
        <div className="language-home-copy">
          <span className="section-label">Our first language</span>
          <h2 className="section-title">
            We’re beginning with <span className="accent-orange">Luganda.</span>
          </h2>
          <p className="section-subtitle">
            One thoughtful language path at launch—full of familiar words, playful practice, and
            stories that feel close to home. More Ugandan languages are part of the long-term vision.
          </p>
          <Link className="btn-dark" href="/languages">
            Explore the Luganda path <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="luganda-home-card">
          <span className="luganda-home-badge">Launch language · 01</span>
          <div className="luganda-home-greeting"><small>Say hello</small><strong>Oli otya?</strong><span>How are you?</span></div>
          <div className="luganda-home-promise"><i>✦</i><p><strong>Built deeply before broadly.</strong><br />More languages will follow with time and care.</p></div>
          <div className="luganda-home-orbit" aria-hidden="true"><span /><span /><span /></div>
        </div>
      </div>
    </section>
  );
}
