export type QuizLanguage = "Luganda";

export interface LanguageQuestion {
  prompt: string;
  options: string[];
  answer: string;
}

export const languageQuizzes: Record<QuizLanguage, LanguageQuestion[]> = {
  Luganda: [
    {
      prompt: "What does ‘Oli otya?’ mean?",
      options: ["How are you?", "Where are you going?", "What is your name?"],
      answer: "How are you?",
    },
    {
      prompt: "What is ‘mother’ in Luganda?",
      options: ["Maama", "Taata", "Mwana"],
      answer: "Maama",
    },
    {
      prompt: "What does ‘Webale’ mean?",
      options: ["Sorry", "Thank you", "Goodbye"],
      answer: "Thank you",
    },
  ],
};
