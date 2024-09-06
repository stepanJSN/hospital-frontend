import DataTable from '@/app/components/Table/DataTable';
import { IUser } from '@/types/customer.type';
import { Button } from '@mui/material';
import Link from 'next/link';

type CustomerDataTableType = {
  data: IUser[];
  onClick: (id: string) => void;
};

export default function CustomerDataTable({
  data,
  onClick,
}: CustomerDataTableType) {
  return (
    <DataTable
      keyExtractor={(row) => row.id}
      data={data}
      columns={[
        {
          header: 'Name Surname',
          accessor: (row) => (
            <Link
              href={`/customers/${row.id}`}
            >{`${row.name} ${row.surname}`}</Link>
          ),
        },
        { header: 'Email', hideOnMobile: true, accessor: (row) => row.email },
        {
          header: 'Telephone',
          hideOnTablet: true,
          accessor: (row) => row.telephone,
        },
        { header: 'Gender', hideOnTablet: true, accessor: (row) => row.gender },
        {
          header: 'Action',
          align: 'right',
          accessor: (row) => (
            <Button
              variant="outlined"
              color="error"
              onClick={() => onClick(row.id)}
            >
              Delete
            </Button>
          ),
        },
      ]}
    />
  );
}
