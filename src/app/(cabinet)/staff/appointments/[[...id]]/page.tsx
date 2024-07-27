"use client"

import { appointmentService } from "@/services/appointment";
import { Box, Button, Divider, FormControlLabel, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link as UILink } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserId } from "@/services/auth-token";
import { useParams } from "next/navigation";
import DeleteDialog from "@/components/Dialogs/DeleteDialog";
import Loader from "@/components/Loader";
import Notification from "@/components/Notifications";
import ExportExcel from "@/components/ExportExcel";
import { IStaffAppointments } from "@/types/appointment.type";

const currentDate = dayjs().hour(0).minute(0);

type filtersType = {
  startDate: dayjs.Dayjs | null,
  endDate: dayjs.Dayjs | null,
  isCompleted: boolean,
}

export default function Appointments() {
  const { id } = useParams<{ id: string[] }>();
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [filters, setFilters] = useState<filtersType>({ 
    startDate: currentDate,
    endDate: null,
    isCompleted: false,
  });

  const getId = async () => {
    return id ? id[0] : await getUserId() as string;
  }

  const { refetch, data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['appointments'],
		queryFn: async () => appointmentService.getByStaff({
      staffId: await getId(),
      startDate: filters.startDate?.toISOString(),
      endDate: filters.endDate?.toISOString(),
      isCompleted: filters.isCompleted,
    })
  })

  const { mutate, isSuccess: isChangeStatusSuccess,  isError: isChangeStatusError } = useMutation({
		mutationFn: (data: { id: string, status: boolean }) => appointmentService.changeStatus(data.id, { isCompleted: data.status }),
    onSettled: () => refetch(),
	})

  const { mutate: deleteMutation, isPending: isDeletePending, isError: isDeleteError } = useMutation({
		mutationFn: () => appointmentService.deleteMyAppointment(appointmentId as string),
    onSuccess: () => { refetch(); closeDialog() },
	})

  const handleDelete = () => deleteMutation();
  const closeDialog = () => setAppointmentId(null);

  const mapData = (data: IStaffAppointments[]) => {
    return data.map(item => ({ 
      DateOfAppointment: dayjs(item.dateTime).format('DD.MM.YYYY HH:mm'), 
      PatientName: item.customer.name,
      PatientSurname: item.customer.surname,
      AppointmentStatus: item.isCompleted ? 'Completed' : 'Planned'
    }));
  }

  useEffect(() => {
    refetch();
  }, [filters.startDate, filters.endDate, filters.isCompleted, refetch]);

  return (
    <Box margin={2} width="100%">
      <Typography variant="h5" component="h1">Appointments:</Typography>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        marginY={2}
      >
        <DatePicker
          label="StartDate"
          value={filters.startDate}
          onChange={value => setFilters(prevState => ({ ...prevState, startDate: value }))}
          slotProps={{ textField: { size: 'small' } }}
          sx={{ 
            width: 'auto',
          }}
         />
         <Divider sx={{ width: '20px' }} />
         <DatePicker
          label="EndDate"
          value={filters.endDate}
          onChange={value => setFilters(prevState => ({ ...prevState, endDate: value }))}
          slotProps={{ textField: { size: 'small' } }}
          sx={{ 
            width: 'auto',
          }}
         />
         <FormControlLabel control={
          <Switch 
            checked={!filters.isCompleted}
            onChange={(event) => setFilters(prevState => ({ ...prevState, isCompleted: !event.target.checked }))}
          />
         } label="show only scheduled" />
         {isSuccess && <ExportExcel data={mapData(data)} fileName="appointments" />}
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="appointments table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Date and Time</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name Surname</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isSuccess && data?.length !== 0 && data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {dayjs(row.dateTime).format('DD.MM.YYYY HH:mm')}
                </TableCell>
                <TableCell>
                  <UILink 
                    component={Link}
                    href={`/customer/${row.customer.id}`}
                  >
                    {`${row.customer.name} ${row.customer.surname}`}
                  </UILink>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color={row.isCompleted ? "error" : "success"}
                    onClick={() => mutate({ id: row.id , status: !row.isCompleted})}
                    sx={{ width: "220px" }}
                  >
                    {row.isCompleted ? "Mark as uncompleted" : "Mark as completed"}
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button 
                    variant="outlined"
                    color="error"
                    disabled={row.isCompleted}
                    onClick={() => setAppointmentId(row.id)}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
