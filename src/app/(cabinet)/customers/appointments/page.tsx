"use client"

import { appointmentService } from "@/services/appointment";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import AppointmentsActionBar from "./AppointmentsActionBar";
import Loader from "@/components/Loader";
import DeleteDialog from "@/components/Dialogs/DeleteDialog";

export type FormPayloadType = {
  startdate?: string;
  enddate?: string;
}

export default function MyAppointments() {
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    getValues,
  } = useForm<FormPayloadType>();

  const { refetch: queryRefetch, data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['myAppointments'],
		queryFn: () => {
      const data = getValues()
      return appointmentService.getMyAppointment(data.startdate, data.enddate)
    },
  })
  
  const onSubmit = () => queryRefetch();

  const { mutate, isPending, isError: isDeleteError } = useMutation({
    mutationKey: ['cancelAppointment'],
		mutationFn: () => appointmentService.deleteMyAppointment(appointmentId as string),
    onSuccess: () => { closeDialog(); queryRefetch() },
  })

  const closeDialog = () => setAppointmentId(null);
  const handleDelete = () => mutate();

  return (
    <Box margin={2} width="100%">
      <Typography variant="h5" component="h1">Your appointments:</Typography>
      <AppointmentsActionBar
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        control={control}
        isFetching={isFetching}
      />
      {isSuccess && data.length !== 0 &&
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="doctors table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Date and Time</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name Surname</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Specialization</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isSuccess && data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {dayjs(row.dateTime).format('DD.MM.YYYY HH:mm')}
                </TableCell>
                <TableCell>{`${row.staff.name} ${row.staff.surname}`}</TableCell>
                <TableCell>{row.staff.specialization.title}</TableCell>
                <TableCell>{row.isCompleted ? 'Completed' : 'Planned'}</TableCell>
                <TableCell align="right">
                  <Button 
                    variant="outlined"
                    color="error"
                    disabled={row.isCompleted}
                    onClick={() => setAppointmentId(row.id)}
                  >Cancel</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
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
      <Loader isLoading={isFetching} />
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
