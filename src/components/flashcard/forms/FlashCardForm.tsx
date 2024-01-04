"use client";

import { Button, Stack, TextField, Typography } from "@mui/material";
import MarkdownEditor from "../../lib/markdown/MarkdownEditor";
import { ChangeEvent, useState } from "react";
import { Tag } from "@prisma/client";
import AutoCompleteWithLabels from "../../lib/AutoCompleteWithLabels";
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
  const [questionText, setQuestionText] = useState(
    flashCard?.questionText ?? ""
  );
  const [answer, setAnswer] = useState(flashCard?.answer ?? "");
  const [tags, setTags] = useState<Tag[]>(flashCard?.tags ?? []);
  const router = useRouter();
  const questionTitle = "Question";
  const answerTitle = "Answer";
  const saveText = "Save";

  const handleSubmit = async () => {
    const flashcard = CreateFlashCardWithTags(
      question,
      questionText,
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

  const handleQuestionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleQuestionTextChange = (changedQuestion: string) => {
    setQuestionText(changedQuestion);
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
      <TextField
        label={questionTitle}
        value={question}
        variant="standard"
        onChange={handleQuestionChange}
      />
      <MarkdownEditor
        value={questionText}
        onChange={handleQuestionTextChange}
      />
      <Typography variant="h3" className="text-left">
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
