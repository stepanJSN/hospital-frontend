"use client"

import DatePicker from '@/components/DatePicker'
import AutocompleteAsync from '@/components/Inputs/AutocompleteAsync'
import FormInput from '@/components/Inputs/FormInput'
import Select from '@/components/Select'
import { removeEmptyFields } from '@/helpers/removeEmptyFields'
import useAdminRole from '@/hooks/useUserRole'
import { staffService } from '@/services/staff'
import { UpdateStaff } from '@/types/staff.type'
import { LoadingButton } from '@mui/lab'
import { Alert, Avatar, Box, Button, CircularProgress, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import DeleteDialog from '@/components/Dialogs/DeleteDialog'
import { specializationService } from '@/services/specialization'

export default function Profile() {
  const { id } = useParams<{ id: string[] }>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const isAdmin = useAdminRole();
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    setValue,
  } = useForm<UpdateStaff>();

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

  const idFromParam = id ? id[0]: undefined;

  const { mutate, isPending, error, isError, isSuccess } = useMutation({
		mutationFn: (data: UpdateStaff) => staffService.update(data, idFromParam),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
	})

  const { mutate: deleteMutate, isPending: isDeletePending, isError: isDeleteError } = useMutation({
		mutationFn: (staffId?: string) => staffService.delete(staffId),
    onSuccess: () => {
      if (!id) {
        push('/auth/sigin')
      } else {
        push('/staff')
      }
    }
	})

  const onSubmit: SubmitHandler<UpdateStaff> = (data) => {
    const { specialization, ...rest } = data;
    const payload = {
      ...rest,
      specializationId: data.specialization ? data.specialization.id : null,
    }
    mutate(removeEmptyFields(payload))
  }

  const handleClose = () => setIsDialogOpen(false);
  const handleDelete = () => deleteMutate(idFromParam);

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
          <DatePicker label="birthday" control={control} />
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
            pattern={/^\d+$/}
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
        isError={isDeletePending}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </Box>
  )
}
