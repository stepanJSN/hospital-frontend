import { IAvailableTime } from '@/types/staff.type';
import { Button, List, ListItem, ListItemText } from '@mui/material';

type DateListProps = {
  data: IAvailableTime[];
  convertDayOfWeekToString: (dayOfWeek: string) => string;
  handleDateSelect: (data: { availableTime: number[]; date: string }) => void;
};

export default function DateList({
  data,
  convertDayOfWeekToString,
  handleDateSelect,
}: DateListProps) {
  function renderAvailableTimeMobileView(data: IAvailableTime) {
    const availableTimeArray: Array<number> = [];
    for (let index = data.startTime; index < data.endTime; index++) {
      if (!data.bookedTime.includes(index)) {
        availableTimeArray.push(index);
      }
    }
    return availableTimeArray;
  }

  return (
    <List sx={{ width: '100%' }}>
      {data?.map(
        (day) =>
          renderAvailableTimeMobileView(day).length > 0 && (
            <ListItem key={day.dayOfWeek} alignItems="center">
              <Button
                fullWidth
                variant="outlined"
                onClick={() =>
                  handleDateSelect({
                    availableTime: renderAvailableTimeMobileView(day),
                    date: day.dayOfWeek,
                  })
                }
              >
                <ListItemText
                  primary={convertDayOfWeekToString(day.dayOfWeek)}
                />
              </Button>
            </ListItem>
          ),
      )}
    </List>
  );
}
