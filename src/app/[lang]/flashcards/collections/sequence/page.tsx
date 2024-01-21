import { getTagsFromQueryServerComponent } from "@app/_shared/tags/helpers/getTagsFromQuery";
import loadCards from "@app/api/_internal/flashcards/actions/loadCards";
import AppRoutes from "@app/appRoutes";
import TagsSearchParamProps from "@app/[lang]/flashcards/_shared/props/TagsSearchParamProps";
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
