import DatePicker from '@/app/components/DatePicker';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { Control, UseFormHandleSubmit } from 'react-hook-form';
import FormInput from '@/app/components/Inputs/FormInput';
import FormSwitch from '@/app/components/Switch/FormSwitch';
import { IGetCustomerAppointmentsForm } from '@/types/appointment.type';

type CustomerActionBarProps = {
  handleSubmit: UseFormHandleSubmit<IGetCustomerAppointmentsForm, undefined>;
  onSubmit: () => void;
  control: Control<IGetCustomerAppointmentsForm>;
  isFetching: boolean;
};

export default function AppointmentsActionBar({
  handleSubmit,
  onSubmit,
  control,
  isFetching,
}: CustomerActionBarProps) {
  return (
    <Box
      component="form"
      display="flex"
      alignItems="center"
      onSubmit={handleSubmit(onSubmit)}
      gap={1}
      marginY={2}
      flexWrap="wrap"
    >
      <DatePicker
        control={control}
        label="From"
        name="fromDate"
        required={false}
        sx={{ flex: { xs: '100%', sm: '150px' } }}
      />
      <DatePicker
        control={control}
        label="To"
        name="toDate"
        required={false}
        sx={{ flex: { xs: '100%', sm: '150px' } }}
      />
      <FormInput
        label="Doctor name"
        name="staffName"
        control={control}
        errorText="Incorrect doctor name"
        required={false}
        fullWidth={false}
        sx={{ flex: { xs: '100%', sm: '200px' } }}
        margin="none"
      />
      <FormSwitch
        control={control}
        defaultValue={false}
        label="Show completed"
        name="isCompleted"
        sx={{ flex: { xs: '48%', sm: '200px' } }}
      />
      <LoadingButton
        loading={isFetching}
        variant="contained"
        fullWidth
        type="submit"
        loadingPosition="start"
        sx={{
          width: '100px',
        }}
      >
        Show
      </LoadingButton>
    </Box>
  );
}
