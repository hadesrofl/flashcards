import handleServerError from "@app/api/handleServerError";
import IdParamProps from "@app/flashcards/_shared/props/IdParamProps";
import StatusCodes from "@customTypes/StatusCodes";
import { Tag } from "@prisma/client";
import dbContext from "@server/repositories/dbContext";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
    const tag: Tag = await request.json();
    try {
      await dbContext.tags.edit(tag);
      return new Response(undefined, { status: StatusCodes.NoContent });
    } catch (error) {
      return handleServerError(error);
    }
}

export async function DELETE(_request: NextRequest, { params }: IdParamProps) {
  const { id } = params;
  try {
    await dbContext.tags.deleteById(Number.parseInt(id));
    return new Response(undefined, { status: StatusCodes.NoContent });
  } catch (error) {
    return handleServerError(error);
  }
}
