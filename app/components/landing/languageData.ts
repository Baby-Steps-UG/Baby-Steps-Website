export type QuizLanguage =
  | "Luganda"
  | "Runyankole"
  | "Acholi"
  | "Lusoga"
  | "Ateso"
  | "Rutooro"
  | "Lugbara";

export interface LanguageProfile {
  name: QuizLanguage;
  region: string;
  focus: string;
}

export interface LanguageQuestion {
  prompt: string;
  options: string[];
  answer: string;
}

export const languageProfiles: LanguageProfile[] = [
  {
    name: "Luganda",
    region: "Central Uganda",
    focus: "Greetings, family words, market vocabulary, and everyday storytelling.",
  },
  {
    name: "Runyankole",
    region: "Western Uganda",
    focus: "Daily conversation, home routines, and listening activities with local context.",
  },
  {
    name: "Acholi",
    region: "Northern Uganda",
    focus: "Foundational vocabulary, familiar phrases, and confidence-building speaking moments.",
  },
  {
    name: "Lusoga",
    region: "Eastern Uganda",
    focus: "Early reading support through simple words, sounds, and sentence patterns.",
  },
  {
    name: "Ateso",
    region: "North-Eastern Uganda",
    focus: "Practical language use through playful listening and matching challenges.",
  },
  {
    name: "Rutooro",
    region: "Western Uganda",
    focus: "Home and community language themes designed for joyful repetition.",
  },
  {
    name: "Lugbara",
    region: "West Nile",
    focus: "Child-friendly vocabulary and comprehension activities rooted in daily life.",
  },
];

export const languageQuizzes: Record<QuizLanguage, LanguageQuestion[]> = {
  Luganda: [
    {
      prompt: "What does 'Oli otya?' mean?",
      options: ["How are you?", "Where are you going?", "What is your name?"],
      answer: "How are you?",
    },
    {
      prompt: "What is 'mother' in Luganda?",
      options: ["Maama", "Taata", "Mwana"],
      answer: "Maama",
    },
    {
      prompt: "What does 'Webale' mean?",
      options: ["Sorry", "Thank you", "Goodbye"],
      answer: "Thank you",
    },
  ],

  Runyankole: [
    {
      prompt: "What does 'Agandi?' mean?",
      options: ["How are you?", "Where are you?", "What are you doing?"],
      answer: "How are you?",
    },
    {
      prompt: "What is 'father' in Runyankole?",
      options: ["Taata", "Maama", "Mwana"],
      answer: "Taata",
    },
    {
      prompt: "What does 'Webare' mean?",
      options: ["Please", "Thank you", "Come here"],
      answer: "Thank you",
    },
  ],

  Acholi: [
    {
      prompt: "What does 'Itye nining?' mean?",
      options: ["How are you?", "Where do you live?", "What is your name?"],
      answer: "How are you?",
    },
    {
      prompt: "What is 'child' in Acholi?",
      options: ["Lacoo", "Dano", "Ot"],
      answer: "Lacoo",
    },
    {
      prompt: "What does 'Apwoyo' mean?",
      options: ["Thank you", "Sorry", "Welcome"],
      answer: "Thank you",
    },
  ],

  Lusoga: [
    {
      prompt: "What does 'Oli otya?' mean in Lusoga?",
      options: ["How are you?", "What is this?", "Where are you going?"],
      answer: "How are you?",
    },
    {
      prompt: "What is 'food' in Lusoga?",
      options: ["Emmere", "Amazzi", "Ennyumba"],
      answer: "Emmere",
    },
    {
      prompt: "What does 'Webale' mean?",
      options: ["Thank you", "Come here", "Sit down"],
      answer: "Thank you",
    },
  ],

  Ateso: [
    {
      prompt: "What does 'Ejok noi' mean?",
      options: ["Very good", "Come here", "Go away"],
      answer: "Very good",
    },
    {
      prompt: "What is 'water' in Ateso?",
      options: ["Amai", "Edeke", "Akine"],
      answer: "Amai",
    },
    {
      prompt: "What does 'Kopong' mean?",
      options: ["Thank you", "Hello", "Good night"],
      answer: "Thank you",
    },
  ],

  Rutooro: [
    {
      prompt: "What does 'Oraire ota?' mean?",
      options: ["How did you sleep?", "Where are you?", "What is your name?"],
      answer: "How did you sleep?",
    },
    {
      prompt: "What is 'house' in Rutooro?",
      options: ["Enju", "Amaizi", "Omwana"],
      answer: "Enju",
    },
    {
      prompt: "What does 'Webale muno' mean?",
      options: ["Thank you very much", "Goodbye", "Come here"],
      answer: "Thank you very much",
    },
  ],

  Lugbara: [
    {
      prompt: "What does 'M’inga?' mean?",
      options: ["How are you?", "Where are you going?", "What is this?"],
      answer: "How are you?",
    },
    {
      prompt: "What is 'person' in Lugbara?",
      options: ["Dri", "Ayi", "Opi"],
      answer: "Dri",
    },
    {
      prompt: "What does 'Ayi' mean?",
      options: ["Yes", "No", "Come here"],
      answer: "Yes",
    },
  ],
};
