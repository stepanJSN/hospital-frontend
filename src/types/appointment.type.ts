export interface ISpecialization {
  id: string
  title: string
}

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
  specializationId: string; 
  date?: string
}

export interface IAvailableTime {
  dayOfWeek: number;
  startTime: number;
  endTime: number;
  bookedTime: number[];
}

export interface IAppointmentPayload {
  staffId: string;
  customerId: string;
  dateTime: string;
}