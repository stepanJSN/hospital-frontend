import { appointmentService } from "@/services/appointment";
import { IDoctor } from "@/types/appointment.type";
import { useQuery } from "@tanstack/react-query";

export default function useGetDoctors(doctorId: string): { doctorData: IDoctor | undefined, isFetching: boolean, isError: boolean } {
  const { data: doctorData, isFetching, isError } = useQuery({
    queryKey: ['doctorId', doctorId],
    queryFn: () => appointmentService.getDoctorById(doctorId),
  })

  return { doctorData, isFetching, isError };
}
