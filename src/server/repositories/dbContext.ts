import { PrismaClient } from "@prisma/client";
import FlashCardRepository from "./FlashcardRepository";
import { TagRepository } from "./TagRepository";

const client = new PrismaClient();

const dbContext = {
  flashCards: new FlashCardRepository(client),
  tags: new TagRepository(client),
};

export default dbContext;
