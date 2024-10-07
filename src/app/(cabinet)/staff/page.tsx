import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Staff from './Staff';
import { staffService } from '@/services/staff';
import isAdmin from '@/helpers/isAdmin';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Staff',
};

export default async function StaffPage() {
  const queryClient = new QueryClient();
  const isUserAdmin = await isAdmin();

  await queryClient.prefetchQuery({
    queryKey: ['staff', {}],
    queryFn: () => staffService.getAll({}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Staff isAdmin={isUserAdmin} />
    </HydrationBoundary>
  );
}
