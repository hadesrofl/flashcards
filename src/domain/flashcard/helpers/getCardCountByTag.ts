import flashCardsByTagsQuery from "@app/api/_internal/flashcards/db/queries/flashCardsByTags";
import dbContext from "@app/api/_internal/shared/db/dbContext";
import { Tag } from "@prisma/client";

export async function getCardCountByTag(tags: Tag[]) {
  const cardCount: Map<string, number> = new Map();
  for (let i = 0; i < tags.length; i += 1) {
    const query = flashCardsByTagsQuery([tags[i].name]);
    const cards = await dbContext.flashCards.list(query);
    cardCount.set(tags[i].name, cards.length);
  }

  return cardCount;
}
