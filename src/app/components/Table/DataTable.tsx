import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { CSSProperties } from 'react';

type Column<T> = {
  accessor: (row: T) => React.ReactNode;
  header?: string;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  align?: 'left' | 'right' | 'center';
  sx?: CSSProperties;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string | number;
  isHeader?: boolean;
  handleRowClick?: (row: T) => void;
};

export default function DataTable<T>({
  data,
  columns,
  keyExtractor,
  isHeader = true,
  handleRowClick,
}: DataTableProps<T>) {
  return (
    <TableContainer component={Paper} sx={{ mt: 1 }}>
      <Table aria-label="generic table">
        {isHeader && (
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.header}
                  align={column.align || 'left'}
                  sx={{
                    fontWeight: '600',
                    display: {
                      xs:
                        column.hideOnMobile || column.hideOnTablet
                          ? 'none'
                          : 'table-cell',
                      sm: column.hideOnTablet ? 'none' : 'table-cell',
                      md: 'table-cell',
                    },
                    padding: {
                      xs: '10px',
                      md: '16px',
                    },
                  }}
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={keyExtractor(row)}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': {
                  background: handleRowClick ? '#adabab5c' : 'white',
                  cursor: handleRowClick ? 'pointer' : 'default',
                },
              }}
              onClick={handleRowClick ? () => handleRowClick(row) : undefined}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.header}
                  align={column.align || 'left'}
                  sx={{
                    display: {
                      xs:
                        column.hideOnMobile || column.hideOnTablet
                          ? 'none'
                          : 'table-cell',
                      sm: column.hideOnTablet ? 'none' : 'table-cell',
                      md: 'table-cell',
                    },
                    padding: {
                      xs: '10px',
                      md: '16px',
                    },
                    ...column.sx,
                  }}
                >
                  {column.accessor(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
