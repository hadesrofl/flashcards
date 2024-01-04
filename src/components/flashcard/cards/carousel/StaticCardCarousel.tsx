import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import FlashCard from "../FlashCard";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FlashCardWithTags } from "@customTypes/models/flashcard";

interface StaticCardCarouselProps {
  card: FlashCardWithTags | undefined;
  previousCardHref: string | undefined;
  nextCardHref: string | undefined;
}

export default function StaticCardCarousel({
  card,
  previousCardHref,
  nextCardHref,
}: StaticCardCarouselProps) {
  return card === undefined ? (
    notFound()
  ) : (
    <Stack className="w-full items-stretch" direction="row" spacing={4}>
      {previousCardHref !== undefined ? (
        <Link href={previousCardHref} className="self-center">
          <IconButton>
            <ArrowBack />
          </IconButton>
        </Link>
      ) : (
        <IconButton disabled>
          <ArrowBack />
        </IconButton>
      )}

      <FlashCard flashcard={card} />

      {nextCardHref !== undefined ? (
        <Link href={nextCardHref} className="self-center">
          <IconButton>
            <ArrowForward />
          </IconButton>
        </Link>
      ) : (
        <IconButton disabled>
          <ArrowForward />
        </IconButton>
      )}
    </Stack>
  );
}
