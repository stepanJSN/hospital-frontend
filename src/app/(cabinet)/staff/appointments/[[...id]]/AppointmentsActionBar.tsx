import DatePicker from '@/app/components/DatePicker';
import { Box } from '@mui/material';
import { Control, UseFormHandleSubmit } from 'react-hook-form';
import FormInput from '@/app/components/Inputs/FormInput';
import FormSwitch from '@/app/components/Switch/FormSwitch';
import { IGetStaffAppointmentsForm } from '@/types/appointment.type';
import AdaptiveLoadingButton from '@/app/components/Buttons/AdaptiveLoadingButton';

type AppointmentsActionBarProps = {
  handleSubmit: UseFormHandleSubmit<IGetStaffAppointmentsForm, undefined>;
  onSubmit: () => void;
  control: Control<IGetStaffAppointmentsForm>;
  isFetching: boolean;
};

export default function AppointmentsActionBar({
  handleSubmit,
  onSubmit,
  control,
  isFetching,
}: AppointmentsActionBarProps) {
  return (
    <Box
      component="form"
      display="flex"
      alignItems="center"
      onSubmit={handleSubmit(onSubmit)}
      gap={1}
      marginY={2}
      sx={{ flexWrap: { xs: 'wrap' } }}
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
        label="Patient name"
        name="customerName"
        control={control}
        errorText="Incorrect patient name"
        required={false}
        fullWidth={false}
        sx={{ flex: { xs: '100%', sm: '150px' } }}
        margin="none"
      />
      <FormSwitch
        control={control}
        defaultValue={false}
        label="Show completed"
        name="isCompleted"
        sx={{ flex: { xs: '48%', sm: '200px' } }}
      />
      <AdaptiveLoadingButton
        loading={isFetching}
        variant="contained"
        fullWidth
        type="submit"
        loadingPosition="start"
        sx={{
          flex: { xs: '48%', sm: '0 1 150px' },
        }}
      >
        Show
      </AdaptiveLoadingButton>
    </Box>
  );
}
