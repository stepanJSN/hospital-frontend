"use client"

import { appointmentService } from "@/services/appointment";
import { ISpecialization } from "@/types/appointment.type";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import DataTable from "./DataTable";
import Notification from "@/components/Notifications";
import ActionBar from "./ActionBar";
import useAdminRole from "@/hooks/useUserRole";

export type FormPayloadType = {
  date: string;
  specialization: ISpecialization;
}

export default function Book() {
  const isAdmin = useAdminRole();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormPayloadType>()

  const { refetch: queryRefetch, data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['doctors'],
		queryFn: () => {
      const data = getValues()
      const payload = {
        date: data.date,
        specializationId: data.specialization.id,
      }
      return appointmentService.getDoctors(payload)
    },
    enabled: false,
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
      <Typography component="h3" variant="h5">Doctors:</Typography>
      {isSuccess && !isFetching && <DataTable data={data} />}
      {isFetching && <CircularProgress sx={{ position: 'relative', top: '30%', left: '50%' }} />}
      {isSuccess && data?.length === 0 && <Typography textAlign="center" component="h3" variant="h6">Doctors not found</Typography>}
      <Notification trigger={isError} />
    </Box>
  )
}
