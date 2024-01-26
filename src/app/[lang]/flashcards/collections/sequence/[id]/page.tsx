import IdParamProps from "@app/[lang]/flashcards/_shared/props/IdParamProps";
import { notFound } from "next/navigation";
import TagsSearchParamProps from "@app/[lang]/flashcards/_shared/props/TagsSearchParamProps";
import CardRotationState from "@components/flashcard/helper/CardRotationState";
import StaticCardCarousel from "@components/flashcard/cards/carousel/StaticCardCarousel";
import AppRoutes from "@app/appRoutes";
import { getTagsFromQueryServerComponent } from "@app/_shared/tags/helpers/getTagsFromQuery";
import loadCards from "@app/api/_internal/flashcards/actions/loadCards";

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
