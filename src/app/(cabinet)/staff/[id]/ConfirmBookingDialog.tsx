import useGetDoctors from '@/hooks/useGetDoctroData';
import { appointmentService } from '@/services/appointment';
import { IAppointmentPayload } from '@/types/appointment.type';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

type ConfirmBookingDialogProps = {
  isOpen: boolean;
  closeDialog: () => void;
  refetchAppointments: () => void;
  doctorId: string;
  bookingDateTime: Date;
}

export default function ConfirmBookingDialog({ 
  isOpen, closeDialog, doctorId, bookingDateTime, refetchAppointments,
}: ConfirmBookingDialogProps) {
  const queryClient = useQueryClient();
  const { doctorData } = useGetDoctors(doctorId);

  const { mutate, isPending, isError } = useMutation({
		mutationFn: (data: IAppointmentPayload) => appointmentService.makeAppointment(data),
    onSuccess: () => {closeDialog(); queryClient.invalidateQueries({ queryKey: ['availableTime'] }) },
  })

  const confirmAppointment = () => {
    mutate({
      staffId: doctorId,
      dateTime: dayjs(bookingDateTime).format('YYYY-MM-DDTHH:mm:ss.SSS'),
    });
  }

  return (
    <Dialog
        open={isOpen}
        onClose={closeDialog}
      >
        <Box display="flex">
          <DialogTitle sx={{ maxWidth: '80%' }}>Confirm your booking</DialogTitle>
          <IconButton aria-label="close dialog" onClick={closeDialog} sx={{ width: '64px' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          {isError && <Alert severity="error">Error. Try again</Alert>}
          <Typography>{`Doctor: ${doctorData?.name} ${doctorData?.surname}`}</Typography>
          <Typography>{'Specialization: ' + doctorData?.specialization.title}</Typography>
          <Typography>{'Experience: ' + doctorData?.experience + ' year'}</Typography>
          <Typography>{'Email: ' + doctorData?.email}</Typography>
          <Typography>{'Telephone: ' + doctorData?.telephone}</Typography>
          <Typography>{'Gender: ' + doctorData?.gender}</Typography>
          <Typography>{'Room: ' + doctorData?.room}</Typography>
          <Typography>{'Date: ' + bookingDateTime?.toLocaleDateString()}</Typography>
          <Typography>{'Time: ' + bookingDateTime?.getHours() + ':00'}</Typography>
        </DialogContent>
        <LoadingButton loading={isPending} onClick={confirmAppointment}>Confirm</LoadingButton>
      </Dialog>
  )
}
