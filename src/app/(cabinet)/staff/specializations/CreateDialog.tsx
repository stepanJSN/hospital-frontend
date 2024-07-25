import FormInput from '@/components/Inputs/FormInput';
import { specializationService } from '@/services/specialization';
import { Alert, Box, Button, Dialog, DialogTitle } from '@mui/material'
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

type CreateDialogProps = {
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
}

export default function CreateDialog({ open, handleClose, refetch }: CreateDialogProps) {
  const {
    control,
    handleSubmit,
  } = useForm<{ title: string }>()

  const { mutate, isError } = useMutation({
		mutationFn: (data: { title: string }) => specializationService.create(data),
    onSuccess: () => {
      refetch();
      handleClose();
    },
	})

  const onSubmit: SubmitHandler<{ title: string }> = (data) => mutate(data)

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-dialog-title"
    >
      <DialogTitle id="create-dialog-title">
        Create new specialization
      </DialogTitle>
      {isError && <Alert severity="error">Error. Try again</Alert>}
      <Box 
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        margin={2}
      >
        <FormInput 
          label='Specialization'
          name='title'
          control={control}
          errorText='Field should not be empty'
        />
        <Button type="submit">Create</Button>
        <Button color="error" onClick={handleClose}>Cancel</Button>
      </Box>
    </Dialog>
  )
}
