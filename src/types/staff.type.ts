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

export interface ICreateStaff extends Omit<IStaff, 'id' | 'specialization'> {
  specializationId: string | null;
}

export type UpdateStaff = Partial<Omit<IStaff, 'id'> & { 
  password: string;
  specializationId: string;
}>

export interface IDoctorShort extends Omit<IStaff, "email" | "telephone" | "description"> {}