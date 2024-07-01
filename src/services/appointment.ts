import { IDoctors, ISpecialization } from "@/types/appointment.type";
import { axiosWithAuth } from "./api";

export class AppointmentService {
	async getSpecialization(title: string) {
		return (await axiosWithAuth.get<ISpecialization>('/specialization', { params: {title} })).data;
	};

	async getDoctors(data: { specializationId: string; date?: string }) {
		return (await axiosWithAuth.get<IDoctors>('/staff', 
			{ params: { 
				specializationId: data.specializationId,
				date: data.date
			}}
		)).data;
	};
}