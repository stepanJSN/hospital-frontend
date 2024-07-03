export interface ISpecialization {
  id: string
  title: string
}

export interface IDoctors {
  id: string
  name: string
  surname: string
  experience: number
  gender: 'male' | 'female'
  specialization: {
    title: string;
  }
}

export type GetDoctorsType = {
  specializationId: string; 
  date?: string
}