"use client"

import DatePicker from '@/components/DatePicker'
import AutocompleteAsync from '@/components/Inputs/AutocompleteAsync'
import FormInput from '@/components/Inputs/FormInput'
import Notification from '@/components/Notifications'
import Select from '@/components/Select'
import { removeEmptyFields } from '@/helpers/removeEmptyFields'
import useAdminRole from '@/hooks/useUserRole'
import { appointmentService } from '@/services/appointment'
import { staffService } from '@/services/staff'
import { IStaff, UpdateStaff } from '@/types/staff.type'
import { LoadingButton } from '@mui/lab'
import { Alert, Avatar, Box, Button, CircularProgress, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import DeleteDialog from '@/components/Dialogs/DeleteDialog'
import { specializationService } from '@/services/specialization'

export default function Profile() {
  const { id } = useParams<{ id: string[] }>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const isAdmin = useAdminRole();
  const { push } = useRouter()

  const {
    control,
    handleSubmit,
    setValue,
  } = useForm<IStaff>();

  const { data, isSuccess: isProfileSuccess, isPending: isProfilePending, isError: isProfileDataError } = useQuery({
		queryKey: ['profile'],
		queryFn: () => staffService.getProfile(id ? id[0]: undefined),
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
    setValue("role", data.role);
  }

  const { mutate, isPending, error, isError, isSuccess } = useMutation({
		mutationKey: ['profile'],
		mutationFn: (data: UpdateStaff) => staffService.update(data),
	})

  const { mutate: deleteMutate, isError: isDeleteError } = useMutation({
		mutationFn: (staffId?: string) => staffService.delete(staffId),
    onSuccess: () => {
      if (!id) {
        push('/auth/sigin')
      } else {
        push('/staff')
      }
    }
	})

  const onSubmit: SubmitHandler<IStaff> = (data) => {
    const { specialization, ...rest } = data;
    const payload = {
      ...rest,
      specializationId: data.specialization.id
    }
    mutate(removeEmptyFields(payload))
  }

  const handleClose = () => setIsDialogOpen(false);
  const handleDelete = () => deleteMutate(id ? id[0]: undefined);

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
            searchFunc={(title) => specializationService.getAll(title)}
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
          {isAdmin && <Select
            label='Role'
            control={control}
            errorText='Gender is required'
            options={['Admin', 'Staff']}
            required={false}
          />}
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
            sx={{ mb: 1 }}
          >
            Update
          </LoadingButton>
          <Button 
            variant="contained"
            color="error"
            fullWidth
            onClick={() => setIsDialogOpen(true)}
          >
            Delete profile
          </Button>
        </Box>
      }
      {isProfilePending && <CircularProgress size={65} sx={{ alignSelf: "center" }} />}
      <Notification trigger={isProfileDataError} />
      <DeleteDialog 
        open={isDialogOpen}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </Box>
  )
}
