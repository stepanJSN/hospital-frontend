import { styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadingButton } from '@mui/lab';

type FileUploadProps = {
  update: (file: File) => void;
  title: string;
  isLoading?: boolean;
};

const FileUpload = ({ update, title, isLoading }: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      update(e.target.files[0]);
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
    <LoadingButton
      component="label"
      role={undefined}
      loading={isLoading}
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
      {title}
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </LoadingButton>
  );
};

export default FileUpload;
