"use client";

import ApiRoutes from "@app/api/apiRoutes";
import { FlashCardWithTags } from "@customTypes/models/flashcard";
import Edit from "@mui/icons-material/Edit";
import ArrowCircleLeft from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Stack,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import CardContentFront from "./CardContentFront";
import { rotationClass } from "./constants";
import CardContentBack from "./CardContentBack";
import Link from "next/link";
import AppRoutes from "@app/appRoutes";
import DeleteDialogButton from "@components/buttons/DeleteDialogButton";
import Delete from "@mui/icons-material/Delete";
import { DialogButtonProps } from "@components/ActionDialog";
import { useRouter } from "next/navigation";

interface FlashCardProps {
  flashcard: FlashCardWithTags;
}

export default function FlashCard({ flashcard }: FlashCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const router = useRouter();

  const titleText = "Delete Flashcard";
  const contentText = `Are you sure, you want to delete the following flashcard?\n\nQuestion: ${flashcard.question}`;
  const cancelButton: DialogButtonProps = { label: "Cancel", color: "primary" };
  const okButton: DialogButtonProps = { label: "Delete", color: "error" };

  const changeShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const deleteFlashCard = async () => {
    if ("id" in flashcard) {
      try {
        await fetch(ApiRoutes.flashCards.deleteFlashCardRoute(flashcard.id), {
          method: "Delete",
        });
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box className="flex w-full [perspective:1000px]">
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
                <Link href={AppRoutes.flashCardRoutes.edit(flashcard?.id)}>
                  <IconButton color="secondary">
                    <Edit />
                  </IconButton>
                </Link>

                <DeleteDialogButton
                  color="error"
                  onClick={deleteFlashCard}
                  icon={<Delete />}
                  titleText={titleText}
                  contentText={contentText}
                  cancelButton={cancelButton}
                  okButton={okButton}
                ></DeleteDialogButton>
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
