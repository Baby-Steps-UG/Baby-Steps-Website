import Image from "next/image";
import Link from "next/link";

const playMoments = [
  {
    src: "/app_screenshots/portrait_stories.png",
    title: "A Luganda story to follow",
    detail: "Listen, read, and meet familiar words in a simple story flow.",
  },
  {
    src: "/app_screenshots/landscape_word_game.png",
    title: "Build the word",
    detail: "Turn a familiar phrase into a hands-on spelling challenge.",
  },
  {
    src: "/app_screenshots/landscape_quiz_game.png",
    title: "See it. Hear it. Recall it.",
    detail: "Move between Luganda and English with audio support and gentle pacing.",
  },
  {
    src: "/app_screenshots/landscape_coloring_studio.png",
    title: "Create with the new word",
    detail: "Bring ‘Oli otya?’ into a playful colouring activity children can save and share.",
  },
];

const parentScreens = [
  {
    src: "/app_screenshots/portrait_parent_dashboard.png",
    label: "A calm weekly overview",
  },
  {
    src: "/app_screenshots/portrait_child_profiles.png",
    label: "Profiles for every child",
  },
  {
    src: "/app_screenshots/portrait_child_activities.png",
    label: "All activity in one place",
  },
  {
    src: "/app_screenshots/portrait_individual_child_profile.png",
    label: "Progress without pressure",
  },
];

export function FeaturesSection() {
  return (
    <section className="section inside-app-section" id="inside-baby-steps">
      <div className="section-inner inside-app-inner">
        <div className="section-heading split-heading inside-app-heading">
          <div>
            <span className="section-label section-label-light">Inside Baby Steps</span>
            <h2 className="section-title">
              Learning that looks like <span>play.</span>
            </h2>
          </div>
          <div className="inside-app-intro">
            <p>
              Every tap has a purpose. Children explore at their own pace while Shana keeps the
              experience warm, encouraging, and easy to understand.
            </p>
            <span className="real-screen-note"><i /> Real screens from the Baby Steps app</span>
          </div>
        </div>

        <div className="app-feature-stage">
          <div className="app-feature-copy">
            <span className="feature-count">01 / PLAY</span>
            <h3>A small world of big discoveries</h3>
            <p>
              The Luganda learning hub brings stories, word games, quizzes, and creative activities
              into one clear place children can navigate with confidence.
            </p>
            <ul>
              <li>Clear, child-friendly navigation</li>
              <li>Short activities with joyful feedback</li>
              <li>Familiar language and local context</li>
            </ul>
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
            <figcaption>One clear home for the Luganda learning journey</figcaption>
          </figure>
        </div>

        <div className="play-moment-grid">
          {playMoments.map((moment, index) => (
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
                <span>0{index + 2}</span>
                <div><strong>{moment.title}</strong><p>{moment.detail}</p></div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="parent-gate-feature">
          <div className="parent-gate-copy">
            <span className="feature-count">06 / SAFE BY DESIGN</span>
            <h3>Child mode stays for children.</h3>
            <p>
              A quick grown-up puzzle creates a thoughtful pause before leaving the child
              experience—keeping settings and family controls in the right hands.
            </p>
          </div>
          <figure>
            <Image
              src="/app_screenshots/landscape_parent_gate.png"
              alt="Baby Steps parent gate asking a simple grown-up maths question"
              width={2400}
              height={1080}
              unoptimized
            />
            <figcaption>Parent access is intentionally separate from child mode.</figcaption>
          </figure>
        </div>

        <div className="parent-view-panel">
          <div className="parent-view-copy">
            <span className="section-label">For grown-ups</span>
            <h3>Progress, without the guesswork.</h3>
            <p>
              A focused parent space makes profiles, activity, and next steps easy to understand—
              so encouragement can stay simple and specific.
            </p>
            <Link href="/for-parents" className="inline-link">
              Explore the parent experience <span aria-hidden="true">→</span>
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
