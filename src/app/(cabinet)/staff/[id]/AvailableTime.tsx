'use client';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ConfirmBookingDialog from './ConfirmBookingDialog';
import dayjs from 'dayjs';
import { workingHours } from '@/config/workingHours';
import { staffService } from '@/services/staff';
import Error from '@/app/components/Errors/Error';
import TimeSelect from './TimeSelect';
import TimeTable from './TimeTable';
import DateList from './DateList';

type AvailableTimeProps = {
  staffId: string;
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const timeArray = Array.from(
  { length: workingHours.to - workingHours.from + 1 },
  (_, index) => workingHours.from + index,
);

export default function AvailableTime({ staffId }: AvailableTimeProps) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: dayjs().add(7, 'day').toDate(),
  });
  const [selectedDateTime, setSelectedDateTime] = useState<null | Date>(null);
  const [selectedDate, setSelectedDate] = useState<{
    availableTime: number[];
    date: string;
  } | null>(null);

  const { refetch, data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['availableTime', staffId, dateRange],
    queryFn: () =>
      staffService.getAvailableTime(
        staffId,
        dateRange.startDate.toString(),
        dateRange.endDate.toString(),
      ),
  });

  function changeWeekForward() {
    setDateRange((prevRange) => ({
      startDate: dayjs(prevRange.startDate).add(7, 'day').toDate(),
      endDate: dayjs(prevRange.endDate).add(7, 'day').toDate(),
    }));
  }

  function changeWeekBackward() {
    setDateRange((prevRange) => ({
      startDate: dayjs(prevRange.startDate).subtract(7, 'day').toDate(),
      endDate: dayjs(prevRange.endDate).subtract(7, 'day').toDate(),
    }));
  }

  function handleDateSelect(time: number, dayOfWeek: number, fromDate: Date) {
    const date = new Date(fromDate);
    date.setDate(date.getDate() + dayOfWeek);
    console.log(dayOfWeek);
    setDateTime(time, date.toISOString());
  }

  function setDateTime(time: number, date: string) {
    const currentDate = new Date(date);
    currentDate.setHours(time, 0, 0, 0);
    setSelectedDateTime(currentDate);
    setSelectedDate(null);
  }

  function convertDayOfWeekToString(dayOfWeek: string) {
    return `${new Date(dayOfWeek).toLocaleDateString()} ${DAYS[new Date(dayOfWeek).getDay()]}`;
  }

  const closeDialog = () => setSelectedDateTime(null);
  const closeTimeSelectDialog = () => setSelectedDate(null);

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
          <Typography
            marginX={2}
          >{`${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`}</Typography>
          <Button variant="outlined" onClick={changeWeekForward}>
            Next
          </Button>
        </Box>
        {isSuccess &&
          (isTablet ? (
            <DateList
              data={data}
              convertDayOfWeekToString={convertDayOfWeekToString}
              handleDateSelect={setSelectedDate}
            />
          ) : (
            <TimeTable
              data={data}
              timeArray={timeArray}
              convertDayOfWeekToString={convertDayOfWeekToString}
              handleDateSelect={(time, dayOfWeek) =>
                handleDateSelect(time, dayOfWeek, dateRange.startDate)
              }
            />
          ))}
        {isFetching && (
          <CircularProgress sx={{ position: 'relative', left: '50%' }} />
        )}
      </Box>
      {data && (
        <ConfirmBookingDialog
          closeDialog={closeDialog}
          staffId={staffId}
          bookingDateTime={selectedDateTime}
        />
      )}
      <TimeSelect
        selectedDate={selectedDate}
        handleClose={closeTimeSelectDialog}
        handleDateSelect={setDateTime}
      />
      {isError && <Error refetch={refetch} />}
    </>
  );
}
