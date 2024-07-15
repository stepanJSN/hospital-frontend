import useGetDoctors from "@/hooks/useGetDoctroData";
import { Avatar, Box, Divider, Typography } from "@mui/material";

type DoctorInfoProps = {
  doctorId: string;
}

export default function DoctorInfo({ doctorId }: DoctorInfoProps) {
  const { doctorData } = useGetDoctors(doctorId);

  return (
    <>
    <Box display="flex" margin={3}>
      <Box>
        <Avatar 
          alt="No avatar"
          src="/images/no-avatar.png"
          sx={{ width: 150, height: 150 }}
        />
      </Box>
      <Box marginLeft={3}>
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
      </Box>
    </Box>
    <Divider sx={{ color: 'grey' }} />
    <Typography padding={2}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum est doloremque voluptatem, ipsam corrupti id illum vitae, officia placeat nulla suscipit sapiente veritatis alias! Architecto libero autem eum alias quam.</Typography>
    </>
  )
}
