import { render, screen } from "@testing-library/react";
import NoTagDialog from "./NoTagDialog";
import { NoDialogBasePage } from "@tests/pages/NoDialog.base.page";

export class NoTagDialogPage extends NoDialogBasePage {
  render() {
    render(<NoTagDialog />);
  }

  async title() {
    return await screen.findByText(this.dictionary.NoTagDialog.title);
  }

  async contextText() {
    return await screen.findByText(this.dictionary.NoTagDialog.contextText);
  }

  async yesButton() {
    return await screen.findByText(this.dictionary.NoTagDialog.buttons.yes);
  }

  async noButton() {
    return await screen.findByText(this.dictionary.NoTagDialog.buttons.no);
  }
}
