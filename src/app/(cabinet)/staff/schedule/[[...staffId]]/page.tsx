import { getUserId } from '@/services/auth-token';
import { scheduleService } from '@/services/schedule';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Schedule from './Schedule';

export default async function SchedulePage({
  params,
}: {
  params: { id: string };
}) {
  const staffId = params.id ?? (await getUserId());

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
