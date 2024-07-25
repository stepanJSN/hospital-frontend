import { IChangeSpecialization, ISpecialization } from "@/types/specialization.type";
import { axiosWithAuth } from "./api";

class SpecializationService {
  async getAll(title?: string) {
    return (await axiosWithAuth.get<ISpecialization[]>('/specialization', {
      params: {
        title,
      }
    })).data;
  }

  async create(data: IChangeSpecialization) {
    return (await axiosWithAuth.post('/specialization', data)).data;
  }

  async update(id: string, data: IChangeSpecialization) {
    return (await axiosWithAuth.patch(`/specialization/${id}`, data)).data;
  }

  async delete(id: string) {
    return (await axiosWithAuth.delete(`/specialization/${id}`)).data;
  }
}

export const specializationService = new SpecializationService();