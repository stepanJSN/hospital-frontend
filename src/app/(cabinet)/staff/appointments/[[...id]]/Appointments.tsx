"use client"

import { appointmentService } from "@/services/appointment";
import { Box, Button, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link as UILink } from "@mui/material";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import DeleteDialog from "@/components/Dialogs/DeleteDialog";
import Loader from "@/components/Loader";
import Notification from "@/components/Notifications";
import ExportExcel from "@/components/ExportExcel";
import { IAppointment, IGetStaffAppointmentsForm } from "@/types/appointment.type";
import { useForm } from "react-hook-form";
import AppointmentsActionBar from "./AppointmentsActionBar";
import { removeEmptyFields } from "@/helpers/removeEmptyFields";
import StaffAppointmentsTable from "./StaffAppointmentsTable";

type AppointmentsProps = {
  staffId?: string;
}

const currentDate = dayjs().hour(0).minute(0);

export default function Appointments({ staffId }: AppointmentsProps) {
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [filterData, setFilterData] = useState<IGetStaffAppointmentsForm>({ isCompleted: false });
  const {
    control,
    handleSubmit,
    getValues,
  } = useForm<IGetStaffAppointmentsForm>();

  const { refetch, data, isFetching, isError, isSuccess } = useQuery({
    queryKey: staffId
    ? ["staffAppointments", staffId, filterData]
    : ["staffAppointments", filterData],
		queryFn: async () => appointmentService.getByUserId({ returnType: 'customer', ...filterData }, staffId),
    placeholderData: keepPreviousData,
  })

  const onSubmit = () => setFilterData(removeEmptyFields(getValues()));

  const { mutate, isSuccess: isChangeStatusSuccess,  isError: isChangeStatusError } = useMutation({
		mutationFn: (data: { id: string, status: boolean }) => appointmentService.changeStatus(data.id, { isCompleted: data.status }),
    onSettled: () => refetch(),
	})

  const { mutate: deleteMutation, isPending: isDeletePending, isError: isDeleteError } = useMutation({
		mutationFn: () => appointmentService.delete(appointmentId as string),
    onSuccess: () => { refetch(); closeDialog() },
	})

  const handleDelete = () => deleteMutation();
  const closeDialog = () => setAppointmentId(null);

  const mapData = (data: IAppointment[]) => {
    return data.map(item => ({ 
      DateOfAppointment: dayjs(item.dateTime).format('DD.MM.YYYY HH:mm'), 
      PatientName: item.customer.name,
      PatientSurname: item.customer.surname,
      AppointmentStatus: item.isCompleted ? 'Completed' : 'Planned'
    }));
  }

  return (
    <Box marginY={2} marginX={1}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" component="h1">Appointments:</Typography>
        {isSuccess && <ExportExcel data={mapData(data)} fileName="appointments" />}
      </Box>
      <AppointmentsActionBar
         handleSubmit={handleSubmit}
         onSubmit={onSubmit}
         control={control}
         isFetching={isFetching}
      />
      {isFetching && <LinearProgress sx={{ my: 1 }} />}
      {isSuccess && data?.length !== 0 && 
        <StaffAppointmentsTable 
          data={data}
          changeAppointmentStatus={mutate}
          setAppointmentId={setAppointmentId}
        />
      }
      {isSuccess && data?.length === 0 && 
        <Typography 
          textAlign="center" 
          component="h3" 
          variant="h6"
        >{"You don't have any appointments."}</Typography>
      }
      {isError && 
        <Typography 
          textAlign="center"
          component="h3" 
          variant="h5"
          color="error"
          mt={4}
        >Error. Try again</Typography>
      }
      <DeleteDialog
        open={!!appointmentId}
        isLoading={isDeletePending}
        isError={isDeleteError}
        title="Are you sure you want to cancel the appointment?"
        content="The patient will receive a notification about cancelation."
        handleClose={closeDialog}
        handleDelete={handleDelete}
      />
      <Notification 
        trigger={isChangeStatusSuccess}
        type="success"
        text="The status of the appointment was changed"
      />
      <Notification 
        trigger={isChangeStatusError}
        text="Error. Failed to change the status of the appointment"
      />
    </Box>
  )
}
