import DataTable from '@/app/components/Table/DataTable';
import { ISpecialization } from '@/types/specialization.type';
import { Button } from '@mui/material';

type SpecializationsDataTableType = {
  data: ISpecialization[];
  onDelete: (id: string) => void;
  onEdit: (id: string, value: string) => void;
};

export default function SpecializationsDataTable({
  data,
  onDelete,
  onEdit,
}: SpecializationsDataTableType) {
  return (
    <DataTable
      keyExtractor={(row) => row.id}
      data={data}
      columns={[
        {
          header: 'Title',
          sx: { width: '95%' },
          accessor: (row) => row.title,
        },
        {
          header: '',
          accessor: (row) => (
            <Button
              variant="outlined"
              onClick={() => onEdit(row.id, row.title)}
            >
              Edit
            </Button>
          ),
        },
        {
          header: '',
          accessor: (row) => (
            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(row.id)}
            >
              Delete
            </Button>
          ),
        },
      ]}
    />
  );
}
