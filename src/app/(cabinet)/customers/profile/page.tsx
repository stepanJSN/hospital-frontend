"use client"

import DatePicker from '@/components/DatePicker'
import DeleteDialog from '@/components/Dialogs/DeleteDialog'
import FileUpload from '@/components/Inputs/FileUpload'
import FormInput from '@/components/Inputs/FormInput'
import Select from '@/components/Select'
import { removeEmptyFields } from '@/helpers/removeEmptyFields'
import { getUserId } from '@/services/auth-token'
import { customerService } from '@/services/customer'
import { UpdateUser } from '@/types/customer.type'
import { LoadingButton } from '@mui/lab'
import { Alert, Avatar, Box, Button, CircularProgress, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function Profile() {
  const { push } = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    setValue,
  } = useForm<UpdateUser>();

  const queryClient = useQueryClient()

  const { data, isSuccess: isProfileSuccess, isPending: isProfilePending, isError: isProfileDataError } = useQuery({
		queryKey: ['profile'],
		queryFn: async () => customerService.get((await getUserId()) as string),
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
	})

  const { mutate: deleteMutate, isPending: isDeletePending, isError: isDeleteError } = useMutation({
		mutationFn: () => customerService.delete(),
    onSuccess: () => push('/auth/sigin')
	})

  const onSubmit: SubmitHandler<UpdateUser> = (data) => {
    console.log(data);
    mutate(removeEmptyFields(data))
  }
  const handleClose = () => setIsDialogOpen(false);
  const handleDelete = () => deleteMutate();

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
          <FileUpload />
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
          <DatePicker label="birthday" control={control} sx={{ width: '100%' }} />
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
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </Box>
  )
}
