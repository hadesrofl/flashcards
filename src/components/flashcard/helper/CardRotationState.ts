import { FlashCardWithTags } from "@domain/flashcard/models/flashcard";

export default interface CardRotationState {
  previousCard: FlashCardWithTags | undefined;
  currentCard: FlashCardWithTags | undefined;
  nextCard: FlashCardWithTags | undefined;
}
