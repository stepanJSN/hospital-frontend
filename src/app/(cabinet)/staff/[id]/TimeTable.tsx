import { IAvailableTime } from '@/types/staff.type';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

type TimeTableProps = {
  data: IAvailableTime[];
  timeArray: number[];
  convertDayOfWeekToString: (dayOfWeek: string) => string;
  handleDateSelect: (time: number, dayOfWeek: number) => void;
};

export default function TimeTable({
  data,
  timeArray,
  convertDayOfWeekToString,
  handleDateSelect,
}: TimeTableProps) {
  function renderAvailableTime(
    data: Array<IAvailableTime>,
    currentTime: number,
  ) {
    const availableTimeArray: Array<number | null> = [];
    for (let i = 0; i < 7; i++) {
      if (
        Object.hasOwn(data[i], 'startTime') &&
        data[i].startTime <= currentTime &&
        data[i].endTime >= currentTime &&
        !data[i].bookedTime.includes(currentTime)
      ) {
        availableTimeArray.push(currentTime);
      } else {
        availableTimeArray.push(null);
      }
    }
    return availableTimeArray;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="appointment table">
        <TableHead>
          <TableRow>
            {data?.map((day) => (
              <TableCell key={day.dayOfWeek} sx={{ p: { xs: 1 } }}>
                {convertDayOfWeekToString(day.dayOfWeek)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeArray?.map((hour) => (
            <TableRow key={hour}>
              {data &&
                renderAvailableTime(data, hour).map((time, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      height: '58px',
                      padding: '10px',
                      border: '1px solid rgba(224, 224, 224, 1)',
                    }}
                  >
                    {time && (
                      <Button
                        onClick={() => handleDateSelect(time, index)}
                      >{`${time}:00`}</Button>
                    )}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
