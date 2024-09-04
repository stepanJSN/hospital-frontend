'use client';

import { Alert, Box, Link, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '@/app/components/Inputs/FormInput';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { ISingIn } from '@/types/auth.type';
import Select from '@/app/components/Select';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';

export default function SignIn() {
  const { control, handleSubmit } = useForm<ISingIn>();

  const { push } = useRouter();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: (data: ISingIn) => authService.signIn(data),
    onSuccess: (response) =>
      push(`/${response.data.role === 'Customer' ? 'staff' : 'staff/profile'}`),
  });
  const onSubmit: SubmitHandler<ISingIn> = (data) => mutate(data);

  const getErrorMessage = (statusCode: number | undefined) => {
    switch (statusCode) {
      case 404:
        return 'User with such email not found';

      case 401:
        return 'Wrong email or password';

      default:
        return 'Error. Try again';
    }
  };

  return (
    <Box
      maxWidth="400px"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        transform: 'translateY(50%)',
        width: {
          xs: '90%',
          sm: '50%',
        },
      }}
    >
      <Typography align="center" component="h1" variant="h5" mb={1}>
        Sign In
      </Typography>
      {isError && (
        <Alert severity="error">
          {getErrorMessage(error.response?.status)}
        </Alert>
      )}
      <FormInput
        label="Email"
        control={control}
        errorText="Incorrect email"
        pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
      />
      <FormInput
        label="Password"
        control={control}
        errorText="Incorrect password"
        pattern={/^.{8,24}$/}
        type="password"
      />
      <Select
        label="Role"
        control={control}
        defaultValue="Customer"
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
      <Link
        component={NextLink}
        href="/auth/signup"
        mt={1}
        textAlign="center"
        display="inline-block"
        width="100%"
      >
        Register
      </Link>
    </Box>
  );
}
