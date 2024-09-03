import { Backdrop, CircularProgress } from '@mui/material';

type LoaderProps = {
  isLoading: boolean;
};

export default function Loader({ isLoading }: LoaderProps) {
  return (
    <Backdrop
      sx={{
        width: '75%',
        left: '25%',
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
