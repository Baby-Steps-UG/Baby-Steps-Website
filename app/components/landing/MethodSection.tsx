const steps = [
  {
    kicker: "Start",
    title: "Choose a path",
    description: "Create a child profile and begin with Luganda—the first language path in Baby Steps.",
  },
  {
    kicker: "Explore",
    title: "Play a little",
    description: "A story, word game, song, or counting adventure turns practice into discovery.",
  },
  {
    kicker: "Celebrate",
    title: "Notice the win",
    description: "Shana celebrates effort and gives children the courage to try the next small step.",
  },
  {
    kicker: "Grow",
    title: "Keep it going",
    description: "Parents and teachers see clear progress and know exactly what to encourage next.",
  },
];

export function MethodSection() {
  return (
    <section className="section how-section" id="how-it-works">
      <div className="section-inner">
        <div className="section-heading centered compact-heading">
          <span className="section-label">How It Works</span>
          <h2 className="section-title">One. Two. <span className="accent-orange">Step!</span></h2>
          <p className="section-subtitle">
            A gentle rhythm children understand and grown-ups can trust.
          </p>
        </div>

        <div className="steps-path">
          {steps.map((step, index) => (
            <article className="step" key={step.title}>
              <div className="step-num">0{index + 1}</div>
              <p className="step-kicker">{step.kicker}</p>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
