import { IUser, UpdateUser } from "@/types/customer.type";
import { axiosWithAuth } from "./api";

export class UserService {
	async getProfile() {
		return (await axiosWithAuth.get<IUser>('/customers/current')).data;
	};

  async update(data: UpdateUser) {
    return (await axiosWithAuth.patch<IUser>('/customers/current', data)).data;
  }

  async delete() {
    await axiosWithAuth.delete('/customers/current');
  }
}
