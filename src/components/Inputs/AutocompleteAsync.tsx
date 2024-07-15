"use client"

import { ISpecialization } from "@/types/appointment.type";
import { Autocomplete, TextField } from "@mui/material";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";

type AutocompleteAsyncProps = {
  id: string
  label: string
  control: Control<any>;
  startFromLetter?: number;
  searchFunc: (searchValue: string) => Promise<Array<ISpecialization>>
  noOptionsText?: string
  required?: boolean
  sx?: object
}

export default function AutocompleteAsync({ id, label, control, searchFunc, startFromLetter = 0, noOptionsText, required = false, sx }: AutocompleteAsyncProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<Array<ISpecialization>>([]);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const getSpecialization = async () => {
    setIsLoading(true);
    const options = await searchFunc(debouncedSearchValue);
    setOptions(options);
    setIsLoading(false);
  };

  useEffect(() => {
    if (debouncedSearchValue.length >= startFromLetter) {
      getSpecialization();
    }
  }, [debouncedSearchValue]);

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
        <Autocomplete
          disablePortal
          id={id}
          options={options}
          sx={sx}
          getOptionLabel={(option) => option.title}
          value={value}
          loading={isLoading}
          noOptionsText={noOptionsText ?? null}
          onChange={(event, value) => onChange(value)}
          onInputChange={(event, value) => setSearchValue(value)}
          renderInput={(params) => <TextField {...params} error={!!error} label={label} />}
        />
      )}
    />
  )
}
