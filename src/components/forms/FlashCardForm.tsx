"use client";

import { Button, Stack, Typography } from "@mui/material";
import MarkdownEditor from "../markdown/MarkdownEditor";
import { useState } from "react";
import { Tag } from "@prisma/client";
import AutoCompleteWithLabels from "../AutoCompleteWithLabels";
import { useRouter } from "next/navigation";
import { CreateFlashCardWithTags } from "@customTypes/factories/FlashCardWithTagsFactory";
import AppRoutes from "@app/appRoutes";
import ApiRoutes from "@app/api/apiRoutes";
import { FlashCardWithTags } from "@customTypes/models/flashcard";

interface FlashCardFormProps {
  tagOptions: Tag[];
  flashCard?: FlashCardWithTags;
}

export default function FlashCardForm({
  tagOptions,
  flashCard,
}: FlashCardFormProps) {
  const [question, setQuestion] = useState(flashCard?.question ?? "");
  const [answer, setAnswer] = useState(flashCard?.answer ?? "");
  const [tags, setTags] = useState<Tag[]>(flashCard?.tags ?? []);
  const router = useRouter();
  const questionTitle = "Question";
  const answerTitle = "Answer";
  const saveText = "Save";

  const handleSubmit = async () => {
    const flashcard = CreateFlashCardWithTags(
      question,
      answer,
      flashCard?.id ?? undefined,
      tags
    );
    const request = new Request(
      flashCard?.id
        ? ApiRoutes.flashCards.editFlashCardRoute(flashCard.id)
        : ApiRoutes.flashCards.createFlashCardsRoute(),
      {
        body: JSON.stringify(flashcard),
        method: flashCard?.id ? "PUT" : "POST",
      }
    );
    await fetch(request);
    router.push(AppRoutes.flashCardRoutes.root);
  };

  const handleQuestionChange = (changedQuestion: string) => {
    setQuestion(changedQuestion);
  };

  const handleAnswerChange = (changedAnswer: string) => {
    setAnswer(changedAnswer);
  };

  const handleTagsChange = (changedTags: string[]) => {
    const newTags: Tag[] = [];
    changedTags.forEach((tag) => {
      newTags.push({
        id: 0,
        createdAt: new Date(Date.now()),
        name: tag,
      });
    });
    setTags(newTags);
  };

  return (
    <Stack spacing={4} className="w-full">
      <Typography variant="h1" className="text-center">
        {questionTitle}
      </Typography>
      <MarkdownEditor value={question} onChange={handleQuestionChange} />
      <Typography variant="h1" className="text-center">
        {answerTitle}
      </Typography>
      <MarkdownEditor value={answer} onChange={handleAnswerChange} />
      <AutoCompleteWithLabels
        title="Tags"
        initSelection={tags.map((tag) => tag.name)}
        options={tagOptions.map((tag) => tag.name)}
        onChange={handleTagsChange}
      />
      <Button color="success" variant="outlined" onClick={handleSubmit}>
        {saveText}
      </Button>
    </Stack>
  );
}
