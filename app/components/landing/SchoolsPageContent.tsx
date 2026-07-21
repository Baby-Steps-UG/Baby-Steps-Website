import Image from "next/image";

const schoolBenefits = [
  { marker: "01", title: "Ready for the first lesson", detail: "Guided activities help teachers begin without a heavy setup or a new technical burden." },
  { marker: "02", title: "Local from the first word", detail: "Children engage faster when examples, voices, and stories reflect the world they know." },
  { marker: "03", title: "Flexible across a real classroom", detail: "Age-aware pacing makes room for mixed confidence and ability levels." },
];

const rolloutSteps = [
  { title: "Plan", detail: "Agree on goals, classes, devices, and priority languages." },
  { title: "Prepare", detail: "Give teachers practical, focused onboarding." },
  { title: "Launch", detail: "Begin with short sessions that build confidence." },
  { title: "Grow", detail: "Review progress and strengthen the termly rhythm." },
];

const licensingOptions = [
  { title: "Starter", scope: "One campus", detail: "A confident first rollout with a focused teaching team.", includes: ["Teacher onboarding", "Core classroom dashboard", "Termly check-ins"] },
  { title: "Whole School", scope: "Multiple classes", detail: "Shared planning and clearer coordination across your school.", includes: ["Multi-class insights", "Shared content planning", "School lead support"] },
  { title: "Network", scope: "Multiple campuses", detail: "Aligned implementation for a district or school network.", includes: ["Central rollout roadmap", "Network-level reporting", "Priority support"] },
];

export function SchoolsPageContent() {
  return (
    <>
      <section className="section school-benefit-section">
        <div className="section-inner">
          <div className="section-heading centered compact-heading"><span className="section-label">Built for the classroom</span><h2 className="section-title">Serious learning. <span className="accent-orange">Joyful energy.</span></h2><p className="section-subtitle">A culturally familiar learning layer for the routines teachers already lead.</p></div>
          <div className="school-benefit-grid">
            {schoolBenefits.map((benefit) => <article key={benefit.title}><span>{benefit.marker}</span><h3>{benefit.title}</h3><p>{benefit.detail}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section classroom-section">
        <div className="section-inner classroom-layout">
          <div className="classroom-copy"><span className="section-label section-label-light">In the lesson</span><h2>One screen. Many brave answers.</h2><p>Use Baby Steps as a short warm-up, a guided group activity, or a focused learning station. The interface stays clear so the language can stay central.</p><a href="mailto:hello@babystepslearn.com?subject=Baby%20Steps%20for%20our%20school" className="btn-gold">Talk to our schools team →</a></div>
          <div className="classroom-screen"><Image src="/app_screenshots/landscape_game_interface.png" alt="Baby Steps game interface for a classroom activity" width={2280} height={1012} unoptimized /><span>Teacher-friendly. Learner-ready.</span></div>
        </div>
      </section>

      <section className="section rollout-section">
        <div className="section-inner">
          <div className="section-heading split-heading"><div><span className="section-label">A calm rollout</span><h2 className="section-title">From plan to classroom rhythm.</h2></div><p className="section-subtitle">We work alongside your team so launch day is only the beginning.</p></div>
          <div className="rollout-track">
            {rolloutSteps.map((step, index) => <article key={step.title}><span>{index + 1}</span><h3>{step.title}</h3><p>{step.detail}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section school-licensing-section" id="school-licensing">
        <div className="section-inner">
          <div className="section-heading centered compact-heading"><span className="section-label">School licensing</span><h2 className="section-title">Choose the scale. We’ll shape the support.</h2><p className="section-subtitle">Flexible models for a single campus, a whole school, or a growing network.</p></div>
          <div className="school-licensing-grid">
            {licensingOptions.map((option, index) => (
              <article className={index === 1 ? "featured" : ""} key={option.title}>
                <p className="school-licensing-scope">{option.scope}</p><h3>{option.title}</h3><p>{option.detail}</p>
                <ul>{option.includes.map((item) => <li key={item}>✓ {item}</li>)}</ul>
                <a href="mailto:hello@babystepslearn.com?subject=Baby%20Steps%20school%20licensing">Let’s talk <span>→</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
