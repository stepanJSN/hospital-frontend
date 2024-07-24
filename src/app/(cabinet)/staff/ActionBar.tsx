import DatePicker from '@/components/DatePicker'
import AutocompleteAsync from '@/components/Inputs/AutocompleteAsync'
import { appointmentService } from '@/services/appointment'
import { LoadingButton } from '@mui/lab'
import { Box, Button } from '@mui/material'
import React from 'react'
import { Control, UseFormHandleSubmit } from 'react-hook-form'
import { FormPayloadType } from './page'
import Link from 'next/link'

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
      {isAdmin ? 
      <Button 
        sx={{ width: '300px', height: '56px' }}
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
          height: "56px",
          width: "200px"
        }}
      >
        Search
      </LoadingButton>
    </Box>
  )
}
