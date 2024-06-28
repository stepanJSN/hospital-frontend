import { Box } from "@mui/material"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box
      display="flex"
      marginTop="200px"
      justifyContent="center"
    >
      {children}
    </Box>
  )
}