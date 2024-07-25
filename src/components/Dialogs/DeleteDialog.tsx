import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

type DeleteDialogProps = {
  open: boolean;
  title?: string
  handleClose: () => void;
  handleDelete: () => void;
}

export default function DeleteDialog({ open, title, handleClose, handleDelete }: DeleteDialogProps) {

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title ?? 'Are you sure you want to perform this action?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action cannot be undone. All data will be lost
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button color="error" onClick={handleDelete}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}
