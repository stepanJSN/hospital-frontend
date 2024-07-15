"use client"
import { appointmentService } from "@/services/appointment";
import { IAvailableTime } from "@/types/appointment.type";
import { Box, Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ConfirmBookingDialog from "./ConfirmBookingDialog";

type AvailableTimeProps = {
  staffId: string;
}

const daysName = ['Sun', 'Mon', 'Tu', 'Wed', 'Thur', 'Fr', 'St'];
const timeArray = [9,10,11,12,13,14,15,16,17,18];

export default function AvailableTime({ staffId }: AvailableTimeProps) {
  const [dateRange, setDateRange] = useState({ startDate: new Date(), endDate: new Date(new Date().setDate(new Date().getDate() + 7)) });
  const [selectedDateTime, setSelectedDateTime] = useState<null | Date>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  
  const { refetch: queryRefetch, data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['appointment', staffId, dateRange],
		queryFn: () => appointmentService.getAvailableTime(staffId, dateRange.startDate.toString(), dateRange.endDate.toString())
  })

  function renderAvailableTime(currentTime: number) {
    const availableTimeArray: Array<number | null> = [];
    for (let i = 0; i < 7; i++) {
      
      if (Object.keys((data as Array<IAvailableTime>)[i]).includes('startTime') && ((data as Array<IAvailableTime>)[i].startTime as number <= currentTime) && ((data as Array<IAvailableTime>)[i].endTime as number >= currentTime) && !(data as Array<IAvailableTime>)[i].bookedTime.includes(currentTime)) {
        availableTimeArray.push(currentTime);
      } else {
        availableTimeArray.push(null);
      }
    }
    return availableTimeArray;
  }

  function handleDateSelect(time: number, numberOfDays: number) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + numberOfDays);
    currentDate.setHours(time, 0, 0, 0);
    setSelectedDateTime(currentDate);
    openDialog();
  }

  const closeDialog = () => setOpenConfirmDialog(false);
  const openDialog = () => setOpenConfirmDialog(true);

  return (
    <>
      <Box>
        <Typography>Available time</Typography>
        <Divider />
        <Button>Prev</Button>
        <Typography>{`${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`}</Typography>
        <Button>Next</Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="appointment table">
            <TableHead>
              <TableRow>
                {data?.map((day) => (
                  <TableCell key={day.dayOfWeek}>{`${new Date(day.dayOfWeek).toLocaleDateString()} ${daysName[new Date(day.dayOfWeek).getDay()]}`}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {timeArray?.map((hour) => (
                <TableRow
                  key={hour}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {data && renderAvailableTime(hour).map((time, index) => (
                    <TableCell key={index}>
                      {time && <Button onClick={() => handleDateSelect(time, index)}>{`${time}:00`}</Button>}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {(data && selectedDateTime) && <ConfirmBookingDialog
        isOpen={openConfirmDialog}
        closeDialog={closeDialog}
        doctorId={staffId}
        bookingDateTime={selectedDateTime}
        refetchAppointments={queryRefetch}
      />}
    </>
  )
}
