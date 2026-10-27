import Link from "next/link";

export function SubjectsSection() {
  return (
    <section className="section languages-section" id="languages">
      <div className="section-inner language-home-layout luganda-home-layout">
        <div className="language-home-copy">
          <h2 className="section-title">Learn <span className="accent-blue">Luganda</span></h2>
          <Link className="btn-dark" href="/languages#luganda-quiz">Try the quiz <span aria-hidden="true">→</span></Link>
        </div>
        <div className="luganda-home-card">
          <div className="luganda-home-greeting"><strong lang="lg">Oli otya?</strong><span>How are you?</span></div>
          <div className="luganda-home-orbit" aria-hidden="true"><span /><span /><span /></div>
        </div>
      </div>
    </section>
  );
}
