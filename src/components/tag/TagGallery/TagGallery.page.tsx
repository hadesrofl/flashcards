import { render, screen, within } from "@testing-library/react";
import TagGallery from "./TagGallery";
import { Tag } from "@prisma/client";
import TestIds from "@tests/testIds";

export class TagGalleryPageObject {
  private tags: Tag[];
  constructor(tags: Tag[]) {
    this.tags = tags;
  }

  async render() {
    const props = { tags: this.tags };
    const tagGallery = await TagGallery(props);
    render(tagGallery);
  }

  async tagEntries() {
    const promises: Promise<HTMLElement>[] = [];
    this.tags.forEach((tag) => {
      promises.push(screen.findByTestId(TestIds.TagGallery.TagEntry(tag.name)));
    });
    return await Promise.all(promises);
  }

  async badgeByText(tagName: string) {
    const container = await screen.findByTestId(
      TestIds.TagGallery.TagEntry(tagName)
    );
    return within(container).findByTestId(TestIds.TagGallery.Badge(tagName));
  }

  async tagButtonGroup(tagName: string) {
    const container = await screen.findByTestId(
      TestIds.TagGallery.TagEntry(tagName)
    );
    return within(container).findByTestId(TestIds.TagButtonGroup.Root(tagName));
  }
}
