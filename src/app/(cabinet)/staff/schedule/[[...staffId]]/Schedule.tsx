"use client"

import { scheduleService } from "@/services/schedule"
import { Box, CircularProgress } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import ScheduleTable from "./ScheduleTable";
import Error from "@/components/Errors/Error";

type ScheduleProps = {
  staffId: string;
}

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Schedule({ staffId }: ScheduleProps) {
  const { refetch, data, isSuccess, isPending, isError } = useQuery({
		queryKey: ['schedule', staffId],
		queryFn: async () => scheduleService.get(staffId),
	})

  return (
    <Box width="100%">
      {isSuccess && <ScheduleTable staffId={staffId} days={DAYS_OF_WEEK} schedule={data} />}
      {isPending && <CircularProgress sx={{ position: 'relative', top: '40%', left: '50%' }} />}
      {isError && <Error refetch={refetch} />}
    </Box>
  )
}
