import AppRoutes from "@app/appRoutes";
import TagsSearchParamProps from "@app/flashcards/_shared/props/TagsSearchParamProps";
import { getTagsFromQueryServerComponent } from "@helpers/tags/getTagsFromQuery";
import loadCards from "@server/actions/loadCards";
import { notFound, redirect } from "next/navigation";

export default async function FlashCardSequencePage({
  searchParams,
}: TagsSearchParamProps) {
  const { tags } = searchParams;
  const cleanedTags = getTagsFromQueryServerComponent(tags);
  const flashCards = await loadCards(tags, 0, 1);

  return flashCards === undefined || flashCards.length === 0
    ? notFound()
    : redirect(
        AppRoutes.flashCardRoutes.singleCard(flashCards[0].id, cleanedTags)
      );
}
