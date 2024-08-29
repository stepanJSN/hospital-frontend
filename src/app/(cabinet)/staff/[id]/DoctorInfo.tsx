import Notification from "@/components/Notifications";
import useGetDoctors from "@/hooks/useGetDoctorsData";
import { Avatar, Box, Divider, Skeleton, Typography } from "@mui/material";
import ButtonLink from "./ButtonLink";

type DoctorInfoProps = {
  staffId: string;
  isAdmin: boolean;
}

export default function DoctorInfo({ staffId, isAdmin }: DoctorInfoProps) {
  const { doctorData, isFetching, isError } = useGetDoctors(staffId);

  return (
    <>
      <Box display="flex" margin={3} width="100%">
        <Box>
          {doctorData && <Avatar 
            alt="Avatar"
            src={doctorData.avatarUrl}
            sx={{ width: 150, height: 150 }}
          />}
          {(isFetching || isError) && <Skeleton variant="circular" width={150} height={150} />}
        </Box>
        <Box marginLeft={3} flex="auto">
          {doctorData && 
          <>
            <Typography 
              component="h1"
              variant="h4"
              paddingBottom={2}
              paddingTop={2}
            >{`${doctorData.name} ${doctorData.surname}`}</Typography>
            <Typography>{'Specialization: ' + doctorData.specialization?.title}</Typography>
            <Typography>{'Experience: ' + doctorData.experience + ' year'}</Typography>
            <Typography>{'Email: ' + doctorData.email}</Typography>
            <Typography>{'Telephone: ' + doctorData.telephone}</Typography>
            <Typography>{'Gender: ' + doctorData.gender}</Typography>
            <Typography>{'Room: ' + doctorData.room}</Typography>
          </>}
          {(isFetching || isError) && <>
            <Skeleton component="h4" width={200} />
            <Skeleton width={200} />
            <Skeleton width={200} />
            <Skeleton width={200} />
            <Skeleton width={200} />
            <Skeleton width={200} />
            <Skeleton width={200} />
          </>}
        </Box>
        {isAdmin &&
          <Box 
            display="flex" 
            flexDirection="column"
            gap={1}
          >
            <ButtonLink href={`/staff/profile/${staffId}`}>Edit profile</ButtonLink>
            <ButtonLink href={`/staff/appointments/${staffId}`}>See appointments</ButtonLink>
            <ButtonLink href={`/staff/schedule/${staffId}`}>Edit schedule</ButtonLink>
          </Box>
        }
      </Box>
      <Divider sx={{ color: 'grey' }} />
      {doctorData && <Typography padding={2}>{doctorData.description ?? 'Description not provided'}</Typography>}
      {(isFetching || isError) && <Skeleton width="100%" height={100} />}
      <Notification 
        trigger={isError}
        position={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  )
}
