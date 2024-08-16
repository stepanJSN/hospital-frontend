import { FormControlLabel, Switch } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type SwitchProps = {
  control: Control<any>;
  defaultValue?: boolean;
  label: string;
  name?: string;
  sx?: object;
}

export default function FormSwitch({ control, label, name, defaultValue = false, sx } : SwitchProps) {
  return (
    <Controller
      name={name ?? label.toLowerCase()}
      control={control}
      defaultValue={defaultValue}
      render={({
        field: { onChange, value },
      }) => (
        <FormControlLabel sx={sx} control={
          <Switch 
            checked={value}
            onChange={onChange}
          />
        } label={label} />
      )}
    />
  )
}
