const coreValues = [
  {
    title: "Rooted",
    detail:
      "We build from Ugandan language, sound, story, and daily life so children learn in a world that feels familiar.",
  },
  {
    title: "Joyful",
    detail:
      "Learning is designed to feel like play. Every small step matters, and progress is celebrated with warmth.",
  },
  {
    title: "Safe",
    detail:
      "Children, parents, and schools use Baby Steps in a trusted space focused on confidence and calm exploration.",
  },
  {
    title: "Empowering",
    detail:
      "We treat every language as a strength. Children see their culture reflected back as something worth mastering.",
  },
  {
    title: "Credible",
    detail:
      "Our approach is playful on the surface and thoughtful underneath, built to earn long-term trust from families and schools.",
  },
];

const audienceFocus = [
  {
    title: "For children",
    detail:
      "A companion that encourages curiosity, speaking, listening, and early reading without fear of making mistakes.",
  },
  {
    title: "For parents",
    detail:
      "A practical way to protect language identity at home while supporting school-readiness in a joyful rhythm.",
  },
  {
    title: "For teachers",
    detail:
      "A classroom-friendly approach that supports foundational literacy and language confidence at scale.",
  },
];

export function AboutPageContent() {
  return (
    <>
      <section className="section story-section">
        <div className="section-inner narrow-copy">
          <span className="section-label">Our Story</span>
          <h2 className="section-title">Every great journey starts with small steps</h2>
          <p className="story-copy">
            Baby Steps began with a simple truth: every Ugandan child is born into a world rich with
            language, and that language deserves a place in learning. We believe a child&apos;s first
            language is more than vocabulary. It is identity, confidence, and belonging.
          </p>
          <p className="story-copy">
            That is why we design experiences that feel like home, from familiar stories and sounds
            to playful moments children can proudly share with family and teachers.
          </p>
        </div>
      </section>

      <section className="section themed-section">
        <div className="section-inner">
          <div className="section-heading centered">
            <span className="section-label">What Guides Us</span>
            <h2 className="section-title centered">Our values in action</h2>
          </div>

          <div className="info-card-grid three-up">
            {coreValues.map((value) => (
              <article className="info-card" key={value.title}>
                <h3 className="info-card-title">{value.title}</h3>
                <p className="info-card-copy">{value.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-heading centered">
            <span className="section-label">Who We Build For</span>
            <h2 className="section-title centered">Children, families, and schools together</h2>
          </div>

          <div className="info-card-grid three-up">
            {audienceFocus.map((item) => (
              <article className="info-card" key={item.title}>
                <h3 className="info-card-title">{item.title}</h3>
                <p className="info-card-copy">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
