import dayjs from 'dayjs';
import { Control, Controller } from 'react-hook-form';
import { DatePicker as DatePickerUI } from '@mui/x-date-pickers';

type DatePickerProps = {
  label: string;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  required?: boolean;
  sx?: object;
};

export default function DatePicker({
  name,
  label,
  control,
  required = true,
  sx,
}: DatePickerProps) {
  return (
    <Controller
      name={name ?? label.toLowerCase()}
      control={control}
      rules={{
        required,
      }}
      render={({ field: { onChange, value } }) => (
        <DatePickerUI
          label={label}
          value={value ? dayjs(value) : null}
          onChange={(value) => onChange(value)}
          slotProps={{ textField: { size: 'small' } }}
          sx={sx}
        />
      )}
    />
  );
}
