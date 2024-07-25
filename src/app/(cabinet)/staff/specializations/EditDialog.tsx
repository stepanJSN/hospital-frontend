import FormInput from '@/components/Inputs/FormInput';
import { specializationService } from '@/services/specialization';
import { Alert, Box, Button, Dialog, DialogTitle } from '@mui/material'
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

type EditDialogProps = {
  specializationId: string;
  titleValue: string | null;
  handleClose: () => void;
  refetch: () => void;
}

export default function EditDialog({ titleValue, specializationId, handleClose, refetch }: EditDialogProps) {
  const {
    control,
    handleSubmit,
    setValue,
  } = useForm<{ title: string }>()

  if (titleValue) {
    setValue("title", titleValue);
  }

  const { mutate, isError } = useMutation({
		mutationFn: (data: { title: string }) => specializationService.update(specializationId, data),
    onSuccess: () => {
      refetch();
      handleClose();
    },
	})

  const onSubmit: SubmitHandler<{ title: string }> = (data) => mutate(data)

  return (
    <Dialog
      open={!!titleValue}
      onClose={handleClose}
      aria-labelledby="edit-dialog-title"
    >
      <DialogTitle id="edit-dialog-title">
        Edit new specialization
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
        <Button type="submit">Edit</Button>
        <Button color="error" onClick={handleClose}>Cancel</Button>
      </Box>
    </Dialog>
  )
}
