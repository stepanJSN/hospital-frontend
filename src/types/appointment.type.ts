export interface IDoctor {
  email: string;
  name: string;
  surname: string;
  telephone: string;
  gender: 'male' | 'female';
  experience: number;
  description: string;
  specialization: {
      title: string;
  };
}

export interface IDoctorShort extends Omit<IDoctor, "email" | "telephone" | "description"> {
  id: string;
}

export type GetDoctorsType = {
  specializationId?: string; 
  date?: string
  fullName?: string;
}

export interface IAvailableTime {
  dayOfWeek: number;
  startTime: number;
  endTime: number;
  bookedTime: number[];
}

export interface IAppointmentPayload {
  staffId: string;
  dateTime: string;
}

export interface IMyAppointment {
  id: string;
  dateTime: string;
  isCompleted: boolean;
  staff: {
    name: string;
    surname: string;
    specialization: {
      title: string;
    },
  }
}

export interface IStaffAppointments {
  id: string;
  dateTime: Date;
  isCompleted: boolean;
  customer: {
    id: string;
    name: string;
    surname: string;
  }
}

export interface IGetAppointments {
  staffId: string
  startDate?: string;
  endDate?: string;
  isCompleted?: boolean;
}

export interface IChangeStatus {
  isCompleted: boolean;
}