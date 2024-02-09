"use client";
import AppRoutes from "@app/appRoutes";
import { DialogButtonProps } from "@components/lib/dialogs/ActionDialog";
import YesNoDialog from "@components/lib/dialogs/YesNoDialog";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";

export default function NoTagDialog() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const theme = useTheme();
  const dictionary = useContext(DictionaryContext);
  const titleText = dictionary.NoTagDialog.title;
  const contentText = dictionary.NoTagDialog.contextText;
  const noButton: DialogButtonProps = {
    label: dictionary.NoTagDialog.buttons.no,
    color: "error",
  };
  const yesButton: DialogButtonProps = {
    label: dictionary.NoTagDialog.buttons.yes,
    color: "primary",
  };
  const onNo = () => {
    setOpen(false);
    router.push(AppRoutes.flashCardRoutes.collections([]));
  };
  const onYes = () => {
    setOpen(false);
    router.push(AppRoutes.flashCardRoutes.create);
  };

  return (
    <YesNoDialog
      titleText={titleText}
      contentText={contentText}
      borderColor={theme.palette.primary.main}
      noButton={noButton}
      yesButton={yesButton}
      onNo={onNo}
      onYes={onYes}
      open={open}
    />
  );
}
