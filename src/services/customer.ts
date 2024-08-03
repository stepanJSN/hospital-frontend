import { GetAll, IUser, UpdateUser } from "@/types/customer.type";
import { axiosWithAuth } from "./api";
import { getUserId } from "./auth-token";

class CustomerService {
  async getAll(data: GetAll) {
    return (await axiosWithAuth.get<IUser[]>('/customers', {
      params: {
        firstName: data.firstName,
        lastName: data.lastName
      }
    })).data;
  }

	async get(id: string) {
		return (await axiosWithAuth.get<IUser>(`/customers/${id}`)).data;
	};

  async update(data: UpdateUser) {
    return (await axiosWithAuth.patch<IUser>('/customers/current', data)).data;
  }

  async updateAvatar(avatar: File) {
    const formData = new FormData();
    formData.append('file', avatar);
    return (await axiosWithAuth.put('/customers/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }));
  }

  async delete(id?: string) {
    await axiosWithAuth.delete(`/customers/${id ?? await getUserId()}`);
  }
}

export const customerService = new CustomerService();