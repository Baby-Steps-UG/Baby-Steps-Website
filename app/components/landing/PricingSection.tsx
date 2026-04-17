const familyPlans = [
  {
    name: "Free",
    price: "UGX 0",
    period: "forever",
    description: "A gentle start for one child learning at home.",
    features: [
      "1 child profile",
      "Access to Free learning units",
      "Parent-friendly weekly progress snapshots",
    ],
  },
  {
    name: "Basic",
    price: "UGX 10,000",
    period: "per month",
    description: "Great for families that want more consistency and practice.",
    features: [
      "Up to 3 child profiles",
      "Unlock Free + Basic learning units",
      "Parent tips, nudges, and stronger progress tracking",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: "UGX 25,000",
    period: "per month",
    description: "Full access for families who want the complete learning journey.",
    features: [
      "Unlimited child profiles",
      "Unlock all available learning units",
      "Detailed progress insights and achievement tracking",
    ],
  },
];

const schoolLicenses = [
  {
    tier: "Starter School License",
    range: "Single campus rollout",
    fit: "A strong first step for one school.",
    details: "Term-based setup, teacher onboarding, and classroom-ready support.",
  },
  {
    tier: "Growth School License",
    range: "Multi-class expansion",
    fit: "Best for schools scaling across more classes.",
    details: "Shared content access, school reporting, and admin-friendly controls.",
  },
  {
    tier: "District / Network License",
    range: "District or network rollout",
    fit: "Coordinated delivery across multiple schools.",
    details: "Central planning, team training, and priority implementation support.",
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
            Choose a home plan for your family or a school license for full classroom rollout.
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
              Running a school or network? We offer term-based licensing with guided onboarding,
              teacher support, and flexible payment options for institutions.
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
