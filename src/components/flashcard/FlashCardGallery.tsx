import Grid from "@mui/material/Grid";
import { CommonProps } from "@mui/material/OverridableComponent";
import FlashCard from "./FlashCard";
import { FlashCardWithTags } from "@customTypes/models/flashcard";

interface FlashCardGalleryProps extends CommonProps {
  flashCards: FlashCardWithTags[];
}

export default async function FlashCardGallery({
  flashCards,
  className,
}: FlashCardGalleryProps) {
  return (
    <Grid className={`${className} flex items-stretch`} container spacing={4}>
      {flashCards.map((flashcard) => {
        return (
          <Grid
            item
            className="flex items-stretch"
            xs={12}
            md={3}
            key={crypto.randomUUID()}
          >
            <FlashCard flashcard={flashcard} />
          </Grid>
        );
      })}
    </Grid>
  );
}
