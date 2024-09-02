"use client"

import Notification from "@/app/components/Notifications";
import { customerService } from "@/services/customer";
import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

type CustomerPageType = {
  id: string;
}

export default function CustomerPage({ id }: CustomerPageType) {

  const { data, isFetching, isError } = useQuery({
    queryKey: ['customerId', id],
    queryFn: () => customerService.get(id),
  })

  return (
    <>
      <Box display="flex" margin={3} width="100%">
        <Box>
          {(!isFetching && !isError) && <Avatar 
            alt="Avatar"
            src={data?.avatarUrl}
            sx={{ width: 150, height: 150 }}
          />}
          {(isFetching || isError) && <Skeleton variant="circular" width={150} height={150} />}
        </Box>
        <Box marginLeft={3}>
          {(!isFetching && !isError) && <>
            <Typography 
              component="h1"
              variant="h4"
              paddingBottom={2}
              paddingTop={2}
            >{`${data?.name} ${data?.surname}`}</Typography>
            <Typography>{'Email: ' + data?.email}</Typography>
            <Typography>{'Telephone: ' + data?.telephone}</Typography>
            <Typography>{'Gender: ' + data?.gender}</Typography>
            <Typography>{'Gender: ' + dayjs(data?.birthday).format('DD.MM.YYYY')}</Typography>
          </>}
          {(isFetching || isError) && <>
            <Skeleton component="h4" width={200} />
            <Skeleton width={200} />
            <Skeleton width={200} />
            <Skeleton width={200} />
            <Skeleton width={200} />
          </>}
        </Box>
      </Box>
      {isError && 
        <Notification
          position={{ 
            horizontal: 'center',
            vertical: 'top'
          }}
        />
      }
    </>
  )
}
