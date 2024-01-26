import loadCards from "@app/api/_internal/flashcards/actions/loadCards";
import TagParamProps from "@app/[lang]/flashcards/_shared/props/TagParamProps";
import CardCarousel from "@components/flashcard/cards/carousel/CardCarousel";
import shuffleCards from "@domain/flashcard/helpers/shuffleCards";
import { notFound } from "next/navigation";

export default async function FlashCardShufflePage({ params }: TagParamProps) {
  const { tags } = params;
  if (tags === undefined) return notFound();
  const flashCards = await loadCards(tags);
  const shuffledCards = shuffleCards(flashCards);

  return <CardCarousel flashCards={shuffledCards} />;
}
