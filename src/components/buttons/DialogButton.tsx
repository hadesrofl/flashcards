import ActionDialog, { ActionDialogProps } from "@components/ActionDialog";
import React, { ReactNode, useState } from "react";
import { IconButtonProps, IconButton } from "@mui/material";

interface DeleteButtonWithDialogProps
  extends IconButtonProps,
    Omit<ActionDialogProps, "open" | "onCancel" | "onOk"> {
  onClick: () => void;
  icon: ReactNode;
}

export default function DialogButton({
  onClick,
  icon,
  titleText,
  contentText,
  cancelButton,
  okButton,
  ...props
}: DeleteButtonWithDialogProps) {
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
