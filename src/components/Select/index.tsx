import { FormControl, InputLabel, MenuItem, Select as SelectComponent } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type SelectProps = {
  control: Control<any>;
  label: string;
  errorText: string;
  required?: boolean;
  options: Array<string>;
}

export default function Select({control, label, errorText, options, required = true}: SelectProps) {
  return (
    <Controller
      name={label.toLowerCase()}
      control={control}
      rules={{
        required,
      }}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <FormControl 
          fullWidth 
          required={required} 
          size="small"
          margin="dense"
        >
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <SelectComponent
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="Age"
            onChange={onChange}
          >
            {options.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
          </SelectComponent>
        </FormControl>
      )}
    />
  )
}
