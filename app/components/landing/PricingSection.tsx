const familyPlans = [
  {
    name: "Free",
    price: "UGX 0",
    period: "always",
    description: "Perfect for first steps in one language path.",
    features: ["1 child profile", "Core literacy games", "Weekly progress summary"],
  },
  {
    name: "Basic",
    price: "UGX 5,000",
    period: "per month",
    description: "For families who want deeper practice at home.",
    features: ["Up to 3 child profiles", "Offline lesson packs", "Parent tips and nudges"],
    featured: true,
  },
  {
    name: "Premium",
    price: "UGX 20,000",
    period: "per month",
    description: "Full experience with advanced personalization.",
    features: [
      "Up to 6 child profiles",
      "All language paths",
      "Detailed skill-level analytics",
    ],
  },
];

const schoolLicenses = [
  {
    tier: "Starter School License",
    range: "Single school launch",
    fit: "Guided rollout for one campus.",
    details: "Teacher dashboard, assignment tools, and onboarding support.",
  },
  {
    tier: "Growth School License",
    range: "Multi-class adoption",
    fit: "Best for broader classroom coverage.",
    details: "Shared content library, reporting views, and school admin controls.",
  },
  {
    tier: "District / Network License",
    range: "District or network rollout",
    fit: "Coordinated implementation across multiple schools.",
    details: "Centralized deployment planning, priority support, and governance tools.",
  },
];

export function PricingSection() {
  return (
    <section className="section pricing-section" id="pricing">
      <div className="section-inner">
        <div className="section-heading centered">
          <span className="section-label">Pricing</span>
          <h2 className="section-title centered">Simple plans for families and schools</h2>
          <p className="section-subtitle centered">
            Start small, scale as your child grows, and unlock school licensing for whole
            classrooms.
          </p>
        </div>

        <div className="pricing-grid">
          {familyPlans.map((plan) => (
            <article className={`plan-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
              {plan.featured ? <span className="plan-badge">Most Popular</span> : null}
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-price">{plan.price}</p>
              <p className="plan-period">{plan.period}</p>
              <p className="plan-description">{plan.description}</p>
              <ul className="plan-features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a className="plan-cta" href="#download">
                Choose {plan.name}
              </a>
            </article>
          ))}
        </div>

        <div className="school-license-panel" id="school-licensing">
          <div className="school-license-head">
            <h3 className="school-license-title">School Licensing</h3>
            <p className="school-license-copy">
              Running a school or network? We support term-based licensing with rollout support,
              teacher onboarding, and classroom analytics.
            </p>
          </div>

          <div className="school-license-grid">
            {schoolLicenses.map((license) => (
              <article className="school-license-card" key={license.tier}>
                <h4>{license.tier}</h4>
                <p className="school-license-range">{license.range}</p>
                <p className="school-license-fit">{license.fit}</p>
                <p className="school-license-details">{license.details}</p>
              </article>
            ))}
          </div>

          <a className="school-license-cta" href="#download">
            Talk to the Schools Team
          </a>
        </div>
      </div>
    </section>
  );
}
