import StatusCodes from "@customTypes/StatusCodes";
import { FlashCardWithTags } from "@customTypes/models/flashcard";
import { NextRequest } from "next/server";
import dbContext from "@server/repositories/dbContext";
import handleServerError from "../handleServerError";

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
