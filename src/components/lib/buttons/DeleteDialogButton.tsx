import React, { ReactNode, useState } from "react";
import { IconButtonProps, IconButton } from "@mui/material";
import ActionDialog, { ActionDialogProps } from "../dialogs/ActionDialog";

export interface DeleteDialogButtonProps
  extends IconButtonProps,
    Omit<ActionDialogProps, "open" | "onCancel" | "onOk"> {
  onClick: () => void;
  icon: ReactNode;
}

export default function DeleteDialogButton({
  onClick,
  icon,
  titleText,
  contentText,
  cancelButton,
  okButton,
  ...props
}: DeleteDialogButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnClick = () => {
    handleClose();
    onClick();
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} {...props}>
        {icon}
      </IconButton>
      <ActionDialog
        titleText={titleText}
        contentText={contentText}
        cancelButton={cancelButton}
        okButton={okButton}
        open={open}
        onCancel={handleClose}
        onOk={handleOnClick}
      />
    </>
  );
}
