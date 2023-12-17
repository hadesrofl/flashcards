import FlashCardCreateForm from "@components/forms/FlashCardCreateForm";
import dbContext from "@server/repositories/dbContext";

export default async function FlashCardCreatePage() {
  const tags = await dbContext.tags.list();
  return <FlashCardCreateForm tagOptions={tags} />;
}
