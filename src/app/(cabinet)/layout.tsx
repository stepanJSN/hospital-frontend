import { Box } from '@mui/material'
import React from 'react'
import Menu from './Menu'

export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    <Box display="flex" minHeight="100vh" gap={1}>
      <Menu />
      <Box 
        flex="0 1 75%" 
        paddingRight={1}
        paddingBottom={2}
      >{children}</Box>
    </Box>
  )
}
