import AppRoutes from "@app/appRoutes";
import TagParamProps from "@app/flashcards/_shared/props/TagParamProps";
import FlashCardGallery from "@components/flashcard/FlashCardGallery";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dbContext from "@server/repositories/dbContext";
import flashCardsByTagsQuery from "@server/repositories/queries/flashcards/flashCardsByTags";
import Link from "next/link";

export default async function FlashCardGalleryPage({ params }: TagParamProps) {
  const { tags } = params;
  const query = flashCardsByTagsQuery(tags);
  const flashCards = await dbContext.flashCards.list(query);
  const noCardsAvailable = "No Cards available :(";
  const createText = "Create Flashcard";
  return flashCards.length > 0 ? (
    <FlashCardGallery flashCards={flashCards} className="justify-evenly" />
  ) : (
    <Stack className="items-center" spacing={4}>
      <Typography variant="h1">{noCardsAvailable}</Typography>
      <Link href={AppRoutes.flashCardRoutes.create}>
        <Button variant="outlined">{createText}</Button>
      </Link>
    </Stack>
  );
}
