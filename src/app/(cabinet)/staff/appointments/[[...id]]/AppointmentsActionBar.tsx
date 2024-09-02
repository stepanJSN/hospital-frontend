import DatePicker from "@/app/components/DatePicker";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import FormInput from "@/app/components/Inputs/FormInput";
import FormSwitch from "@/app/components/Switch/FormSwitch";
import { IGetStaffAppointmentsForm } from "@/types/appointment.type";

type AppointmentsActionBarProps = {
  handleSubmit: UseFormHandleSubmit<IGetStaffAppointmentsForm, undefined>
  onSubmit: () => void;
  control:  Control<IGetStaffAppointmentsForm, any>
  isFetching: boolean;
}

export default function AppointmentsActionBar({ handleSubmit, onSubmit, control, isFetching }: AppointmentsActionBarProps) {
  return (
    <Box
      component="form" 
      display="flex"
      alignItems="center"
      onSubmit={handleSubmit(onSubmit)}
      gap={1}
      marginY={2}
    >
      <DatePicker
        control={control}
        label="From"
        name="fromDate"
        required={false}
      />
      <DatePicker
        control={control}
        label="To"
        name="toDate"
        required={false}
      />
      <FormInput
        label='Patient name'
        name='customerName'
        control={control}
        errorText='Incorrect patient name'
        required={false}
        fullWidth={false}
        sx={{ minWidth: '100px' }}
        margin='none'
      />
      <FormSwitch 
        control={control}
        defaultValue={false}
        label="Show completed"
        name="isCompleted"
        sx={{ width: '150px' }}
      />
      <LoadingButton 
        loading={isFetching}
        variant="contained" 
        fullWidth
        type="submit"
        loadingPosition="start"
        sx={{
          width: "100px",
          flex: "auto",
        }}
      >
        Show
      </LoadingButton>
    </Box>
  )
}
