import { scheduleService } from "@/services/schedule"
import { Box, Button, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"

export default function Schedule() {
  const { data, refetch, isSuccess, isPending, isError } = useQuery({
		queryKey: ['schedule'],
		queryFn: () => scheduleService.get(),
	})

  return (
    <>
      {(isSuccess && data.length > 0) &&
        <Box>
          <Typography>You don`t have schedule</Typography>
          <Button>Create</Button>
        </Box>
      }
      <Box>
        
      </Box>
    </>
  )
}
