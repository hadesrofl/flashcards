import dbContext from "@app/api/_internal/shared/db/dbContext";
import FlashCardForm from "@components/flashcard/forms/FlashCardForm";

export default async function FlashCardCreatePage() {
  const tags = await dbContext.tags.list();
  return <FlashCardForm tagOptions={tags} />;
}
