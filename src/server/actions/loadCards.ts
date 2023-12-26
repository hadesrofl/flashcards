import flashCardsByTagsQuery from "../repositories/queries/flashcards/flashCardsByTags";
import dbContext from "@server/repositories/dbContext";

export default async function loadCards(
  tags?: string | string[],
  skip?: number,
  limit?: number
) {
  try {
    const tagArray =
      tags === undefined ? [] : Array.isArray(tags) ? tags : [tags];
    const query = flashCardsByTagsQuery(tagArray);
    return await dbContext.flashCards.list(query, skip, limit);
  } catch (error) {
    console.log(error);
    return [];
  }
}
