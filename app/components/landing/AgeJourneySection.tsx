import Image from "next/image";

const valueProps = [
  {
    title: "Built for ages 3-12",
    description:
      "Children build strong literacy, language, and numeracy foundations through playful activities designed for Ugandan learners from age 3 to 12.",
    image: "/values/built_for_learners.png",
    alt: "Built for ages 3-12 value illustration.",
  },
  {
    title: "Joyful and engaging",
    description:
      "Guided by friendly characters, children explore stories, songs, and mini-games that make learning feel exciting and familiar.",
    image: "/values/joyful.png",
    alt: "Joyful and engaging value illustration.",
  },
  {
    title: "Flexible for every family",
    description:
      "Choose the plan that fits your household. Start simple, then unlock more language paths and advanced progress insights as your child grows.",
    image: "/values/flexible_plans.png",
    alt: "Flexible plans for every family value illustration.",
  },
  {
    title: "Developed with educators",
    description:
      "Our curriculum is co-designed with teachers and early-years specialists to balance academic growth, confidence, and playful exploration.",
    image: "/1x/Pattern%2003.png",
    alt: "Baby Steps educational themed visual pattern.",
  },
  {
    title: "Classroom-ready features",
    description:
      "Assign lessons, track learner progress, and support different levels in one class with tools made for real Ugandan school environments.",
    image: "/1x/Pattern%2004.png",
    alt: "Baby Steps school-focused patterned visual.",
  },
];

const highlightedValueProps = valueProps.slice(0, 3);
const supportingValueProps = valueProps.slice(3);

export function AgeJourneySection() {
  return (
    <section className="section value-prop-section" id="about">
      <div className="section-inner">
        <div className="section-heading centered value-prop-intro">
          <span className="section-label">Our Values</span>
          <h2 className="section-title centered">
            A learning app that <span className="accent-blue">grows from age 3 to 12</span>
          </h2>
          <p className="section-subtitle centered">
            Baby Steps supports the whole child with age-appropriate experiences that blend
            academic skill-building, social-emotional growth, and creative play.
          </p>
        </div>

        <div className="value-prop-content" id="values">
          <div className="value-prop-grid">
            {highlightedValueProps.map((value, index) => (
              <div
                className={`value-prop-row ${index % 2 === 1 ? "is-reversed" : ""}`}
                key={value.title}
              >
                <article className="value-prop-typestack">
                  <h3 className="value-prop-title">{value.title}</h3>
                  <p className="value-prop-description">{value.description}</p>
                </article>

                <div className="value-prop-image-block">
                  <Image
                    className="value-prop-image"
                    src={value.image}
                    alt={value.alt}
                    width={1024}
                    height={1024}
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="value-prop-extra-grid" aria-label="Additional Baby Steps values">
            {supportingValueProps.map((value) => (
              <article className="value-prop-typestack" key={value.title}>
                <h3 className="value-prop-title">{value.title}</h3>
                <p className="value-prop-description">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
