import DataTable from "@/app/components/Table/DataTable";
import { IAppointment } from "@/types/appointment.type"
import { Button } from "@mui/material";
import dayjs from "dayjs";

type CustomerAppointmentsTable = {
  data: IAppointment[];
  setAppointmentId: (id: string) => void;
}

export default function CustomerAppointmentsTable({ data, setAppointmentId }: CustomerAppointmentsTable) {
  return (
    <DataTable
      keyExtractor={(row) => row.id}
      data={data}
      columns={[
        { header: 'Date and Time', accessor: (row) => dayjs(row.dateTime).format('DD.MM.YYYY HH:mm') },
        { header: 'Name Surname', accessor: (row) => `${row.staff?.name} ${row.staff?.surname}` },
        { header: 'Specialization', accessor: (row) => row.staff?.specialization.title },
        { header: 'Status', accessor: (row) => row.isCompleted ? 'Completed' : 'Planned' },
        { 
          header: 'Action', 
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
          ) 
        },
      ]}
    />
  )
}