import { appointmentService } from '@/services/appointment';
import { LoadingButton } from '@mui/lab'
import { Alert, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { useMutation } from '@tanstack/react-query';
import React from 'react'

type CancelDialogProps = {
  id: string;
  isOpen: boolean;
  closeDialog: () => void;
  refetchMyAppointments: () => void;
}

export default function CancelDialog({ id, isOpen, closeDialog, refetchMyAppointments } : CancelDialogProps) {
  const { mutate, isPending, error, isError } = useMutation({
    mutationKey: ['cancelAppointment'],
		mutationFn: () => appointmentService.deleteMyAppointment(id),
    onSuccess: () => {closeDialog(); refetchMyAppointments() },
  })

  const cancelAppointment = () => mutate();

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
    >
      {!!error && <Alert 
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        Error. Try again later
      </Alert>}
      <DialogTitle>
        {"Confirm cancelation"}
      </DialogTitle>
      <DialogActions>
        <LoadingButton color="error" loading={isPending} onClick={cancelAppointment}>Confirm</LoadingButton>
        <Button onClick={closeDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
