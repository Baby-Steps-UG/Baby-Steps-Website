import Image from "next/image";
import Link from "next/link";

const playMoments = [
  {
    src: "/app_screenshots/landscape_story_opened.png",
    title: "Stories that sound familiar",
    detail: "Listen, follow along, and discover words in context.",
  },
  {
    src: "/app_screenshots/landscape_counting_game_opened.png",
    title: "Numbers made playful",
    detail: "Build early numeracy through bright, friendly challenges.",
  },
  {
    src: "/app_screenshots/landscape_word_game_opened.png",
    title: "Words worth remembering",
    detail: "Match, repeat, and celebrate the little wins.",
  },
];

const parentScreens = [
  {
    src: "/app_screenshots/portrait_parent_dashbooard.png",
    label: "A calm weekly overview",
  },
  {
    src: "/app_screenshots/portrait_child_profiles.png",
    label: "A path for every child",
  },
  {
    src: "/app_screenshots/portrait_child_profile.png",
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
              Quizzes, stories, word games, and number adventures turn daily practice into a place
              children want to return to.
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
              src="/app_screenshots/landscape_quiz_game_intro.png"
              alt="A quiz game introduction screen inside Baby Steps"
              width={2280}
              height={1012}
              unoptimized
            />
            <figcaption>Ready for a quick challenge?</figcaption>
          </figure>
        </div>

        <div className="play-moment-grid">
          {playMoments.map((moment, index) => (
            <figure className="play-moment-card" key={moment.title}>
              <div className="play-moment-image">
                <Image
                  src={moment.src}
                  alt={`Baby Steps app screen: ${moment.title}`}
                  width={2280}
                  height={1012}
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
                  height={2326}
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
