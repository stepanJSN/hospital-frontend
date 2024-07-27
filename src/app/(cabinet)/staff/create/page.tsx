"use client"

import DatePicker from '@/components/DatePicker'
import AutocompleteAsync from '@/components/Inputs/AutocompleteAsync'
import FormInput from '@/components/Inputs/FormInput'
import Select from '@/components/Select'
import { specializationService } from '@/services/specialization'
import { staffService } from '@/services/staff'
import { ICreateStaff, IStaff } from '@/types/staff.type'
import { LoadingButton } from '@mui/lab'
import { Alert, Avatar, Box } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
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
		mutationFn: (data: ICreateStaff) => staffService.create(data),
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
        </Alert>}
        {isError && <Alert severity="error">{getErrorMessage((error as AxiosError).response?.status)}</Alert>}
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
          errorText='Incorrect description'
          required={false}
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
