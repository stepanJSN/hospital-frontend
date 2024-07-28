"use client"

import { useState } from "react";
import { customerService } from "@/services/customer";
import { GetAll, IUser } from "@/types/customer.type";
import { Box, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import CustomerActionBar from "./CustomersActionBar";
import CustomerDataTable from "./CustomerDataTable";
import DeleteDialog from "@/components/Dialogs/DeleteDialog";
import Loader from "@/components/Loader";
import ExportExcel from "@/components/ExportExcel";
import dayjs from "dayjs";

export default function Customer() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string>();
  const {
    control,
    handleSubmit,
    getValues,
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

  const mapData = (data: IUser[]) => {
    return data.map(item => ({
      ...item,
      birthday: dayjs(item.birthday).format('DD.MM.YYYY'),
    }));
  }

  return (
    <Box width="100%" marginRight={1}>
      <Box display="flex" mt={2}>
        <Typography 
          component="h3" 
          variant="h5"
          flex="auto"
        >
          Customers:
        </Typography>
        {isSuccess && <ExportExcel data={mapData(data)} fileName="customers" />}
      </Box>
      <CustomerActionBar
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        control={control}
        isFetching={isFetching}
      />
      {isSuccess && data?.length !== 0 && 
        <CustomerDataTable data={mapData(data)} onClick={handleDelete} />
      }
      <Loader isLoading={isFetching} />
      {isSuccess && data?.length === 0 && <Typography textAlign="center" component="h3" variant="h6">Customers not found</Typography>}
      {isError && 
        <Typography 
          textAlign="center"
          component="h3" 
          variant="h5"
          color="error"
          mt={4}
        >Error. Try again</Typography>
      }
      <DeleteDialog 
        open={isDialogOpen}
        isLoading={isPending}
        isError={isDeleteError}
        handleClose={handleDialogClose}
        handleDelete={handleConfirmDelete}
      />
    </Box>
  )
}
