import { axiosWithAuth } from "./api";
import { FilterStaffType, ICreateStaff, IStaff, IStaffShort, UpdateStaff } from "@/types/staff.type";
import { getUserId } from "./auth-token";
import { IUpdateAvatarResponse } from "@/types/customer.type";

class StaffService {
  async create(data: ICreateStaff) {
    return (await axiosWithAuth.post<IStaff>('/staff', data)).data;
  }

	async get(staffId?: string) {
		return (await axiosWithAuth.get<IStaff>(`/staff/${staffId ?? await getUserId()}`)).data;
	};

  async getAll(data: FilterStaffType) {
    console.log(data);
		return (await axiosWithAuth.get<IStaffShort[]>('/staff', 
			{ params: { 
				specializationId: data.specialization?.id,
				date: data.date,
				fullName: data.fullName
			}}
		)).data;
	};

  async update(data: UpdateStaff, staffId?: string) {
    return (await axiosWithAuth.patch<IStaff>(`/staff/${staffId ?? await getUserId()}/`, data)).data;
  }

  async updateAvatar(avatar: File, staffId?: string) {
    const formData = new FormData();
    formData.append('file', avatar);
    return (await axiosWithAuth.put<IUpdateAvatarResponse>(`/staff/avatar/${staffId ?? await getUserId()}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })).data;
  }

  async delete(staffId?: string) {
    await axiosWithAuth.delete(`/staff/${staffId ?? await getUserId()}`);
  }
}

export const staffService = new StaffService();