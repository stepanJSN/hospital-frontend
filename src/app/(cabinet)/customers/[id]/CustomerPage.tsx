'use client';

import Notification from '@/app/components/Notifications';
import { customerService } from '@/services/customer';
import { Avatar, Box, Skeleton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

type CustomerPageType = {
  id: string;
};

const avatarSize = { mobile: 100, tablet: 150 };

export default function CustomerPage({ id }: CustomerPageType) {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['customerId', id],
    queryFn: () => customerService.get(id),
  });

  return (
    <>
      <Box
        display="flex"
        width="100%"
        sx={{
          margin: { xs: 1, md: 3 },
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
        }}
      >
        <Box>
          {!isFetching && !isError && (
            <Avatar
              alt="Avatar"
              src={data?.avatarUrl}
              sx={{
                width: { xs: avatarSize.mobile, sm: avatarSize.tablet },
                height: { xs: avatarSize.mobile, sm: avatarSize.tablet },
              }}
            />
          )}
          {(isFetching || isError) && (
            <Skeleton
              variant="circular"
              sx={{
                width: { xs: avatarSize.mobile, sm: avatarSize.tablet },
                height: { xs: avatarSize.mobile, sm: avatarSize.tablet },
              }}
            />
          )}
        </Box>
        <Box sx={{ marginLeft: { sm: 3 } }}>
          {!isFetching && !isError && (
            <>
              <Typography
                component="h1"
                variant="h4"
                paddingBottom={2}
                paddingTop={2}
              >{`${data?.name} ${data?.surname}`}</Typography>
              <Typography>{'Email: ' + data?.email}</Typography>
              <Typography>{'Telephone: ' + data?.telephone}</Typography>
              <Typography>{'Gender: ' + data?.gender}</Typography>
              <Typography>
                {'Gender: ' + dayjs(data?.birthday).format('DD.MM.YYYY')}
              </Typography>
            </>
          )}
          {(isFetching || isError) && (
            <>
              <Skeleton component="h4" width={200} />
              <Skeleton width={200} />
              <Skeleton width={200} />
              <Skeleton width={200} />
              <Skeleton width={200} />
            </>
          )}
        </Box>
      </Box>
      {isError && (
        <Notification
          position={{
            horizontal: 'center',
            vertical: 'top',
          }}
        />
      )}
    </>
  );
}
