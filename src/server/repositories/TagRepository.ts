import { Tag } from "@prisma/client";
import { Repository } from "./BaseRepository";

export class TagRepository extends Repository<Tag> {
  constructor() {
    super();
  }

  public async create(entity: Tag): Promise<Tag> {
    throw new Error("Method not implemented.");
  }

  public async list(skip?: number, limit?: number): Promise<Tag[]> {
    return await this.dbContext.tag.findMany({ skip, take: limit });
  }

  public async getById(id: number): Promise<Tag> {
    throw new Error("Method not implemented.");
  }
}
