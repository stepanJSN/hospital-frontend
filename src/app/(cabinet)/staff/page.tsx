"use client"

import { appointmentService } from "@/services/appointment";
import { ISpecialization } from "@/types/specialization.type";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import DataTable from "./DataTable";
import ActionBar from "./ActionBar";
import useAdminRole from "@/hooks/useUserRole";
import Loader from "@/components/Loader";

export type FormPayloadType = {
  date?: string;
  specialization?: ISpecialization;
  fullname?: string;
}

export default function Staff() {
  const isAdmin = useAdminRole();
  const {
    control,
    handleSubmit,
    getValues,
  } = useForm<FormPayloadType>()

  const { refetch: queryRefetch, data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['doctors'],
		queryFn: () => {
      const data = getValues()
      console.log(data);
      const payload = {
        date: data.date,
        specializationId: data.specialization?.id,
        fullName: data.fullname
      }
      return appointmentService.getDoctors(payload)
    },
  })
  
  const onSubmit = () => queryRefetch();

  return (
    <Box width="100%" marginRight={1}>
      <ActionBar
        isAdmin={isAdmin}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        control={control}
        isFetching={isFetching}
      />
      {isSuccess && data?.length !== 0 &&
        <>
          <Typography 
            component="h1" 
            variant="h5" 
            mt={2}
            mb={1}
          >{isAdmin ? "Staff:" : "Doctors:"}</Typography>
          <DataTable data={data} />
        </>
      }
      <Loader isLoading={isFetching} />
      {isSuccess && data?.length === 0 && 
        <Typography 
          textAlign="center"
          component="h3" 
          variant="h5"
          mt={4}
        >Doctors not found</Typography>
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
