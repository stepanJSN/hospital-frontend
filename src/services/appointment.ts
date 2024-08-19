import { IAppointmentPayload, IAvailableTime, IChangeStatus, IGetAppointments, IAppointment } from "@/types/appointment.type";
import { axiosWithAuth } from "./api";
import { getUserId } from "./auth-token";

class AppointmentService {

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

	async getByUserId(payload: IGetAppointments, userId?: string) {
		return (await axiosWithAuth.get<IAppointment[]>('/appointments', 
			{ params: {
				userId: userId ?? await getUserId(),
				...payload
			}}
		)).data;
	}

	async delete(id: string) {
		return (await axiosWithAuth.delete(`/appointments/${id}`));
	}

	async changeStatus(id: string, status: IChangeStatus) {
		return (await axiosWithAuth.patch(`/appointments/${id}`, status)).data;
	}
}

export const appointmentService = new AppointmentService();
