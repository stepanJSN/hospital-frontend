import isAdmin from "@/helpers/isAdmin"
import { staffService } from "@/services/staff";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import StaffProfile from "./StaffProfile";

export default async function StaffProfilePage({ params }: { params: { id?: string[] } }) {
  const staffId = params.id && params.id[0];
  const isUserAdmin = await isAdmin();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: staffId ? ['profile', staffId] : ['profile'],
    queryFn: () => staffService.get(staffId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StaffProfile isAdmin={isUserAdmin} staffId={staffId} />
    </HydrationBoundary>
  )
}
