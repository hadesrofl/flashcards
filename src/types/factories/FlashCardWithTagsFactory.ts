import { FlashCardWithTags } from "@customTypes/models/flashcard";
import { Tag } from "@prisma/client";

export function CreateFlashCardWithTags(
  question: string,
  questionText: string,
  answer: string,
  id?: number,
  tags?: Tag[],
  createdAt?: Date,
  updatedAt?: Date
): FlashCardWithTags {
  return {
    question: question,
    questionText: questionText,
    answer: answer,
    id: id ?? 0,
    createdAt: createdAt ?? new Date(Date.now()),
    updatedAt: updatedAt ?? new Date(Date.now()),
    tags: tags ?? [],
  };
}
