"use client"

import { Alert, Box, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { SubmitHandler, useForm } from 'react-hook-form'
import FormInput from '@/components/Inputs/FormInput';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { ISingUp } from '@/types/auth.type';
import Select from '@/components/Select';
import Link from '@/components/Link';
import DatePicker from '@/components/DatePicker';

export default function SignIn() {
  const {
    control,
    handleSubmit,
  } = useForm<ISingUp>({
    defaultValues: {
      gender: 'male'
    },
  })

  const { mutate, isPending, error, isError, isSuccess } = useMutation({
		mutationKey: ['signUp'],
		mutationFn: (data: ISingUp) => authService.signUp(data),
	})

  const onSubmit: SubmitHandler<ISingUp> = (data) => mutate(data);

  return (
    <Box 
      width="50%" 
      maxWidth="400px"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography 
        align='center'
        component='h1' 
        variant='h5' 
        mb={1}
      >Patient registration</Typography>
      {isSuccess && 
      <Alert severity="success">
        Account was created. <Link href='/auth/signin'>You can Sign In</Link>
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
      <FormInput 
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
      >
        Submit
      </LoadingButton>
      <Link href='/auth/signin' fullwidth>Sign In</Link>
    </Box>
  )
}
