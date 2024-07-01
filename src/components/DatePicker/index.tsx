import dayjs from "dayjs";
import { Control, Controller } from "react-hook-form";
import { DatePicker as DatePickerUI } from '@mui/x-date-pickers';

type DatePickerProps = {
  label: string;
  control: Control<any>;
}

export default function DatePicker({ label, control }: DatePickerProps) {
  return (
    <Controller
      name={label}
      control={control}
      rules={{
        required: true
      }}
      render={({
        field: { onChange, value },
      }) => (
        <DatePickerUI
          value={dayjs(value)}
          onChange={value => onChange(value?.toISOString())}
          sx={{ 
            width: '100%',
            marginTop: '8px',
            marginBottom: '4px'
          }}
        />
      )}
    />
  )
}
