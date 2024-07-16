import { Alert, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'

type NotificationProps = {
  trigger: boolean;
  type?: 'error' | 'success';
  text?: string;
}

export default function Notification({trigger, type = "error", text = "Error. Try again later"}: NotificationProps) {
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
