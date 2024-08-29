import { staffService } from "@/services/staff";
import { IStaff } from "@/types/staff.type";
import { useQuery } from "@tanstack/react-query";

export default function useGetDoctors(doctorId: string): { doctorData: IStaff | undefined, isFetching: boolean, isError: boolean } {
  const { data: doctorData, isFetching, isError } = useQuery({
    queryKey: ['doctor', doctorId],
    queryFn: () => staffService.get(doctorId),
  })

  return { doctorData, isFetching, isError };
}
