import { IUser } from "./customer.type";

export interface IStaff extends IUser {
  room: number;
  experience: number;
  specialization: {
    id: string;
    title: string;
  }
  role: 'Staff' | 'Admin'
  description: string;
}

export type UpdateStaff = Partial<Omit<IStaff, 'id'> & { 
  password: string;
  specializationId: string;
}>