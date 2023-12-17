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

interface FlashCardCreateFormProps {
  tagOptions: Tag[];
}

export default function FlashCardCreateForm({
  tagOptions,
}: FlashCardCreateFormProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const router = useRouter();
  const questionTitle = "Question";
  const answerTitle = "Answer";
  const submitText = "Submit";

  const handleSubmit = async () => {
    router.prefetch(AppRoutes.flashCardRoutes.root);
    const flashcard = CreateFlashCardWithTags(
      question,
      answer,
      undefined,
      tags
    );
    const request = new Request(ApiRoutes.flashCards.createFlashCardsRoute(), {
      body: JSON.stringify(flashcard),
      method: "POST",
    });
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
    <Stack spacing={4}>
      <Typography variant="h1" className="text-center">
        {questionTitle}
      </Typography>
      <MarkdownEditor onChange={handleQuestionChange} />
      <Typography variant="h1" className="text-center">
        {answerTitle}
      </Typography>
      <MarkdownEditor onChange={handleAnswerChange} />
      <AutoCompleteWithLabels
        titel="Tags"
        options={tagOptions.map((tag) => tag.name)}
        onChange={handleTagsChange}
      />
      <Button color="success" variant="outlined" onClick={handleSubmit}>
        {submitText}
      </Button>
    </Stack>
  );
}
