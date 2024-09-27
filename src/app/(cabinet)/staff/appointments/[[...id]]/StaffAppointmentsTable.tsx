import AdaptiveButton from '@/app/components/Buttons/AdaptiveButton';
import DataTable from '@/app/components/Table/DataTable';
import { IAppointment } from '@/types/appointment.type';
import {
  IconButton,
  Link as UILink,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import Link from 'next/link';

type StaffAppointmentsTable = {
  data: IAppointment[];
  changeAppointmentStatus: ({
    id,
    status,
  }: {
    id: string;
    status: boolean;
  }) => void;
  setAppointmentId: (id: string) => void;
};

export default function StaffAppointmentsTable({
  data,
  setAppointmentId,
  changeAppointmentStatus,
}: StaffAppointmentsTable) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <DataTable
      keyExtractor={(row) => row.id}
      data={data}
      columns={[
        {
          header: 'Date and Time',
          accessor: (row) => dayjs(row.dateTime).format('DD.MM.YYYY HH:mm'),
        },
        {
          header: 'Name Surname',
          accessor: (row) => (
            <UILink
              component={Link}
              href={`/customers/${row.customer.id}`}
            >{`${row.customer?.name} ${row.customer?.surname}`}</UILink>
          ),
        },
        {
          header: 'Status',
          hideOnTablet: true,
          accessor: (row) => (row.isCompleted ? 'Completed' : 'Planned'),
        },
        {
          header: 'Change status',
          align: 'right',
          accessor: (row) =>
            isTablet ? (
              <IconButton
                aria-label="change status"
                size="medium"
                sx={{
                  bgcolor: row.isCompleted ? 'error.main' : 'success.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: row.isCompleted ? 'error.main' : 'success.main',
                  },
                }}
              >
                <CheckIcon fontSize="inherit" />
              </IconButton>
            ) : (
              <AdaptiveButton
                variant="contained"
                color={row.isCompleted ? 'error' : 'success'}
                onClick={() =>
                  changeAppointmentStatus({
                    id: row.id,
                    status: !row.isCompleted,
                  })
                }
              >
                {row.isCompleted ? 'Mark as uncompleted' : 'Mark as completed'}
              </AdaptiveButton>
            ),
        },
        {
          header: 'Cancel',
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
