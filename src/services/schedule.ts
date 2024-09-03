import { ISchedule, IChangeSchedule } from '@/types/schedule.type';
import { axiosWithAuth } from './api';

class ScheduleService {
  async create(data: IChangeSchedule) {
    return (await axiosWithAuth.post<IChangeSchedule[]>(`/schedule`, data))
      .data;
  }

  async get(staffId: string) {
    return (await axiosWithAuth.get<ISchedule[]>(`/schedule/${staffId}`)).data;
  }

  async update(data: IChangeSchedule) {
    return (await axiosWithAuth.patch<IChangeSchedule[]>(`/schedule`, data))
      .data;
  }
}

export const scheduleService = new ScheduleService();
