import { useRouter } from "next/navigation";
import { NoTagDialogPage } from "./NoTagDialog.page";
import { waitFor } from "@testing-library/react";
import AppRoutes from "@app/appRoutes";
import { mockUseRouter } from "@tests/setup/nextNavigation";

jest.mock("next/navigation");

(useRouter as jest.Mock).mockReturnValue(mockUseRouter);

describe("NoTagDialog", () => {
  it("renders", async () => {
    const page = new NoTagDialogPage();

    page.render();
    expect(await page.dialog()).toBeInTheDocument();
  });

  it("shows content", async () => {
    const page = new NoTagDialogPage();

    page.render();
    expect(await page.dialog()).toBeInTheDocument();
    expect(await page.title()).toBeInTheDocument();
    expect(await page.contextText()).toBeInTheDocument();
    expect(await page.yesButton()).toBeInTheDocument();
    expect(await page.noButton()).toBeInTheDocument();
  });

  it("gets confirmed and disappears", async () => {
    const page = new NoTagDialogPage();

    page.render();
    expect(await page.dialog()).toBeInTheDocument();
    await page.clickYes();
    await waitFor(async () => {
      expect(mockUseRouter.push).toHaveBeenCalledTimes(1);
      expect(mockUseRouter.push).toHaveBeenCalledWith(
        AppRoutes.flashCardRoutes.create
      );
      expect(await page.dialog()).not.toBeVisible();
    });
  });

  it("gets cancelled and disappears", async () => {
    const page = new NoTagDialogPage();

    page.render();
    expect(await page.dialog()).toBeInTheDocument();
    await page.clickNo();
    await waitFor(async () => {
      expect(mockUseRouter.push).toHaveBeenCalledTimes(1);
      expect(mockUseRouter.push).toHaveBeenCalledWith(
        AppRoutes.flashCardRoutes.collections([])
      );
      expect(await page.dialog()).not.toBeVisible();
    });
  });
});
