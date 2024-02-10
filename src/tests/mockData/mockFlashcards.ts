import { FlashCardWithTags } from "@domain/flashcard/models/flashcard";
import { mockTags } from "./mockTags";

export const mockFlashcards: FlashCardWithTags[] = [
  {
    id: 1,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    question: "Question",
    questionText: "What's the question again?",
    answer: "I don't know",
    tags: mockTags,
  },
  {
    id: 2,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    question: "Who is Batman",
    questionText:
      "He is vengeance and feared by bad guys, but he got an identity without mask. Which is it?",
    answer: "Clark Kent",
    tags: [mockTags[0]],
  },
];
