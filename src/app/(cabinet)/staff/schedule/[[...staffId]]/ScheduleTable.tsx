import AdaptiveButton from '@/app/components/Buttons/AdaptiveButton';
import Notification from '@/app/components/Notifications';
import DataTable from '@/app/components/Table/DataTable';
import { workingHours } from '@/config/workingHours';
import { scheduleService } from '@/services/schedule';
import { IChangeSchedule, ISchedule } from '@/types/schedule.type';
import { IconButton, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { ChangeEvent, useEffect, useState } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import WorkOffIcon from '@mui/icons-material/WorkOff';

type ScheduleTableProps = {
  staffId: string;
  days: string[];
  schedule: ISchedule[];
};

export default function ScheduleTable({
  staffId,
  schedule,
  days,
}: ScheduleTableProps) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const queryClient = useQueryClient();
  const [scheduleData, setScheduleData] = useState(schedule);
  const debouncedScheduleData = useDebounce(scheduleData, 1500);

  const { mutate, isError, isSuccess } = useMutation({
    mutationFn: (data: IChangeSchedule) => scheduleService.update(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['schedule'] }),
  });

  useEffect(() => {
    if (JSON.stringify(debouncedScheduleData) !== JSON.stringify(schedule)) {
      mutate({
        staffId,
        schedule: debouncedScheduleData.filter(
          (
            scheduleItem,
          ): scheduleItem is {
            dayOfWeek: number;
            startTime: number;
            endTime: number;
          } => scheduleItem.startTime !== null && scheduleItem.endTime !== null,
        ),
      });
    }
  }, [debouncedScheduleData, mutate, schedule, staffId]);

  const handleTimeChange = (
    dayOfWeek: number,
    type: 'startTime' | 'endTime',
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newTime = +event.target.value;

    setScheduleData((prevData) =>
      prevData.map((item) =>
        item.dayOfWeek === dayOfWeek ? { ...item, [type]: newTime } : item,
      ),
    );
  };

  const changeDayType = (dayOfWeek: number) => {
    setScheduleData((prevData) => {
      return prevData.map((item) =>
        item.dayOfWeek === dayOfWeek
          ? {
              ...item,
              startTime: item.startTime ? null : workingHours.from,
              endTime: item.endTime ? null : workingHours.to,
            }
          : item,
      );
    });
  };

  return (
    <>
      <DataTable
        keyExtractor={(row) => row.dayOfWeek}
        data={scheduleData}
        columns={[
          {
            header: 'Day',
            accessor: (scheduleItem) => days[scheduleItem.dayOfWeek],
          },
          {
            header: 'From',
            accessor: (scheduleItem) => (
              <TextField
                size="small"
                margin="dense"
                disabled={!scheduleItem.startTime}
                value={scheduleItem.startTime ?? workingHours.from}
                label="From"
                onChange={(event) =>
                  handleTimeChange(scheduleItem.dayOfWeek, 'startTime', event)
                }
                InputProps={{
                  inputProps: { min: workingHours.from, max: workingHours.to },
                }}
                type="number"
                variant="outlined"
              />
            ),
          },
          {
            header: 'To',
            accessor: (scheduleItem) => (
              <TextField
                size="small"
                margin="dense"
                disabled={!scheduleItem.endTime}
                value={scheduleItem.endTime ?? workingHours.to}
                onChange={(event) =>
                  handleTimeChange(scheduleItem.dayOfWeek, 'endTime', event)
                }
                InputProps={{
                  inputProps: { min: workingHours.from, max: workingHours.to },
                }}
                label="To"
                type="number"
                variant="outlined"
              />
            ),
          },
          {
            header: '',
            align: 'right',
            accessor: (scheduleItem) =>
              isTablet ? (
                <IconButton
                  aria-label="change status"
                  size="medium"
                  onClick={() => changeDayType(scheduleItem.dayOfWeek)}
                >
                  {!scheduleItem.startTime ? (
                    <WorkIcon fontSize="inherit" color="primary" />
                  ) : (
                    <WorkOffIcon fontSize="inherit" color="secondary" />
                  )}
                </IconButton>
              ) : (
                <AdaptiveButton
                  onClick={() => changeDayType(scheduleItem.dayOfWeek)}
                  variant={!scheduleItem.startTime ? 'contained' : 'outlined'}
                  sx={{ width: '280px' }}
                >
                  {!!scheduleItem.startTime
                    ? 'Make it a non-business day'
                    : 'Make it a business day'}
                </AdaptiveButton>
              ),
          },
        ]}
      />
      {isSuccess && <Notification type="success" text="Schedule updated" />}
      {isError && <Notification text="Error. Schedule was not updated" />}
    </>
  );
}
