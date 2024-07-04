import { GetDoctorsType, IAppointmentPayload, IAvailableTime, IDoctor, IDoctorShort, ISpecialization } from "@/types/appointment.type";
import { axiosWithAuth } from "./api";

class AppointmentService {
	async getSpecialization(title: string) {
		return (await axiosWithAuth.get<ISpecialization[]>('/specialization', { params: {title} })).data;
	};

	async getDoctors(data: GetDoctorsType) {
		return (await axiosWithAuth.get<IDoctorShort[]>('/staff', 
			{ params: { 
				specializationId: data.specializationId,
				date: data.date
			}}
		)).data;
	};

	async getDoctorById(id: string) {
		return (await axiosWithAuth.get<IDoctor>(`/staff/${id}`)).data;
	}

	async getAvailableTime(staffId: string, startDate: string, endDate: string) {
		return (await axiosWithAuth.get<IAvailableTime[]>('/staff/schedule', 
			{ params: { 
				staffId,
				startDate,
				endDate,
			}}
		)).data;
	}

	async makeAppointment(data: IAppointmentPayload) {
		await axiosWithAuth.post('/appointments', data);
	}
}

export const appointmentService = new AppointmentService();