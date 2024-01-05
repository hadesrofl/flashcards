import { Repository } from "../../shared/db/BaseRepository";
import { cache } from "react";
import { PrismaClient } from "@prisma/client";
import { FlashCardWithTags } from "@domain/flashcard/models/flashcard";
import getTagsToDelete from "../../tags/db/helpers/getTagsToDelete";
import FlashCardCache from "../cache/FlashCardCache";

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
    await FlashCardCache.revalidatePaths(created.id, created.tags);
    return created;
  }

  public async edit(flashCard: FlashCardWithTags) {
    const oldFlashCardEntry = await this.dbContext.flashcard.findFirst({
      where: { id: flashCard.id },
      include: { tags: true },
    });
    const tagsToDelete =
      oldFlashCardEntry !== null
        ? getTagsToDelete(oldFlashCardEntry, flashCard)
        : [];

    const updated = await this.dbContext.flashcard.update({
      where: {
        id: flashCard.id,
      },
      data: {
        ...flashCard,
        tags: {
          connectOrCreate: flashCard.tags.map((tag) => {
            return { where: { name: tag.name }, create: { name: tag.name } };
          }),
          disconnect: tagsToDelete,
        },
      },
      include: {
        tags: true,
      },
    });

    await FlashCardCache.revalidatePaths(updated.id, updated.tags);
    return updated;
  }

  list = cache(async (where?: object, skip?: number, limit?: number) => {
    return await this.dbContext.flashcard.findMany({
      where,
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
    FlashCardCache.revalidatePaths(deleted.id, deleted.tags);
    return deleted;
  }
}

export default FlashCardRepository;
