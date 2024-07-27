import { axiosWithAuth } from "./api";
import { ICreateStaff, IStaff, UpdateStaff } from "@/types/staff.type";
import { getUserId } from "./auth-token";

class StaffService {
  async create(data: ICreateStaff) {
    return (await axiosWithAuth.post<IStaff>('/staff', data)).data;
  }

	async get(staffId?: string) {
		return (await axiosWithAuth.get<IStaff>(`/staff/${staffId ?? await getUserId()}`)).data;
	};

  async update(data: UpdateStaff, staffId?: string) {
    return (await axiosWithAuth.patch<IStaff>(`/staff/${staffId ?? await getUserId()}/`, data)).data;
  }

  async delete(staffId?: string) {
    await axiosWithAuth.delete(`/staff/${staffId ?? await getUserId()}`);
  }
}

export const staffService = new StaffService();