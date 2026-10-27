import Image from "next/image";
import Link from "next/link";

const playMoments = [
  {
    src: "/app_screenshots/portrait_stories.png",
    title: "Luganda stories",
  },
  {
    src: "/app_screenshots/landscape_word_game.png",
    title: "Word games",
  },
  {
    src: "/app_screenshots/landscape_quiz_game.png",
    title: "Vocabulary quizzes",
  },
  {
    src: "/app_screenshots/landscape_coloring_studio.png",
    title: "Colouring",
  },
];

const parentScreens = [
  {
    src: "/app_screenshots/portrait_parent_dashboard.png",
    label: "Weekly overview",
  },
  {
    src: "/app_screenshots/portrait_child_profiles.png",
    label: "Child profiles",
  },
  {
    src: "/app_screenshots/portrait_child_activities.png",
    label: "Activity history",
  },
  {
    src: "/app_screenshots/portrait_individual_child_profile.png",
    label: "Learning progress",
  },
];

export function FeaturesSection() {
  return (
    <section className="section inside-app-section" id="inside-baby-steps">
      <div className="section-inner inside-app-inner">
        <div className="section-heading split-heading inside-app-heading">
          <div>
            <h2 className="section-title">
              Explore the app
            </h2>
          </div>
        </div>

        <div className="app-feature-stage">
          <div className="app-feature-copy">
            <h3>The learning hub</h3>
          </div>

          <figure className="app-feature-screen">
            <div className="screen-topbar" aria-hidden="true"><i /><i /><i /><span>Baby Steps</span></div>
            <Image
              src="/app_screenshots/landscape_learning_hub.png"
              alt="The Baby Steps Luganda learning hub with greeting and family learning paths"
              width={2400}
              height={1080}
              unoptimized
            />
          </figure>
        </div>

        <div className="play-moment-grid">
          {playMoments.map((moment) => (
            <figure className="play-moment-card" key={moment.title}>
              <div className="play-moment-image">
                <Image
                  src={moment.src}
                  alt={`Baby Steps app screen: ${moment.title}`}
                  width={2400}
                  height={1080}
                  unoptimized
                />
              </div>
              <figcaption>
                <div><strong>{moment.title}</strong></div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="parent-gate-feature">
          <div className="parent-gate-copy">
            <h3>Parent-only access</h3>
          </div>
          <figure>
            <Image
              src="/app_screenshots/landscape_parent_gate.png"
              alt="Baby Steps parent gate asking a simple grown-up maths question"
              width={2400}
              height={1080}
              unoptimized
            />
          </figure>
        </div>

        <div className="parent-view-panel">
          <div className="parent-view-copy">
            <h3>Parent dashboard</h3>
            <Link href="/for-parents" className="inline-link">
              Explore parent features <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="parent-phone-row" aria-label="Baby Steps parent screens">
            {parentScreens.map((screen) => (
              <figure className="parent-phone" key={screen.src}>
                <div className="parent-phone-speaker" aria-hidden="true" />
                <Image
                  src={screen.src}
                  alt={`Baby Steps parent screen: ${screen.label}`}
                  width={1080}
                  height={2400}
                  unoptimized
                />
                <figcaption>{screen.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
