import IdParamProps from "@app/flashcards/_shared/props/IdParamProps";
import FlashCardForm from "@components/flashcard/forms/FlashCardForm";
import dbContext from "@server/repositories/dbContext";

export default async function FlashCardEditPage({ params }: IdParamProps) {
  const flashCard = await dbContext.flashCards.getById(
    Number.parseInt(params.id)
  );
  const tags = await dbContext.tags.list();
  return <FlashCardForm tagOptions={tags} flashCard={flashCard} />;
}
