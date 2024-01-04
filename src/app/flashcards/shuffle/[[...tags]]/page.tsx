import TagParamProps from "@app/flashcards/_shared/props/TagParamProps";
import CardCarousel from "@components/flashcard/cards/carousel/CardCarousel";
import shuffleCards from "@helpers/flashcards/shuffleCards";
import loadCards from "@server/actions/loadCards";
import { notFound } from "next/navigation";

export default async function FlashCardShufflePage({ params }: TagParamProps) {
  const { tags } = params;
  if (tags === undefined) return notFound();
  const flashCards = await loadCards(tags);
  const shuffledCards = shuffleCards(flashCards);

  return <CardCarousel flashCards={shuffledCards} />;
}
