import { customerService } from '@/services/customer';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import CustomersPage from './CustomersPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Customers() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['customers', {}],
    queryFn: () => customerService.getAll({}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomersPage />
    </HydrationBoundary>
  );
}
