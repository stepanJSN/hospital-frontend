import { IUser } from "./customer.type";
import { ISpecialization } from "./specialization.type";

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

export interface ICreateStaff extends Omit<IStaff, 'id' | 'specialization'> {
  specializationId: string | null;
}

export type UpdateStaff = Partial<Omit<IStaff, 'id' | 'specialization'> & { 
  password: string;
  specializationId: string | null;
}>

export interface IStaffShort extends Omit<IStaff, "email" | "telephone" | "description"> {}

export type FilterStaffType = {
  date?: string;
  specialization?: ISpecialization;
  fullName?: string;
}