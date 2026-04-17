const schoolBenefits = [
  {
    title: "Classroom-ready from day one",
    detail:
      "Teachers can start quickly with guided activities that match age groups and lesson flow without extra setup stress.",
  },
  {
    title: "Learning that feels local",
    detail:
      "Children engage faster when examples, stories, and sounds reflect Ugandan culture and everyday life.",
  },
  {
    title: "Confidence across ability levels",
    detail:
      "Mixed classrooms can move together with flexible pacing, so each learner grows while still feeling successful.",
  },
];

const rolloutSteps = [
  {
    title: "1. Planning with your school team",
    detail:
      "We agree on rollout goals, classes, and language priorities so implementation starts with clarity.",
  },
  {
    title: "2. Teacher onboarding",
    detail:
      "Teachers receive practical training focused on daily use, not technical complexity.",
  },
  {
    title: "3. Student launch",
    detail:
      "Learners begin with short, joyful sessions that build confidence before moving into deeper practice.",
  },
  {
    title: "4. Ongoing support",
    detail:
      "Your school gets check-ins and guidance so the program remains consistent term after term.",
  },
];

const licensingOptions = [
  {
    title: "School Starter License",
    scope: "Single campus rollout",
    detail:
      "A guided starting point for one school to launch confidently with a focused teaching team.",
    includes: [
      "Teacher onboarding sessions",
      "Core classroom dashboard",
      "Termly progress check-ins",
    ],
  },
  {
    title: "Multi-Class License",
    scope: "Whole-school adoption",
    detail:
      "Designed for schools running across several classes with shared planning and easier coordination.",
    includes: [
      "Shared content planning",
      "Multi-class learner insights",
      "School lead support tools",
    ],
  },
  {
    title: "Network License",
    scope: "District or school network",
    detail:
      "Best for networks that need aligned implementation across campuses with centralized support.",
    includes: [
      "Centralized rollout roadmap",
      "Network-level reporting",
      "Priority implementation support",
    ],
  },
];

export function SchoolsPageContent() {
  return (
    <>
      <section className="section themed-section">
        <div className="section-inner">
          <div className="section-heading centered">
            <span className="section-label">Why Schools Choose Baby Steps</span>
            <h2 className="section-title centered">Serious learning with a joyful feel</h2>
            <p className="section-subtitle centered">
              Baby Steps helps schools strengthen language foundations while keeping children engaged
              and proud of who they are.
            </p>
          </div>

          <div className="info-card-grid three-up">
            {schoolBenefits.map((benefit) => (
              <article className="info-card" key={benefit.title}>
                <h3 className="info-card-title">{benefit.title}</h3>
                <p className="info-card-copy">{benefit.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-heading centered">
            <span className="section-label">Rollout Journey</span>
            <h2 className="section-title centered">A simple path from planning to impact</h2>
            <p className="section-subtitle centered">
              We partner with your team from onboarding to consistent classroom use.
            </p>
          </div>

          <div className="info-card-grid two-up">
            {rolloutSteps.map((step) => (
              <article className="info-card" key={step.title}>
                <h3 className="info-card-title">{step.title}</h3>
                <p className="info-card-copy">{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section school-licensing-section" id="school-licensing">
        <div className="section-inner">
          <div className="section-heading centered">
            <span className="section-label">School Licensing Options</span>
            <h2 className="section-title centered">Flexible licensing models for school contexts</h2>
            <p className="section-subtitle centered">
              Choose the model that fits your rollout scope. We align the implementation and support
              plan to your school or network needs.
            </p>
          </div>

          <div className="school-licensing-grid">
            {licensingOptions.map((option) => (
              <article className="school-licensing-card" key={option.title}>
                <p className="school-licensing-scope">{option.scope}</p>
                <h3 className="school-licensing-title">{option.title}</h3>
                <p className="school-licensing-copy">{option.detail}</p>

                <ul className="school-licensing-includes">
                  {option.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <a className="btn-primary school-licensing-contact" href="#download">
            Talk to the Schools Team
          </a>
        </div>
      </section>
    </>
  );
}
