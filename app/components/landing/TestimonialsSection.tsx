const testimonials = [
  {
    quote:
      "My daughter now sings Luganda songs she learned from Baby Steps. For the first time, she is excited to speak our language at home.",
    initials: "NK",
    name: "Namukasa K.",
    role: "Parent, Kampala"
  },
  {
    quote:
      "Finally an app that connects to our curriculum and our culture. My P1 class loves the games, and I love how easy it is to assign and track lessons.",
    initials: "MT",
    name: "Mr. Tumusiime",
    role: "Primary 1 Teacher, Mbarara"
  },
  {
    quote:
      "I was worried screen time would not be educational. Baby Steps changed that. It is structured, safe, and my son actually learns in our own language!",
    initials: "AO",
    name: "Akello O.",
    role: "Parent, Gulu"
  },
];

export function TestimonialsSection() {
  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="section-inner">
        <div className="section-heading centered">
          <span className="section-label">Community Love</span>
          <h2 className="section-title">What parents &amp; teachers are saying</h2>
          <p className="section-subtitle">Real voices from Ugandan families and schools.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <div className="author-avatar" aria-hidden="true">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
