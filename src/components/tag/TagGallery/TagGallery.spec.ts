import { mockTags } from "@tests/mockData/mockTags";
import { TagGalleryPageObject } from "./TagGallery.page";
import { mockFlashcards } from "@tests/mockData/mockFlashcards";

import { FlashCardWithTags } from "@domain/flashcard/models/flashcard";
import { Tag } from "@prisma/client";
import { prismaMock } from "@tests/setup/prisma";

function countTags(flashCards: FlashCardWithTags[], tag: Tag) {
  const cards: FlashCardWithTags[] = [];
  flashCards.forEach((card) => {
    if (card.tags.includes(tag) && cards.includes(card) === false)
      cards.push(card);
  });
  return cards.length;
}

describe("Tag Gallery", () => {
  it("renders", async () => {
    prismaMock.flashcard.findMany
      .mockResolvedValueOnce(mockFlashcards)
      .mockResolvedValueOnce([mockFlashcards[1]]);

    const page = new TagGalleryPageObject(mockTags);
    page.render();

    expect((await page.tagEntries()).length).toBe(mockTags.length);
    for (let i = 0; i < mockTags.length; i += 1) {
      const tag = mockTags[i];
      expect(await page.tagButtonGroup(tag.name)).toBeInTheDocument();
      // we include the tag name here because the test id gives us the badge with the contained chip element and the tag name in it
      expect((await page.badgeByText(tag.name)).textContent).toBe(
        `${tag.name}${countTags(mockFlashcards, tag)}`
      );
    }
  });
});
