import Notification from "@/components/Notifications";
import { getUserId } from "@/services/auth-token";
import { scheduleService } from "@/services/schedule";
import { IChangeSchedule, ISchedule } from "@/types/schedule.type";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useDebounce, useRenderCount } from "@uidotdev/usehooks";
import { ChangeEvent, useEffect, useState } from "react";

type ScheduleTableProps = {
  days: string[];
  schedule: ISchedule[];
  refetch: () => void;
}

type Schedule = {
  dayOfWeek: number;
  startTime: number;
  endTime: number;
  disabled: boolean
} 

const defaultSchedule = Array.from({ length: 7 }, (_, i) => ({
  dayOfWeek: i,
  startTime: 8,
  endTime: 18,
  disabled: true,
}))

export default function ScheduleTable({ schedule, days, refetch }: ScheduleTableProps) {
  const [scheduleData, setScheduleData] = useState<Schedule[]>(defaultSchedule);
  const debouncedScheduleData = useDebounce(scheduleData, 2000);
  const renderCount = useRenderCount();

  const { mutate, isPending, isError, isSuccess } = useMutation({
		mutationFn: (data: IChangeSchedule) => scheduleService.update(data),
    onError: refetch
	})

  useEffect(() => {
    const updatedSchedule = scheduleData.map(item => {
      const newItem = schedule.find(s => s.dayOfWeek === item.dayOfWeek);
      return newItem ? { disabled: false, ...newItem } : item;
    });
    setScheduleData(updatedSchedule);
  }, [schedule]);

  useEffect(() => {
    const query = async () => {
      if (renderCount > 6) {
        const staffId = await getUserId() as string
        mutate({
          staffId,
          schedule: scheduleData.filter(scheduleItem => !scheduleItem.disabled),
        });
      }
    }
    query();
  }, [debouncedScheduleData]);

  const handleTimeChange = (index: number, type: 'startTime'| 'endTime', event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newTime = +event.target.value;

    setScheduleData(prevData => 
      prevData.map((item, i) => 
        i === index ? { ...item, [type]: newTime } : item
      )
    );
  };

  const changeDayType = (dayOfWeek: number) => {
    setScheduleData(prevData => {
      return prevData.map((item) => 
        item.dayOfWeek === dayOfWeek ? { ...item, disabled: !item.disabled, } : item
      )
    }
    );
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650, }} aria-label="schedule table">
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Start time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Day Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduleData.map((scheduleItem, index) => (
              <TableRow
                key={scheduleItem.dayOfWeek}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {days[scheduleItem.dayOfWeek]}
                </TableCell>
                <TableCell align="right">
                  <TextField
                    size="small"
                    margin='dense'
                    disabled={scheduleItem.disabled}
                    value={scheduleItem.startTime}
                    label="Start time"
                    onChange={(event) => handleTimeChange(index, 'startTime', event)}
                    type="number"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    size="small"
                    margin='dense'
                    disabled={scheduleItem.disabled}
                    value={scheduleItem.endTime}
                    onChange={(event) => handleTimeChange(index, 'endTime', event)}
                    label="Start time"
                    type="number"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button 
                    onClick={() => changeDayType(scheduleItem.dayOfWeek)}
                    variant={scheduleItem.disabled ? "contained" : "outlined"}
                    sx={{ width: '280px' }}
                  >{scheduleItem.disabled ? "Make it a non-business day" : "Make it a business day"}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Notification trigger={isSuccess} type="success" text="Schedule updated" />
      <Notification trigger={isError} text="Error. Schedule was not updated" />
    </>
  )
}
