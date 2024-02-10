import { mockTags } from "@tests/mockData/mockTags";
import { mockUseRouter } from "@tests/setup/nextNavigation";
import { TagButtonGroupPage } from "./TagButtonGroup.page";
import { waitFor } from "@testing-library/react";
import ApiRoutes from "@app/api/apiRoutes";
import { mockFetch } from "@tests/mocks/fetch";

describe("Tag Button Group", () => {
  const defaultTag = mockTags[0];
  it("renders", async () => {
    const page = new TagButtonGroupPage(defaultTag);

    page.render();
    expect(await page.editDialogButton()).toBeInTheDocument();
    expect(await page.deleteDialogButton()).toBeInTheDocument();
  });

  describe("delete dialog", () => {
    it("opens", async () => {
      const page = new TagButtonGroupPage(defaultTag);

      page.render();
      expect(await page.deleteDialogButton()).toBeInTheDocument();
      await page.openDeleteDialog();
      expect(await page.deleteDialog.dialog()).toBeVisible();
      expect(await page.deleteDialog.contentText()).toBeVisible();
      expect(await page.deleteDialog.cancelButton()).toBeVisible();
      expect(await page.deleteDialog.okButton()).toBeVisible();
    });

    it("closes", async () => {
      const page = new TagButtonGroupPage(defaultTag);

      page.render();
      expect(await page.deleteDialogButton()).toBeInTheDocument();
      await page.openDeleteDialog();
      expect(await page.deleteDialog.dialog()).toBeVisible();
      await page.closeDeleteDialog();
      expect(await page.deleteDialog.dialog()).not.toBeVisible();
    });

    it("deletes", async () => {
      const page = new TagButtonGroupPage(defaultTag);

      page.render();
      expect(await page.deleteDialogButton()).toBeVisible();
      await page.openDeleteDialog();
      await page.deleteDialog.deleteTag();
      await waitFor(async () => {
        expect(mockFetch).toHaveBeenCalledWith(
          ApiRoutes.tags.deleteTagRoute(defaultTag.id),
          {
            method: "DELETE",
          }
        );
        expect(mockUseRouter.refresh).toHaveBeenCalledTimes(1);
        expect(await page.deleteDialog.dialog()).not.toBeVisible();
      });
    });
  });

  describe("edit dialog", () => {
    it("opens", async () => {
      const page = new TagButtonGroupPage(defaultTag);

      page.render();
      expect(await page.editDialogButton()).toBeInTheDocument();
      await page.openEditDialog();
      expect(await page.editDialog.dialog()).toBeInTheDocument();
      expect(await page.editDialog.contentText()).toBeInTheDocument();
      expect(await page.editDialog.cancelButton()).toBeInTheDocument();
      expect(await page.editDialog.okButton()).toBeInTheDocument();
    });

    it("closes", async () => {
      const page = new TagButtonGroupPage(defaultTag);

      page.render();
      expect(await page.editDialogButton()).toBeInTheDocument();
      await page.openEditDialog();
      expect(await page.editDialog.dialog()).toBeVisible();
      await page.closeEditDialog();
      expect(await page.editDialog.dialog()).not.toBeVisible();
    });

    it("edits", async () => {
      const newName = "Cleaner Code";
      const page = new TagButtonGroupPage(defaultTag);

      page.render();
      expect(await page.editDialogButton()).toBeVisible();
      await page.openEditDialog();
      await page.editDialog.editTag(defaultTag.name, newName);
      await waitFor(async () => {
        expect(mockFetch).toHaveBeenCalledWith(
          ApiRoutes.tags.editTagRoute(defaultTag.id),
          {
            body: JSON.stringify({ ...defaultTag, name: newName }),
            method: "PUT",
          }
        );
        expect(mockUseRouter.refresh).toHaveBeenCalledTimes(1);
        expect(await page.editDialog.dialog()).not.toBeVisible();
      });
    });
  });
});
