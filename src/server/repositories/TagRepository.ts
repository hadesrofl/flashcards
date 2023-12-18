import { PrismaClient, Tag } from "@prisma/client";
import { Repository } from "./BaseRepository";
import { cache } from "react";
import TagCache from "@server/cache/TagCache";
import FlashCardCache from "@server/cache/FlashCardCache";

export class TagRepository extends Repository<Tag> {
  constructor(client: PrismaClient) {
    super(client);
  }

  public async create(entity: Tag): Promise<Tag> {
    throw new Error("Method not implemented.");
  }

  list = cache(async (skip?: number, limit?: number) => {
    return await this.dbContext.tag.findMany({ skip, take: limit });
  });

  getById = cache(async (id: number): Promise<Tag> => {
    throw new Error("Method not implemented.");
  });

  public async delete(entity: Tag) {
    return await this.deleteById(entity.id);
  }

  public async deleteById(id: number) {
    const deleted = await this.dbContext.tag.delete({ where: { id } });
    FlashCardCache.revalidatePaths();
    TagCache.revalidatePaths();
    return deleted;
  }
}
