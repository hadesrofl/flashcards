import { PrismaClient, Tag } from "@prisma/client";
import { cache } from "react";
import { Repository } from "../../shared/db/BaseRepository";
import FlashCardCache from "../../flashcards/cache/FlashCardCache";
import TagCache from "../cache/TagCache";

export class TagRepository extends Repository<Tag> {
  constructor(client: PrismaClient) {
    super(client);
  }

  public async create(tag: Tag): Promise<Tag> {
    throw new Error("Method not implemented.");
  }

  public async edit(tag: Tag): Promise<Tag> {
    const updated = await this.dbContext.tag.update({
      where: { id: tag.id },
      data: tag,
    });
    return updated;
  }

  list = cache(async (where?: object, skip?: number, limit?: number) => {
    return await this.dbContext.tag.findMany({ where, skip, take: limit });
  });

  getById = cache(async (id: number): Promise<Tag> => {
    throw new Error("Method not implemented.");
  });

  public async delete(entity: Tag) {
    return await this.deleteById(entity.id);
  }

  public async deleteById(id: number) {
    const flashCards = await this.dbContext.flashcard.findMany({
      where: { tags: { some: { id } } },
      include: { tags: true },
    });
    const deleted = await this.dbContext.tag.delete({ where: { id } });
    for (let i = 0; i < flashCards.length; i += 1) {
      await FlashCardCache.revalidatePaths(
        flashCards[i].id,
        flashCards[i].tags
      );
    }
    TagCache.revalidatePaths();
    return deleted;
  }
}
