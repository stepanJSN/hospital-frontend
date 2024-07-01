import { Box } from '@mui/material'
import React from 'react'
import Menu from './Menu'

export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    <Box display="flex" width="max-content">
      <Menu />
      {children}
    </Box>
  )
}
