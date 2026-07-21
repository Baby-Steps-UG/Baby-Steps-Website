"use client";

import { useEffect, useState } from "react";

import { languageQuizzes, type QuizLanguage } from "./languageData";

interface LanguageMiniGameProps {
  language: QuizLanguage;
}

export function LanguageMiniGame({ language }: LanguageMiniGameProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const questions = languageQuizzes[language];
  const isComplete = questionIndex >= questions.length;
  const currentQuestion = isComplete ? null : questions[questionIndex];

  useEffect(() => {
    setQuestionIndex(0);
    setScore(0);
    setSelected(null);
  }, [language]);

  const feedback = (() => {
    if (selected === null || currentQuestion === null) {
      return "";
    }

    return selected === currentQuestion.answer
      ? "Great job. That is correct."
      : `Good try. The correct answer is ${currentQuestion.answer}.`;
  })();

  const handleSelect = (option: string) => {
    if (selected !== null || currentQuestion === null) {
      return;
    }

    setSelected(option);

    if (option === currentQuestion.answer) {
      setScore((previous) => previous + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion === null) {
      return;
    }

    if (questionIndex === questions.length - 1) {
      setQuestionIndex(questions.length);
      return;
    }

    setQuestionIndex((previous) => previous + 1);
    setSelected(null);
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setScore(0);
    setSelected(null);
  };

  return (
    <section className="section language-game-section">
      <div className="section-inner">
        <div className="section-heading centered">
          <span className="section-label">Mini Game</span>
          <h2 className="section-title centered">Take a tiny Luganda step</h2>
          <p className="section-subtitle centered">
            Three quick questions. No pressure—just a playful taste of the journey.
          </p>
        </div>

        <div className="language-game-card" role="group" aria-label={`${language} mini game`}>
          <p className="language-game-current">Now playing: {language}</p>

          {isComplete ? (
            <div className="language-game-complete">
              <p className="language-game-score">
                You got {score} out of {questions.length} correct in {language}.
              </p>
              <button className="language-game-button" type="button" onClick={handleRestart}>
                Play Again
              </button>
            </div>
          ) : (
            <>
              <p className="language-game-progress">
                Question {questionIndex + 1} of {questions.length}
              </p>
              <p className="language-game-prompt">{currentQuestion?.prompt}</p>

              <div className="language-game-options">
                {currentQuestion?.options.map((option) => {
                  const isChosen = selected === option;
                  const isCorrect = option === currentQuestion?.answer;

                  return (
                    <button
                      key={option}
                      className={`language-game-option ${isChosen ? "selected" : ""} ${
                        selected !== null && isCorrect ? "correct" : ""
                      }`.trim()}
                      type="button"
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {selected !== null ? <p className="language-game-feedback">{feedback}</p> : null}

              <button
                className="language-game-button"
                type="button"
                onClick={handleNext}
                disabled={selected === null}
              >
                {questionIndex === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
