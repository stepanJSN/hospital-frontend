"use client"

import { Alert, Box, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Input from '../Input';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth';
import { ISingUp } from '@/types/auth.type';
import Select from '@/components/Select';
import Link from '@/components/Link';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

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
		mutationFn: (data: ISingUp) => new AuthService().signUp(data),
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
      {true && 
      <Alert severity="success">
        Account was created. <Link href='/auth/signin'>You can Sign In</Link>
      </Alert>}
      {isError && <Alert severity="error">{error.message}</Alert>}
      <Input 
        label='Email'
        control={control}
        errorText='Incorrect email'
        pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
      />
      <Input 
        label='Name'
        control={control}
        errorText='Incorrect name'
      />
      <Input 
        label='Surname'
        control={control}
        errorText='Incorrect surname'
      />
      <Input 
        label='Telephone'
        control={control}
        errorText='Incorrect telephone'
        required={false}
        type='number'
      />
      <Controller
        name="birthday"
        control={control}
        rules={{
          required: true
        }}
        render={({
          field: { onChange, value },
        }) => (
          <DatePicker
            value={dayjs(value)}
            onChange={value => onChange(value?.toISOString())}
            sx={{ 
              width: '100%',
              marginTop: '8px',
              marginBottom: '4px'
            }}
          />
        )}
      />
      <Select 
        label='Gender'
        control={control}
        errorText='Gender is required'
        options={['male', 'female']}
      />
      <Input 
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
