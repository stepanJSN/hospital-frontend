import FormInput from '@/app/components/Inputs/FormInput';
import { specializationService } from '@/services/specialization';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogTitle,
  LinearProgress,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

type EditDialogProps = {
  specializationId: string;
  titleValue: string | null;
  handleClose: () => void;
  refetch: () => void;
};

export default function EditDialog({
  titleValue,
  specializationId,
  handleClose,
}: EditDialogProps) {
  const queryClient = useQueryClient();
  const { control, handleSubmit, setValue } = useForm<{ title: string }>();

  if (titleValue) {
    setValue('title', titleValue);
  }

  const { mutate, isError, isPending } = useMutation({
    mutationFn: (data: { title: string }) =>
      specializationService.update(specializationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specializations'] });
      handleClose();
    },
  });

  const onSubmit: SubmitHandler<{ title: string }> = (data) => mutate(data);

  return (
    <Dialog
      open={!!titleValue}
      onClose={handleClose}
      aria-labelledby="edit-dialog-title"
    >
      <DialogTitle id="edit-dialog-title">Edit new specialization</DialogTitle>
      {isError && <Alert severity="error">Error. Try again</Alert>}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} margin={2} mt={0}>
        {isPending && <LinearProgress />}
        <FormInput
          label="Specialization"
          name="title"
          control={control}
          errorText="Field should not be empty"
        />
        <Button type="submit">Edit</Button>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}
