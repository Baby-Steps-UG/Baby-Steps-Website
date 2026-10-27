import Link from "next/link";

export function PricingSection() {
  return (
    <section className="section pricing-coming-section" id="pricing">
      <div className="section-inner pricing-coming-hero">
        <div className="pricing-coming-copy">
          <h2>Prices announced before launch</h2>
          <p>Plans and features are still being finalised. Waitlist members receive a 2-month Premium trial at launch.</p>
          <Link className="btn-gold" href="/waitlist">Join the waitlist <span aria-hidden="true">→</span></Link>
        </div>
        <div className="pricing-calculator" aria-hidden="true">
          <div className="pricing-calculator-screen"><strong>— — —</strong></div>
          <div className="pricing-calculator-keys"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        </div>
      </div>
    </section>
  );
}
