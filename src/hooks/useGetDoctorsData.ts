import { staffService } from '@/services/staff';
import { IStaff } from '@/types/staff.type';
import { useQuery } from '@tanstack/react-query';

type useGetDoctorsReturn = {
  doctorData: IStaff | undefined;
  isFetching: boolean;
  isError: boolean;
};

export default function useGetDoctors(doctorId: string): useGetDoctorsReturn {
  const {
    data: doctorData,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['doctor', doctorId],
    queryFn: () => staffService.get(doctorId),
  });

  return { doctorData, isFetching, isError };
}
