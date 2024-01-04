"use client";

import { Edit } from "@mui/icons-material";
import { Stack, IconButton } from "@mui/material";
import { Tag } from "@prisma/client";
import React from "react";
import ApiRoutes from "@app/api/apiRoutes";
import DeleteDialogButton, {
  DeleteDialogButtonProps,
} from "@components/buttons/DeleteDialogButton";
import Delete from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import InputDialogButton, {
  InputDialogButtonProps,
} from "@components/buttons/InputDialogButton";
import { DeleteButtonProps } from "@components/buttons/DeleteButton";

interface TagButtonGroupProps {
  tag: Tag;
}

export default function TagButtonGroup({ tag }: TagButtonGroupProps) {
  const router = useRouter();
  const deleteButtonProps: Omit<DeleteDialogButtonProps, "icon" | "onClick"> = {
    titleText: "Delete Tag",
    contentText: `Are you sure, you want to delete the Tag: ${tag.name}`,
    cancelButton: { label: "Cancel", color: "primary" },
    okButton: { label: "Delete", color: "error" },
  };

  const inputButtonProps: Omit<InputDialogButtonProps, "icon" | "onOk"> = {
    titleText: "Edit Tag",
    contentText: `Please enter the new name for the tag: ${tag.name}`,
    cancelButton: { label: "Cancel", color: "error" },
    okButton: { label: "Save", color: "success" },
    label: "Tag",
  };

  const deleteTag = async () => {
    if ("id" in tag) {
      try {
        await fetch(ApiRoutes.tags.deleteTagRoute(tag.id), {
          method: "Delete",
        });
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editTag = async (text: string) => {
    tag.name = text;
    try {
      await fetch(ApiRoutes.tags.editTagRoute(tag.id), {
        body: JSON.stringify(tag),
        method: "PUT",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <InputDialogButton
        value={tag.name}
        label={inputButtonProps.label}
        onOk={editTag}
        icon={<Edit />}
        titleText={inputButtonProps.titleText}
        contentText={inputButtonProps.contentText}
        cancelButton={inputButtonProps.cancelButton}
        okButton={inputButtonProps.okButton}
      />
      <DeleteDialogButton
        color="error"
        onClick={deleteTag}
        icon={<Delete />}
        titleText={deleteButtonProps.titleText}
        contentText={deleteButtonProps.contentText}
        cancelButton={deleteButtonProps.cancelButton}
        okButton={deleteButtonProps.okButton}
      />
    </Stack>
  );
}
