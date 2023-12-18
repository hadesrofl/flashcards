import { NextRequest } from "next/server";
import handleServerError from "../../handleServerError";
import StatusCodes from "@customTypes/StatusCodes";
import dbContext from "@server/repositories/dbContext";

interface FlashCardRouteParams {
  params: {
    id: string;
  };
}

export async function DELETE(
  _request: NextRequest,
  { params }: FlashCardRouteParams
) {
  const { id } = params;
  try {
    await dbContext.flashCards.deleteById(Number.parseInt(id));
    return new Response(undefined, { status: StatusCodes.NoContent });
  } catch (error) {
    return handleServerError(error);
  }
}
