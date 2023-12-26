import IdParamProps from "@app/flashcards/_shared/props/IdParamProps";
import { notFound } from "next/navigation";
import TagsSearchParamProps from "@app/flashcards/_shared/props/TagsSearchParamProps";
import loadCards from "@server/actions/loadCards";
import CardRotationState from "@components/flashcard/helper/CardRotationState";
import StaticCardCarousel from "@components/flashcard/StaticCardCarousel";
import AppRoutes from "@app/appRoutes";
import { getTagsFromQueryServerComponent } from "@helpers/tags/getTagsFromQuery";

interface FlashCardSinglePageProps extends IdParamProps, TagsSearchParamProps {}

export default async function FlashCardSinglePage({
  params,
  searchParams,
}: FlashCardSinglePageProps) {
  const { id } = params;
  const { tags } = searchParams;
  const cleanedTags = getTagsFromQueryServerComponent(tags);

  try {
    const flashCards = await loadCards(cleanedTags);
    const currentCardIndex = flashCards.findIndex(
      (card) => card.id === Number.parseInt(id)
    );
    const cardRotation: CardRotationState = {
      previousCard:
        currentCardIndex > 0 ? flashCards[currentCardIndex - 1] : undefined,
      currentCard:
        currentCardIndex > -1 ? flashCards[currentCardIndex] : undefined,
      nextCard:
        currentCardIndex < flashCards.length - 1
          ? flashCards[currentCardIndex + 1]
          : undefined,
    };
    return (
      <StaticCardCarousel
        card={cardRotation.currentCard}
        previousCardHref={
          cardRotation.previousCard !== undefined
            ? AppRoutes.flashCardRoutes.singleCard(
                cardRotation.previousCard?.id,
                cleanedTags
              )
            : undefined
        }
        nextCardHref={
          cardRotation.nextCard !== undefined
            ? AppRoutes.flashCardRoutes.singleCard(
                cardRotation.nextCard.id,
                cleanedTags
              )
            : undefined
        }
      />
    );
  } catch (error) {
    return notFound();
  }
}
