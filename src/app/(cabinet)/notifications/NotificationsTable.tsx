import { INotification } from '@/types/notifications.type';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import dayjs from 'dayjs';

type NotificationTableProps = {
  data: INotification[];
  setSelectedNotification: (notification: INotification) => void;
  changeMessageStatus: (notificationId: string) => void;
};

export default function NotificationsTable({
  data,
  setSelectedNotification,
  changeMessageStatus,
}: NotificationTableProps) {
  function defineIcon(type: INotification['type']) {
    switch (type) {
      case 'Warning':
        return <WarningIcon color="warning" />;
      case 'Error':
        return <ReportIcon color="error" />;
      default:
        return <InfoIcon color="primary" />;
    }
  }

  return (
    <TableContainer>
      <Table
        sx={{
          minWidth: 650,
          borderCollapse: 'separate',
          borderSpacing: '0 8px',
        }}
        aria-label="notifications table"
      >
        <TableBody>
          {data.map((row) => (
            <TableRow
              component={Paper}
              key={row._id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                background: row.isRead ? '#adabab5c' : 'white',
              }}
            >
              <TableCell component="th" scope="row">
                {defineIcon(row.type)}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.senderName}
              </TableCell>
              <TableCell
                sx={{ '&:hover': { cursor: 'pointer' } }}
                onClick={() => setSelectedNotification(row)}
              >
                {row.message.length > 25
                  ? `${row.message.substring(0, 23)}...`
                  : row.message}
              </TableCell>
              <TableCell>{row.isRead ? 'Read' : 'Unread'}</TableCell>
              <TableCell component="th" scope="row">
                {dayjs(row.date).format('DD.MM.YYYY HH:mm')}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  disabled={row.isRead}
                  onClick={() => changeMessageStatus(row._id)}
                >
                  Mark as read
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
