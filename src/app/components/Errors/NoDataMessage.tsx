import { Typography } from '@mui/material';

type NoDataMessagePropsType = {
  message: string;
};

export default function NoDataMessage({ message }: NoDataMessagePropsType) {
  return (
    <Typography textAlign="center" component="h3" variant="h6">
      {message}
    </Typography>
  );
}
