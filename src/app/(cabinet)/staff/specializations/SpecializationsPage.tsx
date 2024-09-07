'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import DeleteDialog from '@/app/components/Dialogs/DeleteDialog';
import { specializationService } from '@/services/specialization';
import { useDebounce } from '@uidotdev/usehooks';
import SpecializationsDataTable from './SpecializationsDataTable';
import CreateDialog from './CreateDialog';
import EditDialog from './EditDialog';
import ExportExcel from '@/app/components/ExportExcel';
import Error from '@/app/components/Errors/Error';
import NoDataMessage from '@/app/components/Errors/NoDataMessage';
import { ISpecialization } from '@/types/specialization.type';

export default function SpecializationPage() {
  const [selectedSpecializationForDelete, setSelectedSpecializationForDelete] =
    useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [selectedSpecializationForEdit, setSelectedSpecializationForEdit] =
    useState<ISpecialization | null>(null);
  const [inputValue, setInputValue] = useState<string>();
  const debouncedInputValue = useDebounce(inputValue, 500);
  const queryClient = useQueryClient();

  const { refetch, data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['specializations', debouncedInputValue],
    queryFn: () => specializationService.getAll(debouncedInputValue),
    placeholderData: keepPreviousData,
  });

  const {
    mutate: deleteMutation,
    isError: isDeleteError,
    isPending,
  } = useMutation({
    mutationFn: (id: string) => specializationService.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['specializations'] }),
  });

  const handleDeleteConfirm = () => {
    if (selectedSpecializationForDelete) {
      deleteMutation(selectedSpecializationForDelete);
    }
    setSelectedSpecializationForDelete(null);
  };
  const handleDeleteCancel = () => setSelectedSpecializationForDelete(null);
  const handleDelete = (id: string) => setSelectedSpecializationForDelete(id);

  const handleEdit = (id: string, title: string) =>
    setSelectedSpecializationForEdit({ id, title });
  const handleEditDialogClose = () => setSelectedSpecializationForEdit(null);

  const handleCreateDialogClose = () => setIsCreateDialogOpen(false);

  return (
    <Box width="100%" marginRight={1}>
      <Box display="flex" alignItems="center" mt={1}>
        <TextField
          id="specialization-title"
          label="Specialization"
          size="small"
          margin="dense"
          variant="outlined"
          value={inputValue}
          sx={{ width: '300px' }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value);
          }}
        />
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          sx={{
            height: '40px',
            marginLeft: 1,
          }}
        >
          Create specialization
        </Button>
        {isSuccess && <ExportExcel data={data} fileName="specializations" />}
      </Box>
      {isFetching ? <LinearProgress sx={{ my: 1 }} /> : <Box height="12px" />}
      {isSuccess && data?.length !== 0 && (
        <>
          <Typography component="h1" variant="h5" mt={2} mb={1}>
            Specializations:
          </Typography>
          <SpecializationsDataTable
            data={data}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </>
      )}
      {isSuccess && data?.length === 0 && (
        <NoDataMessage message="Specializations not found" />
      )}
      {isError && <Error refetch={refetch} />}
      <DeleteDialog
        open={!!selectedSpecializationForDelete}
        isError={isDeleteError}
        isLoading={isPending}
        handleClose={handleDeleteCancel}
        handleDelete={handleDeleteConfirm}
      />
      <CreateDialog
        open={isCreateDialogOpen}
        handleClose={handleCreateDialogClose}
      />
      {selectedSpecializationForEdit && (
        <EditDialog
          specialization={selectedSpecializationForEdit}
          handleClose={handleEditDialogClose}
        />
      )}
    </Box>
  );
}
