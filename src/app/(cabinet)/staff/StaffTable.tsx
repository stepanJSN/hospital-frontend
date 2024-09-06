import DataTable from '@/app/components/Table/DataTable';
import { IStaffShort } from '@/types/staff.type';
import { Button } from '@mui/material';
import Link from 'next/link';

type DataTableType = {
  data: IStaffShort[];
  isAdmin: boolean;
};

export default function StaffTable({ data, isAdmin }: DataTableType) {
  return (
    <DataTable
      keyExtractor={(row) => row.id}
      data={data}
      columns={[
        {
          header: 'Name Surname',
          accessor: (row) => `${row.name} ${row.surname}`,
        },
        {
          header: 'Specialization',
          hideOnMobile: true,
          accessor: (row) => row.specialization?.title,
        },
        {
          header: 'Experience',
          hideOnTablet: true,
          accessor: (row) => row.experience,
        },
        { header: 'Gender', hideOnTablet: true, accessor: (row) => row.gender },
        {
          header: 'Action',
          align: 'right',
          accessor: (row) => (
            <Button
              variant="outlined"
              component={Link}
              href={`/staff/${row.id}`}
            >
              {isAdmin ? 'Manage' : 'Visit'}
            </Button>
          ),
        },
      ]}
    />
  );
}
