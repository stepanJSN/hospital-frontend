import useGetDoctors from '@/hooks/useGetDoctroData';
import { appointmentService } from '@/services/appointment';
import { IAppointmentPayload } from '@/types/appointment.type';
import { CustomErrorType } from '@/types/axiosError.type';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useEffect } from 'react';

type ConfirmBookingDialogProps = {
  isOpen: boolean;
  closeDialog: () => void;
  doctorId: string;
  bookingDateTime: Date;
}

export default function ConfirmBookingDialog({ 
  isOpen, closeDialog, doctorId, bookingDateTime,
}: ConfirmBookingDialogProps) {
  const queryClient = useQueryClient();
  const { doctorData } = useGetDoctors(doctorId);

  const { mutate, isPending, isError, error, reset } = useMutation({
		mutationFn: (data: IAppointmentPayload) => appointmentService.makeAppointment(data),
    onSuccess: () => {closeDialog(); queryClient.invalidateQueries({ queryKey: ['availableTime'] }) },
  })

  const confirmAppointment = () => {
    mutate({
      staffId: doctorId,
      dateTime: dayjs(bookingDateTime).format('YYYY-MM-DDTHH:mm:ss.SSS'),
    });
  }

  useEffect(() => {
    reset();
  }, [isOpen]);

  return (
    <Dialog
        open={isOpen}
        onClose={closeDialog}
      >
        <Box display="flex">
          <DialogTitle sx={{ width: '300px' }}>Confirm your booking</DialogTitle>
          <IconButton aria-label="close dialog" onClick={closeDialog} sx={{ width: '64px' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          {isError && 
            <Alert severity="error" sx={{ maxWidth: '300px' }}>
              {(error as AxiosError).response?.status === 400 ? 
              (error as AxiosError<CustomErrorType>).response?.data?.message
              : "Error. Try again"}
            </Alert>
          }
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
