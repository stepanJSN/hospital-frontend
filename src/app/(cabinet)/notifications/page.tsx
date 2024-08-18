"use client"
import { useState } from "react";
import { notificationsService } from "@/services/notifications"
import { INotification } from "@/types/notifications.type"
import { Box, FormControlLabel, LinearProgress, Switch, Typography } from "@mui/material"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ReadMoreDialog from "./ReadMoreDialog";
import NotificationsTable from "./NotificationsTable";

export default function Notifications() {
  const [onlyUnread, setOnlyUnread] = useState<boolean>(true);
  const [selectedNotification, setSelectedNotification] = useState<INotification | null>(null);
  const queryClient = useQueryClient();

  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['notifications', onlyUnread],
		queryFn: () => notificationsService.getAllByUserId(onlyUnread),
  })

  const { mutate: mutateMessageStatus } = useMutation({
		mutationFn: (messageId: string) => notificationsService.markAsRead(messageId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
	})

  const handleReadMoreDialogClose = () => setSelectedNotification(null);
  const handleDialogMarkAsRead = () => {
    if(isSuccess && selectedNotification) {
      mutateMessageStatus(selectedNotification._id);
    }
    setSelectedNotification(null);
  }

  return (
    <Box margin={2} width="100%">
      <Typography variant="h5" component="h1">Notifications:</Typography>
      <FormControlLabel control={
          <Switch 
            checked={onlyUnread}
            onChange={() => setOnlyUnread(prevState => !prevState)}
          />
      } label="Show only unread" />
      {isFetching && <LinearProgress sx={{ my: 1 }} />}
      {isSuccess && data.length !== 0 &&
        <NotificationsTable
          data={data}
          setSelectedNotification={setSelectedNotification}
          changeMessageStatus={mutateMessageStatus}
        />
      }
      <ReadMoreDialog 
        data={selectedNotification}
        handleClose={handleReadMoreDialogClose}
        markAsRead={handleDialogMarkAsRead}
      />
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
    </Box>
  )
}
