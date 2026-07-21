import Link from "next/link";

const planDirections = [
  {
    number: "01",
    name: "A gentle start",
    description: "A simple way for a family to begin exploring Luganda learning.",
    ideas: ["Core learning moments", "One clear child journey", "A feel-good first step"],
  },
  {
    number: "02",
    name: "More room to grow",
    description: "For families who want a richer rhythm and more ways to keep progress moving.",
    ideas: ["A broader activity library", "Useful parent guidance", "More progress context"],
    featured: true,
  },
  {
    number: "03",
    name: "The full journey",
    description: "A complete family experience as Baby Steps grows in depth over time.",
    ideas: ["The widest learning access", "Deeper family insights", "New experiences as they arrive"],
  },
];

export function PricingSection() {
  return (
    <section className="section pricing-coming-section" id="pricing">
      <div className="section-inner">
        <div className="pricing-coming-hero">
          <div className="pricing-coming-copy">
            <span className="section-label section-label-light">Prices coming soon</span>
            <h2>We’re still doing the maths.</h2>
            <p>
              Baby Steps plans are being shaped around real family needs. We’ll publish clear
              prices before launch—after we’re confident each option offers honest value.
            </p>
            <Link className="btn-gold" href="/waitlist">Tell me when plans are ready <span aria-hidden="true">→</span></Link>
          </div>
          <div className="pricing-calculator" aria-hidden="true">
            <div className="pricing-calculator-screen"><small>Family-friendly</small><strong>— — —</strong><span>pricing in progress</span></div>
            <div className="pricing-calculator-keys"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
        </div>

        <div className="section-heading centered compact-heading pricing-shape-heading">
          <span className="section-label">What we’re shaping</span>
          <h2 className="section-title">Three ways to grow. Prices to follow.</h2>
          <p className="section-subtitle">These are product directions, not final packages. Features and plan names may change before launch.</p>
        </div>

        <div className="pricing-direction-grid">
          {planDirections.map((plan) => (
            <article className={plan.featured ? "featured" : ""} key={plan.name}>
              <div className="pricing-direction-top"><span>{plan.number}</span><small>Price announced before launch</small></div>
              <h3>{plan.name}</h3><p>{plan.description}</p>
              <ul>{plan.ideas.map((idea) => <li key={idea}>✦ {idea}</li>)}</ul>
              <div className="pricing-placeholder"><strong>Coming soon</strong><span>No price published yet</span></div>
            </article>
          ))}
        </div>

        <div className="pricing-principles">
          <div><span>01</span><strong>Easy to understand</strong><p>No confusing bundles or surprise fees.</p></div>
          <div><span>02</span><strong>Built around families</strong><p>Plans should reflect how children really learn at home.</p></div>
          <div><span>03</span><strong>Schools come later</strong><p>School pricing will follow the future classroom product—not precede it.</p></div>
        </div>
      </div>
    </section>
  );
}
