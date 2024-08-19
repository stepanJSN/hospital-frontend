import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Appointments from "./Appointments";
import { appointmentService } from "@/services/appointment";

export default async function AppointmentsPage({ params }: { params: { id?: string[] } }) {
  const staffId = params.id && params.id[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: staffId
      ? ["staffAppointments", staffId, { isCompleted: false }]
      : ["staffAppointments", { isCompleted: false }],
    queryFn: () =>
      appointmentService.getByUserId({
        returnType: "customer",
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Appointments staffId={staffId} />
    </HydrationBoundary>
  )
}
