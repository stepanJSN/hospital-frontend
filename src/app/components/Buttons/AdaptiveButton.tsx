import { Button, ButtonProps } from '@mui/material';

export default function AdaptiveButton(props: ButtonProps) {
  return (
    <Button
      sx={{
        p: { xs: '5px 8px', sm: '6px 16px' },
        fontSize: { xs: '0.8rem', sm: '0.875rem' },
      }}
      {...props}
    />
  );
}
