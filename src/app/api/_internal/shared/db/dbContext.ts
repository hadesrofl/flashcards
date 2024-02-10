import FlashCardRepository from "../../flashcards/db/FlashcardRepository";
import { TagRepository } from "../../tags/db/TagRepository";
import prismaClient from "./prisma";

const dbContext = {
  flashCards: new FlashCardRepository(prismaClient),
  tags: new TagRepository(prismaClient),
};

export default dbContext;
