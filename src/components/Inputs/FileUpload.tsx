import { customerService } from '@/services/customer';
import { Button, styled } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = () => {
  const queryClient = useQueryClient()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await customerService.updateAvatar(e.target.files[0]);
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{
        position: 'relative', 
        left: '50%', 
        transform: 'translateX(-50%)',
        marginTop: 1,
      }}
    >
      Upload avatar
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  );
};

export default FileUpload;