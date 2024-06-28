"use client"

import { Alert, Box, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../Input';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth';
import { ISingIn } from '@/types/auth.type';
import Select from '@/components/Select';
import { useRouter } from 'next/navigation';
import Link from '@/components/Link';

export default function SignIn() {
  const {
    control,
    handleSubmit,
  } = useForm<ISingIn>()

  const { push } = useRouter()

  const { mutate, isPending, error, isError } = useMutation({
		mutationKey: ['signIn'],
		mutationFn: (data: ISingIn) => new AuthService().signIn(data),
    onSuccess: () => push('/'),
	})

  const onSubmit: SubmitHandler<ISingIn> = (data) => mutate(data)

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
      >Sign In</Typography>
      {isError && <Alert severity="error">{error.message}</Alert>}
      <Input 
        label='Email'
        control={control}
        errorText='Incorrect email'
        pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
      />
      <Input 
        label='Password'
        control={control}
        errorText='Incorrect password'
        type='password'
      />
      <Select 
        label='Role'
        control={control}
        errorText='Role is required'
        options={['Customer', 'Staff']}
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
      <Link href='/auth/signup'>Register</Link>
    </Box>
  )
}
