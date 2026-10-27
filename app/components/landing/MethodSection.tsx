const steps = ["Create a child profile", "Choose an activity", "Practise Luganda", "Review their progress"];

export function MethodSection() {
  return (
    <section className="section how-section" id="how-it-works">
      <div className="section-inner">
        <div className="section-heading"><h2 className="section-title">How it works</h2></div>
        <ol className="steps-path">
          {steps.map((step, index) => (
            <li className="step" key={step}><span className="step-num" aria-hidden="true">0{index + 1}</span><h3 className="step-title">{step}</h3></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
