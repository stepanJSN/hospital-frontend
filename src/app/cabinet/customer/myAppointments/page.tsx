"use client"

import DatePicker from "@/components/DatePicker";
import { appointmentService } from "@/services/appointment";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type FormPayloadType = {
  startdate?: string;
  enddate?: string;
}

export default function MyAppointments() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormPayloadType>();

  const { refetch: queryRefetch, data, isFetching, error, isSuccess } = useQuery({
    queryKey: ['myAppointments'],
		queryFn: () => {
      const data = getValues()
      return appointmentService.getMyAppointment(data.startdate, data.enddate)
    },
  })
  
  const onSubmit = () => queryRefetch();

  return (
    <Box margin={2} width="100%">
      <Typography variant="h4" component="h1">Your appointments:</Typography>
      <Box
        component="form" 
        display="flex"
        alignItems="center"
        onSubmit={handleSubmit(onSubmit)}
        gap={2}
        marginY={2}
      >
        <DatePicker
          control={control}
          label="StartDate"
          required={false}
         />
         <Divider sx={{ width: '20px' }} />
         <DatePicker
          control={control}
          label="EndDate"
          required={false}
         />
         <LoadingButton 
            loading={isFetching}
            variant="contained" 
            fullWidth
            type="submit"
            loadingPosition="start"
            sx={{
              height: "56px",
              width: "250px"
            }}
          >
            Show
          </LoadingButton>
      </Box>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="doctors table">
        <TableHead>
          <TableRow>
            <TableCell>Date and Time</TableCell>
            <TableCell align="right">Name Surname</TableCell>
            <TableCell align="right">Specialization</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isSuccess && data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {`${new Date(row.dateTime).toLocaleDateString()} ${new Date(row.dateTime).toLocaleTimeString()}`}
              </TableCell>
              <TableCell align="right">{`${row.staff.name} ${row.staff.surname}`}</TableCell>
              <TableCell align="right">{row.staff.specialization.title}</TableCell>
              <TableCell align="right">
                <Button 
                  variant="outlined"
                  color="error"
                >Cancel</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  )
}
