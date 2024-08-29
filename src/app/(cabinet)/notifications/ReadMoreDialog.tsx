import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { INotification } from "@/types/notifications.type";
import dayjs from "dayjs";

type ReadMoreDialogProps = {
  notification: INotification | null;
  markAsRead: () => void;
  handleClose: () => void;
}

export default function ReadMoreDialog({ notification, markAsRead, handleClose }: ReadMoreDialogProps) {
  return (
    <Dialog open={!!notification}>
      <DialogTitle>
        {notification?.senderName}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Typography gutterBottom>
          {notification?.message}
        </Typography>
      </DialogContent>
      <Box 
        display="flex" 
        justifyContent="space-between"
        alignItems="center"
        m={1}
      >
        <Typography>
          {dayjs(notification?.date).format('DD.MM.YYYY HH:mm')}
        </Typography>
        <Button disabled={notification?.isRead} onClick={markAsRead}>
          Mark as read
        </Button>
      </Box>
    </Dialog>
  )
}
