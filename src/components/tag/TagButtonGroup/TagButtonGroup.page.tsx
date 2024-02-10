import { Dictionary } from "@dictionaries/helpers/getDictionaries";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { default as defaultDictionary } from "@dictionaries/en.json";
import TagButtonGroup from "./TagButtonGroup";
import { Tag } from "@prisma/client";
import { render, screen, waitFor } from "@testing-library/react";
import TestIds from "@tests/testIds";
import { InputDialogButtonPage } from "@components/lib/buttons/InputDialogButton.page";
import { DeleteDialogButtonPage } from "@components/lib/buttons/DeleteDialogButton.page";

export class TagButtonGroupPage {
  private user: UserEvent;
  private dictionary: Dictionary;
  private tag: Tag;

  editDialog: InputDialogButtonPage;
  deleteDialog: DeleteDialogButtonPage;

  constructor(tag: Tag) {
    this.user = userEvent.setup();
    this.dictionary = defaultDictionary;
    this.tag = tag;
    this.editDialog = new InputDialogButtonPage(
      this.dictionary.TagButtonGroup.editDialog.title,
      `${this.dictionary.TagButtonGroup.editDialog.contextText} ${tag.name}`,
      this.dictionary.TagButtonGroup.editDialog.buttons.cancelLabel,
      this.dictionary.TagButtonGroup.editDialog.buttons.okLabel
    );
    this.deleteDialog = new DeleteDialogButtonPage(
      this.dictionary.TagButtonGroup.deleteDialog.title,
      `${this.dictionary.TagButtonGroup.deleteDialog.contextText} ${tag.name}`,
      this.dictionary.TagButtonGroup.deleteDialog.buttons.cancelLabel,
      this.dictionary.TagButtonGroup.deleteDialog.buttons.okLabel
    );
  }

  render() {
    render(<TagButtonGroup tag={this.tag} />);
  }

  async editDialogButton() {
    return await screen.findByTestId(
      TestIds.TagButtonGroup.InputDialogButton(this.tag.name)
    );
  }

  async openEditDialog() {
    await this.user.click(await this.editDialogButton());
    await waitFor(async () => {
      expect(await this.editDialog.dialog()).toBeInTheDocument();
    });
  }

  async closeEditDialog() {
    await this.user.click(await this.editDialog.cancelButton());
    await waitFor(async () => {
      expect(await this.editDialog.dialog()).not.toBeVisible();
    });
  }

  async deleteDialogButton() {
    return await screen.findByTestId(
      TestIds.TagButtonGroup.DeleteDialogButton(this.tag.name)
    );
  }

  async openDeleteDialog() {
    await this.user.click(await this.deleteDialogButton());
    await waitFor(async () => {
      expect(await this.deleteDialog.dialog()).toBeVisible();
    });
  }

  async closeDeleteDialog() {
    await this.user.click(await this.deleteDialog.cancelButton());
    await waitFor(async () => {
      expect(await this.deleteDialog.dialog()).not.toBeVisible();
    });
  }
}
