import { NextRequest } from "next/server";
import handleServerError from "../../_internal/shared/errors/handleServerError";
import dbContext from "@app/api/_internal/shared/db/dbContext";
import StatusCodes from "@app/api/_internal/shared/StatusCodes";
import { FlashCardWithTags } from "@domain/flashcard/models/flashcard";
import IdParamProps from "@app/[lang]/flashcards/_shared/props/IdParamProps";

export async function GET(_request: NextRequest, { params }: IdParamProps) {
  const { id } = params;
  try {
    const flashCard = await dbContext.flashCards.getById(Number.parseInt(id));
    return Response.json(flashCard, { status: StatusCodes.OK });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function PUT(request: NextRequest) {
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
