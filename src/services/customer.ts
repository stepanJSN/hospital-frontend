import { IUser, UpdateUser } from "@/types/customer.type";
import { axiosWithAuth } from "./api";

class CustomerService {
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

export const customerService = new CustomerService();