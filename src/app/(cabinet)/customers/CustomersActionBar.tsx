import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import React from 'react'
import { Control, UseFormHandleSubmit } from 'react-hook-form'
import FormInput from '@/components/Inputs/FormInput'
import { GetAll } from '@/types/customer.type'

type CustomerActionBarProps = {
  handleSubmit: UseFormHandleSubmit<GetAll, undefined>
  onSubmit: () => void;
  control:  Control<GetAll, any>
  isFetching: boolean;
}

export default function CustomerActionBar({ handleSubmit, onSubmit, control, isFetching }: CustomerActionBarProps) {
  return (
    <Box 
      component="form" 
      display="flex"
      alignItems="center"
      gap={2}
      mt={1}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        label='FirstName'
        name='firstName'
        control={control}
        required={false}
      />
      <FormInput
        label='LastName'
        name='lastName'
        control={control}
        required={false}
      />
      <LoadingButton 
        loading={isFetching}
        variant="contained" 
        fullWidth
        type="submit"
        loadingPosition="start"
        sx={{
          width: "200px"
        }}
      >
        Search
      </LoadingButton>
    </Box>
  )
}
