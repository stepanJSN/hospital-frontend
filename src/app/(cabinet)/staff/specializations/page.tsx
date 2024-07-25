"use client"

import { useState } from "react";
import { customerService } from "@/services/customer";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import DeleteDialog from "@/components/Dialogs/DeleteDialog";
import { specializationService } from "@/services/specialization";
import { useDebounce } from "@uidotdev/usehooks";
import SpecializationsDataTable from "./SpecializationsDataTable";
import CreateDialog from "./CreateDialog";
import EditDialog from "./EditDialog";

export default function Customer() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [editDialogValue, setEditDialogValue] = useState<string | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>();
  const [inputValue, setInputValue] = useState<string>();
  const debouncedInputValue = useDebounce(inputValue, 500);

  const { refetch, data, isPending, isError, isSuccess } = useQuery({
    queryKey: ['specializations', debouncedInputValue],
		queryFn: () => specializationService.getAll(debouncedInputValue),
  })

  const { mutate: deleteMutation, isError: isDeleteError, isSuccess: isDeleteSuccess } = useMutation({
		mutationFn: (id: string) => specializationService.delete(id),
    onSuccess: () => refetch(),
	})
  
  const handleConfirmDelete = () => {
    deleteMutation(selectedSpecialization as string)
    setIsDeleteDialogOpen(false);
  };
  const handleDialogClose = () => setIsDeleteDialogOpen(false);
  const handleDelete = (id: string) => {
    setSelectedSpecialization(id);
    setIsDeleteDialogOpen(true);
  }

  const handleEdit = (id: string, value: string) => {
    setSelectedSpecialization(id);
    setEditDialogValue(value);
  }
  const handleEditDialogClose = () => setEditDialogValue(null);

  const handleCreateDialogClose = () => setIsCreateDialogOpen(false);

  return (
    <Box width="100%" marginRight={1}>
      <Box display="flex" alignItems="center">
        <TextField
          id="specialization-title"
          label="Specialization"
          size="small"
          margin='dense'
          variant="outlined"
          value={inputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value);
          }}
        />
        <Button 
          variant="contained"
          onClick={() => setIsCreateDialogOpen(true)}
          sx={{ 
            height: '40px',
            marginLeft: 1
          }}
        >Create specialization</Button>
      </Box>
      {isSuccess && !isPending && 
      <>
        <Typography component="h3" variant="h5">Specializations:</Typography>
        <SpecializationsDataTable 
          data={data} 
          onDelete={handleDelete} 
          onEdit={handleEdit}
        />
      </>
      }
      {isPending && <CircularProgress sx={{ position: 'relative', top: '30%', left: '50%' }} />}
      {isSuccess && data?.length === 0 && <Typography textAlign="center" component="h3" variant="h6">Specializations not found</Typography>}
      <DeleteDialog 
        open={isDeleteDialogOpen}
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
  )
}
