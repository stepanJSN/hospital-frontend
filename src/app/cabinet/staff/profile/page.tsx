"use client"

import DatePicker from '@/components/DatePicker'
import AutocompleteAsync from '@/components/Inputs/AutocompleteAsync'
import FormInput from '@/components/Inputs/FormInput'
import Notification from '@/components/Notifications'
import Select from '@/components/Select'
import { removeEmptyFields } from '@/helpers/removeEmptyFields'
import { appointmentService } from '@/services/appointment'
import { customerService } from '@/services/customer'
import { staffService } from '@/services/staff'
import { UpdateUser } from '@/types/customer.type'
import { IStaff, UpdateStaff } from '@/types/staff.type'
import { LoadingButton } from '@mui/lab'
import { Alert, Avatar, Box, CircularProgress, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function Profile() {
  const {
    control,
    handleSubmit,
    setValue,
  } = useForm<IStaff>();

  const { data, isSuccess: isProfileSuccess, isPending: isProfilePending, isError: isProfileDataError } = useQuery({
		queryKey: ['profile'],
		queryFn: () => staffService.getProfile(),
	})

  if (isProfileSuccess) {
    setValue("name", data.name);
    setValue("surname", data.surname);
    setValue("telephone", data.telephone);
    setValue("birthday", data.birthday);
    setValue("gender", data.gender,{ shouldValidate: true });
    setValue("specialization", data.specialization, {shouldValidate: true });
    setValue("experience", data.experience);
    setValue("room", data.room);
    setValue("description", data.description);
  }

  const { mutate, isPending, error, isError, isSuccess } = useMutation({
		mutationKey: ['profile'],
		mutationFn: (data: UpdateStaff) => staffService.update(data),
	})

  const onSubmit: SubmitHandler<IStaff> = (data) => {
    const { specialization, ...rest } = data;
    const payload = {
      ...rest,
      specializationId: data.specialization.id
    }
    mutate(removeEmptyFields(payload))
  }

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
