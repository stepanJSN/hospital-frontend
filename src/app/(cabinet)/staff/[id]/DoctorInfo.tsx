import useGetDoctors from "@/hooks/useGetDoctroData";
import useAdminRole from "@/hooks/useUserRole";
import { Avatar, Box, Button, Divider, Skeleton, Typography } from "@mui/material";
import Link from "next/link";

type DoctorInfoProps = {
  doctorId: string;
}

export default function DoctorInfo({ doctorId }: DoctorInfoProps) {
  const { doctorData, isFetching, isError } = useGetDoctors(doctorId);
  const isAdmin = useAdminRole();

  return (
    <>
    <Box display="flex" margin={3} width="100%">
      <Box>
        {(!isFetching && !isError) && <Avatar 
          alt="No avatar"
          src="/images/no-avatar.png"
          sx={{ width: 150, height: 150 }}
        />}
        {(isFetching || isError) && <Skeleton variant="circular" width={150} height={150} />}
      </Box>
      <Box marginLeft={3} flex="auto">
        {(!isFetching && !isError) && <>
          <Typography 
            component="h1"
            variant="h4"
            paddingBottom={2}
            paddingTop={2}
          >{`${doctorData?.name} ${doctorData?.surname}`}</Typography>
          <Typography>{'Specialization: ' + doctorData?.specialization.title}</Typography>
          <Typography>{'Experience: ' + doctorData?.experience + ' year'}</Typography>
          <Typography>{'Email: ' + doctorData?.email}</Typography>
          <Typography>{'Telephone: ' + doctorData?.telephone}</Typography>
          <Typography>{'Gender: ' + doctorData?.gender}</Typography>
        </>}
        {(isFetching || isError) && <>
          <Skeleton component="h4" width={200} />
          <Skeleton width={200} />
          <Skeleton width={200} />
          <Skeleton width={200} />
          <Skeleton width={200} />
          <Skeleton width={200} />
        </>}
      </Box>
      {isAdmin &&
        <Button
          component={Link}
          href={`/staff/profile/${doctorId}`}
          sx={{ maxHeight: '40px', marginRight: 2 }} 
          variant="contained"
        >Edit profile</Button>
      }
    </Box>
    <Divider sx={{ color: 'grey' }} />
    {(!isFetching && !isError) && <Typography padding={2}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum est doloremque voluptatem, ipsam corrupti id illum vitae, officia placeat nulla suscipit sapiente veritatis alias! Architecto libero autem eum alias quam.</Typography>}
    {(isFetching || isError) && <Skeleton width="100%" height={100} />}
    </>
  )
}
