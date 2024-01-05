import { NextRequest } from "next/server";
import handleServerError from "../_internal/shared/errors/handleServerError";
import { FlashCardWithTags } from "@domain/flashcard/models/flashcard";
import StatusCodes from "../_internal/shared/StatusCodes";
import dbContext from "../_internal/shared/db/dbContext";

export async function POST(request: NextRequest) {
  const flashcard: FlashCardWithTags = await request.json();
  try {
    await dbContext.flashCards.create(flashcard);
    return new Response(undefined, { status: StatusCodes.Created });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function GET() {
  try {
    const flashCards = await dbContext.flashCards.list();
    return Response.json(flashCards);
  } catch (error) {
    return handleServerError(error);
  }
}
