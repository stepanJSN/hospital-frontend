import useGetDoctors from "@/hooks/useGetDoctroData";
import { Avatar, Box, Divider, Skeleton, Typography } from "@mui/material";

type DoctorInfoProps = {
  doctorId: string;
}

export default function DoctorInfo({ doctorId }: DoctorInfoProps) {
  const { doctorData, isFetching } = useGetDoctors(doctorId);

  return (
    <>
    <Box display="flex" margin={3}>
      <Box>
        {!isFetching && <Avatar 
          alt="No avatar"
          src="/images/no-avatar.png"
          sx={{ width: 150, height: 150 }}
        />}
        {isFetching && <Skeleton variant="circular" width={150} height={150} />}
      </Box>
      <Box marginLeft={3}>
        {!isFetching && <>
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
        {isFetching && <>
          <Skeleton component="h4" width={200} />
          <Skeleton width={200} />
          <Skeleton width={200} />
          <Skeleton width={200} />
          <Skeleton width={200} />
          <Skeleton width={200} />
        </>}
      </Box>
    </Box>
    <Divider sx={{ color: 'grey' }} />
    {!isFetching && <Typography padding={2}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum est doloremque voluptatem, ipsam corrupti id illum vitae, officia placeat nulla suscipit sapiente veritatis alias! Architecto libero autem eum alias quam.</Typography>}
    {isFetching && <Skeleton width="100%" height={100} />}
    </>
  )
}
