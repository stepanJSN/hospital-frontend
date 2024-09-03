'use client';

import { Autocomplete, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

type AutocompleteAsyncProps<T> = {
  id: string;
  label: string;
  control: Control;
  startFromLetter?: number;
  searchFunc: (searchValue: string) => Promise<Array<T>>;
  noOptionsText?: string;
  required?: boolean;
  sx?: object;
};

export default function AutocompleteAsync<T>({
  id,
  label,
  control,
  searchFunc,
  startFromLetter = 0,
  noOptionsText,
  required = false,
  sx,
}: AutocompleteAsyncProps<T>) {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { data, isFetching } = useQuery({
    queryKey: [label, debouncedSearchValue],
    queryFn: async () => await searchFunc(debouncedSearchValue),
    enabled: () => debouncedSearchValue.length >= startFromLetter,
  });

  return (
    <Controller
      name={label.toLowerCase()}
      control={control}
      rules={{
        required,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          disablePortal
          id={id}
          options={data ?? []}
          sx={sx}
          size="small"
          getOptionLabel={(option) => option.title}
          value={value}
          loading={isFetching}
          noOptionsText={noOptionsText ?? null}
          onChange={(event, value) => onChange(value)}
          onInputChange={(event, value) => setSearchValue(value)}
          renderInput={(params) => (
            <TextField {...params} error={!!error} label={label} />
          )}
        />
      )}
    />
  );
}
