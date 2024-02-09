import userEvent, { UserEvent } from "@testing-library/user-event";
import { TagDialogButtonBasePage } from "@tests/pages/TagDialogButton.base.page";

export class DeleteDialogButtonPage extends TagDialogButtonBasePage {
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

  async deleteTag() {
    await this.user.click(await this.okButton());
  }
}
