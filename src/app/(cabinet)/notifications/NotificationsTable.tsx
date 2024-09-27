import { INotification } from '@/types/notifications.type';
import { Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import DataTable from '@/app/components/Table/DataTable';
import dayjs from 'dayjs';
import { MouseEvent } from 'react';

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

  function handleRowClick(row: INotification) {
    setSelectedNotification(row);
  }

  function handleMarkAsRead(
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    rowId: string,
  ) {
    event.stopPropagation();
    changeMessageStatus(rowId);
  }

  return (
    <DataTable
      keyExtractor={(row) => row._id}
      data={data}
      isHeader={false}
      handleRowClick={handleRowClick}
      columns={[
        {
          header: 'Icon',
          accessor: (row) => defineIcon(row.type),
        },
        { header: 'Sender', accessor: (row) => row.senderName },
        {
          header: 'Message',
          hideOnTablet: true,
          accessor: (row) =>
            row.message.length > 25
              ? `${row.message.substring(0, 23)}...`
              : row.message,
        },
        {
          header: 'Status',
          hideOnTablet: true,
          accessor: (row) => (row.isRead ? 'Read' : 'Unread'),
        },
        {
          header: 'Date',
          hideOnTablet: true,
          accessor: (row) => dayjs(row.date).format('DD.MM.YYYY HH:mm'),
        },
        {
          header: 'Action',
          align: 'right',
          accessor: (row) => (
            <Button
              variant="outlined"
              disabled={row.isRead}
              onClick={(e) => handleMarkAsRead(e, row._id)}
            >
              Mark as read
            </Button>
          ),
        },
      ]}
    />
  );
}
