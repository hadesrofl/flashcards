import TestIds from "@tests/testIds";
import { render, screen, within } from "@testing-library/react";
import { Tag } from "@prisma/client";
import LearningActionButton from "./LearningActionButton";
import userEvent, { UserEvent } from "@testing-library/user-event";

export class LearningActionButtonPage {
  private tags: Tag[];
  private user: UserEvent;
  constructor(tags: Tag[]) {
    this.tags = tags;
    this.user = userEvent.setup();
  }

  render() {
    render(<LearningActionButton tags={this.tags} />);
  }

  tagSelect() {
    return screen.getByTestId(TestIds.LearningActionButton.TagSelectBox);
  }

  async tagComboBox() {
    return await within(this.tagSelect()).findByRole("combobox");
  }

  menuItem(tagName: string) {
    return screen.getByTestId(
      TestIds.LearningActionButton.TagMenuItem(tagName)
    );
  }

  async selectTag(tag: Tag) {
    const comboBox = await within(this.tagSelect()).findByRole("combobox");
    await this.user.click(comboBox);
    const menuItem = screen.getByTestId(
      TestIds.LearningActionButton.TagMenuItem(tag.name)
    );
    expect(menuItem).toBeInTheDocument();
    await this.user.click(menuItem);
  }

  async checkForSelectedTags(tagName: string) {
    return await within(this.tagSelect()).findByText(tagName);
  }

  splitButton() {
    return screen.getByRole("group");
  }

  optionMenu() {
    const menu = screen.getByTestId(
      TestIds.LearningActionButton.SplitButton.Menu
    );
    return menu;
  }

  async openActionOptions() {
    const toggleButton = await within(this.splitButton()).findByTestId(
      TestIds.LearningActionButton.SplitButton.Toggle
    );
    await this.user.click(toggleButton);
  }

  async changeAction(action: string) {
    const actionButton = await within(this.optionMenu()).findByText(action);
    await this.user.click(actionButton);
  }

  async checkForSelectedOption(option: string) {
    return await within(this.splitButton()).findByText(option);
  }
}
