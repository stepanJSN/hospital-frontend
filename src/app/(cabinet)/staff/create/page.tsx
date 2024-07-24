"use client"

import DatePicker from '@/components/DatePicker'
import AutocompleteAsync from '@/components/Inputs/AutocompleteAsync'
import FormInput from '@/components/Inputs/FormInput'
import Select from '@/components/Select'
import { appointmentService } from '@/services/appointment'
import { staffService } from '@/services/staff'
import { IStaff } from '@/types/staff.type'
import { LoadingButton } from '@mui/lab'
import { Alert, Avatar, Box } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function Create() {
  const {
    control,
    handleSubmit,
  } = useForm<IStaff>({
    defaultValues: {
      gender: 'male',
      role: 'Staff'
    },
  })

  const { mutate, isPending, error, isError, isSuccess } = useMutation({
		mutationKey: ['createStaff'],
		mutationFn: (data: IStaff) => staffService.create(data),
	})

  const onSubmit: SubmitHandler<IStaff> = (data) => mutate(data);

  return (
    <Box 
      flex="auto"
      display="flex"
      justifyContent="center"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        maxWidth="600px"
      >
        <Avatar sx={{
          position: 'relative', 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: 100,
          height: 100,
          fontSize: 35
        }}>A</Avatar>
        {isSuccess && 
        <Alert severity="success">
          User was created
        </Alert>}
        {isError && <Alert severity="error">{error.message}</Alert>}
        <FormInput 
          label='Email'
          control={control}
          errorText='Incorrect email'
          pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
        />
        <FormInput 
          label='Name'
          control={control}
          errorText='Incorrect name'
        />
        <FormInput 
          label='Surname'
          control={control}
          errorText='Incorrect surname'
        />
        <FormInput 
          label='Telephone'
          control={control}
          errorText='Incorrect telephone'
          required={false}
        />
        <DatePicker label="birthday" control={control} />
        <Select 
          label='Gender'
          control={control}
          errorText='Gender is required'
          options={['male', 'female']}
        />
        <AutocompleteAsync 
          id="specialization" 
          label="Specialization"
          control={control}
          startFromLetter={2}
          searchFunc={(title) => appointmentService.getSpecialization(title)}
          noOptionsText="Specialization not found"
          sx={{
            flex: "0 0 50%"
          }}
        />
        <FormInput 
          label='Experience'
          control={control}
          errorText='Incorrect experience'
          required={false}
        />
        <FormInput 
          label='Description'
          control={control}
          errorText='Incorrect description'
          required={false}
          multiline
        />
        <FormInput 
          label='Room'
          control={control}
          errorText='Incorrect room'
          required={false}
          type="number"
        />
        <Select
          label='Role'
          control={control}
          errorText='Gender is required'
          options={['Admin', 'Staff']}
        />
        <FormInput
          type="password"
          label='Password'
          control={control}
          errorText='Incorrect password'
        />
        <LoadingButton 
          loading={isPending}
          variant="contained" 
          fullWidth 
          type="submit"
          loadingPosition="start"
          sx={{ mb: 1 }}
        >
          Create
        </LoadingButton>
      </Box>
    </Box>
  )
}
