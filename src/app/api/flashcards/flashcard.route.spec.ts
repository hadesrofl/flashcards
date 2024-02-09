/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { GET, POST } from "./route";
import StatusCodes from "@app/api/_internal/shared/StatusCodes";
import { prismaMock } from "@tests/setup/prisma";
import { mockFlashcards } from "@tests/mockData/mockFlashcards";
import { ApiRequest, ApiResponse } from "@tests/mocks/fetch";
import { FlashCardWithTags } from "@domain/flashcard/models/flashcard";
import { CreateFlashCardWithTags } from "@domain/flashcard/factories/FlashCardWithTagsFactory";

jest.mock("next/cache");

describe("/flashcards routes", () => {
  describe("Get all Cards", () => {
    it("get all cards", async () => {
      prismaMock.flashcard.findMany.mockResolvedValue(mockFlashcards);

      const response = await GET();

      expect(prismaMock.flashcard.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.flashcard.findMany).toHaveBeenCalledWith({
        where: undefined,
        skip: undefined,
        take: undefined,
        include: { tags: true },
      });
      expect(response).toBeTruthy();
      expect(await response.json()).toEqual(
        mockFlashcards.map((card) => {
          return {
            ...card,
            // add qoutes to mock data
            createdAt: "" + card.createdAt.toISOString() + "",
            updatedAt: "" + card.updatedAt.toISOString() + "",
            tags: card.tags.map((tag) => {
              return {
                ...tag,
                createdAt: "" + tag.createdAt.toISOString() + "",
              };
            }),
          };
        })
      );
      expect(response.status).toBe(StatusCodes.OK);
    });

    it("handles error", async () => {
      prismaMock.flashcard.findMany.mockRejectedValue("Couldn't get all cards");

      const response = await GET();

      expect(prismaMock.flashcard.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.flashcard.findMany).toHaveBeenCalledWith({
        where: undefined,
        skip: undefined,
        take: undefined,
        include: { tags: true },
      });
      expect(response).toBeTruthy();
      expect(await response.json()).toEqual({
        message: "Couldn't get all cards",
        statusCode: StatusCodes.InternalServerError,
      });
      expect(response.status).toBe(StatusCodes.InternalServerError);
    });
  });

  describe("Create Card", () => {
    it("creates new card", async () => {
      const card: FlashCardWithTags = CreateFlashCardWithTags(
        "What hurts?",
        "I can't remember",
        "Don't don't memories hurt."
      );
      const body = { card };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "POST",
        body,
      });
      prismaMock.flashcard.create.mockResolvedValue({ ...card, id: 3 });
      req.json = jest.fn().mockResolvedValue(body.card);

      const response = await POST(req);

      expect(prismaMock.flashcard.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.flashcard.create).toHaveBeenCalledWith({
        data: {
          ...card,
          id: undefined,
          tags: {
            connectOrCreate: card.tags.map((tag) => {
              return { where: { name: tag.name }, create: { name: tag.name } };
            }),
          },
        },

        include: { tags: true },
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.Created);
    });

    it("handles error", async () => {
      prismaMock.flashcard.create.mockRejectedValue(
        "Error while creating new card"
      );
      const card: FlashCardWithTags = CreateFlashCardWithTags(
        "What hurts?",
        "I can't remember",
        "Don't don't memories hurt."
      );
      const body = { card };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "POST",
        body,
      });
      req.json = jest.fn().mockResolvedValue(body.card);

      const response = await POST(req);

      expect(prismaMock.flashcard.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.flashcard.create).toHaveBeenCalledWith({
        data: {
          ...card,
          id: undefined,
          tags: {
            connectOrCreate: card.tags.map((tag) => {
              return { where: { name: tag.name }, create: { name: tag.name } };
            }),
          },
        },

        include: { tags: true },
      });
      expect(response).toBeTruthy();
      expect(await response.json()).toEqual({
        message: "Error while creating new card",
        statusCode: StatusCodes.InternalServerError,
      });
      expect(response.status).toBe(StatusCodes.InternalServerError);
    });
  });
});
