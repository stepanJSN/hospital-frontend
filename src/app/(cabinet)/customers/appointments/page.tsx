import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import MyAppointments from './MyAppointments';
import { appointmentService } from '@/services/appointment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Appointments',
};

export default async function MyAppointmentsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['customerAppointments', { isCompleted: false }],
    queryFn: () => appointmentService.getByUserId({ returnType: 'staff' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyAppointments />
    </HydrationBoundary>
  );
}
