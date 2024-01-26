import dbContext from "@app/api/_internal/shared/db/dbContext";
import IdParamProps from "@app/[lang]/flashcards/_shared/props/IdParamProps";
import FlashCardForm from "@components/flashcard/forms/FlashCardForm";

export default async function FlashCardEditPage({ params }: IdParamProps) {
  const flashCard = await dbContext.flashCards.getById(
    Number.parseInt(params.id)
  );
  const tags = await dbContext.tags.list();
  return <FlashCardForm tagOptions={tags} flashCard={flashCard} />;
}
