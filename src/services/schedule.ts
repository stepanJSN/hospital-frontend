import { ISchedule, IUpdateSchedule } from "@/types/schedule.type";
import { axiosWithAuth } from "./api";
import { getUserId } from "./auth-token";

class ScheduleService {
  userId: string | undefined;
  constructor() {
    this.userId = undefined;
    this.init();
  }

  async init() {
    this.userId = await getUserId();
  }

	async get() {
		return (await axiosWithAuth.get<ISchedule[]>(`/schedule/${this.userId}`)).data;
	};

  async update(data: IUpdateSchedule) {
    return (await axiosWithAuth.patch<IUpdateSchedule>(`/schedule/${this.userId}`, data)).data;
  }

  async delete() {
    await axiosWithAuth.delete('/customers/current');
  }
}

export const scheduleService = new ScheduleService();
