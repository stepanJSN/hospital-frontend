'use client';

import { Alert, Box, Link, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '@/app/components/Inputs/FormInput';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { ISingUp } from '@/types/auth.type';
import Select from '@/app/components/Select';
import DatePicker from '@/app/components/DatePicker';
import { removeEmptyFields } from '@/helpers/removeEmptyFields';
import NextLink from 'next/link';

export default function SignIn() {
  const { control, handleSubmit } = useForm<ISingUp>({
    defaultValues: {
      gender: 'male',
    },
  });

  const { mutate, isPending, error, isError, isSuccess } = useMutation({
    mutationFn: (data: ISingUp) => authService.signUp(data),
  });
  const onSubmit: SubmitHandler<ISingUp> = (data) =>
    mutate(removeEmptyFields(data));

  const getErrorMessage = (statusCode: number | undefined) => {
    if (statusCode === 400) {
      return 'User with such email exists';
    }

    return 'Error. Try again';
  };

  return (
    <Box
      width="50%"
      maxWidth="400px"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography align="center" component="h1" variant="h5" mb={1}>
        Patient registration
      </Typography>
      {isSuccess && (
        <Alert severity="success">
          Account was created.{' '}
          <Link component={NextLink} href="/auth/signin">
            You can Sign In
          </Link>
        </Alert>
      )}
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
        label="Name"
        control={control}
        errorText="The name must consist of letters and have at least two characters"
        pattern={/^[a-zA-Z]{2,}$/}
      />
      <FormInput
        label="Surname"
        control={control}
        errorText="The surname must consist of letters and have at least two characters"
        pattern={/^[a-zA-Z]{2,}$/}
      />
      <FormInput
        label="Telephone"
        control={control}
        errorText="Incorrect telephone. Example: 380956732134"
        required={false}
        pattern={/^\d{12}$/}
      />
      <DatePicker
        label="Birthday"
        control={control}
        sx={{
          width: '100%',
          mt: '8px',
          mb: '4px',
        }}
      />
      <Select
        label="Gender"
        control={control}
        defaultValue="female"
        options={['male', 'female']}
      />
      <FormInput
        label="Password"
        control={control}
        type="password"
        errorText="Incorrect password. Password must be at least 8 characters long but no more than 25."
        pattern={/^.{8,24}$/}
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
        href="/auth/signin"
        mt={1}
        textAlign="center"
        display="inline-block"
        width="100%"
      >
        Sign In
      </Link>
    </Box>
  );
}
