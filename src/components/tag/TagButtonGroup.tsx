"use client";

import { Edit } from "@mui/icons-material";
import { Stack, IconButton } from "@mui/material";
import { Tag } from "@prisma/client";
import React from "react";
import ApiRoutes from "@app/api/apiRoutes";
import DeleteButton from "@components/buttons/DeleteButton";

interface TagButtonGroupProps {
  tag: Tag;
}

export default function TagButtonGroup({ tag }: TagButtonGroupProps) {
  const deleteTag = async (tag: Tag | object) => {
    if ("id" in tag) {
      await fetch(ApiRoutes.tags.deleteTagRoute(tag.id), {
        method: "Delete",
      });
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <IconButton color="primary" disabled>
        <Edit />
      </IconButton>
      <DeleteButton record={tag} refreshPage onClick={deleteTag} />
    </Stack>
  );
}
