"use client"

import { appointmentService } from "@/services/appointment";
import { Box, LinearProgress, Typography } from "@mui/material";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AppointmentsActionBar from "./AppointmentsActionBar";
import Loader from "@/components/Loader";
import DeleteDialog from "@/components/Dialogs/DeleteDialog";
import { IGetCustomerAppointmentsForm } from "@/types/appointment.type";
import CustomerAppointmentsTable from "./CustomerAppointmentsTable";

export default function MyAppointments() {
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [filterData, setFilterData] = useState<IGetCustomerAppointmentsForm>({ isCompleted: true });
  const {
    control,
    handleSubmit,
    getValues,
  } = useForm<IGetCustomerAppointmentsForm>();

  const { refetch: queryRefetch, data, isFetching, isPending, isError, isSuccess } = useQuery({
    queryKey: ['customerAppointments', filterData],
		queryFn: () => {
      return appointmentService.getByUserId({ returnType: 'staff', ...filterData });
    },
    placeholderData: keepPreviousData,
  })
  
  const onSubmit = () => setFilterData(getValues());

  const { mutate, isError: isDeleteError } = useMutation({
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
      {isFetching && !isPending && <LinearProgress sx={{ my: 1 }} />}
      {isSuccess && data.length !== 0 && 
        <CustomerAppointmentsTable 
          data={data} 
          setAppointmentId={(id) => setAppointmentId(id)} 
        /> 
      }
      {isSuccess && data?.length === 0 && 
        <Typography 
          textAlign="center" 
          component="h3" 
          variant="h6"
        >{"You don't have any doctor's appointments."}</Typography>
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
      <Loader isLoading={isPending} />
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
