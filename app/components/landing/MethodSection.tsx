const steps = [
  {
    title: "Choose Your Plan",
    description:
      "Pick Free, Basic, or Premium based on your family's learning goals and support needs.",
  },
  {
    title: "Pick Your Language",
    description: "Choose from Luganda, Runyankole, Acholi, and more Ugandan mother tongues.",
  },
  {
    title: "Play & Learn",
    description:
      "Shana the mascot guides children through games, songs, and stories that feel like home.",
  },
  {
    title: "Grow Together",
    description:
      "Parents and teachers track progress with simple, actionable insights from the dashboard.",
  },
];

export function MethodSection() {
  return (
    <section className="section how-section" id="how-it-works">
      <div className="section-inner">
        <div className="section-heading centered">
          <span className="section-label">How It Works</span>
          <h2 className="section-title">
            One. Two. <span className="accent-orange">Step.</span>
          </h2>
          <p className="section-subtitle">
            Simple enough for a 3-year-old and rich enough to keep 12-year-olds learning with
            confidence.
          </p>
        </div>

        <div className="steps-row">
          {steps.map((step, index) => (
            <article className="step" key={step.title}>
              <div className="step-num">{index + 1}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
