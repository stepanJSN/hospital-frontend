import DatePicker from "@/components/DatePicker";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import FormInput from "@/components/Inputs/FormInput";
import FormSwitch from "@/components/Switch/FormSwitch";
import { IGetCustomerAppointmentsForm } from "@/types/appointment.type";

type CustomerActionBarProps = {
  handleSubmit: UseFormHandleSubmit<IGetCustomerAppointmentsForm, undefined>
  onSubmit: () => void;
  control:  Control<IGetCustomerAppointmentsForm, any>
  isFetching: boolean;
}

export default function AppointmentsActionBar({ handleSubmit, onSubmit, control, isFetching }: CustomerActionBarProps) {
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
        label='Doctor name'
        name='staffName'
        control={control}
        errorText='Incorrect doctor name'
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
          width: "100px"
        }}
      >
        Show
      </LoadingButton>
    </Box>
  )
}
