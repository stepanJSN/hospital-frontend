
import { customerService } from "@/services/customer";
import { QueryClient } from "@tanstack/react-query";
import CustomerPage from "./CustomerPage";

export default async function Customer({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['customerId', params.id],
    queryFn: () => customerService.get(params.id),
  })

  return <CustomerPage id={params.id} />
}
