import { PrismaClient } from "@prisma/client";
import FlashCardRepository from "../../flashcards/db/FlashcardRepository";
import { TagRepository } from "../../tags/db/TagRepository";

const client = new PrismaClient();

const dbContext = {
  flashCards: new FlashCardRepository(client),
  tags: new TagRepository(client),
};

export default dbContext;
