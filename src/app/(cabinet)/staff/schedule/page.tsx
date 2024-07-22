"use client"

import { scheduleService } from "@/services/schedule"
import { Alert, Box, CircularProgress } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import ScheduleTable from "./ScheduleTable"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Schedule() {
  const { data, refetch, isSuccess, isPending, isError } = useQuery({
		queryKey: ['schedule'],
		queryFn: () => scheduleService.get(),
	})

  return (
    <>
      <Box width="100%">
        {isSuccess && <ScheduleTable days={days} schedule={data} refetch={refetch} />}
        {isPending && <CircularProgress sx={{ position: 'relative', top: '40%', left: '50%' }} />}
        {isError && <Alert severity="error" sx={{ m: 2 }}>Error. Can&apos;t load schedule.</Alert>}
      </Box>
    </>
  )
}
