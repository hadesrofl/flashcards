import { prismaMock } from "@tests/setup/prisma";
import loadCards from "./loadCards";
import { mockTags } from "@tests/mockData/mockTags";

function buildQuery(tags?: string[], skip?: number, limit?: number) {
  const decodedTags = tags?.map((tag) => decodeURIComponent(tag));
  return {
    include: { tags: true },
    skip,
    take: limit,
    where: {
      tags: {
        some: {
          name: {
            in: decodedTags !== undefined ? decodedTags : [],
            mode: "insensitive",
          },
        },
      },
    },
  };
}

describe("load cards", () => {
  it("loads all", async () => {
    await loadCards();
    expect(prismaMock.flashcard.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.flashcard.findMany).toHaveBeenCalledWith(buildQuery());
  });

  it("loads only Clean Code cards", async () => {
    const tags = mockTags
      .filter((tag) => tag.name === "Clean Code")
      .map((tag) => tag.name);
    await loadCards(tags);
    expect(prismaMock.flashcard.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.flashcard.findMany).toHaveBeenCalledWith(
      buildQuery(tags)
    );
  });

  it("skips cards", async () => {
    const tags = mockTags.map((tag) => tag.name);
    const skip = 3;
    await loadCards(tags, skip);
    expect(prismaMock.flashcard.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.flashcard.findMany).toHaveBeenCalledWith(
      buildQuery(tags, skip)
    );
  });

  it("limits loaded cards", async () => {
    const tags = mockTags.map((tag) => tag.name);
    const skip = 3;
    const limit = 1;
    await loadCards(tags, skip, limit);
    expect(prismaMock.flashcard.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.flashcard.findMany).toHaveBeenCalledWith(
      buildQuery(tags, skip, limit)
    );
  });

  it("returns no cards on error", async () => {
    prismaMock.flashcard.findMany.mockRejectedValue("Didn't find any Cards");
    const cards = await loadCards();
    expect(prismaMock.flashcard.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.flashcard.findMany).toHaveBeenCalledWith(buildQuery());
    expect(cards).toBeTruthy();
    expect(cards.length).toBe(0);
  });
});
