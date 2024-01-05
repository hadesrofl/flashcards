import { FlashCardWithTags } from "../models/flashcard";

export default function shuffleCards(flashCards: FlashCardWithTags[]) {
  return flashCards
    .map((flashCard) => ({ sort: Math.random(), value: flashCard }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}
