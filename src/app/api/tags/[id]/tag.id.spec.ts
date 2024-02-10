/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { DELETE, PUT } from "./route";
import StatusCodes from "@app/api/_internal/shared/StatusCodes";
import { mockTags } from "@tests/mockData/mockTags";
import { prismaMock } from "@tests/setup/prisma";
import { mockFlashcards } from "@tests/mockData/mockFlashcards";
import { ApiRequest, ApiResponse } from "@tests/mocks/fetch";

jest.mock("next/cache");

describe("/tags/[id] routes", () => {
  describe("Update Tag", () => {
    it("updates tag", async () => {
      const tag = mockTags[0];
      tag.name = "Bla blub";
      const body = { tag };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "PUT",
        body,
      });

      req.json = jest.fn().mockResolvedValue(body.tag);
      const response = await PUT(req);

      expect(prismaMock.tag.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.tag.update).toHaveBeenCalledWith({
        where: { id: tag.id },
        data: tag,
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.NoContent);
    });

    it("updates tag but it stays the same", async () => {
      const tag = mockTags[0];
      const body = { tag };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "PUT",
        body,
      });

      req.json = jest.fn().mockResolvedValue(body.tag);
      const response = await PUT(req);

      expect(prismaMock.tag.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.tag.update).toHaveBeenCalledWith({
        where: { id: tag.id },
        data: tag,
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.NoContent);
    });

    it("handles error", async () => {
      prismaMock.tag.update.mockRejectedValue("Update failed");
      const tag = mockTags[0];
      const body = { tag };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "PUT",
        body,
      });

      req.json = jest.fn().mockResolvedValue(body.tag);
      const response = await PUT(req);

      expect(prismaMock.tag.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.tag.update).toHaveBeenCalledWith({
        where: { id: tag.id },
        data: tag,
      });
      expect(response).toBeTruthy();
      expect(await response.json()).toEqual({
        message: "Update failed",
        statusCode: StatusCodes.InternalServerError,
      });
      expect(response.status).toBe(StatusCodes.InternalServerError);
    });
  });

  describe("Deletes Tag", () => {
    it("deletes tag", async () => {
      const tag = mockTags[0];
      const params = { params: { id: `${tag.id}` } };
      prismaMock.flashcard.findMany.mockResolvedValue(
        mockFlashcards.filter((card) => card.tags.includes(tag))
      );
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "DELETE",
      });

      const response = await DELETE(req, params);

      expect(prismaMock.tag.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.tag.delete).toHaveBeenCalledWith({
        where: { id: tag.id },
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.NoContent);
    });

    it("handles error", async () => {
      prismaMock.tag.delete.mockRejectedValue("Delete failed");
      const tag = mockTags[0];
      const params = { params: { id: `${tag.id}` } };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "DELETE",
      });

      const response = await DELETE(req, params);

      expect(prismaMock.tag.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.tag.delete).toHaveBeenCalledWith({
        where: { id: tag.id },
      });
      expect(response).toBeTruthy();
      expect(await response.json()).toEqual({
        message: "Delete failed",
        statusCode: StatusCodes.InternalServerError,
      });
      expect(response.status).toBe(StatusCodes.InternalServerError);
    });
  });
});
