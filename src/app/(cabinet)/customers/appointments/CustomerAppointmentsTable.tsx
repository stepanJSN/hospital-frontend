import AdaptiveButton from '@/app/components/Buttons/AdaptiveButton';
import DataTable from '@/app/components/Table/DataTable';
import { IAppointment } from '@/types/appointment.type';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

type CustomerAppointmentsTable = {
  data: IAppointment[];
  setAppointmentId: (id: string) => void;
};

export default function CustomerAppointmentsTable({
  data,
  setAppointmentId,
}: CustomerAppointmentsTable) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <DataTable
      keyExtractor={(row) => row.id}
      data={data}
      columns={[
        {
          header: 'Date and Time',
          accessor: (row) =>
            dayjs(row.dateTime).format(
              isTablet ? 'DD.MM HH:mm' : 'DD.MM.YYYY HH:mm',
            ),
        },
        {
          header: 'Name Surname',
          accessor: (row) => `${row.staff?.name} ${row.staff?.surname}`,
        },
        {
          header: 'Specialization',
          hideOnTablet: true,
          accessor: (row) => row.staff?.specialization.title,
        },
        {
          header: 'Status',
          accessor: (row) => (row.isCompleted ? 'Completed' : 'Planned'),
        },
        {
          header: 'Action',
          align: 'right',
          accessor: (row) =>
            isTablet ? (
              <IconButton
                aria-label="change status"
                size="medium"
                sx={{
                  bgcolor: 'error.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'error.main' },
                }}
                onClick={() => setAppointmentId(row.id)}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            ) : (
              <AdaptiveButton
                variant="outlined"
                color="error"
                disabled={row.isCompleted}
                onClick={() => setAppointmentId(row.id)}
              >
                Cancel
              </AdaptiveButton>
            ),
        },
      ]}
    />
  );
}
