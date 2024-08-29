import { Alert, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'

type NotificationProps = {
  trigger: boolean;
  type?: 'error' | 'success';
  text?: string;
  position?: {
    vertical: 'top' | 'bottom';
    horizontal: 'center' | 'left' |'right';
  }
}

export default function Notification({trigger, type = "error", text = "Error. Unable to load data", position}: NotificationProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (trigger) {
      setIsOpen(true);
    }
  }, [trigger]);

  const handleClose = () => setIsOpen(false);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={position}
    >
      <Alert
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
        onClose={handleClose}
      >
        {text}
      </Alert>
    </ Snackbar>
  )
}
