"use client"

import DatePicker from '@/app/components/DatePicker'
import AutocompleteAsync from '@/app/components/Inputs/AutocompleteAsync'
import FormInput from '@/app/components/Inputs/FormInput'
import Select from '@/app/components/Select'
import { specializationService } from '@/services/specialization'
import { staffService } from '@/services/staff'
import { ICreateStaff, IStaff, IStaffShort } from '@/types/staff.type'
import { LoadingButton } from '@mui/lab'
import { Alert, Avatar, Box, Link } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import NextLink from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function Create() {
  const queryClient = useQueryClient();
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
		mutationFn: (data: ICreateStaff) => staffService.create(data),
    onSuccess: (newStaffMember) => queryClient.setQueryData(['staff', {}], (oldData: IStaffShort[]) => {
      return [newStaffMember, ...oldData];
    }),
	})

  const onSubmit: SubmitHandler<IStaff> = (data) => {
    const { specialization, ...rest } = data;
    const payload = {
      ...rest,
      specializationId: data.specialization ? data.specialization.id : null,
    }
    mutate(payload)
  };

  const getErrorMessage = (statusCode: number | undefined) => {
    if (statusCode === 400) {
      return "User with such email exists";
    }
    return "Error. Try again";
  }

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
          <Link component={NextLink} href='/staff'>Back to staff list</Link>
        </Alert>}
        {isError && <Alert severity="error">{getErrorMessage(error.response?.status)}</Alert>}
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
          pattern={/^[a-zA-Z]{2,}$/}
        />
        <FormInput 
          label='Surname'
          control={control}
          errorText='Incorrect surname'
          pattern={/^[a-zA-Z]{2,}$/}
        />
        <FormInput 
          label='Telephone'
          control={control}
          errorText='Incorrect telephone. Example: 380956732134'
          required={false}
          pattern={/^\d{12}$/}
        />
        <DatePicker label="birthday" control={control} sx={{ width: '100%' }} />
        <Select 
          label='Gender'
          defaultValue='male'
          control={control}
          options={['male', 'female']}
        />
        <AutocompleteAsync 
          id="specialization" 
          label="Specialization"
          control={control}
          startFromLetter={2}
          searchFunc={(title) => specializationService.getAll(title)}
          noOptionsText="Specialization not found"
        />
        <FormInput 
          label='Experience'
          control={control}
          errorText='Experience must be a number'
          required={false}
          type='number'
          pattern={/^\d+$/}
        />
        <FormInput 
          label='Description'
          control={control}
          errorText='Description must be between 2 and 1000 characters long'
          required={false}
          pattern={/^[a-zA-Z\s,.]{2,1000}$/}
          multiline
        />
        <FormInput 
          label='Room'
          control={control}
          errorText='Room number must be a number from 1 to 999'
          required={false}
          type="number"
          pattern={/^\d{1,3}$/}
        />
        <Select
          label='Role'
          defaultValue='Staff'
          control={control}
          options={['Admin', 'Staff']}
        />
        <FormInput
          type="password"
          label='Password'
          control={control}
          errorText='Incorrect password. Password must be at least 8 characters long but no more than 25.'
          pattern={/^.{8,24}$/}
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
