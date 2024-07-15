import { appointmentService } from "@/services/appointment";
import { IDoctor } from "@/types/appointment.type";
import { useQuery } from "@tanstack/react-query";

export default function useGetDoctors(doctorId: string): { doctorData: IDoctor | undefined, isFetching: boolean } {
  const { data: doctorData, isFetching } = useQuery({
    queryKey: ['doctorId', doctorId],
    queryFn: () => appointmentService.getDoctorById(doctorId),
  })

  return { doctorData, isFetching };
}
