import AdaptiveButton from '@/app/components/Buttons/AdaptiveButton';
import DataTable from '@/app/components/Table/DataTable';
import { ISpecialization } from '@/types/specialization.type';

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
      isHeader={false}
      columns={[
        {
          header: 'Title',
          sx: { width: '95%' },
          accessor: (row) => row.title,
        },
        {
          header: 'Edit',
          accessor: (row) => (
            <AdaptiveButton
              variant="outlined"
              onClick={() => onEdit(row.id, row.title)}
            >
              Edit
            </AdaptiveButton>
          ),
        },
        {
          header: 'Delete',
          accessor: (row) => (
            <AdaptiveButton
              variant="outlined"
              color="error"
              onClick={() => onDelete(row.id)}
            >
              Delete
            </AdaptiveButton>
          ),
        },
      ]}
    />
  );
}
