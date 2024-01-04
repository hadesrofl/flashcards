import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog,
  DialogTitle,
} from "@mui/material";

type Color =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

export interface DialogButtonProps {
  label: string;
  color: Color;
}

export interface ActionDialogProps {
  titleText: string;
  contentText: string;
  cancelButton: DialogButtonProps;
  okButton: DialogButtonProps;
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
}

export default function ActionDialog({
  titleText,
  contentText,
  cancelButton,
  okButton,
  open,
  onCancel,
  onOk,
}: ActionDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="action-dialog-title"
      aria-describedby="action-dialog-description"
    >
      <DialogTitle id="action-dialog-title">{titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="action-dialog-description"
          whiteSpace="break-spaces"
        >
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color={cancelButton.color} onClick={onCancel}>
          {cancelButton.label}
        </Button>
        <Button color={okButton.color} onClick={onOk} autoFocus>
          {okButton.label}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
