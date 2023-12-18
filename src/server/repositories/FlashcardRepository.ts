import { FlashCardWithTags } from "@customTypes/models/flashcard";
import { Repository } from "./BaseRepository";
import { cache } from "react";
import { PrismaClient } from "@prisma/client";
import FlashCardCache from "@server/cache/FlashCardCache";

class FlashCardRepository extends Repository<FlashCardWithTags> {
  constructor(client: PrismaClient) {
    super(client);
  }

  public async create(flashCard: FlashCardWithTags) {
    const created = await this.dbContext.flashcard.create({
      data: {
        ...flashCard,
        id: undefined,
        tags: {
          connectOrCreate: flashCard.tags.map((tag) => {
            return { where: { name: tag.name }, create: { name: tag.name } };
          }),
        },
      },
      include: {
        tags: true,
      },
    });
    FlashCardCache.revalidatePaths();
    return created;
  }

  list = cache(async (skip?: number, limit?: number) => {
    return await this.dbContext.flashcard.findMany({
      skip: skip,
      take: limit,
      include: { tags: true },
    });
  });

  getById = cache(async (id: number) => {
    return await this.dbContext.flashcard.findFirstOrThrow({
      where: { id },
      include: { tags: true },
    });
  });

  public async delete(entity: FlashCardWithTags) {
    return await this.deleteById(entity.id);
  }

  public async deleteById(id: number) {
    const deleted = await this.dbContext.flashcard.delete({
      where: { id },
      include: { tags: true },
    });
    FlashCardCache.revalidatePaths();
    return deleted;
  }
}

export default FlashCardRepository;
