"use client"
import { appointmentService } from "@/services/appointment";
import { IAvailableTime } from "@/types/appointment.type";
import { Box, Button, CircularProgress, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ConfirmBookingDialog from "./ConfirmBookingDialog";
import dayjs from 'dayjs';

type AvailableTimeProps = {
  staffId: string;
}

const daysName = ['Sun', 'Mon', 'Tu', 'Wed', 'Thur', 'Fr', 'St'];
const timeArray = [8,9,10,11,12,13,14,15,16,17,18];

export default function AvailableTime({ staffId }: AvailableTimeProps) {
  const [dateRange, setDateRange] = useState({ startDate: new Date(), endDate: dayjs().add(7, 'day').toDate() });
  const [selectedDateTime, setSelectedDateTime] = useState<null | Date>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  
  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['availableTime', staffId, dateRange],
		queryFn: () => appointmentService.getAvailableTime(staffId, dateRange.startDate.toString(), dateRange.endDate.toString())
  })

  function changeWeekForward() {
    setDateRange((prevRange) => ({ startDate: dayjs(prevRange.startDate).add(7, 'day').toDate(), endDate:  dayjs(prevRange.endDate).add(7, 'day').toDate() }))
  }

  function changeWeekBackward() {
    setDateRange((prevRange) => ({ startDate: dayjs(prevRange.startDate).subtract(7, 'day').toDate(), endDate: dayjs(prevRange.endDate).subtract(7, 'day').toDate() }))
  }

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
        <Typography variant="h6">Available time</Typography>
        <Divider />
        <Box display="flex" alignItems="center" marginY={2}>
          <Button 
            disabled={new Date().getDate() === dateRange.startDate.getDate()} 
            variant="outlined"
            onClick={changeWeekBackward}
          >
              Prev
          </Button>
          <Typography marginX={2}>{`${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`}</Typography>
          <Button variant="outlined" onClick={changeWeekForward}>Next</Button>
        </Box>
        {isSuccess && 
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
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {data && renderAvailableTime(hour).map((time, index) => (
                    <TableCell key={index} sx={{ height: '58px', padding: '10px', border: '1px solid rgba(224, 224, 224, 1)' }}>
                      {time && <Button onClick={() => handleDateSelect(time, index)}>{`${time}:00`}</Button>}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>}
        {isFetching && <CircularProgress sx={{ position: 'relative', left: '50%' }} />}
      </Box>
      {(data && selectedDateTime) && <ConfirmBookingDialog
        isOpen={openConfirmDialog}
        closeDialog={closeDialog}
        doctorId={staffId}
        bookingDateTime={selectedDateTime}
      />}
      {isError && 
        <Typography 
          variant="h6" 
          color="error"
          textAlign="center"
        >Error. Try again</Typography>
      }
    </>
  )
}
