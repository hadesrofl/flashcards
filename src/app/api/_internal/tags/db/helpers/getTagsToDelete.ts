import { FlashCardWithTags } from "@domain/flashcard/models/flashcard";

export default function getTagsToDelete(
  oldFlashCardEntry: FlashCardWithTags,
  newFlashCardEntry: FlashCardWithTags
) {
  return oldFlashCardEntry?.tags.filter((oldTag) => {
    let keep = false;
    newFlashCardEntry.tags.forEach((newTag) => {
      if (newTag.name === oldTag.name) {
        keep = true;
      }
    });
    return keep ? undefined : { id: oldTag.id };
  });
}
