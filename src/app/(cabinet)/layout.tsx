import { Box } from '@mui/material'
import React from 'react'
import Menu from './Menu'

export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    <Box display="flex" minHeight="100vh">
      <Menu />
      <Box 
        flex="0 0 73%" 
        paddingLeft={1}
        paddingBottom={2}
      >{children}</Box>
    </Box>
  )
}
