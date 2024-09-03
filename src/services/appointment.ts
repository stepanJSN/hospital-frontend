import {
  IAppointmentPayload,
  IChangeStatus,
  IGetAppointments,
  IAppointment,
} from '@/types/appointment.type';
import { axiosWithAuth } from './api';
import { getUserId } from './cookie';

class AppointmentService {
  async makeAppointment(data: IAppointmentPayload) {
    await axiosWithAuth.post('/appointments', data);
  }

  async getByUserId(payload: IGetAppointments, userId?: string) {
    return (
      await axiosWithAuth.get<IAppointment[]>('/appointments', {
        params: {
          userId: userId ?? (await getUserId()),
          ...payload,
        },
      })
    ).data;
  }

  async delete(id: string) {
    return await axiosWithAuth.delete(`/appointments/${id}`);
  }

  async changeStatus(id: string, status: IChangeStatus) {
    return (await axiosWithAuth.patch(`/appointments/${id}`, status)).data;
  }
}

export const appointmentService = new AppointmentService();
