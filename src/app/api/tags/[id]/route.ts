import handleServerError from "@app/api/handleServerError";
import IdParamProps from "@app/flashcards/_shared/props/IdParamProps";
import StatusCodes from "@customTypes/StatusCodes";
import dbContext from "@server/repositories/dbContext";
import { NextRequest } from "next/server";

export async function DELETE(_request: NextRequest, { params }: IdParamProps) {
  const { id } = params;
  try {
    await dbContext.tags.deleteById(Number.parseInt(id));
    return new Response(undefined, { status: StatusCodes.NoContent });
  } catch (error) {
    return handleServerError(error);
  }
}
