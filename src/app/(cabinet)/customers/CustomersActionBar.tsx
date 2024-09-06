import { Box } from '@mui/material';
import { Control } from 'react-hook-form';
import FormInput from '@/app/components/Inputs/FormInput';
import { GetAll } from '@/types/customer.type';
import AdaptiveLoadingButton from '@/app/components/Buttons/AdaptiveLoadingButton';

type CustomerActionBarProps = {
  handleSubmit: () => void;
  control: Control<GetAll>;
  isFetching: boolean;
};

export default function CustomerActionBar({
  handleSubmit,
  control,
  isFetching,
}: CustomerActionBarProps) {
  return (
    <Box
      component="form"
      display="flex"
      alignItems="center"
      mt={1}
      sx={{ gap: { xs: 1, md: 2 }, flexWrap: { xs: 'wrap', md: 'nowrap' } }}
      onSubmit={handleSubmit}
    >
      <FormInput
        label="FirstName"
        name="firstName"
        control={control}
        required={false}
        margin="none"
      />
      <FormInput
        label="LastName"
        name="lastName"
        control={control}
        required={false}
        margin="none"
      />
      <AdaptiveLoadingButton
        loading={isFetching}
        variant="contained"
        fullWidth
        type="submit"
        loadingPosition="start"
        sx={{
          width: '200px',
        }}
      >
        Search
      </AdaptiveLoadingButton>
    </Box>
  );
}
