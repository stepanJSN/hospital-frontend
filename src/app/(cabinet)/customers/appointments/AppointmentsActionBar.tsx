import DatePicker from "@/components/DatePicker";
import { LoadingButton } from "@mui/lab";
import { Box, Divider } from "@mui/material";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import { FormPayloadType } from "./page";

type CustomerActionBarProps = {
  handleSubmit: UseFormHandleSubmit<FormPayloadType, undefined>
  onSubmit: () => void;
  control:  Control<FormPayloadType, any>
  isFetching: boolean;
}

export default function AppointmentsActionBar({ handleSubmit, onSubmit, control, isFetching }: CustomerActionBarProps) {
  return (
    <Box
      component="form" 
      display="flex"
      alignItems="center"
      onSubmit={handleSubmit(onSubmit)}
      gap={2}
      marginY={2}
    >
      <DatePicker
        control={control}
        label="From"
        required={false}
        sx={{ width: '100%' }}
        />
        <Divider sx={{ width: '20px' }} />
        <DatePicker
        control={control}
        label="To"
        required={false}
        sx={{ width: '100%' }}
        />
        <LoadingButton 
          loading={isFetching}
          variant="contained" 
          fullWidth
          type="submit"
          loadingPosition="start"
          sx={{
            width: "250px"
          }}
        >
          Show
        </LoadingButton>
    </Box>
  )
}
