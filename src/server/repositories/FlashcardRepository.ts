import { FlashCardWithTags } from "@customTypes/models/flashcard";
import { Repository } from "./BaseRepository";
import { PrismaClient } from "@prisma/client";

class FlashCardRepository extends Repository<FlashCardWithTags> {
  constructor(client: PrismaClient) {
    super(client);
  }

  public async create(flashCard: FlashCardWithTags) {
    return await this.dbContext.flashcard.create({
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
  }

  public async list(skip?: number, limit?: number) {
    return await this.dbContext.flashcard.findMany({
      skip: skip,
      take: limit,
      include: { tags: true },
    });
  }

  public async getById(id: number) {
    return await this.dbContext.flashcard.findFirstOrThrow({
      where: { id },
      include: { tags: true },
    });
  }
}

export default FlashCardRepository;
