import Image from "next/image";

type Orientation = "portrait" | "landscape";

interface AppScreenshot {
  src: string;
  title: string;
  orientation: Orientation;
  width: number;
  height: number;
  featured?: boolean;
}

function makeScreenshot(filename: string, title: string, featured = false): AppScreenshot {
  const orientation: Orientation = filename.startsWith("portrait_") ? "portrait" : "landscape";

  return {
    src: `/app_screenshots/${filename}`,
    title,
    orientation,
    width: orientation === "portrait" ? 1080 : 2280,
    height: orientation === "portrait" ? 2326 : 1012,
    featured,
  };
}

const gameScreenshots = [
  makeScreenshot("landscape_quiz_game_intro.png", "Quiz Game Intro", true),
  makeScreenshot("landscape_quiz_game_opened.png", "Quiz Game In Progress"),
  makeScreenshot("landscape_word_game_intro.png", "Word Game Intro"),
  makeScreenshot("landscape_word_game_opened.png", "Word Game In Progress"),
  makeScreenshot("landscape_story_opened.png", "Story View"),
  makeScreenshot("landscape_counting_game_opened.png", "Counting Game"),
  makeScreenshot("landscape_game_interface.png", "Main Game Interface"),
];

const parentScreenshots = [
  makeScreenshot("portrait_parent_dashbooard.png", "Parent Dashboard"),
  makeScreenshot("portrait_child_profiles.png", "Child Profiles"),
  makeScreenshot("portrait_child_profile.png", "Child Profile"),
  makeScreenshot("portrait_setting_english.png", "Settings: English"),
  makeScreenshot("portrait_settings_luganda.png", "Settings: Luganda"),
];

const featuredGameScreenshot = gameScreenshots.find((shot) => shot.featured) ?? gameScreenshots[0];
const gameGalleryScreenshots = gameScreenshots.filter((shot) => shot.src !== featuredGameScreenshot.src);

export function FeaturesSection() {
  return (
    <section className="section inside-app-section" id="features">
      <div className="section-inner inside-app-inner">
        <div className="section-heading centered inside-app-typestack">
          <span className="section-label">Inside Baby Steps</span>
          <h2 className="section-title centered">Play-first learning for ages 3-12</h2>
          <p className="section-subtitle centered">
            Children can jump into quizzes, word games, stories, and counting adventures designed
            to feel playful at every stage.
          </p>
        </div>

        <div className="inside-app-games" aria-label="Game screens inside Baby Steps">
          <figure className={`inside-app-featured ${featuredGameScreenshot.orientation}`}>
            <div className={`inside-app-shot-media ${featuredGameScreenshot.orientation}`}>
              <Image
                src={featuredGameScreenshot.src}
                alt={`Baby Steps game screenshot: ${featuredGameScreenshot.title}`}
                className="inside-app-shot-image"
                width={featuredGameScreenshot.width}
                height={featuredGameScreenshot.height}
                unoptimized
              />
            </div>
            <figcaption className="inside-app-shot-caption">{featuredGameScreenshot.title}</figcaption>
          </figure>

          <div className="inside-app-gallery inside-app-gallery-games" aria-label="App game gallery">
            {gameGalleryScreenshots.map((shot) => (
              <figure className={`inside-app-shot-card ${shot.orientation}`} key={shot.src}>
                <div className={`inside-app-shot-media ${shot.orientation}`}>
                  <Image
                    src={shot.src}
                    alt={`Baby Steps game screenshot: ${shot.title}`}
                    className="inside-app-shot-image"
                    width={shot.width}
                    height={shot.height}
                    unoptimized
                  />
                </div>
                <figcaption className="inside-app-shot-caption">{shot.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="inside-app-parents-block">
          <div className="inside-app-parents-copy">
            <h3 className="inside-app-parents-title">Parent View</h3>
            <p className="inside-app-parents-subtitle">
              Portrait screens make it easy for parents to manage profiles, adjust settings, and
              guide each child.
            </p>
          </div>

          <div
            className="inside-app-gallery inside-app-gallery-parents"
            aria-label="Parents portrait screens"
          >
            {parentScreenshots.map((shot) => (
              <figure className={`inside-app-shot-card ${shot.orientation}`} key={shot.src}>
                <div className={`inside-app-shot-media ${shot.orientation}`}>
                  <Image
                    src={shot.src}
                    alt={`Baby Steps parent screenshot: ${shot.title}`}
                    className="inside-app-shot-image"
                    width={shot.width}
                    height={shot.height}
                    unoptimized
                  />
                </div>
                <figcaption className="inside-app-shot-caption">{shot.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
