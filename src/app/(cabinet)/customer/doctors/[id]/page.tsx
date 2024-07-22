"use client"

import React from 'react'
import DoctorInfo from './DoctorInfo'
import { useParams } from 'next/navigation'
import { Box } from '@mui/material';
import AvailableTime from './AvailableTime';

export default function Doctor() {
  const { id } = useParams<{ id: string }>();

  return (
    <Box width="70%">
      <DoctorInfo doctorId={id} />
      <AvailableTime staffId={id} />
    </Box>
  )
}
