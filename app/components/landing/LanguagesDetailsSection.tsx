const learningMoments = [
  {
    number: "01",
    title: "Hear it",
    detail: "Children meet familiar Luganda words through listening, stories, and clear repetition.",
  },
  {
    number: "02",
    title: "Say it",
    detail: "Friendly prompts help children try greetings, family words, and everyday phrases aloud.",
  },
  {
    number: "03",
    title: "Play with it",
    detail: "Matching, quizzes, and word games give new vocabulary a joyful place to stick.",
  },
  {
    number: "04",
    title: "Bring it home",
    detail: "Small prompts make it easier to carry learning into real family conversations.",
  },
];

export function LanguagesDetailsSection() {
  return (
    <>
      <section className="section luganda-focus-section">
        <div className="section-inner luganda-focus-layout">
          <div className="luganda-word-card">
            <span className="luganda-status"><i /> Available at launch</span>
            <p className="luganda-word">Oli otya?</p>
            <p className="luganda-meaning">How are you?</p>
            <div className="luganda-soundline" aria-hidden="true">
              <i /><i /><i /><i /><i /><i /><i /><i /><i />
            </div>
            <small>Listen · Repeat · Remember</small>
          </div>

          <div className="luganda-focus-copy">
            <span className="section-label">Luganda first</span>
            <h2 className="section-title">One language, built with real care.</h2>
            <p className="section-subtitle">
              Baby Steps begins with Luganda so we can make the first learning path warm, useful,
              and genuinely delightful before we expand. We would rather build one language well
              than rush many languages at once.
            </p>
            <div className="luganda-details">
              <span><strong>For ages 3–12</strong>Age-aware learning moments</span>
              <span><strong>Rooted in daily life</strong>Words children can use at home</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section language-moments-section">
        <div className="section-inner">
          <div className="section-heading split-heading">
            <div><span className="section-label">The Luganda path</span><h2 className="section-title">From hearing a word to owning it.</h2></div>
            <p className="section-subtitle">Each little loop builds familiarity without turning a child’s home language into homework.</p>
          </div>
          <div className="language-moments-grid">
            {learningMoments.map((moment) => (
              <article key={moment.title}><span>{moment.number}</span><h3>{moment.title}</h3><p>{moment.detail}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section language-future-section">
        <div className="section-inner language-future-card">
          <div className="language-future-copy">
            <span className="section-label section-label-light">The wider vision</span>
            <h2>Luganda is the beginning—not the boundary.</h2>
            <p>
              Over time, we aim to welcome more Ugandan languages into Baby Steps. Every new path
              will need community insight, careful language work, and the same joyful standard.
            </p>
          </div>
          <div className="language-roadmap" aria-label="Language rollout direction">
            <div className="language-roadmap-step active"><span>Now</span><strong>Luganda</strong><small>Our launch language</small></div>
            <div className="language-roadmap-line" aria-hidden="true" />
            <div className="language-roadmap-step"><span>Next</span><strong>Listen & learn</strong><small>Work with communities</small></div>
            <div className="language-roadmap-line" aria-hidden="true" />
            <div className="language-roadmap-step"><span>Future</span><strong>Grow carefully</strong><small>More languages over time</small></div>
          </div>
        </div>
      </section>
    </>
  );
}
