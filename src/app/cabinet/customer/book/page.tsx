"use client"

import DatePicker from "@/components/DatePicker";
import AutocompleteAsync from "@/components/Inputs/AutocompleteAsync";
// import useLazyQuery from "@/hooks/useLazyQuery";
import { appointmentService } from "@/services/appointment";
import { ISpecialization } from "@/types/appointment.type";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import DataTable from "./DataTable";

type FormPayloadType = {
  date: string;
  specialization: ISpecialization;
}

export default function Book() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormPayloadType>()

  const { refetch: queryRefetch, data, isFetching, error, isSuccess } = useQuery({
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
      <Box 
        component="form" 
        display="flex"
        alignItems="center"
        gap={2}
        mt={2}
        onSubmit={handleSubmit(onSubmit)}
      >
        <AutocompleteAsync 
          id="specialization" 
          label="Specialization"
          control={control}
          required
          startFromLetter={2}
          searchFunc={(title) => appointmentService.getSpecialization(title)}
          noOptionsText="Specialization not found"
          sx={{
            flex: "0 0 50%"
          }}
        />
        <DatePicker
          control={control}
          label="Date"
          required={false}
         />
         <LoadingButton 
            loading={isFetching}
            variant="contained" 
            fullWidth
            type="submit"
            loadingPosition="start"
            sx={{
              height: "56px",
              width: "200px"
            }}
          >
            Search
          </LoadingButton>
      </Box>
      <Typography component="h3" variant="h5">Doctors:</Typography>
      {isSuccess && !isFetching && <DataTable data={data} />}
      {isFetching && <CircularProgress sx={{ position: 'relative', top: '30%', left: '50%' }} />}
    </Box>
  )
}
