import DatePicker from '@/components/DatePicker'
import AutocompleteAsync from '@/components/Inputs/AutocompleteAsync'
import { appointmentService } from '@/services/appointment'
import { LoadingButton } from '@mui/lab'
import { Box, Button } from '@mui/material'
import React from 'react'
import { Control, UseFormHandleSubmit } from 'react-hook-form'
import { FormPayloadType } from './page'
import Link from 'next/link'
import FormInput from '@/components/Inputs/FormInput'
import { specializationService } from '@/services/specialization'

type ActionBarProps = {
  handleSubmit: UseFormHandleSubmit<FormPayloadType, undefined>
  onSubmit: () => void;
  control:  Control<FormPayloadType, any>
  isFetching: boolean;
  isAdmin: boolean
}

export default function ActionBar({ handleSubmit, onSubmit, control, isFetching, isAdmin }: ActionBarProps) {
  return (
    <Box 
      component="form" 
      display="flex"
      alignItems="center"
      gap={2}
      mt={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        label='FullName'
        control={control}
        errorText='Incorrect name'
        required={false}
        fullWidth={false}
        sx={{ minWidth: '250px' }}
        margin='none'
      />
      <AutocompleteAsync 
        id="specialization" 
        label="Specialization"
        control={control}
        startFromLetter={2}
        searchFunc={(title) => specializationService.getAll(title)}
        noOptionsText="Specialization not found"
        sx={{ minWidth: '250px', flex: 'auto' }}
      />
      {isAdmin ? 
      <Button 
        sx={{ width: '200px', height: '40px' }}
        component={Link}
        href='/staff/create'
      >
        Create new profile
      </Button>
      : <DatePicker
        control={control}
        label="Date"
        required={false}
        />
      }
      <LoadingButton 
        loading={isFetching}
        variant="contained" 
        fullWidth
        type="submit"
        loadingPosition="start"
        sx={{
          height: "40px",
          width: "200px"
        }}
      >
        Search
      </LoadingButton>
    </Box>
  )
}
