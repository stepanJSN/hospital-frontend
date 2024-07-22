import { ISchedule, IChangeSchedule } from "@/types/schedule.type";
import { axiosWithAuth } from "./api";
import { getUserId } from "./auth-token";

class ScheduleService {

  async create(data: IChangeSchedule) {
    return (await axiosWithAuth.post<IChangeSchedule[]>(`/schedule`, data)).data;
  }

	async get() {
		return (await axiosWithAuth.get<ISchedule[]>(`/schedule/${await getUserId()}`)).data;
	};

  async update(data: IChangeSchedule) {
    return (await axiosWithAuth.patch<IChangeSchedule[]>(`/schedule`, data)).data;
  }
}

export const scheduleService = new ScheduleService();
