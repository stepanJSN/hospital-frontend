import DatePicker from '@/app/components/DatePicker';
import AutocompleteAsync from '@/app/components/Inputs/AutocompleteAsync';
import { Box } from '@mui/material';
import React from 'react';
import { Control, UseFormHandleSubmit } from 'react-hook-form';
import Link from 'next/link';
import FormInput from '@/app/components/Inputs/FormInput';
import { specializationService } from '@/services/specialization';
import { FilterStaffType } from '@/types/staff.type';
import { ISpecialization } from '@/types/specialization.type';
import AdaptiveButton from '@/app/components/Buttons/AdaptiveButton';
import AdaptiveLoadingButton from '@/app/components/Buttons/AdaptiveLoadingButton';

type ActionBarProps = {
  handleSubmit: UseFormHandleSubmit<FilterStaffType, undefined>;
  onSubmit: () => void;
  control: Control<FilterStaffType>;
  isFetching: boolean;
  isAdmin: boolean;
};

export default function ActionBar({
  handleSubmit,
  onSubmit,
  control,
  isFetching,
  isAdmin,
}: ActionBarProps) {
  return (
    <Box
      component="form"
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      gap={1}
      mt={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        label="Full name"
        name="fullName"
        control={control}
        errorText="Incorrect full name"
        required={false}
        fullWidth={false}
        sx={{ minWidth: '250px', flex: 'auto' }}
        margin="none"
      />
      <AutocompleteAsync<ISpecialization>
        id="specialization"
        label="Specialization"
        control={control}
        startFromLetter={2}
        searchFunc={(title) => specializationService.getAll(title)}
        noOptionsText="Specialization not found"
        sx={{ minWidth: '250px', flex: 'auto' }}
      />
      {isAdmin ? (
        <AdaptiveButton component={Link} href="/staff/create">
          Create new profile
        </AdaptiveButton>
      ) : (
        <DatePicker control={control} label="Date" required={false} />
      )}
      <AdaptiveLoadingButton
        loading={isFetching}
        variant="contained"
        type="submit"
        loadingPosition="start"
        sx={{ minWidth: '150px' }}
      >
        Search
      </AdaptiveLoadingButton>
    </Box>
  );
}
