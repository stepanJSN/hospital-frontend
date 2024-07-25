import { ISpecialization } from "@/types/specialization.type";
import { TableCell, TableContainer, TableHead, TableRow, Table, TableBody, Paper, Button } from "@mui/material";

type SpecializationsDataTableType = {
  data: ISpecialization[]
  onDelete: (id: string) => void;
  onEdit: (id: string, value: string) => void;
}

export default function SpecializationsDataTable({ data, onDelete, onEdit }: SpecializationsDataTableType) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="doctors table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: '700' }}>Title</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell 
                component="th" 
                scope="row"
                sx={{ width: '95%' }}
              >
                {row.title}
              </TableCell>
              <TableCell>
                <Button 
                  variant="outlined"
                  onClick={() => onEdit(row.id, row.title)}
                >Edit</Button>
              </TableCell>
              <TableCell>
                <Button 
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(row.id)}
                >Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
