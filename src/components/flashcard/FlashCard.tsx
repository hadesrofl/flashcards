"use client";

import ApiRoutes from "@app/api/apiRoutes";
import DeleteButton from "@components/DeleteButton";
import { FlashCardWithTags } from "@customTypes/models/flashcard";
import Edit from "@mui/icons-material/Edit";
import ArrowCircleLeft from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Stack,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import CardContentFront from "./CardContentFront";
import { rotationClass } from "./constants";
import CardContentBack from "./CardContentBack";
import Link from "next/link";

interface FlashCardProps {
  flashcard: FlashCardWithTags;
}

export default function FlashCard({ flashcard }: FlashCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  const changeShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const deleteFlashCard = async (flashcard: FlashCardWithTags | object) => {
    if ("id" in flashcard) {
      try {
        await fetch(ApiRoutes.flashCards.deleteFlashCardRoute(flashcard.id), {
          method: "Delete",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box className="flex w-screen [perspective:1000px]">
      <Card
        className={`w-full flex flex-col justify-between [transform-style:preserve-3d] ${
          showAnswer ? rotationClass : ""
        }`}
        sx={{
          transition: "ease-in-out",
          transitionDuration: "2000ms",
        }}
      >
        <CardContent
          className={`[transform-style:preserve-3d] ${
            showAnswer ? rotationClass : ""
          }`}
          sx={{
            transformStyle: "preserve-3d",
            transform: showAnswer ? "rotateY(180deg)" : "",
          }}
        >
          <CardContentFront flashCard={flashcard} />
          <CardContentBack flashCard={flashcard} show={showAnswer} />
        </CardContent>
        <CardActions className="justify-center">
          <Stack
            spacing={2}
            className={`${showAnswer ? rotationClass : ""} w-full`}
          >
            <Stack
              direction="row"
              spacing={2}
              className="items-center self-center"
            >
              {flashcard.tags.map((tag) => {
                return <Chip label={tag.name} key={crypto.randomUUID()} />;
              })}
            </Stack>
            <Stack
              direction={`${showAnswer ? "row-reverse" : "row"}`}
              className="justify-between"
            >
              <Stack direction={`${showAnswer ? "row" : "row-reverse"}`}>
                <IconButton disabled>
                  <Edit />
                </IconButton>
                <DeleteButton
                  record={flashcard}
                  refreshPage
                  onClick={deleteFlashCard}
                />
              </Stack>

              <Button onClick={changeShowAnswer} className="[padding:8px]">
                {showAnswer ? <ArrowCircleLeft /> : <ArrowCircleRight />}
              </Button>
            </Stack>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
}
