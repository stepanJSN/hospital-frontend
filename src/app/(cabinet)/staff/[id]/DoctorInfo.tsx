'use client';

import Notification from '@/app/components/Notifications';
import useGetDoctors from '@/hooks/useGetDoctorsData';
import {
  Avatar,
  Box,
  Divider,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ButtonLink from './ButtonLink';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

type DoctorInfoProps = {
  staffId: string;
  isAdmin: boolean;
};

const avatarSize = { mobile: 100, tablet: 150 };

export default function DoctorInfo({ staffId, isAdmin }: DoctorInfoProps) {
  const { doctorData, isError } = useGetDoctors(staffId);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      <Box
        display="flex"
        margin={2}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'center' },
        }}
      >
        <Box>
          {doctorData ? (
            <Avatar
              alt="Avatar"
              src={doctorData.avatarUrl}
              sx={{
                width: { xs: avatarSize.mobile, sm: avatarSize.tablet },
                height: { xs: avatarSize.mobile, sm: avatarSize.tablet },
              }}
            />
          ) : (
            <Skeleton
              variant="circular"
              sx={{
                width: { xs: avatarSize.mobile, sm: avatarSize.tablet },
                height: { xs: avatarSize.mobile, sm: avatarSize.tablet },
              }}
            />
          )}
        </Box>
        <Box flex="auto" sx={{ ml: { xs: '0', sm: 3 } }}>
          {doctorData ? (
            <>
              <Typography
                component="h1"
                variant="h4"
                paddingBottom={2}
                paddingTop={2}
              >{`${doctorData.name} ${doctorData.surname}`}</Typography>
              <Typography>
                {'Specialization: ' + doctorData.specialization?.title}
              </Typography>
              <Typography>
                {'Experience: ' + doctorData.experience + ' year'}
              </Typography>
              <Typography>{'Email: ' + doctorData.email}</Typography>
              <Typography>{'Telephone: ' + doctorData.telephone}</Typography>
              <Typography>{'Gender: ' + doctorData.gender}</Typography>
              <Typography>{'Room: ' + doctorData.room}</Typography>
            </>
          ) : (
            <>
              <Skeleton component="h4" width={200} />
              <Skeleton width={200} />
              <Skeleton width={200} />
              <Skeleton width={200} />
              <Skeleton width={200} />
              <Skeleton width={200} />
              <Skeleton width={200} />
            </>
          )}
        </Box>
        {isAdmin && (
          <Box
            display="flex"
            gap={1}
            sx={{ flexDirection: { xs: 'row', sm: 'column' } }}
          >
            <ButtonLink href={`/staff/profile/${staffId}`}>
              {isTablet ? <AccountCircleIcon /> : 'Edit Profile'}
            </ButtonLink>
            <ButtonLink href={`/staff/appointments/${staffId}`}>
              {isTablet ? <CalendarMonthIcon /> : 'See appointments'}
            </ButtonLink>
            <ButtonLink href={`/staff/schedule/${staffId}`}>
              {isTablet ? <AccessTimeIcon /> : 'Edit schedule'}
            </ButtonLink>
          </Box>
        )}
      </Box>
      <Divider sx={{ color: 'grey' }} />
      {doctorData ? (
        <Typography padding={2}>
          {doctorData.description ?? 'Description not provided'}
        </Typography>
      ) : (
        <Skeleton width="100%" height={100} />
      )}
      {isError && (
        <Notification position={{ vertical: 'top', horizontal: 'center' }} />
      )}
    </>
  );
}
