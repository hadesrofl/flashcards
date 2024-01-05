import { Prisma } from "@prisma/client";

export type FlashCardWithTags = Prisma.FlashcardGetPayload<{
  include: { tags: true };
}>;
