import Link from "next/link";

const familyPlans = [
  { name: "Free", price: "UGX 0", period: "forever", description: "A gentle first step for one learner.", features: ["1 child profile", "Free learning units", "Weekly progress snapshot"] },
  { name: "Basic", price: "UGX 10,000", period: "per month", description: "More practice for a growing family rhythm.", features: ["Up to 3 child profiles", "Free + Basic learning units", "Parent tips and progress tracking"], featured: true },
  { name: "Premium", price: "UGX 25,000", period: "per month", description: "The complete journey, with deeper insight.", features: ["Unlimited child profiles", "All available learning units", "Achievements and detailed insights"] },
];

export function PricingSection() {
  return (
    <section className="section pricing-section" id="pricing">
      <div className="section-inner">
        <div className="pricing-note"><span>Early explorer perk</span><p>Join the waitlist now and receive a 2-month Premium trial at launch.</p></div>
        <div className="section-heading centered compact-heading"><span className="section-label">Family plans</span><h2 className="section-title">Start where you are.</h2><p className="section-subtitle">No complicated bundles. Choose the pace and access that fit your household.</p></div>
        <div className="pricing-grid">
          {familyPlans.map((plan) => (
            <article className={`plan-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
              {plan.featured ? <span className="plan-badge">Family favourite</span> : <span className="plan-index">Baby Steps</span>}
              <h3>{plan.name}</h3><p className="plan-description">{plan.description}</p>
              <div className="plan-price"><strong>{plan.price}</strong><span>{plan.period}</span></div>
              <ul>{plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
              <Link href="/waitlist">Choose {plan.name} <span>→</span></Link>
            </article>
          ))}
        </div>

        <div className="school-pricing-panel">
          <div><span className="section-label section-label-light">For schools & networks</span><h3>Need more than a family plan?</h3><p>We shape term-based licensing around your classes, campuses, onboarding, and support needs.</p></div>
          <a className="btn-gold" href="mailto:hello@babystepslearn.com?subject=Baby%20Steps%20school%20pricing">Build a school plan →</a>
        </div>
      </div>
    </section>
  );
}
