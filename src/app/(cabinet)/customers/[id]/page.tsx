import { customerService } from '@/services/customer';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import CustomerPage from './CustomerPage';

export default async function Customer({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['customerId', params.id],
    queryFn: () => customerService.get(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomerPage id={params.id} />
    </HydrationBoundary>
  );
}
