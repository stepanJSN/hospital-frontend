"use client"
import Loader from "@/components/Loader"
import { notificationsService } from "@/services/notifications"
import { INotification } from "@/types/notifications.type"
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';

export default function Notifications() {
  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['notifications'],
		queryFn: () => notificationsService.getAllByUserId(),
  })

  function defineIcon(type: INotification['type']) {
    switch (type) {
      case 'Warning':
        return <WarningIcon sx={{ color: "yellow" }} />
      case 'Error':
        return <ReportIcon color="error" />
      default:
        return <InfoIcon color="primary" />
    }
  }

  return (
    <Box margin={2} width="100%">
      <Typography variant="h5" component="h1">Notifications:</Typography>
      {isSuccess && data.length !== 0 &&
      <TableContainer>
        <Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: '0 8px' }} aria-label="notifications table">
          <TableBody>
            {isSuccess && data.map((row) => (
              <TableRow
                component={Paper}
                key={row._id}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 }, 
                  background: row.isRead ? '#adabab5c': 'white',
                }}
              >
                <TableCell component="th" scope="row">
                  {defineIcon(row.type)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.senderName}
                </TableCell>
                <TableCell>{row.message}</TableCell>
                <TableCell>{row.isRead ? 'Read' : 'Unread'}</TableCell>
                <TableCell component="th" scope="row">{dayjs(row.date).format('DD.MM.YYYY HH:mm')}</TableCell>
                <TableCell align="right">
                  <Button 
                    variant="outlined"
                    disabled={row.isRead}
                  >Mark as read</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
      {isSuccess && data?.length === 0 && 
        <Typography 
          textAlign="center" 
          component="h3" 
          variant="h6"
        >{"You don't have any notifications."}</Typography>
      }
      {isError && 
        <Typography 
          textAlign="center"
          component="h3" 
          variant="h5"
          color="error"
          mt={4}
        >Error. Try again</Typography>
      }
      <Loader isLoading={isFetching} />
    </Box>
  )
}
