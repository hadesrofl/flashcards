import { NextRequest } from "next/server";
import handleServerError from "../../handleServerError";
import StatusCodes from "@customTypes/StatusCodes";
import dbContext from "@server/repositories/dbContext";
import IdParamProps from "@app/flashcards/_shared/props/IdParamProps";
import { FlashCardWithTags } from "@customTypes/models/flashcard";

export async function GET(_request: NextRequest, { params }: IdParamProps) {
  const { id } = params;
  try {
    const flashCard = await dbContext.flashCards.getById(Number.parseInt(id));
    return Response.json(flashCard, { status: StatusCodes.OK });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function PUT(request: NextRequest, { params }: IdParamProps) {
  const flashcard: FlashCardWithTags = await request.json();
  try {
    await dbContext.flashCards.edit(flashcard);
    return new Response(undefined, { status: StatusCodes.NoContent });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: IdParamProps) {
  const { id } = params;
  try {
    await dbContext.flashCards.deleteById(Number.parseInt(id));
    return new Response(undefined, { status: StatusCodes.NoContent });
  } catch (error) {
    return handleServerError(error);
  }
}
