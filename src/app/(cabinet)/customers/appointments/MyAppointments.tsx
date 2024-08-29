"use client"

import { useState } from "react";
import { appointmentService } from "@/services/appointment";
import { Box, LinearProgress, Typography } from "@mui/material";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import AppointmentsActionBar from "./AppointmentsActionBar";
import DeleteDialog from "@/components/Dialogs/DeleteDialog";
import { IGetCustomerAppointmentsForm } from "@/types/appointment.type";
import CustomerAppointmentsTable from "./CustomerAppointmentsTable";
import { removeEmptyFields } from "@/helpers/removeEmptyFields";
import Error from "@/components/Errors/Error";
import NoDataMessage from "@/components/Errors/NoDataMessage";

export default function MyAppointments() {
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [filterData, setFilterData] = useState<IGetCustomerAppointmentsForm>({ isCompleted: false });
  const {
    control,
    handleSubmit,
    getValues,
  } = useForm<IGetCustomerAppointmentsForm>();

  const { refetch: queryRefetch, data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['customerAppointments', filterData],
		queryFn: () => {
      return appointmentService.getByUserId({ returnType: 'staff', ...filterData });
    },
    placeholderData: keepPreviousData,
  })
  
  const onSubmit = () => setFilterData(removeEmptyFields(getValues()));

  const { mutate, isPending, isError: isDeleteError } = useMutation({
		mutationFn: () => appointmentService.delete(appointmentId as string),
    onSuccess: () => { closeDialog(); queryRefetch() },
  })

  const closeDialog = () => setAppointmentId(null);
  const handleDelete = () => mutate();

  return (
    <Box margin={1}>
      <Typography variant="h5" component="h1">Your appointments:</Typography>
      <AppointmentsActionBar
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        control={control}
        isFetching={isFetching}
      />
      {isFetching && <LinearProgress sx={{ my: 1 }} />}
      {isSuccess && data.length !== 0 && 
        <CustomerAppointmentsTable 
          data={data} 
          setAppointmentId={(id) => setAppointmentId(id)} 
        /> 
      }
      {isSuccess && data?.length === 0 && 
        <NoDataMessage message="You don't have any doctor's appointments." />
      }
      {isError && <Error refetch={queryRefetch} />}
      <DeleteDialog
        open={!!appointmentId}
        isLoading={isPending}
        isError={isDeleteError}
        title="Are you sure you want to cancel the appointment?"
        content="After cancellation, you can always make an appointment again."
        handleClose={closeDialog}
        handleDelete={handleDelete}
      />
    </Box>
  )
}
