import { LoadingButton, LoadingButtonProps } from '@mui/lab';

export default function AdaptiveLoadingButton(props: LoadingButtonProps) {
  return (
    <LoadingButton
      variant="contained"
      type="submit"
      loadingPosition="start"
      sx={{
        p: { xs: '5px 8px', sm: '6px 16px' },
        fontSize: { xs: '0.8rem', sm: '0.875rem' },
      }}
      {...props}
    />
  );
}
