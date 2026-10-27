"use client";

import { useEffect, useRef, useState } from "react";
import { languageQuizzes, type QuizLanguage } from "./languageData";
import { parseQuizProgress, readPreference, savePreference, type QuizProgress } from "../../lib/site-preferences";
import { useCookiePreferences } from "./CookiePreferences";

const initialProgress: QuizProgress = { version: 1, questionIndex: 0, score: 0, selected: null };

export function LanguageMiniGame({ language }: { language: QuizLanguage }) {
  const [progress, setProgress] = useState<QuizProgress>(initialProgress);
  const { ready } = useCookiePreferences();
  const restoredLanguage = useRef<string | null>(null);
  const promptRef = useRef<HTMLHeadingElement>(null);
  const questions = languageQuizzes[language];
  const { questionIndex, score, selected } = progress;
  const isComplete = questionIndex === questions.length;
  const currentQuestion = questions[questionIndex];

  useEffect(() => {
    if (!ready || restoredLanguage.current === language) return;
    setProgress(parseQuizProgress(readPreference("quiz"), questions) ?? initialProgress);
    restoredLanguage.current = language;
  }, [ready, language, questions]);

  const update = (next: QuizProgress, moveFocus = false) => {
    setProgress(next);
    savePreference("quiz", JSON.stringify(next));
    if (moveFocus) requestAnimationFrame(() => promptRef.current?.focus());
  };

  const handleSelect = (option: string) => {
    if (selected !== null || !currentQuestion) return;
    update({ ...progress, selected: option, score: score + (option === currentQuestion.answer ? 1 : 0) });
  };

  return (
    <section className="section language-game-section" id="luganda-quiz" aria-labelledby="quiz-heading">
      <div className="section-inner">
        <div className="section-heading centered"><h2 className="section-title" id="quiz-heading">Try the Luganda quiz</h2></div>
        <div className="language-game-card" role="group" aria-label={`${language} quiz`}>
          {isComplete ? (
            <div className="language-game-complete">
              <h3 className="language-game-score" ref={promptRef} tabIndex={-1}>{score} of {questions.length} correct</h3>
              <button className="language-game-button" type="button" onClick={() => update(initialProgress, true)}>Play again</button>
            </div>
          ) : (
            <>
              <p className="language-game-progress">Question {questionIndex + 1} of {questions.length}</p>
              <h3 className="language-game-prompt" ref={promptRef} tabIndex={-1}>{currentQuestion.prompt}</h3>
              <div className="language-game-options">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    className={`language-game-option ${selected === option ? "selected" : ""} ${selected !== null && option === currentQuestion.answer ? "correct" : ""}`.trim()}
                    type="button"
                    aria-pressed={selected === option}
                    disabled={!ready || selected !== null}
                    onClick={() => handleSelect(option)}
                  >{option}</button>
                ))}
              </div>
              <p className="language-game-feedback" role="status">
                {selected === null ? "" : selected === currentQuestion.answer ? "Correct!" : `The answer is ${currentQuestion.answer}.`}
              </p>
              <button
                className="language-game-button"
                type="button"
                onClick={() => update({ ...progress, questionIndex: questionIndex + 1, selected: null }, true)}
                disabled={selected === null}
              >{questionIndex === questions.length - 1 ? "Finish" : "Next"}</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
