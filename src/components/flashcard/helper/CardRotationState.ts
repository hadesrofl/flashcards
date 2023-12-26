import { FlashCardWithTags } from "@customTypes/models/flashcard";

export default interface CardRotationState {
  previousCard: FlashCardWithTags | undefined;
  currentCard: FlashCardWithTags | undefined;
  nextCard: FlashCardWithTags | undefined;
}
