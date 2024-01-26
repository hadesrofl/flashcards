import flashCardsByTagsQuery from "@app/api/_internal/flashcards/db/queries/flashCardsByTags";
import dbContext from "@app/api/_internal/shared/db/dbContext";
import TagParamProps from "@app/[lang]/flashcards/_shared/props/TagParamProps";
import FlashCardGallery from "@components/flashcard/FlashCardGallery";
import NoFlashCardDialog from "@components/flashcard/dialogs/NoFlashCardDialog";

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
