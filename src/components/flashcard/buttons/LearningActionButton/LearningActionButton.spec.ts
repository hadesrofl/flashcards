import { waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tag } from "@prisma/client";
import { TagQueryFieldName } from "@app/_shared/tags/helpers/Constants";
import { LearningActionButtonPage } from "./LearningActionButton.page";
import { mockTags } from "@tests/mockData/mockTags";
import {
  mockUseRouter,
  mockUseSearchParams,
  mockUsePathname,
} from "@tests/setup/nextNavigation";

describe("Learning Action Button", () => {
  const defaultTag: Tag = mockTags[0];
  const actions = ["Shuffle", "Show Collection", "Show in Sequence"];
  const defaultAction = actions[0];
  const disabledClass = "Mui-disabled";

  it("renders", () => {
    mockUsePathname.mockImplementation(() => "/");
    mockUseSearchParams.has.mockReturnValue(false);
    const page = new LearningActionButtonPage(mockTags);

    page.render();
    expect(page.tagSelect()).toBeInTheDocument();
  });

  it("shows Clean Code tag", async () => {
    const pathname = "/CleanCode";
    mockUsePathname.mockImplementation(() => pathname);
    mockUseSearchParams.has.mockReturnValue(true);
    mockUseSearchParams.getAll.mockImplementation((fieldName: string) =>
      fieldName === TagQueryFieldName ? [defaultTag.name] : []
    );
    const page = new LearningActionButtonPage(mockTags);

    page.render();

    expect(page.tagSelect()).toBeInTheDocument();
    expect(await page.checkForSelectedTags(defaultTag.name)).toBeVisible();
  });

  it("select Software Development tag", async () => {
    const pathname = "/";
    mockUsePathname.mockImplementation(() => pathname);
    mockUseSearchParams.has.mockReturnValue(false);
    const tag = mockTags[1];
    const page = new LearningActionButtonPage(mockTags);
    page.render();

    expect(page.tagSelect()).toBeInTheDocument();

    await page.selectTag(tag);

    expect(await page.checkForSelectedTags(tag.name)).toBeVisible();
  });

  it("show actions", async () => {
    const pathname = "/";
    mockUsePathname.mockImplementation(() => pathname);
    mockUseSearchParams.has.mockReturnValue(false);
    const page = new LearningActionButtonPage(mockTags);

    page.render();

    expect(page.splitButton()).toBeInTheDocument();
    await page.openActionOptions();
    for (let i = 0; i < actions.length; i += 1) {
      expect(
        await within(page.optionMenu()).findByText(actions[i])
      ).toBeVisible();

      if (actions[i] === defaultAction) {
        expect(
          await within(page.optionMenu()).findByText(defaultAction)
        ).toHaveClass(disabledClass);
      }
    }
  });

  it("select Show in Sequence action", async () => {
    const pathname = "/";
    const action = "Show in Sequence";
    mockUsePathname.mockImplementation(() => pathname);
    mockUseSearchParams.has.mockReturnValue(false);
    const page = new LearningActionButtonPage(mockTags);

    page.render();

    expect(page.splitButton()).toBeInTheDocument();
    await page.openActionOptions();
    const defaultOption = await within(page.optionMenu()).findByText(
      defaultAction
    );
    expect(defaultOption).toBeVisible();
    expect(defaultOption).toHaveClass(disabledClass);
    await page.changeAction(action);
    expect(await within(page.splitButton()).findByText(action)).toBeVisible();
    await page.openActionOptions();
    expect(await within(page.optionMenu()).findByText(action)).toHaveClass(
      disabledClass
    );
    await waitFor(() => {
      expect(mockUseRouter.prefetch).toHaveBeenCalledTimes(1);
      expect(mockUseRouter.prefetch).toHaveBeenCalledWith(
        "/flashcards/collections/sequence"
      );
    });
  });

  it("execute shuffle action", async () => {
    const pathname = "/";
    const user = userEvent.setup();
    mockUsePathname.mockImplementation(() => pathname);
    mockUseSearchParams.has.mockReturnValue(false);
    const page = new LearningActionButtonPage(mockTags);

    page.render();

    expect(page.splitButton()).toBeInTheDocument();
    const actionButton = await within(page.splitButton()).findByText(
      defaultAction
    );
    await user.click(actionButton);
    await waitFor(() => {
      expect(mockUseRouter.push).toHaveBeenCalledTimes(1);
      expect(mockUseRouter.push).toHaveBeenCalledWith(
        `/flashcards/${defaultAction.toLowerCase()}/`
      );
    });
  });
});
