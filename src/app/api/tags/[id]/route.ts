import IdParamProps from "@app/[lang]/flashcards/_shared/props/IdParamProps";
import StatusCodes from "@app/api/_internal/shared/StatusCodes";
import dbContext from "@app/api/_internal/shared/db/dbContext";
import handleServerError from "@app/api/_internal/shared/errors/handleServerError";
import { Tag } from "@prisma/client";
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
