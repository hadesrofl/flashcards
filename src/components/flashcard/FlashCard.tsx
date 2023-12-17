"use client";

import { FlashCardWithTags } from "@customTypes/models/flashcard";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

interface FlashCardProps {
  flashcard: FlashCardWithTags;
}

export default function FlashCard({ flashcard }: FlashCardProps) {
  const showAnswerText = "Show Answer";
  const showQuestionText = "Show Question";
  const [showAnswer, setShowAnswer] = useState(false);
  const rotationClass = "[transform:rotateY(180deg)]";

  const determineCardContentCssPosition = (
    textLength: number,
    otherTextLength: number
  ) => {
    return `${
      textLength > otherTextLength ? "relative" : "absolute"
    } [backface-visibility:hidden]`;
  };

  const changeShowAnswer = () => {
    setShowAnswer(!showAnswer);
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
          <Box
            className={determineCardContentCssPosition(
              flashcard.question.length,
              flashcard.answer.length
            )}
          >
            <Typography variant="body1" component="div">
              <MDEditor.Markdown
                style={{ backgroundColor: "inherit", color: "inherit" }}
                source={flashcard.question}
              />
            </Typography>
          </Box>
          <Box
            className={`${determineCardContentCssPosition(
              flashcard.answer.length,
              flashcard.question.length
            )} inset-0 ${rotationClass}`}
          >
            <Typography
              variant="body1"
              component="div"
              className={showAnswer ? rotationClass : ""}
            >
              <MDEditor.Markdown
                style={{ backgroundColor: "inherit", color: "inherit" }}
                source={flashcard.answer}
              />
            </Typography>
          </Box>
        </CardContent>
        <CardActions className="justify-center">
          <Stack spacing={2} className={showAnswer ? rotationClass : ""}>
            <Stack
              direction="row"
              spacing={2}
              className="items-center self-center"
            >
              {flashcard.tags.map((tag) => {
                return <Chip label={tag.name} key={crypto.randomUUID()} />;
              })}
            </Stack>
            <Button size="small" onClick={changeShowAnswer}>
              {showAnswer ? showQuestionText : showAnswerText}
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
}
