"use client";

import { Edit } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { Tag } from "@prisma/client";
import React, { useContext } from "react";
import ApiRoutes from "@app/api/apiRoutes";
import DeleteDialogButton, {
  DeleteDialogButtonProps,
} from "@components/lib/buttons/DeleteDialogButton";
import Delete from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import InputDialogButton, {
  InputDialogButtonProps,
} from "@components/lib/buttons/InputDialogButton";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";

interface TagButtonGroupProps {
  tag: Tag;
}

export default function TagButtonGroup({ tag }: TagButtonGroupProps) {
  const router = useRouter();
  const dictionary = useContext(DictionaryContext);
  const deleteButtonProps: Omit<DeleteDialogButtonProps, "icon" | "onClick"> = {
    titleText: dictionary.TagButtonGroup.deleteDialog.title,
    contentText: `${dictionary.TagButtonGroup.deleteDialog.contextText} ${tag.name}`,
    cancelButton: {
      label: dictionary.TagButtonGroup.deleteDialog.buttons.cancelLabel,
      color: "secondary",
    },
    okButton: {
      label: dictionary.TagButtonGroup.deleteDialog.buttons.okLabel,
      color: "error",
    },
  };

  const inputButtonProps: Omit<InputDialogButtonProps, "icon" | "onOk"> = {
    titleText: dictionary.TagButtonGroup.editDialog.title,
    contentText: `${dictionary.TagButtonGroup.editDialog.contextText} ${tag.name}`,
    cancelButton: {
      label: dictionary.TagButtonGroup.editDialog.buttons.cancelLabel,
      color: "error",
    },
    okButton: {
      label: dictionary.TagButtonGroup.editDialog.buttons.okLabel,
      color: "success",
    },
    label: dictionary.TagButtonGroup.editDialog.label,
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
        color="primary"
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
