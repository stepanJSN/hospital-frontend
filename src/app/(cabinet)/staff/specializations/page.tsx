'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DeleteDialog from '@/app/components/Dialogs/DeleteDialog';
import { specializationService } from '@/services/specialization';
import { useDebounce } from '@uidotdev/usehooks';
import SpecializationsDataTable from './SpecializationsDataTable';
import CreateDialog from './CreateDialog';
import EditDialog from './EditDialog';
import ExportExcel from '@/app/components/ExportExcel';
import Error from '@/app/components/Errors/Error';
import NoDataMessage from '@/app/components/Errors/NoDataMessage';

export default function Customer() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [editDialogValue, setEditDialogValue] = useState<string | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] =
    useState<string>();
  const [inputValue, setInputValue] = useState<string>();
  const debouncedInputValue = useDebounce(inputValue, 500);
  const queryClient = useQueryClient();

  const { refetch, data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['specializations', debouncedInputValue],
    queryFn: () => specializationService.getAll(debouncedInputValue),
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

  const handleConfirmDelete = () => {
    deleteMutation(selectedSpecialization as string);
    setIsDeleteDialogOpen(false);
  };
  const handleDialogClose = () => setIsDeleteDialogOpen(false);
  const handleDelete = (id: string) => {
    setSelectedSpecialization(id);
    setIsDeleteDialogOpen(true);
  };

  const handleEdit = (id: string, value: string) => {
    setSelectedSpecialization(id);
    setEditDialogValue(value);
  };
  const handleEditDialogClose = () => setEditDialogValue(null);

  const handleCreateDialogClose = () => setIsCreateDialogOpen(false);

  return (
    <Box width="100%" marginRight={1}>
      {isFetching && <LinearProgress sx={{ height: '5px' }} />}
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
        open={isDeleteDialogOpen}
        isError={isDeleteError}
        isLoading={isPending}
        handleClose={handleDialogClose}
        handleDelete={handleConfirmDelete}
      />
      <CreateDialog
        open={isCreateDialogOpen}
        handleClose={handleCreateDialogClose}
        refetch={refetch}
      />
      <EditDialog
        titleValue={editDialogValue}
        handleClose={handleEditDialogClose}
        specializationId={selectedSpecialization as string}
        refetch={refetch}
      />
    </Box>
  );
}
