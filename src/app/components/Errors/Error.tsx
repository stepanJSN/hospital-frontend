import { Button, Typography } from '@mui/material';

type ErrorPropsType = {
  refetch: () => void;
};

export default function Error({ refetch }: ErrorPropsType) {
  return (
    <Typography
      textAlign="center"
      component="h3"
      variant="h5"
      color="error"
      mt={4}
    >
      Error. Unable to load data.
      <Button
        sx={{
          display: 'block',
          margin: '0 auto',
          mt: 1,
        }}
        variant="contained"
        onClick={refetch}
      >
        Reload
      </Button>
    </Typography>
  );
}
