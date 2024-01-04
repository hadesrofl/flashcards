import FlashCardForm from "@components/flashcard/forms/FlashCardForm";
import dbContext from "@server/repositories/dbContext";

export default async function FlashCardCreatePage() {
  const tags = await dbContext.tags.list();
  return <FlashCardForm tagOptions={tags} />;
}
