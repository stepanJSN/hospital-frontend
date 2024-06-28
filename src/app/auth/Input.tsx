import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type InputProps = {
  control: Control<any>;
  label: string;
  errorText: string;
  type?: string;
  required?: boolean
  pattern?: RegExp;
}

export default function Input({ control, label, errorText, type = "text", required = true, pattern }: InputProps) {
  return (
    <Controller
      name={label.toLowerCase()}
      control={control}
      rules={{
        required,
        pattern,
      }}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <TextField
          required={required}
          helperText={error ? errorText : null}
          size="small"
          margin='dense'
          error={!!error}
          onChange={
            (event) => type === "number" ? 
            onChange(event.target.value ? +event.target.value : '') :
            onChange(event.target.value)
          }
          value={value}
          label={label}
          fullWidth
          type={type}
          variant="outlined"
        />
      )}
    />
  )
}
