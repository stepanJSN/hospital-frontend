import { IUser } from "@/types/customer.type";
import { TableCell, TableContainer, TableHead, TableRow, Table, TableBody, Paper, Button } from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";

type CustomerDataTableType = {
  data: IUser[]
  onClick: (id: string) => void;
}

export default function CustomerDataTable({ data, onClick }: CustomerDataTableType) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="doctors table">
        <TableHead>
          <TableRow>
            <TableCell>Name Surname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telephone</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link href={`/customers/${row.id}`}>{`${row.name} ${row.surname}`}</Link>
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.telephone}</TableCell>
              <TableCell>{dayjs(row.birthday).format('DD.MM.YYYY')}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>
                <Button 
                  variant="outlined"
                  color="error"
                  onClick={() => onClick(row.id)}
                >Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
