"use client";

import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Stack, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";
import FlashCard from "../FlashCard";
import CardRotationState from "../../helper/CardRotationState";
import { FlashCardWithTags } from "@domain/flashcard/models/flashcard";

interface CardCarouselProps {
  flashCards: FlashCardWithTags[];
}

export default function CardCarousel({ flashCards }: CardCarouselProps) {
  const [cardRotation, setCardRotation] = useState<CardRotationState>({
    previousCard: undefined,
    currentCard: flashCards[0],
    nextCard: flashCards.length > 1 ? flashCards[1] : undefined,
  });
  const noCardsFoundText = "Card not found :(";

  const previousClick = (_event: React.MouseEvent) => {
    const newPreviousCardIndex = flashCards.findIndex(
      (card) => card.id === cardRotation.previousCard?.id
    );
    setCardRotation({
      previousCard:
        newPreviousCardIndex === 0
          ? undefined
          : flashCards[newPreviousCardIndex - 1],
      currentCard: cardRotation.previousCard,
      nextCard: cardRotation.currentCard,
    });
  };

  const nextClick = (_event: React.MouseEvent) => {
    const nexNextCardIndex = flashCards.findIndex(
      (card) => card.id === cardRotation.nextCard?.id
    );
    setCardRotation({
      previousCard: cardRotation.currentCard,
      currentCard: cardRotation.nextCard,
      nextCard:
        nexNextCardIndex === flashCards.length - 1
          ? undefined
          : flashCards[nexNextCardIndex + 1],
    });
  };

  return (
    <Stack className="w-full items-stretch" direction="row">
      <IconButton
        disabled={cardRotation.previousCard === undefined}
        onClick={previousClick}
      >
        <ArrowBack />
      </IconButton>

      {cardRotation.currentCard !== undefined ? (
        <FlashCard flashcard={cardRotation.currentCard} />
      ) : (
        <Typography variant="h1">{noCardsFoundText}</Typography>
      )}

      <IconButton
        disabled={cardRotation.nextCard === undefined}
        onClick={nextClick}
      >
        <ArrowForward />
      </IconButton>
    </Stack>
  );
}
