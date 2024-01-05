import TagParamProps from "@app/flashcards/_shared/props/TagParamProps";
import FlashCardGallery from "@components/flashcard/FlashCardGallery";
import NoFlashCardDialog from "@components/flashcard/dialogs/NoFlashCardDialog";
import dbContext from "@server/repositories/dbContext";
import flashCardsByTagsQuery from "@server/repositories/queries/flashcards/flashCardsByTags";

export default async function FlashCardGalleryPage({ params }: TagParamProps) {
  const { tags } = params;
  const query = flashCardsByTagsQuery(tags);
  const flashCards = await dbContext.flashCards.list(query);

  return flashCards.length > 0 ? (
    <FlashCardGallery flashCards={flashCards} className="justify-evenly" />
  ) : (
    <NoFlashCardDialog />
  );
}
