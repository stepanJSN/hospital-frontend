"use client"

import { useState } from "react";
import { customerService } from "@/services/customer";
import { GetAll, IUser } from "@/types/customer.type";
import { Box, LinearProgress, Typography } from "@mui/material";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import CustomerActionBar from "./CustomersActionBar";
import CustomerDataTable from "./CustomerDataTable";
import DeleteDialog from "@/app/components/Dialogs/DeleteDialog";
import ExportExcel from "@/app/components/ExportExcel";
import dayjs from "dayjs";
import { removeEmptyFields } from "@/helpers/removeEmptyFields";
import Error from "@/app/components/Errors/Error";
import NoDataMessage from "@/app/components/Errors/NoDataMessage";

export default function CustomersPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>();
  const [filterData, setFilterData] = useState<GetAll>({});

  const {
    control,
    handleSubmit,
    getValues,
  } = useForm<GetAll>()

  const { refetch, data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['customers', filterData],
		queryFn: () => {
      const payload = {
        firstName: filterData.firstName,
        lastName: filterData.lastName
      }
      return customerService.getAll(payload);
    },
    placeholderData: keepPreviousData,
  })

  const { mutate, isPending, isError: isDeleteError, reset } = useMutation({
		mutationFn: (id: string) => customerService.delete(id),
    onSuccess: () => refetch(),
	})
  
  const onSubmit = () => {
    console.log(getValues());
    setFilterData(removeEmptyFields(getValues()))
  };
  
  const handleConfirmDelete = () => {
    mutate(selectedUser as string)
    setSelectedUser(null);
  };
  const handleDialogClose = () => { setSelectedUser(null); reset()};
  const handleDelete = (id: string) => {
    setSelectedUser(id);
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
        handleSubmit={handleSubmit(onSubmit)}
        control={control}
        isFetching={isFetching}
      />
      {isSuccess && data?.length !== 0 && 
        <CustomerDataTable data={mapData(data)} onClick={handleDelete} />
      }
      {isFetching && <LinearProgress sx={{ my: 1 }} />}
      {isSuccess && data?.length === 0 && 
        <NoDataMessage message="Customers not found" />
      }
      {isError && <Error refetch={refetch} />}
      <DeleteDialog 
        open={!!selectedUser}
        isLoading={isPending}
        isError={isDeleteError}
        handleClose={handleDialogClose}
        handleDelete={handleConfirmDelete}
      />
    </Box>
  )
}
