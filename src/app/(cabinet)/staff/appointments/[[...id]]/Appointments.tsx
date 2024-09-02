"use client"

import { appointmentService } from "@/services/appointment";
import { Box, LinearProgress, Typography} from "@mui/material";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import DeleteDialog from "@/components/Dialogs/DeleteDialog";
import Notification from "@/components/Notifications";
import ExportExcel from "@/components/ExportExcel";
import { IAppointment, IGetStaffAppointmentsForm } from "@/types/appointment.type";
import { useForm } from "react-hook-form";
import AppointmentsActionBar from "./AppointmentsActionBar";
import { removeEmptyFields } from "@/helpers/removeEmptyFields";
import StaffAppointmentsTable from "./StaffAppointmentsTable";
import Error from "@/components/Errors/Error";
import NoDataMessage from "@/components/Errors/NoDataMessage";

type AppointmentsProps = {
  staffId?: string;
}

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

  const { mutate: deleteMutation, isPending: isDeletePending, isError: isDeleteError, reset } = useMutation({
		mutationFn: () => appointmentService.delete(appointmentId as string),
    onSuccess: () => { refetch(); closeDialog() },
	})

  const handleDelete = () => deleteMutation();
  const closeDialog = () => { setAppointmentId(null); reset(); };

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
        <NoDataMessage message="Appointments not found" />
      }
      {isError && <Error refetch={refetch} />}
      <DeleteDialog
        open={!!appointmentId}
        isLoading={isDeletePending}
        isError={isDeleteError}
        title="Are you sure you want to cancel the appointment?"
        content="The patient will receive a notification about cancelation."
        handleClose={closeDialog}
        handleDelete={handleDelete}
      />
      {isChangeStatusSuccess && 
        <Notification
          type="success"
          text="The status of the appointment was changed"
        />
      }
      {isChangeStatusError && 
        <Notification 
          text="Error. Failed to change the status of the appointment"
        />
      }
    </Box>
  )
}
