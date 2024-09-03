import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from '@mui/material';

type DeleteDialogProps = {
  open: boolean;
  title?: string;
  content?: string;
  isError?: boolean;
  isLoading?: boolean;
  handleClose: () => void;
  handleDelete: () => void;
};

export default function DeleteDialog({
  open,
  title,
  content,
  handleClose,
  handleDelete,
  isError,
  isLoading,
}: DeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title ?? 'Are you sure you want to perform this action?'}
        {isError && <Alert severity="error">Error. Try again</Alert>}
        {isLoading && <LinearProgress />}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content ?? 'This action cannot be undone. All data will be lost'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button color="error" onClick={handleDelete}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
