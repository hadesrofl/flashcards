import { render, screen } from "@testing-library/react";
import NoFlashCardDialog from "./NoFlashCardDialog";
import { NoDialogBasePage } from "@tests/pages/NoDialog.base.page";

export class NoFlashCardDialogPage extends NoDialogBasePage {
  render() {
    render(<NoFlashCardDialog />);
  }

  async title() {
    return await screen.findByText(
      this.dictionary.Flashcards.noFlashCardDialog.title
    );
  }

  async contextText() {
    return await screen.findByText(
      this.dictionary.Flashcards.noFlashCardDialog.contextText
    );
  }

  async yesButton() {
    return await screen.findByText(
      this.dictionary.Flashcards.noFlashCardDialog.buttons.yes
    );
  }

  async noButton() {
    return await screen.findByText(
      this.dictionary.Flashcards.noFlashCardDialog.buttons.no
    );
  }
}
