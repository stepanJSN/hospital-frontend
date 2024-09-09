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
  convertDayOfWeekToString: (dayOfWeek: number) => string;
  renderAvailableTime: (
    data: Array<IAvailableTime>,
    currentTime: number,
  ) => (number | null)[];
  handleDateSelect: (time: number, dayOfWeek: number) => void;
};

export default function TimeTable({
  data,
  timeArray,
  convertDayOfWeekToString,
  renderAvailableTime,
  handleDateSelect,
}: TimeTableProps) {
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
