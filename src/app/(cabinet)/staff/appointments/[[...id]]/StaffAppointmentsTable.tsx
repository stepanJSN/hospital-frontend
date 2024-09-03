import DataTable from '@/app/components/Table/DataTable';
import { IAppointment } from '@/types/appointment.type';
import { Button, Link as UILink } from '@mui/material';
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
          accessor: (row) => (row.isCompleted ? 'Completed' : 'Planned'),
        },
        {
          header: '',
          align: 'right',
          accessor: (row) => (
            <Button
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
            </Button>
          ),
        },
        {
          header: '',
          align: 'right',
          accessor: (row) => (
            <Button
              variant="outlined"
              color="error"
              disabled={row.isCompleted}
              onClick={() => setAppointmentId(row.id)}
            >
              Cancel
            </Button>
          ),
        },
      ]}
    />
  );
}
