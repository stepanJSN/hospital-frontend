import Notification from "@/components/Notifications";
import useGetDoctors from "@/hooks/useGetDoctroData";
import useAdminRole from "@/hooks/useUserRole";
import { Avatar, Box, Button, Divider, Skeleton, Typography } from "@mui/material";
import Link from "next/link";

type DoctorInfoProps = {
  staffId: string;
}

export default function DoctorInfo({ staffId }: DoctorInfoProps) {
  const { doctorData, isFetching, isError } = useGetDoctors(staffId);
  const isAdmin = useAdminRole();

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
        {doctorData && <>
          <Typography 
            component="h1"
            variant="h4"
            paddingBottom={2}
            paddingTop={2}
          >{`${doctorData?.name} ${doctorData?.surname}`}</Typography>
          <Typography>{'Specialization: ' + doctorData?.specialization?.title}</Typography>
          <Typography>{'Experience: ' + doctorData?.experience + ' year'}</Typography>
          <Typography>{'Email: ' + doctorData?.email}</Typography>
          <Typography>{'Telephone: ' + doctorData?.telephone}</Typography>
          <Typography>{'Gender: ' + doctorData?.gender}</Typography>
          <Typography>{'Room: ' + doctorData?.room}</Typography>
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
          <Button
            component={Link}
            href={`/staff/profile/${staffId}`}
            sx={{ maxHeight: '40px', marginRight: 2 }} 
            variant="contained"
          >Edit profile</Button>
          <Button
            component={Link}
            href={`/staff/appointments/${staffId}`}
            sx={{ maxHeight: '40px', marginRight: 2 }} 
            variant="contained"
          >See appointments</Button>
          <Button
            component={Link}
            href={`/staff/schedule/${staffId}`}
            sx={{ maxHeight: '40px', marginRight: 2 }} 
            variant="contained"
          >Edit schedule</Button>
        </Box>
      }
    </Box>
    <Divider sx={{ color: 'grey' }} />
    {doctorData && <Typography padding={2}>{doctorData?.description ?? 'Description not provided'}</Typography>}
    {(isFetching || isError) && <Skeleton width="100%" height={100} />}
    <Notification 
      trigger={isError}
      position={{ vertical: 'top', horizontal: 'center' }}
    />
    </>
  )
}
