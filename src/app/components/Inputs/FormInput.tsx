import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

type InputProps = {
  control: Control;
  label: string;
  name?: string;
  errorText?: string;
  fullWidth?: boolean;
  type?: string;
  required?: boolean;
  pattern?: RegExp;
  multiline?: boolean;
  sx?: object;
  margin?: 'dense' | 'normal' | 'none';
};

export default function FormInput({
  control,
  label,
  name,
  errorText,
  type = 'text',
  required = true,
  pattern,
  multiline = false,
  fullWidth = true,
  sx,
  margin = 'dense',
}: InputProps) {
  return (
    <Controller
      name={name ?? label.toLowerCase()}
      control={control}
      rules={{
        required,
        pattern,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          InputLabelProps={{ shrink: value }}
          required={required}
          helperText={error ? errorText : null}
          size="small"
          margin={margin}
          error={!!error}
          onChange={(event) =>
            type === 'number'
              ? onChange(event.target.value ? +event.target.value : '')
              : onChange(event.target.value)
          }
          value={value ?? ''}
          label={label}
          fullWidth={fullWidth}
          multiline={multiline}
          type={type}
          variant="outlined"
          sx={sx}
        />
      )}
    />
  );
}
