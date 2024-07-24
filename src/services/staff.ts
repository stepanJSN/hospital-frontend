import { axiosWithAuth } from "./api";
import { IStaff, UpdateStaff } from "@/types/staff.type";
import { getUserId } from "./auth-token";

class StaffService {
  async create(data: IStaff) {
    return (await axiosWithAuth.post<IStaff>('/staff', data)).data;
  }

	async getProfile(staffId?: string) {
		return (await axiosWithAuth.get<IStaff>(`/staff/${staffId ?? await getUserId()}`)).data;
	};

  async update(data: UpdateStaff) {
    return (await axiosWithAuth.patch<IStaff>('/staff/current', data)).data;
  }

  async delete(staffId?: string) {
    await axiosWithAuth.delete(`/staff/${staffId ?? await getUserId()}`);
  }
}

export const staffService = new StaffService();