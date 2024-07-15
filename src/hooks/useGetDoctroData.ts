import { appointmentService } from "@/services/appointment";
import { IDoctor } from "@/types/appointment.type";
import { useQuery } from "@tanstack/react-query";

export default function useGetDoctors(doctorId: string): { doctorData: IDoctor | undefined, isSuccess: boolean } {
  const { data: doctorData, isSuccess } = useQuery({
    queryKey: ['doctorId', doctorId],
    queryFn: () => appointmentService.getDoctorById(doctorId),
  })

  return { doctorData, isSuccess };
}
