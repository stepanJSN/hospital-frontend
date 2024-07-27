import { IDoctorShort } from "@/types/staff.type";
import { TableCell, TableContainer, TableHead, TableRow, Table, TableBody, Paper, Button } from "@mui/material";
import Link from "next/link";

type DataTableType = {
  data: IDoctorShort[]
}

export default function DataTable({ data }: DataTableType) {
  return (
    <TableContainer component={Paper} sx={{ mt: 1 }}>
      <Table sx={{ minWidth: 650 }} aria-label="doctors table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: '600' }}>Name Surname</TableCell>
            <TableCell sx={{ fontWeight: '600' }}>Specialization</TableCell>
            <TableCell sx={{ fontWeight: '600' }}>Experience</TableCell>
            <TableCell sx={{ fontWeight: '600' }}>Gender</TableCell>
            <TableCell align="right" sx={{ fontWeight: '600' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {`${row.name} ${row.surname}`}
              </TableCell>
              <TableCell>{row.specialization?.title}</TableCell>
              <TableCell>{row.experience}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell align="right">
                <Button 
                  variant="outlined" 
                  component={Link}
                  href={`/staff/${row.id}`}
                >Visit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
