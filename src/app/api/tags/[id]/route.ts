import handleServerError from "@app/api/handleServerError";
import StatusCodes from "@customTypes/StatusCodes";
import dbContext from "@server/repositories/dbContext";
import { NextRequest } from "next/server";

interface TagRouteParams {
  params: {
    id: string;
  };
}

export async function DELETE(
  _request: NextRequest,
  { params }: TagRouteParams
) {
  const { id } = params;
  try {
    await dbContext.tags.deleteById(Number.parseInt(id));
    return new Response(undefined, { status: StatusCodes.NoContent });
  } catch (error) {
    return handleServerError(error);
  }
}
