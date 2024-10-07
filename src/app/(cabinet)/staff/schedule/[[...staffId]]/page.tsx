import { getUserId } from '@/services/cookie';
import { scheduleService } from '@/services/schedule';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Schedule from './Schedule';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule',
};

export default async function SchedulePage({
  params,
}: {
  params: { staffId: string };
}) {
  const staffId = params.staffId ?? (await getUserId());

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['schedule', staffId],
    queryFn: async () => scheduleService.get(staffId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Schedule staffId={staffId} />
    </HydrationBoundary>
  );
}
