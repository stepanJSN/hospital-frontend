import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';

type TimeSelectProps = {
  handleClose: () => void;
  handleDateSelect: (time: number, date: string) => void;
  selectedDate: {
    availableTime: number[];
    date: string;
  } | null;
};

export default function TimeSelect({
  handleClose,
  selectedDate,
  handleDateSelect,
}: TimeSelectProps) {
  return (
    <Dialog
      open={!!selectedDate}
      onClose={handleClose}
      aria-labelledby="select-time-dialog"
    >
      <DialogTitle id="select-time-dialog">
        {selectedDate &&
          new Date(selectedDate.date).toLocaleDateString() + ' | Select time'}
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {selectedDate?.availableTime.map((time) => (
          <Button
            key={time}
            onClick={() => handleDateSelect(time, selectedDate.date)}
          >{`${time}:00`}</Button>
        ))}
      </DialogContent>
    </Dialog>
  );
}
