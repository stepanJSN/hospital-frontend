import React from 'react'
import DoctorInfo from './DoctorInfo'
import AvailableTime from './AvailableTime';
import isAdmin from '@/helpers/isAdmin';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { staffService } from '@/services/staff';
import dayjs from 'dayjs';

export default async function Doctor({ params }: { params: { id: string } }) {
  const isDoctorAdmin = await isAdmin();
  const scheduleDateRange = { fromDate: new Date(), toDate: dayjs().add(7, 'day').toDate() }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['doctor', params.id],
    queryFn: () => staffService.get(params.id),
  })

  await queryClient.prefetchQuery({
    queryKey: ['availableTime', params.id, scheduleDateRange],
		queryFn: () => staffService.getAvailableTime(
      params.id, 
      scheduleDateRange.fromDate.toString(), 
      scheduleDateRange.toDate.toString()
    )
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorInfo staffId={params.id} isAdmin={isDoctorAdmin} />
      <AvailableTime staffId={params.id} />
    </HydrationBoundary>
  )
}
