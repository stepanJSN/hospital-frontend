import { IUser, UpdateUser } from "@/types/customer.type";
import { axiosWithAuth } from "./api";
import { IStaff, UpdateStaff } from "@/types/staff.type";

class StaffService {
	async getProfile() {
		return (await axiosWithAuth.get<IStaff>('/staff/current')).data;
	};

  async update(data: UpdateStaff) {
    return (await axiosWithAuth.patch<IStaff>('/staff/current', data)).data;
  }

  async delete() {
    await axiosWithAuth.delete('/customers/current');
  }
}

export const staffService = new StaffService();