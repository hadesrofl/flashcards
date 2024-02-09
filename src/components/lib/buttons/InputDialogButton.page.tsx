import { screen, within } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { TagDialogButtonBasePage } from "@tests/pages/TagDialogButton.base.page";

export class InputDialogButtonPage extends TagDialogButtonBasePage {
  private user: UserEvent;

  constructor(
    title: string,
    contextText: string,
    cancelButtonLabel: string,
    okButtonLabel: string
  ) {
    super(title, contextText, cancelButtonLabel, okButtonLabel);
    this.user = userEvent.setup();
  }

  async editTag(oldName: string, newName: string) {
    const inputField = await screen.findByDisplayValue(oldName);
    await this.user.clear(inputField);
    await this.user.type(inputField, newName);
    await this.user.click(await this.okButton());
  }
}
