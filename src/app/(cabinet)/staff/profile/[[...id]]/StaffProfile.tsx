"use client"

import DatePicker from '@/app/components/DatePicker'
import AutocompleteAsync from '@/app/components/Inputs/AutocompleteAsync'
import FormInput from '@/app/components/Inputs/FormInput'
import Select from '@/app/components/Select'
import { staffService } from '@/services/staff'
import { IStaff, UpdateStaff } from '@/types/staff.type'
import { LoadingButton } from '@mui/lab'
import { Alert, Avatar, Box, Button, CircularProgress, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import DeleteDialog from '@/app/components/Dialogs/DeleteDialog'
import { specializationService } from '@/services/specialization'
import FileUpload from '@/app/components/Inputs/FileUpload'
import { replaceEmptyFieldsWithNull } from '@/helpers/replaceEmptyFieldsWithNull'
import { IUpdateAvatarResponse } from '@/types/customer.type'
import Notification from '@/app/components/Notifications'
import useLogout from '@/hooks/useLogout'

type StaffProfile = {
  staffId?: string;
  isAdmin: boolean;
};

export default function StaffProfile({ staffId, isAdmin }: StaffProfile) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { push } = useRouter();
  const logout = useLogout();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    setValue,
  } = useForm<IStaff>();

  const { data, isSuccess: isProfileSuccess, isPending: isProfilePending, isError: isProfileDataError } = useQuery({
		queryKey: staffId ? ['profile', staffId] : ['profile'],
		queryFn: () => staffService.get(staffId),
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
		mutationFn: (data: UpdateStaff) => staffService.update(data, staffId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: staffId ? ['profile', staffId] : ['profile'] }),
	})

  const { mutate: deleteMutate, isPending: isDeletePending, isError: isDeleteError, reset } = useMutation({
		mutationFn: (staffId?: string) => staffService.delete(staffId),
    onSuccess: () => {
      if (!staffId) {
        logout();
      } else {
        queryClient.invalidateQueries({ queryKey: ['staff'] });
        push('/staff')
      }
    }
	})

  const { 
    mutate: mutateAvatar, 
    isPending: isAvatarMutationPending, 
    isError: isAvatarMutationError,
    isSuccess: isAvatarMutationSuccess,
  } = useMutation({
		mutationFn: (avatar: File) => staffService.updateAvatar(avatar, staffId),
    onSuccess: (data: IUpdateAvatarResponse) => queryClient.setQueryData(
    staffId ? ['profile', staffId] : ['profile'], 
    (oldProfileData: IStaff) =>
      (oldProfileData
      ? {
          ...oldProfileData,
          avatarUrl: data.avatarUrl,
        }
      : oldProfileData
    )),
	})

  const onSubmit: SubmitHandler<IStaff> = (data) => {
    const { specialization, ...rest } = data;
    const payload = {
      ...rest,
      specializationId: data.specialization ? data.specialization.id : null,
    }
    mutate(replaceEmptyFieldsWithNull(payload))
  }

  const handleClose = () => { setIsDialogOpen(false); reset(); };
  const handleDelete = () => deleteMutate(staffId);

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
          {isError && <Alert severity="error">{error.message}</Alert>}
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
          <DatePicker label="birthday" control={control} sx={{ width: '100%' }} />
          <Select 
            label='Gender'
            control={control}
            defaultValue='male'
            options={['male', 'female']}
            required={false}
          />
          <AutocompleteAsync 
            id="specialization" 
            label="Specialization"
            control={control}
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
            errorText='Experience must be a number'
            required={false}
            type="number"
            pattern={/^\d{1,3}$/}
          />
          <FormInput 
            label='Description'
            control={control}
            errorText='Description must be between 2 and 1000 characters long'
            pattern={/^[a-zA-Z\s,.]{2,1000}$/}
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
          {isAdmin && <Select
            label='Role'
            control={control}
            defaultValue='Staff'
            options={['Admin', 'Staff']}
            required={false}
          />}
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
      {isProfilePending && <CircularProgress size={65} sx={{ alignSelf: "center" }} />}
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
      {isAvatarMutationError &&
        <Notification
          text="Error. Unable to update avatar"
        />
      }
      {isAvatarMutationSuccess &&
        <Notification
          text="The avatar was successfully updated"
          type="success"
      />
      }
    </Box>
  )
}
