"use client"

import { scheduleService } from "@/services/schedule"
import { Alert, Box, CircularProgress } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import ScheduleTable from "./ScheduleTable"
import { useParams } from "next/navigation"
import { getUserId } from "@/services/auth-token"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Schedule() {
  const { staffId } = useParams<{ staffId: string[] }>();

  const getId = async () => {
    return staffId ? staffId[0] : await getUserId() as string;
  }

  const { data, isSuccess, isPending, isError } = useQuery({
		queryKey: ['schedule', staffId],
		queryFn: async () => scheduleService.get(await getId()),
	})

  return (
    <>
      <Box width="100%">
        {isSuccess && <ScheduleTable id={getId()} days={days} schedule={data} />}
        {isPending && <CircularProgress sx={{ position: 'relative', top: '40%', left: '50%' }} />}
        {isError && <Alert severity="error" sx={{ m: 2 }}>Error. Can&apos;t load schedule.</Alert>}
      </Box>
    </>
  )
}
