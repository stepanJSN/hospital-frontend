import { GetDoctorsType, IDoctors, ISpecialization } from "@/types/appointment.type";
import { axiosWithAuth } from "./api";

class AppointmentService {
	async getSpecialization(title: string) {
		return (await axiosWithAuth.get<ISpecialization[]>('/specialization', { params: {title} })).data;
	};

	async getDoctors(data: GetDoctorsType) {
		return (await axiosWithAuth.get<IDoctors[]>('/staff', 
			{ params: { 
				specializationId: data.specializationId,
				date: data.date
			}}
		)).data;
	};
}

export const appointmentService = new AppointmentService();