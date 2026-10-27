const testimonials = [
  {
    quote:
      "My daughter now sings Luganda songs she learned from Baby Steps. She is excited to speak our language at home.",
    initials: "NK",
    name: "Namukasa K.",
    role: "Parent · Kampala",
    tone: "orange",
  },
  {
    quote:
      "The Luganda-first focus is thoughtful. Build that path well, then let schools help shape what comes next.",
    initials: "MT",
    name: "Mr. Tumusiime",
    role: "Educator perspective · Mbarara",
    tone: "blue",
  },
  {
    quote:
      "It is structured, safe, and my son actually learns in our own language. That gives me confidence too.",
    initials: "AO",
    name: "Akello O.",
    role: "Parent · Gulu",
    tone: "gold",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="section-inner">
        <div className="section-heading centered compact-heading">
          <h2 className="section-title">From parents & teachers</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <article className={`testimonial-card testimonial-${testimonial.tone}`} key={testimonial.name}>
              <span className="quote-mark" aria-hidden="true">“</span>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <div className="author-avatar" aria-hidden="true">{testimonial.initials}</div>
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
