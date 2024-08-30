"use client"

import DatePicker from '@/components/DatePicker'
import DeleteDialog from '@/components/Dialogs/DeleteDialog'
import FileUpload from '@/components/Inputs/FileUpload'
import FormInput from '@/components/Inputs/FormInput'
import Notification from '@/components/Notifications'
import Select from '@/components/Select'
import { replaceEmptyFieldsWithNull } from '@/helpers/replaceEmptyFieldsWithNull'
import useLogout from '@/hooks/useLogout'
import { customerService } from '@/services/customer'
import { IUpdateAvatarResponse, IUser, UpdateUser } from '@/types/customer.type'
import { LoadingButton } from '@mui/lab'
import { Alert, Avatar, Box, Button, CircularProgress, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function Profile() {
  const logout = useLogout();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setValue,
  } = useForm<UpdateUser>();

  const queryClient = useQueryClient()

  const { data, isSuccess: isProfileSuccess, isPending: isProfilePending, isError: isProfileDataError } = useQuery({
		queryKey: ['profile'],
		queryFn: async () => customerService.get(),
	})

  if (isProfileSuccess) {
    setValue("name", data.name);
    setValue("surname", data.surname);
    setValue("telephone", data.telephone);
    setValue("birthday", data.birthday);
    setValue("gender", data.gender,{ shouldValidate: true })
  }

  const { mutate, isPending, isError, isSuccess } = useMutation({
		mutationFn: (data: UpdateUser) => customerService.update(data),
    onSuccess: (data: IUser) => queryClient.setQueryData(['profile'], data),
	})

  const { mutate: deleteMutate, isPending: isDeletePending, isError: isDeleteError, reset } = useMutation({
		mutationFn: () => customerService.delete(),
    onSuccess: () => logout(),
	})

  const { 
    mutate: mutateAvatar, 
    isPending: isAvatarMutationPending, 
    isError: isAvatarMutationError,
    isSuccess: isAvatarMutationSuccess,
  } = useMutation({
		mutationFn: (avatar: File) => customerService.updateAvatar(avatar),
    onSuccess: (data: IUpdateAvatarResponse) => queryClient.setQueryData(['profile'], (oldProfileData: IUser) =>
      (oldProfileData
      ? {
          ...oldProfileData,
          avatarUrl: data.avatarUrl,
        }
      : oldProfileData
    )),
	})

  const onSubmit: SubmitHandler<UpdateUser> = (data) => mutate(replaceEmptyFieldsWithNull(data));
  const handleClose = () => { setIsDialogOpen(false); reset(); };
  const handleDelete = () => deleteMutate();

  return (
    <Box 
      flex="auto"
      display="flex"
      justifyContent="center"
      mt={2}
    >
      {isProfileSuccess &&
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          maxWidth="600px"
        >
          <Avatar 
            sx={{
              position: 'relative', 
              left: '50%', 
              transform: 'translateX(-50%)',
              width: 100,
              height: 100,
              fontSize: 35
            }}
            src={data.avatarUrl}
          />
          <FileUpload 
            update={mutateAvatar}
            title="Update avatar"
            isLoading={isAvatarMutationPending}
          />
          <Typography 
            textAlign="center" 
            marginTop={1}
            marginBottom={1}
          >{data?.email}</Typography>
          {isSuccess && 
          <Alert severity="success">
            Profile info was updated
          </Alert>}
          {isError && <Alert severity="error">{isError && "Error. Try again"}</Alert>}
          <FormInput 
            label='Name'
            control={control}
            errorText='Incorrect name'
            required={false}
            pattern={/^[a-zA-Z]{2,}$/}
          />
          <FormInput 
            label='Surname'
            control={control}
            errorText='Incorrect surname'
            required={false}
            pattern={/^[a-zA-Z]{2,}$/}
          />
          <FormInput 
            label='Telephone'
            control={control}
            errorText='Incorrect telephone. Example: 380956732134'
            required={false}
            pattern={/^\d{12}$/}
          />
          <DatePicker label="Birthday" control={control} sx={{ width: '100%' }} />
          <Select 
            label='Gender'
            control={control}
            defaultValue='male'
            options={['male', 'female']}
            required={false}
          />
          <FormInput 
            label='Password'
            control={control}
            errorText='Incorrect password. Password must be at least 8 characters long but no more than 25.'
            pattern={/^.{8,24}$/}
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
      {isProfilePending && <CircularProgress size={65} sx={{ position: 'absolute', top: '40%', }} />}
      {isProfileDataError && 
        <Typography 
          color="error"
          position="absolute"
          top="30%"
          fontSize={20}
        >
          Error. Unable to load profile
        </Typography>
      }
      <DeleteDialog 
        open={isDialogOpen}
        isError={isDeleteError}
        isLoading={isDeletePending}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      <Notification 
        trigger={isAvatarMutationError}
        text="Error. Unable to update avatar"
      />
      <Notification 
        trigger={isAvatarMutationSuccess}
        text="The avatar was successfully updated"
        type="success"
      />
    </Box>
  )
}
