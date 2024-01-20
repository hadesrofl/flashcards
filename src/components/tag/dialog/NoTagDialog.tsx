"use client";
import AppRoutes from "@app/appRoutes";
import { DialogButtonProps } from "@components/lib/dialogs/ActionDialog";
import YesNoDialog from "@components/lib/dialogs/YesNoDialog";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NoTagDialog() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const theme = useTheme();
  const titleText = "Create new Flashcard?";
  const contentText =
    "It seems there are no tags. You can create one together with a new card or by editing an existing one. Do you want to create a new card?";
  const noButton: DialogButtonProps = {
    label: "Return to Flashcard Collection",
    color: "error",
  };
  const onNo = () => {
    setOpen(false);
    router.push(AppRoutes.flashCardRoutes.collections([]));
  };
  const onYes = () => router.push(AppRoutes.flashCardRoutes.create);

  return (
    <YesNoDialog
      titleText={titleText}
      contentText={contentText}
      borderColor={theme.palette.primary.main}
      noButton={noButton}
      onNo={onNo}
      onYes={onYes}
      open={open}
    />
  );
}
