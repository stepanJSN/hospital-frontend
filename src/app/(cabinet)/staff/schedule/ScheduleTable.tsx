import { ISchedule } from "@/types/schedule.type";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useState } from "react";

type ScheduleTableProps = {
  schedule: ISchedule[];
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ScheduleTable({ schedule }: ScheduleTableProps) {
  const [scheduleData, setScheduleData] = useState(schedule);


  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="schedule table">
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell align="right">Start time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">Day Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scheduleData.map((scheduleItem, index) => (
            <TableRow
              key={scheduleItem.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {days[scheduleItem.dayOfWeek]}
              </TableCell>
              <TableCell align="right">
                <TextField
                  size="small"
                  margin='dense'
                  value={scheduleItem.startTime}
                  label="Start time"
                 // onChange={event => setScheduleData(previousData => [...previousData, previousData[index].startTime = +event.target.value])}
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  size="small"
                  margin='dense'
                  value={scheduleItem.endTime}
                  label="Start time"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                <Button 
                  variant="outlined" 
                >{scheduleItem.startTime ? 'Make it a non-business day' : 'Make it a business day'}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
