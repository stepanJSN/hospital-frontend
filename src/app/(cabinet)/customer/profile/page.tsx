"use client"

import DatePicker from '@/components/DatePicker'
import FormInput from '@/components/Inputs/FormInput'
import Notification from '@/components/Notifications'
import Select from '@/components/Select'
import { removeEmptyFields } from '@/helpers/removeEmptyFields'
import { customerService } from '@/services/customer'
import { UpdateUser } from '@/types/customer.type'
import { LoadingButton } from '@mui/lab'
import { Alert, Avatar, Box, CircularProgress, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function Profile() {
  const {
    control,
    handleSubmit,
    setValue,
  } = useForm<UpdateUser>()

  const { data, isSuccess: isProfileSuccess, isPending: isProfilePending, isError: isProfileDataError } = useQuery({
		queryKey: ['profile'],
		queryFn: () => customerService.getProfile(),
	})

  if (isProfileSuccess) {
    setValue("name", data.name);
    setValue("surname", data.surname);
    setValue("telephone", data.telephone);
    setValue("birthday", data.birthday);
    setValue("gender", data.gender,{ shouldValidate: true })
  }

  const { mutate, isPending, error, isError, isSuccess } = useMutation({
		mutationKey: ['profile'],
		mutationFn: (data: UpdateUser) => customerService.update(data),
	})

  const onSubmit: SubmitHandler<UpdateUser> = (data) => mutate(removeEmptyFields(data))

  return (
    <Box 
      flex="auto"
      display="flex"
      justifyContent="center"
    >
      {isProfileSuccess &&
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
          }}>{data?.name.charAt(0)}</Avatar>
          <Typography 
            textAlign="center" 
            marginTop={1}
            marginBottom={1}
          >{data?.email}</Typography>
          {isSuccess && 
          <Alert severity="success">
            Profile info was updated
          </Alert>}
          {isError && <Alert severity="error">{error.message}</Alert>}
          <FormInput 
            label='Name'
            control={control}
            errorText='Incorrect name'
            required={false}
          />
          <FormInput 
            label='Surname'
            control={control}
            errorText='Incorrect surname'
            required={false}
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
            required={false}
          />
          <FormInput 
            label='Password'
            control={control}
            errorText='Incorrect password'
            required={false}
          />
          <LoadingButton 
            loading={isPending}
            variant="contained" 
            fullWidth 
            type="submit"
            loadingPosition="start"
          >
            Update
          </LoadingButton>
        </Box>
      }
      {isProfilePending && <CircularProgress size={65} sx={{ alignSelf: "center" }} />}
      <Notification trigger={isProfileDataError} />
    </Box>
  )
}
