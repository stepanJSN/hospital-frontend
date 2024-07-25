"use client"

import { useState } from "react";
import { customerService } from "@/services/customer";
import { GetAll } from "@/types/customer.type";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import CustomerActionBar from "./CustomersActionBar";
import CustomerDataTable from "./CustomerDataTable";
import DeleteDialog from "@/components/Dialogs/DeleteDialog";

export default function Customer() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string>();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<GetAll>()

  const { refetch, data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['customers'],
		queryFn: () => {
      const data = getValues()
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName
      }
      return customerService.getAll(payload);
    },
  })

  const { mutate, isPending, isError: isDeleteError, isSuccess: isDeleteSuccess } = useMutation({
		mutationFn: (id: string) => customerService.delete(id),
    onSuccess: () => refetch(),
	})
  
  const onSubmit = () => refetch();
  const handleConfirmDelete = () => {
    mutate(selectedUser as string)
    setIsDialogOpen(false);
  };
  const handleDialogClose = () => setIsDialogOpen(false);
  const handleDelete = (id: string) => {
    setSelectedUser(id);
    setIsDialogOpen(true);
  }

  return (
    <Box width="100%" marginRight={1}>
      <CustomerActionBar
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        control={control}
        isFetching={isFetching}
      />
      {isSuccess && !isFetching && 
      <>
        <Typography component="h3" variant="h5">Customers:</Typography>
        <CustomerDataTable data={data} onClick={handleDelete} />
      </>
      }
      {isFetching && <CircularProgress sx={{ position: 'relative', top: '30%', left: '50%' }} />}
      {isSuccess && data?.length === 0 && <Typography textAlign="center" component="h3" variant="h6">Customers not found</Typography>}
      <DeleteDialog 
        open={isDialogOpen}
        handleClose={handleDialogClose}
        handleDelete={handleConfirmDelete}
      />
    </Box>
  )
}
